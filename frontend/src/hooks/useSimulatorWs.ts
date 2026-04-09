import { useEffect, useRef, useState, useCallback } from 'react';
import { isBrowser } from '../services/runtime';
import { useUiStoreState } from '../store/uiStore';

type SimulatorWsState = {
  device: string | null;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  devToolsOpen: boolean;
};

type MenuActionCallback = (action: string) => void;
type AppCommandCallback = (command: { type: string; [key: string]: unknown }) => void;

const FALLBACK_STATE: SimulatorWsState = {
  device: null,
  isLandscape: false,
  theme: 'light',
  devToolsOpen: false
};

const RECONNECT_MS = 1000;
const MAX_RECONNECT_MS = 8000;

/**
 * Browser mode: return state from Zustand store (no WebSocket).
 * Electron mode: connect to ws://localhost:32200/ws as before.
 */
export function useSimulatorWs(
  onMenuAction?: MenuActionCallback,
  onAppCommand?: AppCommandCallback
) {
  // These selectors must always be called (rules of hooks) even if unused in browser mode
  useUiStoreState((s) => s.theme);
  useUiStoreState((s) => s.deviceFamily);
  useUiStoreState((s) => s.isLandscape);

  const [state, setState] = useState<SimulatorWsState>(FALLBACK_STATE);
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(RECONNECT_MS);
  const mountedRef = useRef(true);
  const menuCbRef = useRef(onMenuAction);
  const appCmdCbRef = useRef(onAppCommand);
  menuCbRef.current = onMenuAction;
  appCmdCbRef.current = onAppCommand;

  // In browser mode, subscribe to any Zustand store change and re-read localStorage
  useEffect(() => {
    if (!isBrowser) return;

    const sync = () => {
      const s = useUiStoreState.getState();
      const device = localStorage.getItem('sim-device') ?? null;
      setState({
        device,
        isLandscape: s.isLandscape,
        theme: s.theme,
        devToolsOpen: false,
      });
    };

    // Initial sync
    sync();

    // Re-sync on every store change
    const unsub = useUiStoreState.subscribe(sync);
    return unsub;
  }, []);

  const connect = useCallback(() => {
    if (isBrowser) return; // no WS in browser mode
    if (!mountedRef.current) return;

    const ws = new WebSocket('ws://localhost:32200/ws');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('[WS] Connected');
      retryRef.current = RECONNECT_MS;
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === 'state' && (msg.state || msg.data)) {
          const next = (msg.state || msg.data) as Partial<SimulatorWsState>;
          setState((prev) => ({
            device: typeof next.device === 'string' || next.device === null ? next.device : prev.device,
            isLandscape: typeof next.isLandscape === 'boolean' ? next.isLandscape : prev.isLandscape,
            theme: next.theme === 'light' || next.theme === 'dark' ? next.theme : prev.theme,
            devToolsOpen: typeof next.devToolsOpen === 'boolean' ? next.devToolsOpen : prev.devToolsOpen
          }));
        }

        if (msg.type === 'menu-action' && (msg.data?.action || msg.action)) {
          menuCbRef.current?.(msg.data?.action || msg.action);
        }

        // App commands from MCP: open-app, close-app, navigate
        // Only process in Electron — browser clients should ignore these
        if ((msg.type === 'open-app' || msg.type === 'close-app' || msg.type === 'navigate') && window.electronAPI) {
          appCmdCbRef.current?.(msg);
        }
      } catch {
        // Ignore invalid payloads
      }
    };

    ws.onerror = () => {
      console.warn('[WS] Connection error');
    };

    ws.onclose = () => {
      console.warn(`[WS] Closed, retrying in ${retryRef.current}ms`);
      wsRef.current = null;
      if (mountedRef.current) {
        setTimeout(connect, retryRef.current);
        retryRef.current = Math.min(retryRef.current * 2, MAX_RECONNECT_MS);
      }
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      mountedRef.current = false;
      wsRef.current?.close();
    };
  }, [connect]);

  return state;
}
