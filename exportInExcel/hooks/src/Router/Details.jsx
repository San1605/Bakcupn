import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Details = () => {
    const navigate = useNavigate();
    const items = [
        {
            id: 1,
            name: "product 1",
            desciption: "this is product 1"
        },
        {
            id: 2,
            name: "product 2",
            desciption: "this is product 2"
        },
        {
            id: 3,
            name: "product 3",
            desciption: "this is product 3"
        },
        {
            id: 4,
            name: "product 4",
            desciption: "this is product 4"
        },
        {
            id: 5,
            name: "product 5",
            desciption: "this is product 5"
        },
        {
            id: 6,
            name: "product 6",
            desciption: "this is product 6"
        },
    ]


    const [count, setCount] = useState(0)
    return (
        <div>
            <span>count is {count}</span>
            items are
            {
                items?.map((item, index) => (
                    <div
                        className='flex flex-col'
                        key={index}
                        onClick={() => {
                            navigate(`/items/${item.id}`, { state: { item: item } })
                        }}
                    >
                        id: {item.name}
                    </div>
                ))
            }
            <Outlet count={0} setCount={setCount}/>
        </div >
    )
}
export default Details
