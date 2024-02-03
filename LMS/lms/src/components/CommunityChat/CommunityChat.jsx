import React, { useRef } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import { useEffect } from 'react';
import "./communityChat.css"
const CommunityChat = () => {
  const { socket, chatMessageApi, messages, messageArr } = useContext(GlobalContext);
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState('');
  const [input, setInput] = useState("");
  // const [arr, setArr] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null)
  const repliedMessage = useRef(null);
  // const [arr, setArr] = useState([
  //   { user: "Sandesh", id: 1, message: 'Hello, how are you?', replyTo: null },
  //   { user: "Sandesh", id: 2, message: 'I\'m doing well. How about you?', replyTo: null },
  //   { user: "Sandesh", id: 3, message: 'Hello, how are you?', replyTo: null },
  //   { user: "Sandesh", id: 4, message: 'I\'m doing well. How about you?', replyTo: null },
  //   { user: "Sandesh", id: 5, message: 'Hello, how are you?', replyTo: null },
  //   { user: "Sandesh", id: 6, message: 'I\'m doing well. How about you?', replyTo: null },
  //   { user: "Sandesh", id: 7, message: 'Hello, how are you?', replyTo: null },
  //   { user: "Sandesh", id: 8, message: 'I\'m doing well. How about you?', replyTo: null },
  // ]);

  const [arr, setArr] = useState([
    { user: "Sandesh", id: 1, message: 'Hello, how are you?' },
    { user: "Bot", id: 2, message: 'I\'m doing well. How about you?' },
    { user: "Sandesh", id: 3, message: 'Hello, how are you?' },
    { user: "Bot", id: 4, message: 'I\'m doing well. How about you?' },
    { user: "Sandesh", id: 5, message: 'Hello, how are you?' },
    { user: "Bot", id: 6, message: 'I\'m doing well. How about you?' },
    { user: "Sandesh", id: 7, message: 'Hello, how are you?' },
    { user: "Bot", id: 8, message: 'I\'m doing well. How about you?' },
  ]);


  const messageContainerRef = useRef(null);

  const handleClick = () => {
    const newMessage = {
      // id: input.length + 1,
      user: "Sandesh",
      message: input,
      // replyTo: replyingTo
    }
    setArr((prev) => [...prev, newMessage])
    setInput("");
    setReplyingTo(null)
    repliedMessage.current = newMessage

    scrollToBottom();
    // socket.emit("message", { message: input, user: username, id: messages?.messages?.id })
  }

  // useEffect(() => {
  //   if (Object.keys(messageArr).length > 0) {
  //     setArr((prev) => [...prev, messageArr])
  //   }
  // }, [messageArr])

  // console.log(messageArr, "messageArr")
  // console.log(arr, "arrr")

  // console.log(messages?.messages?.Room_chats["15-10-2023"] , "messages")



  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      console.log(messageContainerRef.current.scrollTop, messageContainerRef.current.scrollHeight, "scroll")
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };


  const handleJoinRoom = () => {
    chatMessageApi(username);
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }
  }


  const scrollToMessage = (id) => {
    const messageElement = document.getElementById(`message-${id}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth' });
      messageElement.classList.add('highlighted-message');
      setTimeout(() => {
        messageElement.classList.remove('highlighted-message');
      }, 500)
    }
  };


  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <select name="" id="" value={room} onChange={(e) => setRoom(e.target.value)}>
        <option value="" defaultValue={"select room"}>select room</option>
        <option value="reactJS">React js</option>
        <option value="nodeJS">Node js</option>
        <option value="BigData">Big Data</option>
        <option value="datascience">Data Science</option>
      </select>

      <button onClick={handleJoinRoom}>
        join room
      </button>

      <div style={{
        border: "1px solid black",
        height: "25rem",
        overflow: 'scroll',
        display: "flex",
        flexDirection: 'column',

      }}
        ref={messageContainerRef}
      >
        {
          arr?.length > 0 && arr?.map((item) => (

            item.user === "Sandesh" ? ( 
              <div style={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
                id={`message-${item.id}`}
              >
                <span style={{ marginRight: "10px" }}>{item.user} -&gt; </span>
                <span >{item.message}</span>

              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: 'flex-start'
              }}
                id={`message-${item.id}`}
              >
                <span style={{ marginRight: "10px" }}>{item.user} -&gt; </span>
                <span >{item.message}</span>
              </div>
            )
          ))
        }
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' ? handleClick : null}
      />
      <button onClick={handleClick}>send Message</button>
    </div>
  )
}
export default CommunityChat






{/* <button onClick={() => {
                setReplyingTo(item.id)
              }}>reply</button>
              {
                item.replyTo !== null && (
                  <div
                    className="reply-link"
                    onClick={() => scrollToMessage(item.replyTo)}
                    style={{ cursor: "pointer" }}
                  >
                    in reply to : {arr.find((msg) => msg.id === item.replyTo)?.message}
                  </div>
                )
              } */}