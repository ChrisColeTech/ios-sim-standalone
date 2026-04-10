import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SConnectStoreState } from '../types/sconnect-store';

const INITIAL: Pick<
  SConnectStoreState,
  'isAuthorized' | 'username' | 'loginDate' | 'user' | 'error' |
  'banner' | 'customStoreNumber' | 'defaultStoreNumber' | 'isAtHome' | 'selectedCategoryName' |
  'themeOverride' | 'currentScreen' | 'previousScreen' | 'contentScreen' | 'webViewUrl'
> = {
  isAuthorized: false,
  username: null,
  loginDate: null,
  user: null,
  error: null,
  banner: null,
  customStoreNumber: null,
  defaultStoreNumber: null,
  isAtHome: true,
  selectedCategoryName: null,
  themeOverride: 'system' as const,
  currentScreen: 'splash',
  previousScreen: null,
  contentScreen: 'grid',
  webViewUrl: null,
};

export const useSConnectStore = create<SConnectStoreState>()(
  persist(
    (set) => ({
      ...INITIAL,
      setAuth: (auth) => set(auth),
      setUser: (user) => set({ user }),
      setBanner: (banner) => set({ banner }),
      setCustomStoreNumber: (num) => set({ customStoreNumber: num }),
      setDefaultStoreNumber: (num) => set({ defaultStoreNumber: num }),
      setIsAtHome: (atHome) => set({ isAtHome: atHome }),
      setSelectedCategoryName: (name) => set({ selectedCategoryName: name }),
      setScreen: (screen, previous) =>
        set((s) => ({ currentScreen: screen, previousScreen: previous ?? s.currentScreen })),
      setContentScreen: (content) => set({ contentScreen: content }),
      setWebViewUrl: (url) => set({ webViewUrl: url }),
      setThemeOverride: (theme) => set({ themeOverride: theme }),
      setError: (error) => set({ error }),
      clearAll: () => set(INITIAL),
    }),
    {
      name: 'sconnect-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        themeOverride: state.themeOverride,
        isAuthorized: state.isAuthorized,
        username: state.username,
        loginDate: state.loginDate,
        user: state.user,
        banner: state.banner,
        customStoreNumber: state.customStoreNumber,
        defaultStoreNumber: state.defaultStoreNumber,
        isAtHome: state.isAtHome,
        selectedCategoryName: state.selectedCategoryName,
        currentScreen: state.currentScreen,
        contentScreen: state.contentScreen,
        webViewUrl: state.webViewUrl,
      }),
    },
  ),
);
