import { ChevronLeft } from 'lucide-react';
import type { IOSNavigationBarProps } from '../../types/ui-components';

export function IOSNavigationBar({
  title,
  isDark,
  navBg,
  onBack,
  actions,
}: IOSNavigationBarProps) {
  const titleColor = isDark ? 'text-black' : 'text-white';
  const iconColor = isDark ? 'text-black/70 hover:text-black' : 'text-white/80 hover:text-white';
  const size = 'h-5 w-5';

  return (
    <div
      className="flex h-[28px] shrink-0 items-center justify-between px-2"
      style={{ backgroundColor: navBg }}
    >
      <div className="relative z-10">
        {onBack ? (
          <button
            className={`flex items-center justify-center ${size} cursor-pointer ${iconColor}`}
            onClick={onBack}
            type="button"
            title="Back"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
          </button>
        ) : (
          <div className={size} />
        )}
      </div>
      <h1 className={`pointer-events-none absolute inset-x-0 text-center text-[10px] font-semibold tracking-tight ${titleColor}`}>
        {title}
      </h1>
      <div className="relative z-10 flex items-center gap-1">
        {actions?.map((action, i) => (
          <button
            key={action.label ?? i}
            className={`flex items-center justify-center ${size} cursor-pointer ${iconColor}`}
            onClick={action.onTap}
            type="button"
            title={action.label}
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
