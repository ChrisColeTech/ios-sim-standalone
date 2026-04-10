import type { MediaRailSectionViewProps } from '../../../types/layout-components';

export function MediaRailSectionView(props: MediaRailSectionViewProps) {
  const isDark = props.theme === 'dark';

  return (
    <section className="min-w-0">
      <div className="flex items-center justify-between pb-1">
        <h3 className={`text-[10px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{props.section.title}</h3>
        <button className={`text-[8px] p-0 bg-transparent border-0 ${isDark ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'}`} type="button">
          See All
        </button>
      </div>
      <div className="flex gap-1.5 overflow-x-auto min-w-0">
        {props.section.items.map((item) => (
          <article key={item.id} className="w-[clamp(60px,18%,80px)] shrink-0">
            <div className="aspect-[3/4] overflow-hidden rounded-lg border border-white/15 backdrop-blur-xl">
              <div className="h-full w-full bg-white/5" />
            </div>
            <div className="pt-0.5">
              <div className={`text-[8px] font-medium leading-tight ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</div>
              {item.subtitle ? <div className={`text-[7px] ${isDark ? 'text-white/50' : 'text-black/45'}`}>{item.subtitle}</div> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
