import { useState, useCallback } from 'react';
import type {
  SConnectUserResponse, SConnectButton, SConnectCategory, SConnectMenuOption
} from '../types/custom-apps/sconnect-home';
import {
  SCONNECT_ACTIVE_ENDPOINT,
  SCONNECT_DALLAS_BANNERS, SCONNECT_DSC_BANNER
} from '../constants/custom-apps/sconnect-home';
import { buildCategories, filterButtons } from '../utils/sconnect/data-transform';
import { useSConnectStore } from '../store/sconnectStore';
import { proxyFetch } from '../services/proxy';
import { isBrowser } from '../services/runtime';

function isDallasBanner(b: string | null) { return b ? SCONNECT_DALLAS_BANNERS.some(d => b.toLowerCase().includes(d)) : false; }
function isDscBanner(b: string | null) { return b ? b.toLowerCase().includes(SCONNECT_DSC_BANNER) : false; }

export function useSConnectData() {
  const user = useSConnectStore(s => s.user);
  const banner = useSConnectStore(s => s.banner);
  const customStoreNumber = useSConnectStore(s => s.customStoreNumber);
  const defaultStoreNumber = useSConnectStore(s => s.defaultStoreNumber);
  const isAtHome = useSConnectStore(s => s.isAtHome);
  const storeBanner = useSConnectStore(s => s.setBanner);
  const storeCustomStore = useSConnectStore(s => s.setCustomStoreNumber);
  const storeDefaultStore = useSConnectStore(s => s.setDefaultStoreNumber);
  const storeAtHome = useSConnectStore(s => s.setIsAtHome);
  const storeUser = useSConnectStore(s => s.setUser);
  const selectedCategoryName = useSConnectStore(s => s.selectedCategoryName);
  const storeSelectedCategoryName = useSConnectStore(s => s.setSelectedCategoryName);

  // Local derived state (categories/buttons rebuild on refresh)
  const [categories, setCategories] = useState<SConnectCategory[]>([]);
  const [buttons, setButtons] = useState<SConnectButton[]>([]);
  const [selectedCategory, setSelectedCat] = useState<SConnectCategory | null>(null);
  const [menuOptions, setMenuOptions] = useState<SConnectMenuOption[]>([]);
  const [favorites, setFavorites] = useState<{ id: number; url: string; name?: string }[]>([]);

  const isDallas = isDallasBanner(banner);
  const isDsc = isDscBanner(banner);

  const storeDisplayText = (() => {
    if (isAtHome) return 'Home';
    const num = customStoreNumber ?? defaultStoreNumber;
    if (!num) return 'Select a Store';
    return isDsc ? `Shop ${num}` : `Store ${num}`;
  })();

  const initFromUser = useCallback((u: SConnectUserResponse, preserveSelections = false) => {
    // On session restore, keep existing store selections (banner, store, atHome)
    // so the user isn't forced through admin setup again.
    const apiBanner = u.previousBannerDetail ?? u.bannerDetail ?? null;
    const apiCustomStore = u.previousStoreNumber ? Number(u.previousStoreNumber) : null;
    const apiDefaultStore = u.storeNumber ? Number(u.storeNumber) : null;
    const apiAtHome = u.atHome;

    const activeBanner = preserveSelections ? (banner ?? apiBanner) : apiBanner;
    const activeCustomStore = preserveSelections ? (customStoreNumber ?? apiCustomStore) : apiCustomStore;
    const activeDefaultStore = preserveSelections ? (defaultStoreNumber ?? apiDefaultStore) : apiDefaultStore;
    const activeAtHome = preserveSelections ? isAtHome : apiAtHome;

    storeBanner(activeBanner);
    storeCustomStore(activeCustomStore);
    storeDefaultStore(activeDefaultStore);
    storeAtHome(activeAtHome);
    storeUser(u);
    const { categories: cats, menuOptions: opts } = buildCategories(u, activeBanner, activeAtHome);
    // Restore previously selected category on session restore, fall back to first
    const restoredCat = (preserveSelections && selectedCategoryName
      ? cats.find(c => c.description === selectedCategoryName)
      : null) ?? cats[0] ?? null;
    setCategories(cats);
    setMenuOptions(opts);
    setFavorites(u.favorites);
    setSelectedCat(restoredCat);
    storeSelectedCategoryName(restoredCat?.description ?? null);
    setButtons(restoredCat ? filterButtons(restoredCat, activeAtHome) : []);
  }, [storeBanner, storeCustomStore, storeDefaultStore, storeAtHome, storeUser, storeSelectedCategoryName, banner, customStoreNumber, defaultStoreNumber, isAtHome, selectedCategoryName]);

  const setCategory = useCallback((name: string) => {
    const cat = categories.find(c => c.description === name) ?? null;
    setSelectedCat(cat);
    storeSelectedCategoryName(cat?.description ?? null);
    setButtons(cat ? filterButtons(cat, isAtHome) : []);
  }, [categories, isAtHome, storeSelectedCategoryName]);

  const setBanner = useCallback((b: string) => { storeBanner(b); }, [storeBanner]);
  const setAtHome = useCallback((v: boolean) => { storeAtHome(v); }, [storeAtHome]);
  const setCustomStoreNumber = useCallback((n: number | null) => { storeCustomStore(n); }, [storeCustomStore]);

  const refreshCategories = useCallback((bannerOverride?: string) => {
    if (!user) return;
    const activeBanner = bannerOverride ?? banner;
    const { categories: cats, menuOptions: opts } = buildCategories(user, activeBanner, isAtHome);
    // Keep current category if it still exists after refresh, otherwise fall back to first
    const current = selectedCategory?.description;
    const restored = (current ? cats.find(c => c.description === current) : null) ?? cats[0] ?? null;
    setCategories(cats);
    setMenuOptions(opts);
    setSelectedCat(restored);
    storeSelectedCategoryName(restored?.description ?? null);
    setButtons(restored ? filterButtons(restored, isAtHome) : []);
  }, [user, banner, isAtHome, selectedCategory, storeSelectedCategoryName]);

  const saveSettings = useCallback(async () => {
    if (!user) return;
    if (isBrowser) {
      localStorage.setItem('sconnect-settings', JSON.stringify({ atHome: isAtHome, banner, storeNumber: customStoreNumber ?? defaultStoreNumber }));
      return;
    }
    const storeNumber = customStoreNumber ?? defaultStoreNumber ?? 0;
    try {
      await proxyFetch(`${SCONNECT_ACTIVE_ENDPOINT}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ atHome: isAtHome, employeeId: user.employeeId, bannerDetail: banner, storeNumber }),
      });
    } catch (err) { console.error('Failed to save settings:', err); }
  }, [user, banner, customStoreNumber, defaultStoreNumber, isAtHome]);

  const addFavorite = useCallback(async (url: string, name: string) => {
    if (!user) return;
    if (isBrowser) {
      setFavorites(prev => [...prev, { id: Date.now(), url, name }]);
      return;
    }
    try { await proxyFetch(`${SCONNECT_ACTIVE_ENDPOINT}/favorites`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, userId: user.employeeId, url }) }); } catch {}
  }, [user]);

  const removeFavorite = useCallback(async (urlString: string) => {
    const fav = favorites.find(f => f.url.includes(urlString));
    if (!fav) return;
    if (isBrowser) {
      setFavorites(prev => prev.filter(f => f.id !== fav.id));
      return;
    }
    try { await proxyFetch(`${SCONNECT_ACTIVE_ENDPOINT}/favorites/${fav.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: fav.id }) }); } catch {}
  }, [favorites]);

  const isFavorite = useCallback((urlString: string) => {
    try { const u = new URL(urlString); return favorites.some(f => f.url.includes(u.hostname) && f.url.includes(u.pathname)); } catch { return false; }
  }, [favorites]);

  const resolveButtonUrl = useCallback((button: SConnectButton): string => {
    let url = button.url.replace(/sconnect-https/g, 'https');
    const store = customStoreNumber ?? defaultStoreNumber;
    if (store && url.includes('#storeNumber#')) url = url.replace(/#storeNumber#/g, String(store));
    return url;
  }, [customStoreNumber, defaultStoreNumber]);

  const needsAdminSetup = useCallback((): boolean => {
    if (!user) return false;
    const hasBanner = !!(banner ?? user.previousBannerDetail ?? user.bannerDetail);
    const hasStore = !!(user.storeNumber ?? user.previousStoreNumber ?? customStoreNumber ?? defaultStoreNumber) || isAtHome;
    return !(hasBanner && hasStore);
  }, [user, banner, customStoreNumber, defaultStoreNumber, isAtHome]);

  return {
    user, categories, buttons, selectedCategory, menuOptions, favorites,
    banner, customStoreNumber, defaultStoreNumber, isAtHome,
    isDallas, isDsc, storeDisplayText,
    initFromUser, setCategory, setBanner, setAtHome, setCustomStoreNumber,
    refreshCategories, saveSettings,
    addFavorite, removeFavorite, isFavorite, resolveButtonUrl, needsAdminSetup
  };
}
