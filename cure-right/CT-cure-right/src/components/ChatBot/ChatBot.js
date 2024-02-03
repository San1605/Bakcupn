import { useEffect } from "react";
import { createDirectLine } from "botframework-webchat";
import { Components } from "botframework-webchat";
import ChatBotBody from "./components/ChatBotBody/ChatBotBody";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setShowChatBot } from "../../redux/actions/index.js";
import CHATBOT_ICON from "../../assets/icons/chatBotIcon.svg";
import CROSS from "../../assets/icons/closeBot.svg";
import { BOT_SECRET_KEY } from "../../utils/config";
import "./ChatBot.css";

//destructure composer component and directline token fetching
const { Composer } = Components;

async function getDirectLineToken() {
  return BOT_SECRET_KEY;
}

const ChatBot = () => {
  const dispatch = useDispatch();
  const [showRaiseTicketModal, setShowRaiseTicketModal] = useState(false);
  const [ticketsData, setTicketsData] = useState(null);
  let appReducerData = useSelector((state) => {
    return state.AppReducer;
  });

  const handleToggle = () => {
    dispatch(setShowChatBot(!appReducerData?.showChatBot));
  };

  const [directLine, setDirectLine] = useState();
  useEffect(() => {
    if (!directLine) {
      // We will load DirectLineJS asynchronously on first render.
      getDirectLineToken().then((token) =>
        setDirectLine(createDirectLine({ token }))
      );
    }
  }, [directLine, setDirectLine]);

  return (
    <div>
      {!!directLine && (
        <Composer directLine={directLine}>
          <div className="cure-chatbot-container">
            <div className="cure-chatbot-header d-flex align-items-center justify-content-between px-2 w-100">
              <div className="chatbot-title h-100 d-flex align-items-center gap-1">
                <img src={CHATBOT_ICON} alt="" className="chatbot-logo" />
                <div>Welcome to Cure Right</div>
              </div>
              <div
                className="close-icon h-100 d-flex align-items-center justify-content-center cursor-pointer px-2"
                onClick={handleToggle}
              >
                <img className="" src={CROSS} alt="" />
              </div>
            </div>
            <ChatBotBody
              showRaiseTicketModal={showRaiseTicketModal}
              setShowRaiseTicketModal={setShowRaiseTicketModal}
              ticketsData={ticketsData}
              setTicketsData={setTicketsData}
              directLine={directLine}
            />
          </div>
        </Composer>
      )}
    </div>
  );
};

export default ChatBot;
