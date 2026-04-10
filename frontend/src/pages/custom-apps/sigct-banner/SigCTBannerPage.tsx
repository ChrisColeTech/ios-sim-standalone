import { AppPageShell } from '../../../components/layout/shared/AppPageShell';
import { useSigCTOrchestrator } from '../../../hooks/useSigCTOrchestrator';
import { useSigCTOAuthWebView } from '../../../hooks/useSigCTOAuthWebView';
import { SIGCT_OAUTH } from '../../../constants/custom-apps/sigct-banner';
import { useCallback, useState } from 'react';
import { SigCTLoginScreen } from './screens/SigCTLoginScreen';
import { SigCTOAuthScreen } from './screens/SigCTOAuthScreen';
import { SigCTHomeMenuScreen } from './screens/SigCTHomeMenuScreen';
import { SigCTDSCMenuScreen } from './screens/SigCTDSCMenuScreen';
import { IOSAlert } from '../../../components/ui/IOSAlert';
import type { SigCTBannerPageProps, SigCTScreen } from '../../../types/custom-apps/sigct-banner';

export function SigCTBannerPage(props: SigCTBannerPageProps) {
  const o = useSigCTOrchestrator();
  const isDark = props.theme === 'dark';
  const screen = o.nav.currentScreen;
  const bgClass = isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light';

  // Track which sidebar row is selected (for iPad detail pane)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [detailTitle, setDetailTitle] = useState<string | undefined>(undefined);

  // Screens that should navigate away (replace the whole view) rather than swap the detail pane
  const NAVIGATE_SCREENS: SigCTScreen[] = ['dsc-menu', 'store-locator', 'dsc-locator', 'alerts', 'help', 'about'];

  const handleSidebarSelect = useCallback((scr: SigCTScreen, title?: string) => {
    if (props.deviceFamily === 'ipad' && !NAVIGATE_SCREENS.includes(scr)) {
      // On iPad, selecting a sidebar row swaps the detail content
      setSelectedRowId(scr);
      setDetailTitle(title);
    } else {
      // Navigate to a new screen
      setSelectedRowId(null);
      setDetailTitle(undefined);
      o.handleMenuSelect(scr, title);
    }
  }, [props.deviceFamily, o]);

  // Build detail content based on selected sidebar row
  const detailContent = selectedRowId ? (
    <div className={`flex h-full flex-col items-center justify-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
      <span className="text-[11px] font-semibold">{detailTitle ?? selectedRowId}</span>
      <span className="text-[9px] opacity-50">Content coming soon</span>
    </div>
  ) : undefined;

  const webview = useSigCTOAuthWebView({
    authUrl: o.auth.oauthUrl ?? '',
    redirectPrefix: SIGCT_OAUTH.redirectUri,
    onAuthCode: o.handleAuthCode,
    onCancel: o.auth.cancelOAuth,
  });

  if (o.auth.oauthUrl) {
    return (
      <AppPageShell backgroundClassName={bgClass}>
        <SigCTOAuthScreen
          authUrl={o.auth.oauthUrl} redirectPrefix={SIGCT_OAUTH.redirectUri}
          isDark={isDark} onAuthCode={o.handleAuthCode} onCancel={o.auth.cancelOAuth}
          webviewRef={webview.webviewRef} isLoading={webview.isLoading}
          currentUrl={webview.currentUrl} reload={webview.reload}
          goBack={webview.goBack} goForward={webview.goForward}
        />
      </AppPageShell>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
      case 'oauth':
        return <SigCTLoginScreen isLoading={o.auth.isLoading} showLogin={screen === 'oauth'} onOAuthStart={o.handleOAuthStart} />;

      case 'home-menu':
        return (
          <SigCTHomeMenuScreen
            isStore={o.auth.isStore} isRepair={o.auth.isRepair}
            alertCount={0} isDark={isDark} theme={props.theme}
            deviceFamily={props.deviceFamily}
            selectedSidebarRowId={selectedRowId}
            detailContent={detailContent}
            detailTitle={detailTitle}
            onSelect={handleSidebarSelect}
            onLogout={o.handleLogout}
          />
        );

      case 'dsc-menu':
        return (
          <SigCTDSCMenuScreen
            isDark={isDark} theme={props.theme}
            deviceFamily={props.deviceFamily}
            selectedSidebarRowId={selectedRowId}
            detailContent={detailContent}
            detailTitle={detailTitle}
            onSelect={handleSidebarSelect}
            onBack={() => { setSelectedRowId(null); setDetailTitle(undefined); o.nav.goBack(); }}
          />
        );

      default:
        return (
          <div className={`flex h-full flex-col items-center justify-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <span className="text-[11px] font-semibold">{o.nav.screenTitle ?? screen}</span>
            <button
              className={`rounded-lg px-3 py-1 text-[9px] ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
              onClick={() => o.nav.goBack()}
              type="button"
            >
              ‹ Back
            </button>
          </div>
        );
    }
  };

  return (
    <AppPageShell backgroundClassName={bgClass}>
      <div className="relative h-full w-full overflow-hidden">
        {renderScreen()}
      </div>
      <IOSAlert
        open={!!webview.alertMessage}
        title="SigCT"
        message={webview.alertMessage ?? undefined}
        onClose={webview.dismissAlert}
      />
    </AppPageShell>
  );
}
