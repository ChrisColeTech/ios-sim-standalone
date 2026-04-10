import { MediaSurfaceLayout, MediaTopBar, OneColLayout, OneColMediaGallery, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { NEWS_FILTER_PILLS, NEWS_GALLERY_ITEMS, NEWS_BOTTOM_GALLERY_ITEMS, NEWS_HERO, NEWS_SIDEBAR, NEWS_TABS } from '../../constants/apps/news-layout';
import { NEWS_IPHONE_SECTIONS, NEWS_MEDIA_SECTIONS } from '../../constants/apps/media-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { NewsPageProps } from '../../types/app-pages';

export function NewsPage(props: NewsPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('today');

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
          toolbar={{ title: 'News', leadingLabel: 'Back' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Top Stories" items={NEWS_GALLERY_ITEMS} columns={3} compact />}
          sections={NEWS_IPHONE_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Following" items={NEWS_BOTTOM_GALLERY_ITEMS} />}
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
        sidebar={NEWS_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="News" tabs={NEWS_TABS} activeTabId={selectedRowId} onTabSelect={setSelectedRowId} />}
        detail={{ sections: [], content: <MediaSurfaceLayout theme={props.theme} title="News" tabs={NEWS_TABS} activeTabId={selectedRowId} headerTitle="News+ Discover" filterPills={NEWS_FILTER_PILLS} heroTitle={NEWS_HERO.title} heroSubtitle={NEWS_HERO.subtitle} sections={NEWS_MEDIA_SECTIONS} onTabSelect={setSelectedRowId} /> }}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
      />
    </AppPageShell>
  );
}
