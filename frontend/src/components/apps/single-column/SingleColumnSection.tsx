import type { SingleColumnSectionProps } from '../../../types/legacy-components';

export function SingleColumnSection(props: SingleColumnSectionProps) {
  return (
    <section className="rounded-2xl bg-white/5 p-4">
      {props.header && <h2 className="text-sm font-bold text-white uppercase mb-2">{props.header}</h2>}
      <div className="space-y-1">{props.children}</div>
    </section>
  );
}