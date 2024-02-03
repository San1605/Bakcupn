import React, { useEffect, useState } from "react";

//import component
import Inputbox from "./Inputbox/Inputbox";
import MessageSection from "./MessageSection/MessageSection";
import LoginCard from "./LoginMainPage/loginCard";

//import hooks and activities
import { hooks } from "botframework-webchat";
import LoginFirstCard from "./LoginMainPage/LoginFirstCard";
const { useActivities } = hooks;

function ChatSection() {
  const [activities] = useActivities();
  console.log(activities, "activities");

  // active state for the login card
  const [active, setActive] = useState(true);
  const [loginActive, setLoginActive] = useState(false);

  // handle event for show the login card
  useEffect(() => {
    !!activities &&
      activities.map((e) =>
        e.type === "event" && e.from.role === "bot"
          ? setLoginActive(true)
          : setActive(false)
      );
  }, [activities, setActive]);

  return (
    <div className="">
      <div>{active && <LoginFirstCard setActive={setActive} />}</div>
      <div>{loginActive && <LoginCard setLoginActive={setLoginActive} />}</div>
      <MessageSection />
      <Inputbox />
    </div>
  );
}

export default ChatSection;
