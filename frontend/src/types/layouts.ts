import type { ReactNode } from 'react';
import type { MapSceneConfig } from './layout-data';

/** Optional color overrides for custom-branded apps (e.g. SigCT Banner) */
export type LayoutColorOverrides = {
  /** Page/section background */
  sectionBg?: string;
  /** Section header background (null = transparent like stock iOS) */
  sectionHeaderBg?: string;
  /** Section header text color */
  sectionHeaderText?: string;
  /** Row title text color */
  rowText?: string;
  /** Row border color */
  rowBorder?: string;
};

export type LayoutAction = {
  id: string;
  label: string;
  icon?: ReactNode;
};

export type LayoutListRow = {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export type LayoutListSection = {
  id: string;
  header?: string;
  rows: LayoutListRow[];
};

export type OneColToolbarConfig = {
  title: string;
  leadingLabel?: string;
  actions?: LayoutAction[];
};

export type OneColLayoutProps = {
  deviceFamily: 'iphone' | 'ipad';
  isLandscape: boolean;
  theme: 'light' | 'dark';
  variant?: 'standard' | 'media';
  toolbar: OneColToolbarConfig;
  searchPlaceholder?: string;
  topContent?: ReactNode;
  topContentPlacement?: 'scroll' | 'fixed';
  bottomContent?: ReactNode;
  sections: LayoutListSection[];
  footer?: ReactNode;
  floatingBar?: ReactNode;
  selectedRowId?: string | null;
  colorOverrides?: LayoutColorOverrides;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  onLeadingAction?: () => void;
  onToolbarAction?: (actionId: string) => void;
  onRowSelect?: (sectionId: string, rowId: string) => void;
};

export type TwoColSidebarConfig = {
  title?: string;
  searchPlaceholder?: string;
  sections: LayoutListSection[];
};

export type TwoColDetailConfig = {
  toolbarActions?: LayoutAction[];
  headerLeading?: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: LayoutAction[];
  topContent?: ReactNode;
  sections?: LayoutListSection[];
  content?: ReactNode;
};

export type TwoColLayoutProps = {
  theme: 'light' | 'dark';
  presentation?: 'card' | 'immersive';
  backgroundClassName?: string;
  sidebarClassName?: string;
  toolbarClassName?: string;
  colorOverrides?: LayoutColorOverrides;
  sidebar: TwoColSidebarConfig;
  detail: TwoColDetailConfig;
  toolbarLeading?: ReactNode;
  toolbarTitle?: string;
  toolbarSubtitle?: string;
  toolbarContent?: ReactNode;
  floatingBar?: ReactNode;
  sidebarTopContent?: ReactNode;
  renderSidebarRow?: (row: LayoutListRow, sectionId: string, selected: boolean, onSelect: (rowId: string) => void) => ReactNode;
  renderSidebarRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderSidebarRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderDetailRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderDetailRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  selectedSidebarRowId: string | null;
  onSidebarSelect: (rowId: string) => void;
  onToolbarAction?: (actionId: string) => void;
  onDetailRowSelect?: (sectionId: string, rowId: string) => void;
};

export type ThreeColPrimaryConfig = {
  title?: string;
  sections: LayoutListSection[];
};

export type ThreeColMiddleConfig = {
  title?: string;
  searchPlaceholder?: string;
  sections: LayoutListSection[];
};

export type ThreeColDetailConfig = {
  title?: string;
  subtitle?: string;
  actions?: LayoutAction[];
  sections?: LayoutListSection[];
  content?: ReactNode;
  footer?: ReactNode;
};

export type ThreeColLayoutProps = {
  theme: 'light' | 'dark';
  primary: ThreeColPrimaryConfig;
  middle: ThreeColMiddleConfig;
  detail: ThreeColDetailConfig;
  toolbarTitle?: string;
  toolbarSubtitle?: string;
  toolbarContent?: ReactNode;
  floatingBar?: ReactNode;
  renderPrimaryRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderPrimaryRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderMiddleRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderMiddleRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderDetailRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderDetailRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  selectedPrimaryRowId: string | null;
  selectedMiddleRowId: string | null;
  onPrimarySelect: (rowId: string) => void;
  onMiddleSelect: (rowId: string) => void;
  onDetailAction?: (actionId: string) => void;
  onDetailRowSelect?: (sectionId: string, rowId: string) => void;
};

export type MediaTab = {
  id: string;
  label: string;
};

export type MediaCardItem = {
  id: string;
  title: string;
  subtitle?: string;
};

export type MediaRailSection = {
  id: string;
  title: string;
  items: MediaCardItem[];
};

export type MediaSurfaceLayoutProps = {
  theme: 'light' | 'dark';
  title: string;
  tabs: MediaTab[];
  activeTabId: string;
  headerTitle?: string;
  filterPills?: string[];
  heroTitle: string;
  heroSubtitle?: string;
  sections: MediaRailSection[];
  onTabSelect?: (tabId: string) => void;
};

export type EditingToolItem = {
  id: string;
  label: string;
};

export type EditingWorkspaceLayoutProps = {
  theme: 'light' | 'dark';
  documentTitle: string;
  sidebarItems: string[];
  tools: EditingToolItem[];
  floatingPanelTitle?: string;
};

export type MapCanvasLayoutProps = {
  theme: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  showInfoCard?: boolean;
  scene: MapSceneConfig;
};

export type CalculatorButton = {
  id: string;
  label: string;
  variant?: 'digit' | 'operator' | 'function';
};

export type CalculatorLayoutProps = {
  theme: 'light' | 'dark';
  value: string;
  buttons: CalculatorButton[];
  mode: 'basic' | 'scientific';
};

export type CalendarPlannerLayoutProps = {
  theme: 'light' | 'dark';
  monthLabel: string;
  days: string[];
  hours: string[];
};

export type CameraCaptureLayoutProps = {
  theme: 'light' | 'dark';
  modeLabel: string;
};
