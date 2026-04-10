import type { LayoutListSection, OneColLayoutProps, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const SETTINGS_ONE_COL_SECTIONS: LayoutListSection[] = [
  {
    id: 'primary',
    rows: [
      { id: 'airplane', title: 'Airplane Mode', subtitle: 'Off' },
      { id: 'wifi', title: 'Wi-Fi', subtitle: 'Rico Home' },
      { id: 'bluetooth', title: 'Bluetooth', subtitle: 'On' },
      { id: 'vpn', title: 'VPN', subtitle: 'Off' }
    ]
  },
  {
    id: 'general-group',
    rows: [
      { id: 'general', title: 'General', subtitle: 'Software Update, Storage' },
      { id: 'accessibility', title: 'Accessibility', subtitle: 'Display, Motion, Audio' },
      { id: 'privacy', title: 'Privacy & Security', subtitle: 'Permissions and safety' }
    ]
  }
];

export const SETTINGS_ONE_COL_CONFIG: Omit<OneColLayoutProps, 'deviceFamily' | 'isLandscape' | 'theme' | 'onLeadingAction' | 'onToolbarAction' | 'onRowSelect'> = {
  toolbar: { title: 'Settings', leadingLabel: 'Back', actions: [{ id: 'edit', label: 'Edit' }] },
  searchPlaceholder: 'Search',
  sections: SETTINGS_ONE_COL_SECTIONS
};

export const SETTINGS_TWO_COL_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search',
  sections: [
    {
      id: 'left-primary',
      rows: [
        { id: 'general', title: 'General' },
        { id: 'accessibility', title: 'Accessibility' },
        { id: 'apple-intelligence', title: 'Apple Intelligence & Siri' },
        { id: 'control-center', title: 'Control Center' }
      ]
    },
    {
      id: 'left-connections',
      rows: [
        { id: 'airplane', title: 'Airplane Mode' },
        { id: 'wifi', title: 'Wi-Fi', meta: 'Rico Home' },
        { id: 'bluetooth', title: 'Bluetooth', meta: 'On' },
        { id: 'vpn', title: 'VPN' }
      ]
    }
  ]
};

export const SETTINGS_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  general: {
    title: 'General',
    subtitle: 'Manage device setup and preferences',
    sections: [
      {
        id: 'general-main',
        rows: [
          { id: 'about', title: 'About' },
          { id: 'software-update', title: 'Software Update' },
          { id: 'storage', title: 'iPad Storage' }
        ]
      }
    ]
  },
  accessibility: {
    title: 'Accessibility',
    subtitle: 'Vision, mobility, and hearing settings',
    sections: [{ id: 'accessibility-main', rows: [{ id: 'display', title: 'Display & Text Size' }, { id: 'motion', title: 'Motion' }] }]
  },
  'apple-intelligence': {
    title: 'Apple Intelligence & Siri',
    subtitle: 'Language models and assistant settings',
    sections: [{ id: 'ai-main', rows: [{ id: 'language', title: 'Language' }, { id: 'responses', title: 'Responses' }] }]
  },
  'control-center': {
    title: 'Control Center',
    subtitle: 'Customize quick controls',
    sections: [{ id: 'cc-main', rows: [{ id: 'included', title: 'Included Controls' }, { id: 'more', title: 'More Controls' }] }]
  }
};
