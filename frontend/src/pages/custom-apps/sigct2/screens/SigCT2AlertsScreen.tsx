import { OneColLayout } from '../../../../components/layout';
import { OneColSection } from '../../../../components/layout/1-col/OneColSection';
import { SigCT2LoadingSpinner } from '../components/SigCT2LoadingSpinner';
import type { SigCT2AlertsScreenProps } from '../../../../types/custom-apps/sigct2';
import type { LayoutListSection } from '../../../../types/layouts';

export function SigCT2AlertsScreen(props: SigCT2AlertsScreenProps) {
  if (props.isLoading) {
    if (props.deviceFamily === 'ipad') {
      return <SigCT2LoadingSpinner isDark={props.isDark} />;
    }
    return (
      <OneColLayout
        deviceFamily={props.deviceFamily}
        isLandscape={props.isLandscape}
        theme={props.theme}
        toolbar={{ title: 'Alerts', leadingLabel: 'Back' }}
        onLeadingAction={props.onBack}
        sections={[]}
        bottomContent={<SigCT2LoadingSpinner isDark={props.isDark} />}
      />
    );
  }

  const sections: LayoutListSection[] = [
    {
      id: 'alerts',
      header: 'Alerts',
      rows: props.alerts.map((alert, i) => ({
        id: `alert-${i}`,
        title: alert.title ?? 'Alert',
        subtitle: alert.message ?? '',
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
      toolbar={{ title: 'Alerts', leadingLabel: 'Back' }}
      onLeadingAction={props.onBack}
      sections={sections}
    />
  );
}
