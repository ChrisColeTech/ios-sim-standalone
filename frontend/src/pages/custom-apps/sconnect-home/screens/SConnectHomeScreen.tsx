import { LuMenu, LuX } from 'react-icons/lu';
import { SCONNECT_THEME, getStoreLogo } from '../../../../constants/custom-apps/sconnect-home';
import { CALCULATOR_BASIC_BUTTONS, CALCULATOR_DEFAULT_VALUE } from '../../../../constants/apps/calculator-layout';
import { CalculatorLayout } from '../../../../components/apps-layout/calculator';
import { SConnectButtonGrid } from './SConnectButtonGrid';
import { SConnectWebViewScreen } from './SConnectWebViewScreen';
import { SConnectGoToUrlScreen } from './SConnectGoToUrlScreen';
import { SConnectHelpScreen } from './SConnectHelpScreen';
import type { SConnectHomeScreenProps } from '../../../../types/custom-apps/sconnect-home';

export function SConnectHomeScreen(props: SConnectHomeScreenProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const navText = props.isDark ? 'text-black' : 'text-white';
  const content = props.contentScreen;

  return (
    <div className={`flex h-full flex-col ${props.isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}`}>
      {/* Nav bar — persistent shell */}
      <div
        className="relative flex h-[28px] shrink-0 items-center px-2"
        style={{ backgroundColor: navBg }}
      >
        <button
          onClick={props.onMenuToggle}
          className={`relative z-10 flex h-5 w-5 items-center justify-center ${navText}`}
        >
          {props.menuOpen ? <LuX className="h-3.5 w-3.5" /> : <LuMenu className="h-3.5 w-3.5" />}
        </button>
        <img
          src={getStoreLogo(props.banner)}
          alt={props.banner ?? 'SConnect'}
          className="pointer-events-none absolute inset-0 m-auto h-[20px] object-contain"
          style={{ filter: props.isDark ? 'brightness(0)' : 'brightness(0) invert(1)' }}
        />
      </div>

      {/* Content area — swaps based on contentScreen */}
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        {content === 'grid' && (
          <SConnectButtonGrid
            buttons={props.buttons} isDark={props.isDark}
            isLandscape={props.isLandscape} onButtonTap={props.onButtonTap}
          />
        )}
        {(content === 'webview' || content === 'pos') && props.webViewUrl && (
          <SConnectWebViewScreen
            url={props.webViewUrl} isDark={props.isDark}
            isFavorite={props.isFavorite}
            webviewRef={props.webviewRef}
            currentUrl={props.currentUrl}
            displayUrl={props.displayUrl}
            isLoading={props.webViewLoading}
            onToggleFavorite={props.onToggleFavorite}
            onGoBack={props.onGoBack}
            onGoForward={props.onGoForward}
            onReload={props.onReload}
            onStop={props.onStop}
            onNavigate={props.onNavigateUrl}
          />
        )}
        {content === 'calculator' && (
          <CalculatorLayout
            theme={props.isDark ? 'dark' : 'light'}
            value={CALCULATOR_DEFAULT_VALUE}
            mode="basic"
            buttons={CALCULATOR_BASIC_BUTTONS}
          />
        )}
        {content === 'go-to-url' && (
          <SConnectGoToUrlScreen isDark={props.isDark} onNavigate={props.onNavigateUrl} />
        )}
        {content === 'help' && (
          <SConnectHelpScreen isDark={props.isDark} />
        )}
      </div>
    </div>
  );
}
