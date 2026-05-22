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
    <nav className="navbar is-transparent is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item has-text-weight-bold">DMM History</div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="field">
                <div className="control">
                  <input
                    className="input is-small history-search-input"
                    placeholder={itemsExist ? '検索' : '履歴が存在しません'}
                    disabled={!itemsExist}
                    value={searchInput}
                    onChange={(event) =>
                      onSearchInputChange(event.currentTarget.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
