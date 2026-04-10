import { SingleColumnRow } from './SingleColumnRow';
import { SingleColumnSearch } from './SingleColumnSearch';
import { SingleColumnSection } from './SingleColumnSection';
import { SingleColumnToolbar } from './SingleColumnToolbar';
import type { SingleColumnLayoutProps } from '../../../types/legacy-components';

export function SingleColumnLayout(props: SingleColumnLayoutProps) {
  return (
    <section className="flex flex-col h-full p-4">
      <SingleColumnToolbar {...props.toolbar} onClose={props.onClose} />
      {props.searchPlaceholder && <SingleColumnSearch placeholder={props.searchPlaceholder} />}
      <div className="flex-1 space-y-4">
        {props.sections.map((section) => (
          <SingleColumnSection key={section.id} header={section.header}>
            {section.rows.map((row) => (
              <SingleColumnRow key={row.id} {...row} />
            ))}
          </SingleColumnSection>
        ))}
      </div>
    </section>
  );
}