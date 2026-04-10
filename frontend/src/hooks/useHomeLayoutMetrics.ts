import { useEffect, useMemo, useState, type RefObject } from 'react';
import { useUiStoreState as useUiStore } from '../store/uiStore';
import type { HomeLayoutMetrics } from '../types/app';

type DockEdge = 'bottom' | 'right';

type HomeLayoutMetricsInput = {
  containerRef: RefObject<HTMLElement | null>;
  dockEdge: DockEdge;
  dockCount: number;
  deviceFamily: 'iphone' | 'ipad';
  isLandscape: boolean;
};

type Size = { width: number; height: number };

const DEFAULT_SIZE: Size = { width: 390, height: 844 };

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function useHomeLayoutMetrics(input: HomeLayoutMetricsInput): HomeLayoutMetrics {
  const metricsCacheKey = useMemo(
    () => `${input.deviceFamily}:${input.isLandscape ? 'landscape' : 'portrait'}:${input.dockEdge}:${input.dockCount}`,
    [input.deviceFamily, input.dockCount, input.dockEdge, input.isLandscape]
  );
  const cachedMetrics = useUiStore((state) => state.homeMetricsCache[metricsCacheKey]);
  const setHomeMetrics = useUiStore((state) => state.setHomeMetrics);

  const [size, setSize] = useState<Size>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_SIZE;
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  useEffect(() => {
    const element = input.containerRef.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      setSize({ width: element.clientWidth, height: element.clientHeight });
    };

    updateSize();

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [input.containerRef]);

  const computedMetrics = useMemo(() => {
    const gridColumns = input.isLandscape ? 6 : 4;
    const gridRows = input.isLandscape ? 4 : 6;

    const profile = input.deviceFamily === 'ipad'
      ? {
          gridGap: 6,
          dockGap: 4,
          dockPadding: 4,
          indicatorHeight: 28,
          statusBarHeight: 16,
          outerPadding: 0,
          sectionGap: 4,
          gridPaddingX: 16,
          gridPaddingY: 4,
          iconScale: 0.72,
          minIcon: 36,
          maxIcon: 50
        }
      : input.isLandscape
        ? {
            gridGap: 6,
            dockGap: 6,
            dockPadding: 6,
            indicatorHeight: 16,
            statusBarHeight: 16,
            outerPadding: 0,
            sectionGap: 4,
            gridPaddingX: 8,
            gridPaddingY: 2,
            iconScale: 0.72,
            minIcon: 16,
            maxIcon: 44
          }
        : {
            gridGap: 10,
            dockGap: 8,
            dockPadding: 8,
            indicatorHeight: 28,
            statusBarHeight: 16,
            outerPadding: 0,
            sectionGap: 4,
            gridPaddingX: 16,
            gridPaddingY: 4,
            iconScale: 0.72,
            minIcon: 34,
            maxIcon: 54
          };

    const width = Math.max(1, size.width - profile.outerPadding * 2);
    const height = Math.max(1, size.height - profile.outerPadding * 2 - profile.statusBarHeight);

    if (input.dockEdge === 'right') {
      let iconSize = 52;

      for (let i = 0; i < 4; i += 1) {
        const dockSize = iconSize + profile.dockPadding * 2;
        const mainWidth = Math.max(1, width - dockSize - profile.sectionGap);
        const mainHeight = Math.max(1, height - profile.indicatorHeight);
        const gridWidth = Math.max(1, mainWidth - profile.gridPaddingX);
        const gridHeight = Math.max(1, mainHeight - profile.gridPaddingY);
        const cellWidth = Math.max(1, (gridWidth - profile.gridGap * (gridColumns - 1)) / gridColumns);
        const cellHeight = Math.max(1, (gridHeight - profile.gridGap * (gridRows - 1)) / gridRows);
        const labelSpace = 14;
        iconSize = clamp(Math.min(cellWidth * profile.iconScale, cellHeight - labelSpace), profile.minIcon, profile.maxIcon);
      }

      const dockSize = Math.round(iconSize + profile.dockPadding * 2);

      return {
        iconSize: Math.round(iconSize),
        dockSize,
        gridGap: profile.gridGap,
        dockGap: profile.dockGap,
        dockPadding: profile.dockPadding
      };
    }

    let iconSize = 52;

    for (let i = 0; i < 4; i += 1) {
      const dockSize = iconSize + profile.dockPadding * 2;
      const maxByDockRow = (width - profile.dockPadding * 2 - profile.dockGap * (input.dockCount - 1)) / input.dockCount;
      const mainHeight = Math.max(1, height - profile.indicatorHeight - dockSize - profile.sectionGap);
      const gridWidth = Math.max(1, width - profile.gridPaddingX);
      const gridHeight = Math.max(1, mainHeight - profile.gridPaddingY);
      const cellWidth = Math.max(1, (gridWidth - profile.gridGap * (gridColumns - 1)) / gridColumns);
      const cellHeight = Math.max(1, (gridHeight - profile.gridGap * (gridRows - 1)) / gridRows);
      const labelSpace = 14;
      const maxByCell = Math.min(cellWidth * profile.iconScale, cellHeight - labelSpace);
      iconSize = clamp(Math.min(maxByCell, maxByDockRow), profile.minIcon, profile.maxIcon);
    }

    const dockSize = Math.round(iconSize + profile.dockPadding * 2);

    return {
      iconSize: Math.round(iconSize),
      dockSize,
      gridGap: profile.gridGap,
      dockGap: profile.dockGap,
      dockPadding: profile.dockPadding
    };
  }, [input.deviceFamily, input.dockCount, input.dockEdge, input.isLandscape, size.height, size.width]);

  useEffect(() => {
    setHomeMetrics(metricsCacheKey, computedMetrics);
  }, [computedMetrics, metricsCacheKey, setHomeMetrics]);

  return cachedMetrics ?? computedMetrics;
}
