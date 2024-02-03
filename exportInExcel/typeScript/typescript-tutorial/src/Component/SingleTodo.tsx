import React, { useState } from 'react'
import { Todo } from './modal'
import { AiOutlineEdit, AiFillDelete, AiOutlineFileDone } from "react-icons/ai"
import { IoIosCloudDone } from "react-icons/io"

interface props {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ todo, todos, setTodos }: props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo?.todo);

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }

  const handleDone = (id: number) => {
    setTodos((prev) => prev.map((item) => item.id === id ? { ...item, isDone: true } : item))
  }

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((item) => item.id === id ? { ...item, todo: editText } : item)
    )

    // setTodos((prev)=>prev.map((item)=>item.id===id?{...item,todo:editText}:todo))
    setEditMode(false);
    setEditText("")
  }
  console.log(todos)
  console.log(todo, "todo")
  return (
    <form style={{ border: "1px solid black" }} onSubmit={(e) => handleSubmit(e, todo?.id)}>
      {
        editMode ? <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)} /> : <p>{todo?.todo}</p>
      }
      <div>
        <span onClick={handleEdit} >
          <AiOutlineEdit />
        </span>

        <span onClick={() => handleDelete(todo.id)} >
          <AiFillDelete />
        </span>
        {
          todo?.isDone ? <span> <IoIosCloudDone /></span> : <span onClick={() => handleDone(todo.id) }> <AiOutlineFileDone /></span> 
        }
    </div>
    </form >
  )
}
export default SingleTodo