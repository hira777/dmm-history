import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import chromeStorageUpdater from '../plugins/chromeStorageUpdater';

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
  plugins: [chromeStorageUpdater],
});
