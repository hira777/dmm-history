import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/vue/store/getters';
import mutations from '@/vue/store/mutations';
import actions from '@/vue/store/actions';
// import dummyItems from './_dummyItems';

import { StoreState } from '@/vue/store/storeType';

Vue.use(Vuex);

const state: StoreState = {
  items: [],
  keywords: []
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
});
