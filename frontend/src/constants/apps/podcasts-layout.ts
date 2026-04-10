import type { LayoutListSection, MediaRailSection, MediaTab, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const PODCASTS_TABS: MediaTab[] = [
  { id: 'listen-now', label: 'Listen Now' },
  { id: 'browse', label: 'Browse' },
  { id: 'charts', label: 'Charts' },
  { id: 'library', label: 'Library' },
  { id: 'search', label: 'Search' }
];

export const PODCASTS_HERO = { title: 'The Daily', subtitle: 'The New York Times · Latest Episode' };

export const PODCASTS_FILTER_PILLS = ['All Shows', 'Saved', 'Downloaded', 'Stations', 'Categories'];

export const PODCASTS_MEDIA_SECTIONS: MediaRailSection[] = [
  {
    id: 'podcasts-up-next',
    title: 'Up Next',
    items: [
      { id: 'un-1', title: 'The Daily', subtitle: '32 min' },
      { id: 'un-2', title: 'Hardcore History', subtitle: '4 hr 12 min' },
      { id: 'un-3', title: 'Syntax', subtitle: '58 min' }
    ]
  },
  {
    id: 'podcasts-shows',
    title: 'Your Shows',
    items: [
      { id: 'ys-1', title: 'Hard Fork', subtitle: 'NYT · Tech' },
      { id: 'ys-2', title: 'The Vergecast', subtitle: 'The Verge' },
      { id: 'ys-3', title: 'Design Details', subtitle: 'Brian & Marshal' }
    ]
  }
];

export const PODCASTS_GALLERY_ITEMS = [
  { id: 'pg-1', title: 'The Daily', subtitle: 'The New York Times' },
  { id: 'pg-2', title: 'Hard Fork', subtitle: 'NYT · Tech' },
  { id: 'pg-3', title: 'Syntax', subtitle: 'Web Dev' },
  { id: 'pg-4', title: 'The Vergecast', subtitle: 'The Verge' },
  { id: 'pg-5', title: 'Hardcore History', subtitle: 'Dan Carlin' },
  { id: 'pg-6', title: 'Design Details', subtitle: 'Brian & Marshal' }
];

export const PODCASTS_BOTTOM_GALLERY_ITEMS = [
  { id: 'pb-1', title: 'Up Next', subtitle: '3 episodes' },
  { id: 'pb-2', title: 'New Episodes', subtitle: 'Updated today' },
  { id: 'pb-3', title: 'Top Charts', subtitle: 'All Genres' },
  { id: 'pb-4', title: 'Browse', subtitle: 'Categories' }
];

export const PODCASTS_LIBRARY_SECTIONS: LayoutListSection[] = [
  {
    id: 'library',
    rows: [
      { id: 'latest', title: 'Latest Episodes' },
      { id: 'shows', title: 'Shows' },
      { id: 'saved', title: 'Saved' },
      { id: 'downloaded', title: 'Downloaded' },
      { id: 'stations', title: 'Stations' }
    ]
  }
];

export const PODCASTS_TWO_COL_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search Library',
  sections: [
    {
      id: 'library-main',
      rows: [
        { id: 'listen-now', title: 'Listen Now' },
        { id: 'latest', title: 'Latest Episodes' },
        { id: 'shows', title: 'Shows' },
        { id: 'saved', title: 'Saved' },
        { id: 'downloaded', title: 'Downloaded' }
      ]
    }
  ]
};

export const PODCASTS_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  'listen-now': {
    title: 'Listen Now',
    subtitle: 'Picks for you',
    sections: [
      {
        id: 'up-next',
        header: 'Up Next',
        rows: [
          { id: 'ep-1', title: 'The Daily', subtitle: 'The New York Times · 32 min' },
          { id: 'ep-2', title: 'Hardcore History', subtitle: 'Dan Carlin · 4 hr 12 min' },
          { id: 'ep-3', title: 'Syntax', subtitle: 'Wes Bos & Scott Tolinski · 58 min' }
        ]
      }
    ]
  },
  latest: {
    title: 'Latest Episodes',
    subtitle: 'New from your shows',
    sections: [
      {
        id: 'latest-list',
        rows: [
          { id: 'le-1', title: 'What Happened This Week', subtitle: 'The Vergecast · 1 hr 5 min' },
          { id: 'le-2', title: 'AI and the Future of Work', subtitle: 'Hard Fork · 48 min' },
          { id: 'le-3', title: 'Designing for Delight', subtitle: 'Design Details · 42 min' }
        ]
      }
    ]
  },
  shows: {
    title: 'Shows',
    subtitle: '12 subscriptions',
    sections: [
      {
        id: 'shows-list',
        rows: [
          { id: 'sh-1', title: 'The Daily', subtitle: 'The New York Times' },
          { id: 'sh-2', title: 'Hardcore History', subtitle: 'Dan Carlin' },
          { id: 'sh-3', title: 'Hard Fork', subtitle: 'The New York Times' },
          { id: 'sh-4', title: 'Syntax', subtitle: 'Wes Bos & Scott Tolinski' },
          { id: 'sh-5', title: 'The Vergecast', subtitle: 'The Verge' }
        ]
      }
    ]
  },
  saved: {
    title: 'Saved',
    subtitle: '8 episodes',
    sections: [
      {
        id: 'saved-list',
        rows: [
          { id: 'sv-1', title: 'The Rise of AI Agents', subtitle: 'Hard Fork · 52 min' },
          { id: 'sv-2', title: 'Blueprint for Armageddon I', subtitle: 'Hardcore History · 3 hr 45 min' }
        ]
      }
    ]
  },
  downloaded: {
    title: 'Downloaded',
    subtitle: 'On This Device',
    sections: [
      {
        id: 'downloaded-list',
        rows: [
          { id: 'dl-1', title: 'The Daily - Friday', subtitle: '32 min' },
          { id: 'dl-2', title: 'Syntax #842', subtitle: '58 min' }
        ]
      }
    ]
  }
};
