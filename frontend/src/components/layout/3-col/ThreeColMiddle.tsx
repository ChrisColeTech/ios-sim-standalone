import { TwoColSidebarSection } from '../2-col/TwoColSidebarSection';
import type { ThreeColMiddleColumnProps } from '../../../types/layout-components';

export function ThreeColMiddle(props: ThreeColMiddleColumnProps & { title?: string; subtitle?: string }) {
  const isDark = props.theme === 'dark';

  return (
    <div className={`@container flex h-full min-h-0 flex-col overflow-hidden border-r ${isDark ? 'border-ios-separator' : 'border-ios-separator-light'}`}>
      {(props.title || props.middle.title) && (
        <div className="shrink-0 px-2 pt-1.5 pb-1">
          <span className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{props.title ?? props.middle.title}</span>
          {props.subtitle && (
            <span className={`ml-1 text-[9px] ${isDark ? 'text-ios-gray' : 'text-ios-gray'}`}>{props.subtitle}</span>
          )}
        </div>
      )}
      <div className="min-h-0 flex-1 space-y-2 overflow-auto p-1.5">
        {props.middle.sections.map((section) => (
          <TwoColSidebarSection
            key={section.id}
            section={section}
            theme={props.theme}
            selectedRowId={props.selectedRowId}
            onSelect={props.onSelect}
            renderRowLeading={props.renderRowLeading}
            renderRowTrailing={props.renderRowTrailing}
          />
        ))}
      </div>
    </div>
  );
}
