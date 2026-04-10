import { AnimatePresence, motion } from 'framer-motion';
import { AppRouter } from '../apps/AppRouter';
import { HomePage } from '../../pages/HomePage';
import { DebugZonesPage } from '../../pages/DebugZonesPage';
import type { ViewportRouterProps } from '../../types/components';
import type { AppOpenOrigin } from '../../types/app';
import type { useAppTransition } from '../../hooks/useAppTransition';

const TRANSITION_CSS = 'transform 200ms cubic-bezier(0.2,0.8,0.2,1), opacity 200ms cubic-bezier(0.2,0.8,0.2,1)';

function getOriginTransform(origin: AppOpenOrigin | null, vw: number, vh: number) {
  const cx = origin ? origin.x + origin.width / 2 : vw / 2;
  const cy = origin ? origin.y + origin.height / 2 : vh / 2;
  const scale = origin ? Math.max(0.12, Math.min(origin.width / vw, origin.height / vh)) : 0.92;
  const tx = cx - vw / 2;
  const ty = cy - vh / 2;
  return `translate(${tx}px, ${ty}px) scale(${scale})`;
}

type Props = ViewportRouterProps & {
  transition: ReturnType<typeof useAppTransition>;
  viewportRect: AppOpenOrigin | null;
};

export function ViewportRouter(props: Props) {
  const { transition } = props;
  const showApp = transition.phase !== 'idle';

  const vw = props.viewportRect?.width ?? window.innerWidth;
  const vh = props.viewportRect?.height ?? window.innerHeight;
  const origin = transition.origin && props.viewportRect
    ? {
        x: transition.origin.x - props.viewportRect.x,
        y: transition.origin.y - props.viewportRect.y,
        width: transition.origin.width,
        height: transition.origin.height
      }
    : transition.origin;

  const isAtOrigin = transition.phase === 'opening' || transition.phase === 'closing';
  const transform = isAtOrigin ? getOriginTransform(origin, vw, vh) : 'translate(0,0) scale(1)';
  const opacity = transition.phase === 'opening' ? 0 : transition.phase === 'closing' ? 0.2 : 1;
  const shouldAnimate = transition.phase === 'open' || transition.phase === 'closing';

  return (
    <>
      <AnimatePresence mode="wait">
        {props.showDebugZones ? (
          <DebugZonesPage
            key="debug-zones"
            deviceFamily={props.deviceFamily}
            isLandscape={props.isLandscape}
            viewportWidth={vw}
            viewportHeight={vh}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        ) : (
          <motion.div
            key="home"
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: props.isLocked ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <HomePage
              currentPage={props.currentPage}
              pageCount={props.pageCount}
              page={props.pages[props.currentPage] ?? props.pages[0]}
              dockItems={props.dockItems}
              deviceFamily={props.deviceFamily}
              isLandscape={props.isLandscape}
              onNextPage={props.onNextPage}
              onPreviousPage={props.onPreviousPage}
              onOpenApp={props.onOpenApp}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {showApp && transition.appId ? (
        <div
          className="absolute inset-0 z-20 h-full will-change-transform"
          style={{
            transform,
            opacity,
            transition: shouldAnimate ? TRANSITION_CSS : 'none'
          }}
        >
          <AppRouter
            appId={transition.appId}
            deviceFamily={props.deviceFamily}
            isLandscape={props.isLandscape}
            theme={props.theme}
            openOrigin={origin}
            onClose={transition.close}
          />
        </div>
      ) : null}
    </>
  );
}
