import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import "./MessageComponent.css"
import { GlobalContext } from '../../Context/GlobalContext';
import Comments from '../Comment/Comment';


const MessageComponent = () => {
    const { communityChatArray, messageObj } = useContext(GlobalContext);
    const [comments, setComments] = useState([]);
    const [commenthistory, setCommenthistory] = useState(0);
    const elementRef = useRef();

    useEffect(() => {
        if (communityChatArray) {
            if (communityChatArray?.room_chat?.length > 0) {
                setComments(communityChatArray?.room_chat);
                setCommenthistory(communityChatArray?.room_chat.length)
            }
        }
    }, [communityChatArray])


    useEffect(() => {
        if (comments.length > commenthistory) {
            elementRef.current.scrollIntoView();
            setCommenthistory(comments.length);
        }
    }, [comments]);


    useEffect(() => {
        if (Object.keys(messageObj).length > 0) {
            addReply(messageObj)
        }
    }, [messageObj])


    const addReply = (obj) => {
        let commentId = (obj.id).toString()
        let arr = commentId.split('_');
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
            eval(method).push(obj);
            setComments(updatedComments)
        }

    };



    return (
        <div className='chatContainerBox'>
            {
                comments?.map((item, index) => (
                    <Comments
                        key={index}
                        replyIndex={index}
                        id={item?.id}
                        text={item.text}
                        user={item?.userName}
                        replies={item.replies}
                        addReply={addReply}
                        level={1}
                        isFirstLevelComment={true} />
                ))
            }
            <div ref={elementRef} />
        </div>
    );
};
export default MessageComponent;
