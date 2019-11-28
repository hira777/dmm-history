import { KEYS } from '@/enums';
import chromeStorage from '@/utils/chromeStorage';
import types from '@/vue/store/mutation-types';

import { Actions } from '@/vue/store/types';
import {
  StoreState,
  StoreGetters,
  StoreActions,
  StoreMutations
} from '@/vue/store/storeType';

const actions: Actions<
  StoreState,
  StoreActions,
  StoreGetters,
  StoreMutations
> = {
  setItems({ commit }, items) {
    commit(types.SET_ITEMS, { items });
  },

  removeItem({ commit }, itemId) {
    commit(types.REMOVE_ITEM, { itemId });
  },

  setKeywords({ commit }, keywords) {
    const newKeywords = keywords.split(' ').filter(keyword => keyword !== '');
    commit(types.SET_KEYWORDS, { keywords: newKeywords });
  },

  async restore({ commit }) {
    const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
    const items =
      obj[KEYS.DMM_HISTORY] && obj[KEYS.DMM_HISTORY][KEYS.HISTORIES]
        ? obj[KEYS.DMM_HISTORY][KEYS.HISTORIES]
        : [];

    if (items.length > 0) commit(types.SET_ITEMS, { items });
  },

  // eslint-disable-next-line no-empty-pattern
  save({}, { items }) {
    const entity = {
      [KEYS.DMM_HISTORY]: {
        [KEYS.HISTORIES]: items
      }
    };

    chromeStorage.set({ obj: entity });
  }
};

export default actions;
