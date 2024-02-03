import React from 'react'
import { Todo } from './modal'
import SingleTodo from './SingleTodo'
interface props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList = ({ todos, setTodos}: props) => {
    return (
        <div>
            {
                todos?.map((item)=>(
                   <SingleTodo todo={item} todos={todos} setTodos={setTodos} />
                ))
            }
        </div>
    )
}

export default TodoList
