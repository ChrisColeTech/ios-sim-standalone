import { useCallback, useEffect, useRef, useState } from 'react';
import { useSigCT2Auth } from './useSigCT2Auth';
import { useSigCT2Navigation } from './useSigCT2Navigation';
import { useSigCT2Session } from './useSigCT2Session';
import { useSigCT2Data } from './useSigCT2Data';
import { useSigCT2LocationData } from './useSigCT2LocationData';
import { useSigCT2JobsData } from './useSigCT2JobsData';
import { SALES_TYPE_MAP } from '../constants/custom-apps/sigct2-menus';
import type { SigCT2Screen, SigCT2SalesType, SigCT2SigLiveDatum } from '../types/custom-apps/sigct2';

export function useSigCT2Orchestrator() {
  const auth = useSigCT2Auth();
  const nav = useSigCT2Navigation();
  const data = useSigCT2Data(auth.accessToken);
  const loc = useSigCT2LocationData(auth.accessToken);
  const jobs = useSigCT2JobsData(auth.accessToken);
  useSigCT2Session(auth.loginDate, auth.logout);

  const hasCheckedToken = useRef(false);
  const [activeSalesType, setActiveSalesType] = useState<SigCT2SalesType>('total');

  // Auto-login from stored token on splash
  useEffect(() => {
    if (hasCheckedToken.current || nav.currentScreen !== 'splash') return;
    hasCheckedToken.current = true;
    const token = auth.getStoredToken();
    if (token && !auth.checkSessionExpiry()) {
      auth.loginWithToken(token).then(d => {
        if (d) nav.resetTo('home-menu');
        else nav.resetTo('oauth');
      });
    } else {
      setTimeout(() => nav.resetTo('oauth'), 3000);
    }
  }, [nav.currentScreen, auth, nav]);

  // Navigate to home-menu after authorization
  useEffect(() => {
    if (auth.isAuthorized && (nav.currentScreen === 'splash' || nav.currentScreen === 'oauth')) {
      nav.resetTo('home-menu');
    }
  }, [auth.isAuthorized, nav]);

  const handleOAuthStart = useCallback(() => {
    auth.startOAuth();
  }, [auth]);

  const handleAuthCode = useCallback((code: string) => {
    auth.exchangeCode(code);
  }, [auth]);

  const handleMenuSelect = useCallback((screen: SigCT2Screen, title?: string) => {
    nav.navigate(screen, title);
    if (screen === 'siglive-summary') data.fetchSigLive();
    else if (screen === 'analytics' && title) {
      const st = SALES_TYPE_MAP[title.toLowerCase()] ?? 'total';
      setActiveSalesType(st);
      data.fetchSales(st);
    } else if (screen === 'store-locator') loc.fetchStoreLocations();
    else if (screen === 'dsc-locator') loc.fetchDSCLocations();
    else if (screen === 'jobs-summary') jobs.fetchJobsSummary();
    else if (screen === 'morning-report') jobs.fetchMorningData();
  }, [nav, data, loc, jobs]);

  const handleLogout = useCallback(() => {
    auth.logout();
    hasCheckedToken.current = false;
    nav.resetTo('splash');
  }, [auth, nav]);

  const handleGoHome = useCallback(() => {
    nav.resetTo('home-menu');
  }, [nav]);

  const handleStoreSelect = useCallback((store: { storeNo?: string; storeName?: string; supportCenter?: string }) => {
    loc.fetchStoreDetail(store.storeNo ?? '', store.supportCenter);
    nav.navigate('store-detail', store.storeName);
  }, [loc, nav]);

  const handleStoreDetailBack = useCallback(() => {
    loc.setSelectedStoreDetail(null);
    nav.goBack();
  }, [loc, nav]);

  const handleSigLiveDrillDown = useCallback((datum: SigCT2SigLiveDatum) => {
    data.drillDownSigLive(datum);
    if (nav.currentScreen === 'siglive-summary') nav.navigate('siglive-detail');
    // If already on siglive-detail, data updates in place
  }, [data, nav]);

  const handleSigLiveBack = useCallback(async () => {
    const hasMore = await data.goBackSigLive();
    if (!hasMore) nav.goBack();
    // If still has history, stay on siglive-detail with updated data
  }, [data, nav]);

  return {
    auth,
    nav,
    data,
    loc,
    jobs,
    activeSalesType,
    handleOAuthStart,
    handleAuthCode,
    handleMenuSelect,
    handleLogout,
    handleGoHome,
    handleStoreSelect,
    handleStoreDetailBack,
    handleSigLiveDrillDown,
    handleSigLiveBack,
  };
}
