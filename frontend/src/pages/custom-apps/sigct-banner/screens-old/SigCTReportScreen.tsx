import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { OneColLayout } from '../../../../components/layout';

import { SigCTStickyTable } from '../components/SigCTStickyTable';
import { formatMoney, formatPct } from '../../../../utils/sigct/format';
import { getAmountForPeriod } from '../../../../utils/sigct/report-utils';
import { REPORT_PERIODS, REPORT_GREEN, REPORT_RED, REPORT_HEADERS } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTSale, SigCTSalesAndPlanByDay, SigCTSalesPeriod } from '../../../../types/custom-apps/sigct-banner';

type SigCTReportScreenProps = {
  title: string;
  reportDate: string;
  sales: SigCTSale[];
  salesByDay: SigCTSalesAndPlanByDay[];
  period: SigCTSalesPeriod;
  isLoading: boolean;
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onPeriodChange: (period: SigCTSalesPeriod) => void;
  onDrillDown: (sale: SigCTSale) => void;
  onBack: () => void;
  onGoHome: () => void;
};

export function SigCTReportScreen(props: SigCTReportScreenProps) {
  const chartData = props.salesByDay.map(d => {
    const sales = d.salesAmount?.value ?? 0;
    const plan = d.planAmount?.value ?? 1;
    const pct = plan !== 0 ? ((sales - plan) / plan) * 100 : 0;
    const dateStr = d.reportDate?.internalValue ?? '';
    const day = dateStr.split('/').pop() ?? dateStr;
    return { name: day, pct: Math.round(pct * 10) / 10 };
  });

  const rows = props.sales.map(sale => {
    const comp = getAmountForPeriod(sale, props.period, 'comp');
    const lyComp = getAmountForPeriod(sale, props.period, 'lyComp');
    const total = getAmountForPeriod(sale, props.period, 'total');
    const lyTotal = getAmountForPeriod(sale, props.period, 'ly');
    const plan = getAmountForPeriod(sale, props.period, 'plan');
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
    acc.comp += getAmountForPeriod(sale, props.period, 'comp');
    acc.lyComp += getAmountForPeriod(sale, props.period, 'lyComp');
    acc.total += getAmountForPeriod(sale, props.period, 'total');
    acc.lyTotal += getAmountForPeriod(sale, props.period, 'ly');
    acc.plan += getAmountForPeriod(sale, props.period, 'plan');
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
        Sales Report : Signet — Sales vs. Plan %
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
                <Cell key={i} fill={entry.pct >= 0 ? REPORT_GREEN : REPORT_RED} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-0.5 px-3 py-1.5">
        {REPORT_PERIODS.map(p => (
          <button
            key={p}
            onClick={() => props.onPeriodChange(p)}
            className={`rounded px-2 py-0.5 text-[7px] font-bold ${
              p === props.period
                ? (props.isDark ? 'bg-white text-black' : 'bg-black text-white')
                : (props.isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-black/5 text-black/50 hover:bg-black/10')
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );

  const tableContent = (
    <div className="flex-1">
      {props.isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className={`h-4 w-4 animate-spin rounded-full border-2 ${props.isDark ? 'border-white/30 border-t-white' : 'border-black/20 border-t-black'}`} />
        </div>
      )}
      <SigCTStickyTable
        headers={REPORT_HEADERS} rows={rows} footer={footer}
        isDark={props.isDark}
        onRowClick={(i) => props.sales[i] && props.onDrillDown(props.sales[i])}
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
          title: props.title,
          leadingLabel: props.canGoBack ? '‹ Back' : '‹ SigCT'
        }}
        topContent={chartContent}
        topContentPlacement="fixed"
        sections={[]}
        bottomContent={tableContent}
        onLeadingAction={props.canGoBack ? props.onBack : props.onGoHome}
      />
    </>
  );
}
