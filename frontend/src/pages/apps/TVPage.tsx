import { MediaSurfaceLayout, MediaTopBar, OneColLayout, OneColMediaGallery, OneColPlaybackBar, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { TV_GALLERY_ITEMS, TV_BOTTOM_GALLERY_ITEMS, TV_HERO, TV_SIDEBAR, TV_TABS } from '../../constants/apps/tv-layout';
import { TV_IPHONE_SECTIONS, TV_MEDIA_SECTIONS } from '../../constants/apps/media-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { TVPageProps } from '../../types/app-pages';

export function TVPage(props: TVPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('home');

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
          toolbar={{ title: 'TV', leadingLabel: 'Back' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Continue Watching" items={TV_GALLERY_ITEMS} columns={3} compact />}
          sections={TV_IPHONE_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Top Charts" items={TV_BOTTOM_GALLERY_ITEMS} />}
          floatingBar={<OneColPlaybackBar theme={props.theme} title="One Battle After Another" artist="Thriller · Action" />}
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
        sidebar={TV_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="TV" tabs={TV_TABS} activeTabId={selectedRowId} onTabSelect={setSelectedRowId} />}
        detail={{ sections: [], content: <MediaSurfaceLayout theme={props.theme} title="TV" tabs={TV_TABS} activeTabId={selectedRowId} heroTitle={TV_HERO.title} heroSubtitle={TV_HERO.subtitle} sections={TV_MEDIA_SECTIONS} onTabSelect={setSelectedRowId} /> }}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
        floatingBar={<OneColPlaybackBar theme={props.theme} title="One Battle After Another" artist="Thriller · Action" />}
      />
    </AppPageShell>
  );
}
