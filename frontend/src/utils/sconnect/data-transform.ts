import type {
  SConnectUserResponse, SConnectCategory, SConnectButton, SConnectMenuOption
} from '../../types/custom-apps/sconnect-home';
import {
  SCONNECT_CATEGORY_TO_MENU, SCONNECT_DALLAS_BANNERS, SCONNECT_DSC_BANNER,
  SCONNECT_APP_VERSION
} from '../../constants/custom-apps/sconnect-home';

/** Build categories and menu options from a user response + current banner/location state. */
export function buildCategories(
  user: SConnectUserResponse,
  banner: string | null,
  isAtHome: boolean
): { categories: SConnectCategory[]; menuOptions: SConnectMenuOption[] } {
  let buttonCategories: SConnectCategory[] = [];
  if (user.categories && user.categories.length > 0) {
    buttonCategories = user.categories;
  } else if (user.adminBannerDetails) {
    const match = user.adminBannerDetails.find(
      a => a.name.toLowerCase() === (banner ?? '').toLowerCase()
    );
    if (match) buttonCategories = match.categories;
  }

  const categories: SConnectCategory[] = [];
  const menuOptions: SConnectMenuOption[] = [];
  const sorted = [...buttonCategories].sort((a, b) => a.itemOrder - b.itemOrder);

  for (const cat of sorted) {
    const visible = isAtHome ? cat.buttons.filter(b => b.atHome) : cat.buttons;
    if (visible.length > 0) {
      categories.push(cat);
      const menuId = SCONNECT_CATEGORY_TO_MENU[cat.description];
      if (menuId) menuOptions.push(menuId);
    }
  }

  // Synthetic favorites category
  const favButtons: SConnectButton[] = [
    {
      id: 0, name: 'Add a Favorite', description: 'Add a Favorite',
      url: 'http://about:blank', image: '', itemOrder: 0,
      active: true, externalBrowser: false, atHome: isAtHome, categories: []
    },
    ...(user.favorites ?? []).map(f => ({
      id: 0, name: f.name ?? '', description: f.name ?? '',
      url: f.url, image: '', itemOrder: 0,
      active: true, externalBrowser: false, atHome: isAtHome, categories: [] as SConnectCategory[]
    }))
  ];
  categories.push({
    id: 0, name: 'Favorites', description: 'Favorites',
    itemOrder: 0, active: true, buttons: favButtons
  });

  // Fixed menu options
  menuOptions.push('go-to-url', 'calculator');
  const lower = (banner ?? '').toLowerCase();
  const isDallas = SCONNECT_DALLAS_BANNERS.some(d => lower.includes(d));
  const isDsc = lower.includes(SCONNECT_DSC_BANNER);
  if (!isAtHome && !isDallas && !isDsc) {
    menuOptions.push('pos');
  }
  menuOptions.push('favorites', 'settings', 'help', 'about', 'logout');

  return { categories, menuOptions };
}

/** Filter buttons by atHome flag and remove duplicates by image URL. */
export function filterButtons(cat: SConnectCategory, isAtHome: boolean): SConnectButton[] {
  const filtered = isAtHome ? cat.buttons.filter(b => b.atHome) : cat.buttons;
  const seen = new Set<string>();
  const result: SConnectButton[] = [];
  for (const b of filtered) {
    if (b.image && seen.has(b.image)) continue;
    if (b.image) seen.add(b.image);
    result.push(b);
  }
  return result;
}

/** Strip non-digit characters from a string (for store number input). */
export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/** Capitalize the first letter of a string. */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Build the about-screen info rows from current state. */
export type AboutRow = { label: string; value: string };

export function buildAboutRows(
  user: SConnectUserResponse,
  banner: string | null,
  storeDisplayText: string,
  endpoint: string,
  formattedTime: string
): AboutRow[] {
  return [
    { label: 'App', value: `SConnect ${SCONNECT_APP_VERSION}` },
    { label: 'iOS Version', value: '18.0 (Simulated)' },
    { label: 'Name', value: `${user.firstName} ${user.lastName}` },
    { label: 'Employee ID', value: user.employeeId },
    { label: 'Store', value: storeDisplayText },
    { label: 'Banner', value: banner ?? '—' },
    { label: 'Endpoint', value: endpoint },
    { label: 'Session', value: formattedTime }
  ];
}

/** Format a URL for display (hostname + path, no trailing slash). */
export function formatDisplayUrl(url: string): string {
  try {
    const parsed = new URL(url);
    let display = parsed.hostname + parsed.pathname;
    if (display.endsWith('/')) display = display.slice(0, -1);
    return display;
  } catch {
    return url;
  }
}
