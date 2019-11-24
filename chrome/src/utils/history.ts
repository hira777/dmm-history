import { KEYS } from '@/enums';

export type Prices = number[];
export type History = Readonly<{
  id: string;
  title: string;
  href: string;
  imageUrl: string;
  prices: Prices;
  salePrices: Prices;
  saleLimitTime: string;
}>;
type Histories = History[] | [];

export function add(histories: Histories, newHistory: History): Histories {
  return [newHistory, ...histories.filter(({ id }) => id !== newHistory.id)];
}

type ChromeStorageObject = {
  [KEYS.DMM_HISTORY]: {
    [KEYS.HISTORIES]: Histories;
  };
};

export function get(chromeStorageObject: ChromeStorageObject): Histories {
  return chromeStorageObject[KEYS.DMM_HISTORY] &&
    chromeStorageObject[KEYS.DMM_HISTORY][KEYS.HISTORIES]
    ? chromeStorageObject[KEYS.DMM_HISTORY][KEYS.HISTORIES]
    : [];
}

export default {
  add,
  get
};
