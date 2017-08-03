export default {
    getContactOne(state) {
        var no = state.no;
        var arr = state.contacts.filter(function(item, index) {
            return item.no == no;
        });
        if (arr.length == 1)   return arr[0];
        else   return {};
    },
    getContacts(state) {
        return state.contacts;
    }
}