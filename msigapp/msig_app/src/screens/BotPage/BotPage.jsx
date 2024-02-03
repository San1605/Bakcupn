import React, { useEffect, useRef, useState } from 'react'
import "./BotPage.css"
import sendIcon from "../../assets/sendIcon.svg"
import userIcon from "../../assets/userIcon.svg"
import roboIcon from "../../assets/roboIcon.svg"
import editIcon from "../../assets/editIcon.svg"
import copyIcon from "../../assets/copyIcon.svg"
import stopIcon from "../../assets/stopIcon.svg"
import regenerateIcon from "../../assets/regenerateIcon.svg"
import leftArrow from "../../assets/leftArrow.svg"
import rightArrow from '../../assets/rightArrow.svg'
import Loader from '../../utils/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { addMessageInChatArr, popLastMessages, setActiveIndex, setDisableSidebarList } from '../../redux/actions'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyChat from "../../assets/EmptyChat.svg"
import { baseUrl } from '../../config'
import axios from 'axios'
import toast from 'react-hot-toast'

const BotPage = () => {
    const chatArr = useSelector((state) => state.chatArr)
    const messageDivRef = useRef(null);
    // const [chatArr, setChatArr] = useState([])
    const [inputMessage, setInputMessage] = useState("");
    const [isEdit, setIsEdit] = useState(-1);
    const [editedText, setEditedText] = useState("");
    const [socket, setSocket] = useState(null);
    const [botMessage, setBotMessage] = useState([]);
    const [loading, setLoading] = useState(false)
    const [socketData, setSocketData] = useState("");
    const [socketReady, setSocketReady] = useState(false)
    const userEmail = localStorage.getItem("user-email");
    const activeIndex = useSelector((store) => store.activeIndex)
    const loadingForBotPage = useSelector((store) => store.loadingForBotPage);
    const disableSidebarList = useSelector((store) => store.disableSidebarList);
    const [regeneratingButton, setRegeneratingButton] = useState(true);
    const [isRegenerate, setIsRegenerate] = useState(false);
    const [regenerateIndex, setRegenerateIndex] = useState([]);
    const [lastMessages, setLastMessages] = useState('');
    const [lastMessagesArr, setLastMessagesArr] = useState([]);
    const [lastMessageData, setLastMessageData] = useState("")
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate()


    const handleEmitMessage = (message) => {
        if (message !== '' && socket && socket.readyState === WebSocket.OPEN) {
            const newMessage = {
                role: "user",
                text: message
            };
            if (chatArr?.length === 0) {
                dispatch(setActiveIndex(0));
                navigate(`/user-chatbot/conversation/0`);
            }
            dispatch(addMessageInChatArr({
                value: newMessage,
                index: id !== undefined ? id : 0
            }))
            let previousChat = [];
            if (chatArr[id]?.conversationArray) {
                previousChat = chatArr[id]?.conversationArray
            }

            socket?.send(JSON.stringify(
                {
                    message: message,
                    old_content: chatArr[id]?.length > 10 ? chatArr[id]?.conversationArray.slice(-10) : previousChat,
                    temp: 0
                }
            ));
            setLastMessagesArr([]);
            setLastMessages("")
            dispatch(setDisableSidebarList(true))
            setLoading(true);
        }
    };



    useEffect(() => {
        if (lastMessages?.length > 0) {
            setLastMessagesArr((prev) => [...prev, lastMessages])
        }
    }, [lastMessages])

    const handleRegenerate = (message) => {
        // console.log(message, "regenerate")
        if (message !== '' && socket && socket.readyState === WebSocket.OPEN) {



            if (chatArr[id]?.conversationArray[chatArr[id]?.conversationArray?.length - 1]?.regenerateArray?.length > 0) {
                setLastMessagesArr(chatArr[id]?.conversationArray[chatArr[id]?.conversationArray?.length - 1].regenerateArray)

            }
            else {
                if (chatArr[id]?.conversationArray[chatArr[id]?.conversationArray?.length - 1].role === "bot") {
                    setLastMessages(chatArr[id]?.conversationArray[chatArr[id]?.conversationArray?.length - 1].text)
                }
            }


            // console.log(lastMessages, "last")
            // if (isRegenerate)
            // dispatch(popLastMessages(id));

            const arr = [...chatArr];
            arr[id]?.conversationArray.pop();
            dispatch(popLastMessages(arr));
            let min = 0.5;
            let max = 1;

            let randomValueInRange = min + Math.random() * (max - min);
            let roundedValue = parseFloat(randomValueInRange.toFixed(1));
            socket?.send(JSON.stringify(
                {
                    message: message,
                    old_content: chatArr[id]?.length > 10 ? chatArr[id]?.conversationArray.slice(-10) : chatArr[id]?.conversationArray,
                    temp: roundedValue
                }
            ));
            setIsRegenerate(true)
            dispatch(setDisableSidebarList(true))
            setLoading(true);
        }
    };




    const handleAddNewMessage = () => {

        handleEmitMessage(inputMessage);
        setInputMessage("");
    };

    const handleCopy = (message) => {
        navigator.clipboard.writeText(message)
    }


    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };


    const handleEdit = (value, index) => {
        setEditedText(value)
        setIsEdit(index)
    }

    const handleSubmitEdit = (value) => {
        setIsEdit(-1);
        setEditedText("");
        handleEmitMessage(value);
    };


    useEffect(() => {
        // console.log(botMessage, "botmessage")
        if (botMessage.length > 0) {
            // console.log(chatArr[id]?.conversationArray,"regenerated")
            console.log(lastMessagesArr, "lastMessagesArr")
            dispatch(addMessageInChatArr(
                {
                    value: {
                        role: "bot",
                        text: botMessage.join(""),
                        regenerate: isRegenerate,
                        regenerateArray: [...lastMessagesArr, botMessage.join("")]
                    },
                    index: id
                }
            ));

            setBotMessage([]);
            setIsRegenerate(false)
            dispatch(setDisableSidebarList(false))
            setRegeneratingButton(true)
            // const arr = [...regenerateIndex]
            // arr[arr.length - 1] = arr[arr.length - 1] + 1;
            // setRegenerateIndex((prev) => {
            //     console.log(regenerateIndex?.length,"inside setregenerateindex")
            //     return prev.map((item, i) => {
            //         return i === prev.length - 1 ? item + 1 : item
            //     })
            // })
        }
    }, [socketData])

    useEffect(() => {
        if (socket && socket.readyState === WebSocket.OPEN && !loadingForBotPage) {
            setSocketReady(true)
        }
    }, [socket, loadingForBotPage])

    useEffect(() => {
        localStorage.setItem("token-count",0)
        setSocketReady(false)
        toast.dismiss();
        toast.error("You are out of Tokens")
    }, [lastMessageData])

    useEffect(() => {
        const socketInstance = new WebSocket(`ws://20.193.239.235:8011/ws_stream_chat/${userEmail}`);
        socketInstance.onopen = () => {
            // console.log("WebSocket connected");
            setSocket(socketInstance);
        };
        socketInstance.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        socketInstance.onmessage = (event) => {
            setRegeneratingButton(false)
            const data = event.data;
            // console.log(data, 'data');
            if (data) {
                if (data === ' ****' || data === '****') {
                    setSocketData(Date.now() * Math.random())

                }
                else if (data === ' ****' || data === '****') {
                    setLastMessageData(Date.now() * Math.random())
 
                }
                else {

                    setBotMessage((prev) => [...prev, data]);
                }
                setLoading(false);
            }
        };

        socketInstance.onclose = () => {
            // console.log("WebSocket closed");
        };

        return () => {
            socketInstance.close();
        };
    }, []);


    useEffect(() => {
        const arr = new Array(chatArr[id]?.conversationArray?.length).fill(0);
        arr[arr.length - 1] += 1
        setRegenerateIndex(arr)
        console.log(regenerateIndex?.length, arr, "AAAAAAAAAAAAAAAAAAAAAAAAa")
    }, [chatArr])

    if (loadingForBotPage) {
        return (
            <div style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: '1.5rem',
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F8FAFF",
                gap: "15px"
            }}
            >
                <img style={{
                    height: "50%",
                    width: "35%",
                    borderRadius: "12px"
                }} src={EmptyChat} alt='bot' />
            </div>
        )
        // return <Bars
        //     height="50"
        //     width="50"
        //     color="#9BB5FA"
        //     ariaLabel="bars-loading"
        //     wrapperStyle={{}}
        //     wrapperClass="loaderClass"
        //     visible={true}
        // />
    }


    const stopConnnection = async () => {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/stop_streaming`,
        };

        try {
            const response = await axios(config);
            if (response.status === 200) {
                // console.log(response.data);
            }
        }
        catch (error) {
            // console.log(error);
        }
    }



    return (
        <div className='chatBot'>
            <div className="chatBox">
                {
                    socketReady && <>
                        {chatArr[id]?.conversationArray?.length > 0 &&
                            <div className='stopGenerating' onClick={() => {

                                if (regeneratingButton) {
                                    let message;
                                    message = chatArr[id]?.conversationArray[chatArr[id]?.conversationArray?.length - 2]?.text
                                    // if(chatArr[id]?.conversationArray[chatArr[id]?.conversationArrayconversationArray?.length - 1]){

                                    // }
                                    // else{

                                    // }
                                    handleRegenerate(message)
                                }
                                else {
                                    stopConnnection()
                                }
                            }}>
                                <img src={!regeneratingButton ? stopIcon : regenerateIcon} alt="" />
                                <span>{!regeneratingButton ? "Stop generating" : "Regenerate"} </span>
                            </div>}
                        {chatArr[id]?.length > 0 ?
                            <div className="messageContainer" ref={messageDivRef}>
                                {
                                    chatArr[id]?.conversationArray?.map((item, index) => (
                                        <div key={index} className={`${item?.role === "user" ? 'userDiv' : "roboDiv"}`}>
                                            <div className={`${item?.role === 'user' ? "messageUser" : "messageBot"}`}>
                                                <img className={`${item?.role === 'user' ? "messageUserImg" : "messageBotImg"}`} src={item?.role === "user" ? userIcon : roboIcon} alt='' />
                                                {/* {console.log(item, "item")} */}
                                                {
                                                    item?.regenerate && item?.role === 'bot'
                                                    // && index === chatArr.length - 1 

                                                    &&
                                                    <div className='pagination'>
                                                        <img onClick={(() => {
                                                            const arr = [...regenerateIndex];
                                                            if (arr[index] > 0) {
                                                                arr[index] = arr[index] - 1;
                                                                setRegenerateIndex(arr)
                                                            }
                                                        })} src={leftArrow} alt='' />
                                                        <span> {regenerateIndex[index] + 1}/{item?.regenerateArray?.length} </span>
                                                        <img onClick={(() => {

                                                            const arr = [...regenerateIndex];
                                                            if (arr[index] < item?.regenerateArray?.length - 1) {
                                                                arr[index] = arr[index] + 1;
                                                                setRegenerateIndex(arr)
                                                            }
                                                        })} src={rightArrow} alt='' />
                                                    </div>
                                                }
                                                {
                                                    (isEdit === index && item?.role === 'user') ?
                                                        <div className='editDiv'>
                                                            <textarea
                                                                rows={Math.max(2, Math.ceil(editedText.length / 50) - 1)}
                                                                cols={Math.max(10, Math.ceil(editedText.length / 2))}
                                                                value={editedText}
                                                                className='messageUserInput'
                                                                type='text'
                                                                onChange={(e) => setEditedText(e.target.value)}
                                                            />
                                                            <div className='editButtonDiv'>
                                                                <button onClick={() => handleSubmitEdit(editedText)} className='submitEditButton'>Submit</button>
                                                                <button onClick={() => setIsEdit(-1)} className='cancelEditButton'>Cancel</button>
                                                            </div>
                                                        </div>
                                                        : item?.regenerate ?
                                                            <span className={`${item?.role === 'user' ? "messageUserSpan" : "messageBotSpan"}`} >{item?.regenerateArray[regenerateIndex[index]]}</span>
                                                            :
                                                            <span className={`${item?.role === 'user' ? "messageUserSpan" : "messageBotSpan"}`} >{item?.text}</span>
                                                }
                                                <img
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                    className={`${item?.role === 'user' ? "editImg" : "copyImg"}`}
                                                    src={item?.role === 'user' ? editIcon : copyIcon}
                                                    onClick={() => {
                                                        if (item?.role === 'user') {
                                                            handleEdit(item?.text, index)
                                                        }
                                                        else {
                                                            if (item?.regenerate) {
                                                                handleCopy(item?.regenerateArray[regenerateIndex[index]])
                                                            }
                                                            else {
                                                                handleCopy(item?.text)
                                                            }
                                                        }
                                                    }}
                                                    alt=''
                                                />
                                                {/* <Loader/> */}
                                            </div>
                                        </div>
                                    ))
                                }


                                {/* latest bot message */}

                                {
                                    //    !isRegenerate && 
                                    botMessage?.length > 0 && <div className="roboDiv">
                                        <div className="messageBot">
                                            <img className="messageBotImg" src={roboIcon} alt='' />
                                            <span className="messageBotSpan" >{botMessage.join("")}</span>
                                            <img
                                                className="copyImg"
                                                src={copyIcon}
                                                onClick={() => { handleCopy(botMessage.join("")) }}
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                }
                                {
                                    loading && <Loader />
                                }

                                <AlwaysScrollToBottom />
                            </div>
                            : <div className="messageContainer emptychat" ref={messageDivRef}>
                                <img style={{
                                    height: "60%",
                                    width: "60%",
                                    borderRadius: "12px"
                                }} src={EmptyChat} alt='bot' />
                            </div>
                        }
                    </>
                }
            </div>
            <div className="inputBox">
                <input
                    autoFocus
                    value={inputMessage}
                    disabled={!socketReady}
                    onChange={(e) => setInputMessage(e.target.value)}
                    type='text'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !disableSidebarList) {
                            handleAddNewMessage()
                        }
                    }}
                />
                <div className='sendIcon' onClick={handleAddNewMessage} style={{
                    pointerEvents: disableSidebarList && "none",
                    cursor: "pointer"
                }}>
                    <img src={sendIcon} alt='' />
                </div>
            </div>
        </div>
    )
}
export default BotPage