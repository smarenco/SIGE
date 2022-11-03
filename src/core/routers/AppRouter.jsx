import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { APP_PATH } from '../../env';
import { useAuthStore } from '../hooks/useAuthStore';
import DefaultLayout from '../layouts/DefaultLayout';
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
        <h3>Cargando...</h3>
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
            {/* {
            status === 'not-authenticated' 
            ?
                <Routes>
                    <Route path='/auth/*' element={ <LoginPage /> } />
                    <Route path='/*' element={ <Navigate to="auth/login" /> } />
                </Routes>
            : */}
                <div className="app">
                    
                    <Routes>
                        {renderPrivateRoutes(app.routes, 1)}
                        <Route path='/*' element={ <Navigate to="/" /> } />
                    </Routes>
                </div>   
            {/* } */}
        </div>
    )
}

