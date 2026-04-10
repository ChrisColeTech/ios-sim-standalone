import { OneColLayout } from '../../../../components/layout';

import { SigCTStickyTable } from '../components/SigCTStickyTable';
import {
  MORNING_TABS, MORNING_ENTITY_HEADERS, MORNING_CUSTOMER_HEADERS
} from '../../../../constants/custom-apps/sigct-banner';
import type {
  SigCTMorningData, SigCTMorningCustomerData, SigCTMorningTab
} from '../../../../types/custom-apps/sigct-banner';

type SigCTMorningReportScreenProps = {
  entityData: SigCTMorningData[];
  customerData: SigCTMorningCustomerData[];
  tab: SigCTMorningTab;
  title: string;
  isStore: boolean;
  isLoading: boolean;
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onTabChange: (tab: SigCTMorningTab) => void;
  onDrillDown: (entity: SigCTMorningData) => void;
  onBack: () => void;
  onGoHome: () => void;
};

export function SigCTMorningReportScreen(props: SigCTMorningReportScreenProps) {
  // Tab selector
  const tabContent = (
    <div className="flex justify-center gap-0.5 px-3 py-1.5">
      {MORNING_TABS.map((t, i) => {
        const tabValue: SigCTMorningTab = i === 0 ? 'notShipped' : 'notReceived';
        return (
          <button
            key={t}
            onClick={() => props.onTabChange(tabValue)}
            className={`rounded px-2 py-0.5 text-[7px] font-bold ${
              tabValue === props.tab
                ? (props.isDark ? 'bg-white text-black' : 'bg-black text-white')
                : (props.isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-black/5 text-black/50 hover:bg-black/10')
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );

  // Entity view: entity name + job count
  const entityRows = props.entityData.map(e => [
    e.entity?.name ?? '',
    String(e.jobCount?.all ?? 0)
  ]);
  const entityFooter = ['Total', String(entityRows.reduce((sum, r) => sum + (parseInt(r[1]) || 0), 0))];

  // Customer view: customer name, job number, promise date, status, tracking
  const customerRows = props.customerData.map(c => [
    c.guestName ?? '',
    c.jobNo ?? '',
    c.datePromised ?? '',
    c.jobStatus ?? '',
    c.trackingNOSAsString ?? ''
  ]);

  const tableContent = (
    <div className="flex-1">
      {props.isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className={`h-4 w-4 animate-spin rounded-full border-2 ${props.isDark ? 'border-white/30 border-t-white' : 'border-black/20 border-t-black'}`} />
        </div>
      )}
      {props.isStore ? (
        <SigCTStickyTable
          headers={MORNING_CUSTOMER_HEADERS}
          rows={customerRows}
          isDark={props.isDark}
        />
      ) : (
        <SigCTStickyTable
          headers={MORNING_ENTITY_HEADERS}
          rows={entityRows}
          footer={entityFooter}
          isDark={props.isDark}
          onRowClick={i => props.entityData[i] && props.onDrillDown(props.entityData[i])}
        />
      )}
    </div>
  );

  return (
    <>
      <OneColLayout
        deviceFamily={props.deviceFamily}
        isLandscape={false}
        theme={props.theme}
        toolbar={{
          title: props.title || 'Morning Report',
          leadingLabel: props.canGoBack ? '‹ Back' : '‹ D&SC'
        }}
        topContent={tabContent}
        topContentPlacement="fixed"
        sections={[]}
        bottomContent={tableContent}
        onLeadingAction={props.canGoBack ? props.onBack : props.onGoHome}
      />
    </>
  );
}
