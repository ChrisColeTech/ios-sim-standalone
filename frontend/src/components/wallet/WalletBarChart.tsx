import { WALLET_BAR_COLOR, WALLET_BAR_HIGHLIGHT_COLOR } from '../../constants/apps/wallet-transactions';
import type { WalletBarChartProps } from '../../types/wallet';

export function WalletBarChart(props: WalletBarChartProps) {
  const maxAmount = Math.max(...props.bars.map((b) => b.amount), 1);
  const barColor = props.barColor ?? WALLET_BAR_COLOR;
  const highlightColor = props.highlightColor ?? WALLET_BAR_HIGHLIGHT_COLOR;

  return (
    <div className="flex items-end justify-between gap-1" style={{ height: 50 }}>
      {props.bars.map((bar, i) => {
        const heightPct = (bar.amount / maxAmount) * 100;
        const isHighlight = props.highlightIndex === i;
        return (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-0.5">
            <div className="w-full flex items-end justify-center" style={{ height: 38 }}>
              <div
                className="w-full max-w-[10px] rounded-sm"
                style={{
                  height: `${Math.max(heightPct, 4)}%`,
                  background: isHighlight
                    ? `linear-gradient(to top, ${highlightColor}, ${barColor})`
                    : barColor,
                  opacity: bar.amount === 0 ? 0.2 : 1
                }}
              />
            </div>
            <span className="text-[7px] text-ios-gray">{bar.label}</span>
          </div>
        );
      })}
    </div>
  );
}
