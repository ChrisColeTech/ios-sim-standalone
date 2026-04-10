import { useState } from 'react';
import { LuChevronLeft, LuChevronRight, LuStar, LuRefreshCw, LuX } from 'react-icons/lu';
import { SCONNECT_THEME } from '../../../../constants/custom-apps/sconnect-home';
import type { SConnectWebViewContentProps } from '../../../../types/custom-apps/sconnect-home';

export function SConnectWebViewScreen(props: SConnectWebViewContentProps) {
  const navBg = props.isDark ? SCONNECT_THEME.navBgDark : SCONNECT_THEME.navBgLight;
  const navText = props.isDark ? 'text-black' : 'text-white';
  const btnClass = `flex h-4 w-4 items-center justify-center ${navText}`;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const startEditing = () => {
    setDraft(props.currentUrl);
    setEditing(true);
  };

  const submitUrl = () => {
    setEditing(false);
    const val = draft.trim();
    if (val) {
      const url = val.startsWith('http') ? val : `http://${val}`;
      props.onNavigate(url);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-1.5 px-2 py-1" style={{ backgroundColor: navBg }}>
        <div
          className={`flex min-w-0 flex-1 items-center rounded px-2 py-0.5 ${props.isDark ? 'bg-black/10' : 'bg-white/15'}`}
          onClick={!editing ? startEditing : undefined}
        >
          {editing ? (
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submitUrl(); if (e.key === 'Escape') setEditing(false); }}
              onBlur={submitUrl}
              className={`w-full bg-transparent text-[7px] ${navText} outline-none`}
              autoFocus
            />
          ) : (
            <span className={`truncate text-[7px] ${navText} opacity-60`}>
              {props.displayUrl}
            </span>
          )}
        </div>

        <button onClick={props.onToggleFavorite} className={btnClass}>
          <LuStar className={`h-2.5 w-2.5 ${props.isFavorite ? 'fill-current' : ''}`} />
        </button>
        <button onClick={props.isLoading ? props.onStop : props.onReload} className={btnClass}>
          {props.isLoading ? <LuX className="h-2.5 w-2.5" /> : <LuRefreshCw className="h-2.5 w-2.5" />}
        </button>
        <button onClick={props.onGoBack} className={btnClass}>
          <LuChevronLeft className="h-3 w-3" />
        </button>
        <button onClick={props.onGoForward} className={btnClass}>
          <LuChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Webview */}
      <div className="flex-1 bg-white">
        <webview ref={props.webviewRef} src={props.url} className="h-full w-full" />
      </div>
    </div>
  );
}
