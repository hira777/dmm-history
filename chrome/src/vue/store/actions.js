import * as types from './mutation-types';

export default {
  setItems({ commit }, items) {
    commit(types.SET_ITEMS, {
      items
    });
  },

  removeItem({ commit }, itemId) {
    commit(types.REMOVE_ITEM, {
      itemId
    });
  },

  setKeywords({ commit }, keywords) {
    keywords = keywords.split(' ');
    commit(types.SET_KEYWORDS, {
      keywords
    });
  },

  setSortType({ commit }, sortType) {
    commit(types.UPDATE_SORT_TYPE, {
      sortType
    });
  },

  addTag({ commit }, tag) {
    commit(types.ADD_TAG, {
      tag
    });
  },

  removeTag({ commit }, tag) {
    commit(types.REMOVE_TAG, {
      tag
    });
  }
};
