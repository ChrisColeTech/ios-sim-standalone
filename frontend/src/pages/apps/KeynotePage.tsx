import { OneColLayout, OneColMediaGallery } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { KeynoteTemplatePicker } from '../../components/keynote/KeynoteTemplatePicker';
import { KeynoteWorkspace } from '../../components/keynote/KeynoteWorkspace';
import { KEYNOTE_GALLERY_ITEMS, KEYNOTE_IPHONE_SECTIONS, KEYNOTE_RECENT_ITEMS } from '../../constants/apps/keynote-layout';
import { useEditorMode } from '../../hooks/useEditorMode';
import type { KeynotePageProps } from '../../types/app-pages';

export function KeynotePage(props: KeynotePageProps) {
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
          toolbar={{ title: 'Keynote', leadingLabel: 'Back' }}
          topContent={<OneColMediaGallery theme={props.theme} title="Themes" items={KEYNOTE_GALLERY_ITEMS} columns={3} compact />}
          sections={KEYNOTE_IPHONE_SECTIONS}
          bottomContent={<OneColMediaGallery theme={props.theme} title="Recent" items={KEYNOTE_RECENT_ITEMS} />}
        />
      </AppPageShell>
    );
  }

  if (mode === 'picker') return <KeynoteTemplatePicker isDark={isDark} theme={props.theme} onSelect={openWorkspace} />;
  return <KeynoteWorkspace isDark={isDark} theme={props.theme} onBack={openPicker} />;
}
