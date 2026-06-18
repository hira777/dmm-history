/**
 * セール検索で維持するURLパラメータ情報
 */
export type SaleFilter = {
  label: string;
  paramName: 'campaign';
  paramValue: string;
};

/**
 * セール情報の抽出に必要なリンク情報
 */
type SaleFilterLink = {
  href: string;
  textContent: string | null;
};

const SALE_FILTER_LINK_SELECTOR =
  '[data-e2eid="sidebar-menu"] a[href*="/av/list/"][href*="campaign="]';

/**
 * 表示名として扱いやすいように、前後の空白と連続する空白を整理する
 */
const normalizeLabel = (label: string): string => {
  return label.trim().replace(/\s+/g, ' ');
};

/**
 * リンク1件からセール検索フィルターを作る
 */
export const createSaleFilter = (link: SaleFilterLink): SaleFilter | null => {
  const label = normalizeLabel(link.textContent || '');
  if (label === '') return null;

  let url: URL;
  try {
    url = new URL(link.href, 'https://video.dmm.co.jp');
  } catch {
    return null;
  }

  if (url.pathname !== '/av/list/') return null;

  const paramValue = url.searchParams.get('campaign');
  if (!paramValue) return null;

  return {
    label,
    paramName: 'campaign',
    paramValue
  };
};

/**
 * 同じパラメータを持つセール検索フィルターを除外する
 */
export const uniqueSaleFilters = (saleFilters: SaleFilter[]): SaleFilter[] => {
  const seen = new Set<string>();

  return saleFilters.filter((saleFilter) => {
    const key = `${saleFilter.paramName}:${saleFilter.paramValue}`;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

/**
 * ページ内のサイドバーからセール検索フィルター一覧を取得する
 */
export const getSaleFilters = (root: ParentNode = document): SaleFilter[] => {
  const links = Array.from(
    root.querySelectorAll<HTMLAnchorElement>(SALE_FILTER_LINK_SELECTOR)
  );

  return uniqueSaleFilters(
    links
      .map((link) => {
        return createSaleFilter(link);
      })
      .filter((saleFilter): saleFilter is SaleFilter => saleFilter !== null)
  );
};
