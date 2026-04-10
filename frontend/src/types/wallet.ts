export type WalletView = 'all-cards' | 'card-detail' | 'activity-detail';

export type WalletCardType = 'apple-cash' | 'apple-card' | 'credit' | 'debit';

export type WalletCard = {
  id: string;
  type: WalletCardType;
  label: string;
  sublabel?: string;
  lastFour?: string;
  gradientFrom: string;
  gradientTo: string;
  balance?: string;
  paymentDue?: string;
};

export type WalletLoyaltyCard = {
  id: string;
  name: string;
  subtitle?: string;
  points?: string;
};

export type WalletTransaction = {
  id: string;
  merchant: string;
  location?: string;
  date: string;
  amount: string;
  isPositive?: boolean;
};

export type WalletActivityDay = {
  label: string;
  amount: number;
};

export type WalletCategorySpend = {
  id: string;
  label: string;
  color: string;
  transactionCount: number;
  amount: string;
  change?: string;
  changeDirection?: 'up' | 'down';
};

export type WalletNavState = {
  view: WalletView;
  selectedCardId: string | null;
};

export type WalletAllCardsProps = {
  isDark: boolean;
  onSelectCard: (cardId: string) => void;
};

export type WalletBarChartProps = {
  bars: WalletActivityDay[];
  barColor?: string;
  highlightColor?: string;
  highlightIndex?: number;
};

export type WalletCardStackProps = {
  cards: WalletCard[];
  onSelectCard: (cardId: string) => void;
};

export type WalletCardContentProps = {
  card: WalletCard;
};

export type WalletCardDetailProps = {
  isDark: boolean;
  cardId: string;
  onBack: () => void;
  onOpenActivity: () => void;
};

export type WalletTransactionIconProps = {
  name: string;
};

export type WalletTransactionRowProps = {
  isDark: boolean;
  tx: WalletTransaction;
};

export type WalletCardImageProps = {
  card: WalletCard;
};

export type WalletActivityDetailProps = {
  isDark: boolean;
  onBack: () => void;
};
