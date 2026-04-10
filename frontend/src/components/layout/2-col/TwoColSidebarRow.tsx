import type { TwoColSidebarRowProps } from '../../../types/layout-components';

export function TwoColSidebarRow(props: TwoColSidebarRowProps) {
  const isDark = props.theme === 'dark';
  const co = props.colorOverrides;

  const bgClass = props.selected
    ? (isDark ? 'bg-white/15' : 'bg-ios-separator-light/80')
    : (isDark ? 'bg-transparent hover:bg-white/10' : 'bg-transparent hover:bg-black/[0.045]');

  const textClass = co?.rowText ? '' : (isDark ? 'text-white' : 'text-black');

  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-1 overflow-hidden rounded-md px-1.5 py-1 text-left ${bgClass}`}
      onClick={() => props.onSelect(props.row.id)}
      role="button"
      tabIndex={0}
    >
      {(props.leading ?? props.row.leading) ? (
        <span className={`shrink-0 text-[9px] ${isDark ? 'text-white/70' : 'text-ios-gray'}`}>
          {props.leading ?? props.row.leading}
        </span>
      ) : null}
      <span
        className={`min-w-0 flex-1 whitespace-nowrap text-[clamp(9px,8cqw,11px)] leading-tight ${textClass}`}
        style={co?.rowText ? { color: co.rowText } : undefined}
      >
        {props.row.title}
      </span>
      <div className="flex shrink-0 items-center gap-1">
        {props.trailing ?? props.row.trailing ?? (props.row.meta ? <span className="text-[clamp(8px,6.5cqw,9px)] text-ios-gray">{props.row.meta}</span> : null)}
      </div>
    </div>
  );
}
