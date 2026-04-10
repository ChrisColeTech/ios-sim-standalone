import { LuSquarePen, LuSearch, LuVideo } from 'react-icons/lu';
import { OneColLayout, ThreeColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import {
  MESSAGES_ONE_COL_SECTIONS,
  MESSAGES_THREE_COL_PRIMARY
} from '../../constants/apps/messages-layout';
import { useMessagesPageState } from '../../hooks/useMessagesPageState';
import type { MessagesPageProps } from '../../types/components';

const MESSAGES_TOOLBAR_ACTIONS = [
  { id: 'video', label: 'Video', icon: <LuVideo className="h-2.5 w-2.5" /> },
  { id: 'new-message', label: 'New', icon: <LuSquarePen className="h-2.5 w-2.5" /> },
  { id: 'search', label: 'Search', icon: <LuSearch className="h-2.5 w-2.5" /> }
];

export function MessagesPage(props: MessagesPageProps) {
  const messages = useMessagesPageState();

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={props.theme === 'dark' ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={{ title: 'Messages', leadingLabel: 'Back', actions: [{ id: 'new-message', label: 'New' }] }}
          searchPlaceholder="Search"
          sections={MESSAGES_ONE_COL_SECTIONS}
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
        toolbarTitle="Messages"
        toolbarSubtitle={messages.categoryLabel}
        primary={MESSAGES_THREE_COL_PRIMARY}
        middle={{
          sections: messages.middleSections
        }}
        detail={{
          title: messages.selectedThreadDetail?.title ?? 'Messages',
          actions: MESSAGES_TOOLBAR_ACTIONS,
          content: (
            <div className={`h-full whitespace-pre-wrap text-[15px] leading-6 ${props.theme === 'dark' ? 'text-white/85' : 'text-black/85'}`}>
              {messages.selectedThreadDetail?.body ?? 'No conversation selected.'}
            </div>
          )
        }}
        selectedPrimaryRowId={messages.selectedCategoryId}
        selectedMiddleRowId={messages.selectedThreadId}
        onPrimarySelect={messages.setSelectedCategoryId}
        onMiddleSelect={messages.setSelectedThreadId}
      />
    </AppPageShell>
  );
}
