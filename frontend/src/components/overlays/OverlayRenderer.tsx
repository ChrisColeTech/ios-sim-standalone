import { AppLibraryOverlay } from './AppLibraryOverlay';
import { AppSwitcherOverlay } from './AppSwitcherOverlay';
import { ContextMenuOverlay } from './ContextMenuOverlay';
import { ControlCenterOverlay } from './ControlCenterOverlay';
import { FolderOverlay } from './FolderOverlay';
import { NotificationCenterOverlay } from './NotificationCenterOverlay';
import { SpotlightOverlay } from './SpotlightOverlay';
import { TodayViewOverlay } from './TodayViewOverlay';
import type { OverlayType } from '../../types/overlays';

type Props = {
  overlay: Exclude<OverlayType, null>;
  onClose: () => void;
};

export function OverlayRenderer(props: Props) {
  if (props.overlay === 'control-center') {
    return <ControlCenterOverlay onClose={props.onClose} />;
  }

  if (props.overlay === 'notification-center') {
    return <NotificationCenterOverlay onClose={props.onClose} />;
  }

  if (props.overlay === 'spotlight') {
    return <SpotlightOverlay onClose={props.onClose} />;
  }

  if (props.overlay === 'today-view') {
    return <TodayViewOverlay onClose={props.onClose} />;
  }

  if (props.overlay === 'app-switcher') {
    return <AppSwitcherOverlay onClose={props.onClose} />;
  }

  if (props.overlay === 'app-library') {
    return <AppLibraryOverlay onClose={props.onClose} />;
  }

  if (props.overlay === 'context-menu') {
    return <ContextMenuOverlay onClose={props.onClose} />;
  }

  return <FolderOverlay onClose={props.onClose} />;
}
