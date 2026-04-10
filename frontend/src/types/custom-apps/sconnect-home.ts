import type { AppPageCommonProps } from '../components';

// --- API Response Models (from UserResponse.swift) ---

export type SConnectUserResponse = {
  inError: boolean;
  atHome: boolean;
  employeeId: string;
  firstName: string;
  lastName: string;
  supportCenter: string;
  ipAddress: string;
  bannerDetail?: string;
  storeNumber?: string;
  previousStoreNumber?: string;
  previousBannerDetail?: string;
  lastLoginDate?: string;
  completedCovidSurveyToday: boolean;
  showCovidSurvey: boolean;
  categories?: SConnectCategory[];
  favorites: SConnectFavorite[];
  adminBannerDetails?: SConnectAdminBannerDetail[];
};

export type SConnectCategory = {
  id: number;
  name: string;
  description: string;
  itemOrder: number;
  active: boolean;
  buttons: SConnectButton[];
};

export type SConnectButton = {
  id: number;
  name?: string;
  description?: string;
  url: string;
  image?: string;
  itemOrder: number;
  active: boolean;
  externalBrowser: boolean;
  atHome: boolean;
  categories: SConnectCategory[];
};

export type SConnectFavorite = {
  id: number;
  userId?: string;
  name?: string;
  url: string;
  active: boolean;
};

export type SConnectAdminBannerDetail = {
  categories: SConnectCategory[];
  name: string;
  value: string;
};

// --- App State Types ---

export type SConnectMenuOption =
  | 'selling-tools' | 'admin-tools' | 'research-tools'
  | 'training-tools' | 'catalog-tools' | 'video-tools'
  | 'go-to-url' | 'pos' | 'favorites'
  | 'about' | 'settings' | 'help' | 'logout' | 'calculator';

/** Content screens that swap inside the home shell's content area */
export type SConnectContentScreen = 'grid' | 'webview' | 'calculator' | 'pos' | 'go-to-url' | 'help';

export type SConnectScreen =
  | 'splash' | 'login-form' | 'admin-setup' | 'home'
  | 'about' | 'settings' | 'location' | 'banner-picker';

export type SConnectAuthState = {
  isAuthorized: boolean;
  isLoading: boolean;
  username: string | null;
  error: string | null;
  loginDate: number | null;
};

export type SConnectDataState = {
  user: SConnectUserResponse | null;
  categories: SConnectCategory[];
  buttons: SConnectButton[];
  selectedCategory: SConnectCategory | null;
  menuOptions: SConnectMenuOption[];
  favorites: SConnectFavorite[];
  banner: string | null;
  customStoreNumber: number | null;
  defaultStoreNumber: number | null;
  isAtHome: boolean;
};

export type SConnectSessionState = {
  minutesRemaining: number;
  secondsRemaining: number;
  isExpiringSoon: boolean;
  isExpired: boolean;
  formattedTime: string;
};

export type SConnectNavigationState = {
  currentScreen: SConnectScreen;
  webViewUrl: string | null;
  previousScreen: SConnectScreen | null;
};

// --- Component Props ---

export type SConnectHomePageProps = AppPageCommonProps;

export type SConnectLoginScreenProps = {
  isLoading: boolean;
  onAutoAuth: () => void;
};

export type SConnectLoginFormScreenProps = {
  error: string | null;
  isLoading: boolean;
  savedUsername: string | null;
  onLogin: (employeeId: string) => void;
};

export type SConnectHomeScreenProps = {
  banner: string | null;
  isDark: boolean;
  isLandscape: boolean;
  menuOpen: boolean;
  contentScreen: SConnectContentScreen;
  /** Grid props */
  buttons: SConnectButton[];
  onButtonTap: (button: SConnectButton) => void;
  /** Webview/POS props */
  webViewUrl: string | null;
  webviewRef: (el: HTMLElement | null) => void;
  currentUrl: string;
  displayUrl: string;
  webViewLoading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onStop: () => void;
  /** Go-to-URL */
  onNavigateUrl: (url: string) => void;
  /** Shell */
  onMenuToggle: () => void;
};

export type SConnectButtonGridProps = {
  buttons: SConnectButton[];
  isDark: boolean;
  isLandscape: boolean;
  onButtonTap: (button: SConnectButton) => void;
};

export type SConnectGoToUrlScreenProps = {
  isDark: boolean;
  onNavigate: (url: string) => void;
};

export type SConnectHelpScreenProps = {
  isDark: boolean;
};

export type SConnectSideMenuProps = {
  menuOptions: SConnectMenuOption[];
  selectedOption: SConnectMenuOption | null;
  banner: string | null;
  isDark: boolean;
  onSelect: (option: SConnectMenuOption) => void;
  onClose: () => void;
};

export type SConnectWebViewContentProps = {
  url: string;
  isFavorite: boolean;
  isDark: boolean;
  webviewRef: (el: HTMLElement | null) => void;
  currentUrl: string;
  displayUrl: string;
  isLoading: boolean;
  onToggleFavorite: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onStop: () => void;
  onNavigate: (url: string) => void;
};

export type SConnectAboutRow = { label: string; value: string };

export type SConnectAboutScreenProps = {
  rows: SConnectAboutRow[];
  isDark: boolean;
  onClose: () => void;
};

export type SConnectTheme = 'light' | 'dark' | 'system';

export type SConnectSettingsScreenProps = {
  banner: string | null;
  bannerDisplay: string;
  storeDisplayText: string;
  adminBannerDetails: SConnectAdminBannerDetail[];
  isDark: boolean;
  currentTheme: SConnectTheme;
  onBannerTap: () => void;
  onLocationTap: () => void;
  onThemeChange: (theme: SConnectTheme) => void;
  onClose: () => void;
};

export type SConnectAdminScreenProps = {
  adminBannerDetails: SConnectAdminBannerDetail[];
  banner: string | null;
  storeDisplayText: string;
  isDsc: boolean;
  isDark: boolean;
  onBannerTap: () => void;
  onLocationTap: () => void;
  onSave: () => void;
};

export type SConnectBannerPickerScreenProps = {
  adminBannerDetails: SConnectAdminBannerDetail[];
  banner: string | null;
  isDark: boolean;
  onBannerChange: (banner: string) => void;
  onBack: () => void;
};

export type SConnectLocationScreenProps = {
  isAtHome: boolean;
  storeNumber: string;
  isDsc: boolean;
  isDark: boolean;
  onLocationChange: (atHome: boolean) => void;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onBack: () => void;
};
