import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
    auth: boolean;
};

const initialState: IState = {
    auth: false
};

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state: IState, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
        }
    }
})

export const { setAuth } = authReducer.actions;
export default authReducer.reducer;