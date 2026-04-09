import { useEffect, useState } from 'react';
import { TitleBarMenu } from './TitleBarMenu';
import { WindowControls } from './WindowControls';
import { useUiStoreState } from '../../store/uiStore';
import { isBrowser } from '../../services/runtime';
import simulatorIcon from '../../assets/images/simulator/app-icon.png';
import sconnectIcon from '../../assets/images/sconnect/app-icon.png';
import sigctIcon from '../../assets/images/sigct/app-icon.png';
import sigct2Icon from '../../assets/images/sigct2/app-icon.png';

import { GetStandaloneApp } from '../../services/electron';

const ICON_MAP: Record<string, string> = {
  sconnect: sconnectIcon,
  sigct: sigctIcon,
  'sigct banner': sigctIcon,
  sigct2: sigct2Icon,
  'sigct 2.0': sigct2Icon,
};

export function TitleBar() {
  const [icon, setIcon] = useState(simulatorIcon);
  const theme = useUiStoreState((s) => s.theme);
  const isDark = theme === 'dark';
  const isTransitioning = useUiStoreState((s) => s.isTransitioning);

  useEffect(() => {
    GetStandaloneApp().then((app: string) => {
      if (app && ICON_MAP[app]) setIcon(ICON_MAP[app]);
    });
  }, []);

  if (isTransitioning) {
    return <div style={{ height: isBrowser ? 30 : 38 }} />;
  }

  // Browser mode: slim menu bar, no icon, no window controls
  if (isBrowser) {
    return (
      <div
        className={`flex items-center w-full select-none border-b ${
          isDark
            ? 'bg-[#1C1C1E] border-white/10 text-white'
            : 'bg-[#f2f2f7] border-black/10 text-black'
        }`}
        style={{ height: 30 }}
      >
        <TitleBarMenu />
      </div>
    );
  }

  // Electron mode: full title bar with icon + window controls
  return (
    <div
      className={`wails-drag flex items-center justify-between w-full select-none  ${
        isDark
          ? 'bg-[#1C1C1E] border-white/10 text-white'
          : 'bg-[#f2f2f7] border-black/10 text-black'
      }`}
      style={{ height: 38 }}
    >
      <div className="wails-drag flex items-center h-full">
        <div className="wails-drag flex items-center px-3 h-full">
          <img src={icon} alt="" width={18} height={18} className="pointer-events-none" />
        </div>
        <TitleBarMenu />
      </div>

      <WindowControls />
    </div>
  );
}
