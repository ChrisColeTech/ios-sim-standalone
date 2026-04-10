import { useUiStoreState } from '../../store/uiStore';
import { DevicePickerPage } from '../../pages/DevicePickerPage';
import { AppLayout } from './AppLayout';
import { useAppLayoutState } from '../../hooks/useAppLayoutState';
import { useAutoLock } from '../../hooks/useAutoLock';
import type { AppModeRouterProps } from '../../types/components';

const AUTO_LOCK_MS = 15 * 60 * 1000;

function SimulatorMode() {
  const appLayoutState = useAppLayoutState();
  const { viewport } = appLayoutState;

  const lock = () => {
    if (!viewport.isLocked) {
      viewport.onToggleLock();
    }
  };

  useAutoLock(lock, AUTO_LOCK_MS);

  return <AppLayout {...appLayoutState} />;
}

export function AppModeRouter({ mode }: AppModeRouterProps) {
  const isTransitioning = useUiStoreState((s) => s.isTransitioning);
  const effectiveMode = isTransitioning ? 'picker' : mode;

  if (effectiveMode === 'loading') {
    return <div className="w-full h-full bg-[#1C1C1E] flex items-center justify-center animate-pulse" />;
  }
  if (effectiveMode === 'picker') {
    return <DevicePickerPage />;
  }
  return <SimulatorMode />;
}
