import Constant from '../constant';
import CONF from '../Config.js';

export default {
    currentView : null, 
    mode : 'add',
    contact : { no:0, name:'', tel:'', address:'', photo:'' },
    contactlist : {
        pageno:1, pagesize: CONF.PAGESIZE, totalcount:0, contacts:[]
    }
}