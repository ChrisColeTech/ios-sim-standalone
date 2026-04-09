import { useCallback, useEffect, useRef, useState } from 'react';
import { OverlayHost } from '../overlays/OverlayHost';
import { Viewport } from '../viewport/Viewport';
import { useAppVisibility } from '../../hooks/useAppVisibility';
import { useDebugZones } from '../../hooks/useDebugZones';
import { useGestureZones } from '../../hooks/useGestureZones';
import { useNativeMenuSync } from '../../hooks/useNativeMenuSync';
import { useViewportGestures } from '../../hooks/useViewportGestures';
import { useUiStoreState as useUiStore } from '../../store/uiStore';
import { isBrowser } from '../../services/runtime';
import type { AppLayoutProps } from '../../types/components';

export function AppLayout(props: AppLayoutProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const setOpenOverlay = useUiStore((state) => state.setOpenOverlay);
  const closeOverlay = useUiStore((state) => state.closeOverlay);
  const toggleDebugZones = useUiStore((state) => state.toggleDebugZones);
  const showStockApps = useUiStore((state) => state.showStockApps);
  const showCustomApps = useUiStore((state) => state.showCustomApps);
  const toggleStockApps = useUiStore((state) => state.toggleStockApps);
  const toggleCustomApps = useUiStore((state) => state.toggleCustomApps);
  const hasCompletedHello = useUiStore((state) => state.hasCompletedHello);
  const completeHello = useUiStore((state) => state.completeHello);
  const debugZones = useDebugZones({ showDebugZones: props.showDebugZones, toggleDebugZones });
  const appVisibility = useAppVisibility({ toggleStockApps, toggleCustomApps });
  const handleMenuAction = useCallback((action: string) => {
    debugZones.handleMenuAction(action);
    appVisibility.handleMenuAction(action);
  }, [debugZones, appVisibility]);
  const { zones, getZoneAtPoint } = useGestureZones(size.width, size.height);
  const overlayGesturesEnabled = !props.viewport.openApp;
  const gestures = useViewportGestures({
    isLocked: props.viewport.isLocked,
    openApp: props.viewport.openApp,
    overlayGesturesEnabled,
    openOverlay: props.overlay,
    zones,
    getZoneAtPoint,
    onUnlock: props.viewport.onUnlock,
    onCloseApp: props.viewport.onCloseApp,
    onOpenOverlay: setOpenOverlay,
    onCloseOverlay: closeOverlay
  });

  useNativeMenuSync({ onAction: handleMenuAction, showDebugZones: props.showDebugZones, showStockApps, showCustomApps });

  const updateSize = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setSize({ width: rect.width, height: rect.height });
  }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      if (isBrowser) {
        // In browser mode, check localStorage directly
        if (localStorage.getItem('sim-rememberDevice')) {
          completeHello();
        }
        return;
      }
      try {
        const response = await fetch('http://localhost:32199/settings/rememberDevice');
        const data = await response.json();
        if (data.value) {
          completeHello();
        }
      } catch (error) {
        console.error('Failed to check rememberDevice setting:', error);
      }
    };

    checkFirstLaunch();
  }, [completeHello]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    window.addEventListener('resize', updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [updateSize]);

  return (
    <main
      ref={containerRef}
      className="relative w-full h-full"
      onPointerDownCapture={gestures.onPointerDownCapture}
      onPointerMoveCapture={gestures.onPointerMoveCapture}
      onPointerUpCapture={gestures.onPointerUpCapture}
      onPointerCancelCapture={gestures.onPointerCancelCapture}
      onWheelCapture={gestures.onWheelCapture}
    >
      <Viewport {...props.viewport} />
      <OverlayHost
        overlay={props.overlay}
        isLocked={props.viewport.isLocked}
        isFirstLaunch={!hasCompletedHello}
        theme={props.viewport.theme}
        onCloseOverlay={closeOverlay}
        onUnlock={props.viewport.onUnlock}
        onCompleteHello={completeHello}
      />
    </main>
  );
}
