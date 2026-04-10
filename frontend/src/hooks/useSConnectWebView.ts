import { useRef, useEffect, useState, useCallback } from 'react';
import { formatDisplayUrl } from '../utils/sconnect/data-transform';

export function useSConnectWebView(url: string | null) {
  const webviewRef = useRef<HTMLElement>(null);
  const [currentUrl, setCurrentUrl] = useState(url ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [attached, setAttached] = useState(0);

  useEffect(() => {
    if (url) {
      setCurrentUrl(url);
      setIsLoading(true);
    }
  }, [url]);

  // Re-attach listeners whenever the webview mounts (triggered by `attached` counter)
  useEffect(() => {
    const wv = webviewRef.current as any;
    if (!wv) return;

    const onNav = (e: any) => setCurrentUrl(e.url);
    const onStart = () => setIsLoading(true);
    const onStop = () => setIsLoading(false);

    const attach = () => {
      wv.addEventListener('did-navigate', onNav);
      wv.addEventListener('did-navigate-in-page', onNav);
      wv.addEventListener('did-start-loading', onStart);
      wv.addEventListener('did-stop-loading', onStop);
    };

    // If dom-ready hasn't fired yet, wait for it
    if (wv.getURL) {
      attach();
    } else {
      wv.addEventListener('dom-ready', attach, { once: true });
    }

    return () => {
      wv.removeEventListener('did-navigate', onNav);
      wv.removeEventListener('did-navigate-in-page', onNav);
      wv.removeEventListener('did-start-loading', onStart);
      wv.removeEventListener('did-stop-loading', onStop);
    };
  }, [attached]);

  // Detect when webview ref changes (remount) via MutationObserver on parent
  const setWebviewRef = useCallback((el: HTMLElement | null) => {
    (webviewRef as any).current = el;
    if (el) setAttached(c => c + 1);
  }, []);

  const goBack = useCallback(() => {
    const wv = webviewRef.current as any;
    if (wv?.canGoBack?.()) wv.goBack();
  }, []);

  const goForward = useCallback(() => {
    const wv = webviewRef.current as any;
    if (wv?.canGoForward?.()) wv.goForward();
  }, []);

  const reload = useCallback(() => {
    const wv = webviewRef.current as any;
    if (wv?.reload) wv.reload();
  }, []);

  const stop = useCallback(() => {
    const wv = webviewRef.current as any;
    if (wv?.stop) wv.stop();
  }, []);

  const navigate = useCallback((newUrl: string) => {
    setCurrentUrl(newUrl);
    setIsLoading(true);
    const wv = webviewRef.current as any;
    if (wv?.loadURL) {
      wv.loadURL(newUrl);
    }
  }, []);

  const displayUrl = formatDisplayUrl(currentUrl);

  return {
    webviewRef: setWebviewRef,
    currentUrl,
    displayUrl,
    isLoading,
    goBack,
    goForward,
    reload,
    stop,
    navigate,
  };
}
