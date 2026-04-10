import { useMemo } from 'react';
import { useViewportState } from './useViewportState';
import { useUiStoreState as useUiStore } from '../store/uiStore';
import type { AppLayoutState } from '../types/app';

export function useAppLayoutState(): AppLayoutState {
  const viewport = useViewportState();
  const overlay = useUiStore((state) => state.openOverlay);
  const showDebugZones = useUiStore((state) => state.showDebugZones);

  return useMemo(() => ({
    overlay,
    showDebugZones,
    zones: [],
    viewport
  }), [overlay, showDebugZones, viewport]);
}
