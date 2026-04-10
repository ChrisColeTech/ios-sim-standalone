import { LuRotateCw } from 'react-icons/lu';
import { useSafariAddressBar } from '../../hooks/useSafariAddressBar';
import { getHostname } from '../../utils/safari';
import type { SafariAddressBarProps } from '../../types/safari';

export function SafariAddressBar(props: SafariAddressBarProps) {
  const { editing, inputValue, setInputValue, startEditing, cancelEditing, submitUrl } = useSafariAddressBar(props.url, props.onNavigate);
  const mutedClass = props.isDark ? 'text-white/50' : 'text-black/45';
  const isNewTab = !props.url;

  if (editing) {
    return (
      <input
        autoFocus
        className={`w-full border-0 bg-transparent text-center text-[8px] outline-none ${props.isDark ? 'text-white placeholder:text-white/40' : 'text-black placeholder:text-black/35'}`}
        value={inputValue}
        placeholder="Search or enter website"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submitUrl();
          else if (e.key === 'Escape') cancelEditing();
        }}
        onBlur={cancelEditing}
      />
    );
  }

  return (
    <>
      {!isNewTab && (
        <svg className={`h-2 w-2 shrink-0 ${mutedClass}`} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a4 4 0 00-4 4v3H3a1 1 0 00-1 1v5a2 2 0 002 2h8a2 2 0 002-2V9a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm-2 4a2 2 0 114 0v3H6V5z" />
        </svg>
      )}
      <button
        className={`flex-1 border-0 bg-transparent p-0 text-center text-[8px] ${isNewTab ? mutedClass : (props.isDark ? 'text-white' : 'text-black')}`}
        onClick={startEditing}
        type="button"
      >
        {isNewTab ? 'Search or enter website' : getHostname(props.url)}
      </button>
      {!isNewTab && (
        <button
          className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-0 p-0 ${props.isDark ? 'bg-white/15 text-white/60' : 'bg-black/8 text-black/45'}`}
          onClick={props.onReload}
          type="button"
        >
          <LuRotateCw className="h-1.5 w-1.5" />
        </button>
      )}
    </>
  );
}
