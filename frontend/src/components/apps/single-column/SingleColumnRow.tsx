import type { SingleColumnRowProps } from '../../../types/legacy-components';

export function SingleColumnRow(props: SingleColumnRowProps) {
  return (
    <article className="flex justify-between items-start p-3 border-b border-white/10 last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-white">{props.label}</span>
          {props.unread && <span className="w-2 h-2 bg-ios-green rounded-full" />}
        </div>
        {props.sublabel && <div className="text-sm text-white/70">{props.sublabel}</div>}
        {props.detail && <div className="text-sm text-white/60 mt-1">{props.detail}</div>}
      </div>
      {props.timestamp && <div className="text-xs text-white/50">{props.timestamp}</div>}
    </article>
  );
}