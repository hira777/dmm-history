import {
  getDeliveryItemId,
  getPriceOptionItems,
  getSaleLimitTime,
  hasProductInfoRows,
  normalizeTitle
} from './itemPage';

const WAIT_TIMEOUT_MS = 10000;

type WaitForItemPageDataOptions = {
  expectedItemId: string;
  timeoutMs?: number;
};

/**
 * 商品ページから必要な情報を取得できる状態か判定する
 */
const hasItemPageData = (expectedItemId: string): boolean => {
  const title = normalizeTitle(document.title);
  const deliveryItemId = getDeliveryItemId();

  return (
    title !== '' &&
    deliveryItemId.toLowerCase() === expectedItemId.toLowerCase() &&
    getPriceOptionItems().length > 0 &&
    hasProductInfoRows()
  );
};

/**
 * 条件を満たすまでDOMの変更を監視する
 */
const waitForDomCondition = (
  condition: () => boolean,
  timeoutMs: number
): Promise<boolean> => {
  if (condition()) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;

    const observer = new MutationObserver(() => {
      if (condition()) {
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

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });
};

/**
 * 商品ページの必要な情報が読み込まれるまで待つ
 */
export const waitForItemPageData = ({
  expectedItemId,
  timeoutMs = WAIT_TIMEOUT_MS
}: WaitForItemPageDataOptions): Promise<boolean> => {
  return waitForDomCondition(
    () => hasItemPageData(expectedItemId),
    timeoutMs
  );
};

/**
 * セール終了日時が読み込まれるまで待つ
 */
export const waitForSaleLimitTime = (
  timeoutMs: number = WAIT_TIMEOUT_MS
): Promise<boolean> => {
  return waitForDomCondition(() => getSaleLimitTime() !== null, timeoutMs);
};
