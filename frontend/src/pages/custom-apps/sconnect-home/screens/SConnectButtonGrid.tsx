import { SCONNECT_THEME, SCONNECT_ASSETS } from '../../../../constants/custom-apps/sconnect-home';
import type { SConnectButtonGridProps } from '../../../../types/custom-apps/sconnect-home';

const PLACEHOLDER_BG = SCONNECT_THEME.placeholderBg;

export function SConnectButtonGrid(props: SConnectButtonGridProps) {
  const gridBg = props.isDark ? SCONNECT_THEME.gridBgDark : SCONNECT_THEME.gridBgLight;
  const labelColor = props.isDark ? 'text-white/80' : 'text-black/70';
  const cols = props.isLandscape ? 6 : 4;

  return (
    <div className="flex-1 overflow-auto p-2" style={{ backgroundColor: gridBg }}>
      {props.buttons.length === 0 ? (
        <div className={`flex h-full items-center justify-center text-[10px] ${labelColor}`}>
          No tools available for this category.
        </div>
      ) : (
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {props.buttons.map((button, i) => (
            <button
              key={button.id || `btn-${i}`}
              onClick={() => props.onButtonTap(button)}
              className="group flex flex-col items-center gap-0.5 min-w-0"
            >
              <div
                className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg shadow-sm transition-transform group-active:scale-95"
                style={{ backgroundColor: PLACEHOLDER_BG }}
              >
                {button.image ? (
                  <img
                    src={button.image}
                    alt={button.name ?? ''}
                    className="h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                  />
                ) : button.url === 'http://about:blank' ? (
                  <img src={SCONNECT_ASSETS.favoritesAdd} alt="Add" className="h-full w-full object-cover" />
                ) : (
                  <img src={SCONNECT_ASSETS.favoritesGeneric} alt={button.name ?? ''} className="h-full w-full object-cover" />
                )}
              </div>
              <span className={`line-clamp-2 text-center text-[7px] leading-tight ${labelColor}`}>
                {button.name ?? ''}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
