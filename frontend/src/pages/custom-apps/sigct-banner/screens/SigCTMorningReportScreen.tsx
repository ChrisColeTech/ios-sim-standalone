import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTMorningData, SigCTMorningCustomerData, SigCTMorningTab } from '../../../../types/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  data: SigCTMorningData[];
  customerData: SigCTMorningCustomerData[];
  tab: SigCTMorningTab;
  title: string;
  isStore: boolean;
  isLoading: boolean;
  canGoBack: boolean;
  isDark: boolean;
  onTabChange: (tab: SigCTMorningTab) => void;
  onDrillDown: (entity: SigCTMorningData) => void;
  onBack: () => void;
  onClose: () => void;
};

export function SigCTMorningReportScreen(props: Props) {
  const tabs: { key: SigCTMorningTab; label: string }[] = [
    { key: 'notShipped', label: 'Not Shipped' },
    { key: 'notReceived', label: 'Not Received' },
  ];

  let sections: IOSTableSection[];

  if (props.isStore && props.customerData.length > 0) {
    sections = [{
      id: 'customers',
      header: 'Customer Jobs',
      rows: props.customerData.map((c, i) => ({
        id: `cust-${i}`,
        label: c.guestName ?? 'Unknown',
        detail: c.jobNo ? `#${c.jobNo}` : c.jobStatus ?? '',
      })),
    }];
  } else {
    sections = [{
      id: 'entities',
      header: props.title || 'Morning Report',
      rows: props.data.length > 0
        ? props.data.map((d, i) => ({
            id: `mr-${i}`,
            label: d.entity?.name ?? 'Unknown',
            detail: String(d.jobCount?.all ?? 0),
            accessory: 'disclosure' as const,
            onTap: () => props.onDrillDown(d),
          }))
        : [{ id: 'empty', label: props.isLoading ? 'Loading...' : 'No data' }],
    }];
  }

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title={props.title || 'Morning Report'}
        isDark={false}
        navBg={SIGCT_NAV_BLUE}
        onBack={props.canGoBack ? props.onBack : props.onClose}
      />
      {/* Tab bar */}
      <div className="flex shrink-0 border-b border-black/10" style={{ backgroundColor: SIGCT_NAV_BLUE }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => props.onTabChange(t.key)}
            className={`flex-1 py-1 text-[9px] font-medium ${props.tab === t.key ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={false} />
      </div>
    </div>
  );
}
