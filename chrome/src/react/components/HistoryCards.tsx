import type { ReactElement } from 'react';

import type { Histories } from '@/models/history';
import HistoryCard from './HistoryCard';

type HistoryCardsProps = Readonly<{
  items: Histories;
  onDelete: (itemId: string) => void;
}>;

export default function HistoryCards({
  items,
  onDelete
}: HistoryCardsProps): ReactElement {
  return (
    <div className="columns is-multiline">
      {items.map((item) => (
        <div className="column is-2 history-card-column" key={item.id}>
          <HistoryCard item={item} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
