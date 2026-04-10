import { IoPause, IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import type { OneColPlaybackBarProps } from '../../../types/layout-components';

export function OneColPlaybackBar(props: OneColPlaybackBarProps) {
  const isDark = props.theme === 'dark';

  return (
    <div className={`flex items-center gap-2 rounded-xl px-2 py-1.5 shadow-lg backdrop-blur-xl ring-1 ${isDark ? 'bg-ios-surface/85 text-white ring-white/15' : 'bg-ios-gray-light/90 text-black ring-black/10'}`}>
      <span className={`h-7 w-7 shrink-0 rounded ${isDark ? 'bg-ios-surface-elevated' : 'bg-ios-separator-light'}`} />
      <div className="min-w-0 flex-1">
        <p className="whitespace-nowrap text-[10px] font-medium">{props.title}</p>
        <p className="whitespace-nowrap text-[8px] text-ios-gray">{props.artist}</p>
      </div>
      <div className="flex items-center gap-0.5">
        <button className={`flex h-5 w-5 appearance-none items-center justify-center rounded-full border-0 ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`} type="button" aria-label="Previous">
          <IoPlaySkipBack className="h-2.5 w-2.5" />
        </button>
        <button className={`flex h-5 w-5 appearance-none items-center justify-center rounded-full border-0 ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`} type="button" aria-label="Pause">
          <IoPause className="h-2.5 w-2.5" />
        </button>
        <button className={`flex h-5 w-5 appearance-none items-center justify-center rounded-full border-0 ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`} type="button" aria-label="Next">
          <IoPlaySkipForward className="h-2.5 w-2.5" />
        </button>
      </div>
    </div>
  );
}
