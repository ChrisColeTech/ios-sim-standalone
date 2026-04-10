import type { SingleColumnSearchProps } from '../../../types/legacy-components';

export function SingleColumnSearch(props: SingleColumnSearchProps) {
  return (
    <div className="px-4 py-2 mb-4 rounded-xl bg-white/10 backdrop-blur-lg">
      <input
        type="text"
        placeholder={props.placeholder}
        className="w-full bg-transparent text-white placeholder-white/50"
      />
    </div>
  );
}