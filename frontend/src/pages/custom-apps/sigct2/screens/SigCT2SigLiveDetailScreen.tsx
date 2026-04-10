import { OneColLayout } from '../../../../components/layout';
import { SigCT2Gauge } from '../components/SigCT2Gauge';
import { SigCT2StickyTable } from '../components/SigCT2StickyTable';
import { formatSigLiveMoney, salesPercent } from '../../../../utils/sigct/format';
import type { SigCT2SigLiveDetailScreenProps } from '../../../../types/custom-apps/sigct2';

const DETAIL_HEADERS = ['Name', 'Sales', 'Plan', '% Plan', 'Target', '\u00b1 Target'];

export function SigCT2SigLiveDetailScreen(props: SigCT2SigLiveDetailScreenProps) {
  const name = props.data.entity?.name ?? 'Detail';
  const pct = salesPercent(props.data as any);

  const rows = props.children.map(c => [
    c.entity?.name ?? '',
    formatSigLiveMoney(c.salesAmount as any),
    formatSigLiveMoney(c.planAmount as any),
    `${salesPercent(c as any).toFixed(1)}%`,
    c.targetPercent?.valueAsPercentage ?? '',
    c.amountOverTarget?.valueAsMoney ? `$${c.amountOverTarget.valueAsMoney}` : '',
  ]);

  const gaugeContent = (
    <div className="py-3">
      <h3 className={`mb-1 text-center text-[10px] font-semibold ${props.isDark ? 'text-white' : 'text-black'}`}>{name}</h3>
      <SigCT2Gauge
        salesPercent={pct}
        salesAmount={formatSigLiveMoney(props.data.salesAmount as any)}
        planAmount={formatSigLiveMoney(props.data.planAmount as any)}
        targetPercent={props.data.targetPercent?.value}
        size={110}
        isDark={props.isDark}
      />
    </div>
  );

  const tableContent = (
    <div>
      <SigCT2StickyTable
        headers={DETAIL_HEADERS}
        rows={rows}
        isDark={props.isDark}
        onRowClick={(i) => props.children[i] && props.onDrillDown(props.children[i])}
      />
    </div>
  );

  if (props.deviceFamily === 'ipad') {
    return <>{gaugeContent}{tableContent}</>;
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{
        title: name,
        leadingLabel: props.canGoBack ? '\u2039 Back' : '\u2039 SigCT2'
      }}
      topContent={gaugeContent}
      topContentPlacement="fixed"
      sections={[]}
      bottomContent={tableContent}
      onLeadingAction={props.canGoBack ? props.onBack : props.onGoHome}
    />
  );
}
