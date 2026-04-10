import type { SConnectMenuOption } from '../../types/custom-apps/sconnect-home';
import {
  LuShoppingCart, LuCalendar, LuGlobe, LuGraduationCap,
  LuBookOpen, LuVideo, LuLink, LuCalculator, LuStar,
  LuSettings, LuCircleHelp, LuUser, LuLogOut, LuMonitor
} from 'react-icons/lu';
import type { IconType } from 'react-icons';

export const SCONNECT_ENDPOINTS = {
  dev: 'https://api-v2.sconn.dev.cloud.jewels.com/dev',
  test: 'https://api-v2.sconn.test.cloud.jewels.com/test',
  prod: 'https://api-v2.sconn.cloud.jewels.com/prod'
} as const;

export const SCONNECT_ACTIVE_ENDPOINT = SCONNECT_ENDPOINTS.dev;

export const SCONNECT_SESSION_TIMEOUT_MINUTES = 30;
export const SCONNECT_SESSION_WARNING_MINUTES = 5;

export const SCONNECT_STORE_IP_PREFIXES = [
  '100.124', '100.125', '100.126', '100.127', '216.194'
];

export const SCONNECT_BANNER_CODES = {
  jared: 21,
  zalesOutlet: 31,
  peoples: 35,
  gordons: 32,
  mappins: 34,
  zales: 30
} as const;

export const SCONNECT_APP_VERSION = '4.0.0';

export type SConnectMenuItemConfig = {
  id: SConnectMenuOption;
  label: string;
  icon: IconType;
  isCategory: boolean;
};

export const SCONNECT_MENU_ITEMS: SConnectMenuItemConfig[] = [
  { id: 'selling-tools', label: 'Selling Tools', icon: LuShoppingCart, isCategory: true },
  { id: 'admin-tools', label: 'Admin Tools', icon: LuCalendar, isCategory: true },
  { id: 'research-tools', label: 'Research Tools', icon: LuGlobe, isCategory: true },
  { id: 'training-tools', label: 'Training Tools', icon: LuGraduationCap, isCategory: true },
  { id: 'catalog-tools', label: 'Catalog Tools', icon: LuBookOpen, isCategory: true },
  { id: 'video-tools', label: 'Video Tools', icon: LuVideo, isCategory: true },
  { id: 'go-to-url', label: 'Go to URL', icon: LuLink, isCategory: false },
  { id: 'calculator', label: 'Calculator', icon: LuCalculator, isCategory: false },
  { id: 'pos', label: 'POS', icon: LuMonitor, isCategory: false },
  { id: 'favorites', label: 'Favorites', icon: LuStar, isCategory: true },
  { id: 'settings', label: 'Settings', icon: LuSettings, isCategory: false },
  { id: 'help', label: 'Help', icon: LuCircleHelp, isCategory: false },
  { id: 'about', label: 'About', icon: LuUser, isCategory: false },
  { id: 'logout', label: 'Logout', icon: LuLogOut, isCategory: false }
];

export const SCONNECT_MENU_LABEL_BY_ID: Record<SConnectMenuOption, string> = {
  'selling-tools': 'Selling Tools',
  'admin-tools': 'Admin Tools',
  'research-tools': 'Research Tools',
  'training-tools': 'Training Tools',
  'catalog-tools': 'Catalog Tools',
  'video-tools': 'Video Tools',
  'go-to-url': 'Go to URL',
  'pos': 'POS',
  'favorites': 'Favorites',
  'about': 'About',
  'settings': 'Settings',
  'help': 'Help',
  'logout': 'Logout',
  'calculator': 'Calculator'
};

/** Maps category description from API to menu option ID */
export const SCONNECT_CATEGORY_TO_MENU: Record<string, SConnectMenuOption> = {
  'Selling Tools': 'selling-tools',
  'Admin Tools': 'admin-tools',
  'Research Tools': 'research-tools',
  'Training Tools': 'training-tools',
  'Catalog Tools': 'catalog-tools',
  'Video Tools': 'video-tools',
  'Favorites': 'favorites'
};

/** Maps menu option ID back to category description for API */
export const SCONNECT_MENU_TO_CATEGORY: Partial<Record<SConnectMenuOption, string>> = {
  'selling-tools': 'Selling Tools',
  'admin-tools': 'Admin Tools',
  'research-tools': 'Research Tools',
  'training-tools': 'Training Tools',
  'catalog-tools': 'Catalog Tools',
  'video-tools': 'Video Tools',
  'favorites': 'Favorites'
};

export const SCONNECT_DALLAS_BANNERS = ['zale', 'people', 'pagoda'];
export const SCONNECT_DSC_BANNER = 'd&sc';

/**
 * Theme colors from Swift AppearanceHelper.swift
 *
 * Light theme (0): themeColor = UIColor.white, grayColor = UIColor.darkGray
 *   → nav/menu bg = darkGray (#666), page/grid bg = white (#fff), text on nav = white
 * Dark theme (1): themeColor = UIColor.black, grayColor = UIColor.lightGray
 *   → nav/menu bg = lightGray (#ccc), page/grid bg = black (#000), text on nav = black
 */
export const SCONNECT_THEME = {
  // Nav bar, menu, toolbar background = grayColor
  navBgDark: '#cccccc',     // UIColor.lightGray
  navBgLight: '#666666',    // UIColor.darkGray
  menuBgDark: '#cccccc',
  menuBgLight: '#666666',
  // Page/grid/collection view background = themeColor
  gridBgDark: '#1c1c1e',    // iOS system dark bg (matches shell)
  gridBgLight: '#f2f2f7',   // iOS system light bg (matches shell)
  pageBgDark: '#000000',
  pageBgLight: '#f2f2f7',   // iOS system grouped bg
  // iOS grouped table cell
  cellBgDark: '#1c1c1e',
  cellBgLight: '#ffffff',
  // Placeholder for buttons with no image
  placeholderBg: '#3b5998'
} as const;

// --- Asset imports ---
import sconnectBg from '../../assets/images/sconnect/sconnect-bg.png';
import largeLogo from '../../assets/images/sconnect/large-logo.png';
import favoritesAdd from '../../assets/images/sconnect/icons/favorites-add.png';
import favoritesGeneric from '../../assets/images/sconnect/icons/favorites-generic.png';

import logoJared from '../../assets/images/sconnect/logos/jared.png';
import logoZales from '../../assets/images/sconnect/logos/zales.png';
import logoZalesOutlet from '../../assets/images/sconnect/logos/zales-outlet.png';
import logoGordons from '../../assets/images/sconnect/logos/gordons.png';
import logoPeoples from '../../assets/images/sconnect/logos/peoples.png';
import logoMappins from '../../assets/images/sconnect/logos/mappins.png';
import logoDsc from '../../assets/images/sconnect/logos/dsc.png';
import logoSignet from '../../assets/images/sconnect/logos/signet.png';

export const SCONNECT_ASSETS = { sconnectBg, largeLogo, favoritesAdd, favoritesGeneric };

// Help PDF pages (imported as static assets)
import helpPage01 from '../../assets/images/sconnect/help/page-01.png';
import helpPage02 from '../../assets/images/sconnect/help/page-02.png';
import helpPage03 from '../../assets/images/sconnect/help/page-03.png';
import helpPage04 from '../../assets/images/sconnect/help/page-04.png';
import helpPage05 from '../../assets/images/sconnect/help/page-05.png';
import helpPage06 from '../../assets/images/sconnect/help/page-06.png';
import helpPage07 from '../../assets/images/sconnect/help/page-07.png';
import helpPage08 from '../../assets/images/sconnect/help/page-08.png';
import helpPage09 from '../../assets/images/sconnect/help/page-09.png';
import helpPage10 from '../../assets/images/sconnect/help/page-10.png';
import helpPage11 from '../../assets/images/sconnect/help/page-11.png';
import helpPage12 from '../../assets/images/sconnect/help/page-12.png';
import helpPage13 from '../../assets/images/sconnect/help/page-13.png';
import helpPage14 from '../../assets/images/sconnect/help/page-14.png';
import helpPage15 from '../../assets/images/sconnect/help/page-15.png';

export const SCONNECT_HELP_PAGES = [
  helpPage01, helpPage02, helpPage03, helpPage04, helpPage05,
  helpPage06, helpPage07, helpPage08, helpPage09, helpPage10,
  helpPage11, helpPage12, helpPage13, helpPage14, helpPage15,
];

/** Maps banner detail (lowercased) to the correct logo image. Matches ImagesHelper.swift */
const BANNER_LOGO_MAP: [string, string][] = [
  ['gordonsjewelers.com', logoGordons],
  ['jared jewelers', logoJared],
  ['jared jewelry boutique', logoJared],
  ['jared vault', logoJared],
  ['jared.com', logoJared],
  ['kay', logoSignet],
  ['kay outlet', logoSignet],
  ['kay.com', logoSignet],
  ['kayoutlet.com', logoSignet],
  ['pagoda', logoSignet],
  ['banter by piercing pagoda', logoSignet],
  ['pagoda.com', logoSignet],
  ['peoples', logoPeoples],
  ['peoplesjewellers.com', logoPeoples],
  ['sterlingjewelers.com', logoDsc],
  ['zale us', logoZales],
  ['zales outlet', logoZalesOutlet],
  ['zales.com', logoZales],
  ['d&sc', logoDsc],
  ['gordons', logoGordons],
  ['mappins', logoMappins]
];

export function getStoreLogo(bannerDetail: string | null): string {
  if (!bannerDetail) return logoSignet;
  const lower = bannerDetail.toLowerCase();
  for (const [key, logo] of BANNER_LOGO_MAP) {
    if (lower.includes(key)) return logo;
  }
  return logoSignet;
}
