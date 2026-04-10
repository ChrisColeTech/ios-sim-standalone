import { MapCanvasLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { getMapLayoutContent, getMapScene, isFindMyLayout } from '../../constants/apps/map-layout';
import type { MapsPageProps } from '../../types/app-pages';

export function MapsPage(props: MapsPageProps) {
  const isFindMy = isFindMyLayout(props.appId);
  const content = getMapLayoutContent(props.appId);
  const scene = getMapScene(props.appId);

  return (
    <AppPageShell
      backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <MapCanvasLayout theme={props.theme} title={content.title} subtitle={content.subtitle} showInfoCard={isFindMy} scene={scene} />
    </AppPageShell>
  );
}
