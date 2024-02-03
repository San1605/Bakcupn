import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { useAppContext } from "./Context/context";
import "./App.css";
import Navbar from "./navbar/navbar";
import { VscSend } from "react-icons/vsc";
import { ThreeDots } from "react-loader-spinner";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);
  const { chatArray, setChatArray, myContext, setMyContext } = useAppContext();
  const [respQuerySeqNo, setRespQuerySeqNo] = useState(0);
  const [lastResponse, setLastResponse] = useState("");
  const [llmResponse, setLlmResponse] = useState("");
  const [count, setCount] = useState(0);

  console.log(chatArray, "26372632736");

  useEffect(() => {
    console.log(myContext);
  });

  useEffect(() => {
    const ws = new WebSocket("ws://20.235.109.178:8005");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      // sendPing();
    };

    ws.onmessage = (event) => {
      try {
        const jsonObj = JSON.parse(event.data);

        if (jsonObj.llm_response_json) {
          setChatArray((prev) => [...prev, { origin: "bot", llm: event.data }]);

          setLlmResponse(event.data);
          setRespQuerySeqNo((prev) => prev + 1);

          return;
        }

        if (jsonObj.context) {
          // setChatArray((prev) => [
          //   ...prev,
          //   { origin: "bot", text: event.data },
          // ]);
          console.log("new context :::: ", JSON.parse(event.data.context));
          setMyContext(JSON.parse(event.data).context);
          console.log(myContext, "273827382");
          setRespQuerySeqNo((prev) => prev + 1);

          return;
        }
      } catch (err) {
        console.log(err);
      }

      const stream = event.data;
      const streamArr = stream.split(" ");
      if (streamArr[streamArr.length - 1] !== "END_OF_STREAM") {
        <p>{event.data}</p>;
        setText(() => event.data);
      } else {
        streamArr.pop();
        const final_resp = streamArr.join(" ");
        setChatArray((prev) => [...prev, { origin: "bot", text: final_resp }]);
        setLastResponse(final_resp);
        setRespQuerySeqNo((prev) => prev + 1);
        setText("");
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    // return () => {
    //   ws.close();
    // };
  }, []);

  // for prompt ===2
  const sendMessage2 = () => {
    if (socket) {
      const value = JSON.parse(llmResponse).llm_response_json;
      const messageObject = {
        llm_response_json: value,
        prompt: 2,
      };
      const messageString = JSON.stringify(messageObject);
      // setChatArray((prev) => [...prev, { origin: "user", llmuser: value.rephrase_query }]);
      socket.send(messageString);
      setMessage("");
    }
  };

  //first query
  const sendMessage1 = () => {
    if (socket && message.trim() !== "") {
      const messageObject = { prompt: 1, query: message, context: myContext };
      const messageString = JSON.stringify(messageObject);
      setChatArray((prev) => [...prev, { originnnn: "user", text: message }]);
      socket.send(messageString);
      setMessage("");
    }
  };

  //third query
  const sendMessage3 = () => {
    if (socket) {
      const value = JSON.parse(llmResponse).llm_response_json;
      const messageObject = {
        prompt: 3,
        llm_response_json: value,
        final_stream_string: lastResponse,
        context: myContext,
      };
      const messageString = JSON.stringify(messageObject);
      // setChatArray((prev) => [...prev, { originnnnn: "user", llmsres: message }]);
      socket.send(messageString);
      setMessage("");
    }
  };

  useEffect(() => {
    chatArray[chatArray.length - 1].origin === "bot"
      ? setLoader(false)
      : setLoader(true);
  }, [chatArray]);

  useEffect(() => {
    chatArray[chatArray.length - 1].llm && sendMessage2();
  }, [chatArray]);

  useEffect(() => {
    respQuerySeqNo > 0 && lastResponse.length > 0 && sendMessage3();
  }, [lastResponse]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="full-bot">
          {chatArray.map((ans, index) => (
            <>
              {ans.text &&
                (ans.origin === "bot" ? (
                  <div className="bot-chat">{ans.text}</div>
                ) : (
                  <div className="userparent">
                    <div className="user-chat">{ans.text}</div>
                  </div>
                ))}
            </>
          ))}
          <div className="p-4">
            {text && <p className="bot-chat">{text}</p>}
            {loader && (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#861F41"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            )}
          </div>
          <AlwaysScrollToBottom />
        </div>
      </div>
      <div>
        <div className="w-100 mb-2 d-flex align-items-center textdiv">
          <Form.Control
            className="inputbox"
            type="text"
            placeholder="Type Here..."
            style={{
              borderRadius: "20px",
              color: "black",
              border: "solid 1px",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 && sendMessage1(e.target.value)}
          />
          <VscSend
            size={25}
            onClick={() => sendMessage1(message)}
            style={{ margin: "-40px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
