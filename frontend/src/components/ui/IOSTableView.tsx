import { ChevronRight, Check } from 'lucide-react';
import type { IOSTableViewProps } from '../../types/ui-components';

export function IOSTableView({ sections, isDark }: IOSTableViewProps) {
  const sectionBg = isDark ? 'bg-ios-surface/90' : 'bg-white/92';
  const headerColor = 'text-ios-gray';
  const titleColor = isDark ? 'text-white' : 'text-black';
  const detailColor = 'text-ios-gray';
  const borderClass = isDark ? 'border-white/10' : 'border-black/10';
  const hoverClass = isDark ? 'hover:bg-white/7' : 'hover:bg-black/5';

  return (
    <div className="space-y-2 px-2 pb-5 pt-2">
      {sections.map((section) => (
        <section
          key={section.id}
          className={`overflow-hidden rounded-lg backdrop-blur-sm ${sectionBg}`}
        >
          {section.header && (
            <h2 className={`px-2 pt-1 text-[8px] font-semibold uppercase tracking-wide ${headerColor}`}>
              {section.header}
            </h2>
          )}
          <div className="py-0.5">
            {section.rows.map((row) => {
              const interactive = !!row.onTap;

              return (
                <div
                  key={row.id}
                  className={`flex w-full items-center gap-1 border-b px-2 py-1 last:border-b-0 ${borderClass} ${
                    interactive ? `cursor-pointer ${hoverClass}` : ''
                  }`}
                  onClick={row.onTap}
                  role={interactive ? 'button' : undefined}
                  tabIndex={interactive ? 0 : undefined}
                >
                  {row.render ? (
                    <div className="min-w-0 flex-1">{row.render}</div>
                  ) : (
                    <>
                      <span className={`min-w-0 flex-1 whitespace-nowrap text-[10px] ${titleColor}`}>
                        {row.label}
                      </span>
                      {row.detail && (
                        <span className={`whitespace-nowrap text-[8px] ${detailColor}`}>
                          {row.detail}
                        </span>
                      )}
                    </>
                  )}
                  {row.selected && (
                    <Check size={12} className={`shrink-0 ${titleColor}`} />
                  )}
                  {row.accessory === 'disclosure' && (
                    <ChevronRight
                      size={12}
                      className={`shrink-0 ${isDark ? 'text-white/35' : 'text-black/35'}`}
                    />
                  )}
                  {row.accessory === 'checkmark' && (
                    <Check size={12} className={`shrink-0 ${titleColor}`} />
                  )}
                </div>
              );
            })}
          </div>
          {section.footer && (
            <p className={`px-2 pb-1 text-[7px] ${headerColor}`}>{section.footer}</p>
          )}
        </section>
      ))}
    </div>
  );
}
