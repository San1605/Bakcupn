import { useState, useCallback } from "react";
import { hooks } from "botframework-webchat";

const { useSendMessage } = hooks;

function PersonaCard({ heading, buttonsmap }) {
  const sendMessage = useSendMessage();

  const handleClickSend = useCallback(
    (e) => {
      sendMessage(e);
    },
    [sendMessage]
  );
  return (
    <div>
      <div>{heading}</div>

      <>
        {buttonsmap.map((e, i) => (
          <button key={i} onClick={() => sendMessage(e)}>{e}</button>
        ))}
      </>
    </div>
  );
}

export default PersonaCard;
