import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../constant';
import module1 from './module1'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        keywordlist : []
    },
    mutations: {
        [Constant.ADD_KEYWORD] : (state, payload) => {
            state.keywordlist.splice(0, 0, payload.name);
        }
    },
    actions : {
        [Constant.ADD_KEYWORD] : (store, payload)=> {
            store.commit(Constant.ADD_KEYWORD, payload);
        }        
    },
    modules : { m1 : module1 }
})

export default store;