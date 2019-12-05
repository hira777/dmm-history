import Vue, { VNode } from 'vue';
import store from './store/index';
import App from './App.vue';

new Vue({
  el: '#app',
  render: (h): VNode => h(App),
  store
});
