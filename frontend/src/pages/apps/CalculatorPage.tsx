import { CalculatorLayout } from '../../components/apps-layout/calculator';
import { TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { CALCULATOR_BASIC_BUTTONS, CALCULATOR_DEFAULT_VALUE, CALCULATOR_HISTORY_SIDEBAR } from '../../constants/apps/calculator-layout';
import type { CalculatorPageProps } from '../../types/app-pages';

export function CalculatorPage(props: CalculatorPageProps) {
  const isIpad = props.deviceFamily === 'ipad';
  const isDark = props.theme === 'dark';

  return (
    <AppPageShell backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'} statusBarForceTextColor={isDark ? 'white' : 'black'}>
      {isIpad ? (
        <TwoColLayout
          theme={props.theme}
          presentation="immersive"
          sidebar={CALCULATOR_HISTORY_SIDEBAR}
          detail={{
            toolbarActions: [{ id: 'edit', label: 'Edit' }],
            sections: [],
            content: (
              <CalculatorLayout theme={props.theme} value={CALCULATOR_DEFAULT_VALUE} mode="basic" buttons={CALCULATOR_BASIC_BUTTONS} />
            )
          }}
          renderSidebarRow={(row) => (
            <div className="py-0.5">
              <div className={`text-[8px] ${isDark ? 'text-white/45' : 'text-ios-gray'}`}>{row.subtitle}</div>
              <div className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-black'}`}>{row.title}</div>
            </div>
          )}
          selectedSidebarRowId={CALCULATOR_HISTORY_SIDEBAR.sections[0]?.rows[0]?.id ?? null}
          onSidebarSelect={() => {}}
        />
      ) : (
        <CalculatorLayout
          theme={props.theme}
          value={CALCULATOR_DEFAULT_VALUE}
          mode="basic"
          buttons={CALCULATOR_BASIC_BUTTONS}
        />
      )}
    </AppPageShell>
  );
}
