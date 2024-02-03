import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const Comments = ({ id, text, replies, addReply }) => {
    const { socket } = useContext(GlobalContext);
    const [isreply, setisReply] = useState(false);
    const [replytext, setReplytext] = useState("");


    const handleReply = () => {
        const newReply = {
            parentId: id.toString(),
            text: replytext,
            user: "sandesh",
            roomID: "R_0001"
        };
        console.log(newReply, "newReply")
        socket.emit("message", newReply)
        setReplytext("");
        setisReply(false);
    };

    return (
        <div
            style={{
                borderLeft: "1px solid black",
                marginLeft: "20px",
                padding: '10px',
                marginTop: "10px",
            }}
        >
            <span style={{ border: "1px solid black" }}>{text}</span>
            <button style={{
                border: "1px solid black",
                borderRadius: "6px",
                padding: '2px',
                fontSize: '10px'

            }} onClick={() => setisReply(!isreply)}>reply</button>
            {isreply && (
                <div>
                    <input type="text" value={replytext} onChange={(e) => setReplytext(e.target.value)} />
                    <button style={{
                        border: "1px solid black",
                        borderRadius: "6px",
                        padding: '2px',
                        fontSize: '10px'

                    }} onClick={handleReply}>send</button>
                </div>
            )}
            <div>
                {
                    replies?.map((item) => (
                        <Comments key={item?.id} id={`${item.id}`} replies={item.replies} text={item.text} addReply={addReply} />
                    ))
                }
            </div>
        </div>
    );
};

const NestedComments = () => {
    const { socket, chatMessageApi, messages, messageArr } = useContext(GlobalContext);
    const [post, setPost] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        chatMessageApi("sandeshsinghalswm@gmail.com");
    }, [])

    useEffect(() => {
        if (messages) {
            if (messages?.room_chat?.length > 0) {
                console.log(messages?.room_chat);
                setComments(messages?.room_chat)
            }
        }
    }, [messages])


    useEffect(() => {
        // addReply(messageArr)
        console.log(messageArr, "from socket")
        if (Object.keys(messageArr).length > 0) {
            addReply(messageArr)
        }
    }, [messageArr])

    const addReply = (obj) => {
        let commentId = (obj.id).toString()
        let arr = commentId.split('_');
        console.log(arr, "arrrrrrr");
        let updatedComments = JSON.parse(JSON.stringify(comments));
        if (arr.length === 1) {
            updatedComments.push(obj);
            setComments(updatedComments)
        }
        else {

            let method = arr.reduce((acc, curr, i) => {
                if (i === 0) {
                    acc += `[${curr - 1}]`;
                }
                else if (i === arr.length - 1 && i !== 0) {
                    acc += `.replies`;
                }
                else {
                    acc += `.replies[${curr - 1}]`;
                }
                return acc;
            }, 'updatedComments');
            console.log(method)
            eval(method).push(obj);
            setComments(updatedComments)
        }

    };
    // const addReply = (obj) => {
    //     setComments((prevComments) => {
    //         // Create a deep copy of the previous comments
    //         const newComments = JSON.parse(JSON.stringify(prevComments));
    //         console.log(newComments,"newComments")
    //         // Define a recursive function to update comments
    //         const updateComments = (comments, parentId, reply) => {
    //             return comments.map((comment) => {
    //                 if (comment.id === parentId) {
    //                     // If this is the parent comment, add the reply
    //                     return {
    //                         ...comment,
    //                         replies: [...comment.replies, reply],
    //                     };
    //                 } else if (comment.replies) {
    //                     // If this comment has replies, recursively update them
    //                     return {
    //                         ...comment,
    //                         replies: updateComments(comment.replies, parentId, reply),
    //                     };
    //                 }
    //                 return comment;
    //             });
    //         };

    //         // Use the recursive function to update the comments
    //         const updatedComments = updateComments(newComments, obj.parentId, obj);
    //         console.log(updatedComments,"updated")
    //         return updatedComments; // Return the updated comments array
    //     });
    // };

    const inputRef = useRef(null);
    const handleInput = (e) => {
        console.log(inputRef.current.innerHTML)
    }
    return (
        <>
            <div style={{
                overflow: "scroll",
                height: "30rem",
                border: "2px solid black"
            }}>
                {
                    comments?.map((item) => (
                        <Comments key={item?.id} id={item.id} text={item.text} replies={item.replies} addReply={addReply} />
                    ))
                }
            </div>
            <div>
                <input type="text" value={post} onChange={(e) => { setPost(e.target.value) }} />
                <div
                    contentEditable={true}
                    ref={inputRef}
                    placeholder="Add a description or paste an image..."
                    onInput={(e) => handleInput(e)}
                >
                </div>
                <button onClick={() => {
                    socket.emit("message", {
                        parentId: "0",
                        user: "sandesh",
                        roomID: 'R_0001',
                        text: post
                    })
                }}>post</button>
            </div>
        </>
    );
};
export default NestedComments;