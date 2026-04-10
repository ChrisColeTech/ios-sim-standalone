import { OneColLayout } from '../../../../components/layout';
import { JOBS_SUMMARY_STATS, JOBS_TABS, JOBS_HEADERS } from '../../../../constants/custom-apps/sigct2-menus';
import { SigCT2TabPicker } from '../components/SigCT2TabPicker';
import { SigCT2StickyTable } from '../components/SigCT2StickyTable';
import { SigCT2LoadingSpinner } from '../components/SigCT2LoadingSpinner';

type SigCT2JobsScreenProps = {
  summary: Record<string, number>;
  entities: { entityID?: string; name?: string; jobCount?: { all?: number; repair?: number; custom?: number } }[];
  tab: string;
  title: string;
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

export function SigCT2JobsScreen(props: SigCT2JobsScreenProps) {
  const summaryContent = (
    <div className="grid grid-cols-3 gap-2 px-2 py-2">
      {JOBS_SUMMARY_STATS.map((stat) => (
        <div
          key={stat.key}
          className={`rounded-lg px-2 py-1.5 text-center ${
            props.isDark ? 'bg-white/10' : 'bg-black/5'
          }`}
        >
          <div className="text-[14px] font-bold">{props.summary[stat.key] ?? 0}</div>
          <div className="text-[7px] opacity-60">{stat.label}</div>
        </div>
      ))}
    </div>
  );

  const tabs = JOBS_TABS.map((t) => ({ id: t.toLowerCase(), label: t }));

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

  const rows = props.entities.map((e) => {
    const count = props.tab === 'repair'
      ? e.jobCount?.repair ?? 0
      : props.tab === 'custom'
        ? e.jobCount?.custom ?? 0
        : e.jobCount?.all ?? 0;
    return [e.name ?? e.entityID ?? '-', String(count)];
  });

  const tableContent = props.isLoading ? (
    <SigCT2LoadingSpinner isDark={props.isDark} />
  ) : (
    <div className="px-2 pb-2">
      <SigCT2StickyTable
        headers={JOBS_HEADERS}
        rows={rows}
        isDark={props.isDark}
        onRowClick={(i) => props.onDrillDown(props.entities[i])}
      />
    </div>
  );

  if (props.deviceFamily === 'ipad') {
    return (
      <>
        {summaryContent}
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
      topContent={<>{summaryContent}{tabContent}</>}
      topContentPlacement="fixed"
      sections={[]}
      bottomContent={tableContent}
    />
  );
}
