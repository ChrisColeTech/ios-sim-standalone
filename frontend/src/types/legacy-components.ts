export type SingleColumnLayoutProps = {
  toolbar: SingleColumnToolbarConfig;
  searchPlaceholder?: string;
  sections: SingleColumnSectionConfig[];
  onClose: () => void;
};

export type SingleColumnToolbarProps = SingleColumnToolbarConfig & {
  onClose: () => void;
};

export type SingleColumnSearchProps = {
  placeholder: string;
};

export type SingleColumnSectionProps = {
  header?: string;
  children: React.ReactNode;
};

export type SingleColumnRowProps = SingleColumnRowConfig;

export type SingleColumnToolbarConfig = {
  backLabel?: string;
  title: string;
  actions?: SingleColumnToolbarAction[];
};

export type SingleColumnToolbarAction = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export type SingleColumnSectionConfig = {
  id: string;
  header?: string;
  rows: SingleColumnRowConfig[];
};

export type SingleColumnRowConfig = {
  id: string;
  label: string;
  sublabel?: string;
  detail?: string;
  timestamp?: string;
  unread?: boolean;
  avatar?: string;
  avatarInitials?: string;
  avatarColor?: string;
};

export type TwoColumnLayoutProps = {
  sidebar: TwoColumnSidebarConfig;
  detail: TwoColumnDetailConfig;
  onClose: () => void;
};

export type TwoColumnSidebarProps = TwoColumnSidebarConfig & {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export type TwoColumnSidebarConfig = {
  searchPlaceholder?: string;
  profileCard?: { name: string; sublabel: string; avatarInitials: string };
  sections: TwoColumnSidebarSectionConfig[];
};

export type TwoColumnSidebarSectionConfig = {
  id: string;
  header?: string;
  rows: TwoColumnSidebarRowConfig[];
};

export type TwoColumnSidebarRowConfig = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  iconColor?: string;
  accessory?: React.ReactNode;
  value?: string;
};

export type TwoColumnSidebarRowProps = TwoColumnSidebarRowConfig & {
  selected: boolean;
  onSelect: () => void;
};

export type TwoColumnSidebarSectionProps = {
  header?: string;
  children: React.ReactNode;
};

export type TwoColumnDetailProps = TwoColumnDetailConfig & {
  onClose: () => void;
};

export type TwoColumnDetailConfig = {
  header?: TwoColumnDetailHeaderConfig;
  sections: TwoColumnDetailSectionConfig[];
};

export type TwoColumnDetailHeaderConfig = {
  icon?: React.ReactNode;
  iconColor?: string;
  title: string;
  description?: string;
};

export type TwoColumnDetailHeaderProps = TwoColumnDetailHeaderConfig & {
  onClose: () => void;
};

export type TwoColumnDetailSectionConfig = {
  id: string;
  header?: string;
  rows: TwoColumnDetailRowConfig[];
};

export type TwoColumnDetailRowConfig = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  iconColor?: string;
  accessory?: React.ReactNode;
};
