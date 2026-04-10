import { motion } from 'framer-motion';
import { useSvgStrokeAnimation } from '../../hooks/useSvgStrokeAnimation';
import { GREETING_PATHS } from '../../assets/greeting-paths';
import type { HelloSvgPathProps } from '../../types/hello';

export function HelloSvgPath(props: HelloSvgPathProps) {
  const { length, measure, dashOffset } = useSvgStrokeAnimation(props.phase, props.text);
  const greeting = GREETING_PATHS[props.text];

  if (!greeting) return null;

  const maskId = `stroke-mask-${props.text.replace(/\s/g, '-')}`;

  return (
    <svg
      viewBox={greeting.viewBox}
      width="280"
      height="120"
      fill="none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <mask id={maskId}>
          <motion.path
            key={props.text}
            ref={measure}
            d={greeting.pathData}
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray={length || undefined}
            style={{ strokeDashoffset: length ? dashOffset : undefined }}
          />
        </mask>
      </defs>
      <path
        d={greeting.pathData}
        fill="white"
        stroke="none"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
