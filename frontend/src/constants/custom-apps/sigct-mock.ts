/**
 * Mock SigCT data for demo mode.
 * Provides realistic Signet jewellery-retail data so the UI renders
 * without a live backend connection.
 */
import type {
  SigCTUserEntityResponse,
  SigCTSigLiveResponse,
  SigCTSalesResponse,
  SigCTStoreLocatorResponse,
  SigCTDSCLocatorResponse,
  SigCTJobsResponse,
  SigCTMorningDataResponse,
} from '../../types/custom-apps/sigct-banner';

// ---------------------------------------------------------------------------
// Demo JWT token
// ---------------------------------------------------------------------------
// Header: {"alg":"HS256","typ":"JWT"}
// Payload: {"name":"Demo User","employeeid":"99999","iat":1700000000,"exp":1900000000}
// Signature: fake256signature
export const SIGCT_DEMO_TOKEN = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJuYW1lIjoiRGVtbyBVc2VyIiwiZW1wbG95ZWVpZCI6Ijk5OTk5IiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE5MDAwMDAwMDB9',
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
].join('.');

// ---------------------------------------------------------------------------
// User Entity
// ---------------------------------------------------------------------------
export function buildMockUserEntity(): SigCTUserEntityResponse {
  return {
    entities: [
      {
        reportId: 'OPERATIONAL',
        defaultEntity: {
          parentId: '100',
          isDistrict: false,
          sortValue: '1',
          isDsc: false,
          key: { id: '2045', hierarchy: 'OPERATIONAL' },
          type: 'STORE',
          isStore: true,
          name: 'Kay Jewelers #2045 - Oakbrook Center',
          leaf: true,
        },
        entities: [
          {
            parentId: '100',
            isDistrict: false,
            sortValue: '1',
            isDsc: false,
            key: { id: '2045', hierarchy: 'OPERATIONAL' },
            type: 'STORE',
            isStore: true,
            name: 'Kay Jewelers #2045 - Oakbrook Center',
            leaf: true,
          },
        ],
      },
      {
        reportId: 'BANNER',
        defaultEntity: {
          parentId: '0',
          isDistrict: true,
          sortValue: '0',
          isDsc: false,
          key: { id: 'D150', hierarchy: 'BANNER' },
          type: 'DISTRICT',
          isStore: false,
          name: 'District 150 - Chicago Metro',
          leaf: false,
        },
        entities: [
          {
            parentId: '0',
            isDistrict: true,
            sortValue: '0',
            isDsc: false,
            key: { id: 'D150', hierarchy: 'BANNER' },
            type: 'DISTRICT',
            isStore: false,
            name: 'District 150 - Chicago Metro',
            leaf: false,
          },
        ],
      },
    ],
    errorMessage: null,
  };
}

// ---------------------------------------------------------------------------
// SigLive
// ---------------------------------------------------------------------------
export function buildMockSigLiveData(): SigCTSigLiveResponse {
  return {
    sigLiveData: [
      {
        entity: { key: { id: '2045' }, name: 'Kay #2045 Oakbrook', isStore: true, sortValue: '1' },
        salesAmount: { value: 14832, valueAsMoney: '$14,832', valueAsMoneyNoCents: '$14,832', zero: false },
        planAmount: { value: 12500, valueAsMoney: '$12,500', valueAsMoneyNoCents: '$12,500', zero: false },
        targetPercent: { value: 118.66, valueAsPercentage: '118%', valueAsPercentageTenths: '118.7%', zero: false },
        targetAmount: { value: 12500, valueAsMoney: '$12,500', zero: false },
        amountOverTarget: { value: 2332, valueAsMoney: '$2,332', zero: false },
        percentOverTarget: { value: 18.66, valueAsPercentage: '18%', valueAsPercentageTenths: '18.7%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: '3101' }, name: 'Zales #3101 Woodfield', isStore: true, sortValue: '2' },
        salesAmount: { value: 9475, valueAsMoney: '$9,475', valueAsMoneyNoCents: '$9,475', zero: false },
        planAmount: { value: 10200, valueAsMoney: '$10,200', valueAsMoneyNoCents: '$10,200', zero: false },
        targetPercent: { value: 92.89, valueAsPercentage: '92%', valueAsPercentageTenths: '92.9%', zero: false },
        targetAmount: { value: 10200, valueAsMoney: '$10,200', zero: false },
        amountOverTarget: { value: -725, valueAsMoney: '-$725', zero: false },
        percentOverTarget: { value: -7.11, valueAsPercentage: '-7%', valueAsPercentageTenths: '-7.1%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: '4210' }, name: 'Jared #4210 Schaumburg', isStore: true, sortValue: '3' },
        salesAmount: { value: 22150, valueAsMoney: '$22,150', valueAsMoneyNoCents: '$22,150', zero: false },
        planAmount: { value: 19800, valueAsMoney: '$19,800', valueAsMoneyNoCents: '$19,800', zero: false },
        targetPercent: { value: 111.87, valueAsPercentage: '111%', valueAsPercentageTenths: '111.9%', zero: false },
        targetAmount: { value: 19800, valueAsMoney: '$19,800', zero: false },
        amountOverTarget: { value: 2350, valueAsMoney: '$2,350', zero: false },
        percentOverTarget: { value: 11.87, valueAsPercentage: '11%', valueAsPercentageTenths: '11.9%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: '2088' }, name: 'Kay #2088 Water Tower', isStore: true, sortValue: '4' },
        salesAmount: { value: 7640, valueAsMoney: '$7,640', valueAsMoneyNoCents: '$7,640', zero: false },
        planAmount: { value: 8000, valueAsMoney: '$8,000', valueAsMoneyNoCents: '$8,000', zero: false },
        targetPercent: { value: 95.50, valueAsPercentage: '95%', valueAsPercentageTenths: '95.5%', zero: false },
        targetAmount: { value: 8000, valueAsMoney: '$8,000', zero: false },
        amountOverTarget: { value: -360, valueAsMoney: '-$360', zero: false },
        percentOverTarget: { value: -4.50, valueAsPercentage: '-4%', valueAsPercentageTenths: '-4.5%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: '3055' }, name: 'Zales #3055 Orland Park', isStore: true, sortValue: '5' },
        salesAmount: { value: 11280, valueAsMoney: '$11,280', valueAsMoneyNoCents: '$11,280', zero: false },
        planAmount: { value: 10500, valueAsMoney: '$10,500', valueAsMoneyNoCents: '$10,500', zero: false },
        targetPercent: { value: 107.43, valueAsPercentage: '107%', valueAsPercentageTenths: '107.4%', zero: false },
        targetAmount: { value: 10500, valueAsMoney: '$10,500', zero: false },
        amountOverTarget: { value: 780, valueAsMoney: '$780', zero: false },
        percentOverTarget: { value: 7.43, valueAsPercentage: '7%', valueAsPercentageTenths: '7.4%', zero: false },
        currency: 'USD',
        allZero: false,
      },
    ],
    sigLivePollingData: [
      {
        supportCenter: '1',
        supportCenterText: 'North America',
        lastPolled: { internalValue: '2026-04-09T14:30:00', displayValue: '04/09/2026 02:30 PM', javaDate: 1775930200000 },
        polledToday: 'Y',
        finalSales: 'N',
        polledMessage: 'Last polled 04/09/2026 at 2:30 PM ET',
      },
    ],
    errorMessage: null,
  };
}

// ---------------------------------------------------------------------------
// Sales / Analytics
// ---------------------------------------------------------------------------
export function buildMockSalesData(): SigCTSalesResponse {
  return {
    sales: [
      {
        entity: { key: { id: '2045' }, name: 'Kay #2045 Oakbrook', isStore: true },
        reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' },
        currency: 'USD',
        dayAmount: { value: 14832 },
        dayPlanAmount: { value: 12500 },
        lyDayAmount: { value: 13100 },
        compDayAmount: { value: 14832 },
        lyCompDayAmount: { value: 13100 },
        wtdAmount: { value: 52340 },
        wtdPlanAmount: { value: 48000 },
        lyWtdAmount: { value: 46750 },
        compWtdAmount: { value: 52340 },
        lyCompWtdAmount: { value: 46750 },
        mtdAmount: { value: 98610 },
        mtdPlanAmount: { value: 95000 },
        lyMtdAmount: { value: 91200 },
        compMtdAmount: { value: 98610 },
        lyCompMtdAmount: { value: 91200 },
        qtdAmount: { value: 98610 },
        qtdPlanAmount: { value: 95000 },
        lyQtdAmount: { value: 91200 },
        compQtdAmount: { value: 98610 },
        lyCompQtdAmount: { value: 91200 },
        ytdAmount: { value: 412500 },
        ytdPlanAmount: { value: 395000 },
        lyYtdAmount: { value: 388000 },
        compYtdAmount: { value: 412500 },
        lyCompYtdAmount: { value: 388000 },
      },
      {
        entity: { key: { id: '3101' }, name: 'Zales #3101 Woodfield', isStore: true },
        reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' },
        currency: 'USD',
        dayAmount: { value: 9475 },
        dayPlanAmount: { value: 10200 },
        lyDayAmount: { value: 9820 },
        compDayAmount: { value: 9475 },
        lyCompDayAmount: { value: 9820 },
        wtdAmount: { value: 38200 },
        wtdPlanAmount: { value: 41000 },
        lyWtdAmount: { value: 39100 },
        compWtdAmount: { value: 38200 },
        lyCompWtdAmount: { value: 39100 },
        mtdAmount: { value: 72800 },
        mtdPlanAmount: { value: 78000 },
        lyMtdAmount: { value: 74500 },
        compMtdAmount: { value: 72800 },
        lyCompMtdAmount: { value: 74500 },
        qtdAmount: { value: 72800 },
        qtdPlanAmount: { value: 78000 },
        lyQtdAmount: { value: 74500 },
        compQtdAmount: { value: 72800 },
        lyCompQtdAmount: { value: 74500 },
        ytdAmount: { value: 310400 },
        ytdPlanAmount: { value: 325000 },
        lyYtdAmount: { value: 298000 },
        compYtdAmount: { value: 310400 },
        lyCompYtdAmount: { value: 298000 },
      },
      {
        entity: { key: { id: '4210' }, name: 'Jared #4210 Schaumburg', isStore: true },
        reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' },
        currency: 'USD',
        dayAmount: { value: 22150 },
        dayPlanAmount: { value: 19800 },
        lyDayAmount: { value: 20400 },
        compDayAmount: { value: 22150 },
        lyCompDayAmount: { value: 20400 },
        wtdAmount: { value: 85600 },
        wtdPlanAmount: { value: 79200 },
        lyWtdAmount: { value: 78900 },
        compWtdAmount: { value: 85600 },
        lyCompWtdAmount: { value: 78900 },
        mtdAmount: { value: 164300 },
        mtdPlanAmount: { value: 152000 },
        lyMtdAmount: { value: 155800 },
        compMtdAmount: { value: 164300 },
        lyCompMtdAmount: { value: 155800 },
        qtdAmount: { value: 164300 },
        qtdPlanAmount: { value: 152000 },
        lyQtdAmount: { value: 155800 },
        compQtdAmount: { value: 164300 },
        lyCompQtdAmount: { value: 155800 },
        ytdAmount: { value: 685200 },
        ytdPlanAmount: { value: 650000 },
        lyYtdAmount: { value: 642000 },
        compYtdAmount: { value: 685200 },
        lyCompYtdAmount: { value: 642000 },
      },
    ],
    salesAndPlanByDay: [
      { reportDate: { internalValue: '2026-04-07', displayValue: '04/07/2026' }, salesAmount: { value: 18920 }, planAmount: { value: 17500 }, lySalesAmount: { value: 17100 } },
      { reportDate: { internalValue: '2026-04-08', displayValue: '04/08/2026' }, salesAmount: { value: 21480 }, planAmount: { value: 20000 }, lySalesAmount: { value: 19800 } },
      { reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' }, salesAmount: { value: 46457 }, planAmount: { value: 42500 }, lySalesAmount: { value: 43320 } },
    ],
    errorMessage: null,
  };
}

// ---------------------------------------------------------------------------
// Store Locator
// ---------------------------------------------------------------------------
export function buildMockStoreLocations(): SigCTStoreLocatorResponse {
  return {
    stores: [
      { storeName: 'Kay Jewelers', storeNo: '2045', shopNo: '2045', latitude: '41.8528', longitude: '-87.9534', supportCenter: '1' },
      { storeName: 'Zales', storeNo: '3101', shopNo: '3101', latitude: '42.0451', longitude: '-88.0334', supportCenter: '1' },
      { storeName: 'Jared The Galleria of Jewelry', storeNo: '4210', shopNo: '4210', latitude: '42.0312', longitude: '-88.0837', supportCenter: '1' },
      { storeName: 'Kay Jewelers', storeNo: '2088', shopNo: '2088', latitude: '41.8981', longitude: '-87.6298', supportCenter: '1' },
      { storeName: 'Zales', storeNo: '3055', shopNo: '3055', latitude: '41.6187', longitude: '-87.8537', supportCenter: '1' },
    ],
    errorMessage: null,
  };
}

// ---------------------------------------------------------------------------
// DSC Locator
// ---------------------------------------------------------------------------
export function buildMockDSCLocations(): SigCTDSCLocatorResponse {
  return {
    shops: [
      { storeName: 'DSC Chicago Central', storeNo: '8001', shopNo: '8001', latitude: '41.8827', longitude: '-87.6233', supportCenter: '1' },
      { storeName: 'DSC Midwest Hub', storeNo: '8002', shopNo: '8002', latitude: '39.7684', longitude: '-86.1581', supportCenter: '1' },
      { storeName: 'DSC Great Lakes', storeNo: '8003', shopNo: '8003', latitude: '41.4993', longitude: '-81.6944', supportCenter: '1' },
    ],
    errorMessage: null,
  };
}

// ---------------------------------------------------------------------------
// Jobs in Shop
// ---------------------------------------------------------------------------
export function buildMockJobsData(): SigCTJobsResponse {
  return {
    repairJobCounts: [
      {
        '2045': {
          completed: { all: 12, repair: 10, custom: 2 },
          duein2Days: { all: 5, repair: 4, custom: 1 },
          duein5Days: { all: 8, repair: 6, custom: 2 },
          duein7Days: { all: 11, repair: 8, custom: 3 },
          jobsinqueue: { all: 23, repair: 18, custom: 5 },
          overdue: { all: 3, repair: 2, custom: 1 },
          overduewomessage: { all: 1, repair: 1, custom: 0 },
        },
      },
    ],
    customJobCounts: [
      {
        '2045': {
          completed: { all: 2, repair: 0, custom: 2 },
          duein2Days: { all: 1, repair: 0, custom: 1 },
          duein5Days: { all: 2, repair: 0, custom: 2 },
          duein7Days: { all: 3, repair: 0, custom: 3 },
          jobsinqueue: { all: 5, repair: 0, custom: 5 },
          overdue: { all: 1, repair: 0, custom: 1 },
          overduewomessage: { all: 0, repair: 0, custom: 0 },
        },
      },
    ],
    childRepairJobCounts: [
      { entityID: '2045', name: 'Kay #2045 Oakbrook', jobCount: { all: 18, repair: 18, custom: 0 }, repairJobcount: 18, customJobCount: 0 },
      { entityID: '3101', name: 'Zales #3101 Woodfield', jobCount: { all: 9, repair: 9, custom: 0 }, repairJobcount: 9, customJobCount: 0 },
    ],
    childCustomJobCounts: [
      { entityID: '2045', name: 'Kay #2045 Oakbrook', jobCount: { all: 5, repair: 0, custom: 5 }, repairJobcount: 0, customJobCount: 5 },
    ],
    childRepairJobs: [
      { jobID: 'J100234', jobNumber: 'R-100234', lastTransaction: 'Received at Shop', lastTransactionDate: { displayValue: '04/07/2026' }, promiseDate: { displayValue: '04/12/2026' }, days: 3 },
      { jobID: 'J100235', jobNumber: 'R-100235', lastTransaction: 'Work In Progress', lastTransactionDate: { displayValue: '04/05/2026' }, promiseDate: { displayValue: '04/10/2026' }, days: 1 },
      { jobID: 'J100236', jobNumber: 'R-100236', lastTransaction: 'Shipped to Store', lastTransactionDate: { displayValue: '04/08/2026' }, promiseDate: { displayValue: '04/11/2026' }, days: 2 },
    ],
    childCustomJobs: [
      { jobID: 'J200045', jobNumber: 'C-200045', lastTransaction: 'CAD Approved', lastTransactionDate: { displayValue: '04/06/2026' }, promiseDate: { displayValue: '04/20/2026' }, days: 11 },
      { jobID: 'J200046', jobNumber: 'C-200046', lastTransaction: 'Stone Setting', lastTransactionDate: { displayValue: '04/03/2026' }, promiseDate: { displayValue: '04/15/2026' }, days: 6 },
    ],
    errorMessage: null,
  };
}

// ---------------------------------------------------------------------------
// Morning Report
// ---------------------------------------------------------------------------
export function buildMockMorningData(): SigCTMorningDataResponse {
  return {
    notShippedMorningData: [
      {
        entity: { key: { id: '2045' }, name: 'Kay #2045 Oakbrook', isStore: true },
        jobCount: { all: 4, repair: 3, custom: 1 },
      },
      {
        entity: { key: { id: '3101' }, name: 'Zales #3101 Woodfield', isStore: true },
        jobCount: { all: 2, repair: 2, custom: 0 },
      },
      {
        entity: { key: { id: '4210' }, name: 'Jared #4210 Schaumburg', isStore: true },
        jobCount: { all: 1, repair: 0, custom: 1 },
      },
    ],
    notReceivedMorningData: [
      {
        entity: { key: { id: '2045' }, name: 'Kay #2045 Oakbrook', isStore: true },
        jobCount: { all: 3, repair: 2, custom: 1 },
      },
      {
        entity: { key: { id: '3101' }, name: 'Zales #3101 Woodfield', isStore: true },
        jobCount: { all: 5, repair: 4, custom: 1 },
      },
      {
        entity: { key: { id: '2088' }, name: 'Kay #2088 Water Tower', isStore: true },
        jobCount: { all: 2, repair: 1, custom: 1 },
      },
      {
        entity: { key: { id: '3055' }, name: 'Zales #3055 Orland Park', isStore: true },
        jobCount: { all: 1, repair: 1, custom: 0 },
      },
    ],
    errorMessage: null,
  };
}
