import Constant from '~/constant';

export default {
    [Constant.CHANGE_NO] : (state, payload) => {
        if (payload.no !== "") {
            state.no = payload.no;
        }
    }
}