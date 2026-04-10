import { useState, useCallback } from 'react';
import { useSigCTMapSearch } from './useSigCTMapSearch';
import type { SigCTStoreLocation } from '../types/custom-apps/sigct-banner';

type UseSigCTDSCLocatorOptions = {
  shops: SigCTStoreLocation[];
  onSelectShop: (shop: SigCTStoreLocation) => void;
};

export function useSigCTDSCLocator(options: UseSigCTDSCLocatorOptions) {
  const mapSearch = useSigCTMapSearch({ items: options.shops });
  const [showStoreList, setShowStoreList] = useState(false);

  const handleAnnotationInfo = useCallback((shop: SigCTStoreLocation) => {
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
