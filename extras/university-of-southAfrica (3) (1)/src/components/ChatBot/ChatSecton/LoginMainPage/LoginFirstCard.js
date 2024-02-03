import React from "react";
import { hooks } from "botframework-webchat";

const { usePostActivity } = hooks;
function LoginFirstCard({ setActive }) {
  const sendEvent = usePostActivity();
  //login section method for where id and password send to backend
  const btnCallingEventsend = () => {
    setActive(false);
    sendEvent({
      type: "event",
      name: "login",
      value: "login",
    });
  };

  return (
    <div>
      <button onClick={btnCallingEventsend}>Login</button>
    </div>
  );
}

export default LoginFirstCard;
