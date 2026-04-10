import maplibregl from 'maplibre-gl';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import { LuInfo, LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { OneColLayout } from '../../../../components/layout';
import { SigCT2SearchBar } from '../components/SigCT2SearchBar';
import { SIGCT2_MAP_STYLE_LIGHT, SIGCT2_MAP_STYLE_DARK } from '../../../../constants/custom-apps/sigct2';
import type { SigCT2StoreLocation } from '../../../../types/custom-apps/sigct2';

type SigCT2DSCLocatorScreenProps = {
  shops: SigCT2StoreLocation[];
  shopStores: SigCT2StoreLocation[];
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  isLoading: boolean;
  search: string;
  onSearchChange: (v: string) => void;
  onClearSearch: () => void;
  validPins: SigCT2StoreLocation[];
  selectedPin: SigCT2StoreLocation | null;
  onSelectPin: (shop: SigCT2StoreLocation) => void;
  onClearPin: () => void;
  showStoreList: boolean;
  onShowStoreList: () => void;
  onHideStoreList: () => void;
  onAnnotationInfo: (shop: SigCT2StoreLocation) => void;
  onSelectStore: (store: SigCT2StoreLocation) => void;
  onBack: () => void;
};

export function SigCT2DSCLocatorScreen(props: SigCT2DSCLocatorScreenProps) {
  const searchBar = (
    <SigCT2SearchBar
      value={props.search}
      placeholder="Search DSC shops..."
      isDark={props.isDark}
      onChange={props.onSearchChange}
      onClear={props.onClearSearch}
    />
  );

  const storeListContent = props.showStoreList ? (
    <div className={`border-t ${props.isDark ? 'border-white/10' : 'border-black/10'}`}>
      <button
        onClick={props.onHideStoreList}
        className={`flex w-full items-center justify-end gap-0.5 px-3 py-1 text-[8px] ${props.isDark ? 'text-white' : 'text-black'}`}
      >
        Hide Stores <LuChevronDown className="h-2.5 w-2.5" />
      </button>
      <div className="max-h-[120px] overflow-auto">
        {props.shopStores.map((store, i) => (
          <button
            key={store.storeNo ?? i}
            onClick={() => props.onSelectStore(store)}
            className={`flex w-full items-center border-t px-3 py-2 text-left text-[9px] ${props.isDark ? 'border-white/5 text-white hover:bg-white/5' : 'border-black/5 text-black hover:bg-black/3'}`}
          >
            {store.storeNo} - {store.storeName}
          </button>
        ))}
        {props.shopStores.length === 0 && (
          <div className={`px-3 py-2 text-[8px] ${props.isDark ? 'text-white/40' : 'text-black/40'}`}>No stores for this shop</div>
        )}
      </div>
    </div>
  ) : props.shopStores.length > 0 ? (
    <button
      onClick={props.onShowStoreList}
      className={`flex w-full items-center justify-end gap-0.5 border-t px-3 py-1 text-[8px] ${props.isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
    >
      Show Stores <LuChevronUp className="h-2.5 w-2.5" />
    </button>
  ) : null;

  const mapContent = (
    <div className="relative h-full">
      <Map
        initialViewState={{ latitude: 38.5, longitude: -96.0, zoom: 4 }}
        mapLib={maplibregl}
        mapStyle={props.isDark ? SIGCT2_MAP_STYLE_DARK : SIGCT2_MAP_STYLE_LIGHT}
        minZoom={3}
        maxZoom={18}
        reuseMaps
        attributionControl={false}
        style={{ position: 'absolute', inset: 0 }}
      >
        {props.validPins.map((shop, i) => (
          <Marker
            key={shop.shopNo ?? shop.storeNo ?? i}
            latitude={parseFloat(shop.latitude!)}
            longitude={parseFloat(shop.longitude!)}
            anchor="bottom"
            onClick={e => { e.originalEvent.stopPropagation(); props.onSelectPin(shop); }}
          >
            <div className="h-2.5 w-2.5 rounded-full border border-white bg-red-500 shadow" />
          </Marker>
        ))}
        {props.selectedPin && props.selectedPin.latitude && props.selectedPin.longitude && (
          <Popup
            latitude={parseFloat(props.selectedPin.latitude)}
            longitude={parseFloat(props.selectedPin.longitude)}
            anchor="bottom"
            offset={12}
            closeOnClick={false}
            onClose={props.onClearPin}
          >
            <div className="flex items-center gap-1.5 px-1 py-0.5">
              <span className="text-[9px] font-medium text-black">
                {props.selectedPin.shopNo ?? props.selectedPin.storeNo} - {props.selectedPin.storeName}
              </span>
              <button
                onClick={() => props.onAnnotationInfo(props.selectedPin!)}
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${props.isDark ? 'border-white/30 text-white' : 'border-black/20 text-black'}`}
              >
                <LuInfo className="h-2.5 w-2.5" />
              </button>
            </div>
          </Popup>
        )}
      </Map>
      {props.isLoading && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2">
          <div className={`h-4 w-4 animate-spin rounded-full border-2 ${props.isDark ? 'border-white/30 border-t-white' : 'border-black/20 border-t-black'}`} />
        </div>
      )}
    </div>
  );

  if (props.deviceFamily === 'ipad') {
    return <>{searchBar}{mapContent}{storeListContent}</>;
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{ title: 'DSC Locator', leadingLabel: '\u2039 D&SC' }}
      topContent={searchBar}
      topContentPlacement="fixed"
      sections={[]}
      bottomContent={mapContent}
      footer={storeListContent}
      onLeadingAction={props.onBack}
    />
  );
}
