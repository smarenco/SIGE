import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { APP_PATH } from '../../env';
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
        <Loading message='Comprobando información...' />
      )
    }

    const renderPrivateRoutes = (routes, j) => {
        let r = routes.map((route, i) => {
            if (route.isPublic !== true) {
                return <Route key={i + j} path={`${APP_PATH}${route.path}`} route={route} exact element={ <DefaultLayout component={<route.component />} app={app} /> } />;
                //return <DefaultLayout key={i + j} path={`${APP_PATH}${route.path}`} route={route} exact component={route.component} app={this.props.app} />;
            }
            //return <PublicLayout key={i + j} path={`${APP_PATH}${route.path}`} route={route} exact component={route.component} app={this.props.app} />;
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
                        {renderPrivateRoutes(app.routes, 1)}
                        <Route path='/*' element={ <Navigate to="/" /> } />
                    </Routes>
                </div>   
            }
        </div>
    )
}

