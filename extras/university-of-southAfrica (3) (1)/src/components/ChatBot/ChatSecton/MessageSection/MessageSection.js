import React from "react";
import './messagesection.css'
import { hooks } from "botframework-webchat";
import BotMsg from "./BotMsg/BotMsg";
import UserMsg from "./UeserMsg/UserMsg";

const { useActivities } = hooks;
function MessageSection() {
  const [activities] = useActivities();
  return (
    <div>
      {!!activities &&(<>{
        activities.map((msg, i) =>
          msg.type === "message" && msg.from.role === "user" ? (
            <div className="d-flex w-100 justify-content-end px-3" key={i} >
             <UserMsg msg={msg} />
            </div>
          ) : (
            <div className="d-flex flex-column w-100 px-3" key={i}>
              <BotMsg msg={msg} />
            </div>
          )
        )}</>)}
    </div>
  );
}

export default MessageSection;
