import Constant from '../constant';

export default {
    [Constant.ADD_TODO] : (state, payload) => {
        if (payload.todo !== "") {
            state.todolist.push({ todo : payload.todo, done:false });
        }
    },
    [Constant.DONE_TOGGLE] : (state, payload) => {
        state.todolist[payload.index].done = !state.todolist[payload.index].done;
    },
    [Constant.DELETE_TODO] : (state,payload) => {
        state.todolist.splice(payload.index,1);
    }
}