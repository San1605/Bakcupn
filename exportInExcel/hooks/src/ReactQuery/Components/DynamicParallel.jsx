import axios from 'axios'
import React from 'react'
import { useQueries } from 'react-query'

const DynamicParallel = ({id}) => {
    const fetchPost = (i) => {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${i}`)
    }
    console.log(id)
    const queryResults = useQueries(
        id.map((i) => {
            return {
                querykey: ["post", i],
                queryFn: () => fetchPost(i)
            }
        })
    )
    console.log(queryResults)

    return (
        <div>

        </div>
    )
}

export default DynamicParallel
