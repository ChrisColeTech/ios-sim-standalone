import { OneColLayout } from '../../../../components/layout';
import { SIGCT2_STORE_MENU, SIGCT2_DSC_MENU, SIGCT2_DSC_SUBMENU } from '../../../../constants/custom-apps/sigct2-menus';
import { SIGCT2_COLORS } from '../../../../constants/custom-apps/sigct2';
import { buildSections, buildDSCSections } from '../../../../utils/sigct/menu-utils';
import type { SigCT2HomeMenuScreenProps } from '../../../../types/custom-apps/sigct2';

export function SigCT2HomeMenuScreen(props: SigCT2HomeMenuScreenProps) {
  let sections;
  if (props.activeTab === 'dsc') {
    sections = buildDSCSections();
  } else if (props.activeTab === 'info') {
    const infoSections = SIGCT2_STORE_MENU.filter(
      s => s.id === 'news' || s.id === 'information' || s.id === 'logout'
    );
    sections = buildSections(infoSections as any, props.isStore, props.isRepair);
  } else {
    const allMenus = [...SIGCT2_STORE_MENU, ...(props.isRepair ? SIGCT2_DSC_MENU : [])];
    sections = buildSections(allMenus as any, props.isStore, props.isRepair);
  }

  const handleRow = (_sectionId: string, rowId: string) => {
    if (rowId === 'logout') { props.onLogout(); return; }
    const allMenus = [...SIGCT2_STORE_MENU, ...SIGCT2_DSC_SUBMENU];
    for (const menu of allMenus) {
      const item = menu.items.find(i => i.id === rowId);
      if (item) { props.onSelect(item.screen, item.label); return; }
    }
  };

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      colorOverrides={SIGCT2_COLORS}
      toolbar={{ title: 'SigCT2' }}
      sections={sections}
      floatingBar={props.floatingBar}
      onRowSelect={handleRow}
    />
  );
}
