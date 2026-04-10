import type { AppPageCommonProps } from '../components';

// --- Auth Models ---

export type SigCTAuthState = {
  isAuthorized: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  loginDate: number | null;
  username: string | null;
};

// --- User Entity Models (from UserEntityResponse.swift) ---

export type SigCTUserKey = {
  id?: string;
  hierarchy?: string;
  repair?: boolean;
};

export type SigCTDefaultEntity = {
  parentId: string;
  isDistrict: boolean;
  sortValue: string;
  isDsc: boolean;
  key: SigCTUserKey;
  type: string;
  isStore: boolean;
  name: string;
  leaf: boolean;
};

export type SigCTEntityElement = {
  defaultEntity?: SigCTDefaultEntity;
  entities?: SigCTDefaultEntity[];
  reportId: string;
};

export type SigCTUserEntityResponse = {
  entities?: SigCTEntityElement[];
  errorMessage?: string | null;
};

// --- Screen Navigation ---

export type SigCTScreen =
  | 'splash' | 'oauth' | 'home-menu' | 'dsc-menu'
  | 'siglive-summary' | 'siglive-detail'
  | 'analytics' | 'store-locator' | 'store-detail' | 'store-info'
  | 'dsc-locator' | 'dsc-detail'
  | 'jobs-summary' | 'jobs-drilldown' | 'job-detail'
  | 'morning-report' | 'morning-report-detail'
  | 'job-lookup'
  | 'alerts' | 'about' | 'help'
  | 'group-by' | 'currency' | 'filter-menu';

export type SigCTNavigationState = {
  currentScreen: SigCTScreen;
  previousScreen: SigCTScreen | null;
  screenTitle: string | null;
  screenStack: SigCTScreen[];
};

export type SigCTSessionState = {
  minutesRemaining: number;
  secondsRemaining: number;
  isExpired: boolean;
  formattedTime: string;
};

// --- Menu Config ---

export type SigCTMenuSection = {
  id: string;
  title?: string;
  items: SigCTMenuItem[];
  visibleWhen?: 'store' | 'repair' | 'always';
};

export type SigCTMenuItem = {
  id: string;
  label: string;
  screen: SigCTScreen;
  segueId?: string;
  hasInfo?: boolean;
  visibleWhen?: 'store' | 'repair' | 'always';
};

// --- SigLive Models (from SigLiveDatum.swift) ---

export type SigCTEntity = {
  key: SigCTUserKey;
  name?: string;
  isStore?: boolean;
  isDsc?: boolean;
  sortValue?: string;
};

export type SigCTAmount = {
  value?: number;
  valueAsMoneyNoCents?: string;
  valueAsPercentage?: string;
  valueAsPercentageTenths?: string;
  valueAsMoney?: string;
  zero?: boolean;
};

export type SigCTSigLiveDatum = {
  entity?: SigCTEntity;
  salesAmount?: SigCTAmount;
  planAmount?: SigCTAmount;
  targetPercent?: SigCTAmount;
  targetAmount?: SigCTAmount;
  amountOverTarget?: SigCTAmount;
  percentOverTarget?: SigCTAmount;
  currency?: string;
  allZero?: boolean;
};

export type SigCTSigLivePollingDatum = {
  supportCenter?: string;
  supportCenterText?: string;
  lastPolled?: {
    internalValue?: string;
    displayValue?: string;
    javaDate?: number;
  };
  polledToday?: string;
  finalSales?: string;
  polledMessage?: string;
};

export type SigCTSigLiveResponse = {
  sigLiveData?: SigCTSigLiveDatum[];
  sigLivePollingData?: SigCTSigLivePollingDatum[];
  errorMessage?: string | null;
};

// --- Sales/Analytics Models (from Sale.swift) ---

export type SigCTSalesAmount = {
  value?: number;
};

export type SigCTSalesReportDate = {
  internalValue?: string;
  displayValue?: string;
};

export type SigCTSale = {
  entity?: SigCTEntity;
  reportDate?: SigCTSalesReportDate;
  currency?: string;
  dayAmount?: SigCTSalesAmount;
  dayPlanAmount?: SigCTSalesAmount;
  lyDayAmount?: SigCTSalesAmount;
  compDayAmount?: SigCTSalesAmount;
  lyCompDayAmount?: SigCTSalesAmount;
  wtdAmount?: SigCTSalesAmount;
  wtdPlanAmount?: SigCTSalesAmount;
  lyWtdAmount?: SigCTSalesAmount;
  compWtdAmount?: SigCTSalesAmount;
  lyCompWtdAmount?: SigCTSalesAmount;
  mtdAmount?: SigCTSalesAmount;
  mtdPlanAmount?: SigCTSalesAmount;
  lyMtdAmount?: SigCTSalesAmount;
  compMtdAmount?: SigCTSalesAmount;
  lyCompMtdAmount?: SigCTSalesAmount;
  qtdAmount?: SigCTSalesAmount;
  qtdPlanAmount?: SigCTSalesAmount;
  lyQtdAmount?: SigCTSalesAmount;
  compQtdAmount?: SigCTSalesAmount;
  lyCompQtdAmount?: SigCTSalesAmount;
  ytdAmount?: SigCTSalesAmount;
  ytdPlanAmount?: SigCTSalesAmount;
  lyYtdAmount?: SigCTSalesAmount;
  compYtdAmount?: SigCTSalesAmount;
  lyCompYtdAmount?: SigCTSalesAmount;
};

export type SigCTSalesAndPlanByDay = {
  reportDate?: SigCTSalesReportDate;
  salesAmount?: SigCTSalesAmount;
  planAmount?: SigCTSalesAmount;
  lySalesAmount?: SigCTSalesAmount;
};

export type SigCTSalesResponse = {
  sales?: SigCTSale[];
  salesAndPlanByDay?: SigCTSalesAndPlanByDay[];
  errorMessage?: string | null;
};

export type SigCTSalesPeriod = 'DAY' | 'WTD' | 'MTD' | 'QTD' | 'YTD';

export type SigCTSalesType = 'total' | 'merch' | 'repair' | 'merch/repair';

/** DSC-specific sales types from Swift SigCtSalesType enum */
export type SigCTDSCSalesType = 'repairNoWatch' | 'watch' | 'custom';

// --- Store/DSC Locator Models ---

export type SigCTStoreLocation = {
  storeName?: string;
  storeNo?: string;
  shopNo?: string;
  latitude?: string;
  longitude?: string;
  supportCenter?: string;
};

export type SigCTStoreDetail = {
  name?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  dscNo?: string;
  logo?: string;
  division?: string;
  region?: string;
  district?: string;
  adi?: string;
  marketDivision?: string;
  banner?: string;
  closed?: string;
  openDate?: string;
  managerName?: string;
  latitude?: string;
  longitude?: string;
};

export type SigCTStoreLocatorResponse = {
  stores?: SigCTStoreLocation[];
  errorMessage?: string | null;
};

export type SigCTStoreDetailResponse = {
  store?: {
    entityAttributes?: Record<string, string | undefined>;
    storeData?: Record<string, string | undefined>;
  };
  errorMessage?: string | null;
};

export type SigCTDSCLocatorResponse = {
  shops?: SigCTStoreLocation[];
  errorMessage?: string | null;
};

// --- Jobs in Shop Models (from JobsInShopResponse.swift) ---

export type SigCTJobCount = {
  all?: number;
  repair?: number;
  custom?: number;
};

export type SigCTJobCountValue = {
  completed?: SigCTJobCount;
  duein2Days?: SigCTJobCount;
  duein5Days?: SigCTJobCount;
  duein7Days?: SigCTJobCount;
  jobsinqueue?: SigCTJobCount;
  overdue?: SigCTJobCount;
  overduewomessage?: SigCTJobCount;
};

export type SigCTChildJobCount = {
  entityID?: string;
  name?: string;
  jobCount?: SigCTJobCount;
  repairJobcount?: number;
  customJobCount?: number;
};

export type SigCTChildJob = {
  jobID?: string;
  jobNumber?: string;
  lastTransaction?: string;
  lastTransactionDate?: { displayValue?: string };
  promiseDate?: { displayValue?: string };
  days?: number;
};

export type SigCTJobsResponse = {
  repairJobCounts?: Record<string, SigCTJobCountValue>[];
  customJobCounts?: Record<string, SigCTJobCountValue>[];
  childRepairJobCounts?: SigCTChildJobCount[];
  childCustomJobCounts?: SigCTChildJobCount[];
  childRepairJobs?: SigCTChildJob[];
  childCustomJobs?: SigCTChildJob[];
  errorMessage?: string | null;
};

export type SigCTJobsTab = 'all' | 'repair' | 'custom';

export type SigCTJobsStatusType =
  | 'OVERDUE' | 'OVERDUEWOMESSAGE'
  | 'DUEIN2DAYS' | 'DUEIN5DAYS' | 'DUEIN7DAYS'
  | 'JOBSINQUEUE' | 'COMPLETED' | '';

// --- Morning Report Models (from MorningDataResponse.swift) ---

export type SigCTMorningData = {
  entity?: SigCTEntity;
  jobCount?: SigCTJobCount;
};

export type SigCTMorningCustomerData = {
  guestName?: string;
  jobNo?: string;
  jobID?: string;
  datePromised?: string;
  jobStatus?: string;
  trackingNOS?: string[];
  trackingNOSAsString?: string;
};

export type SigCTMorningDataResponse = {
  notShippedMorningData?: SigCTMorningData[];
  notReceivedMorningData?: SigCTMorningData[];
  errorMessage?: string | null;
};

export type SigCTMorningCustomerDataResponse = {
  notShippedMorningCustomerData?: SigCTMorningCustomerData[];
  notReceivedMorningCustomerData?: SigCTMorningCustomerData[];
  errorMessage?: string | null;
};

export type SigCTMorningTab = 'notShipped' | 'notReceived';

// --- Component Props ---

export type SigCTBannerPageProps = AppPageCommonProps;

export type SigCTLoginScreenProps = {
  isLoading: boolean;
  showLogin: boolean;
  onOAuthStart: () => void;
};

export type SigCTHomeMenuScreenProps = {
  isStore: boolean;
  isRepair: boolean;
  alertCount: number;
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  selectedSidebarRowId: string | null;
  detailContent?: React.ReactNode;
  detailTitle?: string;
  detailToolbarActions?: import('../../types/layouts').LayoutAction[];
  onDetailToolbarAction?: (actionId: string) => void;
  onSelect: (screen: SigCTScreen, title?: string) => void;
  onLogout: () => void;
};

export type SigCTOAuthScreenProps = {
  authUrl: string;
  redirectPrefix: string;
  isDark: boolean;
  onAuthCode: (code: string) => void;
  onCancel: () => void;
  // Webview state from useSigCTOAuthWebView
  webviewRef: (el: HTMLElement | null) => void;
  isLoading: boolean;
  currentUrl: string;
  reload: () => void;
  goBack: () => void;
  goForward: () => void;
};

export type SigCTPlaceholderScreenProps = {
  title: string;
  isDark: boolean;
  onBack: () => void;
};

export type SigCTStickyTableProps = {
  headers: string[];
  rows: string[][];
  footer?: string[];
  isDark?: boolean;
  onRowClick?: (rowIndex: number) => void;
};
