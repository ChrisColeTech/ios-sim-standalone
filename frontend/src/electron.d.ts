/**
 * Type definitions for the Electron preload API exposed via contextBridge.
 * Must match src/electron/src/preload.ts exactly.
 */

interface ElectronAPI {
  // Window controls
  windowMinimise: () => void;
  windowMaximise: () => void;
  windowClose: () => void;

  // App queries
  getStandaloneApp: () => Promise<string>;
  getCurrentDevice: () => Promise<string>;
  getBroadcastState: () => Promise<{
    device: string;
    isLandscape: boolean;
    theme: string;
    devToolsOpen: boolean;
  }>;
  getAppVersion: () => Promise<string>;

  // Actions
  handleMenuClick: (action: string) => Promise<void>;
  setPendingDevice: (device: string, remember: boolean) => Promise<void>;

  // Native menu actions (main -> renderer)
  onNativeMenuAction: (callback: (action: string) => void) => void;
}

interface Window {
  electronAPI: ElectronAPI;
}

// Electron <webview> JSX support
declare namespace JSX {
  interface IntrinsicElements {
    webview: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        preload?: string;
        partition?: string;
        allowpopups?: string;
        nodeintegration?: string;
        webpreferences?: string;
      },
      HTMLElement
    >;
  }
}
