import { LuCopy, LuEllipsis, LuPaintbrush, LuPenLine, LuPlay, LuSquare, LuTrash2, LuUndo2 } from 'react-icons/lu';
import type { LayoutAction, LayoutListSection, TwoColSidebarConfig } from '../../types/layouts';

export const KEYNOTE_TEMPLATE_CATEGORIES: TwoColSidebarConfig = {
  sections: [
    {
      id: 'theme-categories',
      rows: [
        { id: 'all', title: 'All Themes' },
        { id: 'basic', title: 'Basic' },
        { id: 'minimal', title: 'Minimal' },
        { id: 'bold', title: 'Bold' },
        { id: 'editorial', title: 'Editorial' },
        { id: 'portfolio', title: 'Portfolio' },
        { id: 'business', title: 'Business' }
      ]
    }
  ]
};

export const KEYNOTE_TEMPLATES = [
  { id: 'kt-1', title: 'Basic White', subtitle: 'Clean & Simple' },
  { id: 'kt-2', title: 'Basic Black', subtitle: 'Dark Minimal' },
  { id: 'kt-3', title: 'Gradient', subtitle: 'Modern Colors' },
  { id: 'kt-4', title: 'Showcase', subtitle: 'Bold Layout' },
  { id: 'kt-5', title: 'Modern Type', subtitle: 'Typography' },
  { id: 'kt-6', title: 'Craft', subtitle: 'Textured' },
  { id: 'kt-7', title: 'Photo Essay', subtitle: 'Image Focus' },
  { id: 'kt-8', title: 'Statement', subtitle: 'Editorial' }
];

export const KEYNOTE_SLIDES = [
  { id: 'slide-1', label: '1' },
  { id: 'slide-2', label: '2' },
  { id: 'slide-3', label: '3' },
  { id: 'slide-4', label: '4' },
  { id: 'slide-5', label: '5' },
  { id: 'slide-6', label: '6' },
  { id: 'slide-7', label: '7' },
  { id: 'slide-8', label: '8' },
  { id: 'slide-9', label: '9' },
  { id: 'slide-10', label: '10' },
  { id: 'slide-11', label: '11' }
];

export const KEYNOTE_DOCUMENT_TITLE = 'Carter Surf Shop';

export const KEYNOTE_IPHONE_SECTIONS: LayoutListSection[] = [
  {
    id: 'keynote-menu',
    rows: [
      { id: 'recents', title: 'Recents' },
      { id: 'browse', title: 'Browse' },
      { id: 'shared', title: 'Shared' },
      { id: 'starred', title: 'Starred' }
    ]
  }
];

export const KEYNOTE_GALLERY_ITEMS = [
  { id: 'kg-1', title: 'Basic White', subtitle: 'Theme' },
  { id: 'kg-2', title: 'Basic Black', subtitle: 'Theme' },
  { id: 'kg-3', title: 'Gradient', subtitle: 'Theme' }
];

export const KEYNOTE_RECENT_ITEMS = [
  { id: 'kr-1', title: 'Q4 Review', subtitle: 'Edited yesterday' },
  { id: 'kr-2', title: 'Product Launch', subtitle: 'Edited 3 days ago' },
  { id: 'kr-3', title: 'Team Offsite', subtitle: 'Edited last week' }
];

export const KEYNOTE_TOOLBAR_ACTIONS: LayoutAction[] = [
  { id: 'play', label: 'Play', icon: <LuPlay className="h-2.5 w-2.5" /> },
  { id: 'insert', label: 'Insert', icon: <LuSquare className="h-2.5 w-2.5" /> },
  { id: 'copy', label: 'Copy', icon: <LuCopy className="h-2.5 w-2.5" /> },
  { id: 'draw', label: 'Draw', icon: <LuPenLine className="h-2.5 w-2.5" /> },
  { id: 'format', label: 'Format', icon: <LuPaintbrush className="h-2.5 w-2.5" /> },
  { id: 'delete', label: 'Delete', icon: <LuTrash2 className="h-2.5 w-2.5" /> },
  { id: 'undo', label: 'Undo', icon: <LuUndo2 className="h-2.5 w-2.5" /> },
  { id: 'more', label: 'More', icon: <LuEllipsis className="h-2.5 w-2.5" /> }
];
