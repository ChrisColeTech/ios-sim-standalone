/**
 * Platform API bridge.
 *
 * Electron mode  → calls through window.electronAPI (set by preload.ts),
 *                  falls back to localhost HTTP endpoints.
 * Browser mode   → pure client-side: Zustand store is the source of truth.
 *                  localStorage is ONLY used when "remember" is checked.
 */

import { isBrowser } from './runtime';
import { useUiStoreState } from '../store/uiStore';

const api = () => window.electronAPI;

const STORAGE_DEVICE = 'sim-device';
const STORAGE_REMEMBER = 'sim-rememberSelection';
const STORAGE_THEME = 'sim-theme';
const STORAGE_UI = 'frontend-ui-store';

/** Wipe all simulator keys from localStorage. */
export function clearBrowserState(): void {
  localStorage.removeItem(STORAGE_DEVICE);
  localStorage.removeItem(STORAGE_REMEMBER);
  localStorage.removeItem(STORAGE_THEME);
  localStorage.removeItem(STORAGE_UI);
}

// ---------------------------------------------------------------------------
// Window controls
// ---------------------------------------------------------------------------

let _isMaximized = false;
let _restoreRect = { x: 0, y: 0, w: 0, h: 0 };

export function Minimise(): void {
  if (isBrowser) {
    window.blur();
    return;
  }
  api()?.windowMinimise();
}

export function Maximise(): void {
  if (isBrowser) {
    if (_isMaximized) {
      window.moveTo(_restoreRect.x, _restoreRect.y);
      window.resizeTo(_restoreRect.w, _restoreRect.h);
      _isMaximized = false;
    } else {
      _restoreRect = { x: window.screenX, y: window.screenY, w: window.outerWidth, h: window.outerHeight };
      window.moveTo(0, 0);
      window.resizeTo(screen.availWidth, screen.availHeight);
      _isMaximized = true;
    }
    return;
  }
  api()?.windowMaximise();
}

export function Close(): void {
  if (isBrowser) {
    window.close();
    return;
  }
  api()?.windowClose();
}

// ---------------------------------------------------------------------------
// App queries
// ---------------------------------------------------------------------------

export async function GetStandaloneApp(): Promise<string> {
  if (isBrowser) {
    const params = new URLSearchParams(window.location.search);
    return params.get('app') ?? '';
  }
  if (api()) return api().getStandaloneApp();
  return '';
}

export async function GetCurrentDevice(): Promise<string> {
  if (isBrowser) {
    // URL param takes priority (from landing page launch with specific device)
    const params = new URLSearchParams(window.location.search);
    const urlDevice = params.get('device');
    if (urlDevice) {
      // Set device in store for this session only — don't persist to localStorage
      useUiStoreState.getState().setSimulatorState({
        deviceId: urlDevice,
        deviceFamily: urlDevice.startsWith('ipad') ? 'ipad' : 'iphone',
        isLandscape: useUiStoreState.getState().isLandscape,
        theme: useUiStoreState.getState().theme,
      });
      return urlDevice;
    }
    // Remembered device from a previous session, or current session from store
    return localStorage.getItem(STORAGE_DEVICE) ?? useUiStoreState.getState().deviceId ?? '';
  }
  if (api()) return api().getCurrentDevice();
  try {
    const res = await fetch('http://localhost:32199/state');
    const data = await res.json();
    return data.device || '';
  } catch {
    return '';
  }
}

export async function GetBroadcastState(): Promise<{
  device: string;
  isLandscape: boolean;
  theme: string;
  devToolsOpen: boolean;
}> {
  if (isBrowser) {
    const store = useUiStoreState.getState();
    return {
      device: localStorage.getItem(STORAGE_DEVICE) ?? '',
      isLandscape: store.isLandscape,
      theme: store.theme,
      devToolsOpen: false,
    };
  }
  if (api()) return api().getBroadcastState();
  try {
    const res = await fetch('http://localhost:32199/state');
    return await res.json();
  } catch {
    return { device: '', isLandscape: false, theme: 'dark', devToolsOpen: false };
  }
}

export async function HandleMenuClick(action: string): Promise<void> {
  if (isBrowser) {
    window.dispatchEvent(new CustomEvent('sim-menu-action', { detail: action }));
    return;
  }
  if (api()) return api().handleMenuClick(action);
  await fetch(`http://localhost:32199/menu/${action}`, { method: 'POST' });
}

export async function SetPendingDevice(device: string, remember: boolean): Promise<void> {
  if (isBrowser) {
    if (remember) {
      localStorage.setItem(STORAGE_DEVICE, device);
      localStorage.setItem(STORAGE_REMEMBER, 'true');
    }
    // Update Zustand store — this is the in-session source of truth
    const s = useUiStoreState.getState();
    useUiStoreState.getState().setSimulatorState({
      deviceId: device,
      deviceFamily: device.startsWith('ipad') ? 'ipad' : 'iphone',
      isLandscape: s.isLandscape,
      theme: s.theme,
    });
    return;
  }
  if (api()) return api().setPendingDevice(device, remember);
  // Electron HTTP fallback
  await fetch(`http://localhost:32199/menu/switch-device:${device}`, { method: 'POST' });
  if (remember) {
    await fetch('http://localhost:32199/settings/device', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: device }),
    });
    await fetch('http://localhost:32199/settings/rememberDevice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'true' }),
    });
  } else {
    await fetch('http://localhost:32199/settings/rememberDevice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: '' }),
    });
  }
}

export async function CheckForUpdate(): Promise<{
  available: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseUrl: string;
  releaseNotes: string;
}> {
  return {
    available: false,
    currentVersion: '0.0.0',
    latestVersion: '0.0.0',
    releaseUrl: '',
    releaseNotes: '',
  };
}

/** Show the window — Electron windows start hidden. */
export function WindowShow(): void {
  // No-op in both modes
}
