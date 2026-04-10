import { AnimatePresence, motion } from 'framer-motion';
import { PageIndicator } from './PageIndicator';
import { CalendarWidget, WeatherWidget } from '../widgets';
import { HOME_CALENDAR_WIDGET, HOME_WEATHER_WIDGET } from '../../constants/home';
import { ICON_BY_APP_ID } from '../../constants/dock-icons';
import type { GridPageProps } from '../../types/components';
import type { GridPlacement } from '../../types/app';
import { clamp } from '../../utils/math';

function buildLandscapeGridPlacements(props: GridPageProps) {
  const columns = 6;
  const rows = 4;
  const occupied = new Set<string>();
  const placements = new Map<string, GridPlacement>();

  const markOccupied = (placement: GridPlacement) => {
    for (let row = placement.rowStart; row < placement.rowStart + placement.rowSpan; row += 1) {
      for (let col = placement.colStart; col < placement.colStart + placement.colSpan; col += 1) {
        occupied.add(`${row}:${col}`);
      }
    }
  };

  const isFree = (row: number, col: number) => !occupied.has(`${row}:${col}`);

  for (const item of props.page.items) {
    if (item.kind !== 'widget') {
      continue;
    }

    const colSpan = clamp(item.colSpan ?? 1, 1, columns);
    const rowSpan = clamp(item.rowSpan ?? 1, 1, rows);
    const colStart = clamp(item.colStart, 1, columns - colSpan + 1);
    const rowStart = clamp(item.rowStart, 1, rows - rowSpan + 1);

    const placement = { colStart, rowStart, colSpan, rowSpan };
    placements.set(item.id, placement);
    markOccupied(placement);
  }

  for (const item of props.page.items) {
    if (item.kind === 'widget') {
      continue;
    }

    let placed = false;

    for (let row = 1; row <= rows && !placed; row += 1) {
      for (let col = 1; col <= columns; col += 1) {
        if (!isFree(row, col)) {
          continue;
        }

        const placement = { colStart: col, rowStart: row, colSpan: 1, rowSpan: 1 };
        placements.set(item.id, placement);
        markOccupied(placement);
        placed = true;
        break;
      }
    }
  }

  return placements;
}

export function GridPage(props: GridPageProps) {
  if (!props.page || !props.page.items) return null;

  const gridColumns = props.isLandscape ? 6 : 4;
  const gridRows = props.isLandscape ? 4 : 6;
  const landscapeGridPlacements = props.isLandscape ? buildLandscapeGridPlacements(props) : null;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className="relative grid min-h-0 flex-1 overflow-hidden px-2 pb-1 pt-4"
        style={{
          gap: `${props.gap}px`,
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
        }}
      >
        <AnimatePresence custom={props.pageTransitionDirection} initial={false} mode="sync">
          <motion.div
            key={props.page.id}
            custom={props.pageTransitionDirection}
            variants={{
              enter: (direction: -1 | 1) => ({ x: direction > 0 ? '100%' : '-100%' }),
              center: { x: '0%' },
              exit: (direction: -1 | 1) => ({ x: direction > 0 ? '-100%' : '100%' })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 460, damping: 42, mass: 0.9 }}
            className="absolute inset-x-0 bottom-0 top-4 grid will-change-transform"
            style={{
              gap: `${props.gap}px`,
              gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
            }}
          >
            {props.page.items.map((item) => (
              <div
                key={item.id}
                className={`relative min-h-0 min-w-0 ${item.kind === 'widget' ? '[container-type:size]' : 'flex items-center justify-center'}`}
                style={{
                  gridColumn: `${props.isLandscape
                    ? (landscapeGridPlacements?.get(item.id)?.colStart ?? 1)
                    : item.colStart} / span ${props.isLandscape
                    ? (landscapeGridPlacements?.get(item.id)?.colSpan ?? 1)
                    : (item.colSpan ?? 1)}`,
                  gridRow: `${props.isLandscape
                    ? (landscapeGridPlacements?.get(item.id)?.rowStart ?? 1)
                    : item.rowStart} / span ${props.isLandscape
                    ? (landscapeGridPlacements?.get(item.id)?.rowSpan ?? 1)
                    : (item.rowSpan ?? 1)}`
                }}
              >
                {item.kind === 'widget' ? (
                  <button
                    className="@container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer appearance-none overflow-hidden rounded-2xl border border-white/20 p-0 text-left backdrop-blur-xl"
                    style={{ aspectRatio: '1 / 0.92', width: '85%', maxHeight: '85%' }}
                    onClick={(e) => {
                      if (item.id.startsWith('placeholder')) return;
                      const appId = item.id === 'weather-widget' ? 'weather' : item.id === 'calendar-widget' ? 'calendar' : null;
                      if (appId) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        props.onOpenApp(appId, { x: rect.x, y: rect.y, width: rect.width, height: rect.height });
                      }
                    }}
                    type="button"
                  >
                    {item.id === 'weather-widget' ? <WeatherWidget {...HOME_WEATHER_WIDGET} /> : null}
                    {item.id === 'calendar-widget' ? <CalendarWidget {...HOME_CALENDAR_WIDGET} /> : null}
                  </button>
                ) : (
                  <button
                    className="flex w-full cursor-pointer appearance-none flex-col items-center justify-start gap-0.5 border-0 bg-transparent p-0"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      props.onOpenApp(item.id, { x: rect.x, y: rect.y, width: rect.width, height: rect.height });
                    }}
                    type="button"
                  >
                    {ICON_BY_APP_ID[item.id] ? (
                      <div
                        className="overflow-hidden"
                        style={{ width: `${props.iconSize}px`, height: `${props.iconSize}px`, borderRadius: `${Math.round(props.iconSize * 0.22)}px` }}
                      >
                        <img alt={item.label ?? item.id} className="block h-full w-full object-cover" draggable={false} src={ICON_BY_APP_ID[item.id]} />
                      </div>
                    ) : (
                      <div
                        className="border border-white/20 backdrop-blur-md"
                        style={{ width: `${props.iconSize}px`, height: `${props.iconSize}px`, borderRadius: `${Math.round(props.iconSize * 0.22)}px` }}
                      />
                    )}
                    {item.label ? <span className="max-w-full text-[8px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{item.label}</span> : null}
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex h-7 items-center justify-center">
        <PageIndicator currentPage={props.currentPage} pageCount={props.pageCount} className="flex justify-center gap-2" />
      </div>
    </div>
  );
}
