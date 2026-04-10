import type { LayoutListSection, MediaRailSection, MediaTab, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const MUSIC_TABS: MediaTab[] = [
  { id: 'listen-now', label: 'Listen Now' },
  { id: 'browse', label: 'Browse' },
  { id: 'radio', label: 'Radio' },
  { id: 'library', label: 'Library' },
  { id: 'search', label: 'Search' }
];

export const MUSIC_HERO = { title: 'Everything I Wanted', subtitle: 'Billie Eilish · New Album' };

export const MUSIC_MEDIA_SECTIONS: MediaRailSection[] = [
  {
    id: 'music-recently',
    title: 'Recently Played',
    items: [
      { id: 'rp-1', title: 'Chill Mix', subtitle: 'Updated today' },
      { id: 'rp-2', title: 'Favorites', subtitle: '42 songs' },
      { id: 'rp-3', title: 'Acoustic', subtitle: 'Apple Music' }
    ]
  },
  {
    id: 'music-for-you',
    title: 'Made For You',
    items: [
      { id: 'fy-1', title: 'New Music Mix', subtitle: 'Updated Friday' },
      { id: 'fy-2', title: 'Replay 2025', subtitle: 'Your year' },
      { id: 'fy-3', title: 'Morning Boost', subtitle: 'Playlist' }
    ]
  }
];

export const MUSIC_GALLERY_ITEMS = [
  { id: 'recent-1', title: 'Chill Mix', subtitle: 'Updated today' },
  { id: 'recent-2', title: 'Favorites', subtitle: '42 songs' },
  { id: 'recent-3', title: 'Acoustic', subtitle: 'Apple Music' },
  { id: 'recent-4', title: 'Focus', subtitle: 'For work' },
  { id: 'recent-5', title: 'Dance', subtitle: 'Playlist' },
  { id: 'recent-6', title: 'Classical', subtitle: 'Essentials' }
];

export const MUSIC_BOTTOM_GALLERY_ITEMS = [
  { id: 'bottom-1', title: 'Replay 2025', subtitle: 'For you' },
  { id: 'bottom-2', title: 'Morning Boost', subtitle: 'Playlist' },
  { id: 'bottom-3', title: 'Lo-Fi Beats', subtitle: 'Station' },
  { id: 'bottom-4', title: 'New Music Mix', subtitle: 'Updated Friday' }
];

export const MUSIC_LIBRARY_SECTIONS: LayoutListSection[] = [
  {
    id: 'library',
    rows: [
      { id: 'playlists', title: 'Playlists' },
      { id: 'artists', title: 'Artists' },
      { id: 'albums', title: 'Albums' },
      { id: 'songs', title: 'Songs' },
      { id: 'genres', title: 'Genres' },
      { id: 'downloaded', title: 'Downloaded' }
    ]
  }
];

export const MUSIC_TWO_COL_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search Library',
  sections: [
    {
      id: 'library-main',
      rows: [
        { id: 'home', title: 'Home' },
        { id: 'recently-added', title: 'Recently Added' },
        { id: 'artists', title: 'Artists' },
        { id: 'albums', title: 'Albums' },
        { id: 'songs', title: 'Songs' },
        { id: 'downloaded', title: 'Downloaded' }
      ]
    }
  ]
};

export const MUSIC_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  home: {
    toolbarActions: [{ id: 'edit', label: 'Edit' }],
    title: 'Home',
    subtitle: 'Recently Played',
    sections: [
      {
        id: 'home-picks',
        rows: [
          { id: 'mix-1', title: 'Daily Mix', subtitle: 'Pop' },
          { id: 'mix-2', title: 'Chill Mix', subtitle: 'Downtempo' },
          { id: 'mix-3', title: 'Replay 2025', subtitle: 'Most played' }
        ]
      }
    ]
  },
  'recently-added': {
    toolbarActions: [{ id: 'sort', label: 'Sort' }],
    title: 'Recently Added',
    subtitle: '48 Albums',
    sections: [
      {
        id: 'recent-grid',
        rows: [
          { id: 'ra-1', title: 'Everything I Wanted', subtitle: 'Billie Eilish' },
          { id: 'ra-2', title: 'Golden Hour', subtitle: 'Kacey Musgraves' },
          { id: 'ra-3', title: 'SOS', subtitle: 'SZA' }
        ]
      }
    ]
  },
  artists: {
    title: 'Artists',
    subtitle: 'A-Z',
    sections: [{ id: 'artists-list', rows: [{ id: 'ar-1', title: 'Billie Eilish' }, { id: 'ar-2', title: 'Fred again..' }, { id: 'ar-3', title: 'Lorde' }] }]
  },
  albums: {
    title: 'Albums',
    subtitle: 'Recently Added',
    sections: [{ id: 'albums-list', rows: [{ id: 'al-1', title: 'HIT ME HARD AND SOFT', subtitle: 'Billie Eilish' }, { id: 'al-2', title: 'Melodrama', subtitle: 'Lorde' }] }]
  },
  songs: {
    title: 'Songs',
    subtitle: 'All Songs',
    sections: [{ id: 'songs-list', rows: [{ id: 'so-1', title: 'Everything I Wanted', subtitle: 'Billie Eilish' }, { id: 'so-2', title: 'Liability', subtitle: 'Lorde' }] }]
  },
  downloaded: {
    title: 'Downloaded',
    subtitle: 'On This iPad',
    sections: [{ id: 'downloaded-list', rows: [{ id: 'dl-1', title: 'Focus Playlist' }, { id: 'dl-2', title: 'Roadtrip Mix' }] }]
  }
};
