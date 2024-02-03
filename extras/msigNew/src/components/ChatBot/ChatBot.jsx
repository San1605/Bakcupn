import React, { useEffect, useRef, useState } from 'react'
import "./ChatBot.css"
import sendIcon from "../../assets/sendIcon.svg"
import userIcon from "../../assets/userIcon.svg"
import roboIcon from "../../assets/roboIcon.svg"
import editIcon from "../../assets/editIcon.svg"
import copyIcon from "../../assets/copyIcon.svg"
import stopIcon from "../../assets/stopIcon.svg"
import regenerateIcon from "../../assets/regenerateIcon.svg"
import leftArrow from "../../assets/leftArrow.svg"
import rightArrow from '../../assets/rightArrow.svg'

// import Loader from '../../utils/Loader'

const ChatBot = () => {
    const conversationChat = [
        { role: 'user', text: 'Hello, bot. How are you today?' },
        { role: 'bot', text: "I'm just a computer program, so I don't have feelings, but I'm here to help you." },
        { role: 'user', text: "That's good to know. Can you provide information on web development?" },
        { role: 'bot', text: "Of course! Web development encompasses a wide range of skills and technologies, including HTML, CSS, JavaScript, and various frameworks like React. Is there a specific aspect you'd like to know more about?" },
        { role: 'user', text: "I'm particularly interested in React.js. Can you explain its core concepts?" },
        { role: 'bot', text: "Certainly! React.js is a JavaScript library for building user interfaces. It's known for its component-based architecture. React allows you to create reusable UI components and efficiently update the DOM. Some core concepts include components, props, state, and the virtual DOM." },
        { role: 'user', text: "That's helpful. How can I improve the performance of my React app?" },
        { role: 'bot', text: "To optimize React app performance, you can use techniques like code splitting, lazy loading, and minimizing unnecessary renders by using shouldComponentUpdate or React.memo. Also, consider using state management libraries like Redux or Mobx for efficient data handling." },
        { role: 'user', text: "Great tips! Do you have any recommendations for CSS frameworks?" },
        { role: 'bot', text: "There are several popular CSS frameworks, such as Bootstrap, Foundation, and Bulma. Your choice depends on your project's requirements. Bootstrap is widely used and offers a lot of pre-designed components." },
        { role: 'user', text: "Thanks for the info. I'll check them out. Any advice for a novice web developer?" },
        { role: 'bot', text: "For beginners, I'd recommend focusing on HTML, CSS, and JavaScript fundamentals. Practice building simple projects, gradually increase complexity, and don't hesitate to seek help from online resources, forums, and tutorials." },
        { role: 'user', text: "I appreciate your guidance. You're very knowledgeable. Any last thoughts?" },
        { role: 'bot', text: "Thank you for your kind words! Feel free to return anytime you have questions. Keep learning and exploring the world of web development. Have a great day!" },
        { role: 'user', text: "Hello again. I have a question about responsive web design." },
        { role: 'bot', text: "Sure, I can help with that. Responsive web design is an approach that makes web pages look good on all devices and screen sizes. It involves using media queries and flexible layouts to adapt to different screen sizes. ure, I can help with that. " },
        // { role: 'user', text: "Hello again. I have a question about responsive web designHello again. I have a question about responsive web design. Hello again. I have a question about responsive web design Hello again. I have a question about responsive web design Hello again. I have a question about responsive web design" },

    ]

    const [chatArr, setChatArr] = useState(conversationChat)
    const [inputMessage, setInputMessage] = useState("");
    const [isEdit, setIsEdit] = useState(-1);
    const [editedText, setEditedText] = useState("");
    const messageDivRef = useRef(null);
    // const [index, setIndex] = useState(0);
    const [regeneratingButton, setRegeneratingButton] = useState(true)

    const handleAddNewMessage = () => {
        if (inputMessage !== '') {
            const newMessage = {
                role: "user",
                text: inputMessage
            }
            setChatArr((prev) => [...prev, newMessage])
            setInputMessage("")
        }
    }

    // useEffect(() => {
    //     if (index < conversationChat?.length - 1) {
    //         const messages = conversationChat[index]
    //         const words = messages.text.split(" ");
    //         let wordLength = 0;
    //         setChatArr((prev) => [...prev, { ...messages, text: '' }])
    //         const interval = setInterval(() => {
    //             if (wordLength < words.length - 1) {
    //                 setChatArr((prev) => {
    //                     const updatedArr = [...prev];
    //                     updatedArr[prev.length - 1].text += words[wordLength] + " ";
    //                     return updatedArr
    //                 })
    //                 wordLength++;
    //             }
    //             else {
    //                 clearInterval(interval);
    //                 setIndex((prev) => prev + 1)
    //             }
    //         }, 100)
    //     }
    // }, [index])

    const handleCopy = (message) => {
        const textToCopy = message
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
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

    const handleSetEditedMessage = (idx) => {
        const arr = chatArr?.map((prev, index) => {
            if (index === idx) {
                return { role: "user", text: editedText }
            }
            return prev;
        })
        setChatArr(arr)
        setIsEdit(-1);
    }
    console.log(chatArr, "chatArr");

    const handleSubmitEdit = (value) => {
        const newMessage = {
            role: "user",
            text: value
        }
        setChatArr((prev) => [...prev, newMessage])
        setIsEdit(-1);
        setEditedText("")
    }

    return (
        <div className='chatBot'>
            <div className="chatBox">
                <div className='stopGenerating' onClick={() => setRegeneratingButton(!regeneratingButton)}>

                    <img src={!regeneratingButton ? stopIcon : regenerateIcon} alt="" />
                    <span>{!regeneratingButton ? "Stop generating" : "Regenerate"} </span>


                </div>
                <div className="messageContainer" ref={messageDivRef}>
                    {
                        chatArr?.map((item, index) => (
                            
                            <div key={index} className={`${item?.role === "user" ? 'userDiv' : "roboDiv"}`}>
                                <div className={`${item?.role === 'user' ? "messageUser" : "messageBot"}`}>

                                     

                                    <img className={`${item?.role === 'user' ? "messageUserImg" : "messageBotImg"}`} src={item?.role === "user" ? userIcon : roboIcon} alt='' />

                                    {
                                        !regeneratingButton && item?.role === 'bot' && index === chatArr.length - 1 &&
                                        <div className='pagination'>
                                            <img src={leftArrow} alt='' />
                                            <span> 1/2 </span>
                                            <img src={rightArrow} alt='' />
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
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSetEditedMessage(index)
                                                        }
                                                    }}
                                                />
                                                <div className='editButtonDiv'>
                                                    <button onClick={() => handleSubmitEdit(editedText)} className='submitEditButton'>Submit</button>
                                                    <button onClick={() => setIsEdit(-1)} className='cancelEditButton'>Cancel</button>
                                                </div>
                                            </div>
                                            :
                                            <span className={`${item?.role === 'user' ? "messageUserSpan" : "messageBotSpan"}`} >{item?.text}</span>
                                    }
                                    <img
                                        className={`${item?.role === 'user' ? "editImg" : "copyImg"}`}
                                        src={item?.role === 'user' ? editIcon : copyIcon}
                                        onClick={() => {
                                            if (item?.role === 'user') {
                                                handleEdit(item?.text, index)
                                            }
                                            else {
                                                handleCopy(item?.text)
                                            }
                                        }}
                                        alt=''
                                    />
                                    {/* <Loader/> */}
                                </div>
                            </div>
                        ))
                    }
                    <AlwaysScrollToBottom/>
                </div>
            </div>
            <div className="inputBox">
                <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    type='text'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddNewMessage()
                        }
                    }}
                />
                <div className='sendIcon' onClick={handleAddNewMessage}>
                    <img src={sendIcon} alt='' />
                </div>
            </div>
        </div>
    )
}
export default ChatBot