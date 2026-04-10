import { OneColLayout, TwoColLayout } from '../../../../components/layout';
import { SIGCT_STORE_MENU, SIGCT_DSC_MENU, SIGCT_COLORS, SIGCT_DETAIL_BG } from '../../../../constants/custom-apps/sigct-banner';
import { buildSections } from '../../../../utils/sigct/menu-utils';
import type { SigCTHomeMenuScreenProps } from '../../../../types/custom-apps/sigct-banner';
import detailLogo from '../../../../assets/images/sigct-banner/sigct-detail-logo.png';

export function SigCTHomeMenuScreen(props: SigCTHomeMenuScreenProps) {
  const allMenus = [...SIGCT_STORE_MENU, ...(props.isRepair ? SIGCT_DSC_MENU : [])];
  const sections = buildSections(allMenus, props.isStore, props.isRepair);

  const handleRow = (_sectionId: string, rowId: string) => {
    if (rowId === 'logout') { props.onLogout(); return; }
    for (const menu of allMenus) {
      const item = menu.items.find(i => i.id === rowId);
      if (item) { props.onSelect(item.screen, item.label); return; }
    }
  };

  if (props.deviceFamily === 'ipad') {
    return (
      <div className="h-full" style={{ backgroundColor: SIGCT_DETAIL_BG }}>
        <TwoColLayout
          theme={props.theme}
          presentation="immersive"
          backgroundClassName="bg-transparent text-white"
          sidebarClassName={props.isDark ? 'bg-ios-gray-dark/95' : 'bg-ios-gray-light/95'}
          colorOverrides={SIGCT_COLORS}
          toolbarTitle={props.detailTitle}
          onToolbarAction={props.onDetailToolbarAction}
          sidebar={{ sections }}
          selectedSidebarRowId={props.selectedSidebarRowId}
          onSidebarSelect={(rowId) => handleRow('', rowId)}
          detail={{
            toolbarActions: props.detailToolbarActions,
            content: props.detailContent ?? (
              <div className="flex h-full items-center justify-center">
                <img src={detailLogo} alt="SigCT" className="w-[40%] object-contain" />
              </div>
            )
          }}
        />
      </div>
    );
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={false}
      theme={props.theme}
      colorOverrides={SIGCT_COLORS}
      toolbar={{ title: 'SigCT' }}
      sections={sections}
      onRowSelect={handleRow}
    />
  );
}
