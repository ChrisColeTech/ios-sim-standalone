import { OneColLayout, TwoColLayout } from '../../../../components/layout';
import { SIGCT_DSC_SUBMENU, SIGCT_COLORS, SIGCT_DETAIL_BG } from '../../../../constants/custom-apps/sigct-banner';
import { buildDSCSections } from '../../../../utils/sigct/menu-utils';
import type { SigCTScreen } from '../../../../types/custom-apps/sigct-banner';
import detailLogo from '../../../../assets/images/sigct-banner/sigct-detail-logo.png';

type SigCTDSCMenuScreenProps = {
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  selectedSidebarRowId: string | null;
  detailContent?: React.ReactNode;
  detailTitle?: string;
  onSelect: (screen: SigCTScreen, title?: string) => void;
  onBack: () => void;
};

export function SigCTDSCMenuScreen(props: SigCTDSCMenuScreenProps) {
  const sections = buildDSCSections();

  const handleRow = (_sectionId: string, rowId: string) => {
    if (rowId === 'back-to-sigct') { props.onBack(); return; }
    for (const section of SIGCT_DSC_SUBMENU) {
      const item = section.items.find(i => i.id === rowId);
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
          toolbarTitle={props.detailTitle ?? 'Signet D&SC'}
          sidebar={{ sections }}
          selectedSidebarRowId={props.selectedSidebarRowId}
          onSidebarSelect={(rowId) => handleRow('', rowId)}
          detail={{
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
      toolbar={{ title: 'Signet D&SC', leadingLabel: '‹ Back' }}
      sections={sections}
      onLeadingAction={props.onBack}
      onRowSelect={handleRow}
    />
  );
}
