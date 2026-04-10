import {
  TABLE_HEADER_BG, TABLE_FOOTER_BG,
  TABLE_COL0_BG_DARK, TABLE_COL0_BG_LIGHT,
  TABLE_ROW_EVEN_DARK, TABLE_ROW_ODD_DARK,
  TABLE_ROW_EVEN_LIGHT, TABLE_ROW_ODD_LIGHT,
} from '../../../../constants/custom-apps/sigct-banner';
import { negativeValueColor } from '../../../../utils/sigct/format';
import type { SigCTStickyTableProps } from '../../../../types/custom-apps/sigct-banner';

/**
 * Sticky-scroll table matching the Swift SpreadsheetView layout.
 * Sticky: header row (top), first column (left), footer row (bottom).
 * Body scrolls both axes. Negative values render in red.
 */
export function SigCTStickyTable(props: SigCTStickyTableProps) {
  const dark = props.isDark !== false;

  const cellClass = 'px-2 py-1.5 text-[8px] whitespace-nowrap';
  const col0Width = 'min-w-[90px] max-w-[120px]';
  const colWidth = 'min-w-[70px]';

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden rounded text-white">
      {/* Header row — sticky top */}
      <div className="flex shrink-0" style={{ backgroundColor: TABLE_HEADER_BG }}>
        <div className={`${cellClass} ${col0Width} sticky left-0 z-20 font-bold`} style={{ backgroundColor: TABLE_HEADER_BG }}>
          {props.headers[0]}
        </div>
        <div className="flex overflow-hidden">
          {props.headers.slice(1).map((h, i) => (
            <div key={i} className={`${cellClass} ${colWidth} text-right font-bold`}>{h}</div>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-auto">
        <div>
          {props.rows.map((row, ri) => {
            const bg = dark
              ? (ri % 2 === 0 ? TABLE_ROW_EVEN_DARK : TABLE_ROW_ODD_DARK)
              : (ri % 2 === 0 ? TABLE_ROW_EVEN_LIGHT : TABLE_ROW_ODD_LIGHT);
            const col0Bg = dark ? TABLE_COL0_BG_DARK : TABLE_COL0_BG_LIGHT;
            return (
              <div
                key={ri}
                className={`flex ${props.onRowClick ? 'cursor-pointer hover:brightness-125' : ''}`}
                style={{ backgroundColor: bg }}
                onClick={() => props.onRowClick?.(ri)}
              >
                <div
                  className={`${cellClass} ${col0Width} sticky left-0 z-10 truncate font-medium`}
                  style={{ backgroundColor: col0Bg, color: dark ? '#fff' : '#000' }}
                >
                  {row[0]}
                </div>
                {row.slice(1).map((cell, ci) => (
                  <div
                    key={ci}
                    className={`${cellClass} ${colWidth} text-right`}
                    style={{ color: negativeValueColor(cell) ?? (dark ? '#fff' : '#000') }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer row — sticky bottom */}
      {props.footer && (
        <div className="flex shrink-0 border-t border-white/10" style={{ backgroundColor: TABLE_FOOTER_BG }}>
          <div className={`${cellClass} ${col0Width} sticky left-0 z-20 font-bold`} style={{ backgroundColor: TABLE_FOOTER_BG }}>
            {props.footer[0]}
          </div>
          <div className="flex overflow-hidden">
            {props.footer.slice(1).map((f, i) => (
              <div
                key={i}
                className={`${cellClass} ${colWidth} text-right font-bold`}
                style={{ color: negativeValueColor(f) }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
