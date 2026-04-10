import type { LayoutListSection, OneColLayoutProps, ThreeColDetailConfig, ThreeColMiddleConfig, ThreeColPrimaryConfig } from '../../types/layouts';

export const NOTES_ONE_COL_SECTIONS: LayoutListSection[] = [
  {
    id: 'notes-today',
    header: 'Today',
    rows: [
      { id: 'note-1', title: 'New Note', subtitle: 'Handwritten note', meta: '3:15 PM' },
      { id: 'note-2', title: 'Places to Visit', subtitle: 'London', meta: '2:26 PM' },
      { id: 'note-3', title: 'Things to do in Paris', subtitle: 'Checklist', meta: '1:52 PM' }
    ]
  },
  {
    id: 'notes-august',
    header: 'August',
    rows: [
      { id: 'note-4', title: 'Downtime', subtitle: 'Who video', meta: '8/24' },
      { id: 'note-5', title: 'ChatGPT API keys', subtitle: 'Credentials', meta: '8/20' }
    ]
  }
];

export const NOTES_ONE_COL_CONFIG: Omit<OneColLayoutProps, 'deviceFamily' | 'isLandscape' | 'theme' | 'onLeadingAction' | 'onToolbarAction' | 'onRowSelect'> = {
  toolbar: { title: 'Notes', leadingLabel: 'Back', actions: [{ id: 'new-note', label: 'New' }] },
  searchPlaceholder: 'Search',
  sections: NOTES_ONE_COL_SECTIONS
};

export const NOTES_THREE_COL_PRIMARY: ThreeColPrimaryConfig = {
  title: 'Notes',
  sections: [
    {
      id: 'primary-folders',
      rows: [
        { id: 'p-quick', title: 'Quick Notes', meta: '2' },
        { id: 'p-shared', title: 'Shared', meta: '4' },
        { id: 'p-notes', title: 'Notes', meta: '57' },
        { id: 'p-ideas', title: 'Ideas', meta: '5' }
      ]
    }
  ]
};

export const NOTES_THREE_COL_MIDDLE: ThreeColMiddleConfig = {
  searchPlaceholder: 'Search',
  sections: [
    {
      id: 'middle-today',
      header: 'Today',
      rows: [
        { id: 'm-1', title: 'New Note', subtitle: 'Handwritten note', meta: '3:15 PM' },
        { id: 'm-2', title: 'Places to Visit or Revisit', subtitle: 'London', meta: '2:26 PM' },
        { id: 'm-3', title: 'Things to do in and around...', subtitle: 'Kensington Palace', meta: '1:52 PM' }
      ]
    },
    {
      id: 'middle-august',
      header: 'August',
      rows: [
        { id: 'm-4', title: 'Downtime', subtitle: 'Who video', meta: '8/24' },
        { id: 'm-5', title: 'ChatGPT API keys', subtitle: 'Reference', meta: '8/19' }
      ]
    }
  ]
};

export const NOTES_THREE_COL_DETAIL: ThreeColDetailConfig = {
  title: 'New Note',
  subtitle: '3:15 PM   Handwritten note',
  actions: [
    { id: 'format', label: 'Aa' },
    { id: 'checklist', label: 'List' },
    { id: 'table', label: 'Table' }
  ],
  sections: [
    {
      id: 'detail-lines',
      rows: [
        { id: 'line-1', title: 'LIVE LONG' },
        { id: 'line-2', title: 'AND PROSPER' }
      ]
    }
  ]
};

export const NOTES_THREE_COL_DETAIL_BY_NOTE: Record<string, ThreeColDetailConfig> = {
  'm-1': {
    title: 'New Note',
    subtitle: '3:15 PM   Handwritten note',
    actions: [
      { id: 'format', label: 'Aa' },
      { id: 'checklist', label: 'List' },
      { id: 'table', label: 'Table' }
    ],
    sections: [
      {
        id: 'detail-lines-1',
        rows: [
          { id: 'line-1', title: 'LIVE LONG' },
          { id: 'line-2', title: 'AND PROSPER' }
        ]
      }
    ]
  },
  'm-2': {
    title: 'Places to Visit or Revisit',
    subtitle: '2:26 PM   London',
    actions: [
      { id: 'format', label: 'Aa' },
      { id: 'checklist', label: 'List' },
      { id: 'table', label: 'Table' }
    ],
    sections: [
      {
        id: 'detail-lines-2',
        rows: [
          { id: 'line-1', title: 'Kensington Palace' },
          { id: 'line-2', title: 'British Museum' },
          { id: 'line-3', title: 'Tower Bridge walk' }
        ]
      }
    ]
  },
  'm-3': {
    title: 'Things to do in and around...',
    subtitle: '1:52 PM   Kensington Palace',
    actions: [
      { id: 'format', label: 'Aa' },
      { id: 'checklist', label: 'List' },
      { id: 'table', label: 'Table' }
    ],
    sections: [
      {
        id: 'detail-lines-3',
        rows: [
          { id: 'line-1', title: 'Arrive by 10am' },
          { id: 'line-2', title: 'State Rooms tour' },
          { id: 'line-3', title: 'Gardens and tea after' }
        ]
      }
    ]
  }
};

export const NOTES_BODY_BY_ID: Record<string, string> = {
  'm-1': 'LIVE LONG\n\nAND PROSPER',
  'm-2': 'Kensington Palace\nBritish Museum\nTower Bridge walk',
  'm-3': 'Arrive by 10am\nState Rooms tour\nGardens and tea after'
};
