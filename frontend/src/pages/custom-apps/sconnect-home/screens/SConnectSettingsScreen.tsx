import { X } from 'lucide-react';
import { SCONNECT_THEME } from '../../../../constants/custom-apps/sconnect-home';
import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import type { SConnectSettingsScreenProps, SConnectTheme } from '../../../../types/custom-apps/sconnect-home';
import type { IOSTableSection } from '../../../../types/ui-components';

const THEME_OPTIONS: { value: SConnectTheme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export function SConnectSettingsScreen(props: SConnectSettingsScreenProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const pageBg = props.isDark ? SCONNECT_THEME.pageBgDark : SCONNECT_THEME.pageBgLight;
  const textColor = props.isDark ? 'text-white' : 'text-black';

  const sections: IOSTableSection[] = [
    {
      id: 'settings',
      rows: [
        ...(props.adminBannerDetails.length > 0
          ? [{
              id: 'banner',
              label: 'Banner',
              detail: props.bannerDisplay || 'Select a Banner',
              accessory: 'disclosure' as const,
              onTap: props.onBannerTap,
            }]
          : []),
        {
          id: 'location',
          label: 'Location',
          detail: props.storeDisplayText,
          accessory: 'disclosure' as const,
          onTap: props.onLocationTap,
        },
        {
          id: 'theme',
          label: 'Theme',
          render: (
            <div className="flex items-center justify-between">
              <span className={`text-[10px] ${textColor}`}>Theme</span>
              <div className={`flex overflow-hidden rounded-md border ${props.isDark ? 'border-white/20' : 'border-black/15'}`}>
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => props.onThemeChange(opt.value)}
                    className={`px-2 py-0.5 text-[8px] font-medium transition-colors ${
                      props.currentTheme === opt.value
                        ? props.isDark ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                        : props.isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                    type="button"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ),
        },
        {
          id: 'release',
          label: 'Release Notes',
          detail: 'v4.0.0',
        },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: pageBg }}>
      <IOSNavigationBar
        title="Settings"
        isDark={props.isDark}
        navBg={navBg}
        actions={[{ icon: <X size={12} strokeWidth={1.5} />, onTap: props.onClose, label: 'Close' }]}
      />
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={props.isDark} />
      </div>
    </div>
  );
}
