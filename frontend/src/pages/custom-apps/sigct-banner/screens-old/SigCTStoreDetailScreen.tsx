import { OneColLayout } from '../../../../components/layout';

import { buildStoreDetailSections } from '../../../../utils/sigct/menu-utils';
import type { SigCTStoreDetail } from '../../../../types/custom-apps/sigct-banner';

type SigCTStoreDetailScreenProps = {
  detail: SigCTStoreDetail;
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  onBack: () => void;
};

export function SigCTStoreDetailScreen(props: SigCTStoreDetailScreenProps) {
  const sections = buildStoreDetailSections(props.detail);

  return (
    <>
      <OneColLayout
        deviceFamily={props.deviceFamily}
        isLandscape={false}
        theme={props.theme}
        toolbar={{ title: props.detail.name ?? 'Store Detail', leadingLabel: '‹ Back' }}
        sections={sections}
        onLeadingAction={props.onBack}
      />
    </>
  );
}
