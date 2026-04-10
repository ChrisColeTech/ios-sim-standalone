import { OneColLayout, OneColMediaGallery } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { PagesTemplatePicker } from '../../components/pages-app/PagesTemplatePicker';
import { PagesWorkspace } from '../../components/pages-app/PagesWorkspace';
import { PAGES_GALLERY_ITEMS, PAGES_IPHONE_SECTIONS, PAGES_RECENT_ITEMS } from '../../constants/apps/pages-layout';
import { useEditorMode } from '../../hooks/useEditorMode';
import type { PagesAppPageProps } from '../../types/app-pages';

export function PagesAppPage(props: PagesAppPageProps) {
  const isDark = props.theme === 'dark';
  const { mode, openWorkspace, openPicker } = useEditorMode();

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}>
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          variant="media"
          toolbar={{ title: 'Pages', leadingLabel: 'Back' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Templates" items={PAGES_GALLERY_ITEMS} columns={3} compact />}
          sections={PAGES_IPHONE_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Recent" items={PAGES_RECENT_ITEMS} />}
        />
      </AppPageShell>
    );
  }

  if (mode === 'picker') return <PagesTemplatePicker isDark={isDark} theme={props.theme} onSelect={openWorkspace} />;
  return <PagesWorkspace isDark={isDark} theme={props.theme} onBack={openPicker} />;
}
