import { useState, useCallback } from 'react';
import type { WalletView } from '../types/wallet';

export function useWalletNavigation() {
  const [view, setView] = useState<WalletView>('all-cards');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const selectCard = useCallback((cardId: string) => {
    setSelectedCardId(cardId);
    setView('card-detail');
  }, []);

  const openActivity = useCallback(() => {
    setView('activity-detail');
  }, []);

  const goBack = useCallback(() => {
    if (view === 'activity-detail') {
      setView('card-detail');
    } else if (view === 'card-detail') {
      setView('all-cards');
      setSelectedCardId(null);
    }
  }, [view]);

  return { view, selectedCardId, selectCard, openActivity, goBack };
}
