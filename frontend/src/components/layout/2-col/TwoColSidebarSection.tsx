import { TwoColSidebarRow } from './TwoColSidebarRow';
import type { TwoColSidebarSectionProps } from '../../../types/layout-components';

export function TwoColSidebarSection(props: TwoColSidebarSectionProps) {
  const co = props.colorOverrides;

  const headerStyle = co?.sectionHeaderBg
    ? { backgroundColor: co.sectionHeaderBg, color: co.sectionHeaderText ?? '#fff' }
    : undefined;

  const headerClass = headerStyle
    ? 'px-1.5 py-1 text-[8px] font-semibold uppercase tracking-wide'
    : 'px-1.5 text-[8px] font-semibold uppercase tracking-wide text-ios-gray';

  return (
    <section className="space-y-1">
      {props.section.header ? <h2 className={headerClass} style={headerStyle}>{props.section.header}</h2> : null}
      <div className="space-y-1">
        {props.section.rows.map((row) => {
          const selected = props.selectedRowId === row.id;
          const renderedRow = props.renderRow?.(row, props.section.id, selected, props.onSelect);

          if (renderedRow) return <div key={row.id}>{renderedRow}</div>;

          return (
            <TwoColSidebarRow
              key={row.id}
              row={row}
              theme={props.theme}
              leading={props.renderRowLeading?.(row, props.section.id)}
              trailing={props.renderRowTrailing?.(row, props.section.id)}
              selected={selected}
              colorOverrides={co}
              onSelect={props.onSelect}
            />
          );
        })}
      </div>
    </section>
  );
}
