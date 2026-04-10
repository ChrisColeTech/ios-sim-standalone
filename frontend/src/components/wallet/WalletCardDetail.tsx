import { X, Search, Ellipsis, ChevronRight } from 'lucide-react';
import { WalletBarChart } from './WalletBarChart';
import { WalletCardImage } from './WalletCardImage';
import { WalletTransactionIcon } from './WalletTransactionIcon';
import { WalletTransactionRow } from './WalletTransactionRow';
import { WALLET_CARDS } from '../../constants/apps/wallet-cards';
import { WALLET_CASH_TRANSACTIONS, WALLET_CARD_TRANSACTIONS, WALLET_UPCOMING_PAYMENTS, WALLET_WEEKLY_ACTIVITY } from '../../constants/apps/wallet-transactions';
import type { WalletCardDetailProps } from '../../types/wallet';

export function WalletCardDetail(props: WalletCardDetailProps) {
  const { isDark } = props;
  const card = WALLET_CARDS.find((c) => c.id === props.cardId);
  if (!card) return null;

  const isCash = card.type === 'apple-cash';
  const transactions = isCash ? WALLET_CASH_TRANSACTIONS : WALLET_CARD_TRANSACTIONS;
  const cardBg = isDark ? 'bg-ios-surface' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-black';
  const divider = isDark ? 'divide-ios-separator' : 'divide-ios-separator-light';
  const pillBtn = `flex h-7 w-7 p-0 appearance-none items-center justify-center rounded-full border-0 transition-colors cursor-pointer ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`;

  return (
    <div className={`flex h-full flex-col ${isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}`}>
      <div className="flex items-center justify-between">
        <button className={`${pillBtn} ml-3`} onClick={props.onBack} type="button" id="wallet-detail-close">
          <X size={14} strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-1.5 pr-3">
          <button className={pillBtn} type="button"><Search size={14} strokeWidth={1.5} /></button>
          <button className={pillBtn} type="button"><Ellipsis size={15} strokeWidth={1.5} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-6">
        <WalletCardImage card={card} />

        {isCash ? (
          <>
            <div className={`mx-3 mt-2.5 rounded-xl ${cardBg} px-3 py-2.5 shadow-sm`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[9px] font-semibold text-ios-gray">Balance</div>
                  <div className={`text-[15px] font-bold ${textPrimary} mt-0.5`}>{card.balance}</div>
                  <div className="text-[8px] font-medium text-ios-gray mt-0.5">Auto Reload On</div>
                </div>
                <button className={`rounded-full px-3 py-1 p-0 text-[9px] font-semibold cursor-pointer border-0 transition-colors ${isDark ? 'bg-white text-black hover:bg-ios-gray-light' : 'bg-ios-gray-dark text-white hover:bg-ios-surface'}`} type="button">
                  Send or Request
                </button>
              </div>
            </div>

            <button
              className={`mx-3 mt-2 block w-[calc(100%-1.5rem)] cursor-pointer rounded-xl ${cardBg} px-3 py-2.5 text-left shadow-sm border-0 appearance-none`}
              onClick={props.onOpenActivity}
              type="button"
            >
              <div className="text-[8px] font-semibold text-ios-gray">Weekly Activity</div>
              <div className="text-[7px] text-ios-gray">+$15.43 Daily Cash</div>
              <div className="mt-1.5">
                <WalletBarChart bars={WALLET_WEEKLY_ACTIVITY} highlightIndex={4} />
              </div>
            </button>

            <div className="mx-3 mt-2 flex items-center gap-1.5 text-[7px] text-ios-gray">
              <span>Green Dot Bank</span>
              <span className="font-extrabold">FDIC</span>
              <span className="italic">FDIC-Insured - Backed by the full faith and credit of the U.S. Government</span>
            </div>

            {WALLET_UPCOMING_PAYMENTS.length > 0 ? (
              <div className="mx-3 mt-3">
                <h3 className={`text-[13px] font-bold ${textPrimary}`}>Upcoming Payments</h3>
                <div className={`mt-1 divide-y ${divider}`}>
                  {WALLET_UPCOMING_PAYMENTS.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-2 py-1.5">
                      <WalletTransactionIcon name={tx.merchant} />
                      <div className="min-w-0 flex-1">
                        <div className={`text-[10px] font-semibold ${textPrimary}`}>{tx.merchant}</div>
                        <div className="text-[8px] text-ios-gray">Sending in 2 Days</div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <span className={`text-[10px] font-medium ${textPrimary}`}>{tx.amount}</span>
                        <ChevronRight size={10} className="text-ios-gray" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="mx-3 mt-2.5 grid grid-cols-2 gap-2">
              <div className={`rounded-xl ${cardBg} px-3 py-2.5 shadow-sm flex flex-col justify-between`}>
                <div>
                  <div className="text-[8px] font-semibold text-ios-gray uppercase tracking-tight">Card Balance</div>
                  <div className={`mt-0.5 text-[15px] font-bold ${textPrimary}`}>{card.balance}</div>
                </div>
                <div className="text-[7px] font-medium text-ios-gray mt-1">$8,317.45 Available</div>
              </div>

              <div className={`rounded-xl ${cardBg} px-3 py-2.5 shadow-sm flex flex-col items-start gap-2`}>
                <div>
                  <div className="text-[8px] font-semibold text-ios-gray uppercase tracking-tight">Payment Due</div>
                  <div className={`mt-0.5 text-[15px] font-bold ${textPrimary}`}>{card.paymentDue || 'No Balance'}</div>
                </div>
                <button
                  className={`rounded-full px-3 py-1 p-0 text-[9px] font-bold border-0 transition-colors cursor-pointer w-full ${isDark ? 'bg-ios-surface-elevated text-white hover:bg-ios-separator' : 'bg-ios-gray-light text-black hover:bg-ios-separator-light'}`}
                  type="button"
                >
                  Pay Early
                </button>
              </div>
            </div>

            <button
              className={`mx-3 mt-2 block w-[calc(100%-1.5rem)] cursor-pointer rounded-xl ${cardBg} px-3 py-2.5 text-left shadow-sm border-0 appearance-none`}
              onClick={props.onOpenActivity}
              type="button"
            >
              <div className="text-[8px] font-semibold text-ios-gray uppercase tracking-tight">Weekly Activity</div>
              <div className="text-[7px] text-ios-gray">+$15.43 Daily Cash</div>
              <div className="mt-1.5">
                <WalletBarChart bars={WALLET_WEEKLY_ACTIVITY} highlightIndex={4} />
              </div>
            </button>

            <button className={`mx-3 mt-2 flex w-[calc(100%-1.5rem)] cursor-pointer items-center gap-2 rounded-xl ${cardBg} px-3 py-2.5 text-left shadow-sm border-0 appearance-none`} type="button">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ios-surface-elevated text-[8px] font-bold text-white shadow-sm">S</div>
              <div className="flex-1">
                <div className={`text-[10px] font-bold ${textPrimary}`}>Savings Account</div>
                <div className="text-[8px] font-medium text-ios-gray">Current Balance: $1,823.15</div>
              </div>
              <ChevronRight size={12} className="text-ios-gray" />
            </button>
          </>
        )}

        <div className="mx-3 mt-3">
          <h3 className={`text-[13px] font-bold ${textPrimary} tracking-tight mb-1`}>
            {isCash ? 'Latest Transactions' : 'Latest Card Transactions'}
          </h3>
          <div className={`divide-y ${divider}`}>
            {transactions.map((tx) => <WalletTransactionRow key={tx.id} tx={tx} isDark={isDark} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
