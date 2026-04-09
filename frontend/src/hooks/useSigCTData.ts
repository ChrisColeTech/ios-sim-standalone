import { useState, useCallback, useRef } from 'react';
import { SIGCT_ACTIVE_ENDPOINT } from '../constants/custom-apps/sigct-banner';
import { proxyFetch } from '../services/proxy';
import { isBrowser } from '../services/runtime';
import {
  buildMockSigLiveData, buildMockSalesData,
  buildMockStoreLocations, buildMockDSCLocations,
  buildMockJobsData, buildMockMorningData
} from '../constants/custom-apps/sigct-mock';
import type {
  SigCTSigLiveResponse, SigCTSigLiveDatum, SigCTSigLivePollingDatum,
  SigCTSalesResponse, SigCTSale, SigCTSalesAndPlanByDay,
  SigCTSalesPeriod, SigCTSalesType, SigCTUserKey,
  SigCTStoreLocation, SigCTStoreDetail, SigCTStoreLocatorResponse, SigCTDSCLocatorResponse,
  SigCTJobsResponse, SigCTChildJobCount, SigCTChildJob, SigCTJobCountValue, SigCTJobsTab,
  SigCTMorningDataResponse, SigCTMorningData, SigCTMorningCustomerData,
  SigCTMorningCustomerDataResponse, SigCTMorningTab
} from '../types/custom-apps/sigct-banner';

type DrilldownEntry = { key: SigCTUserKey; title: string };

export function useSigCTData(accessToken: string | null) {
  const [sigLiveData, setSigLiveData] = useState<SigCTSigLiveDatum[]>([]);
  const [sigLivePolling, setSigLivePolling] = useState<SigCTSigLivePollingDatum[]>([]);
  const [salesData, setSalesData] = useState<SigCTSale[]>([]);
  const [salesByDay, setSalesByDay] = useState<SigCTSalesAndPlanByDay[]>([]);
  const [salesPeriod, setSalesPeriod] = useState<SigCTSalesPeriod>('DAY');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Drill-down history stacks
  const sigLiveHistory = useRef<DrilldownEntry[]>([]);
  const salesHistory = useRef<DrilldownEntry[]>([]);
  const [sigLiveTitle, setSigLiveTitle] = useState('');
  const [salesTitle, setSalesTitle] = useState('');

  const apiPost = useCallback(async (path: string, body: Record<string, unknown>) => {
    if (!accessToken) throw new Error('Not authenticated');
    const res = await proxyFetch(`${SIGCT_ACTIVE_ENDPOINT}/api/rest/${path}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }, [accessToken]);

  // --- SigLive ---

  const fetchSigLive = useCallback(async (entityKey?: SigCTUserKey, currency = 'USD') => {
    setIsLoading(true);
    setError(null);
    try {
      if (isBrowser) {
        const mock = buildMockSigLiveData();
        setSigLiveData(mock.sigLiveData ?? []);
        setSigLivePolling(mock.sigLivePollingData ?? []);
        return;
      }
      const key = entityKey ?? { hierarchy: 'OPERATIONAL', id: 'OPERATIONAL_ROOT' };
      const data: SigCTSigLiveResponse = await apiPost('sigLive', { entityKey: key, currency });
      setSigLiveData(data.sigLiveData ?? []);
      setSigLivePolling(data.sigLivePollingData ?? []);
      if (data.errorMessage) setError(String(data.errorMessage));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load SigLive');
    } finally {
      setIsLoading(false);
    }
  }, [apiPost]);

  const drillDownSigLive = useCallback(async (datum: SigCTSigLiveDatum) => {
    const key = datum.entity?.key;
    const name = datum.entity?.name ?? 'Detail';
    if (!key) return;
    // Push current level onto history
    const prevKey = sigLiveHistory.current.length > 0
      ? sigLiveHistory.current[sigLiveHistory.current.length - 1].key
      : { hierarchy: 'OPERATIONAL', id: 'OPERATIONAL_ROOT' };
    sigLiveHistory.current.push({ key: prevKey, title: sigLiveTitle });
    setSigLiveTitle(name);
    await fetchSigLive(key);
  }, [fetchSigLive, sigLiveTitle]);

  const goBackSigLive = useCallback(async () => {
    const prev = sigLiveHistory.current.pop();
    if (prev) {
      setSigLiveTitle(prev.title);
      await fetchSigLive(prev.key);
    }
  }, [fetchSigLive]);

  const sigLiveCanGoBack = sigLiveHistory.current.length > 0;

  // --- Sales/Analytics ---

  const fetchSales = useCallback(async (
    salesType: SigCTSalesType,
    entityKey?: SigCTUserKey,
    reportDate?: string,
    currency = 'USD'
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (isBrowser) {
        const mock = buildMockSalesData();
        setSalesData(mock.sales ?? []);
        setSalesByDay(mock.salesAndPlanByDay ?? []);
        return;
      }
      const key = entityKey ?? { hierarchy: 'BANNER', id: 'BANNER_ROOT' };
      const body: Record<string, unknown> = {
        entityKey: key,
        includeSalesAndPlanByDay: 'Y',
        salesType,
        currency
      };
      if (reportDate) body.reportDate = reportDate;
      const data: SigCTSalesResponse = await apiPost('sigctSales', body);
      setSalesData(data.sales ?? []);
      setSalesByDay(data.salesAndPlanByDay ?? []);
      if (data.errorMessage) setError(String(data.errorMessage));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load sales');
    } finally {
      setIsLoading(false);
    }
  }, [apiPost]);

  const drillDownSales = useCallback(async (sale: SigCTSale, salesType: SigCTSalesType) => {
    const key = sale.entity?.key;
    const name = sale.entity?.name ?? 'Detail';
    if (!key) return;
    const prevKey = salesHistory.current.length > 0
      ? salesHistory.current[salesHistory.current.length - 1].key
      : { hierarchy: 'BANNER', id: 'BANNER_ROOT' };
    salesHistory.current.push({ key: prevKey, title: salesTitle });
    setSalesTitle(name);
    await fetchSales(salesType, key);
  }, [fetchSales, salesTitle]);

  const goBackSales = useCallback(async (salesType: SigCTSalesType) => {
    const prev = salesHistory.current.pop();
    if (prev) {
      setSalesTitle(prev.title);
      await fetchSales(salesType, prev.key);
    }
  }, [fetchSales]);

  const salesCanGoBack = salesHistory.current.length > 0;

  // --- Store/DSC Locator ---

  const [storeLocations, setStoreLocations] = useState<SigCTStoreLocation[]>([]);
  const [dscLocations, setDscLocations] = useState<SigCTStoreLocation[]>([]);
  const [shopStores, setShopStores] = useState<SigCTStoreLocation[]>([]);
  const [selectedStoreDetail, setSelectedStoreDetail] = useState<SigCTStoreDetail | null>(null);

  const apiGet = useCallback(async (path: string) => {
    if (!accessToken) throw new Error('Not authenticated');
    const res = await proxyFetch(`${SIGCT_ACTIVE_ENDPOINT}/api/rest/${path}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }, [accessToken]);

  const fetchStoreLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isBrowser) {
        const mock = buildMockStoreLocations();
        setStoreLocations(mock.stores ?? []);
        return;
      }
      const data: SigCTStoreLocatorResponse = await apiGet('getStoresLatLong');
      setStoreLocations(data.stores ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load stores');
    } finally {
      setIsLoading(false);
    }
  }, [apiGet]);

  const fetchDSCLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isBrowser) {
        const mock = buildMockDSCLocations();
        setDscLocations(mock.shops ?? []);
        return;
      }
      const data: SigCTDSCLocatorResponse = await apiGet('getShopsLatLong');
      setDscLocations(data.shops ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load DSC shops');
    } finally {
      setIsLoading(false);
    }
  }, [apiGet]);

  const fetchShopStores = useCallback(async (shopNo: string) => {
    try {
      const data = await apiGet(`getSigCtShopStores?shopNo=${shopNo}`);
      setShopStores(data.stores ?? []);
    } catch {
      setShopStores([]);
    }
  }, [apiGet]);

  const fetchStoreDetail = useCallback(async (storeNo: string, supportCenter?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = supportCenter
        ? `storeNo=${storeNo}&supportCenter=${supportCenter}`
        : `storeNo=${storeNo}`;
      const data = await apiGet(`getStoreEntityInformation?${params}`);
      const attrs = data.store?.entityAttributes ?? {};
      const storeData = data.store?.storeData ?? {};
      setSelectedStoreDetail({
        name: storeData.storeName ?? attrs.name ?? '',
        address: attrs.address1 ?? '',
        address2: attrs.address2 ?? '',
        city: attrs.city ?? '',
        state: attrs.state ?? storeData.stateName ?? '',
        postalCode: attrs.postalCode ?? '',
        country: attrs.country ?? storeData.countryName ?? '',
        phone: attrs.phone ?? storeData.phone ?? '',
        dscNo: attrs.dsc_no ?? storeData.dscNo ?? '',
        logo: attrs.logo ?? storeData.logoName ?? '',
        division: storeData.divisionName ?? '',
        region: storeData.regionName ?? '',
        district: storeData.districtName ?? '',
        adi: storeData.adiName ?? attrs.adi ?? '',
        marketDivision: attrs.market_division ?? storeData.marketDivisionName ?? '',
        banner: attrs.banner ?? storeData.bannerName ?? '',
        closed: attrs.closed ?? '',
        openDate: attrs.openDate ?? storeData.openDate ?? '',
        managerName: attrs.managerName ?? storeData.managerName ?? '',
        latitude: attrs.latitude ?? '',
        longitude: attrs.longitude ?? '',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load store detail');
    } finally {
      setIsLoading(false);
    }
  }, [apiGet]);

  // --- Jobs in Shop ---

  const [jobsSummary, setJobsSummary] = useState<SigCTJobCountValue | null>(null);
  const [jobsEntities, setJobsEntities] = useState<SigCTChildJobCount[]>([]);
  const [jobsList, setJobsList] = useState<SigCTChildJob[]>([]);
  const [jobsTab, setJobsTab] = useState<SigCTJobsTab>('all');
  const [jobsTitle, setJobsTitle] = useState('');
  const jobsHistory = useRef<DrilldownEntry[]>([]);

  const fetchJobsSummary = useCallback(async (entityId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (isBrowser) {
        const mock = buildMockJobsData();
        const repairCounts = mock.repairJobCounts?.[0];
        const summary = repairCounts ? Object.values(repairCounts)[0] : null;
        setJobsSummary(summary ?? null);
        setJobsEntities(mock.childRepairJobCounts ?? []);
        setJobsList(mock.childRepairJobs ?? []);
        return;
      }
      const id = entityId ?? '';
      const data: SigCTJobsResponse = await apiPost('jobsInDsc', { entityId: id });
      // Extract summary from first entry of repairJobCounts
      const repairCounts = data.repairJobCounts?.[0];
      const summary = repairCounts ? Object.values(repairCounts)[0] : null;
      setJobsSummary(summary ?? null);
      setJobsEntities(data.childRepairJobCounts ?? []);
      setJobsList(data.childRepairJobs ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load jobs');
    } finally {
      setIsLoading(false);
    }
  }, [apiPost]);

  const drillDownJobs = useCallback(async (entity: SigCTChildJobCount) => {
    if (!entity.entityID) return;
    jobsHistory.current.push({ key: { id: entity.entityID }, title: jobsTitle });
    setJobsTitle(entity.name ?? '');
    await fetchJobsSummary(entity.entityID);
  }, [fetchJobsSummary, jobsTitle]);

  const goBackJobs = useCallback(async () => {
    const prev = jobsHistory.current.pop();
    if (prev) {
      setJobsTitle(prev.title);
      await fetchJobsSummary(prev.key.id);
    }
  }, [fetchJobsSummary]);

  const jobsCanGoBack = jobsHistory.current.length > 0;

  // --- Morning Report ---

  const [morningData, setMorningData] = useState<SigCTMorningData[]>([]);
  const [morningCustomerData, setMorningCustomerData] = useState<SigCTMorningCustomerData[]>([]);
  const [morningTab, setMorningTab] = useState<SigCTMorningTab>('notShipped');
  const [morningTitle, setMorningTitle] = useState('');
  const [morningIsStore, setMorningIsStore] = useState(false);
  const morningHistory = useRef<DrilldownEntry[]>([]);

  const fetchMorningData = useCallback(async (entityId?: string) => {
    setIsLoading(true);
    setError(null);
    setMorningIsStore(false);
    try {
      if (isBrowser) {
        const mock = buildMockMorningData();
        const items = morningTab === 'notShipped'
          ? mock.notShippedMorningData ?? []
          : mock.notReceivedMorningData ?? [];
        setMorningData(items);
        setMorningCustomerData([]);
        return;
      }
      const body: Record<string, unknown> = {};
      if (entityId) body.entityId = entityId;
      const data: SigCTMorningDataResponse = await apiPost('morningDataDsc', body);
      const items = morningTab === 'notShipped'
        ? data.notShippedMorningData ?? []
        : data.notReceivedMorningData ?? [];
      setMorningData(items);
      setMorningCustomerData([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load morning report');
    } finally {
      setIsLoading(false);
    }
  }, [apiPost, morningTab]);

  const fetchMorningCustomerData = useCallback(async (entityId: string) => {
    setIsLoading(true);
    setError(null);
    setMorningIsStore(true);
    try {
      const data: SigCTMorningCustomerDataResponse = await apiPost('morningCustomerDataDsc', { entityId });
      const items = morningTab === 'notShipped'
        ? data.notShippedMorningCustomerData ?? []
        : data.notReceivedMorningCustomerData ?? [];
      setMorningCustomerData(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load customer data');
    } finally {
      setIsLoading(false);
    }
  }, [apiPost, morningTab]);

  const drillDownMorning = useCallback(async (entity: SigCTMorningData) => {
    const id = entity.entity?.key?.id;
    if (!id) return;
    morningHistory.current.push({ key: { id }, title: morningTitle });
    setMorningTitle(entity.entity?.name ?? '');
    // If entity is a store (leaf), fetch customer data; otherwise drill down entities
    if (entity.entity?.key?.hierarchy === 'STORE' || (entity.jobCount && !entity.entity?.key?.hierarchy)) {
      await fetchMorningCustomerData(id);
    } else {
      await fetchMorningData(id);
    }
  }, [fetchMorningData, fetchMorningCustomerData, morningTitle]);

  const goBackMorning = useCallback(async () => {
    const prev = morningHistory.current.pop();
    if (prev) {
      setMorningTitle(prev.title);
      setMorningIsStore(false);
      await fetchMorningData(prev.key.id);
    }
  }, [fetchMorningData]);

  const morningCanGoBack = morningHistory.current.length > 0;

  return {
    // SigLive
    sigLiveData, sigLivePolling, sigLiveTitle,
    fetchSigLive, drillDownSigLive, goBackSigLive, sigLiveCanGoBack,
    // Sales
    salesData, salesByDay, salesTitle, salesPeriod, setSalesPeriod,
    fetchSales, drillDownSales, goBackSales, salesCanGoBack,
    // Store/DSC Locator
    storeLocations, dscLocations, shopStores, selectedStoreDetail,
    fetchStoreLocations, fetchDSCLocations, fetchShopStores, fetchStoreDetail,
    setSelectedStoreDetail,
    // Jobs in Shop
    jobsSummary, jobsEntities, jobsList, jobsTab, jobsTitle,
    setJobsTab, fetchJobsSummary, drillDownJobs, goBackJobs, jobsCanGoBack,
    // Morning Report
    morningData, morningCustomerData, morningTab, morningTitle, morningIsStore,
    setMorningTab, fetchMorningData, fetchMorningCustomerData,
    drillDownMorning, goBackMorning, morningCanGoBack,
    // Common
    isLoading, error
  };
}
