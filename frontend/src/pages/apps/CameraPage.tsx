import { CameraCaptureLayout } from '../../components/apps-layout/camera';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { CAMERA_DEFAULT_MODE } from '../../constants/apps/camera-layout';
import type { CameraPageProps } from '../../types/app-pages';

export function CameraPage(props: CameraPageProps) {
  return (
    <AppPageShell
      backgroundClassName="bg-black"
    >
      <CameraCaptureLayout theme={props.theme} modeLabel={CAMERA_DEFAULT_MODE} />
    </AppPageShell>
  );
}
