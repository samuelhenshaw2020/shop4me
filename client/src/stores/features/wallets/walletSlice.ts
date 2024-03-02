import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    amount: number,
    locked: boolean
}

const initialState: InitialState = {
    amount: 0,
    locked: false
} as const;

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        credit(state, action: PayloadAction<number>){
           state.amount = action.payload;
        },
        debit(state, action: PayloadAction<number>){
           state.amount = action.payload;
        },
        resetWallet: () => initialState
    }
});


export const {
    debit,
    credit
} = walletSlice.actions;

export default walletSlice.reducer;