import React, { useState } from 'react'
import { useMutationHook } from '../Hooks/useMutation';

const PostApi = () => {
    const { mutate: postPost } = useMutationHook();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const HandleSubmit = () => {
        console.log({ title, description });
        const post = {
            title,
            description
        }
        postPost(post)
    }
    return (
        <div>
            <input type="text" placeholder='enter post title' onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder='enter post description' onChange={(e) => setDescription(e.target.value)} />
            <button onClick={HandleSubmit}>submit </button>
        </div>
    )
}

export default PostApi
