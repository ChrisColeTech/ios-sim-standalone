import { ChevronLeft } from 'lucide-react';
import { resolveActionIcon } from '../../../constants/toolbar-icons';
import type { SingleColumnToolbarProps } from '../../../types/legacy-components';

export function SingleColumnToolbar(props: SingleColumnToolbarProps) {
  return (
    <header className="flex items-center justify-between py-4 px-3">
      <button
        className="flex h-7 w-7 appearance-none items-center justify-center rounded-full border-0 p-0 bg-white/15 text-white/80 hover:bg-white/25 transition-colors cursor-pointer"
        onClick={props.onClose}
        type="button"
        title={props.backLabel ?? 'Back'}
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>
      <h1 className="text-lg font-semibold text-white">{props.title}</h1>
      <div className="flex gap-1.5">
        {props.actions?.map((action) => {
          const icon = resolveActionIcon(action);
          return (
            <button
              key={action.id}
              className="flex h-7 w-7 items-center justify-center rounded-full border-0 p-0 bg-white/15 text-white/80 hover:bg-white/25 transition-colors cursor-pointer"
              type="button"
              title={action.label}
            >
              {icon ?? <span className="text-[9px] font-medium">{action.label}</span>}
            </button>
          );
        })}
      </div>
    </header>
  );
}
