import api from "./Api";
import { ACCESS_TOKEN, CONFIG, MENU, PARAMS, SESSION, USER } from "../common/consts";
import User from "../models/User";

export const resetPassword = (token, new_password, repeat_password) => {
    return api
        .post('auth/reset-password', {
            token,
            new_password,
            repeat_password,
        });
}

export const recoveryPassword = (username) => api.post('auth/recovery-password', { username });

export const login = async (username, password) => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(SESSION);
    localStorage.removeItem(CONFIG);

    const { response } = await api.post('/auth/login', { username, password })

    localStorage.setItem(ACCESS_TOKEN, response.data.token);
    api.defaults.headers.common['X-US-AUTH-TOKEN'] = response.data.token;
    localStorage.setItem('token-init-date', new Date().getTime());
    localStorage.setItem(USER, JSON.stringify(response.data.user));
    localStorage.setItem(MENU, JSON.stringify(response.data.menu));
    if (response.menu?.length > 0) {
        let menu = response.menu;
        localStorage.setItem(MENU, JSON.stringify(menu));
    }
    window.location.href = '/'; 
}

/**
 * Inicia sesión a partir de un token de acceso
 * @param {string} token 
 */
export const loginByToken = token => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(SESSION);
    localStorage.removeItem(CONFIG);
    return api
        .post('auth/login-by-token', {
            token,
        })
        .then(xhr => {
            let { status, response } = xhr;
            if (status === 200) {
                api.defaults.headers.common['X-US-AUTH-TOKEN'] = `${response.token}`;
                localStorage.setItem(ACCESS_TOKEN, response.token);
                localStorage.setItem(USER, JSON.stringify(response.usuario));
                localStorage.setItem(PARAMS, JSON.stringify(response.parametros));
                if (response.menu?.length > 0) {
                    let menu = response.menu;
                    localStorage.setItem(MENU, JSON.stringify(menu));
                }
                return true;
            }
            return { status, response };
        });
}

export const forceLogout = () => {
    delete api.defaults.headers.common['X-US-AUTH-TOKEN'];
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(SESSION);
    localStorage.removeItem(PARAMS);
    localStorage.removeItem(CONFIG);
    window.location.href = '/auth/login';
}

export const isLogged = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return !!token;
}

export const checkSession = async () => {
    /*try {
        const res = await api.get('auth/check')
        if (res.status >= 300) {
            throw Error(res?.response?.error);
        }
    }
    catch(err){
        forceLogout();
        throw Error(err?.response?.error);
    }*/

    return true;
}
    

export const loadParams = async () => {
    const { response } =  await api.post('auth/params');
    return response;
}

export const loadMenu = async () => {
    const { response } =  await api.post('auth/menu');
    return response;
}

export const hasPermission = (IdFuncion) => {
    return true;
    // let user = JSON.parse(localStorage.getItem(USER));
    // if (!user) {
    //     return false;
    // }
    // if (!Array.isArray(user.funciones) || !(user.funciones?.length > 0)) {
    //     return false;
    // }
    // if (IdFuncion === 'chkHome') {
    //     return true;
    // }
    // return user.funciones.filter(fun => fun.idFuncion === IdFuncion)?.length > 0;
}

/**
 * Devuleve el usuario actual
 * @returns {User}
 */
export const user = () => JSON.parse(localStorage.getItem(USER));