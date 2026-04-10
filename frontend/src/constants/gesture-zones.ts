import type { GestureZoneId } from '../types/gestures';

export const GESTURE_ZONE_META: Record<GestureZoneId, { label: string; hint: string; color: string }> = {
  'notification-center': {
    label: 'Notification Center',
    hint: 'Swipe down from top-left',
    color: 'rgba(59, 130, 246, 0.18)'
  },
  'control-center': {
    label: 'Control Center',
    hint: 'Swipe down from top-right',
    color: 'rgba(34, 197, 94, 0.18)'
  },
  spotlight: {
    label: 'Spotlight',
    hint: 'Swipe down from middle',
    color: 'rgba(168, 85, 247, 0.16)'
  },
  'home-swipe': {
    label: 'Home / Switcher',
    hint: 'Swipe up from bottom edge',
    color: 'rgba(249, 115, 22, 0.18)'
  }
};
