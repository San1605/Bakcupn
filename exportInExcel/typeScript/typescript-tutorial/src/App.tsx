import React, { useState } from 'react';
import Inputfield from './Component/Inputfield';
import { Todo } from './Component/modal';
import TodoList from './Component/TodoList';

const App: React.FC = () => {

  //   let name: string;
  //   let age: number;
  //   let isStudent: boolean;
  //   let hobbies: string[];
  //   let role: [number, string];
  //   let id: number | string /// both
  //   type Person = {
  //     name: string,
  //     age?: number  // ? it is optional now 
  //   }

  //   let person: Person = {
  //     name: "sandesh",
  //     age: 22
  //   }

  //   let persons: Person[];


  //   let printName: (name: string) => void


  // // if we dont know what will be the type of variable then it is better to use unknown instead of any

  // let variable:unknown;


  // let printFunc :(name:string)=>never
  // // void returns undefined but never does not return anything



  // interface

  // interface Guy{
  //   name:string,
  //   age:number
  // }

  // interface Employer extends Guy{
  //   profession:string
  // }

  // type x= y&{

  // }

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
    setTodo("");
  }
  return (
    <div className="App">
      <span>demo</span>
      <Inputfield todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
