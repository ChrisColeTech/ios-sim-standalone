import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { SafariBrowserLayout } from '../../components/layout/safari/SafariBrowserLayout';
import { SafariAddressBar } from '../../components/safari/SafariAddressBar';
import { SafariBottomBar } from '../../components/safari/SafariBottomBar';
import { SafariNewTabPage } from '../../components/safari/SafariNewTabPage';
import { useSafariNavigation } from '../../hooks/useSafariNavigation';
import type { SafariPageProps } from '../../types/app-pages';

export function SafariPage(props: SafariPageProps) {
  const isDark = props.theme === 'dark';
  const { url, favorites, recents, webviewRef, navigate, reload, goBack, goForward, newTab } = useSafariNavigation();
  const isNewTab = !url;

  return (
    <AppPageShell backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-white'}>
      <SafariBrowserLayout
        theme={props.theme}
        addressBarContent={<SafariAddressBar isDark={isDark} url={url} onNavigate={navigate} onReload={reload} onNewTab={newTab} />}
        floatingBar={<SafariBottomBar isDark={isDark} onBack={goBack} onForward={goForward} onNewTab={newTab} />}
      >
        {isNewTab ? (
          <SafariNewTabPage isDark={isDark} favorites={favorites} recents={recents} onNavigate={navigate} />
        ) : (
          <webview ref={webviewRef} src={url} className="h-full w-full" />
        )}
      </SafariBrowserLayout>
    </AppPageShell>
  );
}
