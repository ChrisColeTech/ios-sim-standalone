import type { CalendarPlannerLayoutProps } from '../../../types/layouts';

export function CalendarPlannerLayout(props: CalendarPlannerLayoutProps) {
  const isDark = props.theme === 'dark';

  return (
    <section className={`flex h-full min-h-0 flex-col ${isDark ? 'bg-transparent text-white' : 'bg-transparent text-black'}`}>
      <header className={`flex shrink-0 items-center justify-between border-b px-3 py-2 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <h1 className="text-3xl font-semibold">{props.monthLabel}</h1>
        <div className="flex gap-1">
          {['Day', 'Week', 'Month'].map((mode) => (
            <button key={mode} className={`rounded-full px-2 py-1 text-xs ${mode === 'Week' ? (isDark ? 'bg-white/20' : 'bg-ios-separator-light') : isDark ? 'bg-white/10' : 'bg-ios-gray-light'}`} type="button">
              {mode}
            </button>
          ))}
        </div>
      </header>
      <div className={`grid shrink-0 grid-cols-8 border-b ${isDark ? 'border-white/10 text-ios-gray' : 'border-black/10 text-ios-gray'}`}>
        <div className="px-1 py-2 text-[11px]">All day</div>
        {props.days.map((day) => (
          <div key={day} className="px-1 py-2 text-center text-[11px]">{day}</div>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {props.hours.map((hour) => (
          <div key={hour} className={`grid grid-cols-8 border-b text-[11px] ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <div className={`px-1 py-2 ${isDark ? 'text-ios-gray' : 'text-ios-gray'}`}>{hour}</div>
            {props.days.map((day) => (
              <div key={`${hour}-${day}`} className={`h-8 border-l ${isDark ? 'border-white/5' : 'border-black/5'}`} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
