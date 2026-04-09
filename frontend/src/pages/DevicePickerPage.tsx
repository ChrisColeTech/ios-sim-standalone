import { useState, useEffect } from 'react';
import { DEVICES } from '../constants/devices';
import type { DeviceId } from '../constants/devices';
import simulatorIcon from '../assets/images/simulator/app-icon.png';
import sigctIcon from '../assets/images/sigct/app-icon.png';
import appleLogo from '../assets/images/apple-logo.png';
import { useUiStoreState } from '../store/uiStore';
import { isBrowser } from '../services/runtime';

import { GetStandaloneApp, SetPendingDevice } from '../services/electron';

export function DevicePickerPage() {
  const [remember, setRemember] = useState(false);
  const [standalone, setStandalone] = useState<string>('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    GetStandaloneApp().then(setStandalone);
  }, []);

  useEffect(() => {
    if (isLaunching) {
      // Smoothly animate progress bar to 100% over the 1s delay
      const timer = setTimeout(() => setProgress(100), 50);
      return () => clearTimeout(timer);
    }
  }, [isLaunching]);

  const iconSrc = standalone === 'sigct' ? sigctIcon : simulatorIcon;

  const selectDevice = async (id: DeviceId) => {
    if (isLaunching) return;
    setIsLaunching(true);
    useUiStoreState.getState().setTransitioning(true);

    // Reset first-launch state locally if not remembering,
    // so the simulator shows the hello screen.
    if (!remember) {
      try {
        const stored = localStorage.getItem('frontend-ui-store');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.state) {
            parsed.state.hasCompletedHello = false;
            parsed.state.currentPage = 0;
            localStorage.setItem('frontend-ui-store', JSON.stringify(parsed));
          }
        }
      } catch { /* ignore */ }
    }

    // Resize the browser window to match the selected device
    if (isBrowser) {
      const device = DEVICES.find((d) => d.id === id);
      if (device) {
        const MENU_BAR_HEIGHT = 30;
        window.resizeTo(device.width, device.height + MENU_BAR_HEIGHT);
      }
    }

    await SetPendingDevice(id as string, remember);
  };

  const isDark = useUiStoreState((s) => s.theme === 'dark');

  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent select-none relative overflow-hidden">
      {/* Authentic iOS Boot Screen Transition */}
      {isLaunching && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 ease-out select-none pointer-events-none">
          <img
            src={appleLogo}
            alt="Booting"
            className="w-20 h-20 object-contain"
          />
          <div className="absolute bottom-1/4 w-36 h-1 bg-[#333333] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E5E5E5] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Picker UI (Remains in DOM to prevent layout jumps, seamlessly obscured by the wallpaper fade above) */}
      <div className="w-80 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-black/20 mb-2">
            <img src={iconSrc} alt="App Icon" className="w-full h-full object-cover" />
          </div>
          <h1 className={`text-2xl font-semibold text-center mt-2 ${isDark ? 'text-white' : 'text-black'}`}>
            Select Device
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          {DEVICES.map((device) => {
            const isIPad = device.id === 'ipad-pro';
            return (
              <button
                key={device.id}
                onClick={() => selectDevice(device.id)}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all border hover:bg-blue-500 hover:border-blue-400 hover:text-white hover:scale-[1.02] active:scale-[0.98] ${isDark
                    ? 'bg-white/5 border-white/5 text-white/70'
                    : 'bg-black/5 border-black/5 text-black/70'
                  }`}
              >
                <div className={`flex-shrink-0 rounded-md flex items-center justify-center ${isIPad ? 'w-8 h-10' : 'w-6 h-10'} ${isDark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-black/10 group-hover:bg-white/20'}`}>
                  <div className={`border rounded-sm ${isIPad ? 'w-6 h-8' : 'w-4 h-7'} ${isDark ? 'border-white/40 group-hover:border-white/80' : 'border-black/30 group-hover:border-white/80'}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{device.name}</span>
                  <span className="text-[10px] opacity-60 uppercase tracking-wider">{device.width} × {device.height}</span>
                </div>
              </button>
            );
          })}
        </div>

        <label className={`flex items-center gap-3 transition-colors text-sm cursor-pointer px-1 py-2 rounded-lg ${isDark ? 'text-white/50 hover:text-white/80 hover:bg-white/5' : 'text-black/50 hover:text-black/80 hover:bg-black/5'}`}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className={`w-4 h-4 rounded bg-transparent accent-blue-500 ${isDark ? 'border-white/20' : 'border-black/20'}`}
          />
          Remember my selection
        </label>
      </div>
    </main>
  );
}
