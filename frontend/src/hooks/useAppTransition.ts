import { useCallback, useEffect, useRef, useState } from 'react';
import type { AppOpenOrigin } from '../types/app';

type Phase = 'idle' | 'opening' | 'open' | 'closing';

type TransitionState = {
  appId: string | null;
  phase: Phase;
  origin: AppOpenOrigin | null;
};

const TRANSITION_DURATION = 200;

export function useAppTransition(storeOpenApp: string | null, storeOrigin: AppOpenOrigin | null, storeClose: () => void) {
  const [state, setState] = useState<TransitionState>({ appId: null, phase: 'idle', origin: null });
  const rafRef = useRef(0);
  const timeoutRef = useRef(0);
  const storeCloseRef = useRef(storeClose);

  useEffect(() => {
    storeCloseRef.current = storeClose;
  }, [storeClose]);

  // Store opened an app
  useEffect(() => {
    if (storeOpenApp && storeOpenApp !== state.appId && state.phase === 'idle') {
      rafRef.current = requestAnimationFrame(() => {
        setState({ appId: storeOpenApp, phase: 'opening', origin: storeOrigin });
        rafRef.current = requestAnimationFrame(() => {
          setState((prev) => prev.phase === 'opening' ? { ...prev, phase: 'open' } : prev);
        });
      });
    }
  }, [storeOpenApp, storeOrigin, state.appId, state.phase]);

  const close = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== 'open') return prev;

      return { ...prev, phase: 'closing' };
    });
  }, []);

  useEffect(() => {
    if (state.phase !== 'closing') {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setState({ appId: null, phase: 'idle', origin: null });
      storeCloseRef.current();
    }, TRANSITION_DURATION + 50);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [state.phase]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    appId: state.appId,
    phase: state.phase,
    origin: state.origin,
    close
  };
}
