import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTChildJobCount, SigCTJobCountValue, SigCTJobsTab } from '../../../../types/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  summary: SigCTJobCountValue | null;
  entities: SigCTChildJobCount[];
  tab: SigCTJobsTab;
  title: string;
  isLoading: boolean;
  canGoBack: boolean;
  isDark: boolean;
  onTabChange: (tab: SigCTJobsTab) => void;
  onDrillDown: (entity: SigCTChildJobCount) => void;
  onBack: () => void;
  onClose: () => void;
};

function countForTab(count?: { all?: number; repair?: number; custom?: number }, tab: SigCTJobsTab = 'all'): number {
  if (!count) return 0;
  if (tab === 'repair') return count.repair ?? 0;
  if (tab === 'custom') return count.custom ?? 0;
  return count.all ?? 0;
}

export function SigCTJobsScreen(props: Props) {
  const tabs: SigCTJobsTab[] = ['all', 'repair', 'custom'];

  const summaryRows = props.summary
    ? [
        { id: 'overdue', label: 'Overdue', detail: String(countForTab(props.summary.overdue, props.tab)) },
        { id: 'due2', label: 'Due in 2 Days', detail: String(countForTab(props.summary.duein2Days, props.tab)) },
        { id: 'due5', label: 'Due in 5 Days', detail: String(countForTab(props.summary.duein5Days, props.tab)) },
        { id: 'due7', label: 'Due in 7 Days', detail: String(countForTab(props.summary.duein7Days, props.tab)) },
        { id: 'queue', label: 'Jobs in Queue', detail: String(countForTab(props.summary.jobsinqueue, props.tab)) },
        { id: 'completed', label: 'Completed', detail: String(countForTab(props.summary.completed, props.tab)) },
      ]
    : [{ id: 'empty', label: props.isLoading ? 'Loading...' : 'No data' }];

  const entityRows = props.entities.map((e, i) => ({
    id: `entity-${i}`,
    label: e.name ?? 'Unknown',
    detail: String(countForTab(e.jobCount, props.tab)),
    accessory: 'disclosure' as const,
    onTap: () => props.onDrillDown(e),
  }));

  const sections: IOSTableSection[] = [
    { id: 'summary', header: 'Summary', rows: summaryRows },
    ...(entityRows.length > 0 ? [{ id: 'entities', header: 'Entities', rows: entityRows }] : []),
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title={props.title || 'Jobs in Shop'}
        isDark={false}
        navBg={SIGCT_NAV_BLUE}
        onBack={props.canGoBack ? props.onBack : props.onClose}
      />
      {/* Tab bar */}
      <div className="flex shrink-0 border-b border-black/10" style={{ backgroundColor: SIGCT_NAV_BLUE }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => props.onTabChange(t)}
            className={`flex-1 py-1 text-[9px] font-medium capitalize ${props.tab === t ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
            type="button"
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={false} />
      </div>
    </div>
  );
}
