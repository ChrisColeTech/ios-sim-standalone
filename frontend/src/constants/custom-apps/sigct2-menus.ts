import type { SigCT2MenuSection, SigCT2SalesType, SigCT2SalesPeriod, SigCT2StoreDetail } from '../../types/custom-apps/sigct2';

/** Menu structure — matches HomeMenuViewController */
export const SIGCT2_STORE_MENU: SigCT2MenuSection[] = [
  { id: 'siglive', visibleWhen: 'store', items: [{ id: 'siglive', label: 'SigLive', screen: 'siglive-summary' }] },
  { id: 'analytics', title: 'Analytics', visibleWhen: 'store', items: [
    { id: 'total', label: 'Total', screen: 'analytics' },
    { id: 'merch-repair', label: 'Merch/Repair', screen: 'analytics' },
    { id: 'merch', label: 'Merch', screen: 'analytics' },
    { id: 'repair', label: 'Repair', screen: 'analytics', visibleWhen: 'repair' },
  ]},
  { id: 'dsc', title: 'Signet D&SC', visibleWhen: 'repair', items: [{ id: 'signet-dsc', label: 'Signet D&SC', screen: 'dsc-menu' }] },
  { id: 'tools', title: 'Tools', visibleWhen: 'always', items: [{ id: 'store-locator', label: 'Store Locator', screen: 'store-locator', hasInfo: true }] },
  { id: 'news', title: 'News', visibleWhen: 'always', items: [{ id: 'alerts', label: 'Alerts', screen: 'alerts' }] },
  { id: 'information', title: 'Information', visibleWhen: 'always', items: [
    { id: 'help', label: 'Help', screen: 'help' }, { id: 'release-notes', label: 'Release Notes', screen: 'help' },
    { id: 'about', label: 'About', screen: 'about' }, { id: 'welcome', label: 'Welcome', screen: 'help' },
  ]},
  { id: 'logout', items: [{ id: 'logout', label: 'Logout', screen: 'splash' }] },
];

export const SIGCT2_DSC_MENU: SigCT2MenuSection[] = [];

export const SIGCT2_DSC_SUBMENU: SigCT2MenuSection[] = [
  { id: 'dsc-siglive', items: [{ id: 'dsc-siglive', label: 'SigLive', screen: 'siglive-summary' }] },
  { id: 'dsc-analytics', title: 'Analytics', items: [
    { id: 'dsc-total-repair', label: 'Total Repair', screen: 'analytics' },
    { id: 'dsc-watch', label: 'Watch', screen: 'analytics' },
    { id: 'dsc-custom', label: 'Custom', screen: 'analytics' },
  ]},
  { id: 'dsc-trends', title: 'Trends', items: [
    { id: 'jobs-in-shop', label: 'Jobs in Shop', screen: 'jobs-summary' },
    { id: 'morning-report', label: 'Morning Report', screen: 'morning-report' },
  ]},
  { id: 'dsc-tools', title: 'Tools', items: [
    { id: 'dsc-locator', label: 'D&SC Locator', screen: 'dsc-locator' },
    { id: 'job-lookup', label: 'Job Lookup', screen: 'job-lookup' },
  ]},
];

export const SALES_TYPE_MAP: Record<string, SigCT2SalesType> = {
  'total': 'total', 'merch': 'merch', 'repair': 'repair',
  'merch-repair': 'merch/repair', 'merch/repair': 'merch/repair',
  'total repair': 'repair', 'watch': 'repair', 'custom': 'repair',
};

// --- Report Constants ---
export const REPORT_PERIODS: SigCT2SalesPeriod[] = ['DAY', 'WTD', 'MTD', 'QTD', 'YTD'];
export const REPORT_HEADERS = ['Name \u2193', '$Comp', '%LY COMP', '$Total', '%LY Total', '\u00b1 Plan', '%Plan'];

// --- Jobs Constants ---
export const JOBS_SUMMARY_STATS = [
  { key: 'overdue', label: 'Overdue' },
  { key: 'overduewomessage', label: 'Overdue w/o Message' },
  { key: 'duein2Days', label: 'Due in 2 Days' },
  { key: 'duein5Days', label: 'Due in 5 Days' },
  { key: 'duein7Days', label: 'Due in 7 Days' },
  { key: 'jobsinqueue', label: 'In Queue' },
] as const;
export const JOBS_TABS = ['All', 'Repair', 'Custom'] as const;
export const JOBS_HEADERS = ['Entity', 'Jobs'];

// --- Morning Report Constants ---
export const MORNING_TABS = ['Not Shipped', 'Not Received'] as const;
export const MORNING_HEADERS = ['Entity', 'Job Count'];
export const MORNING_CUSTOMER_HEADERS = ['Customer Name', 'Job Number', 'Current Promise Date', 'Status', 'UPS Tracking IDs'];

// --- Store Detail ---
export const STORE_DETAIL_FIELDS: { label: string; key: keyof SigCT2StoreDetail }[] = [
  { label: 'Name', key: 'name' }, { label: 'Address', key: 'address' },
  { label: 'City', key: 'city' }, { label: 'State/Region', key: 'state' },
  { label: 'Postal Code', key: 'postalCode' }, { label: 'Country', key: 'country' },
  { label: 'DSC', key: 'dscNo' }, { label: 'Phone', key: 'phone' },
  { label: 'Logo', key: 'logo' }, { label: 'Division', key: 'division' },
  { label: 'Region', key: 'region' }, { label: 'District', key: 'district' },
  { label: 'ADI', key: 'adi' }, { label: 'Market Division', key: 'marketDivision' },
  { label: 'Banner', key: 'banner' }, { label: 'Manager', key: 'managerName' },
  { label: 'Open Date', key: 'openDate' }, { label: 'Closed', key: 'closed' },
];
