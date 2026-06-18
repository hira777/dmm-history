import { keys, type ChromeStorageSchema } from '@/models/chromeStorageSchema';
import chromeStorage from '@/utils/chromeStorage';
import type { SaleFilter } from '@/utils/saleFilter';

/**
 * chrome.storageから読んだ値がセール検索フィルターか判定する
 */
const isSaleFilter = (value: unknown): value is SaleFilter => {
  const candidate = value as Partial<SaleFilter>;

  return (
    typeof value === 'object' &&
    value !== null &&
    typeof candidate.label === 'string' &&
    candidate.paramName === 'campaign' &&
    typeof candidate.paramValue === 'string'
  );
};

/**
 * 現在のセール一覧に指定したセール条件が存在するか判定する
 */
export const hasSaleFilter = (
  saleFilters: SaleFilter[],
  target: SaleFilter
): boolean => {
  return saleFilters.some((saleFilter) => {
    return (
      saleFilter.paramName === target.paramName &&
      saleFilter.paramValue === target.paramValue
    );
  });
};

/**
 * 保存済みのセール検索フィルターを読み込む
 */
export const restoreSelectedSaleFilter =
  async (): Promise<SaleFilter | null> => {
    const obj = await chromeStorage.get({ keys: keys.saleSearchFilter });
    const savedSaleFilter = obj[keys.saleSearchFilter];

    return isSaleFilter(savedSaleFilter) ? savedSaleFilter : null;
  };

/**
 * 選択中のセール検索フィルターを保存する
 */
export const saveSelectedSaleFilter = (
  saleFilter: SaleFilter | null
): Promise<void> => {
  if (!saleFilter) {
    return chromeStorage.remove({ keys: keys.saleSearchFilter });
  }

  const entity: ChromeStorageSchema = {
    [keys.saleSearchFilter]: saleFilter
  };

  return chromeStorage.set({ obj: entity });
};
