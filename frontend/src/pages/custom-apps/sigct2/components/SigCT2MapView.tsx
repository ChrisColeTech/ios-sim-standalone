import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import type { SigCT2StoreLocation } from '../../../../types/custom-apps/sigct2';
import 'maplibre-gl/dist/maplibre-gl.css';

type SigCT2MapViewProps = {
  pins: SigCT2StoreLocation[];
  selectedPin: SigCT2StoreLocation | null;
  isDark: boolean;
  onSelectPin: (pin: SigCT2StoreLocation) => void;
  onInfoClick: (pin: SigCT2StoreLocation) => void;
  footer?: React.ReactNode;
};

const LIGHT_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DARK_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export function SigCT2MapView({
  pins,
  selectedPin,
  isDark,
  onSelectPin,
  onInfoClick,
  footer,
}: SigCT2MapViewProps) {
  const [viewState, setViewState] = useState({
    latitude: 39.8,
    longitude: -98.5,
    zoom: 3,
  });

  const mapStyle = isDark ? DARK_STYLE : LIGHT_STYLE;
  const pinColor = isDark ? '#60a5fa' : '#2563eb';

  return (
    <div>
      <div className="h-[200px] overflow-hidden rounded">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle={mapStyle}
          style={{ width: '100%', height: '100%' }}
        >
          {pins.map((pin, i) => {
            const lat = parseFloat(pin.latitude ?? '');
            const lng = parseFloat(pin.longitude ?? '');
            if (isNaN(lat) || isNaN(lng)) return null;
            return (
              <Marker key={i} latitude={lat} longitude={lng} anchor="center" onClick={(e) => { e.originalEvent.stopPropagation(); onSelectPin(pin); }}>
                <div
                  className="rounded-full"
                  style={{ width: 10, height: 10, backgroundColor: pinColor, border: '2px solid white', cursor: 'pointer' }}
                />
              </Marker>
            );
          })}

          {selectedPin && (() => {
            const lat = parseFloat(selectedPin.latitude ?? '');
            const lng = parseFloat(selectedPin.longitude ?? '');
            if (isNaN(lat) || isNaN(lng)) return null;
            return (
              <Popup latitude={lat} longitude={lng} closeOnClick={false} onClose={() => {}} anchor="bottom" offset={12}>
                <div className="flex items-center gap-1 text-[9px]">
                  <span className="font-medium text-black">{selectedPin.storeName ?? selectedPin.storeNo ?? 'Store'}</span>
                  <button
                    onClick={() => onInfoClick(selectedPin)}
                    className="rounded bg-blue-500 px-1.5 py-0.5 text-[8px] text-white"
                  >
                    Info
                  </button>
                </div>
              </Popup>
            );
          })()}
        </Map>
      </div>
      {footer}
    </div>
  );
}
