import { useRef, useCallback, useEffect } from 'react';
import { useUiStoreState } from '../store/uiStore';
import { getHostname } from '../utils/safari';

export function useSafariNavigation() {
  const url = useUiStoreState((s) => s.safariUrl);
  const favorites = useUiStoreState((s) => s.safariFavorites);
  const recents = useUiStoreState((s) => s.safariRecents);
  const setSafariUrl = useUiStoreState((s) => s.setSafariUrl);
  const addSafariRecent = useUiStoreState((s) => s.addSafariRecent);
  const webviewRef = useRef<HTMLElement>(null);

  const navigate = useCallback((newUrl: string) => {
    setSafariUrl(newUrl);
    addSafariRecent(newUrl, getHostname(newUrl));
    const wv = webviewRef.current as any;
    if (wv?.loadURL) wv.loadURL(newUrl);
  }, [setSafariUrl, addSafariRecent]);

  const reload = useCallback(() => {
    const wv = webviewRef.current as any;
    if (wv?.reload) wv.reload();
  }, []);

  const goBack = useCallback(() => {
    const wv = webviewRef.current as any;
    if (wv?.goBack) wv.goBack();
  }, []);

  const goForward = useCallback(() => {
    const wv = webviewRef.current as any;
    if (wv?.goForward) wv.goForward();
  }, []);

  const newTab = useCallback(() => {
    setSafariUrl('');
  }, [setSafariUrl]);

  useEffect(() => {
    const wv = webviewRef.current as any;
    if (!wv) return;
    const onNavigate = (e: any) => {
      setSafariUrl(e.url);
      addSafariRecent(e.url, getHostname(e.url));
    };
    wv.addEventListener('did-navigate', onNavigate);
    wv.addEventListener('did-navigate-in-page', onNavigate);
    return () => {
      wv.removeEventListener('did-navigate', onNavigate);
      wv.removeEventListener('did-navigate-in-page', onNavigate);
    };
  }, [setSafariUrl, addSafariRecent]);

  return { url, favorites, recents, webviewRef, navigate, reload, goBack, goForward, newTab };
}
