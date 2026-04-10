import { useCallback } from 'react';

type UseAppVisibilityOptions = {
  toggleStockApps: () => void;
  toggleCustomApps: () => void;
};

export function useAppVisibility(options: UseAppVisibilityOptions) {
  const { toggleStockApps, toggleCustomApps } = options;

  const handleMenuAction = useCallback((action: string) => {
    if (action === 'toggle-stock-apps') toggleStockApps();
    if (action === 'toggle-custom-apps') toggleCustomApps();
  }, [toggleStockApps, toggleCustomApps]);

  return { handleMenuAction };
}
