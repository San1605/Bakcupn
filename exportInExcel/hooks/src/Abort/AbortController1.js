import React, { useEffect, useState } from 'react'
import Components from './Components';

const AbortController1 = () => {
    const [postID, setPostID] = useState(1);
    return (
        <div>
            <div className='flex flex-row gap-5'>
            <button className='p-1 rounded-md  bg-yellow-50 border border-black' onClick={() => setPostID(1)}>See post 1</button>
            <button className='p-1 rounded-md  bg-yellow-50 border border-black' onClick={() => setPostID(2)}>See post 2</button>
            <button className='p-1 rounded-md  bg-yellow-50 border border-black' onClick={() => setPostID(3)}>See post 3</button>
            <button className='p-1 rounded-md  bg-yellow-50 border border-black' onClick={() => setPostID(4)}>See post 4</button>
            <button className='p-1 rounded-md  bg-yellow-50 border border-black' onClick={() => setPostID(5)}>See post 5</button>
            </div>
            <Components tab={postID} />
        </div>
    )
}

export default AbortController1