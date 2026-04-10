import { useState, useCallback, useRef } from 'react';
import type { SigCTAuthState, SigCTUserEntityResponse } from '../types/custom-apps/sigct-banner';
import { SIGCT_OAUTH, SIGCT_ACTIVE_ENDPOINT, SIGCT_SESSION_TIMEOUT_MINUTES } from '../constants/custom-apps/sigct-banner';
import { proxyFetch } from '../services/proxy';
import { isBrowser } from '../services/runtime';
import { SIGCT_DEMO_TOKEN, buildMockUserEntity } from '../constants/custom-apps/sigct-mock';

const STORAGE_TOKEN = 'sigct-accessToken';
const STORAGE_REFRESH = 'sigct-refreshToken';
const STORAGE_LOGIN = 'sigct-lastLogin';
const STORAGE_PKCE = 'sigct-pkceVerifier';

export function useSigCTAuth() {
  const [state, setState] = useState<SigCTAuthState>({
    isAuthorized: false, isLoading: false,
    accessToken: null, refreshToken: null,
    error: null, loginDate: null, username: null
  });
  const [oauthUrl, setOauthUrl] = useState<string | null>(null);
  const userEntityRef = useRef<SigCTUserEntityResponse | null>(null);

  /** Generate PKCE code verifier + SHA256 challenge (matches Swift getCodeVerifier/getCodeChallenge) */
  const generatePKCE = useCallback(async () => {
    const buffer = new Uint8Array(32);
    crypto.getRandomValues(buffer);
    const verifier = btoa(String.fromCharCode(...buffer))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return { verifier, challenge };
  }, []);

  /** Build the Azure AD authorization URL and open the OAuth screen */
  const startOAuth = useCallback(async () => {
    const { verifier, challenge } = await generatePKCE();
    localStorage.setItem(STORAGE_PKCE, verifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: SIGCT_OAUTH.clientId,
      redirect_uri: SIGCT_OAUTH.redirectUri,
      scope: SIGCT_OAUTH.scope,
      state: '69a918d46c3c48efb64fc45e1ed15ffa',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      response_mode: 'query',
      prompt: 'login'
    });

    const url = `${SIGCT_OAUTH.authUrl}?${params.toString()}`;
    setOauthUrl(url);
  }, [generatePKCE]);

  /** Cancel OAuth flow */
  const cancelOAuth = useCallback(() => {
    setOauthUrl(null);
  }, []);

  /** Exchange auth code for tokens (matches Swift authorize + acquireToken) */
  const exchangeCode = useCallback(async (code: string) => {
    setOauthUrl(null);
    setState(s => ({ ...s, isLoading: true, error: null }));

    const verifier = localStorage.getItem(STORAGE_PKCE) ?? '';
    try {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: SIGCT_OAUTH.clientId,
        client_secret: '',
        code,
        scope: SIGCT_OAUTH.scope,
        redirect_uri: SIGCT_OAUTH.redirectUri,
        code_verifier: verifier
      });

      const res = await proxyFetch(SIGCT_OAUTH.tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Token exchange failed: ${res.status} ${err}`);
      }

      const tokenData = await res.json();
      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;

      if (!accessToken) throw new Error('No access token received');

      const now = Date.now();
      localStorage.setItem(STORAGE_TOKEN, accessToken);
      if (refreshToken) localStorage.setItem(STORAGE_REFRESH, refreshToken);
      localStorage.setItem(STORAGE_LOGIN, String(now));

      let username: string | null = null;
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        username = payload.name ?? payload.preferred_username ?? null;
      } catch { /* JWT decode failed */ }

      setState({
        isAuthorized: true, isLoading: false,
        accessToken, refreshToken: refreshToken ?? null,
        error: null, loginDate: now, username
      });

      // Fetch user entities in the background — don't block navigation
      loginWithToken(accessToken, refreshToken).catch(() => {});
    } catch (err) {
      setState(s => ({
        ...s, isLoading: false,
        error: err instanceof Error ? err.message : 'Token exchange failed'
      }));
    }
  }, []);

  /** Use an access token to load user entities and complete login */
  const loginWithToken = useCallback(async (token: string, refresh?: string) => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    try {
      // Decode JWT to get employeeId
      let employeeId: string | null = null;
      let username: string | null = null;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        employeeId = payload.employeeid ?? payload.employee_id ?? null;
        username = payload.name ?? payload.preferred_username ?? null;
      } catch { /* JWT decode failed */ }

      if (!employeeId) throw new Error('Employee ID not found in token');

      // Fetch user entities
      const res = await proxyFetch(`${SIGCT_ACTIVE_ENDPOINT}/api/rest/getSigctUserEntities`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ employeeId })
      });

      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data: SigCTUserEntityResponse = await res.json();
      if (data.errorMessage) throw new Error(String(data.errorMessage));
      if (!data.entities?.length) throw new Error('No permissions found. Contact IT CSD.');

      const now = Date.now();
      localStorage.setItem(STORAGE_TOKEN, token);
      if (refresh) localStorage.setItem(STORAGE_REFRESH, refresh);
      localStorage.setItem(STORAGE_LOGIN, String(now));
      userEntityRef.current = data;

      setState({
        isAuthorized: true, isLoading: false,
        accessToken: token, refreshToken: refresh ?? null,
        error: null, loginDate: now, username
      });
      return data;
    } catch (err) {
      userEntityRef.current = null;
      setState({
        isAuthorized: false, isLoading: false,
        accessToken: null, refreshToken: null,
        error: err instanceof Error ? err.message : 'Login failed',
        loginDate: null, username: null
      });
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_REFRESH);
    localStorage.removeItem(STORAGE_LOGIN);
    localStorage.removeItem(STORAGE_PKCE);
    userEntityRef.current = null;
    setOauthUrl(null);
    setState({
      isAuthorized: false, isLoading: false,
      accessToken: null, refreshToken: null,
      error: null, loginDate: null, username: null
    });
  }, []);

  const getStoredToken = useCallback(() => {
    if (isBrowser) return SIGCT_DEMO_TOKEN;
    return localStorage.getItem(STORAGE_TOKEN);
  }, []);

  /** Restore session from a stored token without blocking on API calls */
  const restoreSession = useCallback((token: string) => {
    if (isBrowser) {
      // Browser demo mode — skip API calls, use mock entities
      userEntityRef.current = buildMockUserEntity();
      setState({
        isAuthorized: true, isLoading: false,
        accessToken: SIGCT_DEMO_TOKEN, refreshToken: null,
        error: null, loginDate: Date.now(), username: 'Demo User'
      });
      return;
    }

    const login = localStorage.getItem(STORAGE_LOGIN);
    const refresh = localStorage.getItem(STORAGE_REFRESH);
    let username: string | null = null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      username = payload.name ?? payload.preferred_username ?? null;
    } catch { /* JWT decode failed */ }

    setState({
      isAuthorized: true, isLoading: false,
      accessToken: token, refreshToken: refresh,
      error: null, loginDate: login ? Number(login) : Date.now(), username
    });

    // Fetch user entities in background
    loginWithToken(token, refresh ?? undefined).catch(() => {});
  }, [loginWithToken]);

  const checkSessionExpiry = useCallback(() => {
    const login = localStorage.getItem(STORAGE_LOGIN);
    if (!login) return true;
    return (Date.now() - Number(login)) / 60000 >= SIGCT_SESSION_TIMEOUT_MINUTES;
  }, []);

  // Default to showing all menu options when authorized but entities haven't loaded yet
  const hasEntities = !!userEntityRef.current?.entities?.length;
  const isStore = hasEntities
    ? userEntityRef.current!.entities!.some(
        e => e.defaultEntity?.key.hierarchy === 'OPERATIONAL' || e.defaultEntity?.key.hierarchy === 'BANNER'
      )
    : state.isAuthorized;

  const isRepair = hasEntities
    ? userEntityRef.current!.entities!.some(
        e => e.defaultEntity?.key.hierarchy === 'REPAIR'
      )
    : state.isAuthorized;

  return {
    ...state, userEntity: userEntityRef.current,
    isStore, isRepair, oauthUrl,
    startOAuth, cancelOAuth, exchangeCode, loginWithToken,
    logout, getStoredToken, restoreSession, checkSessionExpiry
  };
}
