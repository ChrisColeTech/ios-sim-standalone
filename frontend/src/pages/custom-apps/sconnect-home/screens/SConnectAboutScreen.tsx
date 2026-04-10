import { X } from 'lucide-react';
import { SCONNECT_ASSETS, SCONNECT_THEME } from '../../../../constants/custom-apps/sconnect-home';
import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import type { SConnectAboutScreenProps } from '../../../../types/custom-apps/sconnect-home';
import type { IOSTableSection } from '../../../../types/ui-components';

export function SConnectAboutScreen(props: SConnectAboutScreenProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const pageBg = props.isDark ? SCONNECT_THEME.pageBgDark : SCONNECT_THEME.pageBgLight;

  const sections: IOSTableSection[] = [
    {
      id: 'info',
      rows: props.rows.map((row) => ({
        id: row.label,
        label: row.label,
        detail: row.value,
      })),
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: pageBg }}>
      <IOSNavigationBar
        title="About"
        isDark={props.isDark}
        navBg={navBg}
        actions={[{ icon: <X size={12} strokeWidth={1.5} />, onTap: props.onClose, label: 'Close' }]}
      />

      {/* Logo */}
      <div className="flex flex-col items-center py-3">
        <div className="sconnect-shimmer relative h-[50px] w-[80px]">
          <img src={SCONNECT_ASSETS.largeLogo} alt="SConnect" className="h-full w-full object-contain drop-shadow-md" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={props.isDark} />
      </div>

      <style>{`
        .sconnect-shimmer { overflow: hidden; }
        .sconnect-shimmer::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          animation: sconnect-shimmer-move 2s ease-in-out infinite;
        }
        @keyframes sconnect-shimmer-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
