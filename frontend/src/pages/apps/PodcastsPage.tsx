import { MediaSurfaceLayout, MediaTopBar, OneColLayout, OneColMediaGallery, OneColPlaybackBar, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { PODCASTS_FILTER_PILLS, PODCASTS_GALLERY_ITEMS, PODCASTS_BOTTOM_GALLERY_ITEMS, PODCASTS_HERO, PODCASTS_LIBRARY_SECTIONS, PODCASTS_MEDIA_SECTIONS, PODCASTS_TABS, PODCASTS_TWO_COL_SIDEBAR } from '../../constants/apps/podcasts-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { PodcastsPageProps } from '../../types/components';

export function PodcastsPage(props: PodcastsPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('listen-now');

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          variant="media"
          toolbar={{ title: 'Library', leadingLabel: 'Podcasts' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Shows" items={PODCASTS_GALLERY_ITEMS} columns={3} compact />}
          sections={PODCASTS_LIBRARY_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Recently Played" items={PODCASTS_BOTTOM_GALLERY_ITEMS} />}
          floatingBar={<OneColPlaybackBar theme={props.theme} title="The Daily" artist="The New York Times" />}
        />
      </AppPageShell>
    );
  }

  return (
    <AppPageShell
      backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <TwoColLayout
        theme={props.theme}
        presentation="immersive"
        sidebar={PODCASTS_TWO_COL_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="Podcasts" tabs={PODCASTS_TABS} activeTabId={selectedRowId} onTabSelect={setSelectedRowId} />}
        detail={{ sections: [], content: <MediaSurfaceLayout theme={props.theme} title="Podcasts" tabs={PODCASTS_TABS} activeTabId={selectedRowId} headerTitle="Listen Now" filterPills={PODCASTS_FILTER_PILLS} heroTitle={PODCASTS_HERO.title} heroSubtitle={PODCASTS_HERO.subtitle} sections={PODCASTS_MEDIA_SECTIONS} onTabSelect={setSelectedRowId} /> }}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
        floatingBar={<OneColPlaybackBar theme={props.theme} title="The Daily" artist="The New York Times" />}
      />
    </AppPageShell>
  );
}
