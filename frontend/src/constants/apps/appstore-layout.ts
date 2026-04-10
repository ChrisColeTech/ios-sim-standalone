import type { MediaTab, MediaRailSection, TwoColSidebarConfig } from '../../types/layouts';

export const APPSTORE_TABS: MediaTab[] = [
  { id: 'today', label: 'Today' },
  { id: 'games', label: 'Games' },
  { id: 'apps', label: 'Apps' },
  { id: 'arcade', label: 'Arcade' },
  { id: 'search', label: 'Search' }
];

export const APPSTORE_HERO = {
  title: 'Happening Now',
  subtitle: 'The biggest apps and games this week'
};

export const APPSTORE_SIDEBAR: TwoColSidebarConfig = {
  sections: [
    {
      id: 'discover',
      header: 'Discover',
      rows: [
        { id: 'today', title: 'Today' },
        { id: 'games', title: 'Games' },
        { id: 'apps', title: 'Apps' },
        { id: 'arcade', title: 'Arcade' },
        { id: 'updates', title: 'Updates' }
      ]
    }
  ]
};

export const APPSTORE_MEDIA_SECTIONS: MediaRailSection[] = [
  {
    id: 'essential-games',
    title: 'Essential iPad Games',
    items: [
      { id: 'ag-1', title: 'Homescapes', subtitle: 'Match 3 Puzzle' },
      { id: 'ag-2', title: 'Candy Crush Saga', subtitle: 'Puzzle' },
      { id: 'ag-3', title: 'Candy Crush Soda', subtitle: 'Match 3' },
      { id: 'ag-4', title: 'Fishdom', subtitle: 'Match 3 & Fish' },
      { id: 'ag-5', title: 'Subway Surfers', subtitle: 'Endless Runner' }
    ]
  },
  {
    id: 'popular-apps',
    title: 'Popular iPad Apps',
    items: [
      { id: 'ap-1', title: 'ChatGPT', subtitle: 'By OpenAI' },
      { id: 'ap-2', title: 'Goodnotes', subtitle: 'Notes, Docs, PDF' },
      { id: 'ap-3', title: 'Twitch', subtitle: 'Live Streaming' },
      { id: 'ap-4', title: 'Discord', subtitle: 'Group Chat' },
      { id: 'ap-5', title: 'Notion', subtitle: 'Notes & Docs' }
    ]
  },
  {
    id: 'must-have',
    title: 'Must-Have Apps',
    items: [
      { id: 'mh-1', title: 'YouTube', subtitle: 'Videos & Streams' },
      { id: 'mh-2', title: 'TikTok', subtitle: 'Short Videos' },
      { id: 'mh-3', title: 'HBO Max', subtitle: 'Movies & TV' },
      { id: 'mh-4', title: 'Procreate', subtitle: 'Sketch & Paint' },
      { id: 'mh-5', title: 'Snapchat', subtitle: 'Share the Moment' }
    ]
  }
];

export const APPSTORE_IPHONE_SECTIONS = [
  {
    id: 'featured',
    rows: [
      { id: 'today', title: 'Today', subtitle: 'Featured stories and apps' },
      { id: 'games', title: 'Games', subtitle: 'Top games this week' },
      { id: 'apps', title: 'Apps', subtitle: 'Essential apps' },
      { id: 'arcade', title: 'Arcade', subtitle: 'Apple Arcade games' }
    ]
  }
];

export const APPSTORE_GALLERY_ITEMS = [
  { id: 'asg-1', title: 'Featured', subtitle: 'Today' },
  { id: 'asg-2', title: 'Top Charts', subtitle: 'Games' },
  { id: 'asg-3', title: 'Categories', subtitle: 'Browse' }
];

export const APPSTORE_BOTTOM_GALLERY_ITEMS = [
  { id: 'asb-1', title: 'New Apps', subtitle: 'This Week' },
  { id: 'asb-2', title: 'Top Free', subtitle: 'Apps' },
  { id: 'asb-3', title: 'Top Paid', subtitle: 'Apps' }
];
