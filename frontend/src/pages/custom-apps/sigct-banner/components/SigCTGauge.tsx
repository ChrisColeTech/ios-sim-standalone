import { PieChart, Pie, Cell } from 'recharts';
import {
  GAUGE_TRACK_COLOR, GAUGE_GREEN, GAUGE_RED, GAUGE_LIGHT_BLUE,
} from '../../../../constants/custom-apps/sigct-banner';

type SigCTGaugeProps = {
  salesPercent: number;
  salesAmount: string;
  planAmount: string;
  targetPercent?: number;
  size?: number;
  isDark?: boolean;
};

/**
 * Circular gauge matching SigLiveGraphView.swift.
 * Shows sales % of plan as a filled arc with an optional target arc.
 */
export function SigCTGauge(props: SigCTGaugeProps) {
  const size = props.size ?? 100;
  const pct = Math.min(Math.max(props.salesPercent, 0), 100);
  const target = props.targetPercent != null ? Math.min(props.targetPercent * 100, 100) : undefined;
  const isOverTarget = target != null ? pct >= target : pct > 0;
  const barColor = isOverTarget ? GAUGE_GREEN : GAUGE_RED;

  // Outer ring: target (if available)
  const outerData = target != null
    ? [{ value: target }, { value: 100 - target }]
    : [{ value: 0 }, { value: 100 }];

  // Inner ring: sales %
  const innerData = [{ value: pct }, { value: 100 - pct }];

  const textColor = props.isDark !== false ? '#fff' : '#000';
  const mutedColor = props.isDark !== false ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <PieChart width={size} height={size}>
          {/* Track ring */}
          <Pie data={[{ value: 100 }]} cx="50%" cy="50%"
            innerRadius={size * 0.34} outerRadius={size * 0.42}
            startAngle={90} endAngle={-270} dataKey="value" isAnimationActive={false}>
            <Cell fill={GAUGE_TRACK_COLOR} />
          </Pie>
          {/* Outer ring: target */}
          {target != null && (
            <Pie data={outerData} cx="50%" cy="50%"
              innerRadius={size * 0.34} outerRadius={size * 0.42}
              startAngle={90} endAngle={-270} dataKey="value" isAnimationActive={false}>
              <Cell fill={GAUGE_LIGHT_BLUE} />
              <Cell fill="transparent" />
            </Pie>
          )}
          {/* Inner ring: sales */}
          <Pie data={innerData} cx="50%" cy="50%"
            innerRadius={size * 0.25} outerRadius={size * 0.33}
            startAngle={90} endAngle={-270} dataKey="value" isAnimationActive={false}>
            <Cell fill={barColor} />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
        {/* Center labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[11px] font-bold" style={{ color: barColor }}>
            {pct.toFixed(1)}%
          </span>
          <span className="text-[7px]" style={{ color: barColor }}>
            {props.salesAmount}
          </span>
        </div>
      </div>
      {/* Sales / Plan labels below */}
      <div className="mt-1 flex w-full justify-between px-2">
        <div className="text-left">
          <div className="text-[6px]" style={{ color: mutedColor }}>Sales</div>
          <div className="text-[8px] font-medium" style={{ color: textColor }}>{props.salesAmount}</div>
        </div>
        <div className="text-right">
          <div className="text-[6px]" style={{ color: mutedColor }}>Plan</div>
          <div className="text-[8px] font-medium" style={{ color: textColor }}>{props.planAmount}</div>
        </div>
      </div>
    </div>
  );
}
