import { SCONNECT_ASSETS } from '../../../../constants/custom-apps/sconnect-home';
import type { SConnectLoginScreenProps } from '../../../../types/custom-apps/sconnect-home';

export function SConnectLoginScreen(props: SConnectLoginScreenProps) {
  return (
    <div
      className="sconnect-shimmer relative flex h-full flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${SCONNECT_ASSETS.sconnectBg})` }}
    >
      <div className="relative mb-6 flex flex-col items-center">
        <div className="relative w-[25vw]">
          <img
            src={SCONNECT_ASSETS.largeLogo}
            alt="SConnect"
            className="w-full object-contain drop-shadow-lg"
          />
        </div>
        <h1 className="mt-3 text-[18px] font-bold tracking-wide text-white drop-shadow-md">
          SCONNECT
        </h1>
      </div>

      {props.isLoading && (
        <div className="mt-4 flex items-center gap-2 text-[10px] text-white/70">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Logging in...
        </div>
      )}

      <style>{`
        .sconnect-shimmer { overflow: hidden; }
        .sconnect-shimmer::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: -50%; width: 50%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 60%, transparent 100%);
          animation: sconnect-shimmer-move 3s ease-in-out infinite;
        }
        @keyframes sconnect-shimmer-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
