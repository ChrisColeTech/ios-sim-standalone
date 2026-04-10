import { LuChevronLeft } from 'react-icons/lu';
import { OneColLayout, TwoColLayout } from '../../../../components/layout';

import { SIGCT_DSC_SUBMENU, SIGCT_COLORS, SIGCT_DETAIL_BG } from '../../../../constants/custom-apps/sigct-banner';
import { buildDSCSections } from '../../../../utils/sigct/menu-utils';
import type { SigCTScreen } from '../../../../types/custom-apps/sigct-banner';
import detailLogo from '../../../../assets/images/sigct-banner/sigct-detail-logo.png';

type SigCTDSCMenuScreenProps = {
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  onSelect: (screen: SigCTScreen, title?: string) => void;
  onBack: () => void;
};

export function SigCTDSCMenuScreen(props: SigCTDSCMenuScreenProps) {
  const sections = buildDSCSections();

  const handleRow = (_sectionId: string, rowId: string) => {
    for (const section of SIGCT_DSC_SUBMENU) {
      const item = section.items.find(i => i.id === rowId);
      if (item) { props.onSelect(item.screen, item.label); return; }
    }
  };

  if (props.deviceFamily === 'ipad') {
    return (
      <>
        <TwoColLayout
          theme={props.theme}
          colorOverrides={SIGCT_COLORS}
          toolbarLeading={
            <button
              className={`flex h-4 w-4 items-center justify-center rounded-full border-0 p-0 ${props.isDark ? 'bg-white/12 text-white hover:bg-white/18' : 'bg-black/5 text-black hover:bg-black/10'}`}
              onClick={props.onBack}
              type="button"
            >
              <LuChevronLeft className="h-2.5 w-2.5" />
            </button>
          }
          toolbarTitle="Signet D&SC"
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
