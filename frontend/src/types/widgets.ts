export type WeatherHourForecast = {
  id: string;
  hour: string;
  temp: string;
};

export type WeatherWidgetProps = {
  city: string;
  condition: string;
  temperature: string;
  highLow: string;
  forecast: WeatherHourForecast[];
};

export type CalendarDayCell = {
  id: string;
  label: string;
  isMuted?: boolean;
  isToday?: boolean;
};

export type CalendarWidgetEvent = {
  id: string;
  title: string;
  time: string;
};

export type CalendarWidgetProps = {
  monthLabel: string;
  weekdayLabel: string;
  dayNumber: string;
  days: CalendarDayCell[];
  events: CalendarWidgetEvent[];
};
