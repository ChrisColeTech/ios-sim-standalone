import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WalletBarChart } from './WalletBarChart';
import { WALLET_WEEKLY_ACTIVITY, WALLET_CATEGORY_SPEND, WALLET_TOTAL_SPEND, WALLET_BAR_HIGHLIGHT_COLOR, WALLET_BAR_COLOR, WALLET_CATEGORY_INITIALS } from '../../constants/apps/wallet-transactions';
import type { WalletActivityDetailProps } from '../../types/wallet';

export function WalletActivityDetail(props: WalletActivityDetailProps) {
  const { isDark } = props;
  const surfaceBg = isDark ? 'bg-ios-surface' : 'bg-white';
  const elevatedBg = isDark ? 'bg-ios-surface-elevated' : 'bg-ios-gray-light';
  const textPrimary = isDark ? 'text-white' : 'text-black';
  const pillBtn = `flex h-7 w-7 p-0 appearance-none items-center justify-center rounded-full border-0 transition-colors cursor-pointer ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`;

  return (
    <div className={`flex h-full flex-col ${isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}`}>
      <div className="flex items-center justify-between">
        <button className={`${pillBtn} ml-3`} onClick={props.onBack} type="button" id="wallet-activity-back">
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>
        <div className={`flex rounded-full ${surfaceBg} p-0.5 mx-auto`}>
          <span className={`rounded-full ${elevatedBg} px-2.5 py-0.5 text-[9px] font-semibold ${textPrimary}`}>Week</span>
          <span className="px-2.5 py-0.5 text-[9px] text-ios-gray cursor-pointer">Month</span>
          <span className="px-2.5 py-0.5 text-[9px] text-ios-gray cursor-pointer">Year</span>
        </div>
        <div className="w-7 mr-3" />
      </div>

      <div className="flex-1 overflow-auto px-3 pb-6">
        <h2 className={`mt-2 text-[18px] font-bold ${textPrimary} leading-tight tracking-tight`}>31 Mar – 5 Apr</h2>

        <div className={`mt-2.5 rounded-xl ${surfaceBg} px-3 py-2.5 shadow-xl`}>
          <div className="text-[8px] font-semibold text-ios-gray uppercase tracking-tight">Total Spending</div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className={`text-[22px] font-bold ${textPrimary} tracking-tight`}>${WALLET_TOTAL_SPEND}</span>
            <span className="text-[13px] text-ios-red">&uarr;</span>
          </div>
          <div className={`mt-1 text-[8px] font-medium leading-snug ${isDark ? 'text-white/80' : 'text-black/60'}`}>
            So far, you've spent $77.25 more than last week at this time.
          </div>
          <div className="mt-2.5">
            <WalletBarChart bars={WALLET_WEEKLY_ACTIVITY} highlightIndex={4} highlightColor={WALLET_BAR_HIGHLIGHT_COLOR} barColor={WALLET_BAR_COLOR} />
          </div>
        </div>

        <div className={`mt-3 flex rounded-full ${surfaceBg} p-0.5`}>
          <span className={`flex-1 rounded-full ${elevatedBg} py-1 text-center text-[9px] font-semibold ${textPrimary} cursor-pointer`}>By Category</span>
          <span className="flex-1 py-1 text-center text-[9px] text-ios-gray cursor-pointer">By Merchant</span>
        </div>

        <div className="mt-2.5 space-y-1.5">
          {WALLET_CATEGORY_SPEND.map((cat) => (
            <button
              key={cat.id}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-xl ${surfaceBg} px-3 py-2 text-left border-0 appearance-none hover:${isDark ? 'bg-ios-surface-elevated' : 'bg-ios-gray-light'} transition-colors`}
              type="button"
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[9px] font-bold text-white shadow-sm"
                style={{ backgroundColor: cat.color }}
              >
                {WALLET_CATEGORY_INITIALS[cat.id] ?? '?'}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-[11px] font-bold ${textPrimary}`}>{cat.label}</div>
                <div className="flex items-center gap-1 text-[8px] font-medium text-ios-gray">
                  <span>{cat.transactionCount} Transaction{cat.transactionCount !== 1 ? 's' : ''}</span>
                  {cat.change ? (
                    <span className={cat.changeDirection === 'up' ? 'text-ios-red' : 'text-ios-green'}>
                      {cat.changeDirection === 'up' ? '\u2191' : '\u2193'} {cat.change}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-[11px] font-bold ${textPrimary}`}>{cat.amount}</span>
                <ChevronRight size={12} className="text-ios-gray" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
