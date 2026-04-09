/**
 * Mock SigCT2 data for demo employee ID 99999.
 * Based on realistic Signet jeweler store data structures.
 */
import type { SigCT2UserEntityResponse } from '../../types/custom-apps/sigct2';
import type {
  SigCT2SigLiveResponse,
  SigCT2SalesResponse,
  SigCT2StoreLocatorResponse,
  SigCT2DSCLocatorResponse,
  SigCT2JobsResponse,
  SigCT2MorningDataResponse,
} from '../../types/custom-apps/sigct2-api';

/** Fake JWT: header.payload.signature (payload = {name:"Demo User", employeeid:"99999"}) */
export const SIGCT2_DEMO_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJuYW1lIjoiRGVtbyBVc2VyIiwiZW1wbG95ZWVpZCI6Ijk5OTk5IiwiaWF0IjoxNzE3MDAwMDAwLCJleHAiOjE3MTcwODY0MDB9.' +
  'VGhpcyBpcyBhIGZha2Ugc2lnbmF0dXJlIGZvciBkZW1vIHB1cnBvc2VzIG9ubHk';

export function buildMockUserEntity(): SigCT2UserEntityResponse {
  return {
    entities: [
      {
        reportId: 'OPERATIONAL',
        defaultEntity: {
          parentId: 'D-NE-2',
          isDistrict: false,
          sortValue: '01',
          isDsc: false,
          key: { id: '1042', hierarchy: 'OPERATIONAL', repair: false },
          type: 'STORE',
          isStore: true,
          name: 'Kay Jewelers #1042 - Crossgates Mall',
          leaf: true,
        },
        entities: [
          {
            parentId: 'D-NE-2',
            isDistrict: false,
            sortValue: '01',
            isDsc: false,
            key: { id: '1042', hierarchy: 'OPERATIONAL', repair: false },
            type: 'STORE',
            isStore: true,
            name: 'Kay Jewelers #1042 - Crossgates Mall',
            leaf: true,
          },
          {
            parentId: 'D-NE-2',
            isDistrict: false,
            sortValue: '02',
            isDsc: false,
            key: { id: '1155', hierarchy: 'OPERATIONAL', repair: false },
            type: 'STORE',
            isStore: true,
            name: 'Zales #1155 - Colonie Center',
            leaf: true,
          },
          {
            parentId: 'R-EAST',
            isDistrict: true,
            sortValue: '00',
            isDsc: false,
            key: { id: 'D-NE-2', hierarchy: 'OPERATIONAL', repair: false },
            type: 'DISTRICT',
            isStore: false,
            name: 'District Northeast 2',
            leaf: false,
          },
        ],
      },
      {
        reportId: 'BANNER',
        defaultEntity: {
          parentId: 'B-KAY',
          isDistrict: false,
          sortValue: '01',
          isDsc: false,
          key: { id: '1042', hierarchy: 'BANNER', repair: false },
          type: 'STORE',
          isStore: true,
          name: 'Kay Jewelers #1042 - Crossgates Mall',
          leaf: true,
        },
        entities: [
          {
            parentId: 'B-KAY',
            isDistrict: false,
            sortValue: '01',
            isDsc: false,
            key: { id: '1042', hierarchy: 'BANNER', repair: false },
            type: 'STORE',
            isStore: true,
            name: 'Kay Jewelers #1042 - Crossgates Mall',
            leaf: true,
          },
          {
            parentId: 'B-ZALES',
            isDistrict: false,
            sortValue: '02',
            isDsc: false,
            key: { id: '1155', hierarchy: 'BANNER', repair: false },
            type: 'STORE',
            isStore: true,
            name: 'Zales #1155 - Colonie Center',
            leaf: true,
          },
        ],
      },
    ],
    errorMessage: null,
  };
}

export function buildMockSigLiveData(): SigCT2SigLiveResponse {
  return {
    sigLiveData: [
      {
        entity: { key: { id: '1042', hierarchy: 'OPERATIONAL' }, name: 'Kay #1042 Crossgates', isStore: true, isDsc: false, sortValue: '01' },
        salesAmount: { value: 8745, valueAsMoney: '$8,745.00', valueAsMoneyNoCents: '$8,745', zero: false },
        planAmount: { value: 7500, valueAsMoney: '$7,500.00', valueAsMoneyNoCents: '$7,500', zero: false },
        targetPercent: { value: 116.6, valueAsPercentage: '117%', valueAsPercentageTenths: '116.6%', zero: false },
        targetAmount: { value: 7500, valueAsMoney: '$7,500.00', valueAsMoneyNoCents: '$7,500', zero: false },
        amountOverTarget: { value: 1245, valueAsMoney: '$1,245.00', valueAsMoneyNoCents: '$1,245', zero: false },
        percentOverTarget: { value: 16.6, valueAsPercentage: '17%', valueAsPercentageTenths: '16.6%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: '1155', hierarchy: 'OPERATIONAL' }, name: 'Zales #1155 Colonie', isStore: true, isDsc: false, sortValue: '02' },
        salesAmount: { value: 5320, valueAsMoney: '$5,320.00', valueAsMoneyNoCents: '$5,320', zero: false },
        planAmount: { value: 6000, valueAsMoney: '$6,000.00', valueAsMoneyNoCents: '$6,000', zero: false },
        targetPercent: { value: 88.7, valueAsPercentage: '89%', valueAsPercentageTenths: '88.7%', zero: false },
        targetAmount: { value: 6000, valueAsMoney: '$6,000.00', valueAsMoneyNoCents: '$6,000', zero: false },
        amountOverTarget: { value: -680, valueAsMoney: '-$680.00', valueAsMoneyNoCents: '-$680', zero: false },
        percentOverTarget: { value: -11.3, valueAsPercentage: '-11%', valueAsPercentageTenths: '-11.3%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: '2087', hierarchy: 'OPERATIONAL' }, name: 'Jared #2087 Stuyvesant', isStore: true, isDsc: false, sortValue: '03' },
        salesAmount: { value: 14230, valueAsMoney: '$14,230.00', valueAsMoneyNoCents: '$14,230', zero: false },
        planAmount: { value: 12000, valueAsMoney: '$12,000.00', valueAsMoneyNoCents: '$12,000', zero: false },
        targetPercent: { value: 118.6, valueAsPercentage: '119%', valueAsPercentageTenths: '118.6%', zero: false },
        targetAmount: { value: 12000, valueAsMoney: '$12,000.00', valueAsMoneyNoCents: '$12,000', zero: false },
        amountOverTarget: { value: 2230, valueAsMoney: '$2,230.00', valueAsMoneyNoCents: '$2,230', zero: false },
        percentOverTarget: { value: 18.6, valueAsPercentage: '19%', valueAsPercentageTenths: '18.6%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: '3401', hierarchy: 'OPERATIONAL' }, name: 'Kay #3401 Poughkeepsie', isStore: true, isDsc: false, sortValue: '04' },
        salesAmount: { value: 6190, valueAsMoney: '$6,190.00', valueAsMoneyNoCents: '$6,190', zero: false },
        planAmount: { value: 5800, valueAsMoney: '$5,800.00', valueAsMoneyNoCents: '$5,800', zero: false },
        targetPercent: { value: 106.7, valueAsPercentage: '107%', valueAsPercentageTenths: '106.7%', zero: false },
        targetAmount: { value: 5800, valueAsMoney: '$5,800.00', valueAsMoneyNoCents: '$5,800', zero: false },
        amountOverTarget: { value: 390, valueAsMoney: '$390.00', valueAsMoneyNoCents: '$390', zero: false },
        percentOverTarget: { value: 6.7, valueAsPercentage: '7%', valueAsPercentageTenths: '6.7%', zero: false },
        currency: 'USD',
        allZero: false,
      },
      {
        entity: { key: { id: 'D-NE-2', hierarchy: 'OPERATIONAL' }, name: 'District Northeast 2', isStore: false, isDsc: false, sortValue: '00' },
        salesAmount: { value: 34485, valueAsMoney: '$34,485.00', valueAsMoneyNoCents: '$34,485', zero: false },
        planAmount: { value: 31300, valueAsMoney: '$31,300.00', valueAsMoneyNoCents: '$31,300', zero: false },
        targetPercent: { value: 110.2, valueAsPercentage: '110%', valueAsPercentageTenths: '110.2%', zero: false },
        targetAmount: { value: 31300, valueAsMoney: '$31,300.00', valueAsMoneyNoCents: '$31,300', zero: false },
        amountOverTarget: { value: 3185, valueAsMoney: '$3,185.00', valueAsMoneyNoCents: '$3,185', zero: false },
        percentOverTarget: { value: 10.2, valueAsPercentage: '10%', valueAsPercentageTenths: '10.2%', zero: false },
        currency: 'USD',
        allZero: false,
      },
    ],
    sigLivePollingData: [
      {
        supportCenter: '1',
        supportCenterText: 'US Kay/Zales',
        lastPolled: { internalValue: '2026-04-09', displayValue: '04/09/2026 02:35 PM', javaDate: 1775940900000 },
        polledToday: 'Y',
        finalSales: 'N',
        polledMessage: 'Polled today at 2:35 PM ET',
      },
    ],
    errorMessage: null,
  };
}

export function buildMockSalesData(): SigCT2SalesResponse {
  return {
    sales: [
      {
        entity: { key: { id: '1042', hierarchy: 'OPERATIONAL' }, name: 'Kay #1042 Crossgates', isStore: true, isDsc: false, sortValue: '01' },
        reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' },
        currency: 'USD',
        dayAmount: { value: 8745 }, dayPlanAmount: { value: 7500 }, lyDayAmount: { value: 7930 },
        compDayAmount: { value: 8745 }, lyCompDayAmount: { value: 7930 },
        wtdAmount: { value: 32150 }, wtdPlanAmount: { value: 28000 }, lyWtdAmount: { value: 29400 },
        compWtdAmount: { value: 32150 }, lyCompWtdAmount: { value: 29400 },
        mtdAmount: { value: 54820 }, mtdPlanAmount: { value: 52000 }, lyMtdAmount: { value: 48750 },
        compMtdAmount: { value: 54820 }, lyCompMtdAmount: { value: 48750 },
        qtdAmount: { value: 54820 }, qtdPlanAmount: { value: 52000 }, lyQtdAmount: { value: 48750 },
        compQtdAmount: { value: 54820 }, lyCompQtdAmount: { value: 48750 },
        ytdAmount: { value: 312400 }, ytdPlanAmount: { value: 295000 }, lyYtdAmount: { value: 287600 },
        compYtdAmount: { value: 312400 }, lyCompYtdAmount: { value: 287600 },
      },
      {
        entity: { key: { id: '1155', hierarchy: 'OPERATIONAL' }, name: 'Zales #1155 Colonie', isStore: true, isDsc: false, sortValue: '02' },
        reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' },
        currency: 'USD',
        dayAmount: { value: 5320 }, dayPlanAmount: { value: 6000 }, lyDayAmount: { value: 5810 },
        compDayAmount: { value: 5320 }, lyCompDayAmount: { value: 5810 },
        wtdAmount: { value: 21780 }, wtdPlanAmount: { value: 24000 }, lyWtdAmount: { value: 22950 },
        compWtdAmount: { value: 21780 }, lyCompWtdAmount: { value: 22950 },
        mtdAmount: { value: 38600 }, mtdPlanAmount: { value: 42000 }, lyMtdAmount: { value: 39100 },
        compMtdAmount: { value: 38600 }, lyCompMtdAmount: { value: 39100 },
        qtdAmount: { value: 38600 }, qtdPlanAmount: { value: 42000 }, lyQtdAmount: { value: 39100 },
        compQtdAmount: { value: 38600 }, lyCompQtdAmount: { value: 39100 },
        ytdAmount: { value: 198500 }, ytdPlanAmount: { value: 210000 }, lyYtdAmount: { value: 195200 },
        compYtdAmount: { value: 198500 }, lyCompYtdAmount: { value: 195200 },
      },
      {
        entity: { key: { id: '2087', hierarchy: 'OPERATIONAL' }, name: 'Jared #2087 Stuyvesant', isStore: true, isDsc: false, sortValue: '03' },
        reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' },
        currency: 'USD',
        dayAmount: { value: 14230 }, dayPlanAmount: { value: 12000 }, lyDayAmount: { value: 11850 },
        compDayAmount: { value: 14230 }, lyCompDayAmount: { value: 11850 },
        wtdAmount: { value: 48900 }, wtdPlanAmount: { value: 44000 }, lyWtdAmount: { value: 42300 },
        compWtdAmount: { value: 48900 }, lyCompWtdAmount: { value: 42300 },
        mtdAmount: { value: 89450 }, mtdPlanAmount: { value: 82000 }, lyMtdAmount: { value: 78200 },
        compMtdAmount: { value: 89450 }, lyCompMtdAmount: { value: 78200 },
        qtdAmount: { value: 89450 }, qtdPlanAmount: { value: 82000 }, lyQtdAmount: { value: 78200 },
        compQtdAmount: { value: 89450 }, lyCompQtdAmount: { value: 78200 },
        ytdAmount: { value: 524800 }, ytdPlanAmount: { value: 490000 }, lyYtdAmount: { value: 478500 },
        compYtdAmount: { value: 524800 }, lyCompYtdAmount: { value: 478500 },
      },
    ],
    salesAndPlanByDay: [
      { reportDate: { internalValue: '2026-04-07', displayValue: '04/07/2026' }, salesAmount: { value: 11200 }, planAmount: { value: 10500 }, lySalesAmount: { value: 10800 } },
      { reportDate: { internalValue: '2026-04-08', displayValue: '04/08/2026' }, salesAmount: { value: 12450 }, planAmount: { value: 11000 }, lySalesAmount: { value: 11350 } },
      { reportDate: { internalValue: '2026-04-09', displayValue: '04/09/2026' }, salesAmount: { value: 28295 }, planAmount: { value: 25500 }, lySalesAmount: { value: 25590 } },
    ],
    errorMessage: null,
  };
}

export function buildMockStoreLocations(): SigCT2StoreLocatorResponse {
  return {
    stores: [
      { storeName: 'Kay Jewelers', storeNo: '1042', shopNo: '1042', latitude: '42.7140', longitude: '-73.8493', supportCenter: '1' },
      { storeName: 'Zales', storeNo: '1155', shopNo: '1155', latitude: '42.7098', longitude: '-73.8317', supportCenter: '1' },
      { storeName: 'Jared The Galleria of Jewelry', storeNo: '2087', shopNo: '2087', latitude: '42.6651', longitude: '-73.7990', supportCenter: '1' },
      { storeName: 'Kay Jewelers', storeNo: '3401', shopNo: '3401', latitude: '41.6921', longitude: '-73.9209', supportCenter: '1' },
      { storeName: 'Zales Outlet', storeNo: '4523', shopNo: '4523', latitude: '42.9320', longitude: '-74.1715', supportCenter: '1' },
    ],
    errorMessage: null,
  };
}

export function buildMockDSCLocations(): SigCT2DSCLocatorResponse {
  return {
    shops: [
      { storeName: 'Design & Service Center - Albany', storeNo: 'DSC-101', shopNo: 'DSC-101', latitude: '42.6526', longitude: '-73.7562', supportCenter: '1' },
      { storeName: 'Design & Service Center - Syracuse', storeNo: 'DSC-204', shopNo: 'DSC-204', latitude: '43.0481', longitude: '-76.1474', supportCenter: '1' },
      { storeName: 'Design & Service Center - White Plains', storeNo: 'DSC-308', shopNo: 'DSC-308', latitude: '41.0340', longitude: '-73.7629', supportCenter: '1' },
    ],
    errorMessage: null,
  };
}

export function buildMockJobsData(): SigCT2JobsResponse {
  return {
    repairJobCounts: [
      {
        '1042': {
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
        '1042': {
          completed: { all: 4, repair: 0, custom: 4 },
          duein2Days: { all: 1, repair: 0, custom: 1 },
          duein5Days: { all: 2, repair: 0, custom: 2 },
          duein7Days: { all: 3, repair: 0, custom: 3 },
          jobsinqueue: { all: 7, repair: 0, custom: 7 },
          overdue: { all: 1, repair: 0, custom: 1 },
          overduewomessage: { all: 0, repair: 0, custom: 0 },
        },
      },
    ],
    childRepairJobCounts: [
      { entityID: '1042', name: 'Kay #1042 Crossgates', jobCount: { all: 23, repair: 18, custom: 5 }, repairJobcount: 18, customJobCount: 5 },
      { entityID: '1155', name: 'Zales #1155 Colonie', jobCount: { all: 15, repair: 12, custom: 3 }, repairJobcount: 12, customJobCount: 3 },
    ],
    childCustomJobCounts: [
      { entityID: '1042', name: 'Kay #1042 Crossgates', jobCount: { all: 7, repair: 0, custom: 7 }, repairJobcount: 0, customJobCount: 7 },
    ],
    childRepairJobs: [
      { jobID: 'J-90001', jobNumber: '90001', lastTransaction: 'Received at store', lastTransactionDate: { displayValue: '04/07/2026' }, promiseDate: { displayValue: '04/14/2026' }, days: 5 },
      { jobID: 'J-90002', jobNumber: '90002', lastTransaction: 'Shipped to DSC', lastTransactionDate: { displayValue: '04/05/2026' }, promiseDate: { displayValue: '04/10/2026' }, days: 1 },
      { jobID: 'J-90003', jobNumber: '90003', lastTransaction: 'Work completed', lastTransactionDate: { displayValue: '04/08/2026' }, promiseDate: { displayValue: '04/09/2026' }, days: 0 },
    ],
    childCustomJobs: [
      { jobID: 'J-80001', jobNumber: '80001', lastTransaction: 'Design approved', lastTransactionDate: { displayValue: '04/03/2026' }, promiseDate: { displayValue: '04/18/2026' }, days: 9 },
      { jobID: 'J-80002', jobNumber: '80002', lastTransaction: 'CAD in progress', lastTransactionDate: { displayValue: '04/06/2026' }, promiseDate: { displayValue: '04/22/2026' }, days: 13 },
    ],
    errorMessage: null,
  };
}

export function buildMockMorningData(): SigCT2MorningDataResponse {
  return {
    notShippedMorningData: [
      { entity: { key: { id: '1042', hierarchy: 'OPERATIONAL' }, name: 'Kay #1042 Crossgates', isStore: true, isDsc: false, sortValue: '01' }, jobCount: { all: 4, repair: 3, custom: 1 } },
      { entity: { key: { id: '1155', hierarchy: 'OPERATIONAL' }, name: 'Zales #1155 Colonie', isStore: true, isDsc: false, sortValue: '02' }, jobCount: { all: 2, repair: 2, custom: 0 } },
      { entity: { key: { id: '2087', hierarchy: 'OPERATIONAL' }, name: 'Jared #2087 Stuyvesant', isStore: true, isDsc: false, sortValue: '03' }, jobCount: { all: 6, repair: 4, custom: 2 } },
    ],
    notReceivedMorningData: [
      { entity: { key: { id: '1042', hierarchy: 'OPERATIONAL' }, name: 'Kay #1042 Crossgates', isStore: true, isDsc: false, sortValue: '01' }, jobCount: { all: 2, repair: 1, custom: 1 } },
      { entity: { key: { id: '3401', hierarchy: 'OPERATIONAL' }, name: 'Kay #3401 Poughkeepsie', isStore: true, isDsc: false, sortValue: '04' }, jobCount: { all: 3, repair: 3, custom: 0 } },
      { entity: { key: { id: '2087', hierarchy: 'OPERATIONAL' }, name: 'Jared #2087 Stuyvesant', isStore: true, isDsc: false, sortValue: '03' }, jobCount: { all: 1, repair: 0, custom: 1 } },
      { entity: { key: { id: '1155', hierarchy: 'OPERATIONAL' }, name: 'Zales #1155 Colonie', isStore: true, isDsc: false, sortValue: '02' }, jobCount: { all: 5, repair: 4, custom: 1 } },
    ],
    errorMessage: null,
  };
}
