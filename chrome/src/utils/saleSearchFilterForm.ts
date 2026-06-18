import type { SaleFilter } from './saleFilter';

const SEARCH_FORM_SELECTOR = 'form#frmSearch';
const SALE_FILTER_INPUT_ID = 'dmm-history-sale-filter-param';
const SALE_FILTER_SUBMIT_DATASET_KEY = 'dmmHistorySaleFilterSubmit';
const AV_LIST_PATH = '/av/list/';
const SEARCH_KEY_INPUT_NAME = 'searchstr';
const SEARCH_KEY_PARAM = 'key';

/**
 * 検索フォームを取得する
 */
export const findSearchForm = (
  root: ParentNode = document
): HTMLFormElement | null => {
  return root.querySelector<HTMLFormElement>(SEARCH_FORM_SELECTOR);
};

/**
 * 検索フォームに送信前のセール条件を反映する
 */
export const syncSaleFilterFormParam = (
  saleFilter: SaleFilter | null,
  root: ParentNode = document
): boolean => {
  const form = findSearchForm(root);
  if (!form) return false;

  const currentInput =
    form.querySelector<HTMLInputElement>(`#${SALE_FILTER_INPUT_ID}`);

  if (!saleFilter) {
    currentInput?.remove();
    return true;
  }

  const input = currentInput || form.ownerDocument.createElement('input');
  input.id = SALE_FILTER_INPUT_ID;
  input.type = 'hidden';
  input.name = saleFilter.paramName;
  input.value = saleFilter.paramValue;

  if (!currentInput) {
    form.appendChild(input);
  }

  return true;
};

/**
 * 検索フォームのキーワードを取得する
 */
export const getSearchFormKeyword = (
  root: ParentNode = document
): string | null => {
  const form = findSearchForm(root);
  const keywordInput = form?.querySelector<HTMLInputElement>(
    `input[name="${SEARCH_KEY_INPUT_NAME}"]`
  );
  const keyword = keywordInput?.value.trim();

  return keyword || null;
};

/**
 * 検索フォーム送信前にセール条件付きURLへ遷移する
 */
export const setupSaleFilterFormSubmitRedirect = (
  root: ParentNode = document
): boolean => {
  const form = findSearchForm(root);
  if (!form) return false;
  if (form.dataset[SALE_FILTER_SUBMIT_DATASET_KEY] === 'true') return true;

  form.dataset[SALE_FILTER_SUBMIT_DATASET_KEY] = 'true';
  form.addEventListener(
    'submit',
    (event) => {
      const saleFilterInput = form.querySelector<HTMLInputElement>(
        `#${SALE_FILTER_INPUT_ID}`
      );
      const keyword = getSearchFormKeyword(root);

      if (!saleFilterInput?.name || !saleFilterInput.value) return;

      const nextUrl = new URL(AV_LIST_PATH, location.origin);
      nextUrl.searchParams.set(saleFilterInput.name, saleFilterInput.value);

      if (keyword) {
        nextUrl.searchParams.set(SEARCH_KEY_PARAM, keyword);
      }

      event.preventDefault();
      location.href = nextUrl.href;
    },
    true
  );

  return true;
};
