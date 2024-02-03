import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo } from '../ReduxTookit/TodoSlice';

const TodoToolkit = () => {
    const dispatch= useDispatch();
    const todos = useSelector((state)=>state.todo.todos)
    const [inputTodo,setInputTodo]= useState("");
    return (
        <div>
            <div>
                <input className='border border-black' type="text" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
                <button className='border border-black' onClick={() => {
                    if (inputTodo.length > 0) {
                       dispatch(addTodo(inputTodo))
                        setInputTodo("")
                    }
                }}>add todo</button>
            </div>
            <div>
                {todos?.map((item, index) => {
                    return (
                        <div className='flex flex-row' key={index}>
                            <li>{item}</li>
                            <button className='border border-red-500' onClick={() => dispatch(deleteTodo(item))}>delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TodoToolkit
