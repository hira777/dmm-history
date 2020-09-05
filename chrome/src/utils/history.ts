import isAfter from 'date-fns/is_after';

import { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { History, Histories } from '@/models/history';

export const add = (histories: Histories, newHistory: History): Histories => {
  return [newHistory, ...histories.filter(({ id }) => id !== newHistory.id)];
};

export const removeExpiredSaleInfo = (histories: Histories): Histories => {
  return histories.map((history) => {
    if (
      history.saleLimitTime !== null &&
      isAfter(new Date().toString(), history.saleLimitTime)
    ) {
      return {
        ...history,
        ...{
          salePrices: null,
          saleLimitTime: null,
        },
      };
    }
    return history;
  });
};

export const get = (obj: ChromeStorageSchema): Histories => {
  return obj.dmmHistory && obj.dmmHistory.histories
    ? obj.dmmHistory.histories
    : [];
};

export default {
  add,
  get,
};
