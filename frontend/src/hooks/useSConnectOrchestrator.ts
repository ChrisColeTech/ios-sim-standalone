import { useEffect, useCallback, useState, useRef } from 'react';
import { useSConnectAuth } from './useSConnectAuth';
import { useSConnectData } from './useSConnectData';
import { useSConnectNavigation } from './useSConnectNavigation';
import { useSConnectSession } from './useSConnectSession';
import { useSConnectWebView } from './useSConnectWebView';
import { useUiStoreState } from '../store/uiStore';
import { useSConnectStore } from '../store/sconnectStore';
import {
  SCONNECT_ACTIVE_ENDPOINT,
  SCONNECT_MENU_TO_CATEGORY,
  SCONNECT_CATEGORY_TO_MENU
} from '../constants/custom-apps/sconnect-home';
import {
  stripNonDigits,
  capitalize,
  buildAboutRows
} from '../utils/sconnect/data-transform';
import type {
  SConnectMenuOption,
  SConnectButton
} from '../types/custom-apps/sconnect-home';
import type { AboutRow } from '../utils/sconnect/data-transform';

export function useSConnectOrchestrator(_isDark: boolean) {
  const auth = useSConnectAuth();
  const data = useSConnectData();
  const nav = useSConnectNavigation();
  const session = useSConnectSession(auth.loginDate, auth.logout);
  const webView = useSConnectWebView(nav.webViewUrl);
  const setSafariUrl = useUiStoreState(s => s.setSafariUrl);
  const openAppById = useUiStoreState(s => s.openAppById);

  const [menuOpen, setMenuOpen] = useState(false);
  const [locationStore, setLocationStore] = useState('');
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);
  const contentScreen = useSConnectStore(s => s.contentScreen);
  const setContentScreen = useSConnectStore(s => s.setContentScreen);
  const hasAutoAuthed = useRef(false);

  const navigateAfterLogin = useCallback(() => {
    if (data.needsAdminSetup()) { nav.navigate('admin-setup'); return; }
    data.refreshCategories();
    nav.navigate('home');
  }, [data, nav]);

  useEffect(() => {
    if (hasAutoAuthed.current) return;
    hasAutoAuthed.current = true;

    // If store already has a valid session, rebuild derived state and stay on persisted screen.
    if (auth.isAuthorized && auth.user && !auth.checkSessionExpiry()) {
      data.initFromUser(auth.user, true);
      // Only redirect if stuck on splash/login — otherwise stay on the persisted screen
      if (nav.currentScreen === 'splash' || nav.currentScreen === 'login-form') {
        navigateAfterLogin();
      } else if (data.needsAdminSetup()) {
        nav.navigate('admin-setup');
      }
      return;
    }

    const saved = auth.getStoredCredentials();
    if (saved && !auth.checkSessionExpiry()) {
      auth.login(saved).then(user => {
        // Re-login from stored credentials — preserve selections saved from prior session
        if (user) { data.initFromUser(user, true); return; }
        nav.navigate('login-form');
      });
    } else {
      // No valid session — show splash then login
      if (nav.currentScreen !== 'splash') nav.navigate('splash');
      setTimeout(() => nav.navigate('login-form'), 3000);
    }
  }, [auth, data, nav, navigateAfterLogin]);

  useEffect(() => {
    if ((nav.currentScreen === 'splash' || nav.currentScreen === 'login-form') && auth.user && auth.isAuthorized) {
      data.initFromUser(auth.user, true);
      if (!data.needsAdminSetup()) {
        data.refreshCategories();
        nav.navigate('home');
      } else {
        navigateAfterLogin();
      }
    }
  }, [auth.user, auth.isAuthorized, nav.currentScreen, data, navigateAfterLogin]);

  const handleLogin = useCallback(async (employeeId: string) => {
    const user = await auth.login(employeeId);
    if (user) { data.initFromUser(user); }
  }, [auth, data]);

  const handleMenuSelect = useCallback((option: SConnectMenuOption) => {
    setMenuOpen(false);
    const categoryName = SCONNECT_MENU_TO_CATEGORY[option];
    if (categoryName) { data.setCategory(categoryName); setContentScreen('grid'); nav.navigate('home'); return; }
    if (option === 'go-to-url') { setContentScreen('go-to-url'); nav.navigate('home'); return; }
    if (option === 'calculator') { setContentScreen('calculator'); nav.navigate('home'); return; }
    if (option === 'help') { setContentScreen('help'); nav.navigate('home'); return; }
    if (option === 'pos') {
      if (!data.isDallas && !data.isDsc && !data.isAtHome) {
        nav.openUrl('about:blank'); // POS uses store-specific URL
        setContentScreen('pos');
        nav.navigate('home');
      } else {
        setAlert({ title: 'POS', message: 'POS is not available for this banner or location.' });
      }
      return;
    }
    if (option === 'about') { nav.navigate('about'); return; }
    if (option === 'settings') { nav.navigate('settings'); return; }
    if (option === 'logout') {
      auth.logout();
      setContentScreen('grid');
      nav.navigate('splash');
      hasAutoAuthed.current = false;
    }
  }, [data, nav, auth]);

  const handleButtonTap = useCallback((button: SConnectButton) => {
    const url = data.resolveButtonUrl(button);
    if (!url.startsWith('http')) return;
    if (button.externalBrowser) {
      setSafariUrl(url);
      openAppById('safari');
      return;
    }
    nav.openUrl(url);
    setContentScreen('webview');
  }, [data, nav, setSafariUrl, openAppById]);

  const handleNavigateUrl = useCallback((url: string) => {
    nav.openUrl(url);
    setContentScreen('webview');
    webView.navigate(url);
  }, [nav, webView]);

  const handleBannerChange = useCallback((newBanner: string) => {
    data.setBanner(newBanner);
    data.refreshCategories(newBanner);
  }, [data]);

  const handleAdminSave = useCallback(() => {
    if (!data.banner) { setAlert({ title: 'Error', message: 'Select a Banner.' }); return; }
    if (!data.isAtHome && !data.customStoreNumber && !data.defaultStoreNumber) {
      setAlert({ title: 'Error', message: data.isDsc ? 'Select a Shop Number.' : 'Select a Store Number.' });
      return;
    }
    data.saveSettings();
    data.refreshCategories();
    nav.navigate('home');
  }, [data, nav]);

  const handleSettingsBannerChange = useCallback((newBanner: string) => {
    data.setBanner(newBanner);
    data.refreshCategories(newBanner);
    data.saveSettings();
  }, [data]);

  const handleLocationSave = useCallback(() => {
    if (!data.isAtHome) {
      const num = Number(locationStore);
      if (!num || num === 0) {
        setAlert({ title: 'Error', message: data.isDsc ? 'Shop Number cannot be empty.' : 'Store Number cannot be empty.' });
        return;
      }
      data.setCustomStoreNumber(num);
    }
    data.saveSettings();
    data.refreshCategories();
    nav.goBack();
  }, [data, nav, locationStore]);

  const openBannerPicker = useCallback(() => { nav.navigate('banner-picker'); }, [nav]);
  const openLocation = useCallback(() => {
    setLocationStore(String(data.customStoreNumber ?? data.defaultStoreNumber ?? ''));
    nav.navigate('location');
  }, [data, nav]);

  const handleToggleFavorite = useCallback(() => {
    if (!nav.webViewUrl) return;
    if (data.isFavorite(nav.webViewUrl)) data.removeFavorite(nav.webViewUrl);
    else data.addFavorite(nav.webViewUrl, nav.webViewUrl);
  }, [data, nav.webViewUrl]);

  const handleLocationInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = stripNonDigits(e.currentTarget.value);
    setLocationStore(e.currentTarget.value);
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const dismissAlert = useCallback(() => setAlert(null), []);
  const closeToHome = useCallback(() => nav.navigate('home'), [nav]);

  const selectedMenuOption: SConnectMenuOption | null = data.selectedCategory
    ? (SCONNECT_CATEGORY_TO_MENU[data.selectedCategory.description] as SConnectMenuOption | undefined) ?? null
    : null;

  const aboutRows: AboutRow[] = data.user
    ? buildAboutRows(data.user, data.banner, data.storeDisplayText, SCONNECT_ACTIVE_ENDPOINT, session.formattedTime)
    : [];

  const settingsBannerDisplay: string = data.banner ? capitalize(data.banner) : '';

  return {
    auth, data, nav, session, webView,
    menuOpen, locationStore, alert, dismissAlert, contentScreen,
    handleLogin, handleMenuSelect, handleButtonTap, handleNavigateUrl,
    handleBannerChange, handleAdminSave, handleSettingsBannerChange,
    handleLocationSave, openBannerPicker, openLocation, handleToggleFavorite,
    handleLocationInput, openMenu, closeMenu, closeToHome,
    selectedMenuOption, aboutRows, settingsBannerDisplay, setLocationStore
  };
}
