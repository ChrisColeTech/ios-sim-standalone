import type { SConnectHelpScreenProps } from '../../../../types/custom-apps/sconnect-home';
import { SCONNECT_HELP_PAGES } from '../../../../constants/custom-apps/sconnect-home';

export function SConnectHelpScreen(props: SConnectHelpScreenProps) {
  const bg = props.isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light';

  return (
    <div className={`flex-1 overflow-auto ${bg}`}>
      <div className="flex flex-col items-center gap-1 p-2">
        {SCONNECT_HELP_PAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Help page ${i + 1}`}
            className="w-full object-contain shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}
