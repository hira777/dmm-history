import * as types from '@/vue/store/mutation-types';

export default {
  [types.SET_ITEMS](state, { items }) {
    state.items = items;
  },

  [types.REMOVE_ITEM](state, { itemId }) {
    state.items = state.items.filter(item => item.id !== itemId);
  },

  [types.SET_KEYWORDS](state, { keywords }) {
    state.keywords = keywords;
  }
};
