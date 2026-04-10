// --- IOSAlert ---

export interface IOSAlertAction {
  label: string;
  style?: 'default' | 'cancel' | 'destructive';
  onClick: () => void;
}

export interface IOSAlertProps {
  open: boolean;
  title: string;
  message?: string;
  actions?: IOSAlertAction[];
  onClose: () => void;
}

// --- IOSNavigationBar ---

export interface IOSNavigationBarAction {
  icon: React.ReactNode;
  onTap: () => void;
  label?: string;
}

export interface IOSNavigationBarProps {
  title: string;
  isDark: boolean;
  navBg: string;
  onBack?: () => void;
  actions?: IOSNavigationBarAction[];
}

// --- IOSModalPresentation ---

export interface IOSModalPresentationProps {
  open: boolean;
  children: React.ReactNode;
}

// --- IOSTableView ---

export interface IOSTableRow {
  id: string;
  label: string;
  detail?: string;
  accessory?: 'disclosure' | 'checkmark' | 'none';
  selected?: boolean;
  onTap?: () => void;
  /** Custom content rendered instead of default label/detail */
  render?: React.ReactNode;
}

export interface IOSTableSection {
  id: string;
  header?: string;
  footer?: string;
  rows: IOSTableRow[];
}

export interface IOSTableViewProps {
  sections: IOSTableSection[];
  isDark: boolean;
}
