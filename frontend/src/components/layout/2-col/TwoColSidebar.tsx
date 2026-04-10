import { TwoColSidebarSection } from './TwoColSidebarSection';
import { LuPanelLeft } from 'react-icons/lu';
import type { TwoColSidebarProps } from '../../../types/layout-components';

export function TwoColSidebar(props: TwoColSidebarProps) {
  const isDark = props.theme === 'dark';

  const defaultBg = isDark
    ? 'bg-ios-gray-dark/95 shadow-lg ring-1 ring-ios-separator'
    : 'bg-ios-gray-light/95 shadow-sm shadow-black/8 ring-1 ring-ios-separator-light';

  return (
    <aside className={`@container flex h-full min-h-0 flex-col overflow-hidden rounded-xl p-1.5 backdrop-blur-sm ${props.className ?? defaultBg}`}>
      <div className="flex justify-end pb-0.5">
        <button
          className={`flex h-5 w-5 appearance-none items-center justify-center border-0 bg-transparent p-0 ${isDark ? 'text-white/70 hover:text-white' : 'text-ios-gray hover:text-black'}`}
          onClick={props.onToggleCollapse}
          type="button"
        >
          <LuPanelLeft aria-hidden="true" className="h-3 w-3" />
        </button>
      </div>
      {props.topContent ? <div className="px-1 pb-2">{props.topContent}</div> : null}
      <div className="min-h-0 flex-1 space-y-2 overflow-auto">
        {props.sidebar.sections.map((section) => (
          <TwoColSidebarSection
            key={section.id}
            section={section}
            theme={props.theme}
            colorOverrides={props.colorOverrides}
            renderRow={props.renderRow}
            renderRowLeading={props.renderRowLeading}
            renderRowTrailing={props.renderRowTrailing}
            selectedRowId={props.selectedRowId}
            onSelect={props.onSelect}
          />
        ))}
      </div>
    </aside>
  );
}
