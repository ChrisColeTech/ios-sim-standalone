import { OneColLayout } from '../../../../components/layout';
import { MORNING_TABS, MORNING_HEADERS, MORNING_CUSTOMER_HEADERS } from '../../../../constants/custom-apps/sigct2-menus';
import { SigCT2TabPicker } from '../components/SigCT2TabPicker';
import { SigCT2StickyTable } from '../components/SigCT2StickyTable';
import { SigCT2LoadingSpinner } from '../components/SigCT2LoadingSpinner';

type SigCT2MorningReportScreenProps = {
  entityData: { entity?: { name?: string }; jobCount?: { all?: number; repair?: number; custom?: number } }[];
  customerData: { guestName?: string; jobNo?: string; datePromised?: string; jobStatus?: string; trackingNOSAsString?: string }[];
  tab: string;
  title: string;
  isStore: boolean;
  isLoading: boolean;
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onTabChange: (tab: string) => void;
  onDrillDown: (entity: any) => void;
  onBack: () => void;
  onGoHome: () => void;
};

export function SigCT2MorningReportScreen(props: SigCT2MorningReportScreenProps) {
  const tabs = MORNING_TABS.map((t) => ({
    id: t === 'Not Shipped' ? 'notShipped' : 'notReceived',
    label: t,
  }));

  const tabContent = (
    <div className="py-2">
      <SigCT2TabPicker
        tabs={tabs}
        activeId={props.tab}
        onSelect={props.onTabChange}
        isDark={props.isDark}
      />
    </div>
  );

  let tableContent: React.ReactNode;

  if (props.isLoading) {
    tableContent = <SigCT2LoadingSpinner isDark={props.isDark} />;
  } else if (props.isStore) {
    const rows = props.customerData.map((c) => [
      c.guestName ?? '-',
      c.jobNo ?? '-',
      c.datePromised ?? '-',
      c.jobStatus ?? '-',
      c.trackingNOSAsString ?? '-',
    ]);
    tableContent = (
      <div className="px-2 pb-2">
        <SigCT2StickyTable
          headers={MORNING_CUSTOMER_HEADERS}
          rows={rows}
          isDark={props.isDark}
        />
      </div>
    );
  } else {
    const rows = props.entityData.map((e) => [
      e.entity?.name ?? '-',
      String(e.jobCount?.all ?? 0),
    ]);
    tableContent = (
      <div className="px-2 pb-2">
        <SigCT2StickyTable
          headers={MORNING_HEADERS}
          rows={rows}
          isDark={props.isDark}
          onRowClick={(i) => props.onDrillDown(props.entityData[i])}
        />
      </div>
    );
  }

  if (props.deviceFamily === 'ipad') {
    return (
      <>
        {tabContent}
        {tableContent}
      </>
    );
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{
        title: props.title,
        leadingLabel: props.canGoBack ? 'Back' : undefined,
      }}
      onLeadingAction={props.canGoBack ? props.onBack : undefined}
      topContent={tabContent}
      topContentPlacement="fixed"
      sections={[]}
      bottomContent={tableContent}
    />
  );
}
