import { resolveActionIcon } from '../../../constants/toolbar-icons';
import type { TwoColToolbarButtonProps } from '../../../types/layout-components';

export function TwoColToolbarButton(props: TwoColToolbarButtonProps) {
  const isDark = props.theme === 'dark';
  const icon = resolveActionIcon(props.action);

  return (
    <button
      className={`flex h-7 w-7 appearance-none items-center justify-center rounded-full border-0 p-0 ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`}
      onClick={() => props.onAction?.(props.action.id)}
      type="button"
      title={props.action.label}
    >
      {icon}
    </button>
  );
}
