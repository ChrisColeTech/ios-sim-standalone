import { GridPage } from './GridPage';
import { HomeDock } from './HomeDock';
import type { HomeScreenProps } from '../../types/components';

export function HomeScreen(props: HomeScreenProps) {
  return (
    <section className="flex flex-col h-full">
      <GridPage
        page={props.pages[props.currentPage]}
        currentPage={props.currentPage}
        pageCount={props.pageCount}
        isLandscape={false}
        pageTransitionDirection={1}
        onOpenApp={props.onOpenApp}
        iconSize={52}
        gap={12}
      />
      <HomeDock edge="bottom" items={props.dockItems} iconSize={52} dockSize={72} gap={8} padding={8} onOpenApp={props.onOpenApp} />
    </section>
  );
}
