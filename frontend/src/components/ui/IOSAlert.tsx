import type { IOSAlertAction, IOSAlertProps } from '../../types/ui-components';

export function IOSAlert({ open, title, message, actions, onClose }: IOSAlertProps) {
  if (!open) return null;

  const resolvedActions: IOSAlertAction[] =
    actions && actions.length > 0 ? actions : [{ label: 'OK', onClick: onClose }];

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="mx-6 w-[220px] overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl">
        <div className="px-4 pb-2 pt-3 text-center">
          <p className="text-[11px] font-semibold text-black">{title}</p>
          {message && (
            <p className="mt-1 whitespace-pre-wrap text-[9px] leading-snug text-black/70">
              {message}
            </p>
          )}
        </div>
        <div className="border-t border-black/10">
          {resolvedActions.length === 1 ? (
            <button
              className="w-full border-0 bg-transparent py-2 text-[11px] font-medium text-black/90"
              onClick={resolvedActions[0].onClick}
              type="button"
            >
              {resolvedActions[0].label}
            </button>
          ) : (
            <div className="flex divide-x divide-black/10">
              {resolvedActions.map((action) => (
                <button
                  key={action.label}
                  className={`flex-1 border-0 bg-transparent py-2 text-[11px] font-medium ${
                    action.style === 'destructive'
                      ? 'text-ios-red'
                      : action.style === 'cancel'
                        ? 'font-semibold text-black/90'
                        : 'text-black/90'
                  }`}
                  onClick={action.onClick}
                  type="button"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
