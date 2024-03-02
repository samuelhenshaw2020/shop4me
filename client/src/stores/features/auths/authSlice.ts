import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthInitialState ={
    name: string,
    role: "ADMIN" | "USER" | string,
    isLoggedIn: boolean,
}

const initialState: AuthInitialState = {
    name: "",
    role: "",
    isLoggedIn: false,
} as const;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthInitialState & {token: string}>){
            state.name = action.payload.name
            state.isLoggedIn = true;
            state.role = action.payload.role;
        },
        removeAuth(state, action: PayloadAction<AuthInitialState>){
            state.name = ""
            state.isLoggedIn = false;
            state.role = "";
        },
        resetAuth: () => initialState
    }
});


export const {
    setAuth,
    removeAuth
} = authSlice.actions;

export default authSlice.reducer;