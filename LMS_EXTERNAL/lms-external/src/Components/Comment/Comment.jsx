import React, { useContext, useEffect, useRef, useState } from 'react';
import './Comment.css';
import {communityMentor,reply,like,comments,replyImg} from "../../Assets/globalIcons"
import { GlobalContext } from '../../Context/GlobalContext';
const Comments = ({ id, replyIndex, text, user, replies, addReply, level, isFirstLevelComment }) => {
    const { socket } = useContext(GlobalContext);
    const [isReply, setIsReply] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [maxHeight, setMaxHeight] = useState(replies?.length * 100);


    useEffect(() => {
        let dynamicMaxHeight = maxHeight + replies.length * 100
        if (isReply) {
            dynamicMaxHeight += 40;
        }
        setMaxHeight(dynamicMaxHeight);
    }, [replies]);


    const handleReply = () => {
        const newReply = {
            parentId: id.toString(),
            text: replyText,
            user: 'sandesh',
            roomID: 'N_0001',
        };

  
        socket.emit('message', newReply);

        setReplyText('');
        setIsReply(false);
        setShowComments(true)
    };

    const handleToggleComments = () => {
        if (replies?.length > 0) {
            setShowComments(!showComments);
        }
        else if (replies?.length === 0) {
            setShowComments(false);
        }
    };

    const handleTextareaChange = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
        setReplyText(e.target.value);
    };
    useEffect(() => {
        if (replyIndex === replies?.length) {

        }
    }, [replies])


    return (
        <div className="comment-container-box" >
            <div id={`${id}.`} className="comment-container" style={{
                marginLeft: `${level === 1 && isFirstLevelComment ? 0 : 30 * level}px`,
            }}>

                <div className='leftCommentContainer'>
                    <img alt='' src={communityMentor} />
                    {level > 1 && !isFirstLevelComment && !showComments && (
                        <div
                            style={{
                                height: '76px',
                                position: 'absolute',
                                width: "2px",
                                backgroundColor: "#E4E4FF",
                                right: '16px',
                                top: '44px',
                                bottom: '0',
                                margin: 'auto',
                            }}
                        ></div>
                    )}
                </div>
                <div className='RightCommentContainer'>
                    <div className="NameCommentContainer">
                        <span>{user}</span>
                        <span>{text}</span>
                    </div>
                    <div className="imageCommentContainer">
                        <img src={like} alt='' />
                        <img onClick={handleToggleComments} src={comments} alt='' />
                        <img onClick={() => setIsReply(!isReply)} src={reply} alt='' />
                    </div>
                </div>

            </div>

            {isReply && (
                <div className='sendReply' style={{
                    marginLeft: `${45 * level}px`,
                    width: `calc(100% -${45 * level}px`
                }}>
                    <textarea
                        placeholder='Send a reply'
                        name="" id=""
                        row={1}
                        value={replyText}
                        onChange={handleTextareaChange}
                    />
                    <div className="replyMessagediv" onClick={handleReply}>
                        <img
                            className="action-button"
                            src={replyImg}
                            alt=''
                        />
                    </div>

                </div>
            )
            }
            <div className={`comments-section ${showComments ? 'visible' : 'hidden'}`}
                style={{
                    maxHeight: `${showComments ? maxHeight : 0}px`
                }}
            >
                {replies?.map((item, index) => (
                    <Comments
                        key={index}
                        replyIndex={index}
                        id={`${item.id}`}
                        replies={item.replies}
                        user={item?.userName}
                        text={item.text}
                        addReply={addReply}
                        level={level + 1}
                        isFirstLevelComment={false}
                    />
                ))}


            </div>

        </div >
    );
};

export default Comments;

