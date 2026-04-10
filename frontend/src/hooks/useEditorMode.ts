import { useState } from 'react';

export function useEditorMode() {
  const [mode, setMode] = useState<'picker' | 'workspace'>('picker');
  const openWorkspace = () => setMode('workspace');
  const openPicker = () => setMode('picker');
  return { mode, openWorkspace, openPicker };
}
