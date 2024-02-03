import React, { useState } from 'react'

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [amount, setAmount] = useState(0);
    return (
        <div>
            <h4 data-testid="heading" >{counter}</h4>
            <button onClick={() => setCounter((prev) => prev + 1)}>increment</button>
            <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
            <button onClick={() => setCounter(amount)}>set</button>
        </div>
    )
}
export default Counter