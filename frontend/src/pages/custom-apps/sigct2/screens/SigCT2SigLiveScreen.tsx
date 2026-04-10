import { LuRefreshCw } from 'react-icons/lu';
import { OneColLayout } from '../../../../components/layout';
import { SigCT2Gauge } from '../components/SigCT2Gauge';
import { SigCT2LoadingSpinner } from '../components/SigCT2LoadingSpinner';
import { formatSigLiveMoney, salesPercent } from '../../../../utils/sigct/format';
import type { SigCT2SigLiveDatum, SigCT2SigLivePollingDatum } from '../../../../types/custom-apps/sigct2';
import type { LayoutAction } from '../../../../types/layouts';

type SigCT2SigLiveScreenProps = {
  data: SigCT2SigLiveDatum[];
  polling: SigCT2SigLivePollingDatum[];
  title: string;
  isLoading: boolean;
  isDark: boolean;
  isLandscape: boolean;
  theme: 'light' | 'dark';
  deviceFamily: 'iphone' | 'ipad';
  canGoBack: boolean;
  onDrillDown: (datum: SigCT2SigLiveDatum) => void;
  onBack: () => void;
  onRefresh: () => void;
  onGoHome: () => void;
};

const TOOLBAR_ACTIONS: LayoutAction[] = [
  { id: 'refresh', label: 'Refresh', icon: <LuRefreshCw className="h-2.5 w-2.5" /> }
];

export function SigCT2SigLiveScreen(props: SigCT2SigLiveScreenProps) {
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
      {props.isLoading && <SigCT2LoadingSpinner isDark={props.isDark} />}
      {props.data.map((datum, i) => {
        const name = datum.entity?.name ?? `Entity ${i}`;
        const pct = salesPercent(datum as any);
        return (
          <div
            key={datum.entity?.key?.id ?? i}
            className={`cursor-pointer rounded-xl p-3 ${props.isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/3 hover:bg-black/5'}`}
            onClick={() => props.onDrillDown(datum)}
          >
            <h3 className={`mb-1 text-center text-[10px] font-semibold ${props.isDark ? 'text-white' : 'text-black'}`}>{name}</h3>
            <SigCT2Gauge
              salesPercent={pct}
              salesAmount={formatSigLiveMoney(datum.salesAmount as any)}
              planAmount={formatSigLiveMoney(datum.planAmount as any)}
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

  if (props.deviceFamily === 'ipad') {
    return <>{pollingContent}{gaugeCards}</>;
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{
        title: 'SigLive',
        leadingLabel: props.canGoBack ? '\u2039 Back' : '\u2039 SigCT2',
        actions: TOOLBAR_ACTIONS
      }}
      topContent={pollingContent}
      topContentPlacement="fixed"
      sections={[]}
      bottomContent={gaugeCards}
      onLeadingAction={props.canGoBack ? props.onBack : props.onGoHome}
      onToolbarAction={(id) => { if (id === 'refresh') props.onRefresh(); }}
    />
  );
}
