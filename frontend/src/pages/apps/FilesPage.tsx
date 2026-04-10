import { LuFileText, LuFolder } from 'react-icons/lu';
import { MediaTopBar, OneColLayout, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { FILES_DETAIL_LIST_BY_ROW } from '../../constants/apps/files-detail-data';
import { FILES_ONE_COL_CONFIG, FILES_TABS, FILES_TWO_COL_DETAIL_BY_ROW, FILES_TWO_COL_SIDEBAR } from '../../constants/apps/files-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { FilesPageProps } from '../../types/components';

export function FilesPage(props: FilesPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('icloud-drive');
  const isDark = props.theme === 'dark';
  const selectedDetail = FILES_TWO_COL_DETAIL_BY_ROW[selectedRowId] ?? FILES_TWO_COL_DETAIL_BY_ROW['icloud-drive'];
  const selectedItems = FILES_DETAIL_LIST_BY_ROW[selectedRowId] ?? FILES_DETAIL_LIST_BY_ROW['icloud-drive'];

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={FILES_ONE_COL_CONFIG.toolbar}
          searchPlaceholder={FILES_ONE_COL_CONFIG.searchPlaceholder}
          sections={FILES_ONE_COL_CONFIG.sections}
          onRowSelect={(_sectionId, rowId) => setSelectedRowId(rowId)}
        />
      </AppPageShell>
    );
  }

  return (
    <AppPageShell
      backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <TwoColLayout
        theme={props.theme}
        presentation="immersive"
        toolbarContent={<MediaTopBar theme={props.theme} title="Files" tabs={FILES_TABS} activeTabId="browse" />}
        sidebar={FILES_TWO_COL_SIDEBAR}
        detail={{
          ...selectedDetail,
          sections: [],
          content: (
            <div className={`overflow-hidden rounded-lg border ${isDark ? 'border-white/10 bg-ios-gray-dark/80' : 'border-black/10 bg-white/95'}`}>
              <div
                className={`grid grid-cols-[minmax(0,1fr)_70px_45px] gap-1 border-b px-2 py-1 text-[8px] font-semibold uppercase tracking-wide ${isDark ? 'border-white/10 text-ios-gray' : 'border-black/10 text-ios-gray'}`}
              >
                <span>Name</span>
                <span>Date</span>
                <span className="text-right">Size</span>
              </div>
              <div>
                {selectedItems.map((item) => (
                  <button
                    key={item.id}
                    className={`grid w-full grid-cols-[minmax(0,1fr)_70px_45px] items-center gap-1 border-b px-2 py-0.5 text-left last:border-b-0 ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                    type="button"
                  >
                    <span className="flex min-w-0 items-center gap-1">
                      <span className={isDark ? 'text-white' : 'text-black'}>
                        {item.kind === 'folder' ? <LuFolder className="h-3 w-3" /> : <LuFileText className="h-3 w-3" />}
                      </span>
                      <span className={`min-w-0 text-[10px] ${isDark ? 'text-white' : 'text-black'}`}>{item.name}</span>
                    </span>
                    <span className={`text-[9px] text-ios-gray`}>{item.date}</span>
                    <span className={`text-right text-[9px] text-ios-gray`}>{item.size}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        }}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
      />
    </AppPageShell>
  );
}
