import type { SearchInputProps } from '../../../types/layout-components';

export function SearchInput(props: SearchInputProps) {
  const isDark = props.theme === 'dark';

  return (
    <div className={props.wrapperClassName ?? 'px-1 pb-1'}>
      <input
        className={`w-full rounded px-1.5 py-0.5 text-[9px] focus:outline-none ${isDark ? 'bg-white/10 text-white placeholder:text-ios-gray' : 'bg-black/5 text-black placeholder:text-ios-gray'}`}
        placeholder={props.placeholder}
        type="text"
      />
    </div>
  );
}
