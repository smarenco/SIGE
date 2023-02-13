import { useDispatch, useSelector } from "react-redux"
import sigeApi from "../api/sigeApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onRecoveryPassword } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async ({ username, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await sigeApi.post('/auth/login', { username, password })

            localStorage.setItem('token', data.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            //resolver porque la desestructuración de la response en data, no se queda con data y hay que hacer data.data
            dispatch(onLogin({ name: data.data.user.names, uid: data.data.user.id }));

        } catch (err) {
            console.log(err)
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => dispatch(clearErrorMessage()), 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await sigeApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin( { name: data.name, uid: data.uid} ) );

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
        const { data } = await sigeApi.post('/auth/recovery-password', { username })
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