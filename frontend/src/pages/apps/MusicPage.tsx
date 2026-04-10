import { MediaSurfaceLayout, MediaTopBar, OneColLayout, OneColMediaGallery, OneColPlaybackBar, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { MUSIC_BOTTOM_GALLERY_ITEMS, MUSIC_GALLERY_ITEMS, MUSIC_HERO, MUSIC_LIBRARY_SECTIONS, MUSIC_MEDIA_SECTIONS, MUSIC_TABS, MUSIC_TWO_COL_SIDEBAR } from '../../constants/apps/music-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { MusicPageProps } from '../../types/components';

export function MusicPage(props: MusicPageProps) {
  const { selectedRowId: selectedLibraryRowId, setSelectedRowId: setSelectedLibraryRowId } = useSelectionState('listen-now');

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
          toolbar={{ title: 'Library', leadingLabel: 'Music' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Pinned" items={MUSIC_GALLERY_ITEMS} columns={3} compact />}
          sections={MUSIC_LIBRARY_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Recently Played" items={MUSIC_BOTTOM_GALLERY_ITEMS} />}
          floatingBar={<OneColPlaybackBar theme={props.theme} title="Everything I Wanted" artist="Billie Eilish" />}
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
        sidebar={MUSIC_TWO_COL_SIDEBAR}
        toolbarContent={<MediaTopBar theme={props.theme} title="Music" tabs={MUSIC_TABS} activeTabId={selectedLibraryRowId} onTabSelect={setSelectedLibraryRowId} />}
        detail={{ sections: [], content: <MediaSurfaceLayout theme={props.theme} title="Music" tabs={MUSIC_TABS} activeTabId={selectedLibraryRowId} heroTitle={MUSIC_HERO.title} heroSubtitle={MUSIC_HERO.subtitle} sections={MUSIC_MEDIA_SECTIONS} onTabSelect={setSelectedLibraryRowId} /> }}
        selectedSidebarRowId={selectedLibraryRowId}
        onSidebarSelect={setSelectedLibraryRowId}
        floatingBar={<OneColPlaybackBar theme={props.theme} title="Everything I Wanted" artist="Billie Eilish" />}
      />
    </AppPageShell>
  );
}
