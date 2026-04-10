import { OneColSection } from '../1-col/OneColSection';
import type { ThreeColDetailPaneProps } from '../../../types/layout-components';

export function ThreeColDetail(props: ThreeColDetailPaneProps) {
  if (props.detail.content) {
    return <div className="h-full w-full overflow-auto">{props.detail.content}</div>;
  }

  return (
    <div className="h-full w-full space-y-2 overflow-auto p-2">
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
