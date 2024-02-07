import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { APP_PATH } from '../../env';
import { ACCESS_TOKEN, MENU } from '../common/consts';
import Loading from '../components/common/Loading';
import DefaultLayout from '../layouts/DefaultLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { checkSession } from '../services/AuthService';
import "./App.css";
export const AppRouter = () => {

    const token = localStorage.getItem(ACCESS_TOKEN);
    const [isLoaded, setIsLoaded] = useState(false);
    const app = useSelector( state => state.app );

    useEffect(() => {
        checkSessionLocal();
    }, []);

    async function checkSessionLocal () {
        if (!window.location.pathname.startsWith('/auth')) {
            try {
                const resp = await checkSession();
                setIsLoaded(true);
            }catch(err){}
        } else {
            setIsLoaded(true);
        }
    }

    if(!isLoaded){
      return (
        <Loading message='Comprobando información...' size={70} />
      )
    }

    const renderPrivateRoutes = (j) => {
        const routes = JSON.parse(localStorage.getItem(MENU));
        let r = routes.map((r, i) => {
            const route = app.routes.filter(route => route.key === r.key)[0];
            if (route && route.isPublic !== true) {
                return <Route key={i + j} path={`${APP_PATH}${route.path}`} route={route} exact element={ <DefaultLayout component={<route.component />} app={app} /> } />;
            }
        });
        return r;
    }

    return (
        <div className="appRouter">
            {
            !token 
            ?
                <Routes>
                    <Route path='/auth/login' element={ <LoginPage /> } />
                    <Route path='/auth/register' element={ <RegisterPage /> } />
                    <Route path='/auth/resetPassword' element={ <ResetPasswordPage type='reset' /> } />
                    <Route path='/auth/recoveryPassword' element={ <ResetPasswordPage type='recovery' /> } />
                    <Route path='/*' element={ <Navigate to="auth/login" /> } />
                </Routes>
            : 
                <div className="app">
                    
                    <Routes>
                        {renderPrivateRoutes(1)}
                        <Route path='/*' element={ <Navigate to="/" /> } />
                        <Route path='/auth/login' element={ <LoginPage /> } />
\\                    </Routes>
                </div>   
            }
        </div>
    )
}

