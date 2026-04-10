import type { LayoutListSection, MediaRailSection, MediaTab, OneColLayoutProps, TwoColDetailConfig, TwoColSidebarConfig } from '../../types/layouts';

export const CLOCK_IPHONE_SECTIONS: LayoutListSection[] = [
  {
    id: 'clock-phone-main',
    rows: [
      { id: 'world-clock', title: 'World Clock', subtitle: '6 cities' },
      { id: 'alarm', title: 'Alarm', subtitle: '2 alarms active' },
      { id: 'stopwatch', title: 'Stopwatch', subtitle: 'Lap timer' },
      { id: 'timer', title: 'Timer', subtitle: 'Kitchen timer' }
    ]
  }
];

export const CLOCK_ONE_COL_CONFIG: Omit<OneColLayoutProps, 'deviceFamily' | 'isLandscape' | 'theme' | 'onLeadingAction' | 'onToolbarAction' | 'onRowSelect'> = {
  toolbar: { title: 'Clock', leadingLabel: 'Back' },
  searchPlaceholder: 'Search',
  sections: CLOCK_IPHONE_SECTIONS
};

export const CLOCK_TABS: MediaTab[] = [
  { id: 'world-clock', label: 'World Clock' },
  { id: 'alarm', label: 'Alarms' },
  { id: 'stopwatch', label: 'Stopwatch' },
  { id: 'timer', label: 'Timers' },
  { id: 'search', label: 'Search' }
];

export const CLOCK_SIDEBAR: TwoColSidebarConfig = {
  sections: [
    {
      id: 'clock-sections',
      rows: CLOCK_TABS.filter((tab) => tab.id !== 'search').map((tab) => ({ id: tab.id, title: tab.label }))
    }
  ]
};

export const CLOCK_TWO_COL_DETAIL_BY_ROW: Record<string, TwoColDetailConfig> = {
  'world-clock': {
    title: 'World Clock',
    subtitle: 'Track time across cities',
    sections: [
      {
        id: 'world-clock-list',
        rows: [
          { id: 'sf', title: 'San Francisco', subtitle: 'Today, 9:41 AM' },
          { id: 'nyc', title: 'New York', subtitle: 'Today, 12:41 PM' },
          { id: 'ldn', title: 'London', subtitle: 'Today, 5:41 PM' }
        ]
      }
    ]
  },
  alarm: {
    title: 'Alarms',
    subtitle: 'Manage your alarms',
    sections: [
      {
        id: 'alarm-list',
        rows: [
          { id: 'alarm-weekday', title: 'Weekday Alarm', subtitle: '6:30 AM' },
          { id: 'alarm-workout', title: 'Workout', subtitle: '5:45 PM' }
        ]
      }
    ]
  },
  stopwatch: {
    title: 'Stopwatch',
    subtitle: 'Recent laps and sessions',
    sections: [
      {
        id: 'stopwatch-list',
        rows: [
          { id: 'lap-1', title: 'Last Session', subtitle: '00:12:34.88' },
          { id: 'lap-2', title: 'Fastest Lap', subtitle: '00:01:18.42' }
        ]
      }
    ]
  },
  timer: {
    title: 'Timers',
    subtitle: 'Saved timer presets',
    sections: [
      {
        id: 'timer-list',
        rows: [
          { id: 'timer-5', title: '5 Minute Focus', subtitle: 'Quick timer' },
          { id: 'timer-15', title: '15 Minute Break', subtitle: 'Pomodoro break' },
          { id: 'timer-30', title: '30 Minute Workout', subtitle: 'Health routine' }
        ]
      }
    ]
  },
  search: {
    title: 'Search',
    subtitle: 'Find cities, alarms, and timers',
    sections: []
  }
};

export const CLOCK_GALLERY_ITEMS = [
  { id: 'cg-1', title: 'World Clock', subtitle: '6 cities' },
  { id: 'cg-2', title: 'Alarms', subtitle: '2 active' },
  { id: 'cg-3', title: 'Stopwatch', subtitle: 'Lap timer' }
];

export const CLOCK_BOTTOM_GALLERY_ITEMS = [
  { id: 'cb-1', title: 'Timers', subtitle: '3 presets' },
  { id: 'cb-2', title: 'Bedtime', subtitle: '10:30 PM' },
  { id: 'cb-3', title: 'Focus Timer', subtitle: '25 min' }
];

export const CLOCK_HERO = {
  title: 'World Clock',
  subtitle: 'Track time across your favorite cities'
};

export const CLOCK_FACE_CAROUSEL = [
  { id: 'sf-face', city: 'San Francisco', time: '9:41 AM', hour: 9, minute: 41, darkFace: false },
  { id: 'ny-face', city: 'New York', time: '12:41 PM', hour: 12, minute: 41, darkFace: false },
  { id: 'ldn-face', city: 'London', time: '5:41 PM', hour: 17, minute: 41, darkFace: false },
  { id: 'par-face', city: 'Paris', time: '6:41 PM', hour: 18, minute: 41, darkFace: true },
  { id: 'tok-face', city: 'Tokyo', time: '1:41 AM', hour: 1, minute: 41, darkFace: true },
  { id: 'syd-face', city: 'Sydney', time: '3:41 AM', hour: 3, minute: 41, darkFace: true }
];

export const CLOCK_MEDIA_SECTIONS: MediaRailSection[] = [
  {
    id: 'world-clock-cities',
    title: 'World Clocks',
    items: [
      { id: 'sf', title: 'San Francisco', subtitle: '9:41 AM' },
      { id: 'nyc', title: 'New York', subtitle: '12:41 PM' },
      { id: 'ldn', title: 'London', subtitle: '5:41 PM' },
      { id: 'par', title: 'Paris', subtitle: '6:41 PM' },
      { id: 'tok', title: 'Tokyo', subtitle: '1:41 AM' }
    ]
  },
  {
    id: 'alarm-presets',
    title: 'Alarms',
    items: [
      { id: 'wake-up', title: 'Wake Up', subtitle: 'Weekdays · 6:30 AM' },
      { id: 'workout', title: 'Workout', subtitle: 'Daily · 5:45 PM' },
      { id: 'bedtime', title: 'Bedtime', subtitle: 'Daily · 10:30 PM' }
    ]
  },
  {
    id: 'timers-shortcuts',
    title: 'Timers',
    items: [
      { id: 'timer-5', title: '5 Minute Focus', subtitle: 'Quick timer' },
      { id: 'timer-15', title: '15 Minute Break', subtitle: 'Pomodoro break' },
      { id: 'timer-30', title: '30 Minute Workout', subtitle: 'Health routine' }
    ]
  }
];
