import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../constant';
import SearchApi from '../api/SearchAPI';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        contacts : []
    },
    mutations: {
        [Constant.SEARCH_CONTACT] : (state, payload) => {
            state.contacts = payload.contacts;
        }
    },
    actions : {
        async [Constant.SEARCH_CONTACT](store, payload) {
            var response = await SearchApi.searchContact(payload.name);
            store.commit(Constant.SEARCH_CONTACT, { contacts: response.data })
        }
        // [Constant.SEARCH_CONTACT] : (store, payload)=> {
        //     SearchApi.searchContact(payload.name)
        //     .then((response)=> {
        //         store.commit(Constant.SEARCH_CONTACT, { contacts: response.data })
        //     })
        // }
    }
})

export default store;