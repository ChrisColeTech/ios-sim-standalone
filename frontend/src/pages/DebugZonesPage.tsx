import { motion } from 'framer-motion';
import { useGestureZones } from '../hooks/useGestureZones';
import type { DeviceFamily } from '../types/app';

type Props = {
  deviceFamily: DeviceFamily;
  isLandscape: boolean;
  viewportWidth: number;
  viewportHeight: number;
} & React.ComponentProps<typeof motion.div>;

export function DebugZonesPage(props: Props) {
  const { zones } = useGestureZones(props.viewportWidth, props.viewportHeight);
  const { deviceFamily, isLandscape, viewportWidth, viewportHeight, ...motionProps } = props;
  void deviceFamily;
  void isLandscape;
  void viewportWidth;
  void viewportHeight;

  return (
    <motion.div {...motionProps} className="absolute inset-0 bg-black/10 backdrop-blur-sm">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute"
          style={{
            left: zone.rect.x,
            top: zone.rect.y,
            width: zone.rect.width,
            height: zone.rect.height,
            background: zone.color
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div className="max-w-full px-2 text-center text-sm font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]">
              <div>{zone.label}</div>
              <div className="mt-1 text-xs text-white/90">{zone.hint}</div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
