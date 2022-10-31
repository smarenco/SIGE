import { useDispatch, useSelector } from "react-redux"
import sigeApi from "../api/sigeApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {    

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );

        console.log({ email, password })
        try {
            //const { data } = await sigeApi.post('/auth', { email, password })

            //localStorage.setItem('token', data.token);
            localStorage.setItem('token',  'wtrewr36534fg3453');
            localStorage.setItem('token-init-date', new Date().getTime());

            //dispatch( onLogin( { name: data.name, uid: data.uid} ) );
            dispatch( onLogin( { name: 'Santiago', uid: 123} ) );
            
        } catch (err) {
            console.log(err)
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => dispatch( clearErrorMessage() ), 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        
        if( !token ) return dispatch( onLogout() );

        try {
            const { data } = await sigeApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin( { name: data.name, uid: data.uid} ) );

        } catch (err) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLoguot = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //* Metodos
        startLogin,
        checkAuthToken,
        startLoguot
    }
}