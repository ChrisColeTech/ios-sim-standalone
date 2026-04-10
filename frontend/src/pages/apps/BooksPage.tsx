import { MediaSurfaceLayout, MediaTopBar, OneColLayout, OneColMediaGallery, OneColPlaybackBar, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { BOOKS_FILTER_PILLS, BOOKS_GALLERY_ITEMS, BOOKS_BOTTOM_GALLERY_ITEMS, BOOKS_HERO, BOOKS_SIDEBAR, BOOKS_TABS } from '../../constants/apps/books-layout';
import { BOOKS_IPHONE_SECTIONS, BOOKS_MEDIA_SECTIONS } from '../../constants/apps/media-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { BooksPageProps } from '../../types/app-pages';

export function BooksPage(props: BooksPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('reading-now');

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
          toolbar={{ title: 'Books', leadingLabel: 'Back' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Reading Now" items={BOOKS_GALLERY_ITEMS} columns={3} compact />}
          sections={BOOKS_IPHONE_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Want to Read" items={BOOKS_BOTTOM_GALLERY_ITEMS} />}
          floatingBar={<OneColPlaybackBar theme={props.theme} title="Atomic Habits" artist="James Clear" />}
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
        sidebar={BOOKS_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="Books" tabs={BOOKS_TABS} activeTabId={selectedRowId} onTabSelect={setSelectedRowId} />}
        detail={{ sections: [], content: <MediaSurfaceLayout theme={props.theme} title="Books" tabs={BOOKS_TABS} activeTabId={selectedRowId} headerTitle="Book Store" filterPills={BOOKS_FILTER_PILLS} heroTitle={BOOKS_HERO.title} heroSubtitle={BOOKS_HERO.subtitle} sections={BOOKS_MEDIA_SECTIONS} onTabSelect={setSelectedRowId} /> }}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
        floatingBar={<OneColPlaybackBar theme={props.theme} title="Atomic Habits" artist="James Clear" />}
      />
    </AppPageShell>
  );
}
