import { useEffect, useRef } from 'react';

const ACTIVITY_EVENTS = ['pointermove', 'pointerdown', 'keydown'] as const;
const THROTTLE_MS = 5000;

export function useAutoLock(lockFn: () => void, timeoutMs: number) {
  const timerRef = useRef(0);
  const lastActivityRef = useRef(0);

  useEffect(() => {
    lastActivityRef.current = Date.now();

    function resetTimer() {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(lockFn, timeoutMs);
    }

    function onActivity() {
      const now = Date.now();
      if (now - lastActivityRef.current < THROTTLE_MS) return;
      lastActivityRef.current = now;
      resetTimer();
    }

    resetTimer();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity, { passive: true });
    }

    return () => {
      window.clearTimeout(timerRef.current);
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
    };
  }, [lockFn, timeoutMs]);
}
