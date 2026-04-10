import { useCallback } from 'react';
import { useSConnectStore } from '../store/sconnectStore';
import type { SConnectScreen } from '../types/custom-apps/sconnect-home';

export function useSConnectNavigation() {
  const currentScreen = useSConnectStore(s => s.currentScreen);
  const previousScreen = useSConnectStore(s => s.previousScreen);
  const webViewUrl = useSConnectStore(s => s.webViewUrl);
  const setScreen = useSConnectStore(s => s.setScreen);
  const setWebViewUrl = useSConnectStore(s => s.setWebViewUrl);

  const navigate = useCallback((screen: SConnectScreen) => {
    setScreen(screen);
  }, [setScreen]);

  const openUrl = useCallback((url: string) => {
    setWebViewUrl(url);
  }, [setWebViewUrl]);

  const goBack = useCallback(() => {
    setScreen(previousScreen ?? 'home');
    setWebViewUrl(null);
  }, [previousScreen, setScreen, setWebViewUrl]);

  return { currentScreen, previousScreen, webViewUrl, navigate, openUrl, goBack };
}
