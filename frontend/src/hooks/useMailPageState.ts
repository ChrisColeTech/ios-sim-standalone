import { useCallback, useMemo, useState } from 'react';
import { MAIL_TWO_COL_DETAIL_BY_FOLDER } from '../constants/apps/mail-layout';

export function useMailPageState() {
  const [selectedFolderId, setSelectedFolderId] = useState('inbox');
  const folderDetail = MAIL_TWO_COL_DETAIL_BY_FOLDER[selectedFolderId] ?? MAIL_TWO_COL_DETAIL_BY_FOLDER.inbox;
  const folderSections = useMemo(() => folderDetail.sections ?? [], [folderDetail.sections]);
  const firstThreadId = folderSections[0]?.rows[0]?.id ?? null;
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(firstThreadId);

  const handleFolderSelect = useCallback((folderId: string) => {
    const detail = MAIL_TWO_COL_DETAIL_BY_FOLDER[folderId] ?? MAIL_TWO_COL_DETAIL_BY_FOLDER.inbox;
    const nextFirstThreadId = detail.sections?.[0]?.rows[0]?.id ?? null;
    setSelectedFolderId(folderId);
    setSelectedThreadId(nextFirstThreadId);
  }, []);

  const selectedThread = useMemo(
    () => folderSections.flatMap((section) => section.rows).find((row) => row.id === selectedThreadId) ?? folderSections[0]?.rows[0],
    [folderSections, selectedThreadId]
  );

  return {
    selectedFolderId,
    setSelectedFolderId: handleFolderSelect,
    folderDetail,
    folderSections,
    selectedThreadId,
    setSelectedThreadId,
    selectedThread
  };
}
