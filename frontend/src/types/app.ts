import type { GestureZone } from './gestures';
import type { OverlayType } from './overlays';

export type AppMode = 'picker' | 'simulator';

export type DeviceFamily = 'iphone' | 'ipad';

export type SimulatorTheme = 'light' | 'dark';

export type AppIcon = {
  id: string;
  label: string;
};

export type AppOpenOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HomeLayoutMetrics = {
  iconSize: number;
  dockSize: number;
  gridGap: number;
  dockGap: number;
  dockPadding: number;
};

export type DockItem = AppIcon;

export type HomeGridItem = {
  id: string;
  kind: 'app' | 'widget';
  label?: string;
  colStart: number;
  rowStart: number;
  colSpan?: number;
  rowSpan?: number;
};

export type HomePage = {
  id: string;
  items: HomeGridItem[];
};

export type ViewportState = {
  battery: string;
  currentPage: number;
  deviceFamily: DeviceFamily;
  isLandscape: boolean;
  theme: SimulatorTheme;
  dockItems: DockItem[];
  isLocked: boolean;
  openApp: string | null;
  openAppOrigin: AppOpenOrigin | null;
  pages: HomePage[];
  pageCount: number;
  showDebugZones: boolean;
  time: string;
  onCloseApp: () => void;
  onNextPage: () => void;
  onOpenApp: (appId: string, origin?: AppOpenOrigin) => void;
  onPreviousPage: () => void;
  onUnlock: () => void;
  onToggleLock: () => void;
};

export type AppLayoutState = {
  overlay: OverlayType;
  showDebugZones: boolean;
  zones: GestureZone[];
  viewport: ViewportState;
};

export type GridPlacement = {
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
};

export type UiStoreState = {
  deviceId: string | null;
  deviceFamily: DeviceFamily;
  isLandscape: boolean;
  theme: SimulatorTheme;
  time: string;
  battery: string;
  isLocked: boolean;
  openApp: string | null;
  openAppOrigin: AppOpenOrigin | null;
  openOverlay: OverlayType;
  showDebugZones: boolean;
  showStockApps: boolean;
  showCustomApps: boolean;
  currentPage: number;
  hasCompletedHello: boolean;
  isTransitioning: boolean;
  homeMetricsCache: Record<string, HomeLayoutMetrics>;
  setSimulatorState: (payload: { deviceId?: string | null; deviceFamily: DeviceFamily; isLandscape: boolean; theme: SimulatorTheme }) => void;
  setTransitioning: (val: boolean) => void;
  openAppById: (appId: string, origin?: AppOpenOrigin) => void;
  closeApp: () => void;
  setOpenOverlay: (overlay: OverlayType) => void;
  closeOverlay: () => void;
  toggleDebugZones: () => void;
  toggleStockApps: () => void;
  toggleCustomApps: () => void;
  nextPage: () => void;
  previousPage: () => void;
  setCurrentPage: (page: number) => void;
  unlock: () => void;
  toggleLock: () => void;
  completeHello: () => void;
  setHomeMetrics: (cacheKey: string, metrics: HomeLayoutMetrics) => void;
  safariUrl: string;
  safariFavorites: { url: string; title: string }[];
  safariRecents: { url: string; title: string }[];
  setSafariUrl: (url: string) => void;
  addSafariFavorite: (url: string, title: string) => void;
  removeSafariFavorite: (url: string) => void;
  addSafariRecent: (url: string, title: string) => void;
};
