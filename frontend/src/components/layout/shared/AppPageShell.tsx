import { StatusBar } from '../../chrome/StatusBar';
import type { AppPageShellProps } from '../../../types/layout-components';

export function AppPageShell(props: AppPageShellProps) {
  return (
    <section className={`relative h-full overflow-hidden ${props.backgroundClassName ?? 'bg-ios-gray-light'}`}>
      <StatusBar forceTextColor={props.statusBarForceTextColor} />
      <div className="absolute inset-x-0 bottom-0 top-4">{props.children}</div>
    </section>
  );
}
