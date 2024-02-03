import React, { useState } from 'react'
import { addTodo, deleteTodo } from '../Redux/action';
import { useDispatch, useSelector } from "react-redux"
const Todo = () => {
  const dispatch = useDispatch();
  const todo = useSelector((store) => store.reducer.todos)
  const [inputTodo, setInputTodo] = useState("");
 
  return (
    <div>
      <div>
        <input className='border border-black' type="text" value={inputTodo} 
        onChange={(e) => setInputTodo(e.target.value)} />
        <button  className='border border-black' onClick={() => {
          if(inputTodo.length>0){
            dispatch(addTodo(inputTodo))
            setInputTodo("")
          }
        }}>add todo</button>
      </div>
      <div>
        {todo?.map((item, index) => {
          return (
            <div className='flex flex-row' key={index}>
              <li>{item}</li>
              <button className='border border-red-500'
               onClick={()=>dispatch(deleteTodo(item))}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Todo
