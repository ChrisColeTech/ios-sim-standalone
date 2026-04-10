type ClockFaceItem = {
  id: string;
  city: string;
  time: string;
  hour: number;
  minute: number;
  darkFace: boolean;
};

type ClockFaceCarouselProps = {
  theme: 'light' | 'dark';
  items: ClockFaceItem[];
};

export function ClockFaceCarousel(props: ClockFaceCarouselProps) {
  const isDark = props.theme === 'dark';

  return (
    <section className={`min-w-0 overflow-hidden rounded-lg backdrop-blur-sm ${isDark ? 'bg-ios-surface/90' : 'bg-white/92'}`}>
      <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden px-1.5 py-1.5">
        <div className="inline-flex gap-1.5">
          {props.items.map((clock) => {
            const minuteRotation = clock.minute * 6;
            const hourRotation = ((clock.hour % 12) + clock.minute / 60) * 30;

            return (
              <article key={clock.id} className={`w-[72px] shrink-0 rounded-md border p-1 ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white'}`}>
                <div className={`mx-auto relative h-8 w-8 overflow-hidden rounded-full border ${clock.darkFace ? 'border-white/20 bg-[#141822]' : 'border-black/15 bg-[#f2f4f8]'}`}>
                  <span
                    className={`absolute left-[15px] top-[6px] h-[10px] w-[1.5px] origin-bottom rounded-full ${clock.darkFace ? 'bg-white' : 'bg-black'}`}
                    style={{ transform: `rotate(${hourRotation}deg)` }}
                  />
                  <span
                    className={`absolute left-[15px] top-[4px] h-[12px] w-[1px] origin-bottom rounded-full ${clock.darkFace ? 'bg-white/85' : 'bg-black/70'}`}
                    style={{ transform: `rotate(${minuteRotation}deg)` }}
                  />
                  <span className={`absolute left-[14px] top-[14px] h-1 w-1 rounded-full ${clock.darkFace ? 'bg-white' : 'bg-black'}`} />
                </div>
                <div className="min-w-0 pt-0.5 text-center">
                  <p className={`truncate text-[7px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{clock.city}</p>
                  <p className={`truncate text-[6px] ${isDark ? 'text-ios-gray' : 'text-black/50'}`}>{clock.time}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
