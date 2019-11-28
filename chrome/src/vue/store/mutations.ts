import types from '@/vue/store/mutation-types';

import { Mutations } from '@/vue/store/types';
import { StoreState, StoreMutations } from '@/vue/store/storeType';

const mutations: Mutations<StoreState, StoreMutations> = {
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

export default mutations;
