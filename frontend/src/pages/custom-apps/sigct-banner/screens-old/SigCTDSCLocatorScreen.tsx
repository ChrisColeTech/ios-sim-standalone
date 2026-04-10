import maplibregl from 'maplibre-gl';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import { LuSearch, LuInfo, LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { OneColLayout } from '../../../../components/layout';

import type { SigCTStoreLocation } from '../../../../types/custom-apps/sigct-banner';
import { MAP_STYLE_LIGHT, MAP_STYLE_DARK } from '../../../../constants/custom-apps/sigct-banner';

type SigCTDSCLocatorScreenProps = {
  shops: SigCTStoreLocation[];
  shopStores: SigCTStoreLocation[];
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  isLoading: boolean;
  // Map search state (from hook)
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  validPins: SigCTStoreLocation[];
  selectedPin: SigCTStoreLocation | null;
  onSelectPin: (shop: SigCTStoreLocation) => void;
  onClearPin: () => void;
  showStoreList: boolean;
  onShowStoreList: () => void;
  onHideStoreList: () => void;
  onAnnotationInfo: (shop: SigCTStoreLocation) => void;
  onSelectStore: (store: SigCTStoreLocation) => void;
  onBack: () => void;
};

export function SigCTDSCLocatorScreen(props: SigCTDSCLocatorScreenProps) {
  const storeListFooter = props.showStoreList ? (
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
        mapStyle={props.isDark ? MAP_STYLE_DARK : MAP_STYLE_LIGHT}
        minZoom={3} maxZoom={18} reuseMaps attributionControl={false}
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
            anchor="bottom" offset={12} closeOnClick={false}
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

  const searchBar = (
    <div className="flex items-center gap-1 px-1">
      <LuSearch className="h-3 w-3 text-black/30" />
      <input
        className={`flex-1 bg-transparent text-[9px] outline-none ${props.isDark ? 'text-white placeholder:text-white/40' : 'text-black placeholder:text-black/30'}`}
        placeholder="Search DSC shops..."
        value={props.search}
        onChange={e => props.onSearchChange(e.target.value)}
      />
      {props.search && <button onClick={props.onClearSearch} className={`text-[8px] ${props.isDark ? 'text-white' : 'text-black'}`}>Cancel</button>}
    </div>
  );

  return (
    <>
      <OneColLayout
        deviceFamily={props.deviceFamily}
        isLandscape={false}
        theme={props.theme}
        toolbar={{ title: 'DSC Locator', leadingLabel: '‹ D&SC' }}
        topContent={searchBar}
        topContentPlacement="fixed"
        sections={[]}
        bottomContent={mapContent}
        footer={storeListFooter}
        onLeadingAction={props.onBack}
      />
    </>
  );
}
