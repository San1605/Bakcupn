import { IMAGES } from "./constants"



export const loadImages=()=>{
    return{
        type:IMAGES.LOAD
    }
}


export const setImages=(images)=>{
    return{
        type:IMAGES.LOAD_SUCCESS,
        images
    }
}

export const setError=error=>({
    type:IMAGES.LOAD_FAIL,
    error
})