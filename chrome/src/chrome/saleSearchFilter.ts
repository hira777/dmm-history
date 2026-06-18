import './saleSearchFilter.scss';

import { URL_CHANGE_EVENT } from '@/enums';
import { getSaleFilters, type SaleFilter } from '@/utils/saleFilter';
import {
  getSearchFormKeyword,
  setupSaleFilterFormSubmitRedirect,
  syncSaleFilterFormParam
} from '@/utils/saleSearchFilterForm';
import {
  findSearchContainer,
  setupSaleSearchFilterUi
} from '@/utils/saleSearchFilterUi';
import {
  hasSaleFilter,
  restoreSelectedSaleFilter,
  saveSelectedSaleFilter
} from '@/utils/saleSearchFilterStorage';
import {
  createCorrectedSaleSearchUrl,
  createSaleFilterChangeSearchUrl,
  findSaleFilterFromUrl,
  isSaleFilterClearUrl
} from '@/utils/saleSearchFilterUrl';

const AV_PATH_PREFIX = '/av/';
const WAIT_TIMEOUT_MS = 10000;

let setupId = 0;
let isClearLinkClickListenerSetup = false;

/**
 * セール検索フィルターを動かす対象ページか判定する。
 */
const isAvPage = (url: string): boolean => {
  return new URL(url).pathname.startsWith(AV_PATH_PREFIX);
};

/**
 * セール検索フィルターUIを追加できる状態か判定する。
 */
const canSetupSaleSearchFilter = (): boolean => {
  return getSaleFilters().length > 0 && findSearchContainer() !== null;
};

/**
 * セール情報と検索フォームが取得できるまでDOMの変更を監視する。
 */
const waitForSaleSearchFilterElements = (
  timeoutMs: number = WAIT_TIMEOUT_MS
): Promise<boolean> => {
  if (canSetupSaleSearchFilter()) {
    return Promise.resolve(true);
  }

  const root = document.documentElement;
  if (!root) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let settled = false;

    const observer = new MutationObserver(() => {
      if (canSetupSaleSearchFilter()) {
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
 * セール選択変更時の保存と必要な再検索を行う。
 */
const handleSaleFilterChange = async (
  saleFilter: SaleFilter | null
): Promise<void> => {
  syncSaleFilterFormParam(saleFilter);
  await saveSelectedSaleFilter(saleFilter);

  const nextUrl = createSaleFilterChangeSearchUrl(
    new URL(location.href),
    saleFilter,
    getSearchFormKeyword()
  );
  if (nextUrl) {
    location.href = nextUrl.href;
  }
};

/**
 * セール解除リンクのクリック時に保存済みの選択状態を解除する。
 */
const setupSaleFilterClearLinkClickListener = (): void => {
  if (isClearLinkClickListenerSetup) return;

  isClearLinkClickListenerSetup = true;
  document.addEventListener(
    'click',
    (event) => {
      if (
        !(event instanceof MouseEvent) ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      const targetUrl = new URL(link.href, location.origin);
      if (!isSaleFilterClearUrl(new URL(location.href), targetUrl)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      void (async (): Promise<void> => {
        syncSaleFilterFormParam(null);
        await saveSelectedSaleFilter(null);
        location.href = targetUrl.href;
      })();
    },
    true
  );
};

/**
 * セール検索フィルターの初期処理を行う。
 */
const setupSaleSearchFilter = async (): Promise<void> => {
  const currentSetupId = setupId + 1;
  setupId = currentSetupId;

  if (!isAvPage(location.href)) return;

  const ready = await waitForSaleSearchFilterElements();
  if (!ready || currentSetupId !== setupId || !isAvPage(location.href)) return;

  const saleFilters = getSaleFilters();
  const savedSaleFilter = await restoreSelectedSaleFilter();
  if (currentSetupId !== setupId || !isAvPage(location.href)) return;

  const urlSaleFilter = findSaleFilterFromUrl(
    new URL(location.href),
    saleFilters
  );
  const selectedSaleFilter =
    urlSaleFilter ||
    (savedSaleFilter && hasSaleFilter(saleFilters, savedSaleFilter)
      ? savedSaleFilter
      : null);

  if (
    urlSaleFilter &&
    (!savedSaleFilter ||
      savedSaleFilter.paramName !== urlSaleFilter.paramName ||
      savedSaleFilter.paramValue !== urlSaleFilter.paramValue)
  ) {
    await saveSelectedSaleFilter(urlSaleFilter);
  }

  if (savedSaleFilter && !selectedSaleFilter) {
    await saveSelectedSaleFilter(null);
  }

  syncSaleFilterFormParam(selectedSaleFilter);
  setupSaleFilterFormSubmitRedirect();
  setupSaleFilterClearLinkClickListener();

  const correctedUrl = createCorrectedSaleSearchUrl(
    new URL(location.href),
    selectedSaleFilter
  );
  if (correctedUrl) {
    location.replace(correctedUrl.href);
    return;
  }

  setupSaleSearchFilterUi(saleFilters, {
    selectedSaleFilter,
    onChange: (saleFilter) => {
      void handleSaleFilterChange(saleFilter);
    }
  });
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
