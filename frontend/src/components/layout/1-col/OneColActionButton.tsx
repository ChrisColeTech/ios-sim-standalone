import { resolveActionIcon } from '../../../constants/toolbar-icons';
import type { LayoutAction } from '../../../types/layouts';

export type OneColActionButtonProps = {
  action: LayoutAction;
  compact: boolean;
  theme: 'light' | 'dark';
  onAction?: (actionId: string) => void;
};

export function OneColActionButton(props: OneColActionButtonProps) {
  const isDark = props.theme === 'dark';
  const size = props.compact ? 'h-5 w-5' : 'h-7 w-7';
  const icon = resolveActionIcon(props.action);

  return (
    <button
      className={`flex ${size} appearance-none items-center justify-center rounded-full border-0 p-0 transition-colors cursor-pointer ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`}
      onClick={() => props.onAction?.(props.action.id)}
      type="button"
      title={props.action.label}
    >
      {icon ?? <span className={`${props.compact ? 'text-[8px]' : 'text-[9px]'} font-medium`}>{props.action.label}</span>}
    </button>
  );
}
