import { StatusBar } from '../components/chrome/StatusBar';
import { GridPage } from '../components/home/GridPage';
import { HomeDock } from '../components/home/HomeDock';
import { useHomeLayoutMetrics } from '../hooks/useHomeLayoutMetrics';
import { useHomePageSwipe } from '../hooks/useHomePageSwipe';
import { useLayoutProfile } from '../hooks/useLayoutProfile';
import type { HomePageProps } from '../types/components';

export function HomePage(props: HomePageProps) {
  const swipe = useHomePageSwipe({
    onNextPage: props.onNextPage,
    onPreviousPage: props.onPreviousPage
  });
  const {
    containerRef,
    pageTransitionDirection,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handlePointerLeave,
    handleLostPointerCapture,
    handleWheel
  } = swipe;
  const layoutProfile = useLayoutProfile({
    deviceFamily: props.deviceFamily,
    isLandscape: props.isLandscape
  });
  const dockCount = props.deviceFamily === 'ipad' ? 8 : 4;
  const metrics = useHomeLayoutMetrics({
    containerRef,
    dockEdge: layoutProfile.dockEdge,
    dockCount,
    deviceFamily: props.deviceFamily,
    isLandscape: props.isLandscape
  });

  if (layoutProfile.dockEdge === 'right') {
    return (
      <section ref={containerRef} className="grid h-full grid-cols-[minmax(0,1fr)_auto] gap-1 p-0">
        <div
        className="relative min-h-0 overflow-hidden touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerLeave}
          onLostPointerCapture={handleLostPointerCapture}
          onWheel={handleWheel}
        >
          <StatusBar forceTextColor="white" />
          <GridPage
            page={props.page}
            currentPage={props.currentPage}
            pageCount={props.pageCount}
            isLandscape={props.isLandscape}
            pageTransitionDirection={pageTransitionDirection}
            onOpenApp={props.onOpenApp}
            iconSize={metrics.iconSize}
            gap={metrics.gridGap}
          />
        </div>
        <div className="h-full">
          <HomeDock
            edge={layoutProfile.dockEdge}
            items={props.dockItems}
            iconSize={metrics.iconSize}
            dockSize={metrics.dockSize}
            gap={metrics.dockGap}
            padding={metrics.dockPadding}
            onOpenApp={props.onOpenApp}
          />
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative grid h-full grid-rows-[minmax(0,1fr)_auto] gap-1 p-0">
      <StatusBar forceTextColor="white" />
      <div
        className="min-h-0 overflow-hidden touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        onLostPointerCapture={handleLostPointerCapture}
        onWheel={handleWheel}
      >
        <GridPage
          page={props.page}
          currentPage={props.currentPage}
          pageCount={props.pageCount}
          isLandscape={props.isLandscape}
          pageTransitionDirection={pageTransitionDirection}
          onOpenApp={props.onOpenApp}
          iconSize={metrics.iconSize}
          gap={metrics.gridGap}
        />
      </div>
      <div className="shrink-0">
        <HomeDock
          edge={layoutProfile.dockEdge}
          items={props.dockItems}
          iconSize={metrics.iconSize}
          dockSize={metrics.dockSize}
          gap={metrics.dockGap}
          padding={metrics.dockPadding}
          onOpenApp={props.onOpenApp}
        />
      </div>
    </section>
  );
}
