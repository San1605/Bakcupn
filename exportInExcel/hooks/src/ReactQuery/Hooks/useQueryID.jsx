import axios from "axios"
import { useQuery } from "react-query"

// const fetchDataWithId = (id) => {
//     return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
// }
const fetchDataWithId = ({ queryKey }) => {
    const id = queryKey[1]
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
}

export const useQueryID = (id) => {
    // return useQuery(['post', id], () => fetchDataWithId(id))
    // react query automatically sends id
    return useQuery(['post', id], fetchDataWithId)
}