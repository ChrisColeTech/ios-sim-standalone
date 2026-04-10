import { useState, useCallback } from 'react';
import type { SigCTStoreLocation } from '../types/custom-apps/sigct-banner';

type UseSigCTMapSearchOptions = {
  items: SigCTStoreLocation[];
  nameField?: 'storeName';
};

export function useSigCTMapSearch(options: UseSigCTMapSearchOptions) {
  const [search, setSearch] = useState('');
  const [selectedPin, setSelectedPin] = useState<SigCTStoreLocation | null>(null);

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
