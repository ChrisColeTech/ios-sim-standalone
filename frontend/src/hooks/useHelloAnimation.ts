import { useState, useEffect, useRef, useCallback } from 'react';
import { GREETING_ORDER } from '../assets/greeting-paths';
import type { HelloPhase, HelloAnimationState } from '../types/hello';

const WRITE_DURATION_MS = 2200;
const HOLD_DURATION_MS = 1400;
const FADE_DURATION_MS = 800;

export function useHelloAnimation(): HelloAnimationState {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<HelloPhase>('writing');
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const advance = useCallback(() => {
    setPhase('fading');

    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % GREETING_ORDER.length);
      setPhase('writing');
    }, FADE_DURATION_MS);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === 'writing') {
      t = setTimeout(() => setPhase('holding'), WRITE_DURATION_MS);
    } else if (phase === 'holding') {
      t = setTimeout(advance, HOLD_DURATION_MS);
    }

    return () => clearTimeout(t);
  }, [phase, advance]);

  useEffect(() => {
    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, []);

  return {
    currentGreeting: GREETING_ORDER[index],
    greetingIndex: index,
    phase
  };
}
