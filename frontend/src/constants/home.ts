import type { DockItem, HomePage } from '../types/app';

export const CUSTOM_APP_IDS = new Set(['sconnect-home', 'sigct-banner', 'sigct2']);
import type { CalendarWidgetProps, WeatherWidgetProps } from '../types/widgets';

export const HOME_PAGE: HomePage = {
  id: 'home-1',
  items: [
    { id: 'weather-widget', kind: 'widget', label: 'Weather', colStart: 1, rowStart: 1, colSpan: 2, rowSpan: 2 },
    { id: 'calendar-widget', kind: 'widget', label: 'Calendar', colStart: 3, rowStart: 1, colSpan: 2, rowSpan: 2 },
    { id: 'mail', kind: 'app', label: 'Mail', colStart: 1, rowStart: 3 },
    { id: 'photos', kind: 'app', label: 'Photos', colStart: 2, rowStart: 3 },
    { id: 'notes', kind: 'app', label: 'Notes', colStart: 3, rowStart: 3 },
    { id: 'maps', kind: 'app', label: 'Maps', colStart: 4, rowStart: 3 },
    { id: 'music', kind: 'app', label: 'Music', colStart: 1, rowStart: 4 },
    { id: 'files', kind: 'app', label: 'Files', colStart: 2, rowStart: 4 },
    { id: 'settings', kind: 'app', label: 'Settings', colStart: 3, rowStart: 4 },
    { id: 'camera', kind: 'app', label: 'Camera', colStart: 4, rowStart: 4 },
    { id: 'clock', kind: 'app', label: 'Clock', colStart: 1, rowStart: 5 },
    { id: 'tv', kind: 'app', label: 'TV', colStart: 2, rowStart: 5 },
    { id: 'books', kind: 'app', label: 'Books', colStart: 3, rowStart: 5 },
    { id: 'wallet', kind: 'app', label: 'Wallet', colStart: 4, rowStart: 5 },
    { id: 'health', kind: 'app', label: 'Health', colStart: 1, rowStart: 6 },
    { id: 'weather', kind: 'app', label: 'Weather', colStart: 2, rowStart: 6 },
    { id: 'news', kind: 'app', label: 'News', colStart: 3, rowStart: 6 },
    { id: 'stocks', kind: 'app', label: 'Stocks', colStart: 4, rowStart: 6 }
  ]
};

export const HOME_PAGE_2: HomePage = {
  id: 'home-2',
  items: [
    { id: 'podcasts', kind: 'app', label: 'Podcasts', colStart: 1, rowStart: 1 },
    { id: 'calculator', kind: 'app', label: 'Calculator', colStart: 2, rowStart: 1 },
    { id: 'calendar', kind: 'app', label: 'Calendar', colStart: 3, rowStart: 1 },
    { id: 'find-my', kind: 'app', label: 'Find My', colStart: 4, rowStart: 1 },
    { id: 'messages', kind: 'app', label: 'Messages', colStart: 1, rowStart: 2 },
    { id: 'keynote', kind: 'app', label: 'Keynote', colStart: 2, rowStart: 2 },
    { id: 'pages', kind: 'app', label: 'Pages', colStart: 3, rowStart: 2 },
    { id: 'garageband', kind: 'app', label: 'GarageBand', colStart: 4, rowStart: 2 },
    { id: 'imovie', kind: 'app', label: 'iMovie', colStart: 1, rowStart: 3 },
    { id: 'reminders', kind: 'app', label: 'Reminders', colStart: 2, rowStart: 3 },
    { id: 'contacts', kind: 'app', label: 'Contacts', colStart: 3, rowStart: 3 },
    { id: 'facetime', kind: 'app', label: 'FaceTime', colStart: 4, rowStart: 3 },
    { id: 'safari', kind: 'app', label: 'Safari', colStart: 1, rowStart: 4 },
    { id: 'app-store', kind: 'app', label: 'App Store', colStart: 2, rowStart: 4 },
    { id: 'compass', kind: 'app', label: 'Compass', colStart: 3, rowStart: 4 },
    { id: 'home', kind: 'app', label: 'Home', colStart: 4, rowStart: 4 },
    { id: 'numbers', kind: 'app', label: 'Numbers', colStart: 1, rowStart: 5 },
    { id: 'tips', kind: 'app', label: 'Tips', colStart: 2, rowStart: 5 },
    { id: 'voice-memos', kind: 'app', label: 'Voice Memos', colStart: 3, rowStart: 5 },
    { id: 'watch', kind: 'app', label: 'Watch', colStart: 4, rowStart: 5 },
    { id: 'itunes-store', kind: 'app', label: 'iTunes Store', colStart: 1, rowStart: 6 },
    { id: 'find-my-friends', kind: 'app', label: 'Find Friends', colStart: 2, rowStart: 6 },
    { id: 'videos', kind: 'app', label: 'Videos', colStart: 3, rowStart: 6 },
    { id: 'phone', kind: 'app', label: 'Phone', colStart: 4, rowStart: 6 }
  ]
};

export const HOME_PAGE_3: HomePage = {
  id: 'home-3',
  items: [
    { id: 'sconnect-home', kind: 'app', label: 'SConnect', colStart: 1, rowStart: 1 },
    { id: 'sigct-banner', kind: 'app', label: 'SigCT', colStart: 2, rowStart: 1 },
    { id: 'sigct2', kind: 'app', label: 'SigCT2', colStart: 3, rowStart: 1 },
    ...Array.from({ length: 22 }, (_, i) => ({
      id: `app-p3-${i + 3}`,
      kind: 'app' as const,
      colStart: ((i + 2) % 4) + 1,
      rowStart: Math.floor((i + 2) / 4) + 1
    }))
  ]
};

export const HOME_PAGES: HomePage[] = [HOME_PAGE, HOME_PAGE_2, HOME_PAGE_3];

export const DOCK_ITEMS_IPHONE: DockItem[] = [
  { id: 'mail', label: 'Mail' },
  { id: 'settings', label: 'Settings' },
  { id: 'notes', label: 'Notes' },
  { id: 'music-dock', label: 'Music' }
];

export const DOCK_ITEMS_IPAD: DockItem[] = [
  { id: 'mail', label: 'Mail' },
  { id: 'settings', label: 'Settings' },
  { id: 'notes', label: 'Notes' },
  { id: 'safari', label: 'Safari' },
  { id: 'messages', label: 'Messages' },
  { id: 'music', label: 'Music' },
  { id: 'maps', label: 'Maps' },
  { id: 'files', label: 'Files' }
];

export const HOME_WEATHER_WIDGET: WeatherWidgetProps = {
  city: 'San Francisco',
  condition: 'Partly Cloudy',
  temperature: '58°',
  highLow: 'H:63°  L:54°',
  forecast: [
    { id: 'f-9', hour: '9AM', temp: '58°' },
    { id: 'f-12', hour: '12PM', temp: '61°' },
    { id: 'f-3', hour: '3PM', temp: '63°' },
    { id: 'f-6', hour: '6PM', temp: '60°' }
  ]
};

export const HOME_CALENDAR_WIDGET: CalendarWidgetProps = {
  monthLabel: 'April',
  weekdayLabel: 'Tuesday',
  dayNumber: '5',
  days: [
    // April 2025 starts on Tuesday (2 blank cells)
    { id: 'b-1', label: '', isMuted: true },
    { id: 'b-2', label: '', isMuted: true },
    ...Array.from({ length: 30 }, (_, i) => ({
      id: `d-${i + 1}`,
      label: String(i + 1),
      isToday: i + 1 === 5,
      isMuted: false
    }))
  ],
  events: [
    { id: 'e-standup', title: 'Design Standup', time: '10:00 AM' }
  ]
};
