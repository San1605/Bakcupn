import React from 'react'
import { CounterProps } from './Counter2Props'

const Counter2 = (props:CounterProps ) => {
  return (
    <div>
      <h2>Counter 2</h2>
      <p>{props.count}</p>
      {
        props.handleIncrement&&(
            <button onClick={props.handleIncrement}>increment</button>
        )
      }
      {
        props.handleDecrement&&(
            <button onClick={props.handleDecrement}>decrment</button>
        )
      }
    </div>
  )
}

export default Counter2
