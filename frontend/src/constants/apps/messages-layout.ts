import type { LayoutAction, LayoutListSection, ThreeColPrimaryConfig } from '../../types/layouts';

export const MESSAGES_ONE_COL_SECTIONS: LayoutListSection[] = [
  {
    id: 'messages-recent',
    rows: [
      { id: 'thread-family', title: 'Family Group', subtitle: 'Dinner at 7 works for us.', meta: '8:42 PM' },
      { id: 'thread-jordan', title: 'Jordan Kim', subtitle: 'Can you review this mock?', meta: '6:18 PM' },
      { id: 'thread-avery', title: 'Avery Chen', subtitle: 'On my way now.', meta: '5:01 PM' },
      { id: 'thread-cafe', title: 'Cafe Team', subtitle: 'Schedule updated for tomorrow.', meta: 'Yesterday' }
    ]
  }
];

export const MESSAGES_THREE_COL_PRIMARY: ThreeColPrimaryConfig = {
  title: 'Messages',
  sections: [
    {
      id: 'message-categories',
      rows: [
        { id: 'all-messages', title: 'All Messages', meta: '24' },
        { id: 'known-senders', title: 'Known Senders', meta: '17' },
        { id: 'unknown-senders', title: 'Unknown Senders', meta: '4' },
        { id: 'unread', title: 'Unread', meta: '3' }
      ]
    }
  ]
};

export const MESSAGES_CATEGORY_LABEL_BY_ID: Record<string, string> = {
  'all-messages': 'All Messages',
  'known-senders': 'Known Senders',
  'unknown-senders': 'Unknown Senders',
  unread: 'Unread'
};

export const MESSAGES_THREADS_BY_CATEGORY: Record<string, LayoutListSection[]> = {
  'all-messages': [
    {
      id: 'all-threads',
      rows: [
        { id: 'thread-family', title: 'Family Group', subtitle: 'Dinner at 7 works for us.', meta: '8:42 PM' },
        { id: 'thread-jordan', title: 'Jordan Kim', subtitle: 'Can you review this mock?', meta: '6:18 PM' },
        { id: 'thread-avery', title: 'Avery Chen', subtitle: 'On my way now.', meta: '5:01 PM' },
        { id: 'thread-cafe', title: 'Cafe Team', subtitle: 'Schedule updated for tomorrow.', meta: 'Yesterday' }
      ]
    }
  ],
  'known-senders': [
    {
      id: 'known-threads',
      rows: [
        { id: 'thread-family', title: 'Family Group', subtitle: 'Dinner at 7 works for us.', meta: '8:42 PM' },
        { id: 'thread-jordan', title: 'Jordan Kim', subtitle: 'Can you review this mock?', meta: '6:18 PM' },
        { id: 'thread-avery', title: 'Avery Chen', subtitle: 'On my way now.', meta: '5:01 PM' }
      ]
    }
  ],
  'unknown-senders': [
    {
      id: 'unknown-threads',
      rows: [
        { id: 'thread-delivery', title: 'Delivery Alerts', subtitle: 'Package arriving by 4 PM.', meta: '2:10 PM' },
        { id: 'thread-news', title: 'News Digest', subtitle: 'Top stories for today.', meta: '11:20 AM' }
      ]
    }
  ],
  unread: [
    {
      id: 'unread-threads',
      rows: [
        { id: 'thread-jordan', title: 'Jordan Kim', subtitle: 'Can you review this mock?', meta: '6:18 PM' },
        { id: 'thread-delivery', title: 'Delivery Alerts', subtitle: 'Package arriving by 4 PM.', meta: '2:10 PM' }
      ]
    }
  ]
};

export const MESSAGES_DETAIL_ACTIONS: LayoutAction[] = [
  { id: 'new-message', label: 'New' },
  { id: 'details', label: 'Details' }
];

export const MESSAGES_THREAD_DETAIL_BY_ID: Record<string, { title: string; subtitle: string; body: string }> = {
  'thread-family': {
    title: 'Family Group',
    subtitle: 'Today, 8:42 PM',
    body: 'Mom: Dinner at 7 works for us.\n\nYou: Great, I will pick up dessert on the way.'
  },
  'thread-jordan': {
    title: 'Jordan Kim',
    subtitle: 'Today, 6:18 PM',
    body: 'Jordan: Can you review this mock?\n\nYou: Yes, I will send notes in about 20 minutes.'
  },
  'thread-avery': {
    title: 'Avery Chen',
    subtitle: 'Today, 5:01 PM',
    body: 'Avery: On my way now.\n\nYou: Perfect, see you soon.'
  },
  'thread-cafe': {
    title: 'Cafe Team',
    subtitle: 'Yesterday',
    body: 'Cafe Team: Schedule updated for tomorrow.\n\nYou: Thanks, got it.'
  },
  'thread-delivery': {
    title: 'Delivery Alerts',
    subtitle: 'Today, 2:10 PM',
    body: 'Your package is out for delivery and should arrive by 4 PM.'
  },
  'thread-news': {
    title: 'News Digest',
    subtitle: 'Today, 11:20 AM',
    body: 'Top stories for today are now available in your daily digest.'
  }
};
