import { useState } from 'react';
import type { LayoutListSection } from '../types/layouts';

const TOGGLE_ROWS = new Set(['airplane', 'vpn']);

export function useSettingsToggles() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    airplane: false,
    vpn: false
  });

  function toggle(id: string) {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function isOn(id: string) {
    return toggles[id] ?? false;
  }

  function patchSections(sections: LayoutListSection[]): LayoutListSection[] {
    return sections.map((section) => ({
      ...section,
      rows: section.rows.map((row) =>
        TOGGLE_ROWS.has(row.id)
          ? { ...row, subtitle: toggles[row.id] ? 'On' : 'Off' }
          : row
      )
    }));
  }

  return { isOn, toggle, patchSections };
}
