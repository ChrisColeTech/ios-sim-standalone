import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE } from '../../../../constants/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  isDark: boolean;
  onBack: () => void;
};

export function SigCTHelpScreen(props: Props) {
  const sections: IOSTableSection[] = [
    {
      id: 'help',
      header: 'Help & Support',
      rows: [
        { id: 'faq', label: 'Frequently Asked Questions' },
        { id: 'contact', label: 'Contact IT CSD' },
        { id: 'feedback', label: 'Send Feedback' },
      ],
    },
    {
      id: 'docs',
      header: 'Documentation',
      rows: [
        { id: 'guide', label: 'User Guide' },
        { id: 'release', label: 'Release Notes' },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title="Help"
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
