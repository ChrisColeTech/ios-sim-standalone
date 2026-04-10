import { LuChevronLeft, LuChevronRight, LuGrid2X2, LuShare, LuEllipsis, LuPlus } from 'react-icons/lu';
import type { SafariBottomBarProps } from '../../types/safari';

export function SafariBottomBar(props: SafariBottomBarProps) {
  const barClass = props.isDark
    ? 'bg-ios-surface/85 ring-1 ring-white/15 backdrop-blur-xl'
    : 'bg-white/85 ring-1 ring-black/10 shadow-lg backdrop-blur-xl';
  const btnClass = `flex h-5 w-5 items-center justify-center border-0 bg-transparent p-0 ${props.isDark ? 'text-white' : 'text-black'}`;

  return (
    <div className={`flex items-center justify-center gap-3 rounded-full px-2 py-0.5 ${barClass}`}>
      <button className={btnClass} onClick={props.onBack} type="button"><LuChevronLeft className="h-3 w-3" /></button>
      <button className={btnClass} onClick={props.onForward} type="button"><LuChevronRight className="h-3 w-3" /></button>
      <button className={btnClass} type="button"><LuShare className="h-3 w-3" /></button>
      <button className={btnClass} onClick={props.onNewTab} type="button"><LuPlus className="h-3 w-3" /></button>
      <button className={btnClass} type="button"><LuGrid2X2 className="h-3 w-3" /></button>
      <button className={btnClass} type="button"><LuEllipsis className="h-3 w-3" /></button>
    </div>
  );
}
