import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE } from '../../../../constants/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  alertCount: number;
  isDark: boolean;
  onBack: () => void;
};

export function SigCTAlertsScreen(props: Props) {
  const sections: IOSTableSection[] = [
    {
      id: 'alerts',
      header: 'News & Alerts',
      rows: props.alertCount > 0
        ? [{ id: 'count', label: `${props.alertCount} active alerts` }]
        : [{ id: 'empty', label: 'No alerts at this time' }],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title="Alerts"
        isDark={false}
        navBg={SIGCT_NAV_BLUE}
        onBack={props.onBack}
      />
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={false} />
      </div>
    </div>
  );
}
