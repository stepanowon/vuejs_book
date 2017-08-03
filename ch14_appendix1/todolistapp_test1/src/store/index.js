import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store;