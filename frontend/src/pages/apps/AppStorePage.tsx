import { MediaSurfaceLayout, MediaTopBar, OneColLayout, OneColMediaGallery, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { APPSTORE_BOTTOM_GALLERY_ITEMS, APPSTORE_GALLERY_ITEMS, APPSTORE_HERO, APPSTORE_IPHONE_SECTIONS, APPSTORE_MEDIA_SECTIONS, APPSTORE_SIDEBAR, APPSTORE_TABS } from '../../constants/apps/appstore-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { AppStorePageProps } from '../../types/app-pages';

export function AppStorePage(props: AppStorePageProps) {
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
          toolbar={{ title: 'App Store', leadingLabel: 'Back' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Featured" items={APPSTORE_GALLERY_ITEMS} columns={3} compact />}
          sections={APPSTORE_IPHONE_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Top Charts" items={APPSTORE_BOTTOM_GALLERY_ITEMS} />}
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
        sidebar={APPSTORE_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="App Store" tabs={APPSTORE_TABS} activeTabId={selectedRowId} onTabSelect={setSelectedRowId} />}
        detail={{ sections: [], content: <MediaSurfaceLayout theme={props.theme} title="App Store" tabs={APPSTORE_TABS} activeTabId={selectedRowId} heroTitle={APPSTORE_HERO.title} heroSubtitle={APPSTORE_HERO.subtitle} sections={APPSTORE_MEDIA_SECTIONS} onTabSelect={setSelectedRowId} /> }}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
      />
    </AppPageShell>
  );
}
