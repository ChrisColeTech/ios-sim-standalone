import { useRef } from 'react';
import { animate, useMotionValue } from 'framer-motion';

const MAX_WHEEL_PULL = 240;
const UNLOCK_PROGRESS_THRESHOLD = 0.2;
const WHEEL_UP_GAIN = 0.007;
const WHEEL_DOWN_GAIN = 0.003;

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function useLockScreenGesture(onDismiss: () => void) {
  const y = useMotionValue(0);
  const isDismissingRef = useRef(false);
  const wheelProgressRef = useRef(0);
  const wheelResetTimerRef = useRef<number | null>(null);

  const animateFromWheelProgress = () => {
    const easedProgress = easeOutCubic(wheelProgressRef.current);
    const nextY = -(MAX_WHEEL_PULL * easedProgress);

    animate(y, nextY, {
      type: 'spring',
      damping: 28,
      stiffness: 230,
      mass: 0.85
    });
  };

  const springBack = () => {
    wheelProgressRef.current = 0;
    animate(y, 0, {
      type: 'spring',
      damping: 30,
      stiffness: 260,
      mass: 0.9
    });
  };

  const dismiss = () => {
    if (isDismissingRef.current) {
      return;
    }

    if (wheelResetTimerRef.current !== null) {
      window.clearTimeout(wheelResetTimerRef.current);
      wheelResetTimerRef.current = null;
    }

    isDismissingRef.current = true;
    const dismissTarget = -(window.innerHeight + 40);

    animate(y, dismissTarget, {
      type: 'tween',
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      onComplete: onDismiss
    });
  };

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    const shouldDismiss = info.offset.y < -110 || info.velocity.y < -650;

    if (shouldDismiss) {
      dismiss();
    } else {
      springBack();
    }
  };

  const handleWheel = (event: { deltaY: number }) => {
    if (isDismissingRef.current) {
      return;
    }

    if (event.deltaY < 0) {
      const wheelUpProgressStep = Math.min(0.28, Math.max(0.01, -event.deltaY * WHEEL_UP_GAIN));
      wheelProgressRef.current += wheelUpProgressStep;
    } else if (event.deltaY > 0) {
      const wheelDownProgressStep = Math.min(0.22, Math.max(0.01, event.deltaY * WHEEL_DOWN_GAIN));
      wheelProgressRef.current -= wheelDownProgressStep;
    }

    wheelProgressRef.current = Math.max(0, Math.min(1, wheelProgressRef.current));

    animateFromWheelProgress();

    if (wheelProgressRef.current >= UNLOCK_PROGRESS_THRESHOLD) {
      dismiss();
      return;
    }

    if (wheelResetTimerRef.current !== null) {
      window.clearTimeout(wheelResetTimerRef.current);
    }

    wheelResetTimerRef.current = window.setTimeout(() => {
      if (isDismissingRef.current) {
        return;
      }

      springBack();
    }, 210);
  };

  const handleDrag = (_: unknown, info: { offset: { y: number } }) => {
    if (!isDismissingRef.current && info.offset.y < -110) {
      dismiss();
    }
  };

  return { y, handleDrag, handleDragEnd, handleWheel };
}
