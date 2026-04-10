import type { ReactNode } from 'react';
import type {
  LayoutAction,
  LayoutColorOverrides,
  LayoutListRow,
  LayoutListSection,
  MediaRailSection,
  MediaTab,
  ThreeColDetailConfig,
  ThreeColMiddleConfig,
  ThreeColPrimaryConfig,
  TwoColDetailConfig,
  TwoColSidebarConfig
} from './layouts';

export type BottomBarProps = {
  onClose?: () => void;
};

export type PageIndicatorProps = {
  currentPage: number;
  pageCount: number;
  className?: string;
};

export type AppPageShellProps = {
  statusBarForceTextColor?: 'white' | 'black';
  backgroundClassName?: string;
  children: ReactNode;
};

export type TwoColToolbarButtonProps = {
  action: LayoutAction;
  theme: 'light' | 'dark';
  onAction?: (actionId: string) => void;
};

export type TwoColDetailProps = {
  theme: 'light' | 'dark';
  presentation?: 'card' | 'immersive';
  detail: TwoColDetailConfig;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  onToolbarAction?: (actionId: string) => void;
  onRowSelect?: (sectionId: string, rowId: string) => void;
};

export type TwoColSidebarProps = {
  theme: 'light' | 'dark';
  className?: string;
  sidebar: TwoColSidebarConfig;
  topContent?: ReactNode;
  colorOverrides?: LayoutColorOverrides;
  renderRow?: (row: LayoutListRow, sectionId: string, selected: boolean, onSelect: (rowId: string) => void) => ReactNode;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  selectedRowId: string | null;
  onSelect: (rowId: string) => void;
  onToggleCollapse: () => void;
};

export type TwoColSidebarRowProps = {
  row: LayoutListRow;
  theme: 'light' | 'dark';
  leading?: ReactNode;
  trailing?: ReactNode;
  selected: boolean;
  colorOverrides?: LayoutColorOverrides;
  onSelect: (rowId: string) => void;
};

export type TwoColDetailSectionProps = {
  theme: 'light' | 'dark';
  section: LayoutListSection;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  onRowSelect?: (sectionId: string, rowId: string) => void;
};

export type TwoColSidebarSectionProps = {
  section: LayoutListSection;
  theme: 'light' | 'dark';
  colorOverrides?: LayoutColorOverrides;
  renderRow?: (row: LayoutListRow, sectionId: string, selected: boolean, onSelect: (rowId: string) => void) => ReactNode;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  selectedRowId: string | null;
  onSelect: (rowId: string) => void;
};

export type ThreeColPrimarySidebarProps = {
  theme: 'light' | 'dark';
  primary: ThreeColPrimaryConfig;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  selectedRowId: string | null;
  onSelect: (rowId: string) => void;
  onToggleCollapse: () => void;
};

export type ThreeColMiddleColumnProps = {
  theme: 'light' | 'dark';
  middle: ThreeColMiddleConfig;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  selectedRowId: string | null;
  onSelect: (rowId: string) => void;
};

export type ThreeColDetailPaneProps = {
  theme: 'light' | 'dark';
  detail: ThreeColDetailConfig;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  onRowSelect?: (sectionId: string, rowId: string) => void;
};

export type ThreeColSectionListProps = {
  theme: 'light' | 'dark';
  sections: LayoutListSection[];
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  selectedRowId: string | null;
  onSelect: (rowId: string) => void;
};

export type OneColRowProps = {
  row: LayoutListRow;
  compact: boolean;
  theme: 'light' | 'dark';
  selected: boolean;
  isLast: boolean;
  colorOverrides?: LayoutColorOverrides;
  renderLeading?: ReactNode;
  renderTrailing?: ReactNode;
  onSelect?: (rowId: string) => void;
};

export type OneColToolbarProps = {
  toolbar: { title: string; leadingLabel?: string; actions?: LayoutAction[] };
  compact: boolean;
  theme: 'light' | 'dark';
  onLeadingAction?: () => void;
  onToolbarAction?: (actionId: string) => void;
};

export type OneColSearchProps = {
  placeholder: string;
  compact: boolean;
  theme: 'light' | 'dark';
};

export type SearchInputProps = {
  placeholder: string;
  theme: 'light' | 'dark';
  wrapperClassName?: string;
};

export type OneColSectionProps = {
  section: LayoutListSection;
  compact: boolean;
  theme: 'light' | 'dark';
  selectedRowId?: string | null;
  colorOverrides?: LayoutColorOverrides;
  renderRowLeading?: (row: LayoutListRow, sectionId: string) => ReactNode;
  renderRowTrailing?: (row: LayoutListRow, sectionId: string) => ReactNode;
  onRowSelect?: (sectionId: string, rowId: string) => void;
};

export type OneColMediaGalleryItem = {
  id: string;
  title: string;
  subtitle?: string;
};

export type OneColMediaGalleryProps = {
  theme: 'light' | 'dark';
  title: string;
  items: OneColMediaGalleryItem[];
  columns?: 2 | 3;
  compact?: boolean;
};

export type OneColPlaybackBarProps = {
  theme: 'light' | 'dark';
  title: string;
  artist: string;
};

export type MediaHeroProps = {
  theme: 'light' | 'dark';
  title: string;
  subtitle?: string;
};

export type MediaRailSectionViewProps = {
  theme: 'light' | 'dark';
  section: MediaRailSection;
};

export type MediaTopBarProps = {
  theme: 'light' | 'dark';
  title: string;
  tabs: MediaTab[];
  activeTabId: string;
  onTabSelect?: (tabId: string) => void;
};

export type ClockTopBarProps = {
  tabs: ReadonlyArray<{ id: string; label: string }>;
  activeTabId: string;
  onClose?: () => void;
};

export type ClockWorldMapPanelProps = {
  cities: ReadonlyArray<{ id: string; city: string; time: string; left: string; top: string }>;
};

export type ClockWorldCardRailProps = {
  cards: ReadonlyArray<{
    id: string;
    city: string;
    time: string;
    dayLabel: string;
    sunrise: string;
    sunset: string;
    hour: number;
    minute: number;
    darkFace: boolean;
  }>;
};

export type AnalogClockFaceProps = {
  hour: number;
  minute: number;
  darkFace: boolean;
};
