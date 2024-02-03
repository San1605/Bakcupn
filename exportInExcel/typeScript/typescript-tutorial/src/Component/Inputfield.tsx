import React from 'react'
interface props{
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handleAdd:(e:React.FormEvent)=>void
}
const Inputfield:React.FC<props> = ({todo,setTodo,handleAdd}:props) => {
    
  return (
    <div>
      <input type="text" 
      value={todo}
      onChange={(e)=>setTodo(e.target.value)} 
      placeholder='Enter a task'
    />
    <button onClick={handleAdd}>GO</button>
    </div>
  )
}

export default Inputfield
