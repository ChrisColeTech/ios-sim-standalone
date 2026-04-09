import { useEffect, useState, useRef, useCallback } from 'react';
import { GetStandaloneApp, GetCurrentDevice, clearBrowserState } from '../services/electron';
import { isBrowser } from '../services/runtime';
import { useSimulatorWs } from './useSimulatorWs';

export type AppMode = 'picker' | 'simulator' | 'loading';

export function useAppMode(): AppMode {
  const wsState = useSimulatorWs();
  const [mode, setMode] = useState<AppMode>('loading');
  const hasInitialized = useRef(false);

  const recheckDevice = useCallback(async () => {
    try {
      const device = await GetCurrentDevice();
      setMode(device ? 'simulator' : 'picker');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const checkInitial = async () => {
      try {
        const standalone = await GetStandaloneApp();
        if (standalone) {
          if (!cancelled) setMode('simulator');
          return;
        }
        // In browser mode, only restore a device if "remember" was checked
        if (isBrowser && !localStorage.getItem('sim-rememberSelection')) {
          clearBrowserState();
          if (!cancelled) setMode('picker');
          return;
        }
        const initialDevice = await GetCurrentDevice();
        if (!cancelled) setMode(initialDevice ? 'simulator' : 'picker');
      } catch (err) {
        console.warn('[useAppMode] Initial check failed:', err);
        if (!cancelled) setMode('picker');
      } finally {
        hasInitialized.current = true;
      }
    };

    if (!hasInitialized.current) {
      checkInitial();
    }

    return () => { cancelled = true; };
  }, []);

  // React to WS state changes (Electron) or Zustand-derived changes (browser)
  useEffect(() => {
    if (hasInitialized.current && wsState.device !== null) {
      setMode(wsState.device ? 'simulator' : 'picker');
    }
  }, [wsState.device]);

  // Poll as fallback — only in Electron mode where WS may be slow/blocked
  useEffect(() => {
    if (isBrowser) return;
    if (mode !== 'picker' && mode !== 'loading') return;
    if (!hasInitialized.current) return;

    const interval = setInterval(recheckDevice, 500);
    return () => clearInterval(interval);
  }, [mode, recheckDevice]);

  return mode;
}
