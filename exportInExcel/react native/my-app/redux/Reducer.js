import { SET_USER_AGE, SET_USER_NAME, GET_CITIES } from "./Action"

const initialState = {
    name: "",
    age: 0,
    cities: []
}


function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_AGE:
            return {
                ...state,
                age: action.payload
            }
        case SET_USER_NAME:
            return {
                ...state,
                name: action.payload
            }
        case GET_CITIES:
            return {
                ...state,
                cities:action.payload
            }
          
        default:
            return state
    }
}
export default userReducer