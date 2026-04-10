import { LuChevronLeft, LuChevronRight, LuRefreshCw } from 'react-icons/lu';
import { SCONNECT_THEME, SCONNECT_ASSETS } from '../../../../constants/custom-apps/sconnect-home';
import type { SConnectGoToUrlScreenProps } from '../../../../types/custom-apps/sconnect-home';

export function SConnectGoToUrlScreen(props: SConnectGoToUrlScreenProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const navText = props.isDark ? 'text-black' : 'text-white';
  const navTextDisabled = props.isDark ? 'text-black/30' : 'text-white/30';
  const pageBg = props.isDark ? SCONNECT_THEME.pageBgDark : SCONNECT_THEME.pageBgLight;
  const pageText = props.isDark ? 'text-white' : 'text-black';

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: pageBg }}>
      {/* URL toolbar */}
      <div className="flex items-center gap-1.5 px-2 py-1" style={{ backgroundColor: navBg }}>
        <div className="flex min-w-0 flex-1 items-center rounded bg-black/15 px-2 py-0.5">
          <input
            type="text"
            placeholder="Enter URL"
            className={`w-full bg-transparent text-[8px] outline-none ${navText} placeholder:opacity-50`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = e.currentTarget.value.trim();
                if (val) {
                  const url = val.startsWith('http') ? val : `http://${val}`;
                  props.onNavigate(url);
                }
              }
            }}
          />
        </div>
        <button className={navTextDisabled} disabled><LuChevronLeft className="h-3 w-3" /></button>
        <button className={navTextDisabled} disabled><LuChevronRight className="h-3 w-3" /></button>
        <button className={navTextDisabled} disabled><LuRefreshCw className="h-2.5 w-2.5" /></button>
      </div>

      {/* Blank home page */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 opacity-30">
        <img src={SCONNECT_ASSETS.largeLogo} alt="SConnect" className="h-[40px] object-contain" />
        <p className={`text-[8px] ${pageText}`}>Enter a URL to get started</p>
      </div>
    </div>
  );
}
