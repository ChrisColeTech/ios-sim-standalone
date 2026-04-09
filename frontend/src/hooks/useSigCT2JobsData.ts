import { useState, useCallback, useRef } from 'react';
import { SIGCT2_ACTIVE_ENDPOINT } from '../constants/custom-apps/sigct2';
import { proxyFetch } from '../services/proxy';
import { isBrowser } from '../services/runtime';
import { buildMockJobsData, buildMockMorningData } from '../constants/custom-apps/sigct2-mock';
import type {
  SigCT2UserKey,
  SigCT2JobsResponse, SigCT2ChildJobCount, SigCT2ChildJob, SigCT2JobCountValue, SigCT2JobsTab,
  SigCT2MorningDataResponse, SigCT2MorningData, SigCT2MorningCustomerData,
  SigCT2MorningCustomerDataResponse, SigCT2MorningTab
} from '../types/custom-apps/sigct2';

type DrilldownEntry = { key: SigCT2UserKey; title: string };

export function useSigCT2JobsData(accessToken: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // --- Jobs in Shop ---

  const [jobsSummary, setJobsSummary] = useState<SigCT2JobCountValue | null>(null);
  const [jobsEntities, setJobsEntities] = useState<SigCT2ChildJobCount[]>([]);
  const [jobsList, setJobsList] = useState<SigCT2ChildJob[]>([]);
  const [jobsTab, setJobsTab] = useState<SigCT2JobsTab>('all');
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
      const data: SigCT2JobsResponse = await apiPost('jobsInDsc', { entityId: id });
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

  const drillDownJobs = useCallback(async (entity: SigCT2ChildJobCount) => {
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

  const [morningData, setMorningData] = useState<SigCT2MorningData[]>([]);
  const [morningCustomerData, setMorningCustomerData] = useState<SigCT2MorningCustomerData[]>([]);
  const [morningTab, setMorningTab] = useState<SigCT2MorningTab>('notShipped');
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
      const data: SigCT2MorningDataResponse = await apiPost('morningDataDsc', body);
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
      const data: SigCT2MorningCustomerDataResponse = await apiPost('morningCustomerDataDsc', { entityId });
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

  const drillDownMorning = useCallback(async (entity: SigCT2MorningData) => {
    const id = entity.entity?.key?.id;
    if (!id) return;
    morningHistory.current.push({ key: { id }, title: morningTitle });
    setMorningTitle(entity.entity?.name ?? '');
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
