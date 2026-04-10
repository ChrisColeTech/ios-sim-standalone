import type { MediaTab } from '../../types/layouts';
import type { WalletCard, WalletLoyaltyCard } from '../../types/wallet';

export const WALLET_TABS: MediaTab[] = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
  { id: 'search', label: 'Search' }
];

export const WALLET_CARDS: WalletCard[] = [
  {
    id: 'apple-cash',
    type: 'apple-cash',
    label: 'Apple Cash',
    gradientFrom: '#1a1a2e',
    gradientTo: '#16213e',
    balance: '$226.78'
  },
  {
    id: 'apple-card',
    type: 'apple-card',
    label: 'Apple Card',
    sublabel: 'Goldman Sachs',
    lastFour: '4921',
    gradientFrom: '#f5f5f7',
    gradientTo: '#e8e8ed',
    balance: '$1,682.55',
    paymentDue: 'Apr 30'
  },
  {
    id: 'visa-chase',
    type: 'credit',
    label: 'Chase Sapphire',
    sublabel: 'Preferred',
    lastFour: '7832',
    gradientFrom: '#003087',
    gradientTo: '#001a4d',
    balance: '$3,241.00'
  },
  {
    id: 'mastercard-citi',
    type: 'debit',
    label: 'Citi Double Cash',
    lastFour: '5519',
    gradientFrom: '#1a1a1a',
    gradientTo: '#333333',
    balance: '$892.34'
  }
];

export const WALLET_LOYALTY_CARDS: WalletLoyaltyCard[] = [
  { id: 'ikea', name: 'IKEA Family' },
  { id: 'tesco', name: 'TESCO Clubcard', points: '327' },
  { id: 'target', name: 'Target Circle' }
];

export const WALLET_TWO_COL_SIDEBAR = {
  sections: [
    {
      id: 'payment-cards',
      header: 'Payment Cards',
      rows: WALLET_CARDS.map((c) => ({
        id: c.id,
        title: c.label,
        subtitle: c.sublabel,
        meta: c.balance
      }))
    },
    {
      id: 'loyalty-cards',
      header: 'Loyalty & Passes',
      rows: WALLET_LOYALTY_CARDS.map((c) => ({
        id: c.id,
        title: c.name,
        subtitle: c.subtitle,
        meta: c.points ? `${c.points} pts` : undefined
      }))
    }
  ]
};
