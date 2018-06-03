import * as types from './mutation-types';

export default {
  [types.SET_ITEMS](state, { items }) {
    state.items = items;
  },

  [types.REMOVE_ITEM](state, { itemId }) {
    state.items = state.items.filter(item => item.id !== itemId);
    chrome.storage.local.set({ dmmItems: state.items });
  },

  [types.UPDATE_SORT_TYPE](state, { sortType }) {
    for (const key in state.sortType) {
      if (state.sortType.hasOwnProperty(key)) {
        state.sortType[key] = false;
      }
    }
    state.sortType[sortType] = true;
  },

  [types.SET_KEYWORDS](state, { keywords }) {
    state.keywords = keywords;
  },

  [types.ADD_TAG](state, { tag }) {
    state.tags.push(tag);
  },

  [types.REMOVE_TAG](state, { tag }) {
    const index = state.tags.findIndex(_tag => _tag === tag);

    if (index > -1) {
      state.tags.splice(index, 1);
    }
  },
};
