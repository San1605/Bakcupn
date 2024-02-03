import React, { useState } from 'react'

const GrandChild2 = ({ChildFunc}) => {
    const [childCount,setChildCount]=useState(0);

    console.log("inside grand child2")
    return (
        <div>
            <div>{childCount}</div>
            <button className='border border-black' onClick={()=>setChildCount((prev)=>prev+1)}> grand child 2 button</button>
            <button className='border border-black' onClick={ChildFunc}>to change count new in parent</button>
        </div>
    )
}

export default React.memo(GrandChild2)
