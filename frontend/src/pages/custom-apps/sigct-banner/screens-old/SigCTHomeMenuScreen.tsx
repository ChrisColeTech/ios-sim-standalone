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
      <>
        <TwoColLayout
          theme={props.theme}
          colorOverrides={SIGCT_COLORS}
          sidebar={{ sections }}
          selectedSidebarRowId={null}
          onSidebarSelect={(rowId) => handleRow('', rowId)}
          detail={{
            content: (
              <div className="flex h-full items-center justify-center rounded-2xl" style={{ backgroundColor: SIGCT_DETAIL_BG }}>
                <img src={detailLogo} alt="SigCT" className="w-[40%] object-contain" />
              </div>
            )
          }}
        />
      </>
    );
  }

  return (
    <>
      <OneColLayout
        deviceFamily={props.deviceFamily}
        isLandscape={false}
        theme={props.theme}
        colorOverrides={SIGCT_COLORS}
        toolbar={{ title: 'SigCT' }}
        sections={sections}
        onRowSelect={handleRow}
      />
    </>
  );
}
