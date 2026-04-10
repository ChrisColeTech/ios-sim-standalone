import type { SigCT2Screen } from '../../types/custom-apps/sigct2';
import type { LayoutColorOverrides } from '../../types/layouts';

export const SIGCT2_ENDPOINTS = {
  devVpn: 'http://srtdev.jewels.com/SignetReporting2',
  devDirect: 'http://rhsrtdevapp01.jewels.com:8230/SignetReporting2',
  testVpn: 'https://srttest.jewels.com/SignetReporting2',
  prodVpn: 'https://srtprod.jewels.com/SignetReporting2',
  prodDirect: 'https://sigctbanner.jewels.com/SignetReporting2'
} as const;

export const SIGCT2_ACTIVE_ENDPOINT = SIGCT2_ENDPOINTS.devVpn;

export const SIGCT2_OAUTH = {
  clientId: '6ab5fef3-cb37-45bc-9dcb-4ce286887bff',
  tenant: '3aa3ff7f-2e43-4ebd-b484-42e80b2efcaa',
  authUrl: 'https://login.microsoftonline.com/3aa3ff7f-2e43-4ebd-b484-42e80b2efcaa/oauth2/v2.0/authorize',
  tokenUrl: 'https://login.microsoftonline.com/3aa3ff7f-2e43-4ebd-b484-42e80b2efcaa/oauth2/v2.0/token',
  redirectUri: 'https://sigctbanner',
  scope: 'api://f378f120-ad08-4f54-901c-bdf139a6d992/.default profile openid offline_access email'
} as const;

export const SIGCT2_SESSION_TIMEOUT_MINUTES = 30;
export const SIGCT2_APP_VERSION = '2.0.0';

/** Nav bar background — UIColor(red: 48/255, green: 150/255, blue: 200/255) */
export const SIGCT2_NAV_BLUE = '#3096C8';

/** Section headers — UIColor.signetBlue */
export const SIGCT2_SIGNET_BLUE = '#3d6e8a';

/** OAuth nav bar — UIColor.signetGray */
export const SIGCT2_SIGNET_GRAY = '#393f42';

/** Dark theme levels from Swift */
export const SIGCT2_THEME = {
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
export const SIGCT2_SCREEN_TITLES: Partial<Record<SigCT2Screen, string>> = {
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
export const SIGCT2_SIGNET_BEIGE = '#e5e5dc';

/** Detail pane background — matches iPad screenshot */
export const SIGCT2_DETAIL_BG = '#555555';

/** SigCT2 brand colors piped through the layout system */
export const SIGCT2_COLORS: LayoutColorOverrides = {
  sectionBg: SIGCT2_SIGNET_BEIGE,
  sectionHeaderBg: SIGCT2_SIGNET_BLUE,
  sectionHeaderText: '#ffffff',
  rowText: SIGCT2_SIGNET_BLUE,
  rowBorder: 'rgba(0,0,0,0.08)',
};

// --- Sticky Table Colors ---

export const SIGCT2_TABLE_HEADER_BG = '#393f42';
export const SIGCT2_TABLE_FOOTER_BG = '#393f42';
export const SIGCT2_TABLE_COL0_BG_DARK = '#2b2f32';
export const SIGCT2_TABLE_COL0_BG_LIGHT = '#e5e5dc';
export const SIGCT2_TABLE_ROW_EVEN_DARK = '#1d2021';
export const SIGCT2_TABLE_ROW_ODD_DARK = '#0e1010';
export const SIGCT2_TABLE_ROW_EVEN_LIGHT = '#f2f2f0';
export const SIGCT2_TABLE_ROW_ODD_LIGHT = '#ffffff';

// --- Gauge Colors ---

export const SIGCT2_GAUGE_TRACK_COLOR = '#555555';
export const SIGCT2_GAUGE_GREEN = '#32cd32';
export const SIGCT2_GAUGE_RED = '#c62d2d';
export const SIGCT2_GAUGE_LIGHT_BLUE = '#1e90ff';

// --- Map Styles ---

export const SIGCT2_MAP_STYLE_LIGHT = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
export const SIGCT2_MAP_STYLE_DARK = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// --- Report Constants ---

export const SIGCT2_REPORT_GREEN = '#32cd32';
export const SIGCT2_REPORT_RED = '#c62d2d';
