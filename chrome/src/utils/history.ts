import { KEYS } from '@/enums';
import { History, Histories } from '@/models/history';

export function add(histories: Histories, newHistory: History): Histories {
  return [newHistory, ...histories.filter(({ id }) => id !== newHistory.id)];
}

export function get(chromeStorageObject: { [key: string]: any }): Histories {
  return chromeStorageObject[KEYS.DMM_HISTORY] &&
    chromeStorageObject[KEYS.DMM_HISTORY][KEYS.HISTORIES]
    ? chromeStorageObject[KEYS.DMM_HISTORY][KEYS.HISTORIES]
    : [];
}

export default {
  add,
  get
};
