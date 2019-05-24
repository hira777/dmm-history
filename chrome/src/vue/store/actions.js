import { KEYS } from '@/enums/';
import chromeStorage from '@/utils/chromeStorage';
import * as types from '@/vue/store/mutation-types';

export default {
  setItems({ commit }, items) {
    commit(types.SET_ITEMS, { items });
  },

  removeItem({ commit }, itemId) {
    commit(types.REMOVE_ITEM, { itemId });
  },

  setKeywords({ commit }, keywords) {
    keywords = keywords.split(' ').filter(keyword => keyword !== '');
    commit(types.SET_KEYWORDS, { keywords });
  },

  async restore({ commit }) {
    const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
    const items =
      obj[KEYS.DMM_HISTORY] && obj[KEYS.DMM_HISTORY][KEYS.HISTORIES]
        ? obj[KEYS.DMM_HISTORY][KEYS.HISTORIES]
        : [];

    if (items.length > 0) commit(types.SET_ITEMS, { items });
  },

  save({ state }) {
    const entity = {
      [KEYS.DMM_HISTORY]: {
        [KEYS.HISTORIES]: state.items
      }
    };
    chromeStorage.set({ obj: entity });
  }
};
