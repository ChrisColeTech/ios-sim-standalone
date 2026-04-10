import { LuPanelLeft } from 'react-icons/lu';
import { TwoColDetail } from './TwoColDetail';
import { TwoColSidebar } from './TwoColSidebar';
import { TwoColToolbarButton } from './TwoColToolbarButton';
import { useSidebarCollapse } from '../../../hooks/useSidebarCollapse';
import type { TwoColLayoutProps } from '../../../types/layouts';

export function TwoColLayout(props: TwoColLayoutProps) {
  const sidebar = useSidebarCollapse();
  const isDark = props.theme === 'dark';
  const isImmersive = props.presentation === 'immersive';

  const hasToolbar = props.toolbarTitle || props.toolbarContent || props.toolbarLeading || props.detail.toolbarActions?.length;

  return (
    <section className={`flex h-full min-h-0 gap-1 p-1 ${props.backgroundClassName ?? (isDark ? 'bg-ios-gray-dark text-white' : 'bg-ios-gray-light text-black')}`}>
      {/* Sidebar */}
      {!sidebar.isCollapsed && (
        <div className="shrink-0 w-[clamp(140px,28%,200px)]">
          <TwoColSidebar
            theme={props.theme}
            className={props.sidebarClassName}
            sidebar={props.sidebar}
            topContent={props.sidebarTopContent}
            colorOverrides={props.colorOverrides}
            renderRow={props.renderSidebarRow}
            renderRowLeading={props.renderSidebarRowLeading}
            renderRowTrailing={props.renderSidebarRowTrailing}
            selectedRowId={props.selectedSidebarRowId}
            onSelect={props.onSidebarSelect}
            onToggleCollapse={() => sidebar.collapse()}
          />
        </div>
      )}

      {/* Content area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Toolbar */}
        {hasToolbar ? (
          <div className="flex h-5 shrink-0 items-center justify-center px-3">
            {props.toolbarContent ? (
              <div className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 ring-1 ${isDark ? 'bg-ios-surface ring-white/15' : 'bg-white ring-black/10 shadow-sm shadow-black/8'}`}>
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
            ) : (
              <div className="flex flex-1 items-center gap-1">
                {sidebar.isCollapsed && (
                  <button
                    className={`flex h-4 w-4 p-0 appearance-none items-center justify-center border-0 bg-transparent ${isDark ? 'text-white/70 hover:text-white' : 'text-ios-gray hover:text-black'}`}
                    onClick={() => sidebar.expand()}
                    type="button"
                  >
                    <LuPanelLeft className="h-2.5 w-2.5" />
                  </button>
                )}
                {props.toolbarLeading && <div className="shrink-0">{props.toolbarLeading}</div>}
                {props.toolbarTitle && (
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-[11px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{props.toolbarTitle}</span>
                    {props.toolbarSubtitle && <span className={`text-[9px] ${isDark ? 'text-white/70' : 'text-ios-gray'}`}>{props.toolbarSubtitle}</span>}
                  </div>
                )}
                <div className="flex flex-1 items-center justify-end gap-1">
                  {props.detail.toolbarActions?.map((action) => (
                    <TwoColToolbarButton key={action.id} action={action} theme={props.theme} onAction={props.onToolbarAction} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : sidebar.isCollapsed ? (
          <div className="flex h-5 shrink-0 items-center px-3">
            <button
              className={`flex h-4 w-4 p-0 appearance-none items-center justify-center border-0 bg-transparent ${isDark ? 'text-white/70 hover:text-white' : 'text-ios-gray hover:text-black'}`}
              onClick={() => sidebar.expand()}
              type="button"
            >
              <LuPanelLeft className="h-2.5 w-2.5" />
            </button>
          </div>
        ) : null}

        {/* Detail */}
        <div className={`relative min-h-0 flex-1 ${isImmersive ? '' : 'px-1 pb-1'}`}>
          <TwoColDetail
            theme={props.theme}
            presentation={props.presentation}
            detail={props.detail}
            renderRowLeading={props.renderDetailRowLeading}
            renderRowTrailing={props.renderDetailRowTrailing}
            onToolbarAction={props.onToolbarAction}
            onRowSelect={props.onDetailRowSelect}
          />
          {props.floatingBar && (
            <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center px-3">
              <div className="pointer-events-auto w-full max-w-2xl">{props.floatingBar}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
