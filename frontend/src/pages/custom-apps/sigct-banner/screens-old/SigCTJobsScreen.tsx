import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OneColLayout } from '../../../../components/layout';

import { SigCTStickyTable } from '../components/SigCTStickyTable';
import {
  JOBS_SUMMARY_STATS, JOBS_TABS, JOBS_ENTITY_HEADERS,
  REPORT_GREEN, SIGCT_SIGNET_GRAY
} from '../../../../constants/custom-apps/sigct-banner';
import type {
  SigCTJobCountValue, SigCTChildJobCount,
  SigCTJobsTab
} from '../../../../types/custom-apps/sigct-banner';

type SigCTJobsScreenProps = {
  summary: SigCTJobCountValue | null;
  entities: SigCTChildJobCount[];
  tab: SigCTJobsTab;
  title: string;
  isLoading: boolean;
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onTabChange: (tab: SigCTJobsTab) => void;
  onDrillDown: (entity: SigCTChildJobCount) => void;
  onBack: () => void;
  onGoHome: () => void;
};

function getJobCount(summary: SigCTJobCountValue | null, key: string, tab: SigCTJobsTab): number {
  const stat = summary?.[key as keyof SigCTJobCountValue] as { all?: number; repair?: number; custom?: number } | undefined;
  if (!stat) return 0;
  if (tab === 'repair') return stat.repair ?? 0;
  if (tab === 'custom') return stat.custom ?? 0;
  return stat.all ?? 0;
}

function getEntityJobCount(entity: SigCTChildJobCount, tab: SigCTJobsTab): number {
  if (tab === 'repair') return entity.repairJobcount ?? 0;
  if (tab === 'custom') return entity.customJobCount ?? 0;
  return (entity.repairJobcount ?? 0) + (entity.customJobCount ?? 0);
}

export function SigCTJobsScreen(props: SigCTJobsScreenProps) {
  // Build chart data from summary stats
  const chartData = JOBS_SUMMARY_STATS.map(stat => ({
    name: stat.label.replace('Overdue w/o Message', 'No Msg').replace('Due in ', '').replace(' Days', 'd'),
    count: getJobCount(props.summary, stat.key, props.tab),
  }));

  // Entity drill-down table
  const entityRows = props.entities.map(e => [
    e.name ?? '', String(getEntityJobCount(e, props.tab))
  ]);

  const entityFooter = ['Total', String(entityRows.reduce((sum, r) => sum + parseInt(r[1]) || 0, 0))];

  // Summary cards
  const summaryContent = props.summary ? (
    <div>
      {/* Summary stat cards */}
      <div className="grid grid-cols-3 gap-1 px-2 pb-2">
        {JOBS_SUMMARY_STATS.map(stat => {
          const count = getJobCount(props.summary, stat.key, props.tab);
          const isOverdue = stat.key === 'overdue' || stat.key === 'overduewomessage';
          return (
            <div
              key={stat.key}
              className={`rounded-lg px-2 py-1.5 text-center ${props.isDark ? 'bg-white/5' : 'bg-black/3'}`}
            >
              <div className={`text-[12px] font-bold ${isOverdue && count > 0 ? 'text-red-500' : (props.isDark ? 'text-white' : 'text-black')}`}>
                {count}
              </div>
              <div className={`text-[6px] ${props.isDark ? 'text-white/50' : 'text-black/40'}`}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-0.5 px-3 pb-1.5">
        {JOBS_TABS.map(t => {
          const tabValue = t.toLowerCase() as SigCTJobsTab;
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

      {/* Line chart */}
      <div style={{ height: 80 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: -15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={props.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
            <XAxis dataKey="name" tick={{ fill: props.isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', fontSize: 6 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: props.isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', fontSize: 7 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: props.isDark ? SIGCT_SIGNET_GRAY : '#fff', border: 'none', fontSize: 9, color: props.isDark ? '#fff' : '#000' }} />
            <Line type="monotone" dataKey="count" stroke={REPORT_GREEN} strokeWidth={2} dot={{ r: 3, fill: REPORT_GREEN }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : null;

  const tableContent = (
    <div className="flex-1">
      {props.isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className={`h-4 w-4 animate-spin rounded-full border-2 ${props.isDark ? 'border-white/30 border-t-white' : 'border-black/20 border-t-black'}`} />
        </div>
      )}
      <SigCTStickyTable
        headers={JOBS_ENTITY_HEADERS}
        rows={entityRows}
        footer={entityFooter}
        isDark={props.isDark}
        onRowClick={i => props.entities[i] && props.onDrillDown(props.entities[i])}
      />
    </div>
  );

  return (
    <>
      <OneColLayout
        deviceFamily={props.deviceFamily}
        isLandscape={false}
        theme={props.theme}
        toolbar={{
          title: props.title || 'Jobs in Shop',
          leadingLabel: props.canGoBack ? '‹ Back' : '‹ D&SC'
        }}
        topContent={summaryContent}
        topContentPlacement="fixed"
        sections={[]}
        bottomContent={tableContent}
        onLeadingAction={props.canGoBack ? props.onBack : props.onGoHome}
      />
    </>
  );
}
