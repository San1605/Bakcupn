export const addTodo = (data) => {
    return {
        type: "ADD_TODO",
        payload: data
    }
}

export const deleteTodo = (data)=>{
    return{
        type:"DELETE_TODO",
        payload:data
    }
}

export const fetchDataSuccess=(data)=>{
    return {
        type:"FETCH_SUCCESS",
        payload:data
    }
}

export const fetchDataLoading=()=>{
    return{
        type:"FETCH_LOADING",
    }
}

export const fetchDataError=(error)=>{
    return{
        type:"FETCH_ERROR",
        payload:error
    }
}


export const fetchdata=()=>{
    return async(dispatch,getState)=>{
           dispatch(fetchDataLoading())
           try{
           const response= await fetch('https://jsonplaceholder.typicode.com/todos');
           const data = await response.json();
           dispatch(fetchDataSuccess(data))
           const currentState=getState()
            console.log(currentState,"currentState");
           }
           catch(error){
            dispatch(fetchDataError(error.message))
           }
    }
}
