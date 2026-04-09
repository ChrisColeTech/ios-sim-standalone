# iOS Simulator SaaS - High Level Requirements

## Vision
A browser-based iOS simulator delivered as a SaaS product. Users visit a URL and can either:
1. **Use the simulator directly in-browser** — demo/mock mode, zero backend dependencies
2. **Download the Electron desktop version** — full ungated experience with live APIs

---

## V1 Architecture Decisions

### Browser SaaS = Demo Mode (No Backend)
- All custom apps (SConnect, SigCT, SigCT2) run in **mock/demo mode**
- No CORS proxy needed — no external API calls from browser
- No OAuth flows — redirect URIs are registered for native schemes only
- No WebSocket backend — state managed entirely client-side (Zustand + localStorage)
- The simulator is **fully standalone** — just static files served from a CDN

### Electron = Full Live Experience
- Real OAuth (Azure AD PKCE) with registered redirect URIs
- Real API calls to `*.jewels.com` via Go proxy on localhost
- WebSocket backend for MCP integration and state sync
- Corporate network/VPN required for API access

### Why This Split
- OAuth redirect URIs (`https://sigctbanner`) only work in native apps
- Azure AD token endpoint doesn't support CORS from arbitrary origins
- Corporate APIs (`*.jewels.com`) lack CORS headers for external domains
- Mock mode makes the demo work anywhere without VPN/auth barriers

---

## Current Architecture (What Exists)

### ios-sim-standalone (React App — `frontend/`)
- React 19 + Vite 8 + TypeScript + Tailwind CSS + Zustand
- 4 entry points: `index.html`, `sconnect.html`, `sigct.html`, `sigct2.html`
- App mode detection: `loading` → `picker` → `simulator`
- WebSocket connection to backend at `ws://localhost:32200/ws`
- HTTP fallback to backend at `http://localhost:32199`
- Electron bridge via `services/electron.ts` (window controls, device queries, menu handling)
- CORS proxy via `services/proxy.ts` → `localhost:32199/proxy`
- SConnect already has mock data pattern (`constants/custom-apps/sconnect-mock.ts`)
- Zustand store already persists to localStorage

### Electron App (ios-simulator-v2/src/electron)
- **Two frameless windows**: Device Picker (400x600) and Simulator (device-sized)
- **Flow**: Launch → detect standalone mode → check for device → show picker OR simulator
- **No auth or splash screen** — picker → simulator with boot animation delay
- **Backend proxy**: Main process proxies all HTTP/WS calls to localhost backend
- **IPC bridge** via preload: window controls, backend queries, menu actions, device switching
- **Dynamic resize** on device/orientation change
- **Standalone variants**: sconnect, sigct, sigct2 (detected via CLI arg or exe name)

---

## Browser Shell Requirements

### Landing Page
- User visits SaaS URL → sees landing/marketing page
- Two CTAs: "Launch in Browser" and "Download Desktop App"
- "Launch in Browser" opens a **frameless popup window** via `window.open()`

### Popup Window (Simulator Shell)
- Frameless appearance (no browser chrome beyond what's unavoidable)
- Custom title bar with window controls (minimize, maximize, close)
- Replicates the Electron dual-window flow:
  1. **Picker mode**: 400x600 popup for device selection
  2. **Simulator mode**: Popup resized to exact device dimensions
- Transition: picker → simulator with boot animation (matches Electron 1.5s delay)

### Browser API Compatibility Layer (`services/electron.ts`)
- Replace Electron IPC with client-side state management
- `GetStandaloneApp()` → read from URL params
- `GetCurrentDevice()` → read from localStorage
- `SetPendingDevice()` → write to localStorage + Zustand
- `Minimise/Maximise/Close` → popup `window` methods
- `HandleMenuClick()` → dispatch to Zustand store
- `useSimulatorWs` → no-op in browser (no backend WS server)
- `useAppMode` → derive from localStorage/Zustand, no polling

### Mock Data for Custom Apps
- SConnect: extend existing `sconnect-mock.ts` pattern
- SigCT: build mock user entities, sales, store locations, jobs, morning reports
- SigCT2: build mock data matching SigCT2 API response shapes
- Auto-detect browser mode → force demo/mock path (no login prompts)

---

## Core Features
- [ ] Landing page with browser launch + desktop download CTAs
- [ ] Browser popup window with custom title bar
- [ ] Device picker in popup (400x600)
- [ ] Simulator view with dynamic device sizing
- [ ] Picker → simulator transition with boot animation
- [ ] Client-side state management (no backend)
- [ ] Theme sync (dark/light) via localStorage
- [ ] Device/orientation change with dynamic resize
- [ ] Standalone variant support via URL routing
- [ ] Mock/demo data for SConnect, SigCT, SigCT2
- [ ] Popup blocker detection + fallback UX

## Technical Considerations
- [ ] Popup blocker handling (fallback to in-page mode?)
- [ ] `window.open()` feature string for minimal chrome
- [ ] Cross-browser popup resize behavior (`window.resizeTo()` restrictions)
- [ ] Device persistence via localStorage
- [ ] Static hosting / CDN deployment (no server needed)
- [ ] Future: auth/licensing for SaaS model

---
*This is a living document. Requirements will be refined as the project evolves.*
