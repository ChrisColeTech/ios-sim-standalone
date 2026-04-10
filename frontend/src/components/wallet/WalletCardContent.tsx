import type { WalletCardContentProps } from '../../types/wallet';

export function WalletCardContent(props: WalletCardContentProps) {
  const { card } = props;
  const isLight = card.type === 'apple-card';
  const textColor = isLight ? 'text-black' : 'text-white';
  const subColor = isLight ? 'text-black/50' : 'text-white/60';

  return (
    <div
      className="flex h-full flex-col justify-between rounded-xl p-3 shadow-xl"
      style={{
        background: isLight
          ? 'linear-gradient(145deg, #f5f5f7 0%, #e8e8ed 50%, #d2d2d7 100%)'
          : `linear-gradient(145deg, ${card.gradientFrom}, ${card.gradientTo})`
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className={`text-[9px] font-semibold ${textColor}`}>{card.label}</span>
          {card.sublabel ? <span className={`text-[7px] ${subColor}`}>{card.sublabel}</span> : null}
        </div>
      </div>
      <div className="flex items-end justify-between">
        {card.lastFour ? (
          <span className={`text-[7px] tracking-wider ${subColor}`}>···· {card.lastFour}</span>
        ) : <span />}
        {card.type === 'credit' ? (
          <span className={`text-[9px] font-bold tracking-wider ${textColor}`}>VISA</span>
        ) : card.type === 'debit' ? (
          <span className={`text-[8px] font-bold tracking-wider ${textColor}`}>MASTERCARD</span>
        ) : card.type === 'apple-card' ? (
          <div className="flex items-center">
            <div className="h-3.5 w-3.5 rounded-full border border-black/15" />
            <div className="-ml-1.5 h-3.5 w-3.5 rounded-full border border-black/15" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
