import { EditingWorkspaceLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { EDITING_COMMON_TOOLS, getEditingLayoutConfig } from '../../constants/apps/editing-layout';
import type { EditingPageProps } from '../../types/app-pages';

export function EditingPage(props: EditingPageProps) {
  const config = getEditingLayoutConfig(props.appId);

  return (
    <AppPageShell
      backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <EditingWorkspaceLayout
        theme={props.theme}
        documentTitle={config.title}
        sidebarItems={config.sidebar}
        tools={EDITING_COMMON_TOOLS}
        floatingPanelTitle={config.panel}
      />
    </AppPageShell>
  );
}
