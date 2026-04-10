import type { EditingLayoutConfig } from '../../types/layout-data';
import type { EditingToolItem } from '../../types/layouts';

export const EDITING_COMMON_TOOLS: EditingToolItem[] = [
  { id: 'insert', label: 'Insert' },
  { id: 'media', label: 'Media' },
  { id: 'draw', label: 'Draw' },
  { id: 'comment', label: 'Comment' },
  { id: 'format', label: 'Format' }
];

export const KEYNOTE_EDITING_SIDEBAR = ['1', '2', '3', '4', '5', '6', '7'];
export const PAGES_EDITING_SIDEBAR = ['Blank', 'Simple', 'Report', 'Brochure'];
export const IMOVIE_EDITING_SIDEBAR = ['Clip 1', 'Clip 2', 'Clip 3', 'Clip 4'];

export function getEditingLayoutConfig(appId: string): EditingLayoutConfig {
  if (appId === 'keynote') {
    return {
      title: 'Carter Surf Shop',
      sidebar: KEYNOTE_EDITING_SIDEBAR,
      panel: 'Generate New Slides'
    };
  }

  if (appId === 'imovie') {
    return {
      title: 'Coastal Hike',
      sidebar: IMOVIE_EDITING_SIDEBAR,
      panel: 'Filters'
    };
  }

  return {
    title: 'Choose a Template',
    sidebar: PAGES_EDITING_SIDEBAR,
    panel: appId === 'garageband' ? 'Sound Library' : 'Template Browser'
  };
}
