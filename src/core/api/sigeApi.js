import axios from 'axios';
import { API_URL_BASE } from '../../env';

const sigeApi = axios.create({
    baseURL: API_URL_BASE
})

//cada vez que se invoque una request de sige api se setea el header.
sigeApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
})

console.log(localStorage.getItem('token'))

export default sigeApi;