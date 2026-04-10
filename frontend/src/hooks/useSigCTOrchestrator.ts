import { useCallback, useEffect, useRef, useState } from 'react';
import { useSigCTAuth } from './useSigCTAuth';
import { useSigCTNavigation } from './useSigCTNavigation';
import { useSigCTSession } from './useSigCTSession';
import { useSigCTData } from './useSigCTData';
import { SALES_TYPE_MAP } from '../constants/custom-apps/sigct-banner';
import type { SigCTScreen, SigCTSalesType } from '../types/custom-apps/sigct-banner';

export function useSigCTOrchestrator() {
  const auth = useSigCTAuth();
  const nav = useSigCTNavigation();
  const data = useSigCTData(auth.accessToken);
  useSigCTSession(auth.loginDate, auth.logout);

  const hasCheckedToken = useRef(false);
  const [activeSalesType, setActiveSalesType] = useState<SigCTSalesType>('total');

  // Auto-login from stored token on splash
  useEffect(() => {
    if (hasCheckedToken.current || nav.currentScreen !== 'splash') return;
    hasCheckedToken.current = true;
    const token = auth.getStoredToken();
    if (token && !auth.checkSessionExpiry()) {
      // Valid session — authorize immediately, fetch entities in background
      auth.restoreSession(token);
      nav.resetTo('home-menu');
    } else {
      setTimeout(() => nav.resetTo('oauth'), 3000);
    }
  }, [nav.currentScreen, auth, nav]);

  // Navigate to home-menu after authorization
  useEffect(() => {
    console.log('[Orchestrator] isAuthorized:', auth.isAuthorized, 'screen:', nav.currentScreen);
    if (auth.isAuthorized && (nav.currentScreen === 'splash' || nav.currentScreen === 'oauth')) {
      console.log('[Orchestrator] → navigating to home-menu');
      nav.resetTo('home-menu');
    }
  }, [auth.isAuthorized, nav]);

  const handleOAuthStart = useCallback(() => {
    auth.startOAuth();
  }, [auth]);

  const handleAuthCode = useCallback((code: string) => {
    auth.exchangeCode(code);
  }, [auth]);

  const handleMenuSelect = useCallback((screen: SigCTScreen, title?: string) => {
    nav.navigate(screen, title);
    if (screen === 'siglive-summary') data.fetchSigLive();
    else if (screen === 'analytics' && title) {
      const st = SALES_TYPE_MAP[title.toLowerCase()] ?? 'total';
      setActiveSalesType(st);
      data.fetchSales(st);
    } else if (screen === 'store-locator') data.fetchStoreLocations();
    else if (screen === 'dsc-locator') data.fetchDSCLocations();
    else if (screen === 'jobs-summary') data.fetchJobsSummary();
    else if (screen === 'morning-report') data.fetchMorningData();
  }, [nav, data]);

  const handleLogout = useCallback(() => {
    auth.logout();
    hasCheckedToken.current = false;
    nav.resetTo('splash');
  }, [auth, nav]);

  const handleGoHome = useCallback(() => {
    nav.resetTo('home-menu');
  }, [nav]);

  const handleStoreSelect = useCallback((store: { storeNo?: string; storeName?: string; supportCenter?: string }) => {
    data.fetchStoreDetail(store.storeNo ?? '', store.supportCenter);
    nav.navigate('store-detail', store.storeName);
  }, [data, nav]);

  const handleStoreDetailBack = useCallback(() => {
    data.setSelectedStoreDetail(null);
    nav.goBack();
  }, [data, nav]);

  return {
    auth,
    nav,
    data,
    activeSalesType,
    handleOAuthStart,
    handleAuthCode,
    handleMenuSelect,
    handleLogout,
    handleGoHome,
    handleStoreSelect,
    handleStoreDetailBack,
  };
}
