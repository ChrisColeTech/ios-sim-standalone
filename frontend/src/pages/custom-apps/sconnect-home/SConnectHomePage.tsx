import { motion, AnimatePresence } from 'framer-motion';
import { AppPageShell } from '../../../components/layout/shared/AppPageShell';
import { IOSAlert } from '../../../components/ui/IOSAlert';
import { IOSModalPresentation } from '../../../components/ui/IOSModalPresentation';
import { useSConnectOrchestrator } from '../../../hooks/useSConnectOrchestrator';
import { SConnectLoginScreen } from './screens/SConnectLoginScreen';
import { SConnectLoginFormScreen } from './screens/SConnectLoginFormScreen';
import { SConnectAdminScreen } from './screens/SConnectAdminScreen';
import { SConnectBannerPickerScreen } from './screens/SConnectBannerPickerScreen';
import { SConnectLocationScreen } from './screens/SConnectLocationScreen';
import { SConnectHomeScreen } from './screens/SConnectHomeScreen';
import { SConnectSideMenu } from './screens/SConnectSideMenu';
import { SConnectAboutScreen } from './screens/SConnectAboutScreen';
import { SConnectSettingsScreen } from './screens/SConnectSettingsScreen';
import { useSConnectStore } from '../../../store/sconnectStore';
import type { SConnectHomePageProps } from '../../../types/custom-apps/sconnect-home';

const MODAL_SCREENS = ['admin-setup', 'banner-picker', 'location', 'about', 'settings'] as const;

export function SConnectHomePage(props: SConnectHomePageProps) {
  const themeOverride = useSConnectStore(s => s.themeOverride);
  const setThemeOverride = useSConnectStore(s => s.setThemeOverride);
  const isDark = themeOverride === 'system'
    ? props.theme === 'dark'
    : themeOverride === 'dark';
  const o = useSConnectOrchestrator(isDark);
  const screen = o.nav.currentScreen;
  const isModal = (MODAL_SCREENS as readonly string[]).includes(screen);
  const hasReachedHome = o.nav.previousScreen === 'home' || screen === 'home';
  const isHomeArea = screen === 'home' || (isModal && hasReachedHome);

  return (
    <AppPageShell backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}>
      <div className="relative h-full w-full overflow-hidden">
        {/* Splash — no animation, just shows/hides */}
        {screen === 'splash' && (
          <div className="absolute inset-0">
            <SConnectLoginScreen isLoading={o.auth.isLoading} onAutoAuth={() => {}} />
          </div>
        )}

        {/* Login form — no animation */}
        {(screen === 'login-form' || (isModal && !hasReachedHome)) && (
          <div className="absolute inset-0">
            <SConnectLoginFormScreen
              error={o.auth.error} isLoading={o.auth.isLoading}
              savedUsername={o.auth.getStoredCredentials()} onLogin={o.handleLogin}
            />
          </div>
        )}

        {/* Home area — slides up from bottom (fullScreen modal presentation) */}
        <AnimatePresence>
          {isHomeArea && (
            <motion.div
              key="home"
              className="absolute inset-0 z-10"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
            <SConnectSideMenu
              menuOptions={o.data.menuOptions}
              selectedOption={o.selectedMenuOption}
              banner={o.data.banner}
              isDark={isDark}
              onSelect={o.handleMenuSelect}
              onClose={o.closeMenu}
            />
            <div
              className="absolute inset-0 z-10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ transform: o.menuOpen ? `translateX(${100 / 3.25}%)` : 'translateX(0)' }}
              onClick={o.menuOpen ? o.closeMenu : undefined}
            >
              <SConnectHomeScreen
                banner={o.data.banner} isDark={isDark}
                isLandscape={props.isLandscape}
                menuOpen={o.menuOpen}
                contentScreen={o.contentScreen}
                buttons={o.data.buttons}
                onButtonTap={o.handleButtonTap}
                webViewUrl={o.nav.webViewUrl}
                webviewRef={o.webView.webviewRef}
                currentUrl={o.webView.currentUrl}
                displayUrl={o.webView.displayUrl}
                webViewLoading={o.webView.isLoading}
                isFavorite={o.nav.webViewUrl ? o.data.isFavorite(o.nav.webViewUrl) : false}
                onToggleFavorite={o.handleToggleFavorite}
                onGoBack={o.webView.goBack}
                onGoForward={o.webView.goForward}
                onReload={o.webView.reload}
                onStop={o.webView.stop}
                onNavigateUrl={o.handleNavigateUrl}
                onMenuToggle={o.menuOpen ? o.closeMenu : o.openMenu}
              />
            </div>
            </motion.div>
          )}
        </AnimatePresence>

        <IOSModalPresentation open={isModal}>
          {screen === 'admin-setup' && o.data.user && (
            <SConnectAdminScreen
              adminBannerDetails={o.data.user.adminBannerDetails ?? []}
              banner={o.data.banner} storeDisplayText={o.data.storeDisplayText}
              isDsc={o.data.isDsc} isDark={isDark}
              onBannerTap={o.openBannerPicker}
              onLocationTap={o.openLocation} onSave={o.handleAdminSave}
            />
          )}
          {screen === 'banner-picker' && o.data.user && (
            <SConnectBannerPickerScreen
              adminBannerDetails={o.data.user.adminBannerDetails ?? []}
              banner={o.data.banner} isDark={isDark}
              onBannerChange={o.handleBannerChange}
              onBack={o.nav.goBack}
            />
          )}
          {screen === 'location' && (
            <SConnectLocationScreen
              isAtHome={o.data.isAtHome} storeNumber={o.locationStore}
              isDsc={o.data.isDsc} isDark={isDark}
              onLocationChange={o.data.setAtHome}
              onInput={o.handleLocationInput}
              onSave={o.handleLocationSave} onBack={o.nav.goBack}
            />
          )}
          {screen === 'about' && o.data.user && (
            <SConnectAboutScreen
              rows={o.aboutRows} isDark={isDark}
              onClose={o.closeToHome}
            />
          )}
          {screen === 'settings' && o.data.user && (
            <SConnectSettingsScreen
              banner={o.data.banner}
              bannerDisplay={o.settingsBannerDisplay}
              storeDisplayText={o.data.storeDisplayText}
              adminBannerDetails={o.data.user.adminBannerDetails ?? []}
              isDark={isDark}
              currentTheme={themeOverride}
              onBannerTap={o.openBannerPicker}
              onLocationTap={o.openLocation}
              onThemeChange={setThemeOverride}
              onClose={o.closeToHome}
            />
          )}
        </IOSModalPresentation>

        <IOSAlert
          open={!!o.alert}
          title={o.alert?.title ?? ''}
          message={o.alert?.message}
          onClose={o.dismissAlert}
        />
      </div>
    </AppPageShell>
  );
}
