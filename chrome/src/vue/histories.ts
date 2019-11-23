import Vue from 'vue';
import store from './store/index.ts';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
  store
});
