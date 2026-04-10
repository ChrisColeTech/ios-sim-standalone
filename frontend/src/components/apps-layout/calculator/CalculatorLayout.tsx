import type { CalculatorLayoutProps } from '../../../types/layouts';

export function CalculatorLayout(props: CalculatorLayoutProps) {
  const isDark = props.theme === 'dark';
  const columns = props.mode === 'scientific' ? 'grid-cols-10' : 'grid-cols-5';

  return (
    <section className={`flex h-full min-h-0 flex-col px-2 pb-3 pt-2 ${isDark ? 'bg-transparent text-white' : 'bg-ios-gray-light text-black'}`}>
      <div className="flex flex-1 items-end justify-end pb-3 pr-1 text-7xl font-light">{props.value}</div>
      <div className={`grid gap-2 ${columns}`}>
        {props.buttons.map((button) => (
          <button
            key={button.id}
            className={`h-11 rounded-full text-lg ${button.variant === 'operator' ? 'bg-amber-500 text-white' : button.variant === 'function' ? (isDark ? 'bg-ios-surface-elevated text-white' : 'bg-ios-separator-light text-black') : isDark ? 'bg-ios-surface text-white' : 'bg-white text-black'}`}
            type="button"
          >
            {button.label}
          </button>
        ))}
      </div>
    </section>
  );
}
