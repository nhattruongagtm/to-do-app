import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/main/addTodoSlice';

const store = configureStore({
    reducer:{
        todo: todoReducer,
    }
})

export default store;