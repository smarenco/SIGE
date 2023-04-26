import { useDispatch, useSelector } from "react-redux"
import { ACCESS_TOKEN, MENU, USER } from "../common/consts";
import api from "../services/Api";

import { clearErrorMessage, onChecking, onLogin, onLogout, onRecoveryPassword } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async ({ username, password }) => {
        dispatch(onChecking());

        try {
            const { response } = await api.post('/auth/login', { username, password })

            localStorage.setItem(ACCESS_TOKEN, response.data.token);
            api.defaults.headers.common['X-US-AUTH-TOKEN'] = response.data.token;
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem(USER, JSON.stringify(response.data.user));
            localStorage.setItem(MENU, JSON.stringify(response.data.menu));

            dispatch(onLogin({ name: response.data.user.names, uid: response.data.user.id }));

        } catch (err) {
            console.log(err)
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => dispatch(clearErrorMessage()), 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) return dispatch(onLogout());

        try {
            //const { data } = await api.get('/auth/renew');

            //localStorage.setItem(ACCESS_TOKEN, token);
            //localStorage.setItem('token-init-date', new Date().getTime());
            const user = localStorage.getItem(USER);

            dispatch( onLogin( { name: user.names, uid: user.id} ) );

        } catch (err) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    const startRecoveryPassword = async ({ username }) => {
        const { data } = await api.post('/auth/recovery-password', { username })
        dispatch(onRecoveryPassword());
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos
        startLogin,
        checkAuthToken,
        startLogout,
        startRecoveryPassword
    }
}