import React, { useEffect, useState } from 'react'
import Components from './Components';

const AbortController = () => {
    const [postID, setPostID] = useState(1);
    
    const [state, setState] = useState([]);
    useEffect(() => {
        const abortController = new window.AbortController();

        fetch(`https://dummyjson.com/posts/${postID}`,{
            signal:abortController.signal
        })
            .then((res) => {
                if (res.status === 200) {
                        return res.json()
                }
                else {
                    return Promise.reject();
                }
            })
            .then((data) => {
                setState(data)
                 console.log(data)
            })
            .catch(()=>{
                if(abortController.signal.aborted){
                    console.log("user declined the request")
                }
                else{
                    console.log("request failed")
                }
            })
            return()=>{
                abortController.abort();
            }

    }, [postID])



    // using variable but it is not efficient because it is not stopping api call
    // useEffect(() => {
    //     let didCancel=false;
    //     fetch(`https://dummyjson.com/posts/${postID}`)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 if(!didCancel){
    //                     return res.json()
    //                 }
    //             }
    //             else {
    //                 return Promise.reject();
    //             }
    //         })
    //         .then((data) => {
    //             setState(data)
    //             console.log(data)
    //         })

    //         return()=>{
    //             didCancel=true;
    //         }

    // }, [postID])


    return (
        <div>
            {/* <div>{state?.id}</div>
            <div>{state?.title}</div> */}
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

export default AbortController