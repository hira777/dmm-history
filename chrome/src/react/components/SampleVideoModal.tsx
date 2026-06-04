import type { ReactElement } from 'react';

type SampleVideoModalProps = Readonly<{
  url: string | null;
  onClose: () => void;
}>;

export default function SampleVideoModal({
  url,
  onClose
}: SampleVideoModalProps): ReactElement | null {
  if (!url) return null;

  return (
    <div className="sample-video-modal" role="dialog" aria-modal="true">
      <button
        type="button"
        className="sample-video-modal__backdrop"
        aria-label="サンプル動画を閉じる"
        onClick={onClose}
      />
      <div className="sample-video-modal__content">
        <button
          type="button"
          className="sample-video-modal__close-button"
          aria-label="サンプル動画を閉じる"
          onClick={onClose}
        />
        <iframe
          className="sample-video-modal__iframe"
          title="サンプル動画"
          src={url}
          width="560"
          height="360"
          scrolling="no"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
