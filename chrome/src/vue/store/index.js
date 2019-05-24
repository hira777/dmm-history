import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/vue/store/getters';
import mutations from '@/vue/store/mutations';
import actions from '@/vue/store/actions';
// import dummyItems from './_dummyItems';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    items: [],
    keywords: []
  },
  getters,
  mutations,
  actions
});
