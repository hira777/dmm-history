import { KEYS } from '@/enums';

export function add(histories, newHistory) {
  return [newHistory, ...histories.filter(({ id }) => id !== newHistory.id)];
}

export function get(chromeStorageObject) {
  return chromeStorageObject[KEYS.DMM_HISTORY] &&
    chromeStorageObject[KEYS.DMM_HISTORY][KEYS.HISTORIES]
    ? chromeStorageObject[KEYS.DMM_HISTORY][KEYS.HISTORIES]
    : [];
}

export default {
  add,
  get
};
