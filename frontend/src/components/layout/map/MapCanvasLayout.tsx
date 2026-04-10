import maplibregl from 'maplibre-gl';
import Map, { Marker } from 'react-map-gl/maplibre';
import type { MapCanvasLayoutProps } from '../../../types/layouts';

export function MapCanvasLayout(props: MapCanvasLayoutProps) {
  const isDark = props.theme === 'dark';
  const markerColorClassName = isDark ? 'bg-cyan-300' : 'bg-cyan-600';
  const mapStyle = isDark ? props.scene.styleUrlDark : props.scene.styleUrlLight;

  return (
    <section className="relative h-full overflow-hidden">
      <Map
        initialViewState={props.scene.viewState}
        mapLib={maplibregl}
        mapStyle={mapStyle}
        minZoom={3}
        maxZoom={18}
        reuseMaps
        attributionControl={false}
        style={{ position: 'absolute', inset: 0 }}
      >
        {props.scene.markers?.map((marker) => (
          <Marker key={marker.id} longitude={marker.longitude} latitude={marker.latitude} anchor="bottom">
            <div className="flex flex-col items-center">
              {marker.label ? (
                <div className={`mb-1 rounded-md px-1.5 py-0.5 text-[9px] font-medium ${isDark ? 'bg-ios-gray-dark/80 text-white' : 'bg-white/90 text-black'} backdrop-blur-sm`}>
                  {marker.label}
                </div>
              ) : null}
              <div className="relative h-4 w-4">
                <div className={`absolute inset-0 rounded-full ${markerColorClassName} opacity-35`} />
                <div className={`absolute inset-[3px] rounded-full ${markerColorClassName} border border-white/80`} />
              </div>
            </div>
          </Marker>
        ))}
      </Map>

      <div className="absolute right-3 top-3 flex flex-col gap-2">
        {['layers', 'locate', '2d'].map((id) => (
          <button
            key={id}
            className={`h-6 w-6 rounded-full border text-[9px] ${isDark ? 'border-white/15 bg-ios-surface/80 text-white' : 'border-black/10 bg-white/90 text-black'} backdrop-blur-sm`}
            type="button"
          >
            {id === '2d' ? '2D' : '○'}
          </button>
        ))}
      </div>

      <div className="absolute bottom-3 left-2 right-2 flex items-end gap-1.5">
        <div className={`flex h-7 flex-1 items-center rounded-full border px-2 text-[10px] ${isDark ? 'border-white/10 bg-ios-surface/80 text-ios-gray' : 'border-black/10 bg-white/90 text-ios-gray'} backdrop-blur-sm`}>
          Search Maps
        </div>
        <button className={`h-7 w-7 rounded-full border ${isDark ? 'border-white/10 bg-ios-surface/80 text-white' : 'border-black/10 bg-white/90 text-black'} backdrop-blur-sm`} type="button">
          ◎
        </button>
      </div>

      {props.showInfoCard ? (
        <article className={`absolute left-2 top-2 w-[180px] rounded-xl border p-2 ${isDark ? 'border-white/10 bg-ios-gray-dark/70 text-white' : 'border-black/10 bg-white/85 text-black'} backdrop-blur-xl`}>
          <h2 className="text-[12px] font-semibold">{props.title ?? 'Saved Location'}</h2>
          {props.subtitle ? <p className={`pt-0.5 text-[10px] ${isDark ? 'text-ios-gray' : 'text-ios-gray'}`}>{props.subtitle}</p> : null}
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <button className={`rounded-lg p-1.5 text-left text-[10px] ${isDark ? 'bg-white/10' : 'bg-black/5'}`} type="button">Contact</button>
            <button className={`rounded-lg p-1.5 text-left text-[10px] ${isDark ? 'bg-white/10' : 'bg-black/5'}`} type="button">Directions</button>
          </div>
        </article>
      ) : null}
    </section>
  );
}
