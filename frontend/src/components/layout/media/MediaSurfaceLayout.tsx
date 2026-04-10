import { MediaHero } from './MediaHero';
import { MediaRailSectionView } from './MediaRailSectionView';
import type { MediaSurfaceLayoutProps } from '../../../types/layouts';

export function MediaSurfaceLayout(props: MediaSurfaceLayoutProps) {
  const isDark = props.theme === 'dark';

  return (
    <div className="min-h-0 flex-1 space-y-2 overflow-auto px-3 pb-4">
      {props.headerTitle ? (
        <div className="pt-1">
          <h1 className={`text-[14px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>{props.headerTitle}</h1>
        </div>
      ) : null}
      {props.filterPills ? (
        <div className="flex flex-wrap gap-1">
          {props.filterPills.map((pill) => (
            <button
              key={pill}
              className={`rounded-full border px-2 py-0.5 p-0 text-[7px] font-medium border-0 ${isDark ? 'bg-ios-surface text-white/80 hover:bg-ios-surface-elevated' : 'bg-ios-gray-light text-ios-gray-dark hover:bg-ios-separator-light'}`}
              type="button"
            >
              {pill}
            </button>
          ))}
        </div>
      ) : null}
      <MediaHero theme={props.theme} title={props.heroTitle} subtitle={props.heroSubtitle} />
      {props.sections.map((section) => (
        <MediaRailSectionView key={section.id} theme={props.theme} section={section} />
      ))}
    </div>
  );
}
