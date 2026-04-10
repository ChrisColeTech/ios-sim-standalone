import { useCallback, useEffect, useRef, useState } from 'react';
import type { GestureAction, GestureZone, GestureZoneId } from '../types/gestures';
import type { OverlayType } from '../types/overlays';

const SWIPE_THRESHOLD = 50;
const SWITCHER_THRESHOLD = 90;
const WHEEL_ACCUMULATE_MS = 600;

type UseViewportGesturesOptions = {
  isLocked: boolean;
  openApp: string | null;
  overlayGesturesEnabled: boolean;
  openOverlay: OverlayType;
  zones: GestureZone[];
  getZoneAtPoint: (x: number, y: number) => GestureZoneId | null;
  onUnlock: () => void;
  onCloseApp: () => void;
  onOpenOverlay: (overlay: Exclude<OverlayType, null>) => void;
  onCloseOverlay: () => void;
};

export function useViewportGestures(options: UseViewportGesturesOptions) {
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const wheelAccum = useRef({ dy: 0, lastTick: 0 });
  const [hoveredZoneId, setHoveredZoneId] = useState<GestureZoneId | null>(null);
  const [gestureStartZoneId, setGestureStartZoneId] = useState<GestureZoneId | null>(null);
  const [lastResolvedAction, setLastResolvedAction] = useState<GestureAction | null>(null);

  const resolveVerticalGesture = useCallback((zoneId: GestureZoneId | null, deltaY: number, fromWheel = false) => {
    if (options.isLocked) {
      // When locked and triggered by wheel, let the LockScreenOverlay's own
      // handleWheel manage the progressive slide-up animation.
      // Only pointer/drag gestures should trigger unlock from here.
      if (fromWheel) return;
      if (deltaY <= -SWIPE_THRESHOLD) {
        options.onUnlock();
        setLastResolvedAction('unlock');
      }
      return;
    }

    if (options.openOverlay) {
      // Dismiss with opposite gesture: if opened by scroll down, dismiss by scroll up
      if (options.openOverlay === 'notification-center' && deltaY <= -SWIPE_THRESHOLD) {
        options.onCloseOverlay();
        setLastResolvedAction('none');
        return;
      }
      if (options.openOverlay === 'control-center' && deltaY <= -SWIPE_THRESHOLD) {
        options.onCloseOverlay();
        setLastResolvedAction('none');
        return;
      }
      if (options.openOverlay === 'spotlight' && deltaY <= -SWIPE_THRESHOLD) {
        options.onCloseOverlay();
        setLastResolvedAction('none');
        return;
      }
      if (options.openOverlay === 'app-switcher' && deltaY >= SWIPE_THRESHOLD) {
        options.onCloseOverlay();
        setLastResolvedAction('none');
        return;
      }

      return;
    }

    if (options.overlayGesturesEnabled && zoneId === 'notification-center' && deltaY >= SWIPE_THRESHOLD) {
      options.onOpenOverlay('notification-center');
      setLastResolvedAction('notification-center');
      return;
    }

    if (options.overlayGesturesEnabled && zoneId === 'control-center' && deltaY >= SWIPE_THRESHOLD) {
      options.onOpenOverlay('control-center');
      setLastResolvedAction('control-center');
      return;
    }

    if (options.overlayGesturesEnabled && zoneId === 'spotlight' && deltaY >= SWIPE_THRESHOLD && !options.openApp) {
      options.onOpenOverlay('spotlight');
      setLastResolvedAction('spotlight');
      return;
    }

    if (options.overlayGesturesEnabled && zoneId === 'home-swipe' && deltaY <= -SWITCHER_THRESHOLD && !options.openApp) {
      options.onOpenOverlay('app-switcher');
      setLastResolvedAction('app-switcher');
      return;
    }

    if (zoneId === 'home-swipe' && deltaY <= -SWIPE_THRESHOLD && options.openApp) {
      options.onCloseApp();
      setLastResolvedAction('close-app');
      return;
    }
  }, [options]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !options.openOverlay) {
        return;
      }

      options.onCloseOverlay();
      setLastResolvedAction('none');
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [options]);

  const getPoint = useCallback((clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  return {
    hoveredZoneId,
    gestureStartZoneId,
    lastResolvedAction,
    onPointerDownCapture: (event: React.PointerEvent<HTMLElement>) => {
      const point = getPoint(event.clientX, event.clientY, event.currentTarget);
      const zoneId = options.getZoneAtPoint(point.x, point.y);
      startPoint.current = point;
      setGestureStartZoneId(zoneId);
      setHoveredZoneId(zoneId);
    },
    onPointerMoveCapture: (event: React.PointerEvent<HTMLElement>) => {
      const point = getPoint(event.clientX, event.clientY, event.currentTarget);
      setHoveredZoneId(options.getZoneAtPoint(point.x, point.y));
    },
    onPointerUpCapture: (event: React.PointerEvent<HTMLElement>) => {
      if (!startPoint.current) {
        return;
      }

      const point = getPoint(event.clientX, event.clientY, event.currentTarget);
      resolveVerticalGesture(gestureStartZoneId, point.y - startPoint.current.y);
      startPoint.current = null;
      setGestureStartZoneId(null);
    },
    onPointerCancelCapture: () => {
      startPoint.current = null;
      setGestureStartZoneId(null);
    },
    onWheelCapture: (event: React.WheelEvent<HTMLElement>) => {
      const point = getPoint(event.clientX, event.clientY, event.currentTarget);
      const zoneId = options.getZoneAtPoint(point.x, point.y);
      const now = Date.now();
      setHoveredZoneId(zoneId);

      if (now - wheelAccum.current.lastTick > WHEEL_ACCUMULATE_MS) {
        wheelAccum.current = { dy: 0, lastTick: now };
      }

      if (wheelAccum.current.dy !== 0 && Math.sign(event.deltaY) !== Math.sign(wheelAccum.current.dy)) {
        wheelAccum.current = { dy: 0, lastTick: now };
      }

      wheelAccum.current.dy += event.deltaY;
      wheelAccum.current.lastTick = now;
      resolveVerticalGesture(zoneId, wheelAccum.current.dy, true);
    }
  };
}
