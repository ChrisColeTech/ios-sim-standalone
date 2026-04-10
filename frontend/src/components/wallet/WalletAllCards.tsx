import { Plus, Search, Ellipsis } from 'lucide-react';
import { WalletCardStack } from './WalletCardStack';
import { WALLET_CARDS, WALLET_LOYALTY_CARDS } from '../../constants/apps/wallet-cards';
import type { WalletAllCardsProps } from '../../types/wallet';

export function WalletAllCards(props: WalletAllCardsProps) {
  const { isDark } = props;

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold pl-4 ${isDark ? 'text-white' : 'text-black'}`}>Wallet</h1>
        <div className="flex items-center gap-2 pr-4">
          <button className={`flex h-7 w-7 p-0 appearance-none items-center justify-center rounded-full border-0 transition-colors cursor-pointer ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`} type="button">
            <Plus size={15} strokeWidth={1.5} />
          </button>
          <button className={`flex h-7 w-7 p-0 appearance-none items-center justify-center rounded-full border-0 transition-colors cursor-pointer ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`} type="button">
            <Search size={14} strokeWidth={1.5} />
          </button>
          <button className={`flex h-7 w-7 p-0 appearance-none items-center justify-center rounded-full border-0 transition-colors cursor-pointer ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`} type="button">
            <Ellipsis size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto pb-8">
        <WalletCardStack cards={WALLET_CARDS} onSelectCard={props.onSelectCard} />

        {/* Loyalty Cards */}
        <div className="mx-4 mt-6">
          <div className={`overflow-hidden rounded-2xl ${isDark ? 'bg-ios-surface' : 'bg-white'}`}>
            {WALLET_LOYALTY_CARDS.map((card, i) => (
              <div
                key={card.id}
                className={`flex items-center justify-between px-4 py-3 ${i > 0 ? `border-t ${isDark ? 'border-ios-separator' : 'border-ios-separator-light'}` : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md text-[8px] font-extrabold ${isDark ? 'bg-ios-surface-elevated text-white' : 'bg-ios-gray-light text-black'}`}>
                    {card.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className={`text-[13px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{card.name}</span>
                </div>
                {card.points ? (
                  <span className="text-[11px] font-medium text-ios-gray">POINTS {card.points}</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
