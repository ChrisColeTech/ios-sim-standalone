import type { CalendarWidgetProps } from '../../types/widgets';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarWidget(props: CalendarWidgetProps) {
  return (
    <section className="h-full w-full overflow-hidden rounded-[inherit] bg-[#15161a] text-white">
      <div className="flex h-full flex-col px-[6%] pb-[4%] pt-[5%]">
        <div className="shrink-0 pb-[3%] text-[clamp(7px,3cqw,12px)] font-semibold uppercase tracking-[0.06em] text-red-400">{props.monthLabel}</div>

        <div className="grid grid-cols-7 gap-x-[1%] pb-[2%]">
          {DAY_HEADERS.map((d, i) => (
            <div key={i} className="text-center text-[clamp(5px,2.2cqw,9px)] font-medium text-ios-gray">{d}</div>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-7 gap-x-[1%]">
          {props.days.map((day) => (
            <div
              key={day.id}
              className={`flex items-center justify-center text-[clamp(5px,2.2cqw,9px)] ${
                day.label === ''
                  ? ''
                  : day.isToday
                    ? 'rounded-full bg-red-500 font-semibold text-white'
                    : 'text-white/85'
              }`}
            >
              {day.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
