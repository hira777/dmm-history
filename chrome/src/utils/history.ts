import { ChromeStorageSchema } from '@/models/chromeStorageSchema';
import { History, Histories } from '@/models/history';

export function add(histories: Histories, newHistory: History): Histories {
  return [newHistory, ...histories.filter(({ id }) => id !== newHistory.id)];
}

export function get(obj: ChromeStorageSchema): Histories {
  return obj.dmmHistory && obj.dmmHistory.histories
    ? obj.dmmHistory.histories
    : [];
}

export default {
  add,
  get
};
