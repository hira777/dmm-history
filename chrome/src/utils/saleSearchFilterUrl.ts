import type { SaleFilter } from './saleFilter';

const AV_LIST_PATH = '/av/list/';
const SEARCH_KEY_PARAM = 'key';
const SALE_FILTER_PARAM = 'campaign';

/**
 * キーワード検索結果のURLか判定する
 */
export const isSaleSearchResultUrl = (url: URL): boolean => {
  return url.pathname === AV_LIST_PATH && url.searchParams.has(SEARCH_KEY_PARAM);
};

/**
 * URLにセール検索フィルターのパラメータを付ける
 */
export const applySaleFilterToUrl = (
  url: URL,
  saleFilter: SaleFilter | null
): URL => {
  const nextUrl = new URL(url.href);
  if (!saleFilter) return nextUrl;

  nextUrl.searchParams.set(saleFilter.paramName, saleFilter.paramValue);

  return nextUrl;
};

/**
 * キーワード検索後に消えたセール条件を補正したURLを作る
 */
export const createCorrectedSaleSearchUrl = (
  url: URL,
  saleFilter: SaleFilter | null
): URL | null => {
  if (!saleFilter || !isSaleSearchResultUrl(url)) return null;
  if (url.searchParams.get(saleFilter.paramName) === saleFilter.paramValue) {
    return null;
  }

  return applySaleFilterToUrl(url, saleFilter);
};

/**
 * セール検索結果中のプルダウン変更で遷移するURLを作る
 */
export const createSaleFilterChangeSearchUrl = (
  url: URL,
  saleFilter: SaleFilter | null,
  keyword: string | null
): URL | null => {
  if (
    url.pathname !== AV_LIST_PATH ||
    !url.searchParams.has(SEARCH_KEY_PARAM) ||
    !url.searchParams.has(SALE_FILTER_PARAM) ||
    !keyword
  ) {
    return null;
  }

  const nextUrl = new URL(url.href);
  nextUrl.searchParams.set(SEARCH_KEY_PARAM, keyword);

  if (!saleFilter) {
    nextUrl.searchParams.delete(SALE_FILTER_PARAM);
  } else {
    nextUrl.searchParams.set(saleFilter.paramName, saleFilter.paramValue);
  }

  return nextUrl.href === url.href ? null : nextUrl;
};

/**
 * セール検索結果の解除リンクか判定する
 */
export const isSaleFilterClearUrl = (
  currentUrl: URL,
  targetUrl: URL
): boolean => {
  return (
    currentUrl.pathname === AV_LIST_PATH &&
    targetUrl.pathname === AV_LIST_PATH &&
    currentUrl.searchParams.has(SEARCH_KEY_PARAM) &&
    currentUrl.searchParams.has(SALE_FILTER_PARAM) &&
    targetUrl.searchParams.has(SEARCH_KEY_PARAM) &&
    !targetUrl.searchParams.has(SALE_FILTER_PARAM) &&
    currentUrl.searchParams.get(SEARCH_KEY_PARAM) ===
      targetUrl.searchParams.get(SEARCH_KEY_PARAM)
  );
};

/**
 * URLのセール条件に一致するセール検索フィルターを取得する
 */
export const findSaleFilterFromUrl = (
  url: URL,
  saleFilters: SaleFilter[]
): SaleFilter | null => {
  const paramValue = url.searchParams.get(SALE_FILTER_PARAM);
  if (!paramValue) return null;

  return (
    saleFilters.find((saleFilter) => {
      return (
        saleFilter.paramName === SALE_FILTER_PARAM &&
        saleFilter.paramValue === paramValue
      );
    }) || null
  );
};
