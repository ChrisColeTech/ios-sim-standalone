import { LuRefreshCw } from 'react-icons/lu';
import { OneColLayout } from '../../../../components/layout';

import { SigCTGauge } from '../components/SigCTGauge';
import { formatSigLiveMoney, salesPercent } from '../../../../utils/sigct/format';
import type { SigCTSigLiveDatum, SigCTSigLivePollingDatum } from '../../../../types/custom-apps/sigct-banner';
import type { LayoutAction } from '../../../../types/layouts';

type SigCTSigLiveScreenProps = {
  data: SigCTSigLiveDatum[];
  polling: SigCTSigLivePollingDatum[];
  title: string;
  isLoading: boolean;
  isDark: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onDrillDown: (datum: SigCTSigLiveDatum) => void;
  onBack: () => void;
  onRefresh: () => void;
  onGoHome: () => void;
};

const TOOLBAR_ACTIONS: LayoutAction[] = [
  { id: 'refresh', label: 'Refresh', icon: <LuRefreshCw className="h-2.5 w-2.5" /> }
];

export function SigCTSigLiveScreen(props: SigCTSigLiveScreenProps) {
  const pollingContent = props.polling.length > 0 ? (
    <div className="text-center">
      {props.polling.map((p, i) => (
        <div key={i} className={`text-[7px] ${props.isDark ? 'text-white' : 'text-black'}`}>
          {p.supportCenterText ?? p.supportCenter} Last Polled {p.lastPolled?.displayValue ?? p.lastPolled?.internalValue ?? ''}
        </div>
      ))}
    </div>
  ) : null;

  const gaugeCards = (
    <div className="space-y-4 px-1">
      {props.isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className={`h-4 w-4 animate-spin rounded-full border-2 ${props.isDark ? 'border-white/30 border-t-white' : 'border-black/20 border-t-black'}`} />
        </div>
      )}
      {props.data.map((datum, i) => {
        const name = datum.entity?.name ?? `Entity ${i}`;
        const pct = salesPercent(datum);
        return (
          <div
            key={datum.entity?.key?.id ?? i}
            className={`cursor-pointer rounded-xl p-3 ${props.isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/3 hover:bg-black/5'}`}
            onClick={() => props.onDrillDown(datum)}
          >
            <h3 className={`mb-1 text-center text-[10px] font-semibold ${props.isDark ? 'text-white' : 'text-black'}`}>{name}</h3>
            <SigCTGauge
              salesPercent={pct}
              salesAmount={formatSigLiveMoney(datum.salesAmount)}
              planAmount={formatSigLiveMoney(datum.planAmount)}
              targetPercent={datum.targetPercent?.value}
              size={110}
              isDark={props.isDark}
            />
          </div>
        );
      })}
      {!props.isLoading && props.data.length === 0 && (
        <div className={`py-8 text-center text-[9px] ${props.isDark ? 'text-white/40' : 'text-black/30'}`}>
          No SigLive data available
        </div>
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
          title: 'SigLive',
          leadingLabel: props.canGoBack ? '‹ Back' : '‹ SigCT',
          actions: TOOLBAR_ACTIONS
        }}
        topContent={pollingContent}
        topContentPlacement="fixed"
        sections={[]}
        bottomContent={gaugeCards}
        onLeadingAction={props.canGoBack ? props.onBack : props.onGoHome}
        onToolbarAction={(id) => { if (id === 'refresh') props.onRefresh(); }}
      />
    </>
  );
}
