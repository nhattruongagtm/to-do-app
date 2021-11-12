import React from 'react'
import { deleteTodo,updateStatus,updateItem } from './addTodoSlice';
import { useDispatch } from 'react-redux';

export default function ItemTodo(props) {

    const {item} = props
    let checked = 'far fa-check-circle';

    if(item.status){
        checked = 'far fa-check-circle checked';
    }

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    }

    const handleUpdateStatus = (id) =>{
        dispatch(updateStatus(id));
    }

    const handleUpdateItem = (item) =>{
        // dispatch(updateItem(id));
        props.editItem(item);
        
    }

    return (
        <div className="todo__main--list--item">
            <i className={checked} onClick={() => handleUpdateStatus(item.id)}></i>
            <div className="todo__main--list--item--title">{item.name}</div>
            <i className="fas fa-trash-alt" onClick={() => handleDelete(item.id)}></i>
            <i className="fas fa-edit" onClick={() => handleUpdateItem(item)}></i>
        </div>
    )
}
