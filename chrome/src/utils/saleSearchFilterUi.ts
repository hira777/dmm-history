import { SaleFilter } from './saleFilter';

export const SALE_FILTER_CONTAINER_ID = 'dmm-history-sale-filter';

const SALE_FILTER_SELECT_ID = 'dmm-history-sale-filter-select';

/**
 * 検索フォームを囲む要素を取得する
 */
export const findSearchContainer = (
  root: ParentNode = document
): HTMLElement | null => {
  const form = root.querySelector<HTMLFormElement>('form#frmSearch');

  return form?.closest<HTMLElement>('._n4v1-search') || null;
};

/**
 * セール選択UIの外枠を作る
 */
const createSaleFilterContainer = (document: Document): HTMLElement => {
  const container = document.createElement('div');
  container.id = SALE_FILTER_CONTAINER_ID;
  container.className = '_n4v1-header-parts';

  const label = document.createElement('label');
  label.htmlFor = SALE_FILTER_SELECT_ID;
  label.textContent = 'セール';

  const select = document.createElement('select');
  select.id = SALE_FILTER_SELECT_ID;
  select.name = 'dmmHistorySaleFilter';
  select.setAttribute('aria-label', 'セール条件');

  container.append(label, select);

  return container;
};

/**
 * セール選択肢を更新する
 */
const updateSaleFilterOptions = (
  select: HTMLSelectElement,
  saleFilters: SaleFilter[]
): void => {
  const document = select.ownerDocument;

  select.replaceChildren();

  const noneOption = document.createElement('option');
  noneOption.value = '';
  noneOption.textContent = '指定なし';
  select.appendChild(noneOption);

  saleFilters.forEach((saleFilter) => {
    const option = document.createElement('option');
    option.value = `${saleFilter.paramName}:${saleFilter.paramValue}`;
    option.textContent = saleFilter.label;
    option.dataset.paramName = saleFilter.paramName;
    option.dataset.paramValue = saleFilter.paramValue;
    select.appendChild(option);
  });
};

/**
 * 検索窓の直前にセール選択UIを追加する
 */
export const setupSaleSearchFilterUi = (
  saleFilters: SaleFilter[],
  root: ParentNode = document
): boolean => {
  const searchContainer = findSearchContainer(root);
  const parent = searchContainer?.parentElement;
  if (!searchContainer || !parent) return false;

  const document = searchContainer.ownerDocument;

  let container = document.getElementById(SALE_FILTER_CONTAINER_ID);
  if (!container) {
    container = createSaleFilterContainer(document);
    parent.insertBefore(container, searchContainer);
  }

  const select = container.querySelector<HTMLSelectElement>(
    `#${SALE_FILTER_SELECT_ID}`
  );
  if (!select) return false;

  updateSaleFilterOptions(select, saleFilters);

  return true;
};
