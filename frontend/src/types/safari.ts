export type SafariAddressBarProps = {
  isDark: boolean;
  url: string;
  onNavigate: (url: string) => void;
  onReload: () => void;
  onNewTab: () => void;
};

export type SafariBottomBarProps = {
  isDark: boolean;
  onBack: () => void;
  onForward: () => void;
  onNewTab: () => void;
};

export type SafariNewTabPageProps = {
  isDark: boolean;
  favorites: { url: string; title: string }[];
  recents: { url: string; title: string }[];
  onNavigate: (url: string) => void;
};
