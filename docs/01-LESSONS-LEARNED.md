# 01 - Lessons Learned & Handoff

## What We Accomplished

Converted the iOS Simulator from an Electron-dependent app to a **standalone browser SaaS** that runs with zero backend dependencies.

### Files Created (6)
| File | Purpose |
|------|---------|
| `src/services/runtime.ts` | `isBrowser` / `isElectron` runtime detection |
| `src/pages/LandingPage.tsx` | Landing page with "Launch in Browser" popup + "Download Desktop App" CTA |
| `src/landing-main.tsx` | React entry point for landing page |
| `landing.html` | HTML shell for landing page (Vite entry) |
| `src/constants/custom-apps/sigct-mock.ts` | Mock data for SigCT (user entities, sales, stores, jobs, morning reports) |
| `src/constants/custom-apps/sigct2-mock.ts` | Mock data for SigCT2 (same shape, different values) |

### Files Modified (14)
| File | What Changed |
|------|-------------|
| `src/services/electron.ts` | Browser mode: localStorage for device/settings, `window.resizeTo/close/blur` for controls, URL params for standalone detection, Zustand store updates for device selection |
| `src/hooks/useSimulatorWs.ts` | Browser mode: subscribes to Zustand store instead of WebSocket, reads device from localStorage |
| `src/hooks/useAppMode.ts` | Disabled backend polling in browser mode, relies on Zustand subscription chain |
| `src/components/app/AppLayout.tsx` | Reads `rememberDevice` from localStorage instead of backend HTTP |
| `src/components/titlebar/TitleBar.tsx` | Browser mode: slim 30px menu bar, no app icon, no window controls |
| `src/components/titlebar/TitleBarMenu.tsx` | Browser mode: device/orientation/theme changes update Zustand + resize window |
| `src/pages/DevicePickerPage.tsx` | Browser mode: resizes popup window to device dimensions on selection |
| `src/App.tsx` | Browser mode: resizes window to saved device on load when "remember" is set |
| `src/hooks/useSConnectAuth.ts` | Auto-uses mock data in browser (existing `sconnect-mock.ts` pattern) |
| `src/hooks/useSConnectData.ts` | Favorites/settings persist to localStorage in browser |
| `src/hooks/useSigCTAuth.ts` | Auto-authorizes with demo token + mock entities in browser |
| `src/hooks/useSigCTData.ts` | Returns mock data for all SigLive/sales/store/jobs/morning API calls |
| `src/hooks/useSigCT2Auth.ts` | Auto-authorizes with demo token + mock entities in browser |
| `src/hooks/useSigCT2Data.ts`, `useSigCT2LocationData.ts`, `useSigCT2JobsData.ts` | Returns mock data for all API calls |
| `vite.config.ts` | Added `landing.html` entry point to multi-page build |

### Architecture Decision
- **Browser SaaS = demo/mock mode** — no CORS proxy, no OAuth, no backend server
- **Electron = full ungated experience** — live APIs, OAuth (Azure AD PKCE), Go backend proxy
- **Why**: OAuth redirects registered for native schemes only, Azure AD token endpoint blocks CORS, corporate APIs lack CORS headers

---

## What Work Remains

### Must-Have (P0)
1. **End-to-end testing** — Walk through every custom app (SConnect, SigCT, SigCT2) in browser mode and verify mock data renders correctly in all screens
2. **Popup window sizing** — `window.resizeTo()` behavior varies by browser and may be restricted. Need fallback strategy if resize is blocked (e.g., CSS-based viewport scaling)
3. **SigCT/SigCT2 orchestrator auto-login in browser** — The orchestrators start on 'splash' screen and wait 3 seconds before showing OAuth. In browser mode they should skip splash and go straight to home-menu since we auto-authorize
4. **Store detail mock** — `fetchStoreDetail()` and `fetchShopStores()` in SigCT/SigCT2 data hooks don't have browser mock paths yet. Tapping a store in the locator will fail
5. **Morning customer data mock** — `fetchMorningCustomerData()` in both SigCT and SigCT2 jobs hooks has no browser mock path

### Should-Have (P1)
6. **Landing page design** — Current landing page is functional but minimal. Needs branding, screenshots, feature highlights
7. **Download CTA** — The "Download Desktop App" link points to `#download`. Wire to actual Electron release URL
8. **Popup blocker UX** — Current fallback is a link to open in the same tab. Could be smoother
9. **SConnect WebView** — SConnect's webview feature (`useSConnectWebView`) opens external URLs. In browser mode these would need an iframe or redirect, and many will be blocked by X-Frame-Options

### Nice-to-Have (P2)
10. **URL routing for standalone apps** — Currently uses `?app=sconnect` param. Could use path-based routing: `/sconnect`, `/sigct`, `/sigct2`
11. **Persist theme choice** — Theme is saved to `sim-theme` in localStorage but not read back on initial Zustand hydration
12. **PWA support** — Add manifest + service worker so the browser version can be "installed" as a pseudo-native app

---

## Optimizations — Where to Begin

### 1. Eliminate the 3-Second Splash Delay in Browser Mode
**Where**: `useSigCTOrchestrator.ts:28`, `useSigCT2Orchestrator.ts:33`
**Problem**: Both orchestrators do `setTimeout(() => nav.resetTo('oauth'), 3000)` on splash. In browser mode we auto-authorize, but the user still sees a 3-second splash screen before being redirected to home-menu.
**Fix**: Check `isBrowser` in the splash effect — if true, skip the timeout and go directly to `home-menu`.

### 2. Remove Unnecessary Re-renders from Zustand Subscription
**Where**: `useSimulatorWs.ts` — the `useUiStoreState.subscribe()` fires on every store change
**Problem**: Any Zustand state change (opening an app, changing a page, toggling an overlay) triggers the subscription callback, which calls `setState` even if nothing changed.
**Fix**: Compare previous and next values in the subscription callback before calling `setState`.

### 3. Lazy-Load Mock Data
**Where**: `sigct-mock.ts`, `sigct2-mock.ts`, `sconnect-mock.ts`
**Problem**: Mock data is imported at the top of auth/data hooks, meaning it's bundled and parsed even in Electron mode where it's never used.
**Fix**: Use dynamic `import()` behind the `isBrowser` check, or move mock imports to a separate chunk that's only loaded in browser mode.

### 4. Deduplicate the `MENU_BAR_HEIGHT` Constant
**Where**: Hardcoded as `30` in `TitleBarMenu.tsx`, `DevicePickerPage.tsx`, `App.tsx`, and `LandingPage.tsx` (as `TITLEBAR_HEIGHT = 38` for Electron)
**Fix**: Export a single `BROWSER_MENU_BAR_HEIGHT` from a shared constant and import everywhere.

---

## Step-by-Step: Getting the App Fully Working

### Prerequisites
- Node.js 22+
- npm 10+

### Steps

```bash
# 1. Install dependencies
cd C:\Projects\ios-sim-standalone\frontend
npm install

# 2. Start dev server
npm run dev

# 3. Open landing page in browser
# Navigate to: http://localhost:5173/landing.html
# (port may vary — check terminal output)

# 4. Click "Launch in Browser"
# A popup window opens with the device picker

# 5. Select a device (e.g., iPhone 15 Pro)
# Popup resizes and shows the boot animation → simulator

# 6. Test the simulator
# - Swipe up on lock screen to unlock
# - Open apps from the home screen
# - Try Settings menu: device, orientation, theme switches

# 7. Test custom apps
# - Open SConnect → should auto-login with demo data
# - Open SigCT Banner → should auto-authorize and show home menu
# - Open SigCT 2.0 → should auto-authorize and show home menu

# 8. Test standalone entry points
# http://localhost:5173/sconnect.html
# http://localhost:5173/sigct.html?theme=dark
# http://localhost:5173/sigct2.html?theme=dark

# 9. Production build
npm run build
# Output in dist/ — all static files, deployable to any CDN/web server

# 10. Preview production build
npm run preview
```

### Testing the Electron Version (unchanged)
The Electron app at `C:\Projects\ios-simulator-v2` still works as before — it requires the Go backend running on localhost:32199/32200. The browser changes don't affect it since all modifications are gated behind `isBrowser` checks.

---

## Known Issues

### Issue 1: `window.resizeTo()` May Be Restricted
**Symptom**: Popup doesn't resize when switching devices or orientations.
**Cause**: Browsers restrict `resizeTo()` to windows opened by `window.open()` and may limit resize frequency.
**Strategies**:
- **A. CSS viewport scaling**: Instead of resizing the window, keep a fixed popup size and use CSS `transform: scale()` to fit the device frame inside it. The simulator content scales to match.
- **B. Recreate the popup**: Close and re-open with new dimensions. Loses state unless persisted.
- **C. Inner frame approach**: Render the simulator inside a fixed-size `<div>` within the popup, sized to the device. The popup stays large, the device frame is centered with a dark surround (like an emulator).
- **D. Accept it**: The content is responsive anyway — the viewport adapts to whatever size the window is.

### Issue 2: SigCT/SigCT2 Splash Screen Delay
**Symptom**: 3-second delay on splash before showing the app in browser mode.
**Cause**: Orchestrators have a hardcoded `setTimeout` before navigating away from splash.
**Strategies**:
- **A. Skip splash in browser**: Add `if (isBrowser) { nav.resetTo('home-menu'); return; }` at the top of the splash effect.
- **B. Reduce delay**: Use a shorter timeout (500ms) in browser mode for a quick brand flash.
- **C. Show loading state**: Replace splash with a skeleton/spinner that resolves when mock data is ready.

### Issue 3: Missing Mock Paths for Deep Drill-Down
**Symptom**: Tapping into store detail, shop stores, or morning customer data will fail silently or show empty screens.
**Cause**: `fetchStoreDetail()`, `fetchShopStores()`, and `fetchMorningCustomerData()` don't have `isBrowser` mock guards.
**Strategies**:
- **A. Add mock builders**: Create `buildMockStoreDetail()` and `buildMockMorningCustomerData()` in the mock files and add guards.
- **B. Disable drill-down**: In browser mode, make drill-down rows non-tappable or show a "demo data" badge.
- **C. Return static detail**: Hardcode a single store detail response that all stores share in demo mode.

### Issue 4: SConnect WebView Won't Work in Browser
**Symptom**: Tapping a button that opens in the SConnect in-app webview shows nothing or errors.
**Cause**: SConnect uses Electron's `<webview>` tag which doesn't exist in browsers. The WebView hook creates/controls an Electron webview element.
**Strategies**:
- **A. Replace with iframe**: In browser mode, render an `<iframe>` instead of `<webview>`. Many sites will block via X-Frame-Options, but some will work.
- **B. Open in new tab**: In browser mode, redirect webview URLs to `window.open()` in a new tab.
- **C. Disable in demo**: Show a placeholder screen ("Open in desktop app for full browsing experience") with the URL displayed.
- **D. Safari redirect**: Route all SConnect external URLs through the simulator's Safari app instead of the webview.

---

## New Architecture & Quick Wins

### Architecture Changes Made
```
Before (Electron-only):
  Browser → Electron Shell → IPC → Go Backend → External APIs
                                  ↕ WebSocket

After (Dual-mode):
  Browser SaaS:
    Landing Page → Popup → React App → Zustand + localStorage (mock data)

  Electron (unchanged):  
    Electron Shell → IPC → Go Backend → External APIs
                                      ↕ WebSocket
```

### Quick Wins

**1. Auto-skip SigCT/SigCT2 splash in browser** (~5 min)
Add two lines to each orchestrator. Instant improvement to browser UX.

**2. Export `MENU_BAR_HEIGHT` constant** (~5 min)
Add to `constants/devices.ts`, replace 4 hardcoded values. Prevents future sizing bugs.

**3. Theme persistence on load** (~10 min)
Read `sim-theme` from localStorage in `useSimulatorWs` initial sync and apply to Zustand store on mount.

**4. Add mock store detail** (~15 min)
One `buildMockStoreDetail()` function + one `isBrowser` guard in each location data hook. Unblocks the entire store locator flow.

**5. Inner frame fallback for resize** (~30 min)
If `window.resizeTo` doesn't take effect (compare `window.outerWidth` before/after), fall back to rendering the device frame at fixed dimensions inside the popup with CSS, centered on a dark background. Works in all browsers regardless of popup restrictions.

**6. Static deploy** (~15 min)
The `dist/` output is purely static files. Drop on Vercel/Netlify/S3+CloudFront with `landing.html` as the index. Zero server config.
