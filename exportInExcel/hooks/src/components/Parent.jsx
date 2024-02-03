import React, { useCallback, useState } from 'react'
import Child1 from './Child1'
import Child2 from './Child2'

const Parent = () => {
    console.log("this is parent function")
    // const [nums, setNums] =useState(0);


    const handleFunc=useCallback(()=>{
        console.log("this is a fucntion")
    },[])

  return (
    <div className='flex items-center justify-center '>
        {/* <span>{nums}</span>
    <button onClick={()=>setNums((prev)=>prev+1)}>click parent </button> */}

      <Child1 handleFunc={handleFunc} />

      {/* <Child2 nums={nums} setNums={setNums}/> */}
    </div>
  )
}

export default Parent
