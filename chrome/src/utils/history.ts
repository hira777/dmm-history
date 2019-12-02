import { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { History, Histories } from '@/models/history';

export const add = (histories: Histories, newHistory: History): Histories => {
  return [newHistory, ...histories.filter(({ id }) => id !== newHistory.id)];
};

export const get = (obj: ChromeStorageSchema): Histories => {
  return obj.dmmHistory && obj.dmmHistory.histories
    ? obj.dmmHistory.histories
    : [];
};

export default {
  add,
  get
};
