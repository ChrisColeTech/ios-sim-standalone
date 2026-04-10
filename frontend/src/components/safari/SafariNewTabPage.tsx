import { getHostname } from '../../utils/safari';
import type { SafariNewTabPageProps } from '../../types/safari';

export function SafariNewTabPage(props: SafariNewTabPageProps) {
  const cardClass = props.isDark
    ? 'rounded-xl border border-white/15 bg-ios-surface/80 backdrop-blur-xl'
    : 'rounded-xl bg-white/95 shadow-sm shadow-black/5';
  const mutedClass = props.isDark ? 'text-white/45' : 'text-black/40';

  const renderGrid = (items: { url: string; title: string }[]) => {
    if (items.length === 0) {
      return <p className={`py-3 text-center text-[8px] ${mutedClass}`}>No sites yet</p>;
    }
    return (
      <div className="grid grid-cols-4 gap-2 py-1.5">
        {items.map((item) => (
          <button
            key={item.url}
            className="flex flex-col items-center gap-0.5 border-0 bg-transparent p-0"
            onClick={() => props.onNavigate(item.url)}
            type="button"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${props.isDark ? 'bg-white/10' : 'bg-ios-gray-light'}`}>
              <span className={`text-[10px] font-semibold ${props.isDark ? 'text-white/70' : 'text-black/60'}`}>
                {getHostname(item.url).charAt(0).toUpperCase()}
              </span>
            </div>
            <span className={`max-w-full truncate text-[6px] ${props.isDark ? 'text-white/70' : 'text-black/60'}`}>{item.title || getHostname(item.url)}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`h-full overflow-auto px-3 pt-2 pb-4 ${props.isDark ? 'text-white' : 'text-black'}`}>
      <div className={`${cardClass} p-2`}>
        <h3 className={`text-[9px] font-semibold ${props.isDark ? 'text-white/70' : 'text-black/60'}`}>Favorites</h3>
        {renderGrid(props.favorites)}
      </div>
      <div className={`mt-2 ${cardClass} p-2`}>
        <h3 className={`text-[9px] font-semibold ${props.isDark ? 'text-white/70' : 'text-black/60'}`}>Recently Visited</h3>
        {renderGrid(props.recents)}
      </div>
    </div>
  );
}
