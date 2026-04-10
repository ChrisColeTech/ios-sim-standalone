import { PieChart, Pie, Cell } from 'recharts';

type SigCT2GaugeProps = {
  salesPercent: number;
  salesAmount: string;
  planAmount: string;
  targetPercent?: number;
  size?: number;
  isDark?: boolean;
};

const GREEN = 'var(--color-ios-green)';
const RED = 'var(--color-ios-red)';
const GRAY = 'var(--color-ios-gray)';

export function SigCT2Gauge({
  salesPercent,
  salesAmount,
  planAmount,
  targetPercent = 100,
  size = 100,
  isDark = false,
}: SigCT2GaugeProps) {
  const capped = Math.min(salesPercent, 100);
  const isOnTarget = salesPercent >= targetPercent;
  const fillColor = isOnTarget ? GREEN : RED;

  const innerData = [
    { value: capped },
    { value: 100 - capped },
  ];

  const outerData = targetPercent
    ? [{ value: Math.min(targetPercent, 100) }, { value: 100 - Math.min(targetPercent, 100) }]
    : [];

  const textColor = isDark ? '#fff' : '#000';
  const subColor = isDark ? '#aaa' : '#666';
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="inline-block text-center">
      <PieChart width={size} height={size}>
        {/* Outer ring: target */}
        {targetPercent != null && (
          <Pie
            data={outerData}
            dataKey="value"
            cx={cx}
            cy={cy}
            innerRadius={size * 0.38}
            outerRadius={size * 0.44}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill={GRAY} />
            <Cell fill="transparent" />
          </Pie>
        )}

        {/* Inner ring: sales % */}
        <Pie
          data={innerData}
          dataKey="value"
          cx={cx}
          cy={cy}
          innerRadius={size * 0.26}
          outerRadius={size * 0.36}
          startAngle={90}
          endAngle={-270}
          stroke="none"
          isAnimationActive={false}
        >
          <Cell fill={fillColor} />
          <Cell fill="transparent" />
        </Pie>

        {/* Center labels */}
        <text x={cx} y={cy - 4} textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize={size * 0.14} fontWeight="bold">
          {salesPercent.toFixed(1)}%
        </text>
        <text x={cx} y={cy + size * 0.12} textAnchor="middle" dominantBaseline="middle" fill={subColor} fontSize={size * 0.09}>
          {salesAmount}
        </text>
      </PieChart>
      <div className="mt-0.5 flex justify-center gap-3">
        <span className="text-[7px]" style={{ color: subColor }}>Sales: {salesAmount}</span>
        <span className="text-[7px]" style={{ color: subColor }}>Plan: {planAmount}</span>
      </div>
    </div>
  );
}
