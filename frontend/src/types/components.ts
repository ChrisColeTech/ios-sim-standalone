import type { AppOpenOrigin, DockItem, HomePage, ViewportState } from './app';
import type { GestureAction, GestureZone, GestureZoneId } from './gestures';
import type { OverlayType } from './overlays';

export type AppLayoutProps = {
  overlay: OverlayType;
  showDebugZones: boolean;
  zones: GestureZone[];
  viewport: ViewportState;
};

export interface AppModeRouterProps {
  mode: 'picker' | 'simulator' | 'loading';
};

export type OverlayHostProps = {
  overlay: OverlayType;
  isLocked: boolean;
  isFirstLaunch: boolean;
  theme: 'light' | 'dark';
  onCloseOverlay: () => void;
  onUnlock: () => void;
  onCompleteHello: () => void;
};

export type LockScreenOverlayProps = {
  isVisible: boolean;
  isFirstLaunch: boolean;
  theme: 'light' | 'dark';
  onDismiss: () => void;
};

export type DebugZonesOverlayProps = {
  deviceFamily: 'iphone' | 'ipad';
  isLandscape: boolean;
  zones: GestureZone[];
  hoveredZoneId: GestureZoneId | null;
  gestureStartZoneId: GestureZoneId | null;
  lastResolvedAction: GestureAction | null;
};

export type ViewportProps = ViewportState;

export type ViewportRouterProps = ViewportState;

export type WallpaperProps = {
  theme: 'light' | 'dark';
};

export type PageDotsProps = {
  currentPage: number;
  pageCount: number;
};

export type HomeScreenProps = {
  currentPage: number;
  dockItems: DockItem[];
  pageCount: number;
  pages: HomePage[];
  onNextPage: () => void;
  onOpenApp: (appId: string, origin?: AppOpenOrigin) => void;
  onPreviousPage: () => void;
  onToggleLock: () => void;
};

export type GridPageProps = {
  page: HomePage;
  currentPage: number;
  pageCount: number;
  isLandscape: boolean;
  pageTransitionDirection: -1 | 1;
  onOpenApp: (appId: string, origin?: AppOpenOrigin) => void;
  iconSize: number;
  gap: number;
};

export type HomePageProps = {
  currentPage: number;
  pageCount: number;
  page: HomePage;
  dockItems: DockItem[];
  deviceFamily: 'iphone' | 'ipad';
  isLandscape: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onOpenApp: (appId: string, origin?: AppOpenOrigin) => void;
};

export type HomeDockProps = {
  edge: 'bottom' | 'right';
  items: DockItem[];
  iconSize: number;
  dockSize: number;
  gap: number;
  padding: number;
  onOpenApp: (appId: string, origin?: AppOpenOrigin) => void;
};

export type AppRouterProps = {
  appId: string;
  deviceFamily: 'iphone' | 'ipad';
  isLandscape: boolean;
  theme: 'light' | 'dark';
  openOrigin: AppOpenOrigin | null;
  onClose: () => void;
};

export type AppPageCommonProps = {
  deviceFamily: 'iphone' | 'ipad';
  isLandscape: boolean;
  theme: 'light' | 'dark';
  onClose: () => void;
};

export type MailPageProps = AppPageCommonProps;

export type FilesPageProps = AppPageCommonProps;

export type SettingsPageProps = AppPageCommonProps;

export type NotesPageProps = AppPageCommonProps;

export type MessagesPageProps = AppPageCommonProps;

export type MusicPageProps = AppPageCommonProps;

export type PodcastsPageProps = AppPageCommonProps;
