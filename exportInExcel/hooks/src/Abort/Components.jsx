import React, { useEffect, useState } from 'react'
import { post1, post2, post3, post4, post5 } from '../api';

const Components = ({ tab }) => {
    const [state, setState] = useState([]);
    const [controller, setController] = useState(new window.AbortController())
    const [show, setShow] = useState(1);
    console.log(tab)

    const getData = async () => {
        const { signal } = controller
        let response;
        try {
            switch (tab) {
                case 1:
                    response = await post1(signal);
                    break;
                case 2:
                    response = await post2(signal);
                    break;
                case 3:
                    response = await post3();
                    break;
                case 4:
                    response = await post4();
                    break;

                case 5:
                    response = await post5(signal);
                    break;

                default:
                    break;
            }
            if (!signal.aborted) {
                setState(response);
                setShow(tab)
            }
        }
        catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.log('Error:', error);
            }
        }

    }
    useEffect(() => {
        if(tab !== 3 && tab !== 4)
        {
          controller.abort();
         setController(new window.AbortController())
     }
     else{
        getData();
     }
    }, [tab]);

    useEffect(()=>{
        getData();
    },[controller])

    return (
        <div>
            <div className='border border-blue h-[25rem] w-[25rem]'>
                <div>tab is {tab}</div>
                <div>id = {state?.id}</div>
                <div>title = {state?.title}</div>
            </div>
        </div>
    )
}

export default Components
