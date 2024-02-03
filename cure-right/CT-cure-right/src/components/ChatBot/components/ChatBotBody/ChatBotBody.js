import React from "react";
import CHATBOT_ICON from "../../../../assets/icons/chatBotIcon.svg";
import PROFILE_ICON from "../../../../assets/icons/profile.svg";
import CHAT_SEND_ARROW from "../../../../assets/icons/chatSendArrow.svg";
import { hooks } from "botframework-webchat";
import { useState } from "react";
import { useEffect } from "react";
import AdaptiveCardComponent from "../AdaptiveCard/AdaptiveCard";
import BotRaiseTicketSlider from "../BotRaiseTicketSlider/BotRaiseTicketSlider";
const { useActivities, useSendMessage, usePostActivity } = hooks;

const ChatBotBody = (props) => {
  const [inputValue, setInputValue] = useState("");
  const sendMessage = useSendMessage();
  const [activities] = useActivities();
  const sendEvent = usePostActivity();
  const [isPatient, setIsPatient] = useState(
    localStorage.getItem("userType") === "patient"
  );
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chats-container");
    if (chatContainer !== null) {
      const lastMsg = chatContainer.lastElementChild;
      const lastMsgHeight = lastMsg?.offsetHeight;
      const chatContainerHeight = chatContainer?.offsetHeight;
      const maxScrollTop = chatContainer.scrollHeight - chatContainerHeight;
      let newScrollTop = maxScrollTop + lastMsgHeight;
      if (newScrollTop > maxScrollTop) {
        chatContainer.scrollTop = newScrollTop;
      } else {
        chatContainer.scrollTop = maxScrollTop;
      }
    }
  };
  let metaData = {
    userType: localStorage.getItem("userType"),
    userId: localStorage.getItem("userId"),
  };

  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      if (activities.length === 0) {
        sendEvent({ type: "event", channelData: metaData, text: "Hello" });
      }
    }, 500);
    console.log(activities, "activities"); // console for the activities...
  }, [activities]);

  const handleSendMessage = (e) => {
    // setShowRaiseTicketModal(true)
    e?.preventDefault();
    sendEvent({ type: "message", channelData: metaData, text: inputValue });
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const renderBotMessage = (botMsg) => {
    switch (botMsg.inputHint) {
      case "showRaiseTicketCard": {
        props?.setTicketsData(botMsg.value);
        props?.setShowRaiseTicketModal(true);
        break;
      }
      case "closeRaisedTicket": {
        props?.setTicketsData(botMsg.value);
        props?.setShowRaiseTicketModal(false);
        break;
      }
      default:
    }

    if (botMsg?.attachments !== null) {
      if (
        botMsg.attachments &&
        botMsg.attachments.length > 0 &&
        botMsg.attachments[0].contentType ===
          "application/vnd.microsoft.card.adaptive"
      ) {
        return (
          <AdaptiveCardComponent
            message={botMsg.attachments[0].content}
            handleCardAction={handleCardAction}
          />
        );
      }
    }
    switch (botMsg.inputHint) {
      case "acceptingInput":
      case "text":
        return botMsg.text;
      default:
        return botMsg.text;
    }
  };

  const handleCardAction = (type, value, title) => {
    // console.log(type, value, title);
    let metaData = {
      userType: localStorage.getItem("userType"),
      userId: localStorage.getItem("userId"),
    };
    if (type === "openUrl") {
      window.open(value, "_blank");
    } else if (type === "imBack") {
      sendEvent({ type: "message", channelData: metaData, text: value });
    } else if (type === "postBack") {
      sendEvent({ type: "message", channelData: metaData, text: value });
    } else {
      sendEvent({ type: "message", channelData: metaData, text: value });
    }
  };

  return (
    <>
      <div className="chatbot-body">
        <div className="chatbot-chats-container" id="chats-container">
          {!!activities &&
            activities?.map((msg, index) => (
              <>
                {msg.type === "message" && (
                  <div
                    key={index}
                    className={`chat-message ${
                      msg.from.role === "bot" ? "bot" : "user"
                    }`}
                  >
                    {msg.type === "message" && msg.from.role === "bot" ? (
                      <>
                        <img className="avatar" src={CHATBOT_ICON} alt="" />
                        <div className="chat-message-text">
                          {renderBotMessage(msg)}
                        </div>
                      </>
                    ) : (
                      msg.type === "message" &&
                      msg.from.role === "user" &&
                      msg.text !== "start" && (
                        <>
                          <div className="chat-message-text">{msg.text}</div>
                          <img className="avatar" src={PROFILE_ICON} alt="" />
                        </>
                      )
                    )}
                  </div>
                )}
              </>
            ))}
        </div>
        <div className="chatbot-footer px-2">
          <div className="chatbot-options d-flex gap-2 whitespace-nowrap w-100 py-2">
            <button
              className="rounded-pill"
              onClick={() =>
                sendEvent({
                  type: "message",
                  channelData: metaData,
                  text: "Chat GPT",
                })
              }
            >
              Chat GPT
            </button>
            <button
              className="rounded-pill"
              onClick={() =>
                sendEvent({
                  type: "message",
                  channelData: metaData,
                  text: "General Consultancy",
                })
              }
            >
              General Consultancy
            </button>
            <button
              className="rounded-pill"
              onClick={() =>
                sendEvent({
                  type: "message",
                  channelData: metaData,
                  text: "Appointment Details",
                })
              }
            >
              Appointment Details
            </button>

            <button
              className="rounded-pill"
              onClick={() =>
                sendEvent({
                  type: "message",
                  channelData: metaData,
                  text: "Help & Support",
                })
              }
            >
              Ticket & Support
            </button>
          </div>
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <div className="input-container w-100 h-100">
              <input
                className="p-1 px-3 pe-5 w-100 h-100 rounded-pill overflow-hidden"
                type="text"
                placeholder="Type message"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button onClick={handleSendMessage}>
                <img src={CHAT_SEND_ARROW} alt="" />
              </button>
            </div>
          </form>
        </div>
        {props?.showRaiseTicketModal && (
          <BotRaiseTicketSlider
            ticketsData={props?.ticketsData}
            showRaiseTicketModal={props?.showRaiseTicketModal}
            setShowRaiseTicketModal={props?.setShowRaiseTicketModal}
            sendEvent={sendEvent}
          />
        )}
      </div>
    </>
  );
};

export default ChatBotBody;
