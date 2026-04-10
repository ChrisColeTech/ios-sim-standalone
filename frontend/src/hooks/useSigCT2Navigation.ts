import { useState, useCallback } from 'react';
import type { SigCT2Screen, SigCT2NavigationState } from '../types/custom-apps/sigct2';
import { SIGCT2_SCREEN_TITLES } from '../constants/custom-apps/sigct2';

export function useSigCT2Navigation() {
  const [state, setState] = useState<SigCT2NavigationState>({
    currentScreen: 'splash',
    previousScreen: null,
    screenTitle: null,
    screenStack: ['splash']
  });

  const navigate = useCallback((screen: SigCT2Screen, title?: string) => {
    setState(s => ({
      currentScreen: screen,
      previousScreen: s.currentScreen,
      screenTitle: title ?? SIGCT2_SCREEN_TITLES[screen] ?? null,
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
        screenTitle: SIGCT2_SCREEN_TITLES[prev] ?? null,
        screenStack: stack
      };
    });
  }, []);

  const resetTo = useCallback((screen: SigCT2Screen) => {
    setState({
      currentScreen: screen,
      previousScreen: null,
      screenTitle: SIGCT2_SCREEN_TITLES[screen] ?? null,
      screenStack: [screen]
    });
  }, []);

  return { ...state, navigate, goBack, resetTo };
}
