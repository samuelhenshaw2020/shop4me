import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/auths/authSlice"
import walletReducer from "./features/wallets/walletSlice"


export const store = configureStore({
    reducer: {
        "auth": authReducer,
        "wallet": walletReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


