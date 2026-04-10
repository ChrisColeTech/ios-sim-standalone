import type { WalletCardImageProps } from '../../types/wallet';

export function WalletCardImage(props: WalletCardImageProps) {
  const { card } = props;
  const isAppleCard = card.type === 'apple-card';
  const isAppleCash = card.type === 'apple-cash';

  return (
    <div
      className="mx-3 mt-1 flex aspect-[1.58/1] flex-col justify-between rounded-xl p-3.5 shadow-lg"
      style={{
        background: isAppleCard
          ? 'linear-gradient(145deg, #fef9ef 0%, #f5e6b8 40%, #e6c87a 100%)'
          : isAppleCash
            ? `linear-gradient(145deg, ${card.gradientFrom}, ${card.gradientTo})`
            : `linear-gradient(145deg, ${card.gradientFrom}, ${card.gradientTo})`
      }}
    >
      <span className={`text-[10px] font-semibold ${isAppleCard ? 'text-black/60' : 'text-white/90'}`}>
        {isAppleCash ? '\u{1F34E} Cash' : card.label}
      </span>
      <div className="flex items-end justify-between">
        {card.lastFour ? (
          <span className={`text-[8px] font-medium tracking-widest ${isAppleCard ? 'text-black/30' : 'text-white/40'}`}>
            ···· ···· ···· {card.lastFour}
          </span>
        ) : <span />}
        {isAppleCard ? (
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full border border-black/15" />
            <div className="-ml-1.5 h-4 w-4 rounded-full border border-black/15" />
          </div>
        ) : card.type === 'credit' ? (
          <span className="text-[9px] font-bold text-white/70 tracking-wider">VISA</span>
        ) : card.type === 'debit' ? (
          <span className="text-[8px] font-bold text-white/70 tracking-wider">MASTERCARD</span>
        ) : null}
      </div>
    </div>
  );
}
