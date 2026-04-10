import { useCallback, useEffect } from 'react';

type UseDebugZonesOptions = {
  showDebugZones: boolean;
  toggleDebugZones: () => void;
};

export function useDebugZones(options: UseDebugZonesOptions) {
  const { toggleDebugZones } = options;

  const handleMenuAction = useCallback((action: string) => {
    if (action === 'toggle-debug-zones') {
      toggleDebugZones();
    }
  }, [toggleDebugZones]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'd' || !event.ctrlKey || !event.shiftKey) {
        return;
      }

      event.preventDefault();
      toggleDebugZones();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDebugZones]);

  return {
    handleMenuAction
  };
}
