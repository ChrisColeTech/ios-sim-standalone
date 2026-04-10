import { TwoColLayout } from '../layout';
import { AppPageShell } from '../layout/shared/AppPageShell';
import { PAGES_TEMPLATE_CATEGORIES, PAGES_TEMPLATES } from '../../constants/apps/pages-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { PagesTemplatePickerProps } from '../../types/app-pages';

export function PagesTemplatePicker(props: PagesTemplatePickerProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('all');
  const cardClass = props.isDark
    ? 'rounded-lg border border-white/15 backdrop-blur-xl overflow-hidden'
    : 'rounded-lg bg-white/95 shadow-sm shadow-black/5 overflow-hidden';

  return (
    <AppPageShell backgroundClassName={props.isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}>
      <TwoColLayout
        theme={props.theme}
        toolbarTitle="Choose a Template"
        sidebar={PAGES_TEMPLATE_CATEGORIES}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
        detail={{
          content: (
            <div className={`h-full overflow-auto px-3 pt-1 pb-3 ${props.isDark ? 'text-white' : 'text-black'}`}>
              <div className="grid grid-cols-3 gap-1.5">
                {PAGES_TEMPLATES.map((t) => (
                  <button key={t.id} className={`${cardClass} border-0 p-0 text-left`} onClick={props.onSelect} type="button">
                    <div className="aspect-[3/4] bg-white/5" />
                    <div className="p-1">
                      <p className={`text-[7px] font-medium ${props.isDark ? 'text-white' : 'text-black'}`}>{t.title}</p>
                      <p className={`text-[6px] ${props.isDark ? 'text-white/50' : 'text-black/45'}`}>{t.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        }}
      />
    </AppPageShell>
  );
}
