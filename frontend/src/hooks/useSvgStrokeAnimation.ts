import { useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import type { HelloPhase } from '../types/hello';

export function useSvgStrokeAnimation(phase: HelloPhase, text: string) {
  void text;
  const [length, setLength] = useState(0);
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (v) => length * (1 - v));

  const measure = useCallback((node: SVGPathElement | null) => {
    if (node) {
      setLength(node.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (length === 0) return;

    if (phase === 'writing') {
      progress.set(0);
      animate(progress, 1, {
        duration: 2.0,
        ease: [0.45, 0, 0.55, 1]
      });
    } else if (phase === 'fading') {
      animate(progress, 0, { duration: 0.4 });
    }
  }, [phase, length, progress]);

  return { length, measure, dashOffset };
}
