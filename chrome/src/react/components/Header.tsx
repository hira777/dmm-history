import type { ReactElement } from 'react';

type HeaderProps = Readonly<{
  itemsExist: boolean;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
}>;

export default function Header({
  itemsExist,
  searchInput,
  onSearchInputChange
}: HeaderProps): ReactElement {
  return (
    <nav className="history-header">
      <div className="history-header__container">
        <div className="history-header__brand">
          <div className="history-header__title">DMM History</div>
        </div>
        <div className="history-header__search">
          <input
            className="history-search-input"
            placeholder={itemsExist ? '検索' : '履歴が存在しません'}
            disabled={!itemsExist}
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.currentTarget.value)}
          />
        </div>
      </div>
    </nav>
  );
}
