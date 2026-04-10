import maplibregl from 'maplibre-gl';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import { LuSearch, LuInfo } from 'react-icons/lu';
import { OneColLayout } from '../../../../components/layout';

import type { SigCTStoreLocation } from '../../../../types/custom-apps/sigct-banner';
import { MAP_STYLE_LIGHT, MAP_STYLE_DARK } from '../../../../constants/custom-apps/sigct-banner';

type SigCTStoreLocatorScreenProps = {
  stores: SigCTStoreLocation[];
  title: string;
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
  onSelectPin: (store: SigCTStoreLocation) => void;
  onClearPin: () => void;
  onSelectStore: (store: SigCTStoreLocation) => void;
  onBack: () => void;
};

export function SigCTStoreLocatorScreen(props: SigCTStoreLocatorScreenProps) {
  const mapContent = (
    <div className="relative h-full">
      <Map
        initialViewState={{ latitude: 38.5, longitude: -96.0, zoom: 4 }}
        mapLib={maplibregl}
        mapStyle={props.isDark ? MAP_STYLE_DARK : MAP_STYLE_LIGHT}
        minZoom={3} maxZoom={18} reuseMaps attributionControl={false}
        style={{ position: 'absolute', inset: 0 }}
      >
        {props.validPins.map((store, i) => (
          <Marker
            key={store.storeNo ?? store.shopNo ?? i}
            latitude={parseFloat(store.latitude!)}
            longitude={parseFloat(store.longitude!)}
            anchor="bottom"
            onClick={e => { e.originalEvent.stopPropagation(); props.onSelectPin(store); }}
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
                {props.selectedPin.storeNo ?? props.selectedPin.shopNo} - {props.selectedPin.storeName}
              </span>
              <button
                onClick={() => props.onSelectStore(props.selectedPin!)}
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
        placeholder="Search stores..."
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
        toolbar={{ title: props.title, leadingLabel: '‹ SigCT' }}
        topContent={searchBar}
        topContentPlacement="fixed"
        sections={[]}
        bottomContent={mapContent}
        onLeadingAction={props.onBack}
      />
    </>
  );
}
