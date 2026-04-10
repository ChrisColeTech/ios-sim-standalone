import { useState } from 'react';

export function useSelectionState(defaultId: string) {
  const [selectedRowId, setSelectedRowId] = useState(defaultId);
  return { selectedRowId, setSelectedRowId };
}
