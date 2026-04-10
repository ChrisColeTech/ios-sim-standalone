import { ChevronRight } from 'lucide-react';
import { WalletTransactionIcon } from './WalletTransactionIcon';
import type { WalletTransactionRowProps } from '../../types/wallet';

export function WalletTransactionRow(props: WalletTransactionRowProps) {
  const { tx, isDark } = props;

  return (
    <div className="flex items-center gap-2 py-1.5">
      <WalletTransactionIcon name={tx.merchant} />
      <div className="min-w-0 flex-1">
        <div className={`text-[10px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{tx.merchant}</div>
        {tx.location ? <div className="text-[8px] text-ios-gray">{tx.location}</div> : null}
        <div className="text-[7px] text-ios-gray">{tx.date}</div>
      </div>
      <div className="flex items-center gap-0.5">
        <span className={`text-[10px] font-medium ${tx.isPositive ? 'text-ios-green' : isDark ? 'text-white' : 'text-black'}`}>
          {tx.amount}
        </span>
        <ChevronRight size={10} className="text-ios-gray" />
      </div>
    </div>
  );
}
