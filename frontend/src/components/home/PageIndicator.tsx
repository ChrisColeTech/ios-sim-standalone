import type { PageIndicatorProps } from '../../types/layout-components';

export function PageIndicator(props: PageIndicatorProps) {
  return (
    <div className={props.className ?? 'flex justify-center gap-2'}>
      {Array.from({ length: props.pageCount }).map((_, index) => (
        <span
          key={`home-page-dot-${index}`}
          className={`h-2 w-2 rounded-full ${index === props.currentPage ? 'bg-white/90' : 'bg-white/35'}`}
        />
      ))}
    </div>
  );
}
