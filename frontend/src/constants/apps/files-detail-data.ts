import type { FilesDetailListItem } from './files-layout';

export const FILES_DETAIL_LIST_BY_ROW: Record<string, FilesDetailListItem[]> = {
  'icloud-drive': [
    { id: 'icloud-folder-design', kind: 'folder', name: 'Design', date: 'Yesterday', size: '--' },
    { id: 'icld-contract', kind: 'file', name: 'Contract-Review.docx', date: 'Apr 2', size: '226 KB' },
    { id: 'icld-roadmap', kind: 'file', name: 'Roadmap.pdf', date: 'Mar 29', size: '2.3 MB' },
    { id: 'icld-assets', kind: 'folder', name: 'Brand Assets', date: 'Mar 26', size: '--' }
  ],
  'on-my-ipad': [
    { id: 'local-downloads', kind: 'folder', name: 'Downloads', date: 'Today', size: '--' },
    { id: 'local-scans', kind: 'folder', name: 'Scans', date: 'Yesterday', size: '--' },
    { id: 'local-notes', kind: 'file', name: 'Meeting Notes.txt', date: 'Apr 1', size: '12 KB' },
    { id: 'local-draft', kind: 'file', name: 'Draft Image.png', date: 'Mar 31', size: '1.1 MB' }
  ],
  shared: [
    { id: 'shr-q2', kind: 'file', name: 'Q2 Deck.key', date: 'Today', size: '3.8 MB' },
    { id: 'shr-plan', kind: 'file', name: 'Project Plan.pdf', date: 'Yesterday', size: '1.2 MB' },
    { id: 'shr-travel', kind: 'folder', name: 'Travel', date: 'Mar 28', size: '--' }
  ],
  'recently-deleted': [
    { id: 'del-report', kind: 'file', name: 'Old Report.pages', date: 'Today', size: '416 KB' },
    { id: 'del-spreadsheet', kind: 'file', name: 'Invoice-0426.xlsx', date: 'Today', size: '84 KB' }
  ],
  'tag-work': [
    { id: 'work-roadmap', kind: 'file', name: 'Roadmap.pdf', date: 'Mar 29', size: '2.3 MB' },
    { id: 'work-kickoff', kind: 'file', name: 'Kickoff Notes.md', date: 'Mar 25', size: '18 KB' }
  ],
  'tag-personal': [
    { id: 'personal-recipes', kind: 'folder', name: 'Recipes', date: 'Mar 24', size: '--' },
    { id: 'personal-weekend', kind: 'file', name: 'Weekend Plan.txt', date: 'Mar 22', size: '6 KB' }
  ],
  'tag-urgent': [
    { id: 'urgent-contract', kind: 'file', name: 'Contract-Review.docx', date: 'Apr 2', size: '226 KB' },
    { id: 'urgent-tasks', kind: 'folder', name: 'Today Tasks', date: 'Today', size: '--' }
  ]
};
