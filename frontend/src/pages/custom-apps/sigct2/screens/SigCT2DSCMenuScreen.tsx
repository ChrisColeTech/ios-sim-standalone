import { OneColLayout } from '../../../../components/layout';
import { SIGCT2_DSC_SUBMENU } from '../../../../constants/custom-apps/sigct2-menus';
import { SIGCT2_COLORS } from '../../../../constants/custom-apps/sigct2';
import { buildDSCSections } from '../../../../utils/sigct/menu-utils';
import type { SigCT2Screen } from '../../../../types/custom-apps/sigct2';

type SigCT2DSCMenuScreenProps = {
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  onSelect: (screen: SigCT2Screen, title?: string) => void;
  onBack: () => void;
};

export function SigCT2DSCMenuScreen(props: SigCT2DSCMenuScreenProps) {
  const sections = buildDSCSections();

  const handleRow = (_sectionId: string, rowId: string) => {
    for (const section of SIGCT2_DSC_SUBMENU) {
      const item = section.items.find(i => i.id === rowId);
      if (item) { props.onSelect(item.screen, item.label); return; }
    }
  };

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      colorOverrides={SIGCT2_COLORS}
      toolbar={{ title: 'Signet D&SC', leadingLabel: '\u2039 Back' }}
      sections={sections}
      onLeadingAction={props.onBack}
      onRowSelect={handleRow}
    />
  );
}
