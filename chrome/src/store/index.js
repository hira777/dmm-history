import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import { ROOT_KEY, HISTORIES_KEY } from '../config';

const chromeStorage = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'REMOVE_ITEM') {
      const entity = {};

      entity[ROOT_KEY] = {};
      entity[ROOT_KEY][HISTORIES_KEY] = state.items;
      chrome.storage.local.set(entity);
    }
  });
};

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    items: [],
    keywords: [],
    sortType: {
      recent: true,
      favoriteCount: false,
    },
    tags: [],
  },
  getters,
  mutations,
  actions,
  plugins: [chromeStorage],
});
