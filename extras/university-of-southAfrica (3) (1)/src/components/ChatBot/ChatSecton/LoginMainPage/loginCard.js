import { useState } from "react";
import { hooks } from "botframework-webchat";
import "./loginmain.css";

const { usePostActivity } = hooks;

function LoginCard({setLoginActive}) {
  // state for the login type and value
  const [loginType, setLoginType] = useState("Teacher");
  const [fristName, setFristName] = useState("");
  const [password, setPassword] = useState("");

  // define for the send event
  const sendEvent = usePostActivity();

  //login section method for where id and password send to backend
  const btnCallingEventsend = (loginType, fristName, password) => {
    setLoginActive(false)
    sendEvent({
      type: "event",
      value: {
        logintype: loginType,
        username: fristName,
        password: password,
      },
    });
  };

  return (
    <div>
      <div>
        <div>Please login to continue</div>
        <div>
          <button onClick={() => setLoginType("Teacher")}>Teacher </button>
          <button onClick={() => setLoginType("Student")}>Student</button>
        </div>

        <input type="textbox" onChange={(e) => setFristName(e.target.value)} />

        <input type="textbox" onChange={(e) => setPassword(e.target.value)} />

        <button
          onClick={() => btnCallingEventsend(loginType, fristName, password)}
        >
          Cancel
        </button>
        <button
          onClick={() => btnCallingEventsend(loginType, fristName, password)}
        >
          click
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
