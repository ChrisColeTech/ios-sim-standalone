import { useCallback, useMemo, useState } from 'react';
import {
  MESSAGES_CATEGORY_LABEL_BY_ID,
  MESSAGES_THREADS_BY_CATEGORY,
  MESSAGES_THREAD_DETAIL_BY_ID
} from '../constants/apps/messages-layout';

export function useMessagesPageState() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all-messages');
  const middleSections = MESSAGES_THREADS_BY_CATEGORY[selectedCategoryId] ?? MESSAGES_THREADS_BY_CATEGORY['all-messages'];
  const firstThreadId = middleSections[0]?.rows[0]?.id ?? null;
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(firstThreadId);

  const handleCategorySelect = useCallback((categoryId: string) => {
    const nextSections = MESSAGES_THREADS_BY_CATEGORY[categoryId] ?? MESSAGES_THREADS_BY_CATEGORY['all-messages'];
    const nextFirstThreadId = nextSections[0]?.rows[0]?.id ?? null;
    setSelectedCategoryId(categoryId);
    setSelectedThreadId(nextFirstThreadId);
  }, []);

  const selectedThread = useMemo(
    () => middleSections.flatMap((section) => section.rows).find((row) => row.id === selectedThreadId) ?? middleSections[0]?.rows[0],
    [middleSections, selectedThreadId]
  );

  const selectedThreadDetail = selectedThread ? MESSAGES_THREAD_DETAIL_BY_ID[selectedThread.id] : null;
  const categoryLabel = MESSAGES_CATEGORY_LABEL_BY_ID[selectedCategoryId] ?? MESSAGES_CATEGORY_LABEL_BY_ID['all-messages'];

  return {
    selectedCategoryId,
    setSelectedCategoryId: handleCategorySelect,
    middleSections,
    selectedThreadId,
    setSelectedThreadId,
    selectedThread,
    selectedThreadDetail,
    categoryLabel
  };
}
