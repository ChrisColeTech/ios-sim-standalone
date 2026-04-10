import { Check } from 'lucide-react';
import { SCONNECT_THEME } from '../../../../constants/custom-apps/sconnect-home';
import { IOSNavigationBar } from '../../../../components/ui/IOSNavigationBar';
import { IOSTableView } from '../../../../components/ui/IOSTableView';
import type { SConnectLocationScreenProps } from '../../../../types/custom-apps/sconnect-home';
import type { IOSTableSection } from '../../../../types/ui-components';

export function SConnectLocationScreen(props: SConnectLocationScreenProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const pageBg = props.isDark ? SCONNECT_THEME.pageBgDark : SCONNECT_THEME.pageBgLight;
  const storeLabel = props.isDsc ? 'Shop' : 'Store';
  const textColor = props.isDark ? 'text-white' : 'text-black';

  const sections: IOSTableSection[] = [
    {
      id: 'location',
      rows: [
        {
          id: 'toggle',
          label: 'Choose Your Location',
          render: (
            <div className="flex items-center justify-between">
              <span className={`text-[9px] font-medium ${textColor}`}>
                Choose Your Location
              </span>
              <div className={`flex overflow-hidden rounded-md border ${props.isDark ? 'border-white/20' : 'border-black/15'}`}>
                <button
                  onClick={() => props.onLocationChange(false)}
                  className={`px-3 py-1 text-[8px] font-medium transition-colors ${
                    !props.isAtHome
                      ? props.isDark ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                      : props.isDark ? 'text-white/40' : 'text-black/40'
                  }`}
                  type="button"
                >
                  {storeLabel}
                </button>
                <button
                  onClick={() => props.onLocationChange(true)}
                  className={`px-3 py-1 text-[8px] font-medium transition-colors ${
                    props.isAtHome
                      ? props.isDark ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                      : props.isDark ? 'text-white/40' : 'text-black/40'
                  }`}
                  type="button"
                >
                  Home
                </button>
              </div>
            </div>
          ),
        },
        ...(!props.isAtHome
          ? [
              {
                id: 'store-number',
                label: `${storeLabel} Number`,
                render: (
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-medium ${textColor}`}>
                      {storeLabel} Number
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={props.storeNumber}
                      onInput={props.onInput}
                      placeholder="Enter number"
                      className={`w-[80px] border px-2 py-1 text-right text-[9px] outline-none ${
                        props.isDark
                          ? 'border-white/20 bg-white/10 text-white placeholder-white/30'
                          : 'border-black/10 bg-black/5 text-black placeholder-black/30'
                      }`}
                    />
                  </div>
                ),
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: pageBg }}>
      <IOSNavigationBar
        title="Location"
        isDark={props.isDark}
        navBg={navBg}
        onBack={props.onBack}
        actions={[{ icon: <Check size={12} strokeWidth={1.5} />, onTap: props.onSave, label: 'Save' }]}
      />
      <div className="flex-1 overflow-auto">
        <IOSTableView sections={sections} isDark={props.isDark} />
      </div>
    </div>
  );
}
