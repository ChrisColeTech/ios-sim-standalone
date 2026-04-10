import { useSimulatorWs } from './useSimulatorWs';

type UseNativeMenuSyncOptions = {
  onAction: (action: string) => void;
  showDebugZones: boolean;
  showStockApps: boolean;
  showCustomApps: boolean;
};

export function useNativeMenuSync(options: UseNativeMenuSyncOptions) {
  // Menu actions are now handled by the shared useSimulatorWs hook.
  // This hook just passes the callback through.
  useSimulatorWs(options.onAction);
}
