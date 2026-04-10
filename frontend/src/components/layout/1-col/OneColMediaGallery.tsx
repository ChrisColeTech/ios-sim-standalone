import type { OneColMediaGalleryProps } from '../../../types/layout-components';

export function OneColMediaGallery(props: OneColMediaGalleryProps) {
  const isDark = props.theme === 'dark';
  const isCompact = props.compact ?? false;
  const columnsClass = props.columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h2 className={`${isCompact ? 'text-[11px]' : 'text-[13px]'} font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{props.title}</h2>
      </div>
      <div className={`grid ${columnsClass} ${isCompact ? 'gap-2.5' : 'gap-3'} pb-1`}>
        {props.items.map((item) => (
          <article
            key={item.id}
            className={isDark ? 'text-white' : 'text-black'}
          >
            <div
              className={`aspect-square ${isCompact ? 'rounded-lg' : 'rounded-xl'} ${isDark ? 'bg-gradient-to-br from-ios-surface-elevated to-ios-gray-dark' : 'bg-gradient-to-br from-ios-separator-light to-ios-gray'}`}
            />
            <div className={isCompact ? 'pt-1.5' : 'pt-2'}>
              <p className={`${isCompact ? 'text-[12px]' : 'text-sm'} font-medium`}>{item.title}</p>
              {item.subtitle ? <p className={`${isCompact ? 'text-[10px]' : 'text-xs'} text-ios-gray`}>{item.subtitle}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
