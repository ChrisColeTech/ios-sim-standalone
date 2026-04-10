import type { SConnectLoginFormScreenProps } from '../../../../types/custom-apps/sconnect-home';
import { SCONNECT_ASSETS } from '../../../../constants/custom-apps/sconnect-home';
import { useSConnectLoginForm } from '../../../../hooks/useSConnectLoginForm';
import { IOSAlert } from '../../../../components/ui/IOSAlert';

export function SConnectLoginFormScreen(props: SConnectLoginFormScreenProps) {
  const form = useSConnectLoginForm(props.onLogin);

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${SCONNECT_ASSETS.sconnectBg})` }}
    >
      {/* Logo */}
      <div className="relative mb-2 w-[25vw]">
        <img src={SCONNECT_ASSETS.largeLogo} alt="SConnect" className="w-full object-contain drop-shadow-lg" />
      </div>

      <h1 className="mb-4 text-[14px] font-bold tracking-wide text-white drop-shadow-md">
        SCONNECT
      </h1>

      {/* Login form */}
      <div className="flex flex-col items-center gap-2">
        <input
          ref={form.inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter Your Employee ID"
          defaultValue={props.savedUsername ?? ''}
          onInput={form.handleInput}
          onKeyDown={form.handleKeyDown}
          className="w-[180px] rounded border border-white/40 bg-white/20 px-3 py-1.5 text-center text-[10px] text-white placeholder-white/50 outline-none backdrop-blur-sm focus:border-white/60"
          autoFocus
        />

        <button
          onClick={form.handleSubmit}
          disabled={props.isLoading}
          className="flex w-[180px] items-center justify-center gap-2 rounded bg-white/25 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/35 disabled:opacity-50"
        >
          {props.isLoading ? (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : 'Login'}
        </button>
      </div>

      {form.validationError && (
        <p className="mt-2 text-[8px] font-medium text-red-400">{form.validationError}</p>
      )}

      {props.error && (
        <button
          className="mt-3 border-0 bg-transparent p-0 text-[8px] font-medium text-red-400"
          onClick={form.openErrorModal}
          type="button"
        >
          Error occured. Tap for details.
        </button>
      )}

      <IOSAlert
        open={form.showErrorModal && !!props.error}
        title="Login Error"
        message={props.error ?? undefined}
        onClose={form.closeErrorModal}
      />

    </div>
  );
}
