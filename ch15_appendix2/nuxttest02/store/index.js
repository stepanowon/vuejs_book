import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';

const store = () => {
    return new Vuex.Store({
        state, 
        getters,
        mutations
    })
}

export default store