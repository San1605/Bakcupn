const SET_USER_NAME = "SET_USER_NAME"
const SET_USER_AGE = "SET_USER_AGE"
const GET_CITIES = "GET_CITIES";


export const getData = () => {
    return async dispatch => {

        const res = await fetch('https://fakestoreapi.com/products', {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })

        const json = await res.json()
        
        if (json) {
            dispatch({
                type: GET_CITIES,
                payload: json.title
            })
        }
        else {
            console.log("unable to fetch")
        }
    }
}
export const setName = (name) => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: name
    })
}

export const setAge = (age) => dispatch => {
    dispatch({
        type: SET_USER_AGE,
        payload: age
    })
}