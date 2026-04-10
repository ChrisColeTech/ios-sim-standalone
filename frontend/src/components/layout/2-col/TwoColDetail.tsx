import type { TwoColDetailProps } from '../../../types/layout-components';
import { OneColSection } from '../1-col/OneColSection';

export function TwoColDetail(props: TwoColDetailProps) {
  const isImmersive = props.presentation === 'immersive';

  if (props.detail.content) {
    return <div className="h-full w-full overflow-auto">{props.detail.content}</div>;
  }

  return (
    <div className={`h-full w-full overflow-auto ${isImmersive ? '' : 'space-y-2 p-2'}`}>
      {props.detail.topContent}
      {props.detail.sections?.map((section) => (
        <OneColSection
          key={section.id}
          section={section}
          compact
          theme={props.theme}
          renderRowLeading={props.renderRowLeading}
          renderRowTrailing={props.renderRowTrailing}
          onRowSelect={props.onRowSelect}
        />
      ))}
    </div>
  );
}
