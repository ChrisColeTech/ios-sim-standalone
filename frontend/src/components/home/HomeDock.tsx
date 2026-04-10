import type { HomeDockProps } from '../../types/components';
import { ICON_BY_APP_ID } from '../../constants/dock-icons';

export function HomeDock(props: HomeDockProps) {
  const dockClassName = props.edge === 'right'
    ? 'h-full rounded-2xl border border-white/20 backdrop-blur-xl'
    : 'w-full rounded-2xl border border-white/20 backdrop-blur-xl';

  const itemsLayoutClassName = props.edge === 'right'
    ? 'grid h-full w-full grid-cols-1 grid-rows-4 place-items-center'
    : 'flex h-full w-full items-center justify-between';

  return (
    <footer className={dockClassName} style={props.edge === 'right' ? { width: `${props.dockSize}px` } : { height: `${props.dockSize}px` }}>
      <div className={itemsLayoutClassName} style={{ gap: `${props.gap}px`, padding: `${props.padding}px` }}>
        {props.items.map((item) => (
          <button
            key={item.id}
            className="m-0 flex appearance-none items-center justify-center overflow-hidden p-0 leading-none"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              props.onOpenApp(item.id, {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
              });
            }}
            style={{ width: `${props.iconSize}px`, height: `${props.iconSize}px`, borderRadius: `${Math.round(props.iconSize * 0.22)}px` }}
            type="button"
          >
            {ICON_BY_APP_ID[item.id] ? (
              <img alt={item.label} className="block h-full w-full object-cover" draggable={false} src={ICON_BY_APP_ID[item.id]} />
            ) : (
              <span className="text-xs font-medium text-white/85">{item.label.slice(0, 1)}</span>
            )}
          </button>
        ))}
      </div>
    </footer>
  );
}
