import Vue from 'vue';
import Vuex from 'vuex';
import History from '@/vue/store/modules/history';

Vue.use(Vuex);

interface StoreType {
  history: History;
}

export default new Vuex.Store<StoreType>({});
