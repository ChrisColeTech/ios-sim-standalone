import type { SigCTMenuSection, SigCTSalesType, SigCTSalesPeriod, SigCTScreen } from '../../types/custom-apps/sigct-banner';
import type { LayoutColorOverrides } from '../../types/layouts';

export const SIGCT_ENDPOINTS = {
  devVpn: 'http://srtdev.jewels.com/SignetReporting2',
  devDirect: 'http://rhsrtdevapp01.jewels.com:8230/SignetReporting2',
  testVpn: 'https://srttest.jewels.com/SignetReporting2',
  prodVpn: 'https://srtprod.jewels.com/SignetReporting2',
  prodDirect: 'https://sigctbanner.jewels.com/SignetReporting2'
} as const;

export const SIGCT_ACTIVE_ENDPOINT = SIGCT_ENDPOINTS.devVpn;

export const SIGCT_OAUTH = {
  clientId: '6ab5fef3-cb37-45bc-9dcb-4ce286887bff',
  tenant: '3aa3ff7f-2e43-4ebd-b484-42e80b2efcaa',
  authUrl: 'https://login.microsoftonline.com/3aa3ff7f-2e43-4ebd-b484-42e80b2efcaa/oauth2/v2.0/authorize',
  tokenUrl: 'https://login.microsoftonline.com/3aa3ff7f-2e43-4ebd-b484-42e80b2efcaa/oauth2/v2.0/token',
  redirectUri: 'https://sigctbanner',
  scope: 'api://f378f120-ad08-4f54-901c-bdf139a6d992/.default profile openid offline_access email'
} as const;

export const SIGCT_SESSION_TIMEOUT_MINUTES = 30;
export const SIGCT_APP_VERSION = '6.0.0';

/** Nav bar background — UIColor(red: 48/255, green: 150/255, blue: 200/255) */
export const SIGCT_NAV_BLUE = '#3096C8';

/** Section headers — UIColor.signetBlue */
export const SIGCT_SIGNET_BLUE = '#3d6e8a';

/** OAuth nav bar — UIColor.signetGray */
export const SIGCT_SIGNET_GRAY = '#393f42';

/** Dark theme levels from Swift */
export const SIGCT_THEME = {
  signetGray: '#393f42',
  signetLevel1: '#2b2f32',
  signetLevel2: '#1d2021',
  signetLevel3: '#0e1010',
  signetLightGray: '#aaaaaa',
  signetDarkGray: '#555555',
  darkThemeDarkGray: '#282723',
  darkThemeMediumGray: '#444444',
  darkThemeLightGray: '#cccccc',
  darkThemeWhite: '#f5f5f5',
} as const;

/** Screen titles for the placeholder screens */
export const SIGCT_SCREEN_TITLES: Partial<Record<SigCTScreen, string>> = {
  'siglive-summary': 'SigLive',
  'siglive-detail': 'SigLive Detail',
  'analytics': 'Analytics',
  'store-locator': 'Store Locator',
  'store-detail': 'Store Detail',
  'store-info': 'Store Information',
  'dsc-locator': 'DSC Locator',
  'dsc-detail': 'DSC Detail',
  'jobs-summary': 'Jobs in Shop',
  'jobs-drilldown': 'Jobs Drilldown',
  'job-detail': 'Job Detail',
  'morning-report': 'Morning Report',
  'morning-report-detail': 'Morning Report Detail',
  'job-lookup': 'Job Lookup',
  'alerts': 'Alerts',
  'about': 'About',
  'help': 'Help',
  'group-by': 'Group By',
  'currency': 'Currency',
  'filter-menu': 'Filter'
};

/** signetBeige background — matches Swift UIColor.signetBeige */
export const SIGCT_SIGNET_BEIGE = '#e5e5dc';

/** Detail pane background — matches iPad screenshot */
export const SIGCT_DETAIL_BG = '#555555';

/** Menu structure — matches HomeMenuViewController screenshots exactly */
export const SIGCT_STORE_MENU: SigCTMenuSection[] = [
  {
    id: 'siglive',
    items: [
      { id: 'siglive', label: 'SigLive', screen: 'siglive-summary' }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics',
    items: [
      { id: 'total', label: 'Total', screen: 'analytics' },
      { id: 'merch-repair', label: 'Merch/Repair', screen: 'analytics' },
      { id: 'merch', label: 'Merch', screen: 'analytics' },
      { id: 'repair', label: 'Repair', screen: 'analytics' }
    ]
  },
  {
    id: 'dsc',
    title: 'Signet D&SC',
    items: [
      { id: 'signet-dsc', label: 'Signet D&SC', screen: 'dsc-menu' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      { id: 'store-locator', label: 'Store Locator', screen: 'store-locator', hasInfo: true }
    ]
  },
  {
    id: 'news',
    title: 'News',
    items: [
      { id: 'alerts', label: 'Alerts', screen: 'alerts' }
    ]
  },
  {
    id: 'information',
    title: 'Information',
    items: [
      { id: 'help', label: 'Help', screen: 'help' },
      { id: 'release-notes', label: 'Release Notes', screen: 'help' },
      { id: 'about', label: 'About', screen: 'about' },
      { id: 'welcome', label: 'Welcome', screen: 'help' }
    ]
  },
  {
    id: 'logout',
    items: [
      { id: 'logout', label: 'Logout', screen: 'splash' }
    ]
  }
];

/** DSC-specific menu items — inserted before Tools when user has DSC entities */
export const SIGCT_DSC_MENU: SigCTMenuSection[] = [];

// --- Sales Type Map ---

/** Maps menu labels to SigCTSalesType for analytics navigation */
export const SALES_TYPE_MAP: Record<string, SigCTSalesType> = {
  'total': 'total', 'merch': 'merch', 'repair': 'repair',
  'merch-repair': 'merch/repair', 'merch/repair': 'merch/repair',
  'total repair': 'repair', 'watch': 'repair', 'custom': 'repair',
};

// --- Report Constants ---

export const REPORT_PERIODS: SigCTSalesPeriod[] = ['DAY', 'WTD', 'MTD', 'QTD', 'YTD'];
export const REPORT_GREEN = '#32cd32';
export const REPORT_RED = '#c62d2d';
export const REPORT_HEADERS = ['Name \u2193', '$Comp', '%LY COMP', '$Total', '%LY Total', '\u00b1 Plan', '%Plan'];

// --- SigLive Detail Constants ---

export const SIGLIVE_DETAIL_HEADERS = ['Name', 'Sales %', 'Polled Sales $', 'Plan $'];

// --- DSC Analytics Headers (from DSCAnalyticsListViewDelegate.swift) ---

/** Dynamic headers by DSC sales type — matches Swift delegate lines 28-36 */
export const DSC_ANALYTICS_HEADERS: Record<string, string[]> = {
  repairNoWatch: ['Name \u2193', '$Comp', '%LY COMP', '$Total', '%LY Total', '\u00b1 Plan', '%Plan'],
  watch: ['Name \u2193', '$Comp', '%LY COMP', '$Total', '%LY Total'],
  custom: ['Name \u2193', '$Comp', '%LY COMP', '$Total', '%LY Total', '% of Sales'],
};

/** Maps DSC menu labels to DSC sales types */
export const DSC_SALES_TYPE_MAP: Record<string, string> = {
  'total repair': 'repairNoWatch',
  'watch': 'watch',
  'custom': 'custom',
};

// --- Jobs in Shop Constants (from JobsSummaryTableViewDelegate.swift) ---

export const JOBS_SUMMARY_STATS = [
  { key: 'overdue', label: 'Overdue' },
  { key: 'overduewomessage', label: 'Overdue w/o Message' },
  { key: 'duein2Days', label: 'Due in 2 Days' },
  { key: 'duein5Days', label: 'Due in 5 Days' },
  { key: 'duein7Days', label: 'Due in 7 Days' },
  { key: 'jobsinqueue', label: 'In Queue' },
] as const;

export const JOBS_TABS = ['All', 'Repair', 'Custom'] as const;

/** Entity drill-down headers — columns are entity name + job count */
export const JOBS_ENTITY_HEADERS = ['Entity', 'Jobs'];

/** Job list headers — from JobsListViewController */
export const JOBS_LIST_HEADERS = ['Job Number', 'Last Updated', 'Status', 'Days Until Due'];

/** Dynamic column 3 header by status type — from JobsListViewController lines 294-307 */
export const JOBS_DAYS_HEADER: Record<string, string> = {
  '': 'DAYS',
  'JOBSINQUEUE': 'DAYS',
  'OVERDUE': 'DAYS OVERDUE',
  'OVERDUEWOMESSAGE': 'DAYS OVERDUE',
  'COMPLETED': 'DAYS TO COMPLETE',
  'DUEIN2DAYS': 'DAYS UNTIL DUE',
  'DUEIN5DAYS': 'DAYS UNTIL DUE',
  'DUEIN7DAYS': 'DAYS UNTIL DUE',
};

// --- Morning Report Constants (from MorningReportViewController.swift) ---

export const MORNING_TABS = ['Not Shipped', 'Not Received'] as const;

/** Entity drill-down headers */
export const MORNING_ENTITY_HEADERS = ['Entity', 'Job Count'];

/** Customer detail headers — from MorningReportViewController */
export const MORNING_CUSTOMER_HEADERS = ['Customer Name', 'Job Number', 'Current Promise Date', 'Status', 'UPS Tracking IDs'];

// --- Layout Color Overrides ---

/** SigCT brand colors piped through the layout system */
export const SIGCT_COLORS: LayoutColorOverrides = {
  sectionBg: SIGCT_SIGNET_BEIGE,
  sectionHeaderBg: SIGCT_SIGNET_BLUE,
  sectionHeaderText: '#ffffff',
  rowText: SIGCT_SIGNET_BLUE,
  rowBorder: 'rgba(0,0,0,0.08)',
};

// --- Sticky Table Colors ---

export const TABLE_HEADER_BG = '#393f42';
export const TABLE_FOOTER_BG = '#393f42';
export const TABLE_COL0_BG_DARK = '#2b2f32';
export const TABLE_COL0_BG_LIGHT = '#e5e5dc';
export const TABLE_ROW_EVEN_DARK = '#1d2021';
export const TABLE_ROW_ODD_DARK = '#0e1010';
export const TABLE_ROW_EVEN_LIGHT = '#f2f2f0';
export const TABLE_ROW_ODD_LIGHT = '#ffffff';

// --- Gauge Colors ---

export const GAUGE_TRACK_COLOR = '#555555';
export const GAUGE_GREEN = '#32cd32';
export const GAUGE_RED = '#c62d2d';
export const GAUGE_LIGHT_BLUE = '#1e90ff';

// --- Map Styles ---

export const MAP_STYLE_LIGHT = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
export const MAP_STYLE_DARK = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// --- Store Detail Fields ---

export const STORE_DETAIL_FIELDS: { label: string; key: keyof import('../../types/custom-apps/sigct-banner').SigCTStoreDetail }[] = [
  { label: 'Name', key: 'name' },
  { label: 'Address', key: 'address' },
  { label: 'City', key: 'city' },
  { label: 'State/Region', key: 'state' },
  { label: 'Postal Code', key: 'postalCode' },
  { label: 'Country', key: 'country' },
  { label: 'DSC', key: 'dscNo' },
  { label: 'Phone', key: 'phone' },
  { label: 'Logo', key: 'logo' },
  { label: 'Division', key: 'division' },
  { label: 'Region', key: 'region' },
  { label: 'District', key: 'district' },
  { label: 'ADI', key: 'adi' },
  { label: 'Market Division', key: 'marketDivision' },
  { label: 'Banner', key: 'banner' },
  { label: 'Manager', key: 'managerName' },
  { label: 'Open Date', key: 'openDate' },
  { label: 'Closed', key: 'closed' },
];

/** DSC sub-menu — shown when "Signet D&SC" is selected from home menu */
export const SIGCT_DSC_SUBMENU: SigCTMenuSection[] = [
  {
    id: 'dsc-back',
    items: [
      { id: 'back-to-sigct', label: 'Back to SigCT', screen: 'home-menu' }
    ]
  },
  {
    id: 'dsc-siglive',
    items: [
      { id: 'dsc-siglive', label: 'SigLive', screen: 'siglive-summary' }
    ]
  },
  {
    id: 'dsc-analytics',
    title: 'Analytics',
    items: [
      { id: 'dsc-total-repair', label: 'Total Repair', screen: 'analytics' },
      { id: 'dsc-watch', label: 'Watch', screen: 'analytics' },
      { id: 'dsc-custom', label: 'Custom', screen: 'analytics' }
    ]
  },
  {
    id: 'dsc-trends',
    title: 'Trends',
    items: [
      { id: 'dsc-jobs-in-shop', label: 'Jobs in Shop', screen: 'jobs-summary' },
      { id: 'dsc-morning-report', label: 'Morning Report', screen: 'morning-report' }
    ]
  },
  {
    id: 'dsc-tools',
    title: 'Tools',
    items: [
      { id: 'dsc-locator', label: 'D&SC Locator', screen: 'dsc-locator', hasInfo: true },
      { id: 'dsc-job-lookup', label: 'Job Lookup', screen: 'job-lookup' }
    ]
  }
];
