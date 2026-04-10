import { useState, useCallback } from 'react';
import type { SigCTScreen, SigCTNavigationState } from '../types/custom-apps/sigct-banner';
import { SIGCT_SCREEN_TITLES } from '../constants/custom-apps/sigct-banner';

export function useSigCTNavigation() {
  const [state, setState] = useState<SigCTNavigationState>({
    currentScreen: 'splash',
    previousScreen: null,
    screenTitle: null,
    screenStack: ['splash']
  });

  const navigate = useCallback((screen: SigCTScreen, title?: string) => {
    setState(s => ({
      currentScreen: screen,
      previousScreen: s.currentScreen,
      screenTitle: title ?? SIGCT_SCREEN_TITLES[screen] ?? null,
      screenStack: [...s.screenStack, screen]
    }));
  }, []);

  const goBack = useCallback(() => {
    setState(s => {
      const stack = s.screenStack.slice(0, -1);
      const prev = stack[stack.length - 1] ?? 'home-menu';
      return {
        currentScreen: prev,
        previousScreen: null,
        screenTitle: SIGCT_SCREEN_TITLES[prev] ?? null,
        screenStack: stack
      };
    });
  }, []);

  const resetTo = useCallback((screen: SigCTScreen) => {
    setState({
      currentScreen: screen,
      previousScreen: null,
      screenTitle: SIGCT_SCREEN_TITLES[screen] ?? null,
      screenStack: [screen]
    });
  }, []);

  return { ...state, navigate, goBack, resetTo };
}
