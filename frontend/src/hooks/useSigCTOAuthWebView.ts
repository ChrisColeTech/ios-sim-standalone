import { useRef, useCallback, useState } from 'react';

type UseSigCTOAuthWebViewOptions = {
  authUrl: string;
  redirectPrefix: string;
  onAuthCode: (code: string) => void;
  onCancel: () => void;
};

export function useSigCTOAuthWebView(options: UseSigCTOAuthWebViewOptions) {
  const hasHandledRef = useRef(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const cleanupRef = useRef<(() => void) | null>(null);
  const wvRef = useRef<HTMLElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(options.authUrl);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const dismissAlert = useCallback(() => setAlertMessage(null), []);

  // Callback ref — fires when the <webview> element mounts/unmounts
  const webviewRef = useCallback((wv: HTMLElement | null) => {
    // Cleanup previous listeners
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    wvRef.current = wv;
    if (!wv) return;

    const onNav = (e: any) => {
      const url = e.url ?? e.validatedURL ?? '';
      console.log('[OAuth] event:', e.type, 'url:', url?.substring?.(0, 80));
      if (!url) return;
      setCurrentUrl(url);

      const opts = optionsRef.current;
      if (url.startsWith(opts.redirectPrefix) && !hasHandledRef.current) {
        hasHandledRef.current = true;
        try {
          const parsed = new URL(url);
          const code = parsed.searchParams.get('code');
          if (code) { opts.onAuthCode(code); return; }
        } catch { /* parse error */ }
        try {
          const errorUrl = new URL(url);
          const errorDesc = errorUrl.searchParams.get('error_description');
          if (errorDesc) setAlertMessage(`OAuth Error: ${errorDesc}`);
        } catch { /* parse error */ }
        opts.onCancel();
      }
    };

    const onStart = () => setIsLoading(true);
    const onStop = () => setIsLoading(false);

    wv.addEventListener('will-navigate', onNav);
    wv.addEventListener('did-navigate', onNav);
    wv.addEventListener('did-start-navigation', onNav);
    wv.addEventListener('did-fail-load', onNav);
    wv.addEventListener('did-start-loading', onStart);
    wv.addEventListener('did-stop-loading', onStop);

    cleanupRef.current = () => {
      wv.removeEventListener('will-navigate', onNav);
      wv.removeEventListener('did-navigate', onNav);
      wv.removeEventListener('did-start-navigation', onNav);
      wv.removeEventListener('did-fail-load', onNav);
      wv.removeEventListener('did-start-loading', onStart);
      wv.removeEventListener('did-stop-loading', onStop);
    };
  }, []);

  const reload = useCallback(() => {
    (wvRef.current as any)?.reload?.();
  }, []);
  const goBack = useCallback(() => {
    (wvRef.current as any)?.goBack?.();
  }, []);
  const goForward = useCallback(() => {
    (wvRef.current as any)?.goForward?.();
  }, []);

  return { webviewRef, isLoading, currentUrl, reload, goBack, goForward, alertMessage, dismissAlert };
}
