import { SIGCT_SIGNET_GRAY } from '../../../../constants/custom-apps/sigct-banner';
import type { SigCTLoginScreenProps } from '../../../../types/custom-apps/sigct-banner';
import darkWallpaper from '../../../../assets/images/sigct-banner/dark-wallpaper.png';
import signetLogoWhite from '../../../../assets/images/sigct-banner/signet-logo-white.png';

export function SigCTLoginScreen(props: SigCTLoginScreenProps) {
  return (
    <div className={`relative flex h-full flex-col items-center justify-center${!props.showLogin ? ' sigct-shimmer' : ''}`}>
      {/* Dark wallpaper background — matches LaunchScreen.storyboard */}
      <img
        src={darkWallpaper}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Signet logo — SignetLogoLoading (white version) */}
      <div className="relative z-10 mb-6 flex flex-col items-center">
        <img
          src={signetLogoWhite}
          alt="Signet Jewelers"
          className="w-[25vw] object-contain drop-shadow-lg"
        />
      </div>

      {/* Login button — only shown on oauth screen, not splash */}
      {props.showLogin && (
        <button
          onClick={props.onOAuthStart}
          disabled={props.isLoading}
          className="relative z-10 flex items-center gap-2 rounded-lg px-6 py-2 text-[10px] font-semibold text-white shadow-md transition-transform active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: SIGCT_SIGNET_GRAY }}
        >
          {props.isLoading ? (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : null}
          Sign in with Microsoft
        </button>
      )}

      {props.isLoading && (
        <div className="relative z-10 mt-4 flex items-center gap-2 text-[9px] text-white/60">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          {props.showLogin ? 'Authenticating...' : 'Loading...'}
        </div>
      )}

      <style>{`
        .sigct-shimmer { overflow: hidden; }
        .sigct-shimmer::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: -50%; width: 50%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 60%, transparent 100%);
          animation: sigct-shimmer-move 3s ease-in-out infinite;
        }
        @keyframes sigct-shimmer-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
