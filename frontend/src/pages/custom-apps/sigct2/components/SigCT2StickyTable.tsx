import { negativeValueColor } from '../../../../utils/sigct/format';

type SigCT2StickyTableProps = {
  headers: string[];
  rows: string[][];
  footer?: string[];
  isDark?: boolean;
  onRowClick?: (rowIndex: number) => void;
};

export function SigCT2StickyTable({
  headers,
  rows,
  footer,
  isDark = false,
  onRowClick,
}: SigCT2StickyTableProps) {
  const headerBg = isDark ? 'bg-[#1c1c1e]' : 'bg-[#f2f2f7]';
  const evenRowBg = isDark ? 'bg-[#2c2c2e]' : 'bg-white';
  const oddRowBg = isDark ? 'bg-[#1c1c1e]' : 'bg-[#f9f9fb]';
  const footerBg = isDark ? 'bg-[#1c1c1e]' : 'bg-[#f2f2f7]';
  const textColor = isDark ? 'text-white' : 'text-black';
  const borderColor = isDark ? 'border-white/10' : 'border-black/10';
  const cellClass = 'px-2 py-1.5 text-[8px] whitespace-nowrap';

  return (
    <div className="max-w-full overflow-x-auto rounded">
      <table className={`min-w-full border-collapse ${textColor}`}>
        {/* Header */}
        <thead>
          <tr className={headerBg}>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`${cellClass} text-left font-bold ${
                  i === 0 ? 'sticky left-0 z-20 min-w-[90px] max-w-[120px]' : 'min-w-[70px]'
                } sticky top-0 z-10 ${headerBg}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`${ri % 2 === 0 ? evenRowBg : oddRowBg} ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={onRowClick ? () => onRowClick(ri) : undefined}
            >
              {row.map((cell, ci) => {
                const negColor = negativeValueColor(cell);
                return (
                  <td
                    key={ci}
                    className={`${cellClass} ${
                      ci === 0
                        ? `sticky left-0 z-10 font-bold min-w-[90px] max-w-[120px] ${ri % 2 === 0 ? evenRowBg : oddRowBg}`
                        : 'min-w-[70px]'
                    }`}
                    style={negColor ? { color: negColor } : undefined}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

        {/* Footer */}
        {footer && (
          <tfoot>
            <tr className={`${footerBg} border-t ${borderColor}`}>
              {footer.map((cell, i) => {
                const negColor = negativeValueColor(cell);
                return (
                  <td
                    key={i}
                    className={`${cellClass} font-bold ${
                      i === 0 ? 'sticky left-0 z-20 min-w-[90px] max-w-[120px]' : 'min-w-[70px]'
                    } sticky bottom-0 z-10 ${footerBg}`}
                    style={negColor ? { color: negColor } : undefined}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
