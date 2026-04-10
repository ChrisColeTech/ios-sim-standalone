import { AppStorePage } from '../../pages/apps/AppStorePage';
import { SConnectHomePage } from '../../pages/custom-apps/sconnect-home/SConnectHomePage';
import { SigCTBannerPage } from '../../pages/custom-apps/sigct-banner/SigCTBannerPage';
import { SigCT2Page } from '../../pages/custom-apps/sigct2/SigCT2Page';
import { BooksPage } from '../../pages/apps/BooksPage';
import { KeynotePage } from '../../pages/apps/KeynotePage';
import { PagesAppPage } from '../../pages/apps/PagesAppPage';
import { SafariPage } from '../../pages/apps/SafariPage';
import { CalculatorPage } from '../../pages/apps/CalculatorPage';
import { CalendarPage } from '../../pages/apps/CalendarPage';
import { CameraPage } from '../../pages/apps/CameraPage';
import { ClockPage } from '../../pages/apps/ClockPage';
import { EditingPage } from '../../pages/apps/EditingPage';
import { FilesPage } from '../../pages/apps/FilesPage';
import { HealthPage } from '../../pages/apps/HealthPage';
import { StocksPage } from '../../pages/apps/StocksPage';
import { WeatherPage } from '../../pages/apps/WeatherPage';
import { MailPage } from '../../pages/apps/MailPage';
import { MapsPage } from '../../pages/apps/MapsPage';
import { MessagesPage } from '../../pages/apps/MessagesPage';
import { MusicPage } from '../../pages/apps/MusicPage';
import { PodcastsPage } from '../../pages/apps/PodcastsPage';
import { NewsPage } from '../../pages/apps/NewsPage';
import { NotesPage } from '../../pages/apps/NotesPage';
import { SettingsPage } from '../../pages/apps/SettingsPage';
import { TVPage } from '../../pages/apps/TVPage';
import { WalletPage } from '../../pages/apps/WalletPage';
import type { AppRouterProps } from '../../types/components';

export function AppRouter(props: AppRouterProps) {
  if (props.appId === 'mail') {
    return <MailPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'messages' || props.appId === 'messages-dock') {
    return <MessagesPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'files') {
    return <FilesPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'maps' || props.appId === 'find-my') {
    return <MapsPage appId={props.appId} deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'tv') {
    return <TVPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'books') {
    return <BooksPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'news') {
    return <NewsPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'clock') {
    return <ClockPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'camera') {
    return <CameraPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'calculator') {
    return <CalculatorPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'calendar') {
    return <CalendarPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'keynote') {
    return <KeynotePage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'pages') {
    return <PagesAppPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'imovie' || props.appId === 'garageband') {
    return <EditingPage appId={props.appId} deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'health') {
    return <HealthPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'stocks') {
    return <StocksPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'weather') {
    return <WeatherPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'wallet') {
    return <WalletPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'settings') {
    return <SettingsPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'notes') {
    return <NotesPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'music' || props.appId === 'music-dock') {
    return <MusicPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'podcasts') {
    return <PodcastsPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'safari') {
    return <SafariPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'app-store') {
    return <AppStorePage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'sconnect-home') {
    return <SConnectHomePage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'sigct-banner') {
    return <SigCTBannerPage deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  if (props.appId === 'sigct2') {
    return <SigCT2Page deviceFamily={props.deviceFamily} isLandscape={props.isLandscape} theme={props.theme} onClose={props.onClose} />;
  }

  return (
    <section className="flex h-full items-center justify-center bg-[#f2f2f7] text-black">
      <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">App "{props.appId}" not implemented yet.</div>
    </section>
  );
}
