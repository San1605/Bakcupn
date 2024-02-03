import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const ParallelQueries = () => {
    const fetchPosts = () => {
        return axios.get("https://jsonplaceholder.typicode.com/posts")
    }
    const fetchComments = () => {
        return axios.get("https://jsonplaceholder.typicode.com/comments")
    }

    const { data: posts } = useQuery("posts", fetchPosts);
    const { data: comments } = useQuery("comments", fetchComments)

    console.log(posts);
    console.log(comments);

    return (
        <div>
            parallel query page
        </div>
    )
}

export default ParallelQueries
