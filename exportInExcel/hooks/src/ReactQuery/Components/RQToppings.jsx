import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
// data,
// error,
// failureCount,
// isError,
// isFetchedAfterMount,
// isFetching,
// isIdle,
// isLoading,
// isPreviousData,
// isStale,
// isSuccess,
// refetch,
// remove,
// status,
const RQToppings = () => {
    const fetchPosts = () => {
        return axios.get("https://jsonplaceholder.typicode.com/posts")
    }
    const onSuccess = (data) => {
        console.log("sucessfull", data)
    }
    const onError = (error) => {
        console.log("error", error)
    }
    const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
        "posts",
        fetchPosts,
        {
            // cacheTime: 5000  , // default is  5 minutes
            // staleTime:30000      // network call only after 30 sec  data remains same 
            // refetchOnMount: false,   // will not refetch query on mount
            // refetchOnWindowFocus: true   // by default If a user leaves your application and returns and the query data is stale, TanStack Query automatically requests fresh data for you in the background. withput refresh
            // refetchInterval: 2000   // query automatically refetch data in givern interval, default it is false  means it automatically make network call after 2 seconds (interval)  but is paused when window looses focus
            // refetchIntervalInBackground: true   // automatically re fetch data in background even when window not in focus 

            // fetch query on click
            //  enabled:false

            // onSuccess: onSuccess,
            // onError: onError

            // select:(data)=>{  // using data transformation 
            //     const postTitle = data?.data?.map((item)=>item?.title)
            //     return postTitle
            // }  

        }
    )
    if (isError) {
        return <p>{error.message}</p>
    }
    if (isLoading) {
        return <h3>Loading .....</h3>
    }

     console.log({ isFetching, isLoading })  // It doesn't display a loading state but fetches the data in the background to determine whether there have been any changes. This is why "isFetching" returns true.

    // stale Time
    // Currently, I fetch the query in the background to check if there have been any changes in the network calls. If we want to reduce network calls, we can show cached data. In this case, we need to specify a "stale time" for displaying the cached data.

    return (
        <div>
            <p>RQToppings page</p>
            {/* <button onClick={refetch} >fetch Data</button> */}
            {
                data?.data?.length > 0 && data?.data?.map((item, index) => (
                    <div key={index}>
                        <Link to={`/post/${item?.id}`}>
                            <p>{index + 1} - {item?.title}</p>
                        </Link>
                    </div>
                ))


                // using data transformation (select)
                // data?.length > 0 && data?.map((item, index) => (
                //     <div key={index}>
                //         <p>{item}</p>
                //     </div>
                // ))
            }
        </div>
    )
}
export default RQToppings