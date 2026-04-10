import type { ReactNode } from 'react';

export type SafariBrowserLayoutProps = {
  theme: 'light' | 'dark';
  addressBarContent: ReactNode;
  floatingBar: ReactNode;
  children: ReactNode;
};

export function SafariBrowserLayout(props: SafariBrowserLayoutProps) {
  const isDark = props.theme === 'dark';

  return (
    <section className={`relative flex h-full min-h-0 flex-col ${isDark ? 'bg-ios-gray-dark text-white' : 'bg-white text-black'}`}>
      {/* Toolbar — address bar */}
      <div className="flex h-5 shrink-0 items-center justify-center px-1">
        <div className={`flex w-full items-center gap-1 rounded-full px-2 py-0.5 ${isDark ? 'bg-ios-surface' : 'bg-ios-gray-light shadow-sm shadow-black/8'}`}>
          {props.addressBarContent}
        </div>
      </div>

      {/* Full-bleed content */}
      <div className="relative min-h-0 flex-1">
        {props.children}
        {/* Floating bottom bar */}
        <div className="pointer-events-none absolute inset-x-1 z-30 flex justify-center" style={{ bottom: 'calc(var(--safe-bottom) + 2rem)' }}>
          <div className="pointer-events-auto w-full">{props.floatingBar}</div>
        </div>
      </div>
    </section>
  );
}
