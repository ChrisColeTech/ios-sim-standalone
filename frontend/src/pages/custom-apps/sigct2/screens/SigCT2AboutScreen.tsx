import { OneColLayout } from '../../../../components/layout';
import { OneColSection } from '../../../../components/layout/1-col/OneColSection';
import type { SigCT2AboutScreenProps } from '../../../../types/custom-apps/sigct2';
import type { LayoutListSection } from '../../../../types/layouts';

export function SigCT2AboutScreen(props: SigCT2AboutScreenProps) {
  const sections: LayoutListSection[] = [
    {
      id: 'connection',
      header: 'Connection',
      rows: [
        { id: 'endpoint', title: 'Endpoint', meta: props.endpoint },
        { id: 'version', title: 'Version', meta: props.appVersion },
      ],
    },
    {
      id: 'user',
      header: 'User',
      rows: [
        { id: 'email', title: 'Email', meta: props.email },
        { id: 'employeeId', title: 'Employee ID', meta: props.employeeId },
      ],
    },
    {
      id: 'session',
      header: 'Session',
      rows: [
        { id: 'timeRemaining', title: 'Time Remaining', meta: props.formattedTime },
      ],
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
      toolbar={{ title: 'About', leadingLabel: 'Back' }}
      onLeadingAction={props.onBack}
      sections={sections}
    />
  );
}
