

import React from 'react'
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/auth/LoginPage';

export const AppRouter = () => {

    //const authStatus = 'not-authenticated';

    const { status, checkAuthToken } = useAuthStore();
    
    useEffect(() => {
      checkAuthToken();
    }, []);

    if( status === 'checking'){
      return (
        <h3>Cargando...</h3>
      )
    }

    return (
      <Routes>
          {
              status === 'not-authenticated' 
              ? 
                <>
                  <Route path='/auth/*' element={ <LoginPage /> } />
                  <Route path='/*' element={ <Navigate to="auth/login" /> } />
                </>
              : 
                <>
                  <Route path='/' element={ <HomePage /> } />
                  <Route path='/*' element={ <Navigate to="/" /> } />
                </>
          }

          

      </Routes>
    )
}
