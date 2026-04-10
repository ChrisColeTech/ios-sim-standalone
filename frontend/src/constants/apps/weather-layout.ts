import type { MediaTab, TwoColSidebarConfig } from '../../types/layouts';

export const WEATHER_TABS: MediaTab[] = [
  { id: 'today', label: 'Today' },
  { id: '10-day', label: '10-Day' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'search', label: 'Search' }
];

export const WEATHER_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search City',
  sections: [
    {
      id: 'locations',
      rows: [
        { id: 'cupertino', title: 'Cupertino', subtitle: '66°' },
        { id: 'san-francisco', title: 'San Francisco', subtitle: '58°' },
        { id: 'new-york', title: 'New York', subtitle: '72°' },
        { id: 'london', title: 'London', subtitle: '54°' },
        { id: 'tokyo', title: 'Tokyo', subtitle: '78°' }
      ]
    }
  ]
};

export const WEATHER_CURRENT = {
  location: 'Cupertino',
  temp: '66°',
  condition: 'Mostly Clear',
  high: '70°',
  low: '52°',
  description: 'Sunny conditions will continue all day. Wind gusts are up to 8 mph.'
};

export type HourlyIcon = 'sunny' | 'partlyCloudy' | 'moon';

export const WEATHER_HOURLY: { time: string; temp: string; icon: HourlyIcon }[] = [
  { time: 'Now', temp: '66°', icon: 'sunny' },
  { time: '1PM', temp: '68°', icon: 'sunny' },
  { time: '2PM', temp: '69°', icon: 'sunny' },
  { time: '3PM', temp: '70°', icon: 'partlyCloudy' },
  { time: '4PM', temp: '68°', icon: 'partlyCloudy' },
  { time: '5PM', temp: '65°', icon: 'partlyCloudy' },
  { time: '6PM', temp: '62°', icon: 'moon' },
  { time: '7PM', temp: '59°', icon: 'moon' },
  { time: '8PM', temp: '57°', icon: 'moon' },
  { time: '9PM', temp: '55°', icon: 'moon' }
];

export type DailyIcon = 'sunny' | 'partlyCloudy' | 'cloudy' | 'rain';

export const WEATHER_DAILY: { day: string; icon: DailyIcon; low: string; high: string; barPct: number }[] = [
  { day: 'Today', icon: 'sunny', low: '52°', high: '70°', barPct: 75 },
  { day: 'Wed', icon: 'partlyCloudy', low: '50°', high: '68°', barPct: 65 },
  { day: 'Thu', icon: 'cloudy', low: '48°', high: '64°', barPct: 55 },
  { day: 'Fri', icon: 'rain', low: '46°', high: '58°', barPct: 40 },
  { day: 'Sat', icon: 'rain', low: '45°', high: '56°', barPct: 35 },
  { day: 'Sun', icon: 'cloudy', low: '47°', high: '60°', barPct: 45 },
  { day: 'Mon', icon: 'sunny', low: '49°', high: '66°', barPct: 60 },
  { day: 'Tue', icon: 'sunny', low: '51°', high: '69°', barPct: 70 },
  { day: 'Wed', icon: 'partlyCloudy', low: '50°', high: '67°', barPct: 62 },
  { day: 'Thu', icon: 'sunny', low: '52°', high: '71°', barPct: 78 }
];

export const WEATHER_DETAIL_CARDS = [
  { id: 'uv', label: 'UV INDEX', value: '4', sublabel: 'Moderate', gauge: 0.4 },
  { id: 'wind', label: 'WIND', value: '8 mph', sublabel: 'WSW', gauge: null },
  { id: 'moon', label: 'MOON', value: 'Waxing Crescent', sublabel: 'Moonrise: 9:42 PM', gauge: null },
  { id: 'precipitation', label: 'PRECIPITATION', value: '0"', sublabel: 'in last 24h', gauge: null },
  { id: 'feels', label: 'FEELS LIKE', value: '70°', sublabel: 'Similar to the actual temperature.', gauge: null },
  { id: 'humidity', label: 'HUMIDITY', value: '25%', sublabel: 'Dew point: 34°', gauge: 0.25 },
  { id: 'visibility', label: 'VISIBILITY', value: '10 mi', sublabel: 'Clear', gauge: null },
  { id: 'pressure', label: 'PRESSURE', value: '30.1 in', sublabel: 'Rising', gauge: null }
];
