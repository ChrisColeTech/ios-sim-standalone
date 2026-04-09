import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { HOME_PAGES } from '../constants/home';
import type { HomeLayoutMetrics, UiStoreState } from '../types/app';

function metricsAreEqual(left: HomeLayoutMetrics | undefined, right: HomeLayoutMetrics) {
  if (!left) {
    return false;
  }

  return left.iconSize === right.iconSize
    && left.dockSize === right.dockSize
    && left.gridGap === right.gridGap
    && left.dockGap === right.dockGap
    && left.dockPadding === right.dockPadding;
}

export const useUiStoreState = create<UiStoreState>()(
  persist(
    (set) => ({
      deviceId: null,
      deviceFamily: 'iphone',
      isLandscape: false,
      theme: 'light',
      time: '9:41',
      battery: '85%',
      isLocked: true,
      hasCompletedHello: false,
      isTransitioning: false,
      openApp: null,
      openAppOrigin: null,
      openOverlay: null,
      showDebugZones: false,
      showStockApps: true,
      showCustomApps: true,
      currentPage: 0,
      homeMetricsCache: {},
      safariUrl: '',
      safariFavorites: [],
      safariRecents: [],
      setSimulatorState: (payload) => {
        set((state) => {
          const next: Partial<UiStoreState> = {};
          if (payload.deviceId !== undefined && payload.deviceId !== state.deviceId) next.deviceId = payload.deviceId;
          if (payload.deviceFamily !== state.deviceFamily) next.deviceFamily = payload.deviceFamily;
          if (payload.isLandscape !== state.isLandscape) next.isLandscape = payload.isLandscape;
          if (payload.theme !== state.theme) next.theme = payload.theme;
          return Object.keys(next).length > 0 ? next : state;
        });
      },
      setTransitioning: (val) => {
        set({ isTransitioning: val });
      },
      openAppById: (appId, origin) => {
        set({
          openApp: appId,
          openAppOrigin: origin ?? null
        });
      },
      closeApp: () => {
        set({
          openApp: null,
          openAppOrigin: null
        });
      },
      setOpenOverlay: (overlay) => {
        set({ openOverlay: overlay });
      },
      closeOverlay: () => {
        set({ openOverlay: null });
      },
      toggleDebugZones: () => {
        set((state) => ({ showDebugZones: !state.showDebugZones }));
      },
      toggleStockApps: () => {
        set((state) => ({ showStockApps: !state.showStockApps, currentPage: 0 }));
      },
      toggleCustomApps: () => {
        set((state) => ({ showCustomApps: !state.showCustomApps, currentPage: 0 }));
      },
      nextPage: () => {
        set((state) => ({
          currentPage: Math.min(state.currentPage + 1, HOME_PAGES.length - 1)
        }));
      },
      previousPage: () => {
        set((state) => ({
          currentPage: Math.max(state.currentPage - 1, 0)
        }));
      },
      setCurrentPage: (page) => {
        set({
          currentPage: Math.max(0, Math.min(page, HOME_PAGES.length - 1))
        });
      },
      unlock: () => {
        set({ isLocked: false });
      },
      toggleLock: () => {
        set((state) => ({ isLocked: !state.isLocked }));
      },
      completeHello: () => {
        set({ hasCompletedHello: true });
      },
      setSafariUrl: (url) => {
        set({ safariUrl: url });
      },
      addSafariFavorite: (url, title) => {
        set((state) => {
          if (state.safariFavorites.some((f) => f.url === url)) return state;
          return { safariFavorites: [...state.safariFavorites, { url, title }] };
        });
      },
      removeSafariFavorite: (url) => {
        set((state) => ({
          safariFavorites: state.safariFavorites.filter((f) => f.url !== url)
        }));
      },
      addSafariRecent: (url, title) => {
        set((state) => {
          const filtered = state.safariRecents.filter((r) => r.url !== url);
          return { safariRecents: [{ url, title }, ...filtered].slice(0, 12) };
        });
      },
      setHomeMetrics: (cacheKey, metrics) => {
        set((state) => {
          const previousMetrics = state.homeMetricsCache[cacheKey];

          if (metricsAreEqual(previousMetrics, metrics)) {
            return state;
          }

          return {
            homeMetricsCache: {
              ...state.homeMetricsCache,
              [cacheKey]: metrics
            }
          };
        });
      }
    }),
    {
      name: 'frontend-ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentPage: state.currentPage,
        showStockApps: state.showStockApps,
        showCustomApps: state.showCustomApps,
        homeMetricsCache: state.homeMetricsCache,
        safariUrl: state.safariUrl,
        safariFavorites: state.safariFavorites,
        safariRecents: state.safariRecents
      })
    }
  )
);
