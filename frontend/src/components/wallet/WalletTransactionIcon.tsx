import { WALLET_TX_COLORS } from '../../constants/apps/wallet-transactions';
import type { WalletTransactionIconProps } from '../../types/wallet';

export function WalletTransactionIcon(props: WalletTransactionIconProps) {
  const bg = WALLET_TX_COLORS[props.name] ?? '#888';
  const initial = props.name.charAt(0).toUpperCase();

  return (
    <div
      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-[8px] font-bold text-white"
      style={{ backgroundColor: bg }}
    >
      {initial}
    </div>
  );
}
