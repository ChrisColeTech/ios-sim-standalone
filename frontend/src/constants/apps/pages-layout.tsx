import { LuCopy, LuEllipsis, LuList, LuPaintbrush, LuPenLine, LuSquare, LuTrash2, LuUndo2 } from 'react-icons/lu';
import type { LayoutAction, LayoutListSection, TwoColSidebarConfig } from '../../types/layouts';

export const PAGES_TEMPLATE_CATEGORIES: TwoColSidebarConfig = {
  sections: [
    {
      id: 'template-categories',
      rows: [
        { id: 'all', title: 'All Templates' },
        { id: 'basic', title: 'Basic' },
        { id: 'reports', title: 'Reports' },
        { id: 'certificates', title: 'Certificates' },
        { id: 'flyers', title: 'Flyers & Posters' },
        { id: 'letters', title: 'Letters' },
        { id: 'books', title: 'Books' },
        { id: 'miscellaneous', title: 'Miscellaneous' }
      ]
    }
  ]
};

export const PAGES_TEMPLATES = [
  { id: 'pt-1', title: 'Blank', subtitle: 'Start Fresh' },
  { id: 'pt-2', title: 'Blank Landscape', subtitle: 'Wide Format' },
  { id: 'pt-3', title: 'Essay', subtitle: 'Academic' },
  { id: 'pt-4', title: 'Report', subtitle: 'Business' },
  { id: 'pt-5', title: 'Visual Report', subtitle: 'Infographic' },
  { id: 'pt-6', title: 'Newsletter', subtitle: 'Publication' },
  { id: 'pt-7', title: 'Flyer', subtitle: 'Poster' },
  { id: 'pt-8', title: 'Certificate', subtitle: 'Award' }
];

export const PAGES_DOCUMENT_PAGES = [
  { id: 'page-1', label: '1' },
  { id: 'page-2', label: '2' },
  { id: 'page-3', label: '3' },
  { id: 'page-4', label: '4' },
  { id: 'page-5', label: '5' },
  { id: 'page-6', label: '6' },
  { id: 'page-7', label: '7' },
  { id: 'page-8', label: '8' }
];

export const PAGES_DOCUMENT_TITLE = 'Woodcrafts.pages';

export const PAGES_IPHONE_SECTIONS: LayoutListSection[] = [
  {
    id: 'pages-menu',
    rows: [
      { id: 'recents', title: 'Recents' },
      { id: 'browse', title: 'Browse' },
      { id: 'shared', title: 'Shared' },
      { id: 'starred', title: 'Starred' }
    ]
  }
];

export const PAGES_GALLERY_ITEMS = [
  { id: 'pg-1', title: 'Blank', subtitle: 'Template' },
  { id: 'pg-2', title: 'Essay', subtitle: 'Template' },
  { id: 'pg-3', title: 'Report', subtitle: 'Template' }
];

export const PAGES_RECENT_ITEMS = [
  { id: 'pr-1', title: 'Workshop Guide', subtitle: 'Edited today' },
  { id: 'pr-2', title: 'Meeting Notes', subtitle: 'Edited yesterday' },
  { id: 'pr-3', title: 'Project Brief', subtitle: 'Edited last week' }
];

export const PAGES_TOOLBAR_ACTIONS: LayoutAction[] = [
  { id: 'list', label: 'List', icon: <LuList className="h-2.5 w-2.5" /> },
  { id: 'insert', label: 'Insert', icon: <LuSquare className="h-2.5 w-2.5" /> },
  { id: 'copy', label: 'Copy', icon: <LuCopy className="h-2.5 w-2.5" /> },
  { id: 'draw', label: 'Draw', icon: <LuPenLine className="h-2.5 w-2.5" /> },
  { id: 'format', label: 'Format', icon: <LuPaintbrush className="h-2.5 w-2.5" /> },
  { id: 'delete', label: 'Delete', icon: <LuTrash2 className="h-2.5 w-2.5" /> },
  { id: 'undo', label: 'Undo', icon: <LuUndo2 className="h-2.5 w-2.5" /> },
  { id: 'more', label: 'More', icon: <LuEllipsis className="h-2.5 w-2.5" /> }
];
