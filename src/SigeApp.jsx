
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './core/router/AppRouter'
import { store } from './core/store/store'

export const SigeApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}