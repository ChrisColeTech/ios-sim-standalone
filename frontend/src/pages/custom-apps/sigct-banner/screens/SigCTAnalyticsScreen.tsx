import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTSale, SigCTSalesType } from '../../../../types/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  data: SigCTSale[];
  title: string;
  salesType: SigCTSalesType;
  isLoading: boolean;
  canGoBack: boolean;
  isDark: boolean;
  onDrillDown: (sale: SigCTSale) => void;
  onBack: () => void;
  onClose: () => void;
};

function formatMoney(val?: number): string {
  if (val == null) return '$0';
  return val < 0 ? `-$${Math.abs(val).toLocaleString()}` : `$${val.toLocaleString()}`;
}

export function SigCTAnalyticsScreen(props: Props) {
  const sections: IOSTableSection[] = [
    {
      id: 'sales',
      header: props.title || 'Analytics',
      rows: props.data.length > 0
        ? props.data.map((s, i) => ({
            id: `sale-${i}`,
            label: s.entity?.name ?? 'Unknown',
            detail: formatMoney(s.dayAmount?.value),
            accessory: 'disclosure' as const,
            onTap: () => props.onDrillDown(s),
          }))
        : [{ id: 'empty', label: props.isLoading ? 'Loading...' : 'No data available' }],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title={props.title || 'Analytics'}
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
