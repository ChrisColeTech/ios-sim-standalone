import { useState } from 'react';
import { AppPageShell } from '../../../components/layout/shared/AppPageShell';
import { TwoColLayout } from '../../../components/layout';
import { useSigCT2Orchestrator } from '../../../hooks/useSigCT2Orchestrator';
import { useSigCT2OAuthWebView } from '../../../hooks/useSigCT2OAuthWebView';
import { useSigCT2MapSearch } from '../../../hooks/useSigCT2MapSearch';
import { useSigCT2DSCLocator } from '../../../hooks/useSigCT2DSCLocator';
import { SIGCT2_OAUTH, SIGCT2_ACTIVE_ENDPOINT, SIGCT2_APP_VERSION } from '../../../constants/custom-apps/sigct2';
import { SIGCT2_STORE_MENU, SIGCT2_DSC_MENU, SIGCT2_DSC_SUBMENU } from '../../../constants/custom-apps/sigct2-menus';
import { buildSections } from '../../../utils/sigct/menu-utils';
import { SigCT2LoginScreen } from './screens/SigCT2LoginScreen';
import { SigCT2OAuthScreen } from './screens/SigCT2OAuthScreen';
import { SigCT2HomeMenuScreen } from './screens/SigCT2HomeMenuScreen';
import { SigCT2BottomTabBar } from './components/SigCT2BottomTabBar';
import type { SigCT2Tab } from './components/SigCT2BottomTabBar';
import { SigCT2DSCMenuScreen } from './screens/SigCT2DSCMenuScreen';
import { SigCT2SigLiveScreen } from './screens/SigCT2SigLiveScreen';
import { SigCT2ReportScreen } from './screens/SigCT2ReportScreen';
import { SigCT2StoreLocatorScreen } from './screens/SigCT2StoreLocatorScreen';
import { SigCT2DSCLocatorScreen } from './screens/SigCT2DSCLocatorScreen';
import { SigCT2StoreDetailScreen } from './screens/SigCT2StoreDetailScreen';
import { SigCT2JobsScreen } from './screens/SigCT2JobsScreen';
import { SigCT2MorningReportScreen } from './screens/SigCT2MorningReportScreen';
import { SigCT2SigLiveDetailScreen } from './screens/SigCT2SigLiveDetailScreen';
import { SigCT2AlertsScreen } from './screens/SigCT2AlertsScreen';
import { SigCT2AboutScreen } from './screens/SigCT2AboutScreen';
import { SigCT2HelpScreen } from './screens/SigCT2HelpScreen';
import { SigCT2JobDetailScreen } from './screens/SigCT2JobDetailScreen';
import { SigCT2PlaceholderScreen } from './screens/SigCT2PlaceholderScreen';
import { IOSAlert } from '../../../components/ui/IOSAlert';
import detailLogo from '../../../assets/images/sigct2/sigct2-detail-logo.png';
import type { SigCT2PageProps } from '../../../types/custom-apps/sigct2';

/** Screens that only exist within the DSC submenu context */
const DSC_SCREENS = new Set(['dsc-menu', 'dsc-locator', 'jobs-summary', 'jobs-drilldown', 'morning-report', 'morning-report-detail', 'job-lookup', 'job-detail']);

/** Map screen -> the sidebar row ID that should be highlighted */
const SCREEN_TO_ROW: Record<string, string> = {
  'siglive-summary': 'siglive', 'siglive-detail': 'siglive',
  'analytics': 'total', 'store-locator': 'store-locator',
  'dsc-locator': 'dsc-locator', 'alerts': 'alerts', 'help': 'help',
  'release-notes': 'release-notes', 'about': 'about', 'welcome': 'welcome',
  'dsc-menu': 'signet-dsc', 'jobs-summary': 'jobs-in-shop', 'jobs-drilldown': 'jobs-in-shop',
  'morning-report': 'morning-report', 'morning-report-detail': 'morning-report',
  'job-lookup': 'job-lookup', 'job-detail': 'job-lookup',
  'store-detail': 'store-locator', 'store-info': 'store-locator', 'dsc-detail': 'dsc-locator',
};

export function SigCT2Page(props: SigCT2PageProps) {
  const o = useSigCT2Orchestrator();
  const isDark = props.theme === 'dark';
  const screen = o.nav.currentScreen;
  const bgClass = isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light';
  const isIPad = props.deviceFamily === 'ipad';
  const [menuTab, setMenuTab] = useState<SigCT2Tab>('sales');
  const sp = { isDark, isLandscape: props.isLandscape, theme: props.theme, deviceFamily: props.deviceFamily } as const;

  const webview = useSigCT2OAuthWebView({
    authUrl: o.auth.oauthUrl ?? '', redirectPrefix: SIGCT2_OAUTH.redirectUri,
    onAuthCode: o.handleAuthCode, onCancel: o.auth.cancelOAuth,
  });
  const storeMap = useSigCT2MapSearch({ items: o.loc.storeLocations });
  const dscLocator = useSigCT2DSCLocator({
    shops: o.loc.dscLocations, onSelectShop: (shop) => o.loc.fetchShopStores(shop.shopNo ?? ''),
  });

  // --- Render the active screen content ---
  const renderScreen = () => {
    if (screen === 'splash' || screen === 'oauth')
      return <SigCT2LoginScreen isLoading={o.auth.isLoading} showLogin={screen === 'oauth'} onOAuthStart={o.handleOAuthStart} />;
    if ((screen === 'home-menu' || screen === 'dsc-menu') && !isIPad) {
      if (screen === 'dsc-menu')
        return <SigCT2DSCMenuScreen {...sp} onSelect={o.handleMenuSelect} onBack={() => o.nav.goBack()} />;
      const tabBar = <SigCT2BottomTabBar activeTab={menuTab} showDSC={o.auth.isRepair} isDark={isDark} onTabChange={setMenuTab} />;
      return <SigCT2HomeMenuScreen isStore={o.auth.isStore} isRepair={o.auth.isRepair} alertCount={0} activeTab={menuTab} floatingBar={tabBar} {...sp} onSelect={o.handleMenuSelect} onLogout={o.handleLogout} />;
    }
    if (screen === 'siglive-summary')
      return <SigCT2SigLiveScreen data={o.data.sigLiveData} polling={o.data.sigLivePolling} title={o.data.sigLiveTitle} isLoading={o.data.isLoading} {...sp} canGoBack={o.data.sigLiveCanGoBack} onDrillDown={o.handleSigLiveDrillDown} onBack={() => o.data.goBackSigLive()} onRefresh={() => o.data.fetchSigLive()} onGoHome={o.handleGoHome} />;
    if (screen === 'siglive-detail' && o.data.sigLiveParent)
      return <SigCT2SigLiveDetailScreen data={o.data.sigLiveParent} children={o.data.sigLiveData} {...sp} canGoBack={o.data.sigLiveCanGoBack} onDrillDown={o.handleSigLiveDrillDown} onBack={o.handleSigLiveBack} onGoHome={o.handleGoHome} />;
    if (screen === 'analytics')
      return <SigCT2ReportScreen title={o.nav.screenTitle ?? 'Total'} reportDate={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} sales={o.data.salesData} salesByDay={o.data.salesByDay} period={o.data.salesPeriod} isLoading={o.data.isLoading} {...sp} canGoBack={o.data.salesCanGoBack} onPeriodChange={o.data.setSalesPeriod} onDrillDown={(s) => o.data.drillDownSales(s, o.activeSalesType)} onBack={() => o.data.goBackSales(o.activeSalesType)} onGoHome={o.handleGoHome} />;
    if (screen === 'store-locator')
      return <SigCT2StoreLocatorScreen stores={o.loc.storeLocations} title="Store Locator" {...sp} isLoading={o.loc.isLoading} search={storeMap.search} onSearchChange={storeMap.setSearch} onClearSearch={storeMap.clearSearch} validPins={storeMap.validPins} selectedPin={storeMap.selectedPin} onSelectPin={storeMap.setSelectedPin} onClearPin={storeMap.clearPin} onSelectStore={o.handleStoreSelect} onBack={o.handleGoHome} />;
    if (screen === 'dsc-locator')
      return <SigCT2DSCLocatorScreen shops={o.loc.dscLocations} shopStores={o.loc.shopStores} {...sp} isLoading={o.loc.isLoading} search={dscLocator.search} onSearchChange={dscLocator.setSearch} onClearSearch={dscLocator.clearSearch} validPins={dscLocator.validPins} selectedPin={dscLocator.selectedPin} onSelectPin={dscLocator.setSelectedPin} onClearPin={dscLocator.clearPin} showStoreList={dscLocator.showStoreList} onShowStoreList={dscLocator.openStoreList} onHideStoreList={dscLocator.hideStoreList} onAnnotationInfo={dscLocator.handleAnnotationInfo} onSelectStore={o.handleStoreSelect} onBack={() => o.nav.goBack()} />;
    if ((screen === 'store-detail' || screen === 'store-info' || screen === 'dsc-detail') && o.loc.selectedStoreDetail)
      return <SigCT2StoreDetailScreen detail={o.loc.selectedStoreDetail} {...sp} onBack={o.handleStoreDetailBack} />;
    if (screen === 'jobs-summary' || screen === 'jobs-drilldown')
      return <SigCT2JobsScreen summary={(o.jobs.jobsSummary ?? {}) as Record<string, number>} entities={o.jobs.jobsEntities} tab={o.jobs.jobsTab} title={o.jobs.jobsTitle} isLoading={o.jobs.isLoading} {...sp} canGoBack={o.jobs.jobsCanGoBack} onTabChange={(tab) => o.jobs.setJobsTab(tab as any)} onDrillDown={(e) => o.jobs.drillDownJobs(e)} onBack={() => o.jobs.goBackJobs()} onGoHome={() => o.nav.goBack()} />;
    if (screen === 'morning-report' || screen === 'morning-report-detail')
      return <SigCT2MorningReportScreen entityData={o.jobs.morningData} customerData={o.jobs.morningCustomerData} tab={o.jobs.morningTab} title={o.jobs.morningTitle} isStore={o.jobs.morningIsStore} isLoading={o.jobs.isLoading} {...sp} canGoBack={o.jobs.morningCanGoBack} onTabChange={(tab) => o.jobs.setMorningTab(tab as any)} onDrillDown={(e) => o.jobs.drillDownMorning(e)} onBack={() => o.jobs.goBackMorning()} onGoHome={() => o.nav.goBack()} />;
    if ((screen === 'job-detail' || screen === 'job-lookup') && o.jobs.jobsList?.[0])
      return <SigCT2JobDetailScreen job={o.jobs.jobsList[0]} {...sp} onBack={() => o.nav.goBack()} />;
    if (screen === 'alerts')
      return <SigCT2AlertsScreen alerts={[]} {...sp} isLoading={false} onBack={() => o.nav.goBack()} />;
    if (screen === 'about')
      return <SigCT2AboutScreen {...sp} endpoint={SIGCT2_ACTIVE_ENDPOINT} appVersion={SIGCT2_APP_VERSION} email={o.auth.username ?? ''} employeeId={''} formattedTime={''} onBack={() => o.nav.goBack()} />;
    if (screen === 'help')
      return <SigCT2HelpScreen {...sp} onBack={() => o.nav.goBack()} />;
    return <SigCT2PlaceholderScreen title={o.nav.screenTitle ?? screen} isDark={isDark} isLandscape={props.isLandscape} onBack={o.nav.goBack} />;
  };

  const alert = <IOSAlert open={!!webview.alertMessage} title="SigCT2" message={webview.alertMessage ?? undefined} onClose={webview.dismissAlert} />;

  // --- OAuth fullscreen ---
  if (o.auth.oauthUrl) {
    return (
      <AppPageShell backgroundClassName={bgClass}>
        <SigCT2OAuthScreen authUrl={o.auth.oauthUrl} redirectPrefix={SIGCT2_OAUTH.redirectUri} isDark={isDark}
          onAuthCode={o.handleAuthCode} onCancel={o.auth.cancelOAuth} webviewRef={webview.webviewRef}
          isLoading={webview.isLoading} currentUrl={webview.currentUrl} reload={webview.reload}
          goBack={webview.goBack} goForward={webview.goForward} />
      </AppPageShell>
    );
  }

  // --- Splash/login: fullscreen (no sidebar) ---
  if (screen === 'splash' || screen === 'oauth') {
    return (
      <AppPageShell backgroundClassName={bgClass}>
        <div className="relative h-full w-full overflow-hidden">{renderScreen()}</div>
        {alert}
      </AppPageShell>
    );
  }

  // --- iPad: TwoColLayout with persistent sidebar ---
  if (isIPad) {
    const isDSC = DSC_SCREENS.has(screen) || o.nav.screenStack.includes('dsc-menu');
    const sidebarMenus = isDSC ? SIGCT2_DSC_SUBMENU : [...SIGCT2_STORE_MENU, ...(o.auth.isRepair ? SIGCT2_DSC_MENU : [])];
    const sidebarSections = buildSections(sidebarMenus as any, o.auth.isStore, o.auth.isRepair);
    const isMenuScreen = screen === 'home-menu' || screen === 'dsc-menu';
    const activeRowId = SCREEN_TO_ROW[screen] ?? null;

    const handleSidebarSelect = (rowId: string) => {
      if (rowId === 'logout') { o.handleLogout(); return; }
      const allMenus = [...SIGCT2_STORE_MENU, ...SIGCT2_DSC_SUBMENU];
      for (const m of allMenus) {
        const item = m.items.find(i => i.id === rowId);
        if (item) { o.handleMenuSelect(item.screen, item.label); return; }
      }
    };

    return (
      <AppPageShell backgroundClassName={bgClass}>
        <TwoColLayout
          theme={props.theme}
          presentation="immersive"
          toolbarContent={
            <div className={`flex items-center gap-1 px-2 text-[11px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              {isDSC && (
                <button
                  className={`border-0 bg-transparent p-0 text-[11px] ${isDark ? 'text-white/60 hover:text-white' : 'text-black/50 hover:text-black'}`}
                  onClick={() => o.nav.resetTo('home-menu')}
                  type="button"
                >
                  ‹ Back
                </button>
              )}
              <span>{screen === 'dsc-menu' ? 'Signet D&SC' : isMenuScreen ? 'SigCT2' : (o.nav.screenTitle ?? '')}</span>
            </div>
          }
          sidebar={{ sections: sidebarSections }}
          selectedSidebarRowId={activeRowId}
          onSidebarSelect={handleSidebarSelect}
          detail={{
            sections: [],
            content: isMenuScreen
              ? <div className="flex min-h-0 flex-1 items-center justify-center">
                  <img src={detailLogo} alt="SigCT2" className="w-[40%] object-contain" />
                </div>
              : <div className="min-w-0 space-y-2 px-3 pb-4">
                  {renderScreen()}
                </div>
          }}
        />
        {alert}
      </AppPageShell>
    );
  }

  // --- iPhone: full-screen navigation ---
  return (
    <AppPageShell backgroundClassName={bgClass}>
      <div className="relative h-full w-full overflow-hidden">{renderScreen()}</div>
      {alert}
    </AppPageShell>
  );
}
