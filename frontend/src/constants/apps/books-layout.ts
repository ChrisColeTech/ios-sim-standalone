import type { MediaTab, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const BOOKS_GALLERY_ITEMS = [
  { id: 'bg-1', title: 'Atomic Habits', subtitle: 'James Clear' },
  { id: 'bg-2', title: 'Deep Work', subtitle: 'Cal Newport' },
  { id: 'bg-3', title: 'The One Thing', subtitle: 'Gary Keller' },
  { id: 'bg-4', title: 'Educated', subtitle: 'Tara Westover' },
  { id: 'bg-5', title: 'Sapiens', subtitle: 'Yuval Harari' },
  { id: 'bg-6', title: 'Becoming', subtitle: 'Michelle Obama' }
];

export const BOOKS_BOTTOM_GALLERY_ITEMS = [
  { id: 'bb-1', title: 'Want to Read', subtitle: '5 books' },
  { id: 'bb-2', title: 'Finished', subtitle: '23 books' },
  { id: 'bb-3', title: 'Book Store', subtitle: 'Browse' },
  { id: 'bb-4', title: 'Audiobooks', subtitle: 'New releases' }
];

export const BOOKS_HERO = { title: 'Atomic Habits', subtitle: 'James Clear · Audiobook' };

export const BOOKS_FILTER_PILLS = ['New & Trending', 'Top Charts', 'Audiobooks', 'Collections', 'Kids'];

export const BOOKS_TABS: MediaTab[] = [
  { id: 'reading-now', label: 'Reading Now' },
  { id: 'library', label: 'Library' },
  { id: 'book-store', label: 'Book Store' },
  { id: 'audiobooks', label: 'Audiobooks' },
  { id: 'search', label: 'Search' }
];

export const BOOKS_NOW_PLAYING = {
  title: 'Atomic Habits',
  author: 'James Clear',
  subtitle: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
  chapter: 'Chapter 16',
  chapterTitle: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Br...',
  progress: 0.62
};

export const BOOKS_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search Books',
  sections: [
    {
      id: 'library',
      header: 'Library',
      rows: [
        { id: 'reading-now', title: 'Reading Now' },
        { id: 'audiobooks', title: 'Audiobooks' },
        { id: 'book-store', title: 'Book Store' },
        { id: 'want-to-read', title: 'Want to Read' },
        { id: 'finished', title: 'Finished' },
        { id: 'collections', title: 'Collections' }
      ]
    }
  ]
};

export const BOOKS_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  'reading-now': {
    title: 'Reading Now',
    subtitle: 'Continue Reading',
    sections: [
      {
        id: 'reading-now-list',
        rows: [
          { id: 'rn-1', title: 'Atomic Habits', subtitle: 'James Clear' },
          { id: 'rn-2', title: 'Project Hail Mary', subtitle: 'Andy Weir' },
          { id: 'rn-3', title: 'The Midnight Library', subtitle: 'Matt Haig' }
        ]
      }
    ]
  },
  audiobooks: {
    title: 'Audiobooks',
    subtitle: '6 Books',
    sections: [
      {
        id: 'audiobooks-list',
        rows: [
          { id: 'ab-1', title: 'Atomic Habits', subtitle: 'James Clear · 5h 35m' },
          { id: 'ab-2', title: 'Educated', subtitle: 'Tara Westover · 12h 10m' },
          { id: 'ab-3', title: 'Becoming', subtitle: 'Michelle Obama · 19h 3m' }
        ]
      }
    ]
  },
  'book-store': {
    title: 'Book Store',
    subtitle: 'Browse & Discover',
    sections: [
      {
        id: 'store-featured',
        rows: [
          { id: 'bs-1', title: 'Intermezzo', subtitle: 'Sally Rooney' },
          { id: 'bs-2', title: 'James', subtitle: 'Percival Everett' },
          { id: 'bs-3', title: 'The Women', subtitle: 'Kristin Hannah' }
        ]
      }
    ]
  },
  'want-to-read': {
    toolbarActions: [{ id: 'sort', label: 'Sort' }],
    title: 'Want to Read',
    subtitle: '14 Books',
    sections: [
      {
        id: 'want-to-read-list',
        rows: [
          { id: 'wr-1', title: 'Demon Copperhead', subtitle: 'Barbara Kingsolver' },
          { id: 'wr-2', title: 'Tomorrow, and Tomorrow, and Tomorrow', subtitle: 'Gabrielle Zevin' },
          { id: 'wr-3', title: 'Lessons in Chemistry', subtitle: 'Bonnie Garmus' }
        ]
      }
    ]
  },
  finished: {
    title: 'Finished',
    subtitle: '23 Books',
    sections: [
      {
        id: 'finished-list',
        rows: [
          { id: 'fi-1', title: 'Sapiens', subtitle: 'Yuval Noah Harari' },
          { id: 'fi-2', title: 'Dune', subtitle: 'Frank Herbert' }
        ]
      }
    ]
  },
  collections: {
    title: 'Collections',
    subtitle: '4 Collections',
    sections: [
      {
        id: 'collections-list',
        rows: [
          { id: 'co-1', title: 'Science Fiction' },
          { id: 'co-2', title: 'Self-Improvement' },
          { id: 'co-3', title: 'Biography' },
          { id: 'co-4', title: 'Fiction' }
        ]
      }
    ]
  }
};
