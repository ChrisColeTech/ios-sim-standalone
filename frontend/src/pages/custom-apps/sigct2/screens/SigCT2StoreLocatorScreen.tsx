import maplibregl from 'maplibre-gl';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import { LuInfo } from 'react-icons/lu';
import { OneColLayout } from '../../../../components/layout';
import { SigCT2SearchBar } from '../components/SigCT2SearchBar';
import { SIGCT2_MAP_STYLE_LIGHT, SIGCT2_MAP_STYLE_DARK } from '../../../../constants/custom-apps/sigct2';
import type { SigCT2StoreLocation } from '../../../../types/custom-apps/sigct2';

type SigCT2StoreLocatorScreenProps = {
  stores: SigCT2StoreLocation[];
  title: string;
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
  onSelectPin: (p: SigCT2StoreLocation) => void;
  onClearPin: () => void;
  onSelectStore: (s: { storeNo?: string; storeName?: string; supportCenter?: string }) => void;
  onBack: () => void;
};

export function SigCT2StoreLocatorScreen(props: SigCT2StoreLocatorScreenProps) {
  const searchBar = (
    <SigCT2SearchBar
      value={props.search}
      placeholder="Search stores..."
      isDark={props.isDark}
      onChange={props.onSearchChange}
      onClear={props.onClearSearch}
    />
  );

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
            anchor="bottom"
            offset={12}
            closeOnClick={false}
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

  if (props.deviceFamily === 'ipad') {
    return <>{searchBar}{mapContent}</>;
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{ title: props.title, leadingLabel: '\u2039 SigCT2' }}
      topContent={searchBar}
      topContentPlacement="fixed"
      sections={[]}
      bottomContent={mapContent}
      onLeadingAction={props.onBack}
    />
  );
}
