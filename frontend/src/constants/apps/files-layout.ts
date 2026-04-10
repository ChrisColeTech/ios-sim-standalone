import type { LayoutListSection, MediaTab, OneColLayoutProps, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const FILES_TABS: MediaTab[] = [
  { id: 'recents', label: 'Recents' },
  { id: 'browse', label: 'Browse' },
  { id: 'search', label: 'Search' }
];

export type FilesDetailListItem = {
  id: string;
  kind: 'folder' | 'file';
  name: string;
  date: string;
  size: string;
};

export const FILES_ONE_COL_SECTIONS: LayoutListSection[] = [
  {
    id: 'browse-locations',
    header: 'Locations',
    rows: [
      { id: 'icloud-drive', title: 'iCloud Drive', meta: '128 GB' },
      { id: 'on-my-ipad', title: 'On My iPad', meta: '24 GB' },
      { id: 'recently-deleted', title: 'Recently Deleted', meta: '12' }
    ]
  },
  {
    id: 'browse-tags',
    header: 'Tags',
    rows: [
      { id: 'tag-work', title: 'Work' },
      { id: 'tag-personal', title: 'Personal' },
      { id: 'tag-urgent', title: 'Urgent' }
    ]
  }
];

export const FILES_ONE_COL_CONFIG: Omit<OneColLayoutProps, 'deviceFamily' | 'isLandscape' | 'theme' | 'onLeadingAction' | 'onToolbarAction' | 'onRowSelect'> = {
  toolbar: {
    title: 'Browse',
    leadingLabel: 'Back',
    actions: [{ id: 'select', label: 'Select' }]
  },
  searchPlaceholder: 'Search',
  sections: FILES_ONE_COL_SECTIONS
};

export const FILES_TWO_COL_SIDEBAR: TwoColSidebarConfig = {
  title: 'Browse',
  searchPlaceholder: 'Search',
  sections: [
    {
      id: 'files-locations',
      header: 'Locations',
      rows: [
        { id: 'icloud-drive', title: 'iCloud Drive', meta: '128 GB' },
        { id: 'on-my-ipad', title: 'On My iPad', meta: '24 GB' },
        { id: 'shared', title: 'Shared', meta: '16' },
        { id: 'recently-deleted', title: 'Recently Deleted', meta: '12' }
      ]
    },
    {
      id: 'files-tags',
      header: 'Tags',
      rows: [
        { id: 'tag-work', title: 'Work' },
        { id: 'tag-personal', title: 'Personal' },
        { id: 'tag-urgent', title: 'Urgent' }
      ]
    }
  ]
};

export const FILES_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  'icloud-drive': {
    toolbarActions: [{ id: 'select', label: 'Select' }],
    title: 'iCloud Drive',
    subtitle: '128 GB available',
    sections: [
      {
        id: 'icloud-drive-files',
        rows: [
          { id: 'project-plan', title: 'Project Plan.pdf', subtitle: '1.2 MB' },
          { id: 'travel-folder', title: 'Travel', subtitle: 'Folder' },
          { id: 'invoice', title: 'Invoice-0426.xlsx', subtitle: '84 KB' }
        ]
      }
    ]
  },
  'on-my-ipad': {
    toolbarActions: [{ id: 'select', label: 'Select' }],
    title: 'On My iPad',
    subtitle: '24 GB available',
    sections: [
      {
        id: 'on-my-ipad-files',
        rows: [
          { id: 'downloads-folder', title: 'Downloads', subtitle: 'Folder' },
          { id: 'scans-folder', title: 'Scans', subtitle: 'Folder' },
          { id: 'meeting-notes', title: 'Meeting Notes.txt', subtitle: '12 KB' }
        ]
      }
    ]
  },
  shared: {
    toolbarActions: [{ id: 'select', label: 'Select' }],
    title: 'Shared',
    subtitle: 'Shared with you',
    sections: [
      {
        id: 'shared-files',
        rows: [
          { id: 'shared-deck', title: 'Q2 Deck.key', subtitle: '3.8 MB' },
          { id: 'shared-assets', title: 'Brand Assets', subtitle: 'Folder' }
        ]
      }
    ]
  },
  'recently-deleted': {
    toolbarActions: [{ id: 'select', label: 'Select' }],
    title: 'Recently Deleted',
    subtitle: '12 items',
    sections: [
      {
        id: 'deleted-files',
        rows: [
          { id: 'old-report', title: 'Old Report.pages', subtitle: 'Recently deleted' },
          { id: 'draft-image', title: 'Draft Image.png', subtitle: 'Recently deleted' }
        ]
      }
    ]
  },
  'tag-work': {
    toolbarActions: [{ id: 'select', label: 'Select' }],
    title: 'Work',
    subtitle: 'Tagged items',
    sections: [
      {
        id: 'tag-work-files',
        rows: [
          { id: 'roadmap', title: 'Roadmap.pdf', subtitle: '2.3 MB' },
          { id: 'kickoff-notes', title: 'Kickoff Notes.md', subtitle: '18 KB' }
        ]
      }
    ]
  },
  'tag-personal': {
    toolbarActions: [{ id: 'select', label: 'Select' }],
    title: 'Personal',
    subtitle: 'Tagged items',
    sections: [
      {
        id: 'tag-personal-files',
        rows: [
          { id: 'recipes', title: 'Recipes', subtitle: 'Folder' },
          { id: 'weekend', title: 'Weekend Plan.txt', subtitle: '6 KB' }
        ]
      }
    ]
  },
  'tag-urgent': {
    toolbarActions: [{ id: 'select', label: 'Select' }],
    title: 'Urgent',
    subtitle: 'Tagged items',
    sections: [
      {
        id: 'tag-urgent-files',
        rows: [
          { id: 'contract', title: 'Contract-Review.docx', subtitle: '226 KB' },
          { id: 'today-tasks', title: 'Today Tasks', subtitle: 'Folder' }
        ]
      }
    ]
  }
};

