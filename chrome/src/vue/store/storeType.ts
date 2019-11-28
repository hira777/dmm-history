import types from '@/vue/store/mutation-types';

type Prices = number[];
type History = Readonly<{
  id: string;
  title: string;
  href: string;
  imageUrl: string;
  prices: Prices;
  salePrices: Prices | null;
  saleLimitTime: string | null;
}>;
type Histories = History[] | [];

export interface StoreState {
  items: Histories;
  keywords: string[];
}

export interface StoreGetters {
  // getter 関数名: 戻り値の型
  allItems: Histories;
  itemsExits: boolean;
  searchedItems: Histories | undefined;
  items: Histories;
  numberOfItems: number;
  keywordsExists: boolean;
}

export interface StoreActions {
  // action 関数名: payloadの型
  setItems: Histories;
  removeItem: string;
  setKeywords: string;
  restore: void;
  save: { items: Histories };
}

export interface StoreMutations {
  // mutation 関数名: payload の型
  [types.REMOVE_ITEM]: { itemId: string };
  [types.SET_ITEMS]: { items: Histories };
  [types.SET_KEYWORDS]: { keywords: string[] };
}
