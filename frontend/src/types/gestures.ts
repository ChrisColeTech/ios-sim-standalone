export type GestureZoneId = 'notification-center' | 'control-center' | 'spotlight' | 'home-swipe';

export type GestureAction =
  | 'notification-center'
  | 'control-center'
  | 'spotlight'
  | 'app-switcher'
  | 'unlock'
  | 'close-app'
  | 'none';

export type GestureZoneRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GestureZone = {
  id: GestureZoneId;
  label: string;
  hint: string;
  color: string;
  rect: GestureZoneRect;
};
