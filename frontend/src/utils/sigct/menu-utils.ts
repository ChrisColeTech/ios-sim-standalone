import type { SigCTMenuSection, SigCTStoreDetail } from '../../types/custom-apps/sigct-banner';
import type { LayoutListSection } from '../../types/layouts';
import { LuChevronRight, LuInfo } from 'react-icons/lu';
import { createElement } from 'react';
import { SIGCT_DSC_SUBMENU, STORE_DETAIL_FIELDS } from '../../constants/custom-apps/sigct-banner';

/** Check whether a menu item/section should be visible */
export function isVisible(
  vis: string | undefined,
  isStore: boolean,
  isRepair: boolean
): boolean {
  if (!vis || vis === 'always') return true;
  if (vis === 'store') return isStore;
  if (vis === 'repair') return isRepair;
  return true;
}

/** Convert SigCT menu sections into LayoutListSections */
export function buildSections(
  menus: SigCTMenuSection[],
  isStore: boolean,
  isRepair: boolean
): LayoutListSection[] {
  return menus
    .filter(s => isVisible(s.visibleWhen, isStore, isRepair))
    .map(section => ({
      id: section.id,
      header: section.title,
      rows: section.items
        .filter(i => isVisible(i.visibleWhen, isStore, isRepair))
        .map(item => ({
          id: item.id,
          title: item.label,
          trailing: createElement('div', { className: 'flex items-center gap-1' },
            item.hasInfo && createElement(LuInfo, { className: 'h-2.5 w-2.5 text-ios-gray' }),
            createElement(LuChevronRight, { className: 'h-2.5 w-2.5 text-ios-gray' })
          )
        }))
    }))
    .filter(s => s.rows.length > 0);
}

/** Convert store detail fields into LayoutListSections */
export function buildStoreDetailSections(detail: SigCTStoreDetail): LayoutListSection[] {
  const rows = STORE_DETAIL_FIELDS
    .filter(f => detail[f.key])
    .map(f => ({
      id: f.key,
      title: f.label,
      meta: detail[f.key] ?? '',
    }));
  return [{ id: 'store-info', rows }];
}

/** Convert DSC submenu sections into LayoutListSections */
export function buildDSCSections(): LayoutListSection[] {
  return SIGCT_DSC_SUBMENU.map(section => ({
    id: section.id,
    header: section.title,
    rows: section.items.map(item => ({
      id: item.id,
      title: item.label,
      trailing: createElement('div', { className: 'flex items-center gap-1' },
        item.hasInfo && createElement(LuInfo, { className: 'h-2.5 w-2.5 text-ios-gray' }),
        createElement(LuChevronRight, { className: 'h-2.5 w-2.5' })
      )
    }))
  }));
}
