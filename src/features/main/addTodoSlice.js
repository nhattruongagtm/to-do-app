import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

export const randomID = () =>{
    return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
}

const addSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo(state, action){

            state.push(
                {
                    id: randomID(),
                    name: action.payload,
                    status: false
            });

            localStorage.setItem('todos',JSON.stringify(state));
        },

        deleteTodo(state, action){

            const index = state.findIndex((item)=>{
                return action.payload === item.id;
            });
            
            state.splice(index,1);

            localStorage.setItem('todos',JSON.stringify(state));
        },
        updateStatus(state,action){

            const index = state.findIndex((item)=>{
                return action.payload === item.id;
            }); 

            state[index].status = !state[index].status;

            localStorage.setItem('todos',JSON.stringify(state));
        },
        updateItem(state,action){
            const index = state.findIndex((item)=>{
                return action.payload.id === item.id;
            }); 

            state[index] = action.payload;

            localStorage.setItem('todos',JSON.stringify(state));
            

        }
    }
})

export const {reducer,actions} = addSlice;

export const {addTodo,deleteTodo,updateItem,updateStatus} = actions;


export default reducer;

