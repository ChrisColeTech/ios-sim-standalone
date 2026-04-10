import type { BottomBarProps } from '../../types/layout-components';

export function BottomBar(props: BottomBarProps) {
  return (
    <div
      className="absolute bottom-2 left-1/2 z-30 flex h-8 w-40 -translate-x-1/2 cursor-pointer items-end justify-center"
      onClick={() => props.onClose?.()}
    >
      <div className="h-1.5 w-28 rounded-full bg-white/95 shadow-[0_1px_0_rgba(255,255,255,0.5),0_3px_10px_rgba(0,0,0,0.35)] mix-blend-difference" />
    </div>
  );
}
