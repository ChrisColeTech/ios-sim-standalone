import { useState, useCallback } from 'react';
import { SIGCT2_ACTIVE_ENDPOINT } from '../constants/custom-apps/sigct2';
import { proxyFetch } from '../services/proxy';
import { isBrowser } from '../services/runtime';
import { buildMockStoreLocations, buildMockDSCLocations } from '../constants/custom-apps/sigct2-mock';
import type {
  SigCT2StoreLocation, SigCT2StoreDetail,
  SigCT2StoreLocatorResponse, SigCT2DSCLocatorResponse
} from '../types/custom-apps/sigct2';

export function useSigCT2LocationData(accessToken: string | null) {
  const [storeLocations, setStoreLocations] = useState<SigCT2StoreLocation[]>([]);
  const [dscLocations, setDscLocations] = useState<SigCT2StoreLocation[]>([]);
  const [shopStores, setShopStores] = useState<SigCT2StoreLocation[]>([]);
  const [selectedStoreDetail, setSelectedStoreDetail] = useState<SigCT2StoreDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiGet = useCallback(async (path: string) => {
    if (!accessToken) throw new Error('Not authenticated');
    const res = await proxyFetch(`${SIGCT2_ACTIVE_ENDPOINT}/api/rest/${path}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }, [accessToken]);

  const fetchStoreLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isBrowser) {
        const mock = buildMockStoreLocations();
        setStoreLocations(mock.stores ?? []);
        return;
      }
      const data: SigCT2StoreLocatorResponse = await apiGet('getStoresLatLong');
      setStoreLocations(data.stores ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load stores');
    } finally {
      setIsLoading(false);
    }
  }, [apiGet]);

  const fetchDSCLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isBrowser) {
        const mock = buildMockDSCLocations();
        setDscLocations(mock.shops ?? []);
        return;
      }
      const data: SigCT2DSCLocatorResponse = await apiGet('getShopsLatLong');
      setDscLocations(data.shops ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load DSC shops');
    } finally {
      setIsLoading(false);
    }
  }, [apiGet]);

  const fetchShopStores = useCallback(async (shopNo: string) => {
    try {
      const data = await apiGet(`getSigCtShopStores?shopNo=${shopNo}`);
      setShopStores(data.stores ?? []);
    } catch {
      setShopStores([]);
    }
  }, [apiGet]);

  const fetchStoreDetail = useCallback(async (storeNo: string, supportCenter?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = supportCenter
        ? `storeNo=${storeNo}&supportCenter=${supportCenter}`
        : `storeNo=${storeNo}`;
      const data = await apiGet(`getStoreEntityInformation?${params}`);
      const attrs = data.store?.entityAttributes ?? {};
      const storeData = data.store?.storeData ?? {};
      setSelectedStoreDetail({
        name: storeData.storeName ?? attrs.name ?? '',
        address: attrs.address1 ?? '',
        address2: attrs.address2 ?? '',
        city: attrs.city ?? '',
        state: attrs.state ?? storeData.stateName ?? '',
        postalCode: attrs.postalCode ?? '',
        country: attrs.country ?? storeData.countryName ?? '',
        phone: attrs.phone ?? storeData.phone ?? '',
        dscNo: attrs.dsc_no ?? storeData.dscNo ?? '',
        logo: attrs.logo ?? storeData.logoName ?? '',
        division: storeData.divisionName ?? '',
        region: storeData.regionName ?? '',
        district: storeData.districtName ?? '',
        adi: storeData.adiName ?? attrs.adi ?? '',
        marketDivision: attrs.market_division ?? storeData.marketDivisionName ?? '',
        banner: attrs.banner ?? storeData.bannerName ?? '',
        closed: attrs.closed ?? '',
        openDate: attrs.openDate ?? storeData.openDate ?? '',
        managerName: attrs.managerName ?? storeData.managerName ?? '',
        latitude: attrs.latitude ?? '',
        longitude: attrs.longitude ?? '',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load store detail');
    } finally {
      setIsLoading(false);
    }
  }, [apiGet]);

  return {
    storeLocations, dscLocations, shopStores, selectedStoreDetail,
    fetchStoreLocations, fetchDSCLocations, fetchShopStores, fetchStoreDetail,
    setSelectedStoreDetail,
    isLoading, error
  };
}
