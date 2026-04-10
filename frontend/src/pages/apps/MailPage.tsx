import { LuFilter, LuSquarePen, LuSearch } from 'react-icons/lu';
import { OneColLayout, ThreeColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { MAIL_ONE_COL_SECTIONS, MAIL_TWO_COL_SIDEBAR } from '../../constants/apps/mail-layout';
import { useMailPageState } from '../../hooks/useMailPageState';
import type { MailPageProps } from '../../types/components';

const MAIL_TOOLBAR_ACTIONS = [
  { id: 'filter', label: 'Filter', icon: <LuFilter className="h-2.5 w-2.5" /> },
  { id: 'compose', label: 'Compose', icon: <LuSquarePen className="h-2.5 w-2.5" /> },
  { id: 'search', label: 'Search', icon: <LuSearch className="h-2.5 w-2.5" /> }
];

export function MailPage(props: MailPageProps) {
  const mail = useMailPageState();

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={{ title: 'Inbox', leadingLabel: 'Mailboxes', actions: [{ id: 'edit', label: 'Edit' }] }}
          searchPlaceholder="Search"
          sections={MAIL_ONE_COL_SECTIONS}
          footer={<div className="text-center text-xs text-black/45">Updated Just Now</div>}
        />
      </AppPageShell>
    );
  }

  return (
    <AppPageShell
      backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <ThreeColLayout
        theme={props.theme}
        toolbarTitle={mail.folderDetail.title}
        toolbarSubtitle={mail.folderDetail.subtitle}
        primary={{
          title: MAIL_TWO_COL_SIDEBAR.title,
          sections: MAIL_TWO_COL_SIDEBAR.sections
        }}
        middle={{
          sections: mail.folderSections
        }}
        detail={{
          title: mail.selectedThread?.title ?? mail.folderDetail.title,
          actions: MAIL_TOOLBAR_ACTIONS,
          content: (
            <div className={`h-full whitespace-pre-wrap text-[15px] leading-6 ${props.theme === 'dark' ? 'text-white/85' : 'text-black/85'}`}>
              {mail.selectedThread?.subtitle ?? 'No message selected.'}
            </div>
          )
        }}
        selectedPrimaryRowId={mail.selectedFolderId}
        selectedMiddleRowId={mail.selectedThreadId}
        onPrimarySelect={mail.setSelectedFolderId}
        onMiddleSelect={mail.setSelectedThreadId}
      />
    </AppPageShell>
  );
}
