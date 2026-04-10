export type DeviceId = 'ipad-pro' | 'iphone-15-pro' | 'iphone-se';

export type DeviceInfo = {
  id: DeviceId;
  name: string;
  width: number;
  height: number;
};

export const DEVICES: DeviceInfo[] = [
  { id: 'ipad-pro', name: 'iPad Pro', width: 500, height: 700 },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', width: 300, height: 500 },
  { id: 'iphone-se', name: 'iPhone SE', width: 275, height: 475 },
];
