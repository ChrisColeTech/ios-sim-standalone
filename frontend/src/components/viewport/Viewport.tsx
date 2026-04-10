import { useEffect, useRef, useState } from 'react';
import { BottomBar } from '../chrome/BottomBar';
import { Wallpaper } from '../chrome/Wallpaper';
import { ViewportRouter } from './ViewportRouter';
import { useAppTransition } from '../../hooks/useAppTransition';
import type { ViewportProps } from '../../types/components';
import type { AppOpenOrigin } from '../../types/app';

export function Viewport(props: ViewportProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [viewportRect, setViewportRect] = useState<AppOpenOrigin | null>(null);
  const transition = useAppTransition(props.openApp, props.openAppOrigin, props.onCloseApp);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const updateRect = () => {
      const rect = element.getBoundingClientRect();
      setViewportRect({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
    };

    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(element);
    window.addEventListener('resize', updateRect);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateRect);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden w-full h-full">
      <Wallpaper theme={props.theme} />
      <div className="relative z-10 h-full">
        <ViewportRouter {...props} transition={transition} viewportRect={viewportRect} />
      </div>
      {transition.phase !== 'idle' ? <BottomBar onClose={transition.close} /> : null}
    </section>
  );
}
