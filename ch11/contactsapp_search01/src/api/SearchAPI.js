import axios from 'axios';
import Constant from '../constant';

export default {
    searchContact : (name)=> {
        return axios.get(Constant.BASE_URL + name);
    }
}