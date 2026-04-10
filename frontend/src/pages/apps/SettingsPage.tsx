import { LuSearch } from 'react-icons/lu';
import { OneColLayout, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { SETTINGS_ONE_COL_CONFIG, SETTINGS_TWO_COL_DETAIL_BY_ROW, SETTINGS_TWO_COL_SIDEBAR } from '../../constants/apps/settings-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import { useSettingsToggles } from '../../hooks/useSettingsToggles';
import { renderSettingsOneColLeading, renderSettingsSidebarTopContent, renderSettingsSidebarTrailing } from './adapters/settingsTwoCol';
import type { SettingsPageProps } from '../../types/components';

export function SettingsPage(props: SettingsPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('general');
  const toggles = useSettingsToggles();
  const isDark = props.theme === 'dark';
  const isTwoColumn = props.deviceFamily === 'ipad';

  if (!isTwoColumn) {
    return (
      <AppPageShell
        backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={SETTINGS_ONE_COL_CONFIG.toolbar}
          searchPlaceholder={SETTINGS_ONE_COL_CONFIG.searchPlaceholder}
          topContent={renderSettingsSidebarTopContent(props.theme)}
          topContentPlacement="fixed"
          selectedRowId={selectedRowId}
          renderRowLeading={(row, sectionId) => renderSettingsOneColLeading(row, sectionId, props.theme)}
          renderRowTrailing={(row) => renderSettingsSidebarTrailing(row, props.theme, toggles.isOn, toggles.toggle)}
          sections={toggles.patchSections(SETTINGS_ONE_COL_CONFIG.sections)}
          onRowSelect={(_sectionId, rowId) => setSelectedRowId(rowId)}
        />
      </AppPageShell>
    );
  }

  return (
    <AppPageShell
      backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <TwoColLayout
        theme={props.theme}
        sidebar={SETTINGS_TWO_COL_SIDEBAR}
        toolbarLeading={
          <span className={`flex h-4 w-4 items-center justify-center rounded ${isDark ? 'border border-white/20 bg-white/10' : 'border border-white/35 bg-white/55'}`} aria-hidden="true" />
        }
        toolbarTitle={(SETTINGS_TWO_COL_DETAIL_BY_ROW[selectedRowId] ?? SETTINGS_TWO_COL_DETAIL_BY_ROW.general).title ?? 'Settings'}
        sidebarTopContent={renderSettingsSidebarTopContent(props.theme)}
        detail={{
          ...(SETTINGS_TWO_COL_DETAIL_BY_ROW[selectedRowId] ?? SETTINGS_TWO_COL_DETAIL_BY_ROW.general),
          title: undefined,
          headerLeading: undefined,
          toolbarActions: [{ id: 'search', label: 'Search', icon: <LuSearch className="h-2.5 w-2.5" /> }]
        }}
        renderSidebarRowTrailing={(row) => renderSettingsSidebarTrailing(row, props.theme, toggles.isOn, toggles.toggle)}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
      />
    </AppPageShell>
  );
}
