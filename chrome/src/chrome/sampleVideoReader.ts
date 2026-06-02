import {
  SAMPLE_VIDEO_INFO_MESSAGE,
  SampleVideoInfoMessage
} from '@/models/sampleVideo';
import { getSampleVideoPlayCount } from '@/utils/itemPage';

const WAIT_TIMEOUT_MS = 5000;

/**
 * サンプル動画iframeのURLから商品IDを取得する。
 */
const getSampleVideoItemId = (url: string): string => {
  return new URL(url).pathname.match(/\/cid=([^/]+)/)?.[1] || '';
};

/**
 * サンプル動画の再生回数を親の商品ページへ送る。
 */
const sendSampleVideoInfo = (): void => {
  const itemId = getSampleVideoItemId(location.href);
  if (itemId === '') return;

  const message: SampleVideoInfoMessage = {
    type: SAMPLE_VIDEO_INFO_MESSAGE,
    itemId,
    playCount: getSampleVideoPlayCount()
  };

  window.parent.postMessage(message, 'https://video.dmm.co.jp');
};

/**
 * サンプル動画の再生回数が読み取れるまで待つ。
 */
const waitForSampleVideoInfo = (): void => {
  if (getSampleVideoPlayCount() !== null) {
    sendSampleVideoInfo();
    return;
  }

  let settled = false;
  const observer = new MutationObserver(() => {
    if (getSampleVideoPlayCount() !== null) {
      finish();
    }
  });
  let timeoutId = 0;

  const finish = (): void => {
    if (settled) return;

    settled = true;
    window.clearTimeout(timeoutId);
    observer.disconnect();
    sendSampleVideoInfo();
  };

  timeoutId = window.setTimeout(finish, WAIT_TIMEOUT_MS);

  const root = document.documentElement;
  if (!root) {
    finish();
    return;
  }

  observer.observe(root, {
    childList: true,
    subtree: true,
    characterData: true
  });
};

waitForSampleVideoInfo();
