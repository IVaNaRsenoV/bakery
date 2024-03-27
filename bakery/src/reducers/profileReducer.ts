import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
    login: string;
};

const initialState: IState = {
    login: ''
};

const profileReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginValue: (state: IState, action: PayloadAction<string>) => {
            state.login = action.payload;
        }
    }
})

export const { setLoginValue } = profileReducer.actions;
export default profileReducer.reducer;