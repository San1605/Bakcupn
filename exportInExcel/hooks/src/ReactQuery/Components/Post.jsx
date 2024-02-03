import React from 'react'
import { useParams } from 'react-router-dom'
import { useQueryID } from '../Hooks/useQueryID';

const Post = () => {
    const { id } = useParams();
    console.log(id);

    const { isLoading, data, isError, error } = useQueryID(id)
    if (isError) {
        return <p>{error.message}</p>
    }
    if (isLoading) {
        return <h3>Loading .....</h3>
    }
    console.log(data.data)
    return (
        <div>
            <div>
                <p>{`title -->  ${data?.data?.title}`}</p>
                <p>{`description -->  ${data?.data?.body}`}</p>
            </div>
        </div>
    )
}

export default Post
