import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query'

const Paginated = () => {
    const [pageNo, setPageNo] = useState(1);
    const fetchPostPaginated = (pageNo) => {
        return axios.get(`https://jsonplaceholder.typicode.com/posts?limit=10&page=${pageNo}`)
    }

    const { isLoading, data, isFetching } = useQuery(["posts", pageNo], ()=>fetchPostPaginated(pageNo), {
        keepPreviousData: true // keep previous data while  fetching new one do not show loading
    })



    return (
        <div>

        </div>
    )
}
export default Paginated