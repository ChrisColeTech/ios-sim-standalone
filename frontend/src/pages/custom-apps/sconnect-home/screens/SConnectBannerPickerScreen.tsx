import { SCONNECT_THEME } from '../../../../constants/custom-apps/sconnect-home';
import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import type { SConnectBannerPickerScreenProps } from '../../../../types/custom-apps/sconnect-home';
import type { IOSTableSection } from '../../../../types/ui-components';

export function SConnectBannerPickerScreen(props: SConnectBannerPickerScreenProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const pageBg = props.isDark ? SCONNECT_THEME.pageBgDark : SCONNECT_THEME.pageBgLight;

  const sections: IOSTableSection[] = [
    {
      id: 'banners',
      header: 'Select a Banner',
      rows: props.adminBannerDetails.map((abd) => ({
        id: abd.name,
        label: abd.name.charAt(0).toUpperCase() + abd.name.slice(1),
        selected: props.banner?.toLowerCase() === abd.name.toLowerCase(),
        onTap: () => {
          props.onBannerChange(abd.name);
          props.onBack();
        },
      })),
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: pageBg }}>
      <IOSNavigationBar
        title="Banner"
        isDark={props.isDark}
        navBg={navBg}
        onBack={props.onBack}
      />
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={props.isDark} />
      </div>
    </div>
  );
}
