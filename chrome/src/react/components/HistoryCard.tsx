import type { ReactElement } from 'react';

import type { History } from '@/models/history';
import { getPrice, getSalePercent, isSale } from '@/react/utils/historyCard';

type HistoryCardProps = Readonly<{
  item: History;
  onDelete: (itemId: string) => void;
}>;

export default function HistoryCard({
  item,
  onDelete
}: HistoryCardProps): ReactElement {
  const sale = isSale(item);

  return (
    <div className="card card-equal-height history-card">
      <div className="card-image">
        <button
          type="button"
          className="delete card-delete-button"
          onClick={() => onDelete(item.id)}
        />
        <figure className="image">
          <a href={item.href} target="_blank" rel="noreferrer">
            <img src={item.imageUrl} alt={item.title} />
          </a>
        </figure>
      </div>

      <div className="card-content">
        <p className="card-content-title">
          <a href={item.href} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        </p>
        <p className={`card-content-price${sale ? ' is-sale' : ''}`}>
          {getPrice(item)}
          {sale && (
            <span className="tag is-danger">{getSalePercent(item)}%OFF</span>
          )}
        </p>
      </div>
    </div>
  );
}
