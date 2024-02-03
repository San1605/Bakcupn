import React from 'react'
import { Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom'

const Items = () => {
    const { id } = useParams();
    const location = useLocation();
    const item = location.state?.item;

    const {count,setCount} = useOutletContext();
    console.log(count);

    return (
        <div>
            {/* <div>{count}</div> */}
            <div>{item?.id}</div>
            <div>{item?.name}</div>
            <div>{item?.description}</div>
        </div>
    )
}
export default Items