import { useMemo } from 'react';
import { GESTURE_ZONE_META } from '../constants/gesture-zones';
import type { GestureZone, GestureZoneId } from '../types/gestures';

export function useGestureZones(width: number, height: number) {
  return useMemo(() => {
    const topHeight = Math.min(72, Math.round(height * 0.16));
    const bottomHeight = Math.min(72, Math.round(height * 0.14));
    const splitX = Math.round(width * 0.7);
    const zones: GestureZone[] = [
      {
        id: 'notification-center',
        ...GESTURE_ZONE_META['notification-center'],
        rect: { x: 0, y: 0, width: splitX, height: topHeight }
      },
      {
        id: 'control-center',
        ...GESTURE_ZONE_META['control-center'],
        rect: { x: splitX, y: 0, width: width - splitX, height: topHeight }
      },
      {
        id: 'spotlight',
        ...GESTURE_ZONE_META.spotlight,
        rect: { x: Math.round(width * 0.15), y: Math.round(height * 0.2), width: Math.round(width * 0.7), height: Math.round(height * 0.3) }
      },
      {
        id: 'home-swipe',
        ...GESTURE_ZONE_META['home-swipe'],
        rect: { x: 0, y: height - bottomHeight, width, height: bottomHeight }
      }
    ];

    const getZoneAtPoint = (x: number, y: number): GestureZoneId | null => (
      zones.find((zone) => x >= zone.rect.x && x <= zone.rect.x + zone.rect.width && y >= zone.rect.y && y <= zone.rect.y + zone.rect.height)?.id ?? null
    );

    return { zones, getZoneAtPoint };
  }, [height, width]);
}
