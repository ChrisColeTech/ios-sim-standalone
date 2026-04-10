import { LuChevronLeft } from 'react-icons/lu';
import { SIGCT_NAV_BLUE } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTPlaceholderScreenProps } from '../../../../types/custom-apps/sigct-banner';
import appIcon from '../../../../assets/images/sigct-banner/app-icon.png';

export function SigCTPlaceholderScreen(props: SigCTPlaceholderScreenProps) {
  const pageBg = props.isDark ? '#000' : '#f2f2f7';

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: pageBg }}>
      {/* Nav bar */}
      <div className="flex h-[28px] shrink-0 items-center justify-between px-2" style={{ backgroundColor: SIGCT_NAV_BLUE }}>
        <button
          onClick={props.onBack}
          className="flex items-center gap-0.5 text-white/80 hover:text-white"
        >
          <LuChevronLeft className="h-3 w-3" />
          <span className="text-[9px]">Back</span>
        </button>
        <span className="text-[10px] font-semibold text-white">{props.title}</span>
        <div className="w-10" />
      </div>

      {/* Coming soon content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <img src={appIcon} alt="" className="h-12 w-12 rounded-2xl opacity-30" />
        <span className={`text-[10px] font-medium ${props.isDark ? 'text-white/40' : 'text-black/30'}`}>
          {props.title}
        </span>
        <span className={`text-[8px] ${props.isDark ? 'text-white/25' : 'text-black/20'}`}>
          Coming Soon
        </span>
      </div>
    </div>
  );
}
