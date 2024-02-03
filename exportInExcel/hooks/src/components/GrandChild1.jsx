import React from 'react'

const GrandChild1 = ({ ChildFunc }) => {
    console.log("inside grand child1")
    return (

        <div>
            <button className='border border-black' onClick={ChildFunc}>click grandchild button</button>
        </div>
    )
}

// export default React.memo(GrandChild1)
export default GrandChild1