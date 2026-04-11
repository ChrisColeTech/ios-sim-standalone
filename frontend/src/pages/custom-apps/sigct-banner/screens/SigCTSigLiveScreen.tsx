import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTSigLiveDatum } from '../../../../types/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  data: SigCTSigLiveDatum[];
  title: string;
  isLoading: boolean;
  canGoBack: boolean;
  isDark: boolean;
  onDrillDown: (datum: SigCTSigLiveDatum) => void;
  onBack: () => void;
  onClose: () => void;
};

export function SigCTSigLiveScreen(props: Props) {
  const sections: IOSTableSection[] = [
    {
      id: 'siglive',
      header: props.title || 'SigLive',
      rows: props.data.length > 0
        ? props.data.map((d, i) => ({
            id: `sl-${i}`,
            label: d.entity?.name ?? 'Unknown',
            detail: d.salesAmount?.valueAsMoneyNoCents ?? '$0',
            accessory: 'disclosure' as const,
            onTap: () => props.onDrillDown(d),
          }))
        : [{ id: 'empty', label: props.isLoading ? 'Loading...' : 'No data available' }],
    },
  ];

  return (
    <div className="flex h-full flex-col bg-[#e5e5dc]">
      <IOSNavigationBar
        title={props.title || 'SigLive'}
        isDark={false}
        navBg={SIGCT_NAV_BLUE}
        onBack={props.canGoBack ? props.onBack : props.onClose}
      />
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={false} />
      </div>
    </div>
  );
}
