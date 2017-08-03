import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ES6Promise from 'es6-promise';

ES6Promise.polyfill();

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
