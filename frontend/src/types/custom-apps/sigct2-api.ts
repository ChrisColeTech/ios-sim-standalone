export type SigCT2UserKey = { id?: string; hierarchy?: string; repair?: boolean };

export type SigCT2Entity = {
  key: SigCT2UserKey;
  name?: string;
  isStore?: boolean;
  isDsc?: boolean;
  sortValue?: string;
};

export type SigCT2Amount = {
  value?: number;
  valueAsMoneyNoCents?: string;
  valueAsPercentage?: string;
  valueAsPercentageTenths?: string;
  valueAsMoney?: string;
  zero?: boolean;
};

export type SigCT2SigLiveDatum = {
  entity?: SigCT2Entity;
  salesAmount?: SigCT2Amount;
  planAmount?: SigCT2Amount;
  targetPercent?: SigCT2Amount;
  targetAmount?: SigCT2Amount;
  amountOverTarget?: SigCT2Amount;
  percentOverTarget?: SigCT2Amount;
  currency?: string;
  allZero?: boolean;
};

export type SigCT2SigLivePollingDatum = {
  supportCenter?: string; supportCenterText?: string;
  lastPolled?: { internalValue?: string; displayValue?: string; javaDate?: number };
  polledToday?: string; finalSales?: string; polledMessage?: string;
};

export type SigCT2SigLiveResponse = {
  sigLiveData?: SigCT2SigLiveDatum[];
  sigLivePollingData?: SigCT2SigLivePollingDatum[];
  errorMessage?: string | null;
};

export type SigCT2SalesAmount = { value?: number };
export type SigCT2SalesReportDate = { internalValue?: string; displayValue?: string };

export type SigCT2Sale = {
  entity?: SigCT2Entity;
  reportDate?: SigCT2SalesReportDate;
  currency?: string;
  dayAmount?: SigCT2SalesAmount;
  dayPlanAmount?: SigCT2SalesAmount;
  lyDayAmount?: SigCT2SalesAmount;
  compDayAmount?: SigCT2SalesAmount;
  lyCompDayAmount?: SigCT2SalesAmount;
  wtdAmount?: SigCT2SalesAmount;
  wtdPlanAmount?: SigCT2SalesAmount;
  lyWtdAmount?: SigCT2SalesAmount;
  compWtdAmount?: SigCT2SalesAmount;
  lyCompWtdAmount?: SigCT2SalesAmount;
  mtdAmount?: SigCT2SalesAmount;
  mtdPlanAmount?: SigCT2SalesAmount;
  lyMtdAmount?: SigCT2SalesAmount;
  compMtdAmount?: SigCT2SalesAmount;
  lyCompMtdAmount?: SigCT2SalesAmount;
  qtdAmount?: SigCT2SalesAmount;
  qtdPlanAmount?: SigCT2SalesAmount;
  lyQtdAmount?: SigCT2SalesAmount;
  compQtdAmount?: SigCT2SalesAmount;
  lyCompQtdAmount?: SigCT2SalesAmount;
  ytdAmount?: SigCT2SalesAmount;
  ytdPlanAmount?: SigCT2SalesAmount;
  lyYtdAmount?: SigCT2SalesAmount;
  compYtdAmount?: SigCT2SalesAmount;
  lyCompYtdAmount?: SigCT2SalesAmount;
};

export type SigCT2SalesAndPlanByDay = {
  reportDate?: SigCT2SalesReportDate;
  salesAmount?: SigCT2SalesAmount;
  planAmount?: SigCT2SalesAmount;
  lySalesAmount?: SigCT2SalesAmount;
};

export type SigCT2SalesResponse = {
  sales?: SigCT2Sale[];
  salesAndPlanByDay?: SigCT2SalesAndPlanByDay[];
  errorMessage?: string | null;
};

export type SigCT2SalesPeriod = 'DAY' | 'WTD' | 'MTD' | 'QTD' | 'YTD';
export type SigCT2SalesType = 'total' | 'merch' | 'repair' | 'merch/repair';
export type SigCT2DSCSalesType = 'repairNoWatch' | 'watch' | 'custom';

export type SigCT2StoreLocation = {
  storeName?: string;
  storeNo?: string;
  shopNo?: string;
  latitude?: string;
  longitude?: string;
  supportCenter?: string;
};

export type SigCT2StoreDetail = {
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

export type SigCT2StoreLocatorResponse = { stores?: SigCT2StoreLocation[]; errorMessage?: string | null };

export type SigCT2StoreDetailResponse = {
  store?: { entityAttributes?: Record<string, string | undefined>; storeData?: Record<string, string | undefined> };
  errorMessage?: string | null;
};

export type SigCT2DSCLocatorResponse = { shops?: SigCT2StoreLocation[]; errorMessage?: string | null };

export type SigCT2JobCount = { all?: number; repair?: number; custom?: number };

export type SigCT2JobCountValue = {
  completed?: SigCT2JobCount;
  duein2Days?: SigCT2JobCount;
  duein5Days?: SigCT2JobCount;
  duein7Days?: SigCT2JobCount;
  jobsinqueue?: SigCT2JobCount;
  overdue?: SigCT2JobCount;
  overduewomessage?: SigCT2JobCount;
};

export type SigCT2ChildJobCount = {
  entityID?: string; name?: string; jobCount?: SigCT2JobCount;
  repairJobcount?: number; customJobCount?: number;
};

export type SigCT2ChildJob = {
  jobID?: string; jobNumber?: string; lastTransaction?: string;
  lastTransactionDate?: { displayValue?: string };
  promiseDate?: { displayValue?: string }; days?: number;
};

export type SigCT2JobsResponse = {
  repairJobCounts?: Record<string, SigCT2JobCountValue>[];
  customJobCounts?: Record<string, SigCT2JobCountValue>[];
  childRepairJobCounts?: SigCT2ChildJobCount[];
  childCustomJobCounts?: SigCT2ChildJobCount[];
  childRepairJobs?: SigCT2ChildJob[];
  childCustomJobs?: SigCT2ChildJob[];
  errorMessage?: string | null;
};

export type SigCT2JobsTab = 'all' | 'repair' | 'custom';
export type SigCT2JobsStatusType =
  | 'OVERDUE' | 'OVERDUEWOMESSAGE' | 'DUEIN2DAYS' | 'DUEIN5DAYS'
  | 'DUEIN7DAYS' | 'JOBSINQUEUE' | 'COMPLETED' | '';

export type SigCT2MorningData = { entity?: SigCT2Entity; jobCount?: SigCT2JobCount };

export type SigCT2MorningCustomerData = {
  guestName?: string; jobNo?: string; jobID?: string;
  datePromised?: string; jobStatus?: string;
  trackingNOS?: string[]; trackingNOSAsString?: string;
};

export type SigCT2MorningDataResponse = {
  notShippedMorningData?: SigCT2MorningData[];
  notReceivedMorningData?: SigCT2MorningData[];
  errorMessage?: string | null;
};

export type SigCT2MorningCustomerDataResponse = {
  notShippedMorningCustomerData?: SigCT2MorningCustomerData[];
  notReceivedMorningCustomerData?: SigCT2MorningCustomerData[];
  errorMessage?: string | null;
};

export type SigCT2MorningTab = 'notShipped' | 'notReceived';

