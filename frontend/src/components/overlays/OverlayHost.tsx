import { AnimatePresence } from 'framer-motion';
import { OverlayRenderer } from './OverlayRenderer';
import { LockScreenOverlay } from './LockScreenOverlay';
import type { OverlayHostProps } from '../../types/components';

export function OverlayHost(props: OverlayHostProps) {
  const {
    isFirstLaunch,
    onCompleteHello,
    onUnlock,
    isLocked,
    overlay,
    onCloseOverlay
  } = props;

  const handleLockDismiss = () => {
    if (isFirstLaunch) {
      onCompleteHello();
    }
    onUnlock();
  };

  const shouldBlock = isLocked || !!overlay;

  return (
    <div className={`absolute inset-0 ${shouldBlock ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <AnimatePresence>{overlay ? <OverlayRenderer overlay={overlay} onClose={onCloseOverlay} /> : null}</AnimatePresence>
      {isLocked ? (
        <LockScreenOverlay
          isVisible={isLocked}
          isFirstLaunch={isFirstLaunch}
          theme={props.theme}
          onDismiss={handleLockDismiss}
        />
      ) : null}
    </div>
  );
}
