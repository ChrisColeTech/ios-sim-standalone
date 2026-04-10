import type { WalletTransaction, WalletActivityDay, WalletCategorySpend } from '../../types/wallet';

export const WALLET_BAR_COLOR = '#FFD700';
export const WALLET_BAR_HIGHLIGHT_COLOR = '#FF6B35';

export const WALLET_TX_COLORS: Record<string, string> = {
  'Bakery': '#F4845F',
  'Metro': '#45B7D1',
  'Whole Foods': '#4CAF50',
  'Amazon': '#FF9800',
  'Starbucks': '#00704A',
  'Olivia Rico': '#E91E63',
  'Apple Card': '#9C27B0',
  'Savings': '#2196F3',
  'James Wilson': '#607D8B',
  'Transfer': '#00BCD4',
};

export const WALLET_CATEGORY_INITIALS: Record<string, string> = {
  'food': 'F',
  'shopping': 'S',
  'bills': 'B',
  'transport': 'T',
  'health': 'H',
};

export const WALLET_CASH_TRANSACTIONS: WalletTransaction[] = [
  { id: 'ct1', merchant: 'Olivia Rico', date: 'Mar 28', amount: '$25.00' },
  { id: 'ct2', merchant: 'Apple Card', date: 'Mar 25', amount: '$150.00' },
  { id: 'ct3', merchant: 'Savings', date: 'Mar 20', amount: '+$100.00', isPositive: true },
  { id: 'ct4', merchant: 'James Wilson', date: 'Mar 18', amount: '$42.50' },
  { id: 'ct5', merchant: 'Transfer', date: 'Mar 15', amount: '+$500.00', isPositive: true }
];

export const WALLET_CARD_TRANSACTIONS: WalletTransaction[] = [
  { id: 'tr1', merchant: 'Bakery', location: 'New York, NY', date: 'Apr 2', amount: '$4.95' },
  { id: 'tr2', merchant: 'Metro', location: 'Transit', date: 'Apr 1', amount: '$2.90' },
  { id: 'tr3', merchant: 'Whole Foods', location: 'New York, NY', date: 'Mar 31', amount: '$67.32' },
  { id: 'tr4', merchant: 'Amazon', location: 'Online', date: 'Mar 30', amount: '$29.99' },
  { id: 'tr5', merchant: 'Starbucks', location: 'New York, NY', date: 'Mar 29', amount: '$6.45' }
];

export const WALLET_UPCOMING_PAYMENTS: WalletTransaction[] = [
  { id: 'up1', merchant: 'Olivia Rico', date: 'Apr 5', amount: '$25.00' },
  { id: 'up2', merchant: 'Apple Card', date: 'Apr 10', amount: '$150.00' }
];

export const WALLET_WEEKLY_ACTIVITY: WalletActivityDay[] = [
  { label: 'Mon', amount: 45 },
  { label: 'Tue', amount: 12 },
  { label: 'Wed', amount: 30 },
  { label: 'Thu', amount: 8 },
  { label: 'Fri', amount: 78 },
  { label: 'Sat', amount: 25 },
  { label: 'Sun', amount: 15 }
];

export const WALLET_CATEGORY_SPEND: WalletCategorySpend[] = [
  { id: 'food', label: 'Food & Drinks', color: '#FF6B35', transactionCount: 9, amount: '$99.53', change: '$49.06', changeDirection: 'up' },
  { id: 'shopping', label: 'Shopping', color: '#FFD700', transactionCount: 5, amount: '$47.74', change: '$6.15', changeDirection: 'up' },
  { id: 'bills', label: 'Bills & Utilities', color: '#4ECDC4', transactionCount: 1, amount: '$8.70', change: '$1.30', changeDirection: 'down' },
  { id: 'transport', label: 'Transport', color: '#45B7D1', transactionCount: 1, amount: '$5.00' },
  { id: 'health', label: 'Health', color: '#FF6B6B', transactionCount: 1, amount: '$1.90' }
];

export const WALLET_TOTAL_SPEND = WALLET_CATEGORY_SPEND
  .reduce((sum, c) => sum + parseFloat(c.amount.replace('$', '')), 0)
  .toFixed(2);
