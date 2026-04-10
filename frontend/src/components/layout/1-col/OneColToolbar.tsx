import { ChevronLeft } from 'lucide-react';
import { OneColActionButton } from './OneColActionButton';
import type { OneColToolbarProps } from '../../../types/layout-components';

export function OneColToolbar(props: OneColToolbarProps) {
  const isDark = props.theme === 'dark';
  const pillBtn = `flex appearance-none items-center justify-center rounded-full border-0 p-0 transition-colors cursor-pointer ${isDark ? 'bg-white/15 text-white/80 hover:bg-white/25' : 'bg-black/8 text-ios-gray hover:bg-black/15'}`;
  const size = props.compact ? 'h-5 w-5' : 'h-7 w-7';
  const showBack = !!props.onLeadingAction;

  return (
    <header className={`relative flex items-center justify-between ${props.compact ? 'min-h-6 gap-1.5 px-2' : 'min-h-7 gap-2 px-3'}`}>
      <div className="relative z-10">
        {showBack ? (
          <button
            className={`${pillBtn} ${size}`}
            onClick={props.onLeadingAction}
            type="button"
            title={props.toolbar.leadingLabel ?? 'Back'}
          >
            <ChevronLeft size={props.compact ? 14 : 16} strokeWidth={1.5} />
          </button>
        ) : (
          <div className={size} />
        )}
      </div>
      <h1 className={`pointer-events-none absolute inset-x-0 text-center font-semibold tracking-tight ${isDark ? 'text-white' : 'text-black'} ${props.compact ? 'text-[13px]' : 'text-[15px]'}`}>
        {props.toolbar.title}
      </h1>
      <div className={`relative z-10 flex items-center ${props.compact ? 'gap-1' : 'gap-1.5'}`}>
        {props.toolbar.actions?.map((action) => (
          <OneColActionButton key={action.id} action={action} compact={props.compact} theme={props.theme} onAction={props.onToolbarAction} />
        ))}
      </div>
    </header>
  );
}
