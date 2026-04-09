import { useCallback, useState } from 'react';
import type { SConnectUserResponse } from '../types/custom-apps/sconnect-home';
import { SCONNECT_ACTIVE_ENDPOINT, SCONNECT_SESSION_TIMEOUT_MINUTES } from '../constants/custom-apps/sconnect-home';
import { useSConnectStore } from '../store/sconnectStore';
import { proxyFetch } from '../services/proxy';
import { SCONNECT_DEMO_EMPLOYEE_ID, buildMockUser } from '../constants/custom-apps/sconnect-mock';
import { isBrowser } from '../services/runtime';

export function useSConnectAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const isAuthorized = useSConnectStore(s => s.isAuthorized);
  const username = useSConnectStore(s => s.username);
  const error = useSConnectStore(s => s.error);
  const loginDate = useSConnectStore(s => s.loginDate);
  const user = useSConnectStore(s => s.user);
  const setAuth = useSConnectStore(s => s.setAuth);
  const setError = useSConnectStore(s => s.setError);
  const clearAll = useSConnectStore(s => s.clearAll);

  const login = useCallback(async (employeeId: string): Promise<SConnectUserResponse | null> => {
    const trimmed = employeeId.trim();
    setIsLoading(true);
    setError(null);
    try {
      // Browser SaaS mode — always use mock data
      if (isBrowser || trimmed === SCONNECT_DEMO_EMPLOYEE_ID) {
        const mock = buildMockUser(trimmed || SCONNECT_DEMO_EMPLOYEE_ID);
        setAuth({ isAuthorized: true, username: trimmed || 'Demo', loginDate: Date.now(), user: mock, error: null });
        return mock;
      }

      const url = `${SCONNECT_ACTIVE_ENDPOINT}/sconnect/${trimmed}`;
      const res = await proxyFetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data: SConnectUserResponse = await res.json();
      if (data.inError) {
        throw new Error((data as unknown as { message?: string }).message ?? 'Login failed');
      }
      if (!data.employeeId) throw new Error('Employee ID not found');

      setAuth({ isAuthorized: true, username: trimmed, loginDate: Date.now(), user: data, error: null });
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [setAuth, setError]);

  const logout = useCallback(() => { clearAll(); }, [clearAll]);

  const getStoredCredentials = useCallback(() => username, [username]);

  const checkSessionExpiry = useCallback(() => {
    if (!loginDate) return false;
    const diff = Date.now() - loginDate;
    return (diff / (1000 * 60)) >= SCONNECT_SESSION_TIMEOUT_MINUTES;
  }, [loginDate]);

  return {
    isAuthorized, isLoading, username, error, loginDate, user,
    login, logout, getStoredCredentials, checkSessionExpiry
  };
}
