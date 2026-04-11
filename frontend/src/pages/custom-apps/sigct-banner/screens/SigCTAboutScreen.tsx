import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE, SIGCT_APP_VERSION } from '../../../../constants/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  username: string | null;
  isDark: boolean;
  onBack: () => void;
};

export function SigCTAboutScreen(props: Props) {
  const sections: IOSTableSection[] = [
    {
      id: 'app',
      header: 'Application',
      rows: [
        { id: 'name', label: 'App Name', detail: 'SigCT Banner' },
        { id: 'version', label: 'Version', detail: SIGCT_APP_VERSION },
        { id: 'user', label: 'User', detail: props.username ?? 'Not logged in' },
      ],
    },
    {
      id: 'support',
      header: 'Support',
      rows: [
        { id: 'contact', label: 'Contact IT CSD for support' },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title="About"
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
