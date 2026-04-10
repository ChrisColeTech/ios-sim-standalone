import { useState, useCallback } from 'react';
import { useSigCT2MapSearch } from './useSigCT2MapSearch';
import type { SigCT2StoreLocation } from '../types/custom-apps/sigct2';

type UseSigCT2DSCLocatorOptions = {
  shops: SigCT2StoreLocation[];
  onSelectShop: (shop: SigCT2StoreLocation) => void;
};

export function useSigCT2DSCLocator(options: UseSigCT2DSCLocatorOptions) {
  const mapSearch = useSigCT2MapSearch({ items: options.shops });
  const [showStoreList, setShowStoreList] = useState(false);

  const handleAnnotationInfo = useCallback((shop: SigCT2StoreLocation) => {
    options.onSelectShop(shop);
    setShowStoreList(true);
  }, [options.onSelectShop]);

  const hideStoreList = useCallback(() => setShowStoreList(false), []);
  const openStoreList = useCallback(() => setShowStoreList(true), []);

  return {
    ...mapSearch,
    showStoreList,
    handleAnnotationInfo,
    hideStoreList,
    openStoreList,
  };
}
