import type { ReactElement } from 'react';

import type { History } from '@/models/history';
import { getPrice, getSalePercent, isSale } from '@/react/utils/historyCard';

type HistoryCardProps = Readonly<{
  item: History;
  onDelete: (itemId: string) => void;
  onPlaySampleVideo: (url: string) => void;
}>;

export default function HistoryCard({
  item,
  onDelete,
  onPlaySampleVideo
}: HistoryCardProps): ReactElement {
  const sale = isSale(item);
  const sampleVideoUrl = item.sampleVideoUrl;
  const sampleVideoPlayCount = item.sampleVideoPlayCount;

  return (
    <div className="history-card">
      <div className="history-card__image">
        <button
          type="button"
          className="history-card__delete-button"
          aria-label="履歴を削除"
          onClick={() => onDelete(item.id)}
        />
        <figure className="history-card__figure">
          <a href={item.href} target="_blank" rel="noreferrer">
            <img src={item.imageUrl} alt={item.title} />
          </a>
        </figure>
      </div>

      <div className="history-card__content">
        <p className="history-card__title">
          <a href={item.href} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        </p>
        <p className={`history-card__price${sale ? ' is-sale' : ''}`}>
          {getPrice(item)}
          {sale && (
            <span className="history-card__sale-tag">
              {getSalePercent(item)}%OFF
            </span>
          )}
        </p>
        {sampleVideoUrl && (
          <div className="history-card__sample-video">
            <button
              type="button"
              className="history-card__play-button"
              aria-label="サンプル動画を再生"
              onClick={() => onPlaySampleVideo(sampleVideoUrl)}
            >
              再生
            </button>
            {sampleVideoPlayCount !== null && (
              <span className="history-card__play-count">
               再生回数 {sampleVideoPlayCount.toLocaleString()}回
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
