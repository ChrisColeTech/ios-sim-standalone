import { useState, useCallback, useRef } from 'react';
import { SIGCT2_ACTIVE_ENDPOINT } from '../constants/custom-apps/sigct2';
import { proxyFetch } from '../services/proxy';
import { isBrowser } from '../services/runtime';
import { buildMockSigLiveData, buildMockSalesData } from '../constants/custom-apps/sigct2-mock';
import type {
  SigCT2SigLiveResponse, SigCT2SigLiveDatum, SigCT2SigLivePollingDatum,
  SigCT2SalesResponse, SigCT2Sale, SigCT2SalesAndPlanByDay,
  SigCT2SalesPeriod, SigCT2SalesType, SigCT2UserKey
} from '../types/custom-apps/sigct2';

type DrilldownEntry = { key: SigCT2UserKey; title: string };

export function useSigCT2Data(accessToken: string | null) {
  const [sigLiveData, setSigLiveData] = useState<SigCT2SigLiveDatum[]>([]);
  const [sigLivePolling, setSigLivePolling] = useState<SigCT2SigLivePollingDatum[]>([]);
  const [sigLiveParent, setSigLiveParent] = useState<SigCT2SigLiveDatum | null>(null);
  const [salesData, setSalesData] = useState<SigCT2Sale[]>([]);
  const [salesByDay, setSalesByDay] = useState<SigCT2SalesAndPlanByDay[]>([]);
  const [salesPeriod, setSalesPeriod] = useState<SigCT2SalesPeriod>('DAY');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Drill-down history stacks
  const sigLiveHistory = useRef<DrilldownEntry[]>([]);
  const salesHistory = useRef<DrilldownEntry[]>([]);
  const [sigLiveTitle, setSigLiveTitle] = useState('');
  const [salesTitle, setSalesTitle] = useState('');

  const apiPost = useCallback(async (path: string, body: Record<string, unknown>) => {
    if (!accessToken) throw new Error('Not authenticated');
    const res = await proxyFetch(`${SIGCT2_ACTIVE_ENDPOINT}/api/rest/${path}`, {
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

  const fetchSigLive = useCallback(async (entityKey?: SigCT2UserKey, currency = 'USD') => {
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
      const data: SigCT2SigLiveResponse = await apiPost('sigLive', { entityKey: key, currency });
      setSigLiveData(data.sigLiveData ?? []);
      setSigLivePolling(data.sigLivePollingData ?? []);
      if (data.errorMessage) setError(String(data.errorMessage));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load SigLive');
    } finally {
      setIsLoading(false);
    }
  }, [apiPost]);

  const drillDownSigLive = useCallback(async (datum: SigCT2SigLiveDatum) => {
    const key = datum.entity?.key;
    const name = datum.entity?.name ?? 'Detail';
    if (!key) return;
    const prevKey = sigLiveHistory.current.length > 0
      ? sigLiveHistory.current[sigLiveHistory.current.length - 1].key
      : { hierarchy: 'OPERATIONAL', id: 'OPERATIONAL_ROOT' };
    sigLiveHistory.current.push({ key: prevKey, title: sigLiveTitle });
    setSigLiveTitle(name);
    setSigLiveParent(datum);
    await fetchSigLive(key);
  }, [fetchSigLive, sigLiveTitle]);

  /** Pops the SigLive history stack. Returns true if more history remains. */
  const goBackSigLive = useCallback(async (): Promise<boolean> => {
    const prev = sigLiveHistory.current.pop();
    if (prev) {
      setSigLiveTitle(prev.title);
      setSigLiveParent(sigLiveHistory.current.length > 0 ? sigLiveParent : null);
      await fetchSigLive(prev.key);
    }
    return sigLiveHistory.current.length > 0;
  }, [fetchSigLive, sigLiveParent]);

  const sigLiveCanGoBack = sigLiveHistory.current.length > 0;

  // --- Sales/Analytics ---

  const fetchSales = useCallback(async (
    salesType: SigCT2SalesType,
    entityKey?: SigCT2UserKey,
    reportDate?: string,
    currency = 'USD'
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const key = entityKey ?? { hierarchy: 'BANNER', id: 'BANNER_ROOT' };
      const body: Record<string, unknown> = {
        entityKey: key,
        includeSalesAndPlanByDay: 'Y',
        salesType,
        currency
      };
      if (reportDate) body.reportDate = reportDate;
      if (isBrowser) {
        const mock = buildMockSalesData();
        setSalesData(mock.sales ?? []);
        setSalesByDay(mock.salesAndPlanByDay ?? []);
        return;
      }
      const data: SigCT2SalesResponse = await apiPost('sigctSales', body);
      setSalesData(data.sales ?? []);
      setSalesByDay(data.salesAndPlanByDay ?? []);
      if (data.errorMessage) setError(String(data.errorMessage));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load sales');
    } finally {
      setIsLoading(false);
    }
  }, [apiPost]);

  const drillDownSales = useCallback(async (sale: SigCT2Sale, salesType: SigCT2SalesType) => {
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

  const goBackSales = useCallback(async (salesType: SigCT2SalesType) => {
    const prev = salesHistory.current.pop();
    if (prev) {
      setSalesTitle(prev.title);
      await fetchSales(salesType, prev.key);
    }
  }, [fetchSales]);

  const salesCanGoBack = salesHistory.current.length > 0;

  return {
    // SigLive
    sigLiveData, sigLivePolling, sigLiveTitle, sigLiveParent,
    fetchSigLive, drillDownSigLive, goBackSigLive, sigLiveCanGoBack,
    // Sales
    salesData, salesByDay, salesTitle, salesPeriod, setSalesPeriod,
    fetchSales, drillDownSales, goBackSales, salesCanGoBack,
    // Common
    isLoading, error
  };
}
