import { AppPageShell } from '../../../components/layout/shared/AppPageShell';
import { useSigCTOrchestrator } from '../../../hooks/useSigCTOrchestrator';
import { useSigCTOAuthWebView } from '../../../hooks/useSigCTOAuthWebView';
import { SIGCT_OAUTH } from '../../../constants/custom-apps/sigct-banner';
import { useCallback, useState } from 'react';
import { SigCTLoginScreen } from './screens/SigCTLoginScreen';
import { SigCTOAuthScreen } from './screens/SigCTOAuthScreen';
import { SigCTHomeMenuScreen } from './screens/SigCTHomeMenuScreen';
import { SigCTDSCMenuScreen } from './screens/SigCTDSCMenuScreen';
import { SigCTSigLiveScreen } from './screens/SigCTSigLiveScreen';
import { SigCTAnalyticsScreen } from './screens/SigCTAnalyticsScreen';
import { SigCTStoreLocatorScreen } from './screens/SigCTStoreLocatorScreen';
import { SigCTStoreDetailScreen } from './screens/SigCTStoreDetailScreen';
import { SigCTJobsScreen } from './screens/SigCTJobsScreen';
import { SigCTMorningReportScreen } from './screens/SigCTMorningReportScreen';
import { SigCTAboutScreen } from './screens/SigCTAboutScreen';
import { SigCTHelpScreen } from './screens/SigCTHelpScreen';
import { SigCTAlertsScreen } from './screens/SigCTAlertsScreen';
import { IOSAlert } from '../../../components/ui/IOSAlert';
import { IOSModalPresentation } from '../../../components/ui/IOSModalPresentation';
import type { SigCTBannerPageProps, SigCTScreen } from '../../../types/custom-apps/sigct-banner';

export function SigCTBannerPage(props: SigCTBannerPageProps) {
  const o = useSigCTOrchestrator();
  const isDark = props.theme === 'dark';
  const screen = o.nav.currentScreen;
  const bgClass = isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light';

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [detailTitle, setDetailTitle] = useState<string | undefined>(undefined);

  const NAVIGATE_SCREENS: SigCTScreen[] = [
    'dsc-menu', 'store-locator', 'dsc-locator', 'store-detail',
    'siglive-summary', 'analytics', 'jobs-summary', 'morning-report',
    'alerts', 'help', 'about',
  ];

  const handleSidebarSelect = useCallback((scr: SigCTScreen, title?: string) => {
    if (props.deviceFamily === 'ipad' && !NAVIGATE_SCREENS.includes(scr)) {
      setSelectedRowId(scr);
      setDetailTitle(title);
    } else {
      setSelectedRowId(null);
      setDetailTitle(undefined);
      o.handleMenuSelect(scr, title);
    }
  }, [props.deviceFamily, o]);

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

  const goHome = o.handleGoHome;

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

      case 'siglive-summary':
        return (
          <SigCTSigLiveScreen
            data={o.data.sigLiveData}
            title={o.data.sigLiveTitle}
            isLoading={o.data.isLoading}
            canGoBack={o.data.sigLiveCanGoBack}
            isDark={isDark}
            onDrillDown={o.data.drillDownSigLive}
            onBack={o.data.goBackSigLive}
            onClose={goHome}
          />
        );

      case 'analytics':
        return (
          <SigCTAnalyticsScreen
            data={o.data.salesData}
            title={o.data.salesTitle}
            salesType={o.activeSalesType}
            isLoading={o.data.isLoading}
            canGoBack={o.data.salesCanGoBack}
            isDark={isDark}
            onDrillDown={(sale) => o.data.drillDownSales(sale, o.activeSalesType)}
            onBack={() => o.data.goBackSales(o.activeSalesType)}
            onClose={goHome}
          />
        );

      case 'store-locator':
        return (
          <SigCTStoreLocatorScreen
            locations={o.data.storeLocations}
            isLoading={o.data.isLoading}
            isDark={isDark}
            title="Store Locator"
            onSelect={o.handleStoreSelect}
            onBack={goHome}
          />
        );

      case 'dsc-locator':
        return (
          <SigCTStoreLocatorScreen
            locations={o.data.dscLocations}
            isLoading={o.data.isLoading}
            isDark={isDark}
            title="D&SC Locator"
            onSelect={o.handleStoreSelect}
            onBack={goHome}
          />
        );

      case 'store-detail':
        return (
          <SigCTStoreDetailScreen
            detail={o.data.selectedStoreDetail}
            isLoading={o.data.isLoading}
            isDark={isDark}
            onBack={o.handleStoreDetailBack}
          />
        );

      case 'jobs-summary':
        return (
          <SigCTJobsScreen
            summary={o.data.jobsSummary}
            entities={o.data.jobsEntities}
            tab={o.data.jobsTab}
            title={o.data.jobsTitle}
            isLoading={o.data.isLoading}
            canGoBack={o.data.jobsCanGoBack}
            isDark={isDark}
            onTabChange={o.data.setJobsTab}
            onDrillDown={o.data.drillDownJobs}
            onBack={o.data.goBackJobs}
            onClose={goHome}
          />
        );

      case 'morning-report':
        return (
          <SigCTMorningReportScreen
            data={o.data.morningData}
            customerData={o.data.morningCustomerData}
            tab={o.data.morningTab}
            title={o.data.morningTitle}
            isStore={o.data.morningIsStore}
            isLoading={o.data.isLoading}
            canGoBack={o.data.morningCanGoBack}
            isDark={isDark}
            onTabChange={o.data.setMorningTab}
            onDrillDown={o.data.drillDownMorning}
            onBack={o.data.goBackMorning}
            onClose={goHome}
          />
        );

      case 'about':
        return <SigCTAboutScreen username={o.auth.username} isDark={isDark} onBack={goHome} />;

      case 'help':
        return <SigCTHelpScreen isDark={isDark} onBack={goHome} />;

      case 'alerts':
        return <SigCTAlertsScreen alertCount={0} isDark={isDark} onBack={goHome} />;

      default:
        return (
          <div className={`flex h-full flex-col items-center justify-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <span className="text-[11px] font-semibold">{o.nav.screenTitle ?? screen}</span>
            <button
              className={`rounded-lg px-3 py-1 text-[9px] ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
              onClick={() => o.nav.goBack()}
              type="button"
            >
              Back
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
      <IOSModalPresentation open={!!o.auth.oauthUrl}>
        <SigCTOAuthScreen
          authUrl={o.auth.oauthUrl ?? ''} redirectPrefix={SIGCT_OAUTH.redirectUri}
          isDark={isDark} onAuthCode={o.handleAuthCode} onCancel={o.auth.cancelOAuth}
          webviewRef={webview.webviewRef} isLoading={webview.isLoading}
          currentUrl={webview.currentUrl} reload={webview.reload}
          goBack={webview.goBack} goForward={webview.goForward}
        />
      </IOSModalPresentation>
      <IOSAlert
        open={!!webview.alertMessage}
        title="SigCT"
        message={webview.alertMessage ?? undefined}
        onClose={webview.dismissAlert}
      />
    </AppPageShell>
  );
}
