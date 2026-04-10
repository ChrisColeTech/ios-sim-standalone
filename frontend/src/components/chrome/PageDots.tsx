import type { PageDotsProps } from '../../types/components';

export function PageDots(props: PageDotsProps) {
  return (
    <div className="flex justify-center gap-1.125 py-3">
      {Array.from({ length: props.pageCount }).map((_, index) => (
        <span
          key={`page-dot-${index}`}
          className={`h-2 w-2 rounded-full ${
            index === props.currentPage ? 'bg-white/88' : 'bg-white/28'
          }`}
        />
      ))}
    </div>
  );
}