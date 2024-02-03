import React, { createContext, useReducer } from 'react'
import Reducer from './Reducer';

export const myContext = createContext();
const initialState = {
    counter: 0
};

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <myContext.Provider value={{
            counter: state.counter,
            dispatch
        }}>
            {children}
        </myContext.Provider>
    )
}

export default ContextProvider
