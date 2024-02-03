import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

const postApiFunc=(data)=>{
    return axios.post("https://jsonplaceholder.typicode.com/post",data)
}

export const useMutationHook=()=>{
     return useMutation(postApiFunc)



    // if you want automatically fetching of updated data;
    // const queryClient= useQueryClient();
    // return useMutation(postApiFunc,{
    //     onSuccess:()=>{
    //         queryClient.invalidateQueries("posts")
    //     }
    // })

    // if you dont wanna make a network call for get new data just add the data to query cache
    // const queryClient= useQueryClient();
    // return useMutation(postApiFunc,{
    //     onSuccess:(data)=>{
    //         queryClient.setQueryData('posts',(oldQueryData)=>{
    //             return{
    //                 ...oldQueryData,
    //                 data:[...oldQueryData.data,data.data]
    //             }
    //         })
    //     }
    // })

}