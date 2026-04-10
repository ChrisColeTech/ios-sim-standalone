import type { ReactNode } from 'react';
import { SettingsSwitch } from '../../../components/ui/SettingsSwitch';
import type { LayoutListRow, TwoColDetailConfig } from '../../../types/layouts';
import { SETTINGS_TOGGLE_ROWS } from '../../../constants/apps/settings-toggle-rows';

export function renderSettingsSidebarTrailing(row: LayoutListRow, theme: 'light' | 'dark', isOn?: (id: string) => boolean, onToggle?: (id: string) => void): ReactNode {
  if (!SETTINGS_TOGGLE_ROWS.has(row.id)) {
    return undefined;
  }

  const on = isOn?.(row.id) ?? false;

  return <SettingsSwitch on={on} theme={theme} onToggle={() => onToggle?.(row.id)} />;
}

export function renderSettingsOneColLeading(_row: LayoutListRow, _sectionId: string, theme: 'light' | 'dark'): ReactNode {
  const isDark = theme === 'dark';

  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded text-[8px] backdrop-blur-sm ${isDark ? 'border border-white/20 bg-white/10 text-ios-gray' : 'border border-white/35 bg-white/55 text-black/45'}`}
      aria-hidden="true"
    />
  );
}

export function renderSettingsSidebarTopContent(theme: 'light' | 'dark'): ReactNode {
  const isDark = theme === 'dark';

  return (
    <section className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${isDark ? 'bg-ios-surface/90' : 'bg-white/92'}`}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-[9px] font-semibold text-white">
        DR
      </span>
      <span className="min-w-0 flex-1 overflow-visible">
        <span className={`block whitespace-nowrap text-[clamp(9px,8cqw,11px)] font-medium leading-snug ${isDark ? 'text-white' : 'text-black'}`}>Danny Rico</span>
        <span className={`block text-[clamp(7px,6cqw,9px)] leading-snug ${isDark ? 'text-ios-gray' : 'text-black/55'}`}>Apple Account, iCloud+, and more</span>
      </span>
    </section>
  );
}

export function withSettingsDetailHeaderIcon(detail: TwoColDetailConfig, theme: 'light' | 'dark'): TwoColDetailConfig {
  const isDark = theme === 'dark';

  return {
    ...detail,
    headerLeading: (
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-lg text-[8px] backdrop-blur-sm ${isDark ? 'border border-white/20 bg-white/10 text-ios-gray' : 'border border-white/35 bg-white/55 text-black/45'}`}
        aria-hidden="true"
      />
    )
  };
}
