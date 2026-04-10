import { useState } from 'react';
import { NOTES_THREE_COL_DETAIL, NOTES_THREE_COL_DETAIL_BY_NOTE } from '../constants/apps/notes-layout';

export function useNotesPageState() {
  const [selectedPrimaryRowId, setSelectedPrimaryRowId] = useState('p-notes');
  const [selectedMiddleRowId, setSelectedMiddleRowId] = useState('m-1');
  const selectedDetail = NOTES_THREE_COL_DETAIL_BY_NOTE[selectedMiddleRowId] ?? NOTES_THREE_COL_DETAIL;

  return {
    selectedPrimaryRowId,
    setSelectedPrimaryRowId,
    selectedMiddleRowId,
    setSelectedMiddleRowId,
    selectedDetail
  };
}
