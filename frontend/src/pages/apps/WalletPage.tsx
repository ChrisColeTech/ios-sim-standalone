import { MediaTopBar, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { WalletActivityDetail } from '../../components/wallet/WalletActivityDetail';
import { WalletAllCards } from '../../components/wallet/WalletAllCards';
import { WalletBarChart } from '../../components/wallet/WalletBarChart';
import { WalletCardDetail } from '../../components/wallet/WalletCardDetail';
import { WalletCardImage } from '../../components/wallet/WalletCardImage';
import { WalletTransactionRow } from '../../components/wallet/WalletTransactionRow';
import { WALLET_CARDS, WALLET_TABS, WALLET_TWO_COL_SIDEBAR } from '../../constants/apps/wallet-cards';
import {
  WALLET_CARD_TRANSACTIONS,
  WALLET_CASH_TRANSACTIONS,
  WALLET_CATEGORY_SPEND,
  WALLET_CATEGORY_INITIALS,
  WALLET_TOTAL_SPEND,
  WALLET_UPCOMING_PAYMENTS,
  WALLET_WEEKLY_ACTIVITY
} from '../../constants/apps/wallet-transactions';
import { useSelectionState } from '../../hooks/useSelectionState';
import { useWalletNavigation } from '../../hooks/useWalletNavigation';
import type { WalletPageProps } from '../../types/app-pages';


export function WalletPage(props: WalletPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('apple-cash');
  const nav = useWalletNavigation();
  const isDark = props.theme === 'dark';

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}>
        {nav.view === 'activity-detail' ? (
          <WalletActivityDetail isDark={isDark} onBack={nav.goBack} />
        ) : nav.view === 'card-detail' && nav.selectedCardId ? (
          <WalletCardDetail isDark={isDark} cardId={nav.selectedCardId} onBack={nav.goBack} onOpenActivity={nav.openActivity} />
        ) : (
          <WalletAllCards isDark={isDark} onSelectCard={nav.selectCard} />
        )}
      </AppPageShell>
    );
  }

  const card = WALLET_CARDS.find((c) => c.id === selectedRowId) ?? WALLET_CARDS[0];
  const isCash = card.type === 'apple-cash';
  const transactions = isCash ? WALLET_CASH_TRANSACTIONS : WALLET_CARD_TRANSACTIONS;
  const cardClass = isDark ? 'rounded-lg border border-white/15 p-1.5 backdrop-blur-xl' : 'rounded-lg bg-white/95 p-1.5 shadow-sm shadow-black/5';
  const labelClass = isDark ? 'text-white/50' : 'text-black/45';
  const sublabelClass = isDark ? 'text-white/70' : 'text-black/60';

  return (
    <AppPageShell backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}>
      <TwoColLayout
        theme={props.theme}
        presentation="immersive"
        sidebar={WALLET_TWO_COL_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="Wallet" tabs={WALLET_TABS} activeTabId="week" />}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
        detail={{
          content: (
            <div className={`h-full overflow-auto px-3 pt-1 pb-3 ${isDark ? 'text-white' : 'text-black'}`}>
              {/* Hero — card image */}
              <WalletCardImage card={card} />

              {/* Balance / Payment row */}
              {isCash ? (
                <div className={`mt-2 ${cardClass}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-[5px] font-semibold uppercase tracking-wide ${labelClass}`}>Balance</p>
                      <p className="text-[16px] font-light">{card.balance}</p>
                    </div>
                    <button className="rounded-full px-2.5 py-0.5 text-[7px] font-medium ${isDark ? 'bg-white text-black' : 'bg-ios-gray-dark text-white'}" type="button">
                      Send or Request
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  <div className={cardClass}>
                    <p className={`text-[5px] font-semibold uppercase tracking-wide ${labelClass}`}>Card Balance</p>
                    <p className="pt-0.5 text-[12px] font-semibold">{card.balance}</p>
                  </div>
                  <div className={cardClass}>
                    <p className={`text-[5px] font-semibold uppercase tracking-wide ${labelClass}`}>Payment Due</p>
                    <p className="pt-0.5 text-[12px] font-semibold">{card.paymentDue ?? '—'}</p>
                    <button className={`mt-1 w-full rounded-full py-0.5 text-[7px] font-semibold border-0 ${isDark ? 'bg-ios-surface-elevated text-white' : 'bg-ios-gray-light text-black'}`} type="button">
                      Pay Early
                    </button>
                  </div>
                </div>
              )}

              {/* Weekly Activity + Spending — side by side */}
              <div className="mt-1.5 flex gap-1.5">
                <div className={`w-1/2 ${cardClass}`}>
                  <p className={`border-b pb-1 text-[5px] font-semibold uppercase tracking-wide ${labelClass} ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                    Weekly Activity
                  </p>
                  <div className="pt-1">
                    <WalletBarChart bars={WALLET_WEEKLY_ACTIVITY} />
                  </div>
                </div>
                <div className={`w-1/2 ${cardClass}`}>
                  <div className="flex items-center justify-between border-b pb-1 ${isDark ? 'border-white/10' : 'border-black/10'}">
                    <p className={`text-[5px] font-semibold uppercase tracking-wide ${labelClass}`}>Spending</p>
                    <p className="text-[8px] font-semibold">${WALLET_TOTAL_SPEND}</p>
                  </div>
                  {WALLET_CATEGORY_SPEND.map((cat) => (
                    <div key={cat.id} className={`flex items-center gap-1 py-0.5 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      <div className="flex h-3 w-3 items-center justify-center rounded text-[5px] font-bold text-white" style={{ backgroundColor: cat.color }}>
                        {WALLET_CATEGORY_INITIALS[cat.id] ?? '?'}
                      </div>
                      <span className={`flex-1 text-[7px] ${sublabelClass}`}>{cat.label}</span>
                      <span className="text-[7px] font-medium">{cat.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Payments + Transactions — side by side */}
              {isCash ? (
                <div className="mt-1.5 flex gap-1.5">
                  <div className={`w-1/2 ${cardClass}`}>
                    <p className={`border-b pb-1 text-[5px] font-semibold uppercase tracking-wide ${labelClass} ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      Upcoming Payments
                    </p>
                    {WALLET_UPCOMING_PAYMENTS.map((tx) => (
                      <WalletTransactionRow key={tx.id} isDark={isDark} tx={tx} />
                    ))}
                  </div>
                  <div className={`w-1/2 ${cardClass}`}>
                    <p className={`border-b pb-1 text-[5px] font-semibold uppercase tracking-wide ${labelClass} ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      Latest Transactions
                    </p>
                    {transactions.map((tx) => (
                      <WalletTransactionRow key={tx.id} isDark={isDark} tx={tx} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`mt-1.5 ${cardClass}`}>
                  <p className={`border-b pb-1 text-[5px] font-semibold uppercase tracking-wide ${labelClass} ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                    Latest Transactions
                  </p>
                  {transactions.map((tx) => (
                    <WalletTransactionRow key={tx.id} isDark={isDark} tx={tx} />
                  ))}
                </div>
              )}
            </div>
          )
        }}
      />
    </AppPageShell>
  );
}
