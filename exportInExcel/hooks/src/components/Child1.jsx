import React, { useCallback, useMemo, useState } from 'react'
import GrandChild1 from './GrandChild1';
import GrandChild2 from './GrandChild2';

const Child1 = ({ handleFunc }) => {
    console.log("memo function")
    // const [count, setCount] = useState(0);
    // const [countNew, setCountNew] = useState(0);


    const [data, setData] = useState(0);

    // const handleClick = ()=>{
    //     console.log("handleclick")
    //         setCount(count + 1)
    // }


    // useCallback(() => {
    //     console.log("handleclick")
    //     setCount(count + 1)
    // }, [count])

    // const handleClickNew = () => {
    //     console.log("handleclicknew")
    //     setCountNew(countNew + 1)
    // }
    return (

        <div className='border border-black h-[25rem] w-[25rem] '>
            {/* <button onClick={handleFunc}>click child1</button> */}

            {/* <div>{count}</div>
            <div>{countNew}new</div>
            <button className='border border-black' onClick={handleClick}>click me</button>
            <button className='border border-black' onClick={handleClickNew}>click me new</button> */}
            {/* <GrandChild1 ChildFunc={handleClick} /> */}
            {/* <GrandChild2 ChildFunc={handleClickNew}/> */}

            <span>{data}</span>
            <button onClick={() => setData((prev) => prev + 1)}>change Data</button>
        </div>
    )
}
export default Child1;

