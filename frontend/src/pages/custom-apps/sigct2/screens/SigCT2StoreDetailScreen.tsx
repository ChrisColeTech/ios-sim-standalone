import { OneColLayout } from '../../../../components/layout';
import { OneColSection } from '../../../../components/layout/1-col/OneColSection';
import { STORE_DETAIL_FIELDS } from '../../../../constants/custom-apps/sigct2-menus';
import type { SigCT2StoreDetail } from '../../../../types/custom-apps/sigct2';
import type { LayoutListSection } from '../../../../types/layouts';

type SigCT2StoreDetailScreenProps = {
  detail: SigCT2StoreDetail;
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  onBack: () => void;
};

export function SigCT2StoreDetailScreen(props: SigCT2StoreDetailScreenProps) {
  const sections: LayoutListSection[] = [
    {
      id: 'store-details',
      header: 'Store Details',
      rows: STORE_DETAIL_FIELDS.map((field) => ({
        id: field.key,
        title: field.label,
        meta: props.detail[field.key] ?? '-',
      })),
    },
  ];

  if (props.deviceFamily === 'ipad') {
    return (
      <>
        {sections.map((s) => (
          <OneColSection key={s.id} section={s} compact theme={props.theme} />
        ))}
      </>
    );
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{ title: 'Store Details', leadingLabel: 'Back' }}
      onLeadingAction={props.onBack}
      sections={sections}
    />
  );
}
