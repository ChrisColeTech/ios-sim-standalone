import { OneColRow } from './OneColRow';
import type { OneColSectionProps } from '../../../types/layout-components';

export function OneColSection(props: OneColSectionProps) {
  const isDark = props.theme === 'dark';
  const co = props.colorOverrides;

  const sectionBg = co?.sectionBg
    ?? (isDark ? 'bg-ios-surface/80' : 'bg-white/96');

  const headerStyle = co?.sectionHeaderBg
    ? { backgroundColor: co.sectionHeaderBg, color: co.sectionHeaderText ?? '#fff' }
    : undefined;

  const headerClass = headerStyle
    ? `font-semibold uppercase tracking-wide ${props.compact ? 'px-3 pb-0.5 pt-1 text-[8px]' : 'px-3 pb-1 pt-1.5 text-[9px]'}`
    : `font-semibold uppercase tracking-wide text-ios-gray ${props.compact ? 'px-3 pb-0.5 pt-1 text-[8px]' : 'px-3 pb-1 pt-1.5 text-[9px]'}`;

  return (
    <section className={`${co?.sectionBg ? '' : sectionBg} backdrop-blur-sm`} style={co?.sectionBg ? { backgroundColor: co.sectionBg } : undefined}>
      {props.section.header ? (
        <h2 className={headerClass} style={headerStyle}>
          {props.section.header}
        </h2>
      ) : null}
      <div>
        {props.section.rows.map((row, index) => (
          <OneColRow
            key={row.id}
            row={row}
            compact={props.compact}
            theme={props.theme}
            selected={props.selectedRowId === row.id}
            isLast={index === props.section.rows.length - 1}
            colorOverrides={co}
            renderLeading={props.renderRowLeading?.(row, props.section.id)}
            renderTrailing={props.renderRowTrailing?.(row, props.section.id)}
            onSelect={(rowId) => props.onRowSelect?.(props.section.id, rowId)}
          />
        ))}
      </div>
    </section>
  );
}
