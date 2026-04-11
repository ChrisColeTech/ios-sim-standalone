import { LuChevronLeft, LuChevronRight, LuShare, LuGrid2X2, LuRotateCw, LuX } from 'react-icons/lu';
import { SafariBrowserLayout } from '../../../../components/layout/safari/SafariBrowserLayout';
import { SIGCT_NAV_BLUE } from '../../../../constants/custom-apps/sigct-banner';
import { getHostname } from '../../../../utils/sigct/format';
import type { SigCTOAuthScreenProps } from '../../../../types/custom-apps/sigct-banner';

export function SigCTOAuthScreen(props: SigCTOAuthScreenProps) {
  const mutedClass = props.isDark ? 'text-white/50' : 'text-black/45';
  const btnClass = `flex h-5 w-5 items-center justify-center border-0 bg-transparent p-0 ${props.isDark ? 'text-white' : 'text-black'}`;
  const barClass = props.isDark
    ? 'bg-ios-surface/85 ring-1 ring-white/15 backdrop-blur-xl'
    : 'bg-white/85 ring-1 ring-black/10 shadow-lg backdrop-blur-xl';

  const addressBar = (
    <>
      <button
        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-0 p-0 ${props.isDark ? 'bg-white/12 text-white hover:bg-white/18' : 'bg-black/5 text-black hover:bg-black/10'}`}
        onClick={props.onCancel}
        type="button"
      >
        <LuChevronLeft className="h-2 w-2" />
      </button>

      <svg className={`h-2 w-2 shrink-0 ${mutedClass}`} viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a4 4 0 00-4 4v3H3a1 1 0 00-1 1v5a2 2 0 002 2h8a2 2 0 002-2V9a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm-2 4a2 2 0 114 0v3H6V5z" />
      </svg>

      <span className={`flex-1 text-center text-[8px] ${props.isDark ? 'text-white' : 'text-black'}`}>
        {getHostname(props.currentUrl)}
      </span>

      <button
        className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-0 p-0 ${props.isDark ? 'bg-white/15 text-white/60' : 'bg-black/8 text-black/45'}`}
        onClick={props.isLoading ? undefined : props.reload}
        type="button"
      >
        {props.isLoading ? <LuX className="h-1.5 w-1.5" /> : <LuRotateCw className="h-1.5 w-1.5" />}
      </button>
    </>
  );

  const floatingBar = (
    <div className={`flex items-center justify-center gap-3 rounded-full px-2 py-0.5 ${barClass}`}>
      <button className={btnClass} onClick={props.goBack} type="button"><LuChevronLeft className="h-3 w-3" /></button>
      <button className={btnClass} onClick={props.goForward} type="button"><LuChevronRight className="h-3 w-3" /></button>
      <button className={btnClass} type="button"><LuShare className="h-3 w-3" /></button>
      <button className={btnClass} type="button"><LuGrid2X2 className="h-3 w-3" /></button>
    </div>
  );

  return (
    <SafariBrowserLayout
      theme={props.isDark ? 'dark' : 'light'}
      addressBarContent={addressBar}
      floatingBar={floatingBar}
    >
      {props.isLoading && (
        <div className="h-[2px] w-full overflow-hidden" style={{ backgroundColor: SIGCT_NAV_BLUE + '30' }}>
          <div className="h-full animate-pulse" style={{ backgroundColor: SIGCT_NAV_BLUE, width: '40%' }} />
        </div>
      )}
      <webview
        ref={props.webviewRef}
        src={props.authUrl}
        partition="persist:simulator"
        className="h-full w-full"
      />
    </SafariBrowserLayout>
  );
}
