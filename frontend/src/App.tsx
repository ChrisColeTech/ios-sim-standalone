import { useCallback, useEffect } from 'react';
import { AppModeRouter } from './components/app/AppModeRouter';
import { TitleBar } from './components/titlebar/TitleBar';
import { UpdateBanner } from './components/UpdateBanner';
import { useAppMode } from './hooks/useAppMode';
import { useSimulatorWs } from './hooks/useSimulatorWs';
import { useUiStoreState } from './store/uiStore';
import { isBrowser } from './services/runtime';
import { DEVICES } from './constants/devices';

export default function App() {
  const mode = useAppMode();
  const setSimulatorState = useUiStoreState((s) => s.setSimulatorState);
  const openAppById = useUiStoreState((s) => s.openAppById);
  const closeApp = useUiStoreState((s) => s.closeApp);
  const unlock = useUiStoreState((s) => s.unlock);

  const handleAppCommand = useCallback((cmd: { type: string; [key: string]: unknown }) => {
    if (cmd.type === 'open-app' && typeof cmd.appId === 'string') {
      unlock();
      openAppById(cmd.appId);
    } else if (cmd.type === 'close-app') {
      closeApp();
    } else if (cmd.type === 'navigate' && typeof cmd.page === 'string') {
      // Navigate treats page as an app id — open it
      unlock();
      if (cmd.page === 'home') {
        closeApp();
      } else {
        openAppById(cmd.page);
      }
    }
  }, [openAppById, closeApp, unlock]);

  const wsState = useSimulatorWs(undefined, handleAppCommand);

  // Sync WS state (especially theme) to store globally — not just in simulator view
  useEffect(() => {
    if (wsState.theme) {
      setSimulatorState({
        deviceFamily: wsState.device?.startsWith('ipad') ? 'ipad' : 'iphone',
        isLandscape: wsState.isLandscape,
        theme: wsState.theme,
      });
    }
  }, [wsState.device, wsState.isLandscape, wsState.theme, setSimulatorState]);

  // Browser mode: resize window to match saved device on load
  useEffect(() => {
    if (!isBrowser) return;
    if (mode !== 'simulator') return;
    const deviceId = useUiStoreState.getState().deviceId ?? localStorage.getItem('sim-device');
    if (!deviceId) return;
    const device = DEVICES.find((d) => d.id === deviceId);
    if (!device) return;
    const MENU_BAR_HEIGHT = 30;
    const isLandscape = useUiStoreState.getState().isLandscape;
    const w = isLandscape ? device.height : device.width;
    const h = (isLandscape ? device.width : device.height) + MENU_BAR_HEIGHT;
    window.resizeTo(w, h);
  }, [mode]);

  const isDark = wsState.theme === 'dark';

  return (
    <main className="flex flex-col w-full h-screen">
      <TitleBar />
      <div className={`flex-1 min-h-0 ${isDark ? 'bg-[#1C1C1E] text-white' : 'bg-[#f2f2f7] text-black'} relative overflow-hidden`}>
        <UpdateBanner />
        <AppModeRouter mode={mode} />
      </div>
    </main>
  );
}