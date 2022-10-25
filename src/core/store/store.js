import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { appStore } from "./app/appStore";



export const store = configureStore({
    reducer: {
        auth:       authSlice.reducer,
        app:         appStore.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})