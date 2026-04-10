import type { DebugZonesOverlayProps } from '../../types/components';

export function DebugZonesOverlay(props: DebugZonesOverlayProps) {
  const isPhoneLandscape = props.deviceFamily === 'iphone' && props.isLandscape;

  const getLabelClassName = (zoneId: DebugZonesOverlayProps['zones'][number]['id']) => {
    if (zoneId === 'notification-center') {
      return isPhoneLandscape ? 'left-3 top-1/2 -translate-y-1/2 items-start text-left' : 'bottom-3 left-3 items-start text-left';
    }

    if (zoneId === 'control-center') {
      return isPhoneLandscape ? 'right-3 top-1/2 -translate-y-1/2 items-end text-right' : 'bottom-3 right-3 items-end text-right';
    }

    if (zoneId === 'spotlight') {
      return 'bottom-3 left-1/2 -translate-x-1/2 items-center text-center';
    }

    return isPhoneLandscape ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center' : 'left-1/2 top-3 -translate-x-1/2 items-center text-center';
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {props.zones.map((zone) => (
        <div
          key={zone.id}
          className={`absolute ${props.gestureStartZoneId === zone.id ? 'outline-2 outline-white/80' : props.hoveredZoneId === zone.id ? 'outline-2 outline-white/50' : ''}`}
          style={{ left: zone.rect.x, top: zone.rect.y, width: zone.rect.width, height: zone.rect.height, background: zone.color }}
        >
          <div className={`absolute flex max-w-[calc(100%-1.5rem)] ${getLabelClassName(zone.id)}`}>
            <div className="rounded-2xl bg-black/55 px-3 py-2 text-[10px] text-white shadow-sm backdrop-blur-sm">
              <div className="font-semibold tracking-[0.08em]">{zone.label}</div>
              <div className="mt-0.5 text-white/85">{zone.hint}</div>
              {props.gestureStartZoneId === zone.id ? <div className="mt-1 font-medium text-white/95">Active</div> : null}
              {props.gestureStartZoneId !== zone.id && props.hoveredZoneId === zone.id ? <div className="mt-1 font-medium text-white/95">Hover</div> : null}
            </div>
          </div>
        </div>
      ))}
      {props.lastResolvedAction ? <div className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-white">Last action: {props.lastResolvedAction}</div> : null}
    </div>
  );
}
