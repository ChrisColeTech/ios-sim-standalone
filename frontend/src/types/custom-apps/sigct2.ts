import type { AppPageCommonProps } from '../components';
import type { SigCT2SigLiveDatum, SigCT2ChildJob } from './sigct2-api';

// --- Auth Models ---

export type SigCT2AuthState = {
  isAuthorized: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  loginDate: number | null;
  username: string | null;
};

// --- User Entity Models (from UserEntityResponse.swift) ---

export type SigCT2UserKey = {
  id?: string;
  hierarchy?: string;
  repair?: boolean;
};

export type SigCT2DefaultEntity = {
  parentId: string;
  isDistrict: boolean;
  sortValue: string;
  isDsc: boolean;
  key: SigCT2UserKey;
  type: string;
  isStore: boolean;
  name: string;
  leaf: boolean;
};

export type SigCT2EntityElement = {
  defaultEntity?: SigCT2DefaultEntity;
  entities?: SigCT2DefaultEntity[];
  reportId: string;
};

export type SigCT2UserEntityResponse = {
  entities?: SigCT2EntityElement[];
  errorMessage?: string | null;
};

// --- Screen Navigation ---

export type SigCT2Screen =
  | 'splash' | 'oauth' | 'home-menu' | 'dsc-menu'
  | 'siglive-summary' | 'siglive-detail'
  | 'analytics' | 'store-locator' | 'store-detail' | 'store-info'
  | 'dsc-locator' | 'dsc-detail'
  | 'jobs-summary' | 'jobs-drilldown' | 'job-detail'
  | 'morning-report' | 'morning-report-detail'
  | 'job-lookup'
  | 'alerts' | 'about' | 'help'
  | 'group-by' | 'currency' | 'filter-menu';

export type SigCT2NavigationState = {
  currentScreen: SigCT2Screen;
  previousScreen: SigCT2Screen | null;
  screenTitle: string | null;
  screenStack: SigCT2Screen[];
};

export type SigCT2SessionState = {
  minutesRemaining: number;
  secondsRemaining: number;
  isExpired: boolean;
  formattedTime: string;
};

// --- Menu Config ---

export type SigCT2MenuSection = {
  id: string;
  title?: string;
  items: SigCT2MenuItem[];
  visibleWhen?: 'store' | 'repair' | 'always';
};

export type SigCT2MenuItem = {
  id: string;
  label: string;
  screen: SigCT2Screen;
  segueId?: string;
  hasInfo?: boolean;
  visibleWhen?: 'store' | 'repair' | 'always';
};

// --- Component Props ---

export type SigCT2PageProps = AppPageCommonProps;

export type SigCT2LoginScreenProps = {
  isLoading: boolean;
  showLogin: boolean;
  onOAuthStart: () => void;
};

export type SigCT2HomeMenuScreenProps = {
  isStore: boolean;
  isRepair: boolean;
  alertCount: number;
  activeTab: 'sales' | 'dsc' | 'info';
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  floatingBar?: React.ReactNode;
  onSelect: (screen: SigCT2Screen, title?: string) => void;
  onLogout: () => void;
};

export type SigCT2OAuthScreenProps = {
  authUrl: string;
  redirectPrefix: string;
  isDark: boolean;
  onAuthCode: (code: string) => void;
  onCancel: () => void;
  webviewRef: (el: HTMLElement | null) => void;
  isLoading: boolean;
  currentUrl: string;
  reload: () => void;
  goBack: () => void;
  goForward: () => void;
};

export type SigCT2PlaceholderScreenProps = {
  title: string;
  isDark: boolean;
  isLandscape: boolean;
  onBack: () => void;
};

export type SigCT2StickyTableProps = {
  headers: string[];
  rows: string[][];
  footer?: string[];
  isDark?: boolean;
  onRowClick?: (rowIndex: number) => void;
};

export type SigCT2SigLiveDetailScreenProps = {
  data: SigCT2SigLiveDatum;
  children: SigCT2SigLiveDatum[];
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onDrillDown: (datum: SigCT2SigLiveDatum) => void;
  onBack: () => void;
  onGoHome: () => void;
};

export type SigCT2AboutScreenProps = {
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  endpoint: string;
  appVersion: string;
  email: string;
  employeeId: string;
  formattedTime: string;
  onBack: () => void;
};

export type SigCT2AlertsScreenProps = {
  alerts: { title?: string; message?: string }[];
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  isLoading: boolean;
  onBack: () => void;
};

export type SigCT2JobDetailScreenProps = {
  job: SigCT2ChildJob;
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  onBack: () => void;
};

export type SigCT2HelpScreenProps = {
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  onBack: () => void;
};

export * from './sigct2-api';
