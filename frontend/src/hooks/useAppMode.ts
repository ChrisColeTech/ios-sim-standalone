import { useEffect, useState, useRef, useCallback } from 'react';
import { GetStandaloneApp, GetCurrentDevice, clearBrowserState } from '../services/electron';
import { isBrowser } from '../services/runtime';
import { useUiStoreState } from '../store/uiStore';
import { useSimulatorWs } from './useSimulatorWs';

export type AppMode = 'picker' | 'simulator' | 'loading';

export function useAppMode(): AppMode {
  const wsState = useSimulatorWs();
  const deviceId = useUiStoreState((s) => s.deviceId);
  const [mode, setMode] = useState<AppMode>(() => {
    // If the store already has a device (selected this session), start in simulator mode
    if (isBrowser && useUiStoreState.getState().deviceId) return 'simulator';
    return 'loading';
  });
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
        // If the store already has a deviceId, a device was selected this session
        if (isBrowser && useUiStoreState.getState().deviceId) {
          if (!cancelled) setMode('simulator');
          hasInitialized.current = true;
          return;
        }

        const standalone = await GetStandaloneApp();
        if (standalone) {
          if (!cancelled) setMode('simulator');
          return;
        }

        // Browser: only restore from localStorage if remember was checked
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

  // React to device changes from the store (picker → simulator transition)
  useEffect(() => {
    if (deviceId) {
      setMode('simulator');
    }
  }, [deviceId]);

  // React to WS state changes (Electron mode)
  useEffect(() => {
    if (hasInitialized.current && wsState.device !== null) {
      setMode(wsState.device ? 'simulator' : 'picker');
    }
  }, [wsState.device]);

  // Poll as fallback — only in Electron mode
  useEffect(() => {
    if (isBrowser) return;
    if (mode !== 'picker' && mode !== 'loading') return;
    if (!hasInitialized.current) return;

    const interval = setInterval(recheckDevice, 500);
    return () => clearInterval(interval);
  }, [mode, recheckDevice]);

  return mode;
}
