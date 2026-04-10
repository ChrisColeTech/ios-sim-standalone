import { Check } from 'lucide-react';
import { SCONNECT_THEME } from '../../../../constants/custom-apps/sconnect-home';
import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import type { SConnectAdminScreenProps } from '../../../../types/custom-apps/sconnect-home';
import type { IOSTableSection } from '../../../../types/ui-components';

export function SConnectAdminScreen(props: SConnectAdminScreenProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const pageBg = props.isDark ? SCONNECT_THEME.pageBgDark : SCONNECT_THEME.pageBgLight;

  const title = props.isDsc
    ? 'Select a Banner and Shop Number'
    : 'Select a Banner and Store Number';

  const bannerDisplay = props.banner
    ? props.banner.charAt(0).toUpperCase() + props.banner.slice(1)
    : 'Select a Banner';

  const sections: IOSTableSection[] = [
    {
      id: 'admin',
      rows: [
        {
          id: 'banner',
          label: 'Banner',
          detail: bannerDisplay,
          accessory: 'disclosure',
          onTap: props.onBannerTap,
        },
        {
          id: 'location',
          label: props.isDsc ? 'Shop / Location' : 'Store / Location',
          detail: props.storeDisplayText,
          accessory: 'disclosure',
          onTap: props.onLocationTap,
        },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: pageBg }}>
      <IOSNavigationBar
        title={title}
        isDark={props.isDark}
        navBg={navBg}
        actions={[{ icon: <Check size={12} strokeWidth={1.5} />, onTap: props.onSave, label: 'Save' }]}
      />
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={props.isDark} />
      </div>
    </div>
  );
}
