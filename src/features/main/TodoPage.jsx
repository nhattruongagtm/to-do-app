import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { addTodo, updateItem } from './addTodoSlice';
import ItemTodo from './ItemTodo';


export default function TodoPage() {

    const dispatch = useDispatch();
    const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

    const [value,setValue] = useState(new Date());
    const [filter,setFilter] = useState(2);
    const [add,setAdd] = useState('');
    const [edit,setEdit] = useState({
        id: '',
        name: '',
        status: false
    });
    const [search,setSearch] = useState('');
    const [sort,setSort] = useState(0);
    const [status,setStatus] = useState(false);


    // toogle
    const[toogleSearch,setToogleSearch] = useState(false);
    const[toogleFilter,setToogleFilter] = useState(false);
    const[toogleSort,setToogleSort] = useState(false);


    const handleChangeAdd = (e) =>{
        const value = e.target.value;
       
        if(status === false){
            setAdd(value);
        }
        else{
            setEdit({
                ...edit,
                name: e.target.value
            });
        }
    }

    const onSubmitAddTodo = (e) =>{
        e.preventDefault();

        if(status===false){
            if(add.toString().trim().length>0){
                dispatch(addTodo(add));
                setAdd('');
            }
        }
        else{
            if(edit.name.toString().trim().length>0){
                dispatch(updateItem(edit));
                setEdit(
                    {
                        id: '',
                        name: '',
                        status: false
                    }
                );
                setStatus(false);
            }
        }
    }

    let list = todos;

    const handleFilter = (value) =>{
        if(value === 1){
            setFilter(1)
        }
        else if(value === 0){
            setFilter(0)
        }
        else{
            setFilter(2)
        }
    }
    
    if(filter === 1) {
        list = todos.filter((item) =>{
            return item.status === true;
        })
    }
    else if(filter === 0){
        list = todos.filter((item) =>{
            return item.status === false;
        })
    }
    const handleOnChangeSearch = (e) =>{
        setSearch(e.target.value);
    }

    if(search !== ''){
        list = list.filter((item)=>{
            return item.name.indexOf(search) !== -1;
        });
    }

    const handleSort = (value) =>{
        setSort(value);
    }

    if(sort===-1){
        list = list.sort((a,b)=>{
            if (a.name < b.name){
                return 1;
            }
            else if(a.name > b.name){
                return -1;
            }
            else {
                return 0;
            }
        })
    }
    else if(sort === 1){
        list = list.sort((a,b)=>{
            if (a.name > b.name){
                return 1;
            }
            else if(a.name < b.name){
                return -1;
            }
            else {
                return 0;
            }
        })
    }

    const handleGetItemEdit = (item) =>{
        setStatus(true);
        setEdit(item)
    }
    // thay đổi value khi chuyển đổi add và update
    const val = status === false ? add : edit.name;

    const handleToogleSearch = () =>{
        setToogleSearch(!toogleSearch);
    }
    const handleToogleFilter = () =>{
        setToogleFilter(!toogleFilter);
    }
    const handleToogleSort = () =>{
        setToogleSort(!toogleSort);
    }



    return (
        <div className="todo">
            <form className="todo__header" onSubmit={onSubmitAddTodo}>
                <div className="todo__header--rounded">

                    <input 
                    className="todo__header--rounded--add outline input" 
                    type='text'
                    value = {val} 
                    onChange={handleChangeAdd} 
                    placeholder="add a new task..."
 
                    />
                </div>
                <button className="todo__header--btnAdd outline" type='submit'>
                        {status === false ? `Add task` : `Update`}
                </button>
            </form>
            
            <div className="scroll">
            <ul className="todo__options">
                {
                    toogleSearch ? <form className="todo__options--item todo__options--input--search display-noane">
                                        <input type="text" className="outline input" value={search} onChange={handleOnChangeSearch} placeholder="search tasks..." />
                                    </form> : ''
                }
                <li className="todo__options--item" onClick={handleToogleSearch}>
                    <i className="fas fa-search"></i>
                </li>
                <li className="todo__options--item" onClick={handleToogleFilter}>
                    <i className="fas fa-filter"></i>
                </li>
                {toogleFilter ? 
                    <li className="todo__options--item todo__options--filters display-noane">
                        <div className="todo__options--filters--item" onClick={()=>handleFilter(1)}>
                               <span>Accomplished</span>
                                <i class="fas fa-check-circle"></i>
                        </div>
                        <div className="todo__options--filters--item" onClick={()=>handleFilter(0)}>
                                <span>Unfinished</span>
                                <i class="far fa-check-circle"></i>
                        </div>
                        <div className="todo__options--filters--item" onClick={()=>handleFilter(2)}>
                               <span>All</span>
                                <i className="fas fa-filter"></i>
                        </div>
                    </li>
                    : ''
                }
                <li className="todo__options--item" onClick={handleToogleSort}>
                    <i className="fas fa-sort"></i>
                </li>
                {
                    toogleSort ?
                    <li className="todo__options--item todo__options--filters display-noane">
                        <div className="todo__options--filters--item" onClick={()=> handleSort(1)}>
                                <span>A-Z</span>
                                <i class="fas fa-sort-alpha-down"></i>
                        </div>
                        <div className="todo__options--filters--item" onClick={()=> handleSort(-1)}>
                                <span>Z-A</span>
                                <i class="fas fa-sort-alpha-down-alt"></i>
                        </div>
                    </li>
                    : ''
                }
               
            </ul>

            </div>
            <div className="todo__main">
                <div className="todo__main--list">
                    <div className="todo__main--list--todos">
                        {list.map((item,index)=>{ 
                            return (
                                <ItemTodo key={index} item={item} editItem={handleGetItemEdit}/>
                            )
                        })}
                     
                    </div>
                </div>
                <div className="todo__main--calendar">
                    <Calendar className="calendar"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            
        </div>
    )
}
