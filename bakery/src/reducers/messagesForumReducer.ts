import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
    msg: string[]
};

const initialState: IState = {
    msg: []
}

const messagesForumReducer = createSlice({
    name: "messages from socket",
    initialState,
    reducers: {
        setMsg: (state: IState, action: PayloadAction<string>) => {
            state.msg = state.msg.concat(action.payload);
        }
    }
});

export default messagesForumReducer.reducer;
export const { setMsg } = messagesForumReducer.actions;