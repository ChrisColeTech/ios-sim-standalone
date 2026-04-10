import type { MediaTab, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const TV_GALLERY_ITEMS = [
  { id: 'tg-1', title: 'Continue Watching', subtitle: '3 shows' },
  { id: 'tg-2', title: 'Apple TV+', subtitle: 'Originals' },
  { id: 'tg-3', title: 'Top Movies', subtitle: 'This Week' },
  { id: 'tg-4', title: 'New Releases', subtitle: 'Just Added' },
  { id: 'tg-5', title: 'Trending', subtitle: 'Popular Now' },
  { id: 'tg-6', title: 'For You', subtitle: 'Recommended' }
];

export const TV_BOTTOM_GALLERY_ITEMS = [
  { id: 'tb-1', title: 'Top Chart: TV', subtitle: 'Updated today' },
  { id: 'tb-2', title: 'Kids & Family', subtitle: 'Movies' },
  { id: 'tb-3', title: 'Coming Soon', subtitle: 'Pre-order' },
  { id: 'tb-4', title: 'Collections', subtitle: 'Curated' }
];

export const TV_TABS: MediaTab[] = [
  { id: 'home', label: 'Home' },
  { id: 'tv-plus', label: 'TV+' },
  { id: 'formula1', label: 'Formula 1' },
  { id: 'mls', label: 'MLS' },
  { id: 'store', label: 'Store' },
  { id: 'search', label: 'Search' }
];

export const TV_HERO = { title: 'One Battle After Another', subtitle: 'Movie · Thriller · Action' };

export const TV_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search',
  sections: [
    {
      id: 'nav',
      rows: [
        { id: 'home', title: 'Home' },
        { id: 'tv-plus', title: 'Apple TV+' },
        { id: 'store', title: 'Store' },
        { id: 'formula1', title: 'Formula 1' },
        { id: 'mls', title: 'MLS' }
      ]
    },
    {
      id: 'library',
      header: 'Library',
      rows: [
        { id: 'recently-added', title: 'Recently Added' },
        { id: 'downloaded', title: 'Downloaded' },
        { id: 'wishlist', title: 'Wishlist' }
      ]
    }
  ]
};

export const TV_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  home: {
    title: 'Home',
    subtitle: 'What to Watch',
    sections: [
      {
        id: 'home-featured',
        rows: [
          { id: 'wicked', title: 'Wicked', subtitle: 'Musical' },
          { id: 'minecraft', title: 'Minecraft', subtitle: 'Comedy' },
          { id: 'ballerina', title: 'Ballerina', subtitle: 'Action' }
        ]
      }
    ]
  },
  'tv-plus': {
    title: 'Apple TV+',
    subtitle: 'Original Stories',
    sections: [
      {
        id: 'tvplus-originals',
        rows: [
          { id: 'rick-morty', title: 'Rick & Morty', subtitle: 'Animation' },
          { id: 'gilded-age', title: 'The Gilded Age', subtitle: 'Drama' },
          { id: 'white-lotus', title: 'White Lotus', subtitle: 'Comedy' }
        ]
      }
    ]
  },
  store: {
    title: 'Store',
    subtitle: 'Buy or Rent',
    sections: [
      {
        id: 'store-top',
        rows: [
          { id: 'wicked', title: 'Wicked', subtitle: 'Musical' },
          { id: 'moana', title: 'Moana 2', subtitle: 'Animation' },
          { id: 'jurassic', title: 'Jurassic World', subtitle: 'Action' }
        ]
      }
    ]
  },
  formula1: {
    title: 'Formula 1',
    subtitle: '2026 Season',
    sections: [
      {
        id: 'f1-races',
        rows: [
          { id: 'f1-1', title: 'Australian GP', subtitle: 'Melbourne' },
          { id: 'f1-2', title: 'Bahrain GP', subtitle: 'Sakhir' },
          { id: 'f1-3', title: 'Saudi Arabian GP', subtitle: 'Jeddah' }
        ]
      }
    ]
  },
  mls: {
    title: 'MLS',
    subtitle: 'Season 2026',
    sections: [
      {
        id: 'mls-matches',
        rows: [
          { id: 'mls-1', title: 'Inter Miami vs LAFC', subtitle: 'Today · 7:30 PM' },
          { id: 'mls-2', title: 'Atlanta United vs NYCFC', subtitle: 'Tomorrow · 8 PM' },
          { id: 'mls-3', title: 'Seattle vs Portland', subtitle: 'Sat · 10 PM' }
        ]
      }
    ]
  },
  'recently-added': {
    toolbarActions: [{ id: 'sort', label: 'Sort' }],
    title: 'Recently Added',
    subtitle: '12 Items',
    sections: [
      {
        id: 'recent-list',
        rows: [
          { id: 'ra-1', title: 'Ballerina', subtitle: 'Action' },
          { id: 'ra-2', title: 'The Brave', subtitle: 'Drama' },
          { id: 'ra-3', title: 'Spider-Man', subtitle: 'Action' }
        ]
      }
    ]
  },
  downloaded: {
    title: 'Downloaded',
    subtitle: 'On This iPad',
    sections: [
      {
        id: 'downloaded-list',
        rows: [
          { id: 'dl-1', title: 'Rick & Morty S7', subtitle: 'Animation' },
          { id: 'dl-2', title: 'Baby Reindeer', subtitle: 'Drama' }
        ]
      }
    ]
  },
  wishlist: {
    title: 'Wishlist',
    subtitle: '5 Items',
    sections: [
      {
        id: 'wishlist-list',
        rows: [
          { id: 'wl-1', title: 'Condor', subtitle: 'Action' },
          { id: 'wl-2', title: 'The Gilded Age S3', subtitle: 'Drama' }
        ]
      }
    ]
  }
};

export const TV_RAILS = [
  {
    id: 'top-movies',
    title: 'Top Chart: Movies',
    items: [
      { id: 'wicked', title: 'Wicked', subtitle: 'Musical' },
      { id: 'minecraft', title: 'Minecraft', subtitle: 'Comedy' },
      { id: 'i-know', title: 'I Know What...', subtitle: 'Horror' },
      { id: 'jurassic', title: 'Jurassic World', subtitle: 'Action' },
      { id: 'moana', title: 'Moana 2', subtitle: 'Animation' }
    ]
  },
  {
    id: 'top-tv',
    title: 'Top Chart: TV',
    items: [
      { id: 'rick-morty', title: 'Rick & Morty', subtitle: 'Animation' },
      { id: 'gilded-age', title: 'The Gilded Age', subtitle: 'Drama' },
      { id: 'condor', title: 'Condor', subtitle: 'Action' },
      { id: 'baby-reindeer', title: 'Baby Reindeer', subtitle: 'Drama' },
      { id: 'white-lotus', title: 'White Lotus', subtitle: 'Comedy' }
    ]
  },
  {
    id: 'new-releases',
    title: 'New Movie Releases',
    items: [
      { id: 'ballerina', title: 'Ballerina', subtitle: 'Action' },
      { id: 'brave', title: 'The Brave', subtitle: 'Drama' },
      { id: 'spider', title: 'Spider-Man', subtitle: 'Action' }
    ]
  }
];
