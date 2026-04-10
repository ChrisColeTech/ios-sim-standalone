import {
  Check,
  ChevronLeft,
  Copy,
  Ellipsis,
  Filter,
  Grid2X2,
  List,
  ListFilter,
  PaintBucket,
  Paintbrush,
  PenLine,
  Play,
  Plus,
  Redo2,
  RefreshCw,
  Search,
  Share,
  Square,
  SquarePen,
  Trash2,
  Type,
  Undo2,
} from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Maps well-known toolbar action IDs to their Lucide icons.
 * Layout button components use this as a fallback when no explicit
 * `icon` prop is provided on the LayoutAction.
 *
 * This lets `.ts` constant files define actions without JSX:
 *   { id: 'edit', label: 'Edit' }
 * and the icon resolves automatically at render time.
 */
const ICON_SIZE = 14;
const STROKE = 1.5;

export const TOOLBAR_ICON_REGISTRY: Record<string, ReactNode> = {
  'edit': <SquarePen size={ICON_SIZE} strokeWidth={STROKE} />,
  'compose': <SquarePen size={ICON_SIZE} strokeWidth={STROKE} />,
  'new': <SquarePen size={ICON_SIZE} strokeWidth={STROKE} />,
  'new-note': <SquarePen size={ICON_SIZE} strokeWidth={STROKE} />,
  'new-message': <SquarePen size={ICON_SIZE} strokeWidth={STROKE} />,
  'search': <Search size={ICON_SIZE} strokeWidth={STROKE} />,
  'filter': <Filter size={ICON_SIZE} strokeWidth={STROKE} />,
  'sort': <ListFilter size={ICON_SIZE} strokeWidth={STROKE} />,
  'select': <Check size={ICON_SIZE} strokeWidth={STROKE} />,
  'more': <Ellipsis size={ICON_SIZE} strokeWidth={STROKE} />,
  'details': <Ellipsis size={ICON_SIZE} strokeWidth={STROKE} />,
  'share': <Share size={ICON_SIZE} strokeWidth={STROKE} />,
  'add': <Plus size={ICON_SIZE} strokeWidth={STROKE} />,
  'delete': <Trash2 size={ICON_SIZE} strokeWidth={STROKE} />,
  'undo': <Undo2 size={ICON_SIZE} strokeWidth={STROKE} />,
  'redo': <Redo2 size={ICON_SIZE} strokeWidth={STROKE} />,
  'format': <Type size={ICON_SIZE} strokeWidth={STROKE} />,
  'checklist': <List size={ICON_SIZE} strokeWidth={STROKE} />,
  'table': <Grid2X2 size={ICON_SIZE} strokeWidth={STROKE} />,
  'markup': <PenLine size={ICON_SIZE} strokeWidth={STROKE} />,
  'draw': <PenLine size={ICON_SIZE} strokeWidth={STROKE} />,
  'insert': <Square size={ICON_SIZE} strokeWidth={STROKE} />,
  'play': <Play size={ICON_SIZE} strokeWidth={STROKE} />,
  'copy': <Copy size={ICON_SIZE} strokeWidth={STROKE} />,
  'refresh': <RefreshCw size={ICON_SIZE} strokeWidth={STROKE} />,
  'paint': <Paintbrush size={ICON_SIZE} strokeWidth={STROKE} />,
  'fill': <PaintBucket size={ICON_SIZE} strokeWidth={STROKE} />,
  'back': <ChevronLeft size={ICON_SIZE} strokeWidth={STROKE} />,
};

/** Resolve the icon for a toolbar action: explicit icon > registry > null */
export function resolveActionIcon(action: { id: string; icon?: ReactNode }): ReactNode | null {
  return action.icon ?? TOOLBAR_ICON_REGISTRY[action.id] ?? null;
}
