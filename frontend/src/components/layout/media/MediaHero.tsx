import type { MediaHeroProps } from '../../../types/layout-components';

export function MediaHero(props: MediaHeroProps) {
  const isDark = props.theme === 'dark';

  return (
    <section className="relative overflow-hidden rounded-xl border border-white/15 backdrop-blur-xl" style={{ aspectRatio: '16 / 7' }}>
      <div className="absolute inset-0 bg-white/5" />
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <h2 className={`text-[11px] font-bold leading-tight ${isDark ? 'text-white' : 'text-black'}`}>{props.title}</h2>
        {props.subtitle ? <p className={`text-[8px] ${isDark ? 'text-white/60' : 'text-black/50'}`}>{props.subtitle}</p> : null}
      </div>
    </section>
  );
}
