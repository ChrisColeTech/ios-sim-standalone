import { useState, useCallback } from 'react';
import type { SigCT2StoreLocation } from '../types/custom-apps/sigct2';

type UseSigCT2MapSearchOptions = {
  items: SigCT2StoreLocation[];
  nameField?: 'storeName';
};

export function useSigCT2MapSearch(options: UseSigCT2MapSearchOptions) {
  const [search, setSearch] = useState('');
  const [selectedPin, setSelectedPin] = useState<SigCT2StoreLocation | null>(null);

  const filtered = search
    ? options.items.filter(s =>
        (s[options.nameField ?? 'storeName'] ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : options.items;

  const validPins = filtered.filter(s => s.latitude && s.longitude);

  const clearSearch = useCallback(() => setSearch(''), []);
  const clearPin = useCallback(() => setSelectedPin(null), []);

  return {
    search,
    setSearch,
    clearSearch,
    selectedPin,
    setSelectedPin,
    clearPin,
    filtered,
    validPins,
  };
}
