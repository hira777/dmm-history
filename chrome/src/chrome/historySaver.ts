import { MAX_HISTORIES, URL_CHANGE_EVENT } from '@/enums';
import { keys, ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { History } from '@/models/history';
import {
  SAMPLE_VIDEO_INFO_MESSAGE,
  SampleVideoInfoMessage
} from '@/models/sampleVideo';
import history from '@/utils/history';
import chromeStorage from '@/utils/chromeStorage';
import {
  getAffiliateUrl,
  getFavoriteCount,
  getImageUrl,
  getItemId,
  getLabel,
  getMaker,
  getPrices,
  getSaleLimitTime,
  getSalePrices,
  getSampleVideoUrl,
  hasSampleVideo,
  getTitle
} from '@/utils/itemPage';
import {
  waitForItemPageData,
  waitForSaleLimitTime
} from '@/utils/itemPageWaiter';

const CONTENT_PATH = '/av/content/';
const SAMPLE_VIDEO_INFO_WAIT_MS = 3000;

let currentUrl = location.href;
const sampleVideoInfoByItemId = new Map<string, number | null>();

/**
 * 現在のURLが履歴保存対象の商品ページか判定する。
 */
function isContentPage(url: string): boolean {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname === CONTENT_PATH && getItemId(url) !== '';
}

/**
 * サンプル動画情報のメッセージか判定する。
 */
function isSampleVideoInfoMessage(
  message: unknown
): message is SampleVideoInfoMessage {
  const candidate = message as Partial<SampleVideoInfoMessage>;

  return (
    typeof message === 'object' &&
    message !== null &&
    candidate.type === SAMPLE_VIDEO_INFO_MESSAGE &&
    typeof candidate.itemId === 'string' &&
    (typeof candidate.playCount === 'number' || candidate.playCount === null)
  );
}

/**
 * iframeから送られるサンプル動画の再生回数を待つ。
 */
function waitForSampleVideoInfo(itemId: string): Promise<number | null> {
  if (sampleVideoInfoByItemId.has(itemId)) {
    return Promise.resolve(sampleVideoInfoByItemId.get(itemId) ?? null);
  }

  return new Promise((resolve) => {
    let timeoutId = 0;

    const listener = (event: MessageEvent): void => {
      if (
        event.origin !== 'https://www.dmm.co.jp' ||
        !isSampleVideoInfoMessage(event.data) ||
        event.data.itemId !== itemId
      ) {
        return;
      }

      window.clearTimeout(timeoutId);
      window.removeEventListener('message', listener);
      resolve(event.data.playCount);
    };

    timeoutId = window.setTimeout(() => {
      window.removeEventListener('message', listener);
      resolve(null);
    }, SAMPLE_VIDEO_INFO_WAIT_MS);

    window.addEventListener('message', listener);
  });
}

/**
 * iframeから送られるサンプル動画情報を保持する。
 */
window.addEventListener('message', (event: MessageEvent) => {
  if (
    event.origin !== 'https://www.dmm.co.jp' ||
    !isSampleVideoInfoMessage(event.data)
  ) {
    return;
  }

  sampleVideoInfoByItemId.set(event.data.itemId, event.data.playCount);
});

/**
 * 商品ページの情報を取得して閲覧履歴へ保存する。
 */
async function saveNewHistory(): Promise<void> {
  if (!isContentPage(location.href)) return;
  const itemId = getItemId(location.href);
  const ready = await waitForItemPageData({ expectedItemId: itemId });
  if (!ready) return;

  const salePrices = getSalePrices();
  const sampleVideoExists = hasSampleVideo();
  const sampleVideoPlayCount = sampleVideoExists
    ? await waitForSampleVideoInfo(itemId)
    : null;
  const saleLimitTime = salePrices
    ? await waitForSaleLimitTime().then((ready) => {
        return ready ? getSaleLimitTime() : null;
      })
    : null;
  const newHistory: History = {
    id: itemId,
    title: getTitle(),
    href: getAffiliateUrl(itemId),
    imageUrl: getImageUrl(itemId),
    maker: getMaker(),
    label: getLabel(),
    prices: getPrices(),
    salePrices,
    saleLimitTime,
    hasSampleVideo: sampleVideoExists,
    sampleVideoUrl: sampleVideoExists ? getSampleVideoUrl(itemId) : null,
    sampleVideoPlayCount,
    favoriteCount: getFavoriteCount()
  };
  const obj = await chromeStorage.get({ keys: keys.dmmHistory });
  const histories = history
    .add(history.get(obj), newHistory)
    .slice(0, MAX_HISTORIES);
  const entity: ChromeStorageSchema = { ...obj };
  entity.dmmHistory = entity.dmmHistory || {};
  entity.dmmHistory.histories = histories;
  chromeStorage.set({ obj: entity });
}

/**
 * URLが前回確認時から変わっている場合だけURL変更処理を走らせる。
 */
function checkUrlChange(): void {
  if (location.href === currentUrl) return;

  currentUrl = location.href;

  if (!isContentPage(location.href)) return;

  saveNewHistory();
}

/**
 * History API監視スクリプトから通知されるSPA遷移イベントを購読する。
 */
function watchSpaNavigation(): void {
  window.addEventListener(URL_CHANGE_EVENT, checkUrlChange);
  window.addEventListener('popstate', checkUrlChange);
}

watchSpaNavigation();
saveNewHistory();
