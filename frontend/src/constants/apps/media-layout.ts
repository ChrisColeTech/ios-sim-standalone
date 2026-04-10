import type { LayoutListSection, MediaRailSection, MediaTab } from '../../types/layouts';

export const MEDIA_TABS: MediaTab[] = [
  { id: 'today', label: 'Today' },
  { id: 'discover', label: 'Discover' },
  { id: 'library', label: 'Library' }
];

export const TV_MEDIA_SECTIONS: MediaRailSection[] = [
  {
    id: 'tv-top-chart',
    title: 'Top Chart: Movies',
    items: [
      { id: 'wicked', title: 'Wicked', subtitle: 'Musical' },
      { id: 'minecraft', title: 'Minecraft', subtitle: 'Comedy' },
      { id: 'horror', title: 'I Know What...', subtitle: 'Horror' }
    ]
  },
  {
    id: 'tv-trending',
    title: 'Top Chart: TV',
    items: [
      { id: 'rick', title: 'Rick & Morty', subtitle: 'Animation' },
      { id: 'gilded', title: 'The Gilded Age', subtitle: 'Drama' },
      { id: 'lotus', title: 'White Lotus', subtitle: 'Comedy' }
    ]
  }
];

export const BOOKS_MEDIA_SECTIONS: MediaRailSection[] = [
  {
    id: 'books-new',
    title: 'New Audiobooks',
    items: [
      { id: 'atomic', title: 'Atomic Habits', subtitle: 'James Clear' },
      { id: 'deep-work', title: 'Deep Work', subtitle: 'Cal Newport' },
      { id: 'focus', title: 'The One Thing', subtitle: 'Gary Keller' }
    ]
  },
  {
    id: 'books-for-you',
    title: 'For You',
    items: [
      { id: 'fiction', title: 'The Thursday Murder Club', subtitle: 'Mystery' },
      { id: 'memoir', title: 'Educated', subtitle: 'Memoir' },
      { id: 'history', title: 'Sapiens', subtitle: 'History' }
    ]
  }
];

export const NEWS_MEDIA_SECTIONS: MediaRailSection[] = [
  {
    id: 'news-featured',
    title: 'Featured',
    items: [
      { id: 'people', title: 'People', subtitle: 'Follow' },
      { id: 'new-yorker', title: 'The New Yorker', subtitle: 'Following' },
      { id: 'time', title: 'TIME', subtitle: 'Follow' }
    ]
  },
  {
    id: 'news-catalog',
    title: 'Catalog',
    items: [
      { id: 'wsj', title: 'WSJ', subtitle: 'Following' },
      { id: 'prevention', title: 'Prevention', subtitle: 'Follow' },
      { id: 'food', title: 'Food & Wine', subtitle: 'Following' }
    ]
  }
];

export const TV_IPHONE_SECTIONS: LayoutListSection[] = [
  {
    id: 'tv-iphone',
    rows: [
      { id: 'tv-1', title: 'Continue Watching', subtitle: 'Top picks for you' },
      { id: 'tv-2', title: 'Top Chart: Movies', subtitle: 'Updated today' }
    ]
  }
];

export const BOOKS_IPHONE_SECTIONS: LayoutListSection[] = [
  {
    id: 'books-iphone',
    rows: [
      { id: 'book-1', title: 'Atomic Habits', subtitle: 'Continue Chapter 16' },
      { id: 'book-2', title: 'Recommended Audiobooks', subtitle: 'For your commute' }
    ]
  }
];

export const NEWS_IPHONE_SECTIONS: LayoutListSection[] = [
  {
    id: 'news-iphone',
    rows: [
      { id: 'news-1', title: 'Top Stories', subtitle: 'Morning briefing' },
      { id: 'news-2', title: 'News+ Discover', subtitle: 'Featured magazines' }
    ]
  }
];
