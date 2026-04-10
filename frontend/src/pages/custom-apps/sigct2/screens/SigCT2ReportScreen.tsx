import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { OneColLayout } from '../../../../components/layout';
import { SigCT2StickyTable } from '../components/SigCT2StickyTable';
import { SigCT2TabPicker } from '../components/SigCT2TabPicker';
import { SigCT2LoadingSpinner } from '../components/SigCT2LoadingSpinner';
import { formatMoney, formatPct } from '../../../../utils/sigct/format';
import { getAmountForPeriod } from '../../../../utils/sigct/report-utils';
import { REPORT_PERIODS, REPORT_HEADERS } from '../../../../constants/custom-apps/sigct2-menus';
import { SIGCT2_REPORT_GREEN, SIGCT2_REPORT_RED } from '../../../../constants/custom-apps/sigct2';
import type { SigCT2Sale, SigCT2SalesAndPlanByDay, SigCT2SalesPeriod } from '../../../../types/custom-apps/sigct2';

type SigCT2ReportScreenProps = {
  title: string;
  reportDate: string;
  sales: SigCT2Sale[];
  salesByDay: SigCT2SalesAndPlanByDay[];
  period: SigCT2SalesPeriod;
  isLoading: boolean;
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onPeriodChange: (period: SigCT2SalesPeriod) => void;
  onDrillDown: (sale: SigCT2Sale) => void;
  onBack: () => void;
  onGoHome: () => void;
};

const PERIOD_TABS = REPORT_PERIODS.map(p => ({ id: p, label: p }));

export function SigCT2ReportScreen(props: SigCT2ReportScreenProps) {
  const chartData = props.salesByDay.map(d => {
    const sales = d.salesAmount?.value ?? 0;
    const plan = d.planAmount?.value ?? 1;
    const pct = plan !== 0 ? ((sales - plan) / plan) * 100 : 0;
    const dateStr = d.reportDate?.internalValue ?? '';
    const day = dateStr.split('/').pop() ?? dateStr;
    return { name: day, pct: Math.round(pct * 10) / 10 };
  });

  const rows = props.sales.map(sale => {
    const comp = getAmountForPeriod(sale as any, props.period as any, 'comp');
    const lyComp = getAmountForPeriod(sale as any, props.period as any, 'lyComp');
    const total = getAmountForPeriod(sale as any, props.period as any, 'total');
    const lyTotal = getAmountForPeriod(sale as any, props.period as any, 'ly');
    const plan = getAmountForPeriod(sale as any, props.period as any, 'plan');
    const compPct = lyComp !== 0 ? (comp / lyComp) - 1 : 0;
    const totalPct = lyTotal !== 0 ? (total / lyTotal) - 1 : 0;
    const planDelta = total - plan;
    const planPct = plan !== 0 ? total / plan : 0;
    return [
      sale.entity?.name ?? '', formatMoney(comp), formatPct(compPct),
      formatMoney(total), formatPct(totalPct),
      formatMoney(planDelta), formatPct(planPct)
    ];
  });

  const totals = props.sales.reduce((acc, sale) => {
    acc.comp += getAmountForPeriod(sale as any, props.period as any, 'comp');
    acc.lyComp += getAmountForPeriod(sale as any, props.period as any, 'lyComp');
    acc.total += getAmountForPeriod(sale as any, props.period as any, 'total');
    acc.lyTotal += getAmountForPeriod(sale as any, props.period as any, 'ly');
    acc.plan += getAmountForPeriod(sale as any, props.period as any, 'plan');
    return acc;
  }, { comp: 0, lyComp: 0, total: 0, lyTotal: 0, plan: 0 });

  const footer = [
    'Total', formatMoney(totals.comp),
    formatPct(totals.lyComp !== 0 ? (totals.comp / totals.lyComp) - 1 : 0),
    formatMoney(totals.total),
    formatPct(totals.lyTotal !== 0 ? (totals.total / totals.lyTotal) - 1 : 0),
    formatMoney(totals.total - totals.plan),
    formatPct(totals.plan !== 0 ? totals.total / totals.plan : 0)
  ];

  const chartContent = (
    <div>
      <div className={`pb-0.5 text-center text-[8px] ${props.isDark ? 'text-white/60' : 'text-black/45'}`}>{props.reportDate}</div>
      <div className={`px-2 pb-0.5 text-[7px] ${props.isDark ? 'text-white/50' : 'text-black/40'}`}>
        Sales Report : Signet -- Sales vs. Plan %
      </div>
      <div style={{ height: 100 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={props.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
            <XAxis dataKey="name" tick={{ fill: props.isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', fontSize: 7 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: props.isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', fontSize: 7 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: props.isDark ? '#393f42' : '#fff', border: 'none', fontSize: 9, color: props.isDark ? '#fff' : '#000' }} />
            <ReferenceLine y={0} stroke={props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'} />
            <Bar dataKey="pct" radius={[2, 2, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.pct >= 0 ? SIGCT2_REPORT_GREEN : SIGCT2_REPORT_RED} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="py-1.5">
        <SigCT2TabPicker
          tabs={PERIOD_TABS}
          activeId={props.period}
          onSelect={(id) => props.onPeriodChange(id as SigCT2SalesPeriod)}
          isDark={props.isDark}
        />
      </div>
    </div>
  );

  const tableContent = (
    <div>
      {props.isLoading && <SigCT2LoadingSpinner isDark={props.isDark} />}
      <SigCT2StickyTable
        headers={REPORT_HEADERS}
        rows={rows}
        footer={footer}
        isDark={props.isDark}
        onRowClick={(i) => props.sales[i] && props.onDrillDown(props.sales[i])}
      />
    </div>
  );

  if (props.deviceFamily === 'ipad') {
    return <>{chartContent}{tableContent}</>;
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{
        title: props.title,
        leadingLabel: props.canGoBack ? '\u2039 Back' : '\u2039 SigCT2'
      }}
      topContent={chartContent}
      topContentPlacement="fixed"
      sections={[]}
      bottomContent={tableContent}
      onLeadingAction={props.canGoBack ? props.onBack : props.onGoHome}
    />
  );
}
