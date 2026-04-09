# 02 - Session 2: Lessons Learned & Handoff

Covers the Electron V2 change port, remember/cache system rework, picker→simulator transition fix, and the single-window architecture decision.

---

## 1. What We Accomplished

### Ported Electron V2 Frontend Changes
Brought the SaaS app up to parity with the latest Electron V2 frontend fixes:

| Change | File | Status |
|--------|------|--------|
| Mock user `bannerDetail: 'kay'` + `storeNumber: '1234'` | `sconnect-mock.ts` | Fixed — demo user skips admin-setup |
| `needsAdminSetup` checks `previousBannerDetail`/`previousStoreNumber` | `useSConnectData.ts` | Fixed — returning users with saved settings skip setup |
| Hydration recovery uses `auth.user` + calls `initFromUser` | `useSConnectOrchestrator.ts` | Fixed — session resume after lock/unlock works |
| Fire-and-forget saves (removed `await`) | `useSConnectOrchestrator.ts` | Fixed — UI no longer blocks on remote save |
| SConnect home slide-up animation + menu shift `100/3.25%` | `SConnectHomePage.tsx` | Fixed — matches real iOS Swift app transitions |
| StatusBar `forceTextColor="white"` on home screen | `HomePage.tsx` | Fixed — white text on dark wallpaper |

### Reworked Remember/Cache System
Completely redesigned how the browser version handles persistence:

**Before**: Everything wrote to `localStorage` regardless of the remember checkbox. Stale data persisted across sessions. Multiple storage keys (`sim-device`, `sim-rememberDevice`, `sim-theme`, `frontend-ui-store`) accumulated without cleanup.

**After**: Clean separation:
- **Remember OFF**: Nothing in `localStorage`. Device ID lives only in Zustand store (`deviceId` field). On page refresh, store resets → picker shows. `clearBrowserState()` wipes all stale keys on startup.
- **Remember ON**: Device + flag written to `localStorage`. On refresh, `useAppMode` finds the flag → restores device → skips picker.
- **Key rename**: `sim-rememberDevice` → `sim-rememberSelection` (matches checkbox label).
- **Clear Cache**: Added to Debug menu in TitleBarMenu — clears all localStorage and reloads.

### Added `deviceId` to Zustand Store
Added `deviceId: string | null` to `UiStoreState` so the specific device ID (e.g., `ipad-pro`) can be tracked in-memory without touching localStorage. Previously only `deviceFamily` (`iphone`/`ipad`) was stored, which made it impossible to distinguish "user selected iPhone 15 Pro" from "default state."

### Fixed Picker → Simulator Transition
**Root cause**: `DevicePickerPage` set `isTransitioning = true` in the Zustand store. `AppModeRouter` used `isTransitioning ? 'picker' : mode` — forcing picker view while transitioning. In Electron, the picker window is destroyed so this flag is irrelevant. In browser, the flag was never cleared.

**Fix**: After `SetPendingDevice`, a 1.5s `setTimeout` clears `isTransitioning`. This matches the Electron boot animation timing.

### Architecture Decision: Single-Window is the Official Direction
The browser's single-window approach (picker and simulator in the same popup, switching via React state) is cleaner than Electron's show/hide two-window hack. This is now the **official direction** — Electron should eventually adopt this pattern rather than the browser trying to replicate Electron's two-window approach.

---

## 2. What Work Remains

### P0 — Blocking
1. **End-to-end testing of all custom apps** — SConnect, SigCT, SigCT2 need full walkthrough in browser mode. Mock data renders but drill-down paths are incomplete.
2. **SigCT/SigCT2 splash delay** — 3-second splash before auto-login. Should skip or minimize in browser.
3. **Missing mock drill-downs** — `fetchStoreDetail()`, `fetchShopStores()`, `fetchMorningCustomerData()` have no mock paths. Tapping into detail views fails silently.
4. **`window.resizeTo()` browser restrictions** — Some browsers limit resize to windows opened by `window.open()`. Need fallback.

### P1 — Important
5. **Landing page design** — Functional but minimal. Needs branding and polish.
6. **Download CTA** — Points to `#download`. Wire to actual release URL.
7. **SConnect WebView** — Electron `<webview>` doesn't exist in browsers. Buttons that open in-app webview will fail.
8. **Zustand `persist` middleware** — The `frontend-ui-store` key is written to localStorage by Zustand's persist middleware automatically. When remember is off, `clearBrowserState()` removes it on startup, but Zustand immediately re-persists defaults. Consider disabling persist in browser mode or using `sessionStorage`.

### P2 — Nice to Have
9. **PWA support** — manifest + service worker for "install as app"
10. **URL routing** — `/sconnect` instead of `?app=sconnect`
11. **Port single-window pattern back to Electron** — Replace the two-window picker/simulator handoff with the browser's React-state switching approach

---

## 3. Optimizations — Prime Suspects

### 1. Zustand Subscription Fires on Every Store Change
**Where**: `useSimulatorWs.ts` — `useUiStoreState.subscribe(sync)` callback
**Problem**: Any store change (open app, toggle overlay, change page) triggers `sync()` which calls `setState()` with the full state object. React diffs it, but the function still runs on every store mutation.
**Fix**: Use Zustand's `subscribeWithSelector` to only react to `deviceId`, `isLandscape`, and `theme` changes. Or compare prev/next in the callback and bail early.

### 2. Lazy-Load Mock Data
**Where**: `sigct-mock.ts`, `sigct2-mock.ts`, `sconnect-mock.ts`
**Problem**: Imported at module top-level in auth/data hooks. Bundled and parsed even in Electron where mocks are never used.
**Fix**: Dynamic `import()` behind the `isBrowser` check. Vite will code-split automatically.

### 3. Deduplicate `MENU_BAR_HEIGHT`
**Where**: Hardcoded as `30` in `TitleBarMenu.tsx`, `DevicePickerPage.tsx`, `App.tsx`, and `38` in `LandingPage.tsx`
**Fix**: Single exported constant in `constants/devices.ts`.

### 4. Eliminate Double `useSimulatorWs` Instances
**Where**: `App.tsx` line 35 and `useAppMode.ts` line 9 both call `useSimulatorWs()`
**Problem**: Two independent hook instances, each with their own `useState` and Zustand subscriptions. `App.tsx` syncs WS state back to the store (line 38-46), creating a feedback loop only saved by the dedup check in `setSimulatorState`.
**Fix**: Call `useSimulatorWs` once in `App.tsx` and pass the state down, or use a shared context/ref. Remove the sync-back effect entirely in browser mode since the store IS the source of truth.

---

## 4. Step-by-Step: Getting the App Running

### Prerequisites
- Node.js 22+, npm 10+

### Steps
```bash
# Install
cd C:\Projects\ios-sim-standalone\frontend
npm install

# Dev server
npm run dev
# → http://localhost:5173/landing.html

# Flow
# 1. Click "Launch in Browser" → picker popup opens (400x600)
# 2. Select device → boot animation (1.5s) → simulator renders
# 3. Menu bar: Settings → Device/Orientation/Theme/Debug
# 4. Debug → Clear Cache to reset everything

# Custom apps
# SConnect: auto-logs in with demo employee 99999 (Kay banner)
# SigCT/SigCT2: auto-authorizes with demo token

# Standalone entries
# http://localhost:5173/sconnect.html
# http://localhost:5173/sigct.html?theme=dark
# http://localhost:5173/sigct2.html?theme=dark

# Production build
npm run build    # → dist/ (static, deploy anywhere)
npm run preview  # preview built output
```

---

## 5. Testing Notes

### No Backend Required
The browser SaaS version has **zero backend dependencies**. All data is mock. All state is in-memory (Zustand) or localStorage (remember=on only). No WebSocket, no HTTP API, no proxy.

### What "Remember my selection" Controls
| Remember ON | Remember OFF |
|---|---|
| Device saved to `localStorage` | Device in Zustand only (in-memory) |
| `sim-rememberSelection` flag set | No flag — `clearBrowserState()` on next load |
| Skip picker on refresh | Show picker on every refresh |
| Hello screen skipped (show clock) | Hello animation plays |
| `currentPage` preserved | Reset to page 0 |

### Mock Data Coverage
| App | Auth | Data | Drill-down |
|-----|------|------|------------|
| SConnect | Mock user 99999 | Categories, buttons | WebView missing |
| SigCT | Demo token + entities | SigLive, sales, stores, DSC, jobs, morning | Store detail missing |
| SigCT2 | Demo token + entities | SigLive, sales, stores, DSC, jobs, morning | Store detail missing |

---

## 6. Known Issues & Strategies

### Issue 1: Zustand Persist Writes to localStorage Even When Remember is Off
**Symptom**: `frontend-ui-store` key reappears in localStorage after `clearBrowserState()` removes it.
**Cause**: Zustand's `persist` middleware writes to localStorage on every state change. `clearBrowserState()` runs on startup, but the store re-persists immediately after hydration.
**Strategies**:
- **A. Conditional persist storage**: Override the storage adapter to return a no-op when remember is off. `createJSONStorage(() => rememberOn ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} })`.
- **B. Use `sessionStorage`**: Change persist to use `sessionStorage` in browser mode. Auto-clears on tab close.
- **C. Accept it**: The store only persists `currentPage`, `showStockApps`, `showCustomApps`, `homeMetricsCache`, and Safari state. These are harmless — the critical remember behavior (device selection, hello screen) is controlled separately.

### Issue 2: `window.resizeTo()` May Be Restricted
**Symptom**: Popup stays at picker size after device selection.
**Cause**: Browsers restrict `resizeTo()` on windows not opened by `window.open()`, or limit resize frequency.
**Strategies**:
- **A. CSS viewport scaling**: Keep popup fixed, use `transform: scale()` to fit device frame inside.
- **B. Inner frame**: Render device at exact dimensions inside a dark surround.
- **C. Accept it**: Content is responsive — adapts to any size.

### Issue 3: Boot Animation Timing is a Fixed `setTimeout`
**Symptom**: If the app loads faster or slower than 1.5s, there's a visible gap or flash.
**Cause**: `DevicePickerPage` uses `setTimeout(1500)` to clear `isTransitioning`. This is a hardcoded delay, not tied to actual load completion.
**Strategies**:
- **A. Event-driven**: Have the simulator view dispatch a "ready" event when it mounts. Clear `isTransitioning` in response.
- **B. Reduce to minimum**: The boot animation is cosmetic. Could be 500ms or even 0ms in browser.
- **C. Keep as-is**: 1.5s matches Electron and feels intentional. The Apple boot screen is part of the experience.

### Issue 4: Double `useSimulatorWs` Creates Feedback Loop
**Symptom**: No visible bug currently, but architecturally fragile.
**Cause**: `App.tsx` and `useAppMode` both call `useSimulatorWs()`. `App.tsx` syncs WS state back to the Zustand store. In browser mode, the store IS the WS state source, creating a circular update path.
**Strategies**:
- **A. Single instance**: Call `useSimulatorWs` once in `App.tsx`, pass via context or prop.
- **B. Skip sync in browser**: The `App.tsx` sync effect (line 38-46) should `return` early in browser mode since the store is already authoritative.
- **C. Remove `useSimulatorWs` from `useAppMode`**: Have `useAppMode` read `deviceId` directly from the Zustand store via `useUiStoreState`.

---

## 7. New Architecture & Quick Wins

### Architecture: Single-Window Model (Official Direction)
```
Landing Page (landing.html)
  │
  ├─ "Launch in Browser" → window.open() picker popup
  │     │
  │     ├─ DevicePickerPage (React state: mode='picker')
  │     │     │
  │     │     └─ selectDevice() → SetPendingDevice()
  │     │         → store.deviceId set
  │     │         → boot animation (1.5s)
  │     │         → setTransitioning(false)
  │     │
  │     └─ SimulatorMode (React state: mode='simulator')
  │           ├─ Lock screen → Hello or Clock
  │           ├─ Home screen → App grid
  │           └─ Apps → SConnect/SigCT/SigCT2 (mock data)
  │
  └─ "Download Desktop App" → Electron release

State flow:
  SetPendingDevice → Zustand store (deviceId) → useSimulatorWs subscription
    → wsState.device → useAppMode → mode='simulator' → AppModeRouter renders SimulatorMode
```

This is cleaner than Electron's two-window model and should be ported back.

### Quick Wins

**1. Skip SigCT/SigCT2 splash in browser** (~5 min)
Add early return in orchestrator splash effects. Instant login.

**2. Event-driven boot transition** (~15 min)
Replace `setTimeout(1500)` with a `useEffect` in `SimulatorMode` that clears `isTransitioning` on mount. Boot animation plays for exactly as long as needed.

**3. Export shared constants** (~5 min)
`MENU_BAR_HEIGHT`, `STORAGE_DEVICE`, `STORAGE_REMEMBER` — deduplicate across files.

**4. Disable Zustand persist in browser mode** (~10 min)
Swap storage adapter to a no-op when `isBrowser` is true. Eliminates the stale localStorage issue entirely.

**5. Static deploy** (~15 min)
`dist/` is pure static. Drop on Vercel/Netlify/S3+CloudFront with `landing.html` as index.

**6. Port single-window model to Electron** (~2 hours)
Replace Electron's `createPickerWindow` / `createSimulatorWindow` with a single window that switches via React state. Remove window management from `main.ts` and `shell.ts`. The React app already handles the transition — Electron just needs to stop fighting it.
