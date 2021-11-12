import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
    name:'status',
    initialState : false,
    reducers:{
        updateStatus(state,action){

            state = true;
        },
    }
})

export const {reducer,actions} = addSlice;

export const {updateStatus} = actions;

export default reducer;

