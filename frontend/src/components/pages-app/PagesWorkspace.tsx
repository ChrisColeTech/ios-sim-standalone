import { LuChevronLeft } from 'react-icons/lu';
import { TwoColLayout } from '../layout';
import { AppPageShell } from '../layout/shared/AppPageShell';
import { PAGES_DOCUMENT_PAGES, PAGES_DOCUMENT_TITLE, PAGES_TOOLBAR_ACTIONS } from '../../constants/apps/pages-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { PagesWorkspaceProps } from '../../types/app-pages';

export function PagesWorkspace(props: PagesWorkspaceProps) {
  const { selectedRowId: selectedPage, setSelectedRowId: setSelectedPage } = useSelectionState('page-1');

  return (
    <AppPageShell backgroundClassName={props.isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}>
      <TwoColLayout
        theme={props.theme}
        toolbarLeading={
          <button className={`flex h-4 w-4 items-center justify-center rounded-full border-0 p-0 ${props.isDark ? 'bg-white/12 text-white hover:bg-white/18' : 'bg-black/5 text-black hover:bg-black/10'}`} onClick={props.onBack} type="button">
            <LuChevronLeft className="h-2.5 w-2.5" />
          </button>
        }
        toolbarTitle={PAGES_DOCUMENT_TITLE}
        sidebar={{
          sections: [{
            id: 'pages',
            rows: PAGES_DOCUMENT_PAGES.map((p) => ({ id: p.id, title: `Page ${p.label}` }))
          }]
        }}
        renderSidebarRow={(row, _sectionId, selected, onSelect) => (
          <button
            key={row.id}
            className={`w-full border-0 bg-transparent p-0.5 text-left ${selected ? 'opacity-100' : 'opacity-70'}`}
            onClick={() => onSelect(row.id)}
            type="button"
          >
            <div className={`aspect-[3/4] rounded border ${selected ? (props.isDark ? 'border-white/50' : 'border-black/30') : (props.isDark ? 'border-white/15' : 'border-black/10')} ${props.isDark ? 'bg-ios-surface' : 'bg-white'}`} />
            <p className={`pt-0.5 text-center text-[6px] ${props.isDark ? 'text-white/50' : 'text-black/45'}`}>{row.title?.replace('Page ', '')}</p>
          </button>
        )}
        selectedSidebarRowId={selectedPage}
        onSidebarSelect={setSelectedPage}
        detail={{
          toolbarActions: PAGES_TOOLBAR_ACTIONS,
          content: (
            <div className={`flex h-full items-center justify-center ${props.isDark ? 'text-white' : 'text-black'}`}>
              <div className="aspect-[3/4] h-[90%] overflow-hidden rounded-lg border border-white/15 bg-white">
                <div className="flex h-full flex-col items-center justify-center px-4">
                  <p className="text-[24px] font-bold text-amber-700">Workshop</p>
                  <p className="text-[18px] font-semibold text-amber-900/70">Woodcrafts</p>
                </div>
              </div>
            </div>
          )
        }}
      />
    </AppPageShell>
  );
}
