import { URL_CHANGE_EVENT } from '@/enums';
import { getSaleFilters } from '@/utils/saleFilter';

const AV_PATH_PREFIX = '/av/';
const WAIT_TIMEOUT_MS = 10000;

let setupId = 0;

/**
 * セール検索フィルターを動かす対象ページか判定する。
 */
const isAvPage = (url: string): boolean => {
  return new URL(url).pathname.startsWith(AV_PATH_PREFIX);
};

/**
 * セール情報が取得できる状態か判定する。
 */
const hasSaleFilters = (): boolean => {
  return getSaleFilters().length > 0;
};

/**
 * セール情報が取得できるまでDOMの変更を監視する。
 */
const waitForSaleFilters = (
  timeoutMs: number = WAIT_TIMEOUT_MS
): Promise<boolean> => {
  if (hasSaleFilters()) {
    return Promise.resolve(true);
  }

  const root = document.documentElement;
  if (!root) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let settled = false;

    const observer = new MutationObserver(() => {
      if (hasSaleFilters()) {
        finish(true);
      }
    });

    const timeoutId = window.setTimeout(() => {
      finish(false);
    }, timeoutMs);

    const finish = (result: boolean): void => {
      if (settled) return;

      settled = true;
      window.clearTimeout(timeoutId);
      observer.disconnect();
      resolve(result);
    };

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });
};

/**
 * セール検索フィルターの初期処理を行う。
 */
const setupSaleSearchFilter = async (): Promise<void> => {
  const currentSetupId = setupId + 1;
  setupId = currentSetupId;

  if (!isAvPage(location.href)) return;

  const ready = await waitForSaleFilters();
  if (!ready || currentSetupId !== setupId || !isAvPage(location.href)) return;

  getSaleFilters();
};

/**
 * SPA遷移後にセール検索フィルターの処理を再実行する。
 */
const handleUrlChange = (): void => {
  void setupSaleSearchFilter();
};

window.addEventListener(URL_CHANGE_EVENT, handleUrlChange);
window.addEventListener('popstate', handleUrlChange);

void setupSaleSearchFilter();
