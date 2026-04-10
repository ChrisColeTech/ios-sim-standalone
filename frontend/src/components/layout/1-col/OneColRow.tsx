import type { OneColRowProps } from '../../../types/layout-components';

export function OneColRow(props: OneColRowProps) {
  const isDark = props.theme === 'dark';
  const co = props.colorOverrides;

  const borderStyle = co?.rowBorder && !props.isLast
    ? { borderBottomWidth: '1px', borderBottomColor: co.rowBorder }
    : undefined;
  const borderClass = !co?.rowBorder && !props.isLast
    ? (isDark ? 'border-b border-white/10' : 'border-b border-black/10')
    : '';

  const rowShellClassName = props.selected
    ? `w-full rounded-md ${isDark ? 'bg-ios-surface-elevated/70' : 'bg-ios-separator-light/80'} ${props.compact ? 'px-3' : 'px-3'}`
    : `w-full ${props.compact ? 'px-3' : 'px-3'} ${borderClass}`;

  const titleColor = co?.rowText
    ? undefined
    : props.selected
      ? (isDark ? 'text-white' : 'text-black')
      : (isDark ? 'text-white' : 'text-black');

  return (
    <div
      className={`flex w-full cursor-pointer items-start bg-transparent p-0 text-left ${isDark ? 'hover:bg-white/10 active:bg-white/15' : 'hover:bg-black/[0.045] active:bg-black/[0.08]'}`}
      onClick={() => props.onSelect?.(props.row.id)}
      role="button"
      tabIndex={0}
      style={borderStyle}
    >
      <div className={`flex ${props.compact ? 'h-7' : 'h-9'} items-center ${props.compact ? 'gap-1.5' : 'gap-2'} ${rowShellClassName}`}>
        {props.renderLeading ?? props.row.leading ? <div className="pt-0.5">{props.renderLeading ?? props.row.leading}</div> : null}
        <div className="min-w-0 flex-1">
          <div
            className={`whitespace-nowrap font-medium leading-tight ${titleColor ?? ''} ${props.compact ? 'text-[10px]' : 'text-[11px]'}`}
            style={co?.rowText ? { color: co.rowText } : undefined}
          >
            {props.row.title}
          </div>
          {props.row.subtitle ? <div className={`whitespace-nowrap leading-tight text-ios-gray ${props.compact ? 'text-[8px]' : 'text-[10px]'}`}>{props.row.subtitle}</div> : null}
        </div>
        <div className={`flex shrink-0 items-center gap-1.5 text-ios-gray ${props.compact ? 'text-[8px]' : 'text-[10px]'}`}>
          {props.row.meta ? <span>{props.row.meta}</span> : null}
          {props.renderTrailing ?? props.row.trailing ?? null}
        </div>
      </div>
    </div>
  );
}
