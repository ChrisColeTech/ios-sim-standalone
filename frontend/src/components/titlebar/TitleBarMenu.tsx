import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HandleMenuClick, GetBroadcastState, GetStandaloneApp } from '../../services/electron';
import { useUiStoreState } from '../../store/uiStore';
import { useSimulatorWs } from '../../hooks/useSimulatorWs';
import { useAppMode } from '../../hooks/useAppMode';
import { isBrowser } from '../../services/runtime';
import { DEVICES } from '../../constants/devices';

type MenuItem = { label: string; action: string };
type MenuSection = {
  title: string;
  items: MenuItem[];
  activeCheck: (action: string) => boolean;
};

function CheckIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
      <path d="M1,5 L4,8 L9,2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function TitleBarMenu() {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ left: 0, top: 0, maxW: 300 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const store = useUiStoreState();
  const wsState = useSimulatorWs();
  const appMode = useAppMode();
  const isPicker = appMode === 'picker' || appMode === 'loading';
  const isDark = store.theme === 'dark';
  const [standaloneApp, setStandaloneApp] = useState('');

  useEffect(() => {
    GetStandaloneApp().then(setStandaloneApp);
  }, []);

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const availW = window.innerWidth - rect.left - 4;
      setMenuPos({ left: rect.left, top: rect.bottom, maxW: availW });
    }
  }, [open]);

  const allSections: MenuSection[] = [
    {
      title: 'Device',
      items: [
        { label: 'iPad Pro', action: 'device:ipad-pro' },
        { label: 'iPhone 15 Pro', action: 'device:iphone-15-pro' },
        { label: 'iPhone SE', action: 'device:iphone-se' },
      ],
      activeCheck: (a) => a === `device:${wsState.device}`,
    },
    {
      title: 'Orientation',
      items: [
        { label: 'Portrait', action: 'orientation:portrait' },
        { label: 'Landscape', action: 'orientation:landscape' },
      ],
      activeCheck: (a) => a === 'orientation:portrait' ? !store.isLandscape : store.isLandscape,
    },
    {
      title: 'Theme',
      items: [
        { label: 'Dark', action: 'theme:dark' },
        { label: 'Light', action: 'theme:light' },
      ],
      activeCheck: (a) => a === `theme:${store.theme}`,
    },
    {
      title: 'Apps',
      items: [
        { label: 'Stock Apps', action: 'apps:stock' },
        { label: 'Custom Apps', action: 'apps:custom' },
      ],
      activeCheck: (a) => a === 'apps:stock' ? store.showStockApps : store.showCustomApps,
    },
    {
      title: 'Debug',
      items: [
        { label: 'Debug Zones', action: 'debug:zones' },
        { label: 'DevTools', action: 'debug:devtools' },
      ],
      activeCheck: (a) => {
        if (a === 'debug:zones') return store.showDebugZones;
        if (a === 'debug:devtools') return wsState.devToolsOpen;
        return false;
      },
    },
  ];

  // Filter menu sections based on mode
  const hiddenSections: string[] = [];
  if (standaloneApp) hiddenSections.push('Apps');
  if (standaloneApp === 'sconnect') hiddenSections.push('Device');

  const sections = isPicker
    ? allSections.filter((s) => s.title === 'Theme')
    : hiddenSections.length
      ? allSections.filter((s) => !hiddenSections.includes(s.title))
      : allSections;

  async function handleAction(action: string) {
    // Handle frontend-only actions locally
    if (action === 'apps:stock') { store.toggleStockApps(); return; }
    if (action === 'apps:custom') { store.toggleCustomApps(); return; }
    if (action === 'debug:zones') { store.toggleDebugZones(); return; }

    if (isBrowser) {
      const MENU_BAR_HEIGHT = 30;

      if (action.startsWith('device:')) {
        const deviceId = action.replace('device:', '');
        const device = DEVICES.find((d) => d.id === deviceId);
        const isLandscape = store.isLandscape;

        store.setSimulatorState({
          deviceFamily: deviceId.startsWith('ipad') ? 'ipad' : 'iphone',
          isLandscape,
          theme: store.theme,
        });
        localStorage.setItem('sim-device', deviceId);

        if (device) {
          const w = isLandscape ? device.height : device.width;
          const h = (isLandscape ? device.width : device.height) + MENU_BAR_HEIGHT;
          window.resizeTo(w, h);
        }
      } else if (action.startsWith('orientation:')) {
        const isLandscape = action === 'orientation:landscape';
        const deviceId = localStorage.getItem('sim-device') ?? '';
        const device = DEVICES.find((d) => d.id === deviceId);

        store.setSimulatorState({
          deviceFamily: store.deviceFamily,
          isLandscape,
          theme: store.theme,
        });

        if (device) {
          const w = isLandscape ? device.height : device.width;
          const h = (isLandscape ? device.width : device.height) + MENU_BAR_HEIGHT;
          window.resizeTo(w, h);
        }
      } else if (action.startsWith('theme:')) {
        const theme = action.replace('theme:', '') as 'light' | 'dark';
        store.setSimulatorState({
          deviceFamily: store.deviceFamily,
          isLandscape: store.isLandscape,
          theme,
        });
        localStorage.setItem('sim-theme', theme);
      }
      return;
    }

    await HandleMenuClick(action);
    // Directly fetch updated state in case WebSocket is slow/blocked
    try {
      const s = await GetBroadcastState();
      store.setSimulatorState({
        deviceFamily: s.device?.startsWith('ipad') ? 'ipad' : 'iphone',
        isLandscape: s.isLandscape,
        theme: (s.theme === 'light' || s.theme === 'dark') ? s.theme as 'light' | 'dark' : store.theme,
      });
    } catch { /* WS will handle it if binding fails */ }
  }

  const isSmall = menuPos.maxW < 260;
  const menuW = isSmall ? Math.min(120, menuPos.maxW) : 140;
  const subW = isSmall ? Math.min(120, menuPos.maxW - menuW + 8) : 150;
  const fontSize = isSmall ? '9px' : '11px';

  const panelCls = isDark
    ? 'bg-[#1C1C1E] border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)]'
    : 'bg-white border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)]';

  const textPrimary = isDark ? 'text-white' : 'text-black';
  const itemHoverCls = isDark ? 'data-[highlighted]:bg-white/10' : 'data-[highlighted]:bg-black/5';

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          ref={btnRef}
          className={`wails-no-drag flex items-center justify-center h-[38px] px-2 border-0 outline-none cursor-pointer transition-colors ${
            open
              ? isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
              : isDark ? 'text-white' : 'text-black'
          }`}
          style={{ fontSize }}
        >
          Settings
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`py-1 border rounded opacity-100 ${panelCls} ${textPrimary}`}
          style={{ width: menuW, zIndex: 99999 }}
          align="start"
          sideOffset={2}
        >
          {sections.map((section) => (
            <DropdownMenu.Sub key={section.title}>
              <DropdownMenu.SubTrigger
                className={`flex items-center justify-between px-2.5 py-1.5 cursor-default outline-none transition-colors ${itemHoverCls}`}
                style={{ fontSize }}
              >
                <span>{section.title}</span>
                <ChevronRight size={isSmall ? 8 : 10} className="opacity-40" />
              </DropdownMenu.SubTrigger>

              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className={`py-1 border rounded z-[99999] ${panelCls} ${textPrimary} shadow-lg`}
                  style={{ width: subW }}
                  sideOffset={4}
                  alignOffset={-4}
                >
                  {section.items.map((item) => (
                    <DropdownMenu.Item
                      key={item.action}
                      onSelect={() => handleAction(item.action)}
                      className={`flex items-center w-full outline-none cursor-pointer px-2 py-1.5 transition-colors ${itemHoverCls}`}
                      style={{ fontSize }}
                    >
                      <span className="w-4 shrink-0 flex justify-center text-current">
                        {section.activeCheck(item.action) && <CheckIcon />}
                      </span>
                      {item.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
