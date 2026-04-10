import { LuEllipsis, LuMaximize2, LuPenLine, LuPlus, LuRedo2, LuSearch, LuType, LuList, LuGrid2X2, LuUndo2 } from 'react-icons/lu';
import { OneColLayout, ThreeColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import {
  NOTES_BODY_BY_ID,
  NOTES_ONE_COL_CONFIG,
  NOTES_THREE_COL_MIDDLE,
  NOTES_THREE_COL_PRIMARY
} from '../../constants/apps/notes-layout';

const NOTES_TOOLBAR_ACTIONS = [
  { id: 'more', label: '...', icon: <LuEllipsis className="h-2.5 w-2.5" /> },
  { id: 'resize', label: 'Resize', icon: <LuMaximize2 className="h-2.5 w-2.5" /> },
  { id: 'compose', label: 'Compose', icon: <LuPenLine className="h-2.5 w-2.5" /> },
  { id: 'undo', label: 'Undo', icon: <LuUndo2 className="h-2.5 w-2.5" /> },
  { id: 'format', label: 'Aa', icon: <LuType className="h-2.5 w-2.5" /> },
  { id: 'checklist', label: 'List', icon: <LuList className="h-2.5 w-2.5" /> },
  { id: 'grid', label: 'Grid', icon: <LuGrid2X2 className="h-2.5 w-2.5" /> },
  { id: 'search', label: 'Search', icon: <LuSearch className="h-2.5 w-2.5" /> }
];
import { useNotesPageState } from '../../hooks/useNotesPageState';
import type { NotesPageProps } from '../../types/components';

const TOOL_COLORS = ['#8B7355', '#555555', '#333333', '#2563eb', '#dc2626', '#dc2626', '#888888', '#555555'];
const PALETTE_COLORS = ['#ffffff', '#2563eb', '#22c55e', '#eab308', '#dc2626', '#f59e0b'];

function NotesMarkupBar(props: { isDark: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 shadow-lg backdrop-blur-xl ring-1 ${props.isDark ? 'bg-ios-surface/85 text-white ring-white/15' : 'bg-ios-gray-light/90 text-black ring-black/10'}`}>
      <button className={`flex h-4 w-4 p-0 items-center justify-center border-0 bg-transparent ${props.isDark ? 'text-white/70' : 'text-ios-gray'}`} type="button"><LuUndo2 className="h-2.5 w-2.5" /></button>
      <button className={`flex h-4 w-4 p-0 items-center justify-center border-0 bg-transparent ${props.isDark ? 'text-white/70' : 'text-ios-gray'}`} type="button"><LuRedo2 className="h-2.5 w-2.5" /></button>
      <div className={`h-4 w-px ${props.isDark ? 'bg-ios-separator' : 'bg-ios-separator-light'}`} />
      {TOOL_COLORS.map((color, i) => (
        <div key={i} className="flex h-4 w-1.5 items-end justify-center">
          <div className="w-1 rounded-full" style={{ backgroundColor: color, height: `${10 + i * 1.5}px` }} />
        </div>
      ))}
      <div className={`h-4 w-px ${props.isDark ? 'bg-ios-separator' : 'bg-ios-separator-light'}`} />
      {PALETTE_COLORS.map((color) => (
        <div key={color} className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: color }} />
      ))}
      <div className={`h-4 w-px ${props.isDark ? 'bg-ios-separator' : 'bg-ios-separator-light'}`} />
      <button className={`flex h-4 w-4 p-0 items-center justify-center border-0 bg-transparent ${props.isDark ? 'text-white/70' : 'text-ios-gray'}`} type="button"><LuPlus className="h-2.5 w-2.5" /></button>
      <button className={`flex h-4 w-4 p-0 items-center justify-center border-0 bg-transparent ${props.isDark ? 'text-white/70' : 'text-ios-gray'}`} type="button"><LuEllipsis className="h-2.5 w-2.5" /></button>
    </div>
  );
}

export function NotesPage(props: NotesPageProps) {
  const notes = useNotesPageState();

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={NOTES_ONE_COL_CONFIG.toolbar}
          searchPlaceholder={NOTES_ONE_COL_CONFIG.searchPlaceholder}
          sections={NOTES_ONE_COL_CONFIG.sections}
        />
      </AppPageShell>
    );
  }

  return (
    <AppPageShell
      backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <ThreeColLayout
        theme={props.theme}
        primary={NOTES_THREE_COL_PRIMARY}
        middle={NOTES_THREE_COL_MIDDLE}
        toolbarTitle="Notes"
        toolbarSubtitle="57 Notes"
        floatingBar={<NotesMarkupBar isDark={props.theme === 'dark'} />}
        detail={{
          ...notes.selectedDetail,
          title: undefined,
          subtitle: undefined,
          sections: undefined,
          actions: NOTES_TOOLBAR_ACTIONS,
          content: (
            <textarea
              className={`h-full w-full resize-none border-0 bg-transparent px-0 py-1 text-[11px] leading-4 focus:outline-none ${props.theme === 'dark' ? 'text-white placeholder:text-white/35' : 'text-black placeholder:text-black/35'}`}
              defaultValue={NOTES_BODY_BY_ID[notes.selectedMiddleRowId] ?? NOTES_BODY_BY_ID['m-1']}
              placeholder="Start writing"
            />
          )
        }}
        selectedPrimaryRowId={notes.selectedPrimaryRowId}
        selectedMiddleRowId={notes.selectedMiddleRowId}
        onPrimarySelect={notes.setSelectedPrimaryRowId}
        onMiddleSelect={notes.setSelectedMiddleRowId}
      />
    </AppPageShell>
  );
}
