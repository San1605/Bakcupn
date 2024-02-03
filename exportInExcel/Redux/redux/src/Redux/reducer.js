const initialState = {
    todos: [],
    typicodeTodos:[],
    error:"",
    loading:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }

        case "DELETE_TODO":
            return {
                ...state,
                todos:state.todos.filter((data)=> data!==action.payload)
            }

        case "FETCH_SUCCESS":
            return{
               ...state,
               loading:false,
               typicodeTodos:action.payload
            }    
        case "FETCH_ERROR":{
            return{
                ...state,
                error:action.payload
            }
        }

        case "FETCH_LOADING":{
            return{
                ...state,
                loading:true,
                typicodeTodos:[]
            }
        }
            
        default:
            return state
    }
}
export default reducer