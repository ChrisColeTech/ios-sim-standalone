import type { LayoutListSection, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const MAIL_ONE_COL_SECTIONS: LayoutListSection[] = [
  {
    id: 'inbox',
    rows: [
      { id: 'mail-1', title: 'Stella Lee', subtitle: 'Brunch reservations', meta: '8/30' },
      { id: 'mail-2', title: 'Marc Schonbrun', subtitle: "Lily's soccer match", meta: '8/24' },
      { id: 'mail-3', title: 'Dave Elving', subtitle: 'Pick up from airport?', meta: '8/20' },
      { id: 'mail-4', title: 'Roxanne Swasey', subtitle: 'Dinner tonight', meta: '8/20' },
      { id: 'mail-5', title: 'Ivy Truong', subtitle: 'Coming to the Bay Area!', meta: '8/12' }
    ]
  }
];

export const MAIL_TWO_COL_SIDEBAR: TwoColSidebarConfig = {
  title: 'Mailboxes',
  searchPlaceholder: 'Search',
  sections: [
    {
      id: 'smart-mailboxes',
      rows: [
        { id: 'inbox', title: 'Inbox', meta: '42' },
        { id: 'vip', title: 'VIP', meta: '3' },
        { id: 'flagged', title: 'Flagged', meta: '12' },
        { id: 'unread', title: 'Unread', meta: '11' }
      ]
    },
    {
      id: 'accounts',
      header: 'Accounts',
      rows: [
        { id: 'icloud', title: 'iCloud' },
        { id: 'work', title: 'Work' }
      ]
    }
  ]
};

export const MAIL_TWO_COL_DETAIL_BY_FOLDER: Record<string, TwoColDetailConfig> = {
  inbox: {
    toolbarActions: [{ id: 'edit', label: 'Edit' }, { id: 'compose', label: 'Compose' }],
    title: 'Inbox',
    subtitle: '42 messages',
    sections: [
      {
        id: 'today',
        rows: [
          { id: 'thread-1', title: 'Stella Lee', subtitle: 'Brunch reservations', meta: '8:23 AM' },
          { id: 'thread-2', title: 'Dave Elving', subtitle: 'Pick up from airport?', meta: 'Yesterday' },
          { id: 'thread-3', title: 'Roxanne Swasey', subtitle: 'Dinner tonight', meta: 'Yesterday' }
        ]
      }
    ]
  },
  vip: {
    toolbarActions: [{ id: 'edit', label: 'Edit' }, { id: 'compose', label: 'Compose' }],
    title: 'VIP',
    subtitle: '3 messages',
    sections: [{ id: 'vip-list', rows: [{ id: 'vip-1', title: 'Avery Chen', subtitle: 'Quarterly review' }] }]
  },
  flagged: {
    toolbarActions: [{ id: 'edit', label: 'Edit' }, { id: 'compose', label: 'Compose' }],
    title: 'Flagged',
    subtitle: '12 messages',
    sections: [{ id: 'flagged-list', rows: [{ id: 'flag-1', title: 'Travel Itinerary', subtitle: 'Important details' }] }]
  },
  unread: {
    toolbarActions: [{ id: 'edit', label: 'Edit' }, { id: 'compose', label: 'Compose' }],
    title: 'Unread',
    subtitle: '11 messages',
    sections: [{ id: 'unread-list', rows: [{ id: 'unread-1', title: 'Project Update', subtitle: 'Please review' }] }]
  },
  icloud: {
    toolbarActions: [{ id: 'edit', label: 'Edit' }, { id: 'compose', label: 'Compose' }],
    title: 'iCloud',
    subtitle: 'All iCloud Mail',
    sections: [{ id: 'icloud-list', rows: [{ id: 'icloud-1', title: 'Welcome', subtitle: 'Getting started' }] }]
  },
  work: {
    toolbarActions: [{ id: 'edit', label: 'Edit' }, { id: 'compose', label: 'Compose' }],
    title: 'Work',
    subtitle: 'Company mailbox',
    sections: [{ id: 'work-list', rows: [{ id: 'work-1', title: 'Sprint Planning', subtitle: 'Agenda attached' }] }]
  }
};
