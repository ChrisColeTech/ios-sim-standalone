import { useEffect, useMemo } from 'react';
import { useSimulatorWs } from './useSimulatorWs';
import { CUSTOM_APP_IDS, DOCK_ITEMS_IPAD, DOCK_ITEMS_IPHONE, HOME_PAGES } from '../constants/home';
import { useUiStoreState as useUiStore } from '../store/uiStore';
import type { HomePage, HomeGridItem, ViewportState } from '../types/app';

export function useViewportState(): ViewportState {
  const simulatorWs = useSimulatorWs();
  const deviceFamily = useUiStore((state) => state.deviceFamily);
  const isLandscape = useUiStore((state) => state.isLandscape);
  const theme = useUiStore((state) => state.theme);
  const isLocked = useUiStore((state) => state.isLocked);
  const openApp = useUiStore((state) => state.openApp);
  const openAppOrigin = useUiStore((state) => state.openAppOrigin);
  const showDebugZones = useUiStore((state) => state.showDebugZones);
  const currentPage = useUiStore((state) => state.currentPage);
  const time = useUiStore((state) => state.time);
  const battery = useUiStore((state) => state.battery);
  const setSimulatorState = useUiStore((state) => state.setSimulatorState);
  const closeApp = useUiStore((state) => state.closeApp);
  const nextPage = useUiStore((state) => state.nextPage);
  const openAppById = useUiStore((state) => state.openAppById);
  const previousPage = useUiStore((state) => state.previousPage);
  const unlock = useUiStore((state) => state.unlock);
  const toggleLock = useUiStore((state) => state.toggleLock);

  useEffect(() => {
    setSimulatorState({
      deviceFamily: simulatorWs.device?.startsWith('ipad') ? 'ipad' : 'iphone',
      isLandscape: simulatorWs.isLandscape,
      theme: simulatorWs.theme
    });
  }, [setSimulatorState, simulatorWs.device, simulatorWs.isLandscape, simulatorWs.theme]);

  const showStockApps = useUiStore((state) => state.showStockApps);
  const showCustomApps = useUiStore((state) => state.showCustomApps);
  const allDockItems = deviceFamily === 'ipad' ? DOCK_ITEMS_IPAD : DOCK_ITEMS_IPHONE;

  const dockItems = useMemo(() => allDockItems.filter((item) => {
    const isCustom = CUSTOM_APP_IDS.has(item.id);
    return isCustom ? showCustomApps : showStockApps;
  }), [allDockItems, showStockApps, showCustomApps]);

  const pages = useMemo(() => {
    const dockIds = new Set(allDockItems.map((d) => d.id));
    const cols = 4;
    const rows = 6;
    // Collect widgets (keep on page 1) and all non-dock apps across all pages
    const widgets: HomeGridItem[] = [];
    const apps: HomeGridItem[] = [];
    for (const page of HOME_PAGES) {
      for (const item of page.items) {
        if (item.kind === 'widget') widgets.push(item);
        else if (!dockIds.has(item.id)) apps.push(item);
      }
    }

    // Filter apps by visibility
    const filteredApps = apps.filter((item) => {
      const isCustom = CUSTOM_APP_IDS.has(item.id);
      return isCustom ? showCustomApps : showStockApps;
    });

    // Replace widgets with placeholders when stock apps are hidden
    const visibleWidgets = showStockApps
      ? widgets
      : widgets.map((w, i) => ({ ...w, id: `placeholder-widget-${i + 1}`, label: undefined }));

    // Build pages by flowing items into grid slots
    const result: HomePage[] = [];
    let appIdx = 0;

    let placeholderIdx = 1;
    const makePlaceholder = (c: number, r: number): HomeGridItem => ({
      id: `placeholder-${placeholderIdx++}`, kind: 'app', colStart: c, rowStart: r
    });

    // Page 1: widgets first, then apps fill remaining slots, then placeholders
    const page1Items: HomeGridItem[] = [...visibleWidgets];
    const occupied = new Set<string>();
    for (const w of visibleWidgets) {
      for (let r = w.rowStart; r < w.rowStart + (w.rowSpan ?? 1); r++)
        for (let c = w.colStart; c < w.colStart + (w.colSpan ?? 1); c++)
          occupied.add(`${r}:${c}`);
    }
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        if (!occupied.has(`${r}:${c}`)) {
          if (appIdx < filteredApps.length) {
            page1Items.push({ ...filteredApps[appIdx], colStart: c, rowStart: r });
            appIdx++;
          } else {
            page1Items.push(makePlaceholder(c, r));
          }
        }
      }
    }
    result.push({ id: 'page-1', items: page1Items });

    // Remaining pages: flow apps, fill remainder with placeholders
    // Always produce at least 3 pages total
    const minPages = 3;
    while (appIdx < filteredApps.length || result.length < minPages) {
      const pageItems: HomeGridItem[] = [];
      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          if (appIdx < filteredApps.length) {
            pageItems.push({ ...filteredApps[appIdx], colStart: c, rowStart: r });
            appIdx++;
          } else {
            pageItems.push(makePlaceholder(c, r));
          }
        }
      }
      result.push({ id: `page-${result.length + 1}`, items: pageItems });
    }

    return result;
  }, [allDockItems, showStockApps, showCustomApps]);

  return {
    battery,
    currentPage,
    deviceFamily,
    isLandscape,
    theme,
    dockItems,
    isLocked,
    openApp,
    openAppOrigin,
    pages,
    pageCount: pages.length,
    showDebugZones,
    time,
    onCloseApp: closeApp,
    onNextPage: nextPage,
    onOpenApp: openAppById,
    onPreviousPage: previousPage,
    onUnlock: unlock,
    onToggleLock: toggleLock
  };
}
