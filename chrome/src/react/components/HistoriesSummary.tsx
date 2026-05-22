import type { ReactElement } from 'react';

import type { Histories } from '@/models/history';

type HistoriesSummaryProps = Readonly<{
  allItems: Histories;
  numberOfItems: number;
  searchInput: string;
}>;

export default function HistoriesSummary({
  allItems,
  numberOfItems,
  searchInput
}: HistoriesSummaryProps): ReactElement {
  const itemsExist = allItems.length > 0;

  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            {!itemsExist && <strong>履歴が存在しません</strong>}
            {itemsExist && searchInput === '' && (
              <strong>{numberOfItems} タイトル</strong>
            )}
            {itemsExist && searchInput !== '' && (
              <strong>
                「{searchInput}」に対して{numberOfItems} タイトルが見つかりました
              </strong>
            )}
          </p>
        </div>
      </div>
    </nav>
  );
}
