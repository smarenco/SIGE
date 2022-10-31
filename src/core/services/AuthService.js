import api from "./Api";
import { useSelector } from "react-redux"
import { ACCESS_TOKEN, CONFIG, MENU, PARAMS, SESSION, USER } from "../common/consts";
import User from "../models/User";

export const AuthService = () => {

    const app = useSelector( state => state.app );
    
     const resetPassword = (Token, New_contrasenna, Repeat_contrasenna) => {
        return api
            .post('auth/reset-password', {
                Token,
                New_contrasenna,
                Repeat_contrasenna,
            });
    }

    const sendEmail = (Correo) => api.post('auth/recovery-password', { Correo });

    const login = (correo, clave) => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER);
        localStorage.removeItem(SESSION);
        localStorage.removeItem(CONFIG);
        return api
            .post('auth/login', {
                correo,
                clave,
            })
            .then(xhr => {
                let { status, response } = xhr;
                if (status === 200) {
                    api.defaults.headers.common['X-AUTH-TOKEN'] = `${response.token}`;
                    localStorage.setItem(ACCESS_TOKEN, response.token);
                    localStorage.setItem(USER, JSON.stringify(response.usuario));
                    localStorage.setItem(PARAMS, JSON.stringify(response.parametros));
                    app.session.user = response.usuario;
                    app.params = response.params;
                    if (response.menu?.length > 0) {
                        //let menu = recursiveMenu(response.menu);
                        let menu = response.menu;
                        app.menu.main = menu;
                        localStorage.setItem(MENU, JSON.stringify(menu));
                    }
                    return true;
                }
                return { status, response };
            });
    }

    /**
     * Inicia sesión a partir de un token de acceso
     * @param {string} token 
     */
    const loginByToken = token => {
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
                    api.defaults.headers.common['X-AUTH-TOKEN'] = `${response.token}`;
                    localStorage.setItem(ACCESS_TOKEN, response.token);
                    localStorage.setItem(USER, JSON.stringify(response.usuario));
                    localStorage.setItem(PARAMS, JSON.stringify(response.parametros));
                    app.session.user = response.usuario;
                    app.params = response.params;
                    if (response.menu?.length > 0) {
                        //let menu = recursiveMenu(response.menu);
                        let menu = response.menu;
                        app.menu.main = menu;
                        localStorage.setItem(MENU, JSON.stringify(menu));
                    }
                    return true;
                }
                return { status, response };
            });
    }

    const logout = () => this.checkSession().finally(forceLogout);

    const forceLogout = () => {
        // forceLogout();
        delete api.defaults.headers.common['X-AUTH-TOKEN'];
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER);
        localStorage.removeItem(SESSION);
        localStorage.removeItem(PARAMS);
        localStorage.removeItem(CONFIG);
        return new Promise(res => res());
    }

    const isLogged = () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        return !!token;
    }

    const checkSession = () => {
        return api.get('auth/check')
            .then(res => {
                if (res.status >= 300) {
                    throw Error(res?.response?.error);
                }
                const user = localStorage.getItem('user');
                if (user) {
                    app.session.user = JSON.parse(user);
                }
                // return res;
                return true;
            })
            .catch(err => {
                forceLogout();
                // this.logout();
                throw Error(err?.response?.error);
            });
    }
        

     const loadParams = () => {
        return api
            .post('auth/params')
            .then(xhr => {
                return xhr.response;
            });
    }

     const loadMenu = () => {
        return api
            .post('auth/menu')
            .then(xhr => {
                return xhr.response;
            });
    }

     const hasPermission = (IdFuncion) => {
        //return true;
        let user = JSON.parse(localStorage.getItem(USER));
        if (!user) {
            return false;
        }
        if (!Array.isArray(user.funciones) || !(user.funciones?.length > 0)) {
            return false;
        }
        if (IdFuncion === 'chkHome') {
            return true;
        }
        return user.funciones.filter(fun => fun.idFuncion === IdFuncion)?.length > 0;
    }

    /**
     * Devuleve el usuario actual
     * @returns {User}
     */
    const user = () => JSON.parse(localStorage.getItem(USER));

    return {
        //* Propiedades
        user,

        //* Metodos
        resetPassword,
        sendEmail,
        login,
        loginByToken,
        logout,
        forceLogout,
        isLogged,
        checkSession,
        loadParams,
        loadMenu,
        hasPermission,
    }
}