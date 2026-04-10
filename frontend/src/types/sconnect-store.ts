import type {
  SConnectUserResponse,
  SConnectContentScreen,
  SConnectScreen,
  SConnectTheme,
} from './custom-apps/sconnect-home';

export type SConnectStoreState = {
  // Auth
  isAuthorized: boolean;
  username: string | null;
  loginDate: number | null;
  user: SConnectUserResponse | null;
  error: string | null;

  // Data
  banner: string | null;
  customStoreNumber: number | null;
  defaultStoreNumber: number | null;
  isAtHome: boolean;
  selectedCategoryName: string | null;

  // Theme override
  themeOverride: SConnectTheme;

  // Navigation
  currentScreen: SConnectScreen;
  previousScreen: SConnectScreen | null;
  contentScreen: SConnectContentScreen;
  webViewUrl: string | null;

  // Actions
  setAuth: (auth: {
    isAuthorized: boolean;
    username: string | null;
    loginDate: number | null;
    user: SConnectUserResponse | null;
    error: string | null;
  }) => void;
  setUser: (user: SConnectUserResponse | null) => void;
  setBanner: (banner: string | null) => void;
  setCustomStoreNumber: (num: number | null) => void;
  setDefaultStoreNumber: (num: number | null) => void;
  setIsAtHome: (atHome: boolean) => void;
  setSelectedCategoryName: (name: string | null) => void;
  setScreen: (screen: SConnectScreen, previous?: SConnectScreen | null) => void;
  setContentScreen: (content: SConnectContentScreen) => void;
  setWebViewUrl: (url: string | null) => void;
  setThemeOverride: (theme: SConnectTheme) => void;
  setError: (error: string | null) => void;
  clearAll: () => void;
};
