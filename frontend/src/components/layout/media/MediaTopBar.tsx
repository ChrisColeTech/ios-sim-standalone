import { LuSearch } from 'react-icons/lu';
import type { MediaTopBarProps } from '../../../types/layout-components';

export function MediaTopBar(props: MediaTopBarProps) {
  const isDark = props.theme === 'dark';

  return (
    <>
      {props.tabs.map((tab) => {
        const active = tab.id === props.activeTabId;
        const isSearch = tab.id === 'search';
        return (
          <button
            key={tab.id}
            className={`rounded-full px-2 py-0.5 p-0 text-[8px] font-medium border-0 bg-transparent ${active ? (isDark ? 'bg-white/15 text-white' : 'bg-ios-gray-light text-black') : isDark ? 'text-white/50 hover:text-white/80' : 'text-ios-gray hover:text-black'}`}
            onClick={() => props.onTabSelect?.(tab.id)}
            type="button"
          >
            {isSearch ? <LuSearch className="h-2.5 w-2.5" /> : tab.label}
          </button>
        );
      })}
    </>
  );
}
