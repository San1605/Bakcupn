import React, { useContext } from 'react'
import { myContext } from './ContextProvider'

const Component = () => {
    const { counter, dispatch } = useContext(myContext)
    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
        </div>
    )
}
export default Component