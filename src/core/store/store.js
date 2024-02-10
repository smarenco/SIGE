import { configureStore } from "@reduxjs/toolkit";
import { appStore } from "./app/appStore";



export const store = configureStore({
    reducer: {
        app:         appStore.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})