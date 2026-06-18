import { SaleFilter } from './saleFilter';
import { findSearchForm } from './saleSearchFilterForm';

export const SALE_FILTER_CONTAINER_ID = 'dmm-history-sale-filter';

const SALE_FILTER_SELECT_ID = 'dmm-history-sale-filter-select';

type SaleSearchFilterUiOptions = {
  selectedSaleFilter?: SaleFilter | null;
  onChange?: (saleFilter: SaleFilter | null) => void;
};

/**
 * 検索フォームを囲む要素を取得する
 */
export const findSearchContainer = (
  root: ParentNode = document
): HTMLElement | null => {
  const form = findSearchForm(root);

  return form?.closest<HTMLElement>('._n4v1-search') || null;
};

/**
 * セール選択UIの外枠を作る
 */
const createSaleFilterContainer = (ownerDocument: Document): HTMLElement => {
  const container = ownerDocument.createElement('div');
  container.id = SALE_FILTER_CONTAINER_ID;
  container.className = '_n4v1-header-parts';

  const label = ownerDocument.createElement('label');
  label.htmlFor = SALE_FILTER_SELECT_ID;
  label.textContent = 'セール';

  const select = ownerDocument.createElement('select');
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
  saleFilters: SaleFilter[],
  selectedSaleFilter: SaleFilter | null = null
): void => {
  const ownerDocument = select.ownerDocument;
  const nextOptions = [
    {
      value: '',
      label: '指定なし',
      paramName: '',
      paramValue: ''
    },
    ...saleFilters.map((saleFilter) => {
      return {
        value: `${saleFilter.paramName}:${saleFilter.paramValue}`,
        label: saleFilter.label,
        paramName: saleFilter.paramName,
        paramValue: saleFilter.paramValue
      };
    })
  ];
  const currentOptions = Array.from(select.options);
  const shouldUpdateOptions =
    currentOptions.length !== nextOptions.length ||
    nextOptions.some((nextOption, index) => {
      const currentOption = currentOptions[index];

      return (
        !currentOption ||
        currentOption.value !== nextOption.value ||
        currentOption.textContent !== nextOption.label ||
        (currentOption.dataset.paramName || '') !== nextOption.paramName ||
        (currentOption.dataset.paramValue || '') !== nextOption.paramValue
      );
    });

  const selectedValue = selectedSaleFilter
    ? `${selectedSaleFilter.paramName}:${selectedSaleFilter.paramValue}`
    : '';

  if (!shouldUpdateOptions) {
    select.value = selectedValue;
    return;
  }

  select.replaceChildren();

  nextOptions.forEach((nextOption) => {
    const option = ownerDocument.createElement('option');
    option.value = nextOption.value;
    option.textContent = nextOption.label;
    option.dataset.paramName = nextOption.paramName;
    option.dataset.paramValue = nextOption.paramValue;
    select.appendChild(option);
  });

  select.value = selectedValue;
};

/**
 * セール選択UIで選ばれているセール条件を取得する
 */
const getSelectedSaleFilter = (
  select: HTMLSelectElement,
  saleFilters: SaleFilter[]
): SaleFilter | null => {
  const option = select.selectedOptions.item(0);
  const paramName = option?.dataset.paramName;
  const paramValue = option?.dataset.paramValue;

  if (paramName !== 'campaign' || !paramValue) return null;

  return (
    saleFilters.find((saleFilter) => {
      return (
        saleFilter.paramName === paramName &&
        saleFilter.paramValue === paramValue
      );
    }) || null
  );
};

/**
 * 検索窓の直前にセール選択UIを追加する
 */
export const setupSaleSearchFilterUi = (
  saleFilters: SaleFilter[],
  options: SaleSearchFilterUiOptions = {},
  root: ParentNode = document
): boolean => {
  const searchContainer = findSearchContainer(root);
  const parent = searchContainer?.parentElement;
  if (!searchContainer || !parent) return false;

  const ownerDocument = searchContainer.ownerDocument;

  let container = ownerDocument.getElementById(SALE_FILTER_CONTAINER_ID);
  if (!container) {
    container = createSaleFilterContainer(ownerDocument);
    parent.insertBefore(container, searchContainer);
  }

  const select = container.querySelector<HTMLSelectElement>(
    `#${SALE_FILTER_SELECT_ID}`
  );
  if (!select) return false;

  updateSaleFilterOptions(
    select,
    saleFilters,
    options.selectedSaleFilter || null
  );

  select.onchange = (): void => {
    options.onChange?.(getSelectedSaleFilter(select, saleFilters));
  };

  return true;
};
