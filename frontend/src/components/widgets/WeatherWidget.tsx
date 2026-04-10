import { WiDayCloudy } from 'react-icons/wi';
import type { WeatherWidgetProps } from '../../types/widgets';

export function WeatherWidget(props: WeatherWidgetProps) {
  return (
    <section className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[linear-gradient(165deg,#2f6fe4_0%,#3f82ff_38%,#67a8ff_100%)] text-white">
      <div className="absolute -right-[18%] -top-[16%] h-[52%] w-[52%] rounded-full bg-white/20 blur-xl" />
      <div className="absolute -left-[26%] -bottom-[28%] h-[70%] w-[70%] rounded-full bg-sky-300/30 blur-2xl" />

      <div className="relative flex h-full flex-col justify-between px-[8%] pb-[6%] pt-[7%]">
        <div>
          <div className="text-[clamp(8px,3.2cqw,14px)] font-semibold tracking-[0.01em]">{props.city}</div>
          <div className="text-[clamp(18px,10cqw,48px)] font-light leading-none tracking-[-0.03em]">{props.temperature}</div>
        </div>

        <div>
          <WiDayCloudy className="h-[clamp(14px,6cqw,28px)] w-[clamp(14px,6cqw,28px)] text-white/90" />
          <div className="text-[clamp(7px,2.8cqw,12px)] text-white/90">{props.condition}</div>
          <div className="pt-[1%] text-[clamp(7px,2.8cqw,12px)] text-white/90">{props.highLow}</div>
        </div>
      </div>
    </section>
  );
}
