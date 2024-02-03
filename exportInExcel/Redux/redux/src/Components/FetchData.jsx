import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchdata } from '../Redux/action';

const FetchData = () => {
    const loading=useSelector(store=>store.reducer.loading);
    const error=useSelector(store=>store.reducer.error)
    const typicodeTodos=useSelector((store)=>store.reducer.typicodeTodos)
    console.log(loading,error,typicodeTodos,"redux")
    
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(fetchdata())
    },[])

    
  return (
    <div>
    {loading ? <p>Loading...</p> : null}
    {error ? <p>Error: {error.message}</p> : null}
    <ul>
      {typicodeTodos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  </div>
  )
}

export default FetchData
