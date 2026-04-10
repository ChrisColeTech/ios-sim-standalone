import type { DeviceFamily } from '../types/app';

type LayoutProfile = {
  dockEdge: 'bottom' | 'right';
};

type UseLayoutProfileInput = {
  deviceFamily: DeviceFamily;
  isLandscape: boolean;
};

export function useLayoutProfile(input: UseLayoutProfileInput): LayoutProfile {
  const dockEdge: 'bottom' | 'right' = input.deviceFamily === 'ipad'
    ? 'bottom'
    : input.isLandscape
      ? 'right'
      : 'bottom';

  return { dockEdge };
}
