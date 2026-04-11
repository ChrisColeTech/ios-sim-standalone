import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import { SIGCT_NAV_BLUE, SIGCT_SIGNET_BEIGE } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTStoreLocation } from '../../../../types/custom-apps/sigct-banner';
import type { IOSTableSection } from '../../../../types/ui-components';

type Props = {
  locations: SigCTStoreLocation[];
  isLoading: boolean;
  isDark: boolean;
  title?: string;
  onSelect: (store: SigCTStoreLocation) => void;
  onBack: () => void;
};

export function SigCTStoreLocatorScreen(props: Props) {
  const sections: IOSTableSection[] = [
    {
      id: 'stores',
      header: `${props.locations.length} Locations`,
      rows: props.locations.length > 0
        ? props.locations.map((s, i) => ({
            id: `store-${i}`,
            label: s.storeName ?? s.storeNo ?? 'Unknown',
            detail: s.storeNo ? `#${s.storeNo}` : undefined,
            accessory: 'disclosure' as const,
            onTap: () => props.onSelect(s),
          }))
        : [{ id: 'empty', label: props.isLoading ? 'Loading...' : 'No stores found' }],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: SIGCT_SIGNET_BEIGE }}>
      <IOSNavigationBar
        title={props.title ?? 'Store Locator'}
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
