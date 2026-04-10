import { LuChevronLeft } from 'react-icons/lu';
import { TwoColLayout } from '../layout';
import { AppPageShell } from '../layout/shared/AppPageShell';
import { KEYNOTE_DOCUMENT_TITLE, KEYNOTE_SLIDES, KEYNOTE_TOOLBAR_ACTIONS } from '../../constants/apps/keynote-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { KeynoteWorkspaceProps } from '../../types/app-pages';

export function KeynoteWorkspace(props: KeynoteWorkspaceProps) {
  const { selectedRowId: selectedSlide, setSelectedRowId: setSelectedSlide } = useSelectionState('slide-1');

  return (
    <AppPageShell backgroundClassName={props.isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}>
      <TwoColLayout
        theme={props.theme}
        toolbarLeading={
          <button className={`flex h-4 w-4 items-center justify-center rounded-full border-0 p-0 ${props.isDark ? 'bg-white/12 text-white hover:bg-white/18' : 'bg-black/5 text-black hover:bg-black/10'}`} onClick={props.onBack} type="button">
            <LuChevronLeft className="h-2.5 w-2.5" />
          </button>
        }
        toolbarTitle={KEYNOTE_DOCUMENT_TITLE}
        sidebar={{
          sections: [{
            id: 'slides',
            rows: KEYNOTE_SLIDES.map((s) => ({ id: s.id, title: `Slide ${s.label}` }))
          }]
        }}
        renderSidebarRow={(row, _sectionId, selected, onSelect) => (
          <button
            key={row.id}
            className={`w-full border-0 bg-transparent p-0.5 text-left ${selected ? 'opacity-100' : 'opacity-70'}`}
            onClick={() => onSelect(row.id)}
            type="button"
          >
            <div className={`aspect-[16/10] rounded border ${selected ? (props.isDark ? 'border-white/50' : 'border-black/30') : (props.isDark ? 'border-white/15' : 'border-black/10')} ${props.isDark ? 'bg-ios-surface' : 'bg-white'}`} />
            <p className={`pt-0.5 text-center text-[6px] ${props.isDark ? 'text-white/50' : 'text-black/45'}`}>{row.title?.replace('Slide ', '')}</p>
          </button>
        )}
        selectedSidebarRowId={selectedSlide}
        onSidebarSelect={setSelectedSlide}
        detail={{
          toolbarActions: KEYNOTE_TOOLBAR_ACTIONS,
          content: (
            <div className={`flex h-full items-center justify-center ${props.isDark ? 'text-white' : 'text-black'}`}>
              <div className="aspect-[16/10] w-[85%] overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br from-sky-900 via-blue-950 to-slate-900">
                <div className="flex h-full items-center justify-center">
                  <p className="text-[20px] font-bold tracking-wider text-white/90">SURF SHOP</p>
                </div>
              </div>
            </div>
          )
        }}
      />
    </AppPageShell>
  );
}
