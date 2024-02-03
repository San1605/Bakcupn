import React, { useEffect, useState } from 'react'
let sum = 0;
const Child2 = ({ nums, setNums }) => {

    return (
        <div className='border border-black h-[25rem] w-[25rem] '>
            <div>{nums}</div>
            <button className='border border-black' onClick={() => setNums((prev)=>prev + 1)}>click me </button>
        </div>
    )
}

export default Child2
