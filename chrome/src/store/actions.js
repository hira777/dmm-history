import * as types from './mutation-types';

import { ROOT_KEY, HISTORIES_KEY } from '../config';

export default {
  initItems({ commit }) {
    chrome.storage.local.get(ROOT_KEY, obj => {
      const items =
        obj[ROOT_KEY] && obj[ROOT_KEY][HISTORIES_KEY]
          ? obj[ROOT_KEY][HISTORIES_KEY]
          : [];

      if (items.length > 0) commit(types.SET_ITEMS, { items });
    });
  },

  setItems({ commit }, items) {
    commit(types.SET_ITEMS, { items });
  },

  removeItem({ commit }, itemId) {
    commit(types.REMOVE_ITEM, { itemId });
  },

  setKeywords({ commit }, keywords) {
    commit(types.SET_KEYWORDS, { keywords: keywords.split(' ') });
  },

  setSortType({ commit }, sortType) {
    commit(types.UPDATE_SORT_TYPE, { sortType });
  },

  addTag({ commit }, tag) {
    commit(types.ADD_TAG, { tag });
  },

  removeTag({ commit }, tag) {
    commit(types.REMOVE_TAG, { tag });
  },
};
