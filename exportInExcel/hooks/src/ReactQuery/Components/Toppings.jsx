import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Toppings = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");


    const getData = async () => {
        try {
            setLoading(true)
            const requestConfig = {
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/posts'
            }
            const repsonse = await axios(requestConfig)
            const data = repsonse.data;
            setData(data)
            setLoading(false)
        }
        catch (error) {
            setError(error.message);
            console.log(error)
        }

    }

    useEffect(() => {
        getData()
    }, [])
    if (error) {
        return <h1>{error}</h1>
    }

    if (loading) {
        return <h3>Loading .....</h3>
    }
    return (
        <div>
            <p>Toppings Page</p>
            {
                data.length > 0 && data?.map((item, index) => (
                    <div key={index}>
                        <p>{item.userId} - {item?.title}</p>
                    </div>
                ))
            }

        </div>

    )
}

export default Toppings
