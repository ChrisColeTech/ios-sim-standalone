import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTStoreDetail } from '../../../../types/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  detail: SigCTStoreDetail | null;
  isLoading: boolean;
  isDark: boolean;
  onBack: () => void;
};

export function SigCTStoreDetailScreen(props: Props) {
  const d = props.detail;

  const sections: IOSTableSection[] = d
    ? [
        {
          id: 'info',
          header: d.name || 'Store Detail',
          rows: [
            d.address && { id: 'addr', label: 'Address', detail: `${d.address}${d.address2 ? `, ${d.address2}` : ''}` },
            d.city && { id: 'city', label: 'City', detail: `${d.city}, ${d.state} ${d.postalCode}` },
            d.phone && { id: 'phone', label: 'Phone', detail: d.phone },
            d.banner && { id: 'banner', label: 'Banner', detail: d.banner },
            d.division && { id: 'div', label: 'Division', detail: d.division },
            d.region && { id: 'region', label: 'Region', detail: d.region },
            d.district && { id: 'district', label: 'District', detail: d.district },
            d.managerName && { id: 'mgr', label: 'Manager', detail: d.managerName },
            d.dscNo && { id: 'dsc', label: 'D&SC', detail: d.dscNo },
            d.openDate && { id: 'open', label: 'Open Date', detail: d.openDate },
          ].filter(Boolean) as IOSTableSection['rows'],
        },
      ]
    : [{ id: 'loading', rows: [{ id: 'loading', label: props.isLoading ? 'Loading...' : 'No store data' }] }];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title={d?.name ?? 'Store Detail'}
        isDark={false}
        navBg={SIGCT_NAV_BLUE}
        onBack={props.onBack}
      />
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={false} />
      </div>
    </div>
  );
}
