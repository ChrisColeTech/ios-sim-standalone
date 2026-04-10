import { SCONNECT_MENU_ITEMS, SCONNECT_THEME, getStoreLogo } from '../../../../constants/custom-apps/sconnect-home';
import type { SConnectSideMenuProps } from '../../../../types/custom-apps/sconnect-home';

export function SConnectSideMenu(props: SConnectSideMenuProps) {
  const menuBg = props.isDark ? SCONNECT_THEME.menuBgDark : SCONNECT_THEME.menuBgLight;
  const textColor = props.isDark ? 'text-black' : 'text-white';
  const mutedColor = props.isDark ? 'text-black/60' : 'text-white/70';
  const hoverBg = props.isDark ? 'hover:bg-black/10' : 'hover:bg-white/10';
  const selectedBg = props.isDark ? 'bg-black/15' : 'bg-white/15';

  const visibleItems = SCONNECT_MENU_ITEMS.filter(
    item => props.menuOptions.includes(item.id)
  );

  return (
    <div
      className="absolute inset-y-0 left-0 z-0 flex flex-col overflow-y-auto"
      style={{ backgroundColor: menuBg, width: 'clamp(140px, 35%, 200px)' }}
    >
      {/* Title bar with brand logo */}
      <div className="flex h-[28px] shrink-0 items-center justify-center px-3">
        <img
          src={getStoreLogo(props.banner)}
          alt={props.banner ?? 'SConnect'}
          className="h-[18px] object-contain"
          style={{ filter: props.isDark ? 'brightness(0)' : 'brightness(0) invert(1)' }}
        />
      </div>

      {/* Menu items */}
      <div className="flex flex-col py-1">
        {visibleItems.map(item => {
          const isSelected = props.selectedOption === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => props.onSelect(item.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${
                isSelected ? `${selectedBg} ${textColor}` : `${mutedColor} ${hoverBg}`
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
