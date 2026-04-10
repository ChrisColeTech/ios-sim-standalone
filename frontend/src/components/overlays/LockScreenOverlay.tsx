import { motion } from 'framer-motion';
import { BottomBar } from '../chrome/BottomBar';
import { HelloContent } from '../hello/HelloContent';
import { LockStatusBar } from '../chrome/LockStatusBar';
import { Wallpaper } from '../chrome/Wallpaper';
import { useLockScreenGesture } from '../../hooks/useLockScreenGesture';
import type { LockScreenOverlayProps } from '../../types/components';

export function LockScreenOverlay(props: LockScreenOverlayProps) {
  const gesture = useLockScreenGesture(props.onDismiss);

  if (!props.isVisible) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-[100] pointer-events-auto">
      {/* Wallpaper — stays fixed, doesn't slide */}
      <Wallpaper theme={props.theme} />
      <div className="absolute inset-0 backdrop-blur-lg" />

      {/* Lock screen content — slides up on swipe */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between select-none touch-none overscroll-none cursor-grab active:cursor-grabbing"
        style={{ y: gesture.y }}
        drag="y"
        dragConstraints={{ top: -9999, bottom: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        onDrag={gesture.handleDrag}
        onDragEnd={gesture.handleDragEnd}
        onWheel={gesture.handleWheel}
      >
        <LockStatusBar />
        {props.isFirstLaunch ? (
          <HelloContent />
        ) : (
          <>
            <div className="flex flex-col justify-center items-center flex-1 text-white">
              <div className="text-6xl font-thin">9:41</div>
              <div className="text-lg mt-2">Friday, April 4</div>
            </div>
            <div className="text-center text-white text-sm mb-10">
              Swipe up to unlock
            </div>
          </>
        )}
        <BottomBar />
      </motion.div>
    </div>
  );
}
