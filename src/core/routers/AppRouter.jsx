import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { APP_PATH } from '../../env';
import { MENU } from '../common/consts';
import Loading from '../components/common/Loading';
import { useAuthStore } from '../hooks/useAuthStore';
import DefaultLayout from '../layouts/DefaultLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import "./App.css";
export const AppRouter = () => {

    //const authStatus = 'not-authenticated';

    const { status, checkAuthToken } = useAuthStore();
    const app = useSelector( state => state.app );

    useEffect(() => {
      checkAuthToken();
    }, []);

    if( status === 'checking'){
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
            status === 'not-authenticated' 
            ?
                <Routes>
                    <Route path='/auth/login' element={ <LoginPage /> } />
                    <Route path='/auth/register' element={ <RegisterPage /> } />
                    <Route path='/auth/resetPassword' element={ <ResetPasswordPage type='recovery' /> } />
                    <Route path='/*' element={ <Navigate to="auth/login" /> } />
                </Routes>
            : 
                <div className="app">
                    
                    <Routes>
                        {/*renderPrivateRoutes(app.routes, 1)*/}
                        {renderPrivateRoutes(1)}
                        <Route path='/*' element={ <Navigate to="/" /> } />
                    </Routes>
                </div>   
            }
        </div>
    )
}

