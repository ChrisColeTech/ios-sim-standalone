import { LuChevronLeft } from 'react-icons/lu';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_GRAY, SIGLIVE_DETAIL_HEADERS } from '../../../../constants/custom-apps/sigct-banner';
import { SigCTGauge } from '../components/SigCTGauge';
import { SigCTStickyTable } from '../components/SigCTStickyTable';
import { formatSigLiveMoney, salesPercent } from '../../../../utils/sigct/format';
import type { SigCTSigLiveDatum } from '../../../../types/custom-apps/sigct-banner';

type SigCTSigLiveDetailScreenProps = {
  datum: SigCTSigLiveDatum;
  children: SigCTSigLiveDatum[];
  isDark: boolean;
  onDrillDown: (child: SigCTSigLiveDatum) => void;
  onBack: () => void;
};

export function SigCTSigLiveDetailScreen(props: SigCTSigLiveDetailScreenProps) {
  const name = props.datum.entity?.name ?? 'Detail';
  const pct = salesPercent(props.datum);

  const rows = props.children.map(c => [
    c.entity?.name ?? '',
    `${salesPercent(c).toFixed(1)}%`,
    formatSigLiveMoney(c.salesAmount),
    formatSigLiveMoney(c.planAmount)
  ]);

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_GRAY }}>
      <div className="flex h-[28px] shrink-0 items-center justify-between px-2" style={{ backgroundColor: SIGCT_NAV_BLUE }}>
        <button onClick={props.onBack} className="flex items-center gap-0.5 text-white/80 hover:text-white">
          <LuChevronLeft className="h-3 w-3" />
          <span className="text-[9px]">Back</span>
        </button>
        <span className="text-[10px] font-semibold text-white">{name}</span>
        <div className="w-10" />
      </div>

      <div className="shrink-0 py-3">
        <h3 className="mb-1 text-center text-[10px] font-semibold text-white">{name}</h3>
        <SigCTGauge
          salesPercent={pct}
          salesAmount={formatSigLiveMoney(props.datum.salesAmount)}
          planAmount={formatSigLiveMoney(props.datum.planAmount)}
          targetPercent={props.datum.targetPercent?.value}
          size={110}
          isDark
        />
      </div>

      <SigCTStickyTable
        headers={SIGLIVE_DETAIL_HEADERS}
        rows={rows}
        isDark
        onRowClick={(i) => props.children[i] && props.onDrillDown(props.children[i])}
      />
    </div>
  );
}
