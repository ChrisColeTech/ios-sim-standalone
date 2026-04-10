import { LuPanelLeft } from 'react-icons/lu';
import { ThreeColPrimary } from './ThreeColPrimary';
import { ThreeColMiddle } from './ThreeColMiddle';
import { ThreeColDetail } from './ThreeColDetail';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import type { ThreeColLayoutProps } from '../../../types/layouts';

export function ThreeColLayout(props: ThreeColLayoutProps) {
  const sidebar = useSidebarCollapse();
  const isDark = props.theme === 'dark';

  return (
    <section className={`flex h-full min-h-0 p-1 ${isDark ? 'bg-ios-gray-dark text-white' : 'bg-ios-gray-light text-black'}`}>
      {/* Primary sidebar — gap via mr-1 */}
      {!sidebar.isCollapsed && (
        <div className="mr-1 shrink-0 w-[clamp(120px,20%,180px)]">
          <ThreeColPrimary
            theme={props.theme}
            primary={props.primary}
            renderRowLeading={props.renderPrimaryRowLeading}
            renderRowTrailing={props.renderPrimaryRowTrailing}
            selectedRowId={props.selectedPrimaryRowId}
            onSelect={props.onPrimarySelect}
            onToggleCollapse={() => sidebar.collapse()}
          />
        </div>
      )}

      {/* Middle column — has its own title row, border-right as divider */}
      <div className="shrink-0 w-[clamp(140px,25%,220px)]">
        <ThreeColMiddle
          theme={props.theme}
          middle={props.middle}
          title={props.toolbarTitle}
          subtitle={props.toolbarSubtitle}
          renderRowLeading={props.renderMiddleRowLeading}
          renderRowTrailing={props.renderMiddleRowTrailing}
          selectedRowId={props.selectedMiddleRowId}
          onSelect={props.onMiddleSelect}
        />
      </div>

      {/* Detail column — toolbar pill + content + floating bar */}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Toolbar pill or expand button */}
        <div className="flex h-5 shrink-0 items-center justify-center px-3">
          {props.toolbarContent ? (
            <div className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 ring-1 ${isDark ? 'bg-ios-surface ring-ios-separator' : 'bg-white ring-ios-separator-light shadow-sm'}`}>
              {sidebar.isCollapsed && (
                <button
                  className={`flex h-4 w-4 p-0 appearance-none items-center justify-center rounded-full border-0 bg-transparent ${isDark ? 'text-white/70 hover:text-white' : 'text-ios-gray hover:text-black'}`}
                  onClick={() => sidebar.expand()}
                  type="button"
                >
                  <LuPanelLeft className="h-2.5 w-2.5" />
                </button>
              )}
              {props.toolbarContent}
            </div>
          ) : sidebar.isCollapsed ? (
            <div className="flex flex-1 items-center">
              <button
                className={`flex h-4 w-4 p-0 appearance-none items-center justify-center border-0 bg-transparent ${isDark ? 'text-white/70 hover:text-white' : 'text-ios-gray hover:text-black'}`}
                onClick={() => sidebar.expand()}
                type="button"
              >
                <LuPanelLeft className="h-2.5 w-2.5" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="min-h-0 flex-1">
          <ThreeColDetail
            theme={props.theme}
            detail={props.detail}
            renderRowLeading={props.renderDetailRowLeading}
            renderRowTrailing={props.renderDetailRowTrailing}
            onRowSelect={props.onDetailRowSelect}
          />
        </div>

        {/* Floating bar */}
        {props.floatingBar && (
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center px-3">
            <div className="pointer-events-auto w-full max-w-2xl">{props.floatingBar}</div>
          </div>
        )}
      </div>
    </section>
  );
}
