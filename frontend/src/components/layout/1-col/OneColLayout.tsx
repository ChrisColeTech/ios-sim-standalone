import { OneColSearch } from './OneColSearch';
import { OneColSection } from './OneColSection';
import { OneColToolbar } from './OneColToolbar';
import type { OneColLayoutProps } from '../../../types/layouts';

export function OneColLayout(props: OneColLayoutProps) {
  const isCompact = props.isLandscape || props.deviceFamily === 'ipad';
  const isDark = props.theme === 'dark';
  const isMedia = props.variant === 'media';
  const topContentPlacement = props.topContentPlacement ?? 'scroll';
  const contentPaddingBottomClass = props.footer ? (isCompact ? 'pb-1' : 'pb-2') : isCompact ? 'pb-4' : 'pb-5';
  const floatingBarInsetClass = props.floatingBar ? (isCompact ? 'pb-12' : 'pb-14') : '';

  return (
    <section className={`relative flex h-full min-h-0 flex-col ${isDark ? 'bg-ios-gray-dark text-white' : 'bg-ios-gray-light text-black'}`}>
      <OneColToolbar
        toolbar={props.toolbar}
        compact={isCompact}
        theme={props.theme}
        onLeadingAction={props.onLeadingAction}
        onToolbarAction={props.onToolbarAction}
      />
      {props.searchPlaceholder ? <OneColSearch placeholder={props.searchPlaceholder} compact={isCompact} theme={props.theme} /> : null}
      {props.topContent && topContentPlacement === 'fixed' ? <div className={isMedia ? 'px-3 pb-1' : 'px-3 pb-2'}>{props.topContent}</div> : null}
      <div className={`flex-1 space-y-2 overflow-auto ${contentPaddingBottomClass} ${floatingBarInsetClass}`}>
        {props.topContent && topContentPlacement === 'scroll' ? <div className={isMedia ? 'px-3 pb-1' : 'px-3'}>{props.topContent}</div> : null}
        {props.sections.map((section) => (
          <OneColSection
            key={section.id}
            section={section}
            compact={isCompact}
            theme={props.theme}
            colorOverrides={props.colorOverrides}
            selectedRowId={props.selectedRowId}
            renderRowLeading={props.renderRowLeading}
            renderRowTrailing={props.renderRowTrailing}
            onRowSelect={props.onRowSelect}
          />
        ))}
        {props.bottomContent ? <div className={isMedia ? 'px-3 pt-1' : 'px-3'}>{props.bottomContent}</div> : null}
      </div>
      {props.footer ? (
        <div
          className={`shrink-0 border-t px-4 backdrop-blur-sm ${isDark ? 'border-white/10 bg-ios-surface/80' : 'border-black/10 bg-white/90'} ${isCompact ? 'pb-3 pt-1.5' : 'pb-5 pt-2'}`}
        >
          {props.footer}
        </div>
      ) : null}
      {props.floatingBar ? <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center px-3"><div className="pointer-events-auto w-full max-w-2xl">{props.floatingBar}</div></div> : null}
    </section>
  );
}
