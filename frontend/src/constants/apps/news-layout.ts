import type { MediaTab, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const NEWS_GALLERY_ITEMS = [
  { id: 'ng-1', title: 'Top Stories', subtitle: 'Breaking' },
  { id: 'ng-2', title: 'For You', subtitle: 'Personalized' },
  { id: 'ng-3', title: 'Politics', subtitle: 'Latest' },
  { id: 'ng-4', title: 'Business', subtitle: 'Markets' },
  { id: 'ng-5', title: 'Technology', subtitle: 'Innovation' },
  { id: 'ng-6', title: 'Sports', subtitle: 'Scores' }
];

export const NEWS_BOTTOM_GALLERY_ITEMS = [
  { id: 'nb-1', title: 'Magazines', subtitle: 'News+' },
  { id: 'nb-2', title: 'Saved Stories', subtitle: '12 articles' },
  { id: 'nb-3', title: 'History', subtitle: 'Recently read' },
  { id: 'nb-4', title: 'Following', subtitle: '8 topics' }
];

export const NEWS_HERO = { title: 'Top Stories', subtitle: 'Morning briefing · Updated now' };

export const NEWS_TABS: MediaTab[] = [
  { id: 'today', label: 'Today' },
  { id: 'news-plus', label: 'News+' },
  { id: 'sports', label: 'Sports' },
  { id: 'search', label: 'Search' }
];

export const NEWS_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search News',
  sections: [
    {
      id: 'nav',
      rows: [
        { id: 'today', title: 'Today' },
        { id: 'news-plus', title: 'News+' },
        { id: 'sports', title: 'Sports' }
      ]
    },
    {
      id: 'following',
      header: 'Following',
      rows: [
        { id: 'saved', title: 'Saved Stories' },
        { id: 'history', title: 'History' }
      ]
    }
  ]
};

export const NEWS_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  today: {
    title: 'Today',
    subtitle: 'Top Stories',
    sections: [
      {
        id: 'today-top',
        rows: [
          { id: 'ts-1', title: 'Breaking: Major Policy Shift', subtitle: 'The Wall Street Journal' },
          { id: 'ts-2', title: 'Tech Giants Report Earnings', subtitle: 'TIME' },
          { id: 'ts-3', title: 'Climate Summit Updates', subtitle: 'The New Yorker' }
        ]
      }
    ]
  },
  'news-plus': {
    title: 'News+',
    subtitle: 'Magazines & Newspapers',
    sections: [
      {
        id: 'newsplus-featured',
        rows: [
          { id: 'np-1', title: 'People', subtitle: 'This Week\'s Issue' },
          { id: 'np-2', title: 'The New Yorker', subtitle: 'Latest Issue' },
          { id: 'np-3', title: 'TIME', subtitle: 'Cover Story' }
        ]
      }
    ]
  },
  sports: {
    title: 'Sports',
    subtitle: 'Scores & Highlights',
    sections: [
      {
        id: 'sports-top',
        rows: [
          { id: 'sp-1', title: 'NBA Playoff Race Heats Up', subtitle: 'ESPN' },
          { id: 'sp-2', title: 'MLB Opening Day Preview', subtitle: 'Sports Illustrated' },
          { id: 'sp-3', title: 'Champions League Results', subtitle: 'The Athletic' }
        ]
      }
    ]
  },
  saved: {
    title: 'Saved Stories',
    subtitle: '8 Articles',
    sections: [
      {
        id: 'saved-list',
        rows: [
          { id: 'sv-1', title: 'The Future of AI', subtitle: 'TIME' },
          { id: 'sv-2', title: 'Travel Guide: Japan', subtitle: 'Travel + Leisure' }
        ]
      }
    ]
  },
  history: {
    title: 'History',
    subtitle: 'Recently Read',
    sections: [
      {
        id: 'history-list',
        rows: [
          { id: 'hi-1', title: 'Weekend Recipes', subtitle: 'FOOD & WINE' },
          { id: 'hi-2', title: 'Home Repair Tips', subtitle: 'Popular Mechanics' }
        ]
      }
    ]
  }
};

export const NEWS_FILTER_PILLS = ['Best of News+', 'My Magazines', 'Downloaded', 'Newspapers', 'Catalog'];

export const NEWS_MAGAZINES = [
  { id: 'people', title: 'People', status: 'follow' as const },
  { id: 'new-yorker', title: 'The New Yorker', status: 'following' as const },
  { id: 'time', title: 'TIME', status: 'follow' as const },
  { id: 'wsj', title: 'The Wall Street Journal', status: 'following' as const },
  { id: 'prevention', title: 'Prevention', status: 'follow' as const },
  { id: 'food-wine', title: 'FOOD & WINE', status: 'following' as const },
  { id: 'pop-mech', title: 'Popular Mechanics', status: 'follow' as const },
  { id: 'real-simple', title: 'Real Simple', status: 'follow' as const },
  { id: 'travel', title: 'Travel + Leisure', status: 'following' as const }
];
