import axios from "axios";
import { API_URL } from "../../env";
import { ACCESS_TOKEN } from "../common/consts";
import { AuthService } from "./AuthService";

//const { forceLogout } = AuthService();

const instance = axios.create({
    baseURL: API_URL,
    validateStatus: status => status < 400,
});

const handleSuccess = response => {
    return {
        status: response.status,
        response: response.data,
    };
}

const handleError = error => {
    if (error && error.response && error.response.status === 401) {
        AuthService().forceLogout();
    }
    if (error.message === 'Network Error') {
        return Promise.reject({ message: 'Se ha perdido la conexión con el servidor. Por favor, vuelva a intentarlo' });
    }
    if (error.response !== undefined) {
        return Promise.reject({
            status: error.response.status,
            response: error.response.data,
        });
    }
    return Promise.reject(error);
}

instance.interceptors.response.use(handleSuccess, handleError);

const access_token = localStorage.getItem(ACCESS_TOKEN);
if (typeof access_token === 'string') {
    instance.defaults.headers.common['X-FS-AUTH-TOKEN'] = access_token;
}

export default instance;