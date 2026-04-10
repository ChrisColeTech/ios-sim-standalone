import { MediaSurfaceLayout, MediaTopBar, OneColLayout, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { CLOCK_HERO, CLOCK_MEDIA_SECTIONS, CLOCK_ONE_COL_CONFIG, CLOCK_TABS, CLOCK_SIDEBAR } from '../../constants/apps/clock-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { ClockPageProps } from '../../types/app-pages';

export function ClockPage(props: ClockPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('world-clock');
  const isDark = props.theme === 'dark';

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={CLOCK_ONE_COL_CONFIG.toolbar}
          searchPlaceholder={CLOCK_ONE_COL_CONFIG.searchPlaceholder}
          selectedRowId={selectedRowId}
          sections={CLOCK_ONE_COL_CONFIG.sections}
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
        sidebar={CLOCK_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="Clock" tabs={CLOCK_TABS} activeTabId={selectedRowId} onTabSelect={setSelectedRowId} />}
        detail={{ sections: [], content: <MediaSurfaceLayout theme={props.theme} title="Clock" tabs={CLOCK_TABS} activeTabId={selectedRowId} heroTitle={CLOCK_HERO.title} heroSubtitle={CLOCK_HERO.subtitle} sections={CLOCK_MEDIA_SECTIONS} onTabSelect={setSelectedRowId} /> }}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
      />
    </AppPageShell>
  );
}
