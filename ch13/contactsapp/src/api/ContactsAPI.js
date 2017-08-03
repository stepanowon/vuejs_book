import CONF from '../Config.js';
import axios from 'axios';

export default {
    fetchContacts : function(pageno, pagesize) {
        return axios.get(CONF.FETCH, {
            params : { 
                pageno: pageno, 
                pagesize: pagesize 
            } 
        })
    },
    fetchContactOne : function(no) {
        return axios.get(CONF.FETCH_ONE.replace("${no}", no))
    },
    addContact : function(contact) {
        return axios.post(CONF.ADD,  contact);
    },
    updateContact : function(contact) {
        return axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
    },
    deleteContact : function(no) {
        return axios.delete(CONF.DELETE.replace("${no}", no))
    },
    updatePhoto : function(no, file) {
        var data = new FormData();
        data.append('photo', file);

        return axios.post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
    }
}