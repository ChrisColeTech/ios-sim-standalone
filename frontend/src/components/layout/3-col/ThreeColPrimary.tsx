import { TwoColSidebar } from '../2-col/TwoColSidebar';
import type { ThreeColPrimarySidebarProps } from '../../../types/layout-components';

export function ThreeColPrimary(props: ThreeColPrimarySidebarProps) {
  return (
    <TwoColSidebar
      theme={props.theme}
      sidebar={{ sections: props.primary.sections }}
      renderRowLeading={props.renderRowLeading}
      renderRowTrailing={props.renderRowTrailing}
      selectedRowId={props.selectedRowId}
      onSelect={props.onSelect}
      onToggleCollapse={props.onToggleCollapse}
    />
  );
}
