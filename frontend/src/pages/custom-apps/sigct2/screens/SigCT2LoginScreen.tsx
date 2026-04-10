import type { SigCT2LoginScreenProps } from '../../../../types/custom-apps/sigct2';

export function SigCT2LoginScreen(props: SigCT2LoginScreenProps) {
  return (
    <div className={`relative flex h-full flex-col items-center justify-center bg-[#1d2021]${!props.showLogin ? ' sigct2-shimmer' : ''}`}>
      {/* App title */}
      <div className="relative z-10 mb-6 flex flex-col items-center">
        <h1 className="text-[24px] font-bold tracking-wide text-white drop-shadow-lg">
          SigCT2
        </h1>
        <p className="mt-1 text-[10px] text-white/50">Chairman&apos;s Terminal</p>
      </div>

      {/* Sign In button */}
      {props.showLogin && (
        <button
          onClick={props.onOAuthStart}
          disabled={props.isLoading}
          className="relative z-10 flex items-center gap-2 rounded-lg bg-white/15 px-6 py-2 text-[10px] font-semibold text-white shadow-md transition-transform active:scale-95 disabled:opacity-50"
        >
          {props.isLoading ? (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : null}
          Sign In
        </button>
      )}

      {/* Loading spinner */}
      {props.isLoading && (
        <div className="relative z-10 mt-4 flex items-center gap-2 text-[9px] text-white/60">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          {props.showLogin ? 'Authenticating...' : 'Loading...'}
        </div>
      )}

      <style>{`
        .sigct2-shimmer { overflow: hidden; }
        .sigct2-shimmer::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: -50%; width: 50%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 60%, transparent 100%);
          animation: sigct2-shimmer-move 3s ease-in-out infinite;
        }
        @keyframes sigct2-shimmer-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
