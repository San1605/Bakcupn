import { useCallback, useState } from "react";
import { hooks } from "botframework-webchat";
import send from "../../../../assets/img/Vector.svg";
import "../Inputbox/inputbox.css";

const { useSendMessage } = hooks;
const Inputbox = () => {
  const sendMessage = useSendMessage();

  const [value, setValue] = useState("");
  const handleClickSend = useCallback(
    (e) => {
      sendMessage(e);
      setValue("")
    },
    [sendMessage]
  );

  return (
    <div>
      <div className="chat_search_bar mb-3">
        <input
          autoFocus={true}
          onChange={(e) => setValue(e.target.value)}
          type="textbox"
          value={value}
          className="chat_search_box_input ps-3"
          placeholder="Type here"
          onKeyPress={(e) => (e.charCode === 13 ? handleClickSend(value) : "")}
        />
        <div onClick={() => handleClickSend(value)}>
          <img width="17px" src={send} alt="." />
        </div>
      </div>
    </div>
  );
};

export default Inputbox;
