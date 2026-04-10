import { CalendarPlannerLayout } from '../../components/apps-layout/calendar';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { CALENDAR_MONTH_LABEL, CALENDAR_WEEK_DAYS, CALENDAR_WEEK_HOURS } from '../../constants/apps/calendar-layout';
import type { CalendarPageProps } from '../../types/app-pages';

export function CalendarPage(props: CalendarPageProps) {
  return (
    <AppPageShell
      backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <CalendarPlannerLayout theme={props.theme} monthLabel={CALENDAR_MONTH_LABEL} days={CALENDAR_WEEK_DAYS} hours={CALENDAR_WEEK_HOURS} />
    </AppPageShell>
  );
}
