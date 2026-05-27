import { MAX_HISTORIES, URL_CHANGE_EVENT } from '@/enums';
import { keys, ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { History } from '@/models/history';
import history from '@/utils/history';
import chromeStorage from '@/utils/chromeStorage';
import {
  getAffiliateUrl,
  getImageUrl,
  getItemId,
  getLabel,
  getMaker,
  getPrices,
  getSaleLimitTime,
  getSalePrices,
  getTitle
} from '@/utils/itemPage';
import {
  waitForItemPageData,
  waitForSaleLimitTime
} from '@/utils/itemPageWaiter';

const CONTENT_PATH = '/av/content/';

let currentUrl = location.href;

/**
 * 現在のURLが履歴保存対象の商品ページか判定する。
 */
function isContentPage(url: string): boolean {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname === CONTENT_PATH && getItemId(url) !== '';
}

/**
 * 商品ページの情報を取得して閲覧履歴へ保存する。
 */
async function saveNewHistory(previousTitle: string = ''): Promise<void> {
  if (!isContentPage(location.href)) return;
  const ready = await waitForItemPageData({ previousTitle });
  if (!ready) return;

  const itemId = getItemId(location.href);
  const salePrices = getSalePrices();
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
    saleLimitTime
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

  const previousUrl = currentUrl;
  currentUrl = location.href;

  if (!isContentPage(location.href)) return;

  const previousTitle = isContentPage(previousUrl) ? getTitle() : '';
  saveNewHistory(previousTitle);
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
