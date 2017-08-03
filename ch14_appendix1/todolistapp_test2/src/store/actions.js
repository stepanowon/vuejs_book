import Constant from '../constant';

export default {
    [Constant.ADD_TODO] : ({ state, commit }, payload) => {
        commit(Constant.ADD_TODO, payload);
    },
    [Constant.DELETE_TODO] : (store, payload) => {
        store.commit(Constant.DELETE_TODO, payload);
    },
    [Constant.DONE_TOGGLE] : (store, payload) => {
        store.commit(Constant.DONE_TOGGLE, payload);
    }
}