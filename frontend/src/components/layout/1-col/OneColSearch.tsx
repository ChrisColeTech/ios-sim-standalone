import { SearchInput } from '../shared/SearchInput';
import type { OneColSearchProps } from '../../../types/layout-components';

export function OneColSearch(props: OneColSearchProps) {
  return (
    <SearchInput
      placeholder={props.placeholder}
      theme={props.theme}
      wrapperClassName={props.compact ? 'px-2 pb-1' : 'px-2 pb-1.5'}
    />
  );
}
