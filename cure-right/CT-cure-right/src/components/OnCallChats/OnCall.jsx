import React, { useState, useEffect } from "react";
import sendArrowIcon from "../../assets/icons/sendArrowIcon.svg";
import { ChatClient } from "@azure/communication-chat";
import { ENDPOINT,CONNECTION_STRING,USER_ACCESS_TOKEN } from "../../utils/config";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import "./OnCall.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChatThread } from "../../redux/actions";
import {
  getParticularAppointment,
  updateAppointment,
} from "../../services/patientApi";

const OnCall = ({ chatMessages, setChatMessages,communicationUserId }) => {
  let chatToken = localStorage.getItem("chatToken");
  const [chatClient, setChatClient] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [chatThread, setChatThread] = useState(null);
  const [chatThreadClient, setChatThreadClient] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [appointmentData, setAppointmentData] = useState({})
  const handleInputChange = (event) => {
    setMessageInput(event?.target?.value);
  };



  const scrollToBottom = () => {
    const chatContainer = document?.getElementById("chat-container");
    if (chatContainer !== null) {
      const lastMsg = chatContainer?.lastElementChild;
      const lastMsgHeight = lastMsg?.offsetHeight;
      const chatContainerHeight = chatContainer?.offsetHeight;
      const maxScrollTop = chatContainer?.scrollHeight - chatContainerHeight;
      let newScrollTop = maxScrollTop + lastMsgHeight;

      if (newScrollTop > maxScrollTop) {
        chatContainer.scrollTop = newScrollTop;
      } else {
        chatContainer.scrollTop = maxScrollTop;
      }
    }
  };

  const sendMessageOnThread = async (e) => {
    e.preventDefault();
    sendMsg(messageInput)
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);


 

  const initChatClient = async () => {
    console.log("INIT CHAT CLIENT CALLED HERE ======>");
    try {

      const appointmentId = localStorage.getItem("appointmentId");
      console.log("appointmentId ===>", appointmentId);
      console.log("GET CHAT_ROOM_ID API CALLED ===>");
      try {
        const res = await getParticularAppointment(appointmentId);
        console.log("GET CHAT_ROOM_ID API SUCCESS RESPONSE ===>", res);
        let chatRoomId = res?.data?.data[0]?.chatRoomId;
        let receiverToken = res?.data?.data[0]?.receiverToken;
        setAppointmentData(res?.data?.data[0]);
        console.log("chatRoomId ===>", chatRoomId);
        let chatThreadClientLocal;
        let chatThreadClientLocalSecond;
        if (chatRoomId === null) {
          const chatT = JSON.parse(chatToken).token;
          console.log("chatT TOKEN====> ", chatT);
          const chatClientUser = new ChatClient(
            ENDPOINT,
            new AzureCommunicationTokenCredential(chatT)
          );
          console.log("CHAT CLIENT CREATED ===>", chatClientUser);
          setChatClient(chatClientUser);
          try {

            let createChatThreadResult = await createChatThread(chatClientUser);
            let threadId = createChatThreadResult.chatThread.id;
            chatRoomId = threadId
            console.log(`Thread created:${threadId}`);
            console.log(`chatclient created:${chatClientUser}`);
            try {
              const res = await updateAppointment(appointmentId, threadId,chatClientUser?.tokenCredential?.tokenCredential?.token?.token ,appointmentData);
              console.log("UPDATED ROOM ID IN DB =====>", res);
            } catch (err) {
              console.log("CATCH ERROR IN UPDATE ROOM ID API");
            }
            console.log("ifffffffffffffff", chatRoomId);
            chatThreadClientLocal = chatClientUser.getChatThreadClient(chatRoomId);
            setChatThreadClient(chatThreadClientLocal);
            chatClientUser.startRealtimeNotifications();
            chatClientUser.on("chatMessageReceived", (e) => {
              console.log("Notification chatMessageReceived ifffffffffffffffffff!",e);
              setChatMessages((prev) => {
                let arr = [...prev, e];
                let uniqueArr = [];
                arr.forEach((obj) => {
                  if (!uniqueArr.some((o) => o.id === obj.id)) {
                    uniqueArr.push(obj);
                  }
                });
                return uniqueArr;
              });
            });

          } catch (err) {
            console.log("IN CATCH CREATE THREAD ===>", err);
          }
          console.log(`Chat Thread client for threadId:${chatRoomId}`);     
        }



        else {
          // const newToken = localStorage.getItem("newToken")

          const chatClientUserSecond = new ChatClient(
            ENDPOINT,
            new AzureCommunicationTokenCredential(receiverToken)
          );
          console.log("JOINED CHAT THREAD", chatClientUserSecond);

          chatThreadClientLocalSecond = await chatClientUserSecond.getChatThreadClient(
            chatRoomId
          );
          try {


            setChatThreadClient(chatThreadClientLocalSecond);
            console.log("JOINED CHAT THREAD", chatClientUserSecond);
            console.log(chatThreadClientLocalSecond, "chatThreadClientLocal")


            try {
              // let response = await addParticipants(chatClientUser,chatRoomId);
              const addParticipantsRequest = {
                participants: [
                  {
                    id: {
                      communicationUserId: communicationUserId,
                    },
                    displayName: "Jane",
                  },
                ],
              };

              chatThreadClientLocalSecond.addParticipants(addParticipantsRequest);



              // console.log("PARTICIPANT ADDED IN CHAT THREAD",response);
            } catch (err) {
              console.log("RESPONSE ERR =====>", err);
            }
          } catch (err) {
            console.log("CATCH GET_CHAT_THREAF_CLIENT");
          }
          console.log(`Chat Thread client for threadId:${chatRoomId}`);
          console.log("elseeeeeeeeeeee", chatRoomId);

          chatClientUserSecond.startRealtimeNotifications();
          chatClientUserSecond.on("chatMessageReceived", (e) => {
            console.log("Notification chatMessageReceived elseeeeeeee!",e);
            setChatMessages((prev) => {
              let arr = [...prev, e];
              let uniqueArr = [];
              arr.forEach((obj) => {
                if (!uniqueArr.some((o) => o.id === obj.id)) {
                  uniqueArr.push(obj);
                }
              });
              return uniqueArr;
            });
          });
        }
      }
      catch (err) {
        console.log("ERROR IN GETTING CHAT_ROOM_ID ====>", err);
      }
    }
    catch (error) {
      console.error("Error initializing chat client:", error.message);
    }
  };



  async function createChatThread(chatClientInstance) {
    const createChatThreadRequest = {
      topic: "topic",
    };
    const createChatThreadOptions = {
      participants: [
        {
          id: { communicationUserId: communicationUserId },
          displayName: userName,
        },
      ],
    };
    const createChatThreadResult = await chatClientInstance.createChatThread(
      createChatThreadRequest,
      createChatThreadOptions
    );
    // console.log("createChatThreadResult =====> ", createChatThreadResult);
    return createChatThreadResult;
  }

  const sendMsg = async (message) => {
    try {
      const sendMessageRequest = {
        content: message,
      };

      let sendMessageOptions = {
        senderDisplayName: "Jack",
        type: "text",
        metadata: {
          userType:localStorage.getItem("userType"),
          userId:localStorage.getItem("userId"),
          hasAttachment: "true",
          'attachmentUrl': 'https://contoso.com/files/attachment.docx'
        },
   
      };
      console.log(chatThreadClient,"chatThreadClient")
      const sendChatMessageResult = await chatThreadClient.sendMessage(
        sendMessageRequest,
        sendMessageOptions
      );
      const messageId = sendChatMessageResult.id;
      // console.log(`Message sent!, message id:${messageId}`);
    } catch (err) {
      // console.log("ERROR IN SENDING CHAT MESSAGE ===> ", err);
    }
  };


useEffect(()=>{
  initChatClient()
},[])


  return (
    <div className="oncall-container">
      <div className="oncall-messages" id="chat-container">
        {chatMessages?.map((message, index) => {
          return (
            <div
              key={index}
              className={`chat-message ${message?.metadata.userId === localStorage.getItem("userId") && message?.metadata.userType === localStorage.getItem("userType")
                  ? "chat-message-user"
                  : "chat-message-bot"
                }`}
            >
                  <div className="chat-message-text">{message?.message}</div>
            </div>
          );
        })}
      </div>
      <form className="oncall-input form-group" onSubmit={sendMessageOnThread}>
        <input
          className=" custom-input"
          type="text"
          placeholder="Type here..."
          value={messageInput}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary sendBtn" type="submit">
          <span>Send</span>
          <img src={sendArrowIcon} alt="" />
        </button>
      </form>
    </div>
  );
};
export default OnCall;