import React, { useContext, useEffect, useState, useRef } from "react";
import "./transcript.css";
import { Button } from "react-bootstrap";
import { SetimentIcon } from "./SetimentIcon";
import ShowScore from "../model/ShowScore";
import Empty from "../../assets/images/EmptyState.svg"
import { Context } from "../../context/ContextProvider";

const TranscriptChat = ({ currentTime, transcript, scores }) => {
  const { chat, setChat, socket } = useContext(Context)
  const [audioChat, setAudioChat] = useState([]);
  const [model, setModel] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("transcript", (response) => {
        setChat(prev => [...prev, { type: response.channelData.User, text: response.text }])
      })

      return () => {
        socket.off("transcript")
      }
    }
  }, [socket])

  console.log(chat, 'transcriptchat')

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  let objDiv = document.getElementById("transcript-scroll");
  useEffect(() => {
    const audio_array = [];
    currentTime > 1 &&
      transcript &&
      transcript.map((x, i) => {
        let audioTime = x[1][1];
        if (audioTime === 0) {
          audioTime = 1;
        }
        if (currentTime >= parseInt(audioTime)) {
          if (x[2]) {
            const audio_para = [x[0], x[1], x[2], x[3], x[4]];
            audio_array.push(audio_para);
          }
        }
        setAudioChat(audio_array);
      });
  }, [currentTime]);

  useEffect(() => {
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [audioChat]);

  function secondsToTime(e) {
    var m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");
    return m + ":" + s;
  }

  const handleModel = () => {
    setModel(true);
  };

  const transcriptContainerRef = useRef(null)
  useEffect(() => {
    transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
  }, [chat]);
  return (
    <div className="transcript-card w-full h-full">
      {/* <div className='transcript_tab' >
            {['Transcript', 'History', 'User Info'].map((tab, index) => (
          <div
            key={index}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}

            </div> */}
      <div className="c-body h-full" id="transcript-scroll" ref={transcriptContainerRef}>
        {chat.length === 0 ? (
          // <h6>Chat In Progress</h6>
          <div className="flex justify-center items-center">
            <div className="flex flex-col"> <img src={Empty} alt="emptydata" />
              Play audio for the transcript
            </div>
          </div>
        ) : (
          <div className="transcript-chat">
            {chat.map((chat, index) =>
              chat.type === "agent" ? (
                <div className="agent-chat" key={index}>
                  <div className="d-flex justify-content-start align-item-center">
                    <div className="name-icon">A</div>
                    <div className="chat p-2">{chat.text}</div>
                  </div>
                  {/* <div className="row setiment"> */}
                  {/* <div className='col-5 offset-1 icon1'><SetimentIcon setiment={chat[3]}/></div> */}
                  {/* <div className="col-6 text-end text">
                      {secondsToTime(chat[1][0])}
                    </div> */}
                  {/* </div> */}
                </div>
              ) : (
                chat.type === "caller" && (
                  <div className="customer-chat" key={index}>
                    <div className="d-flex justify-content-start align-item-center">
                      <div className="chat p-2">{chat.text}</div>
                      <div className="name-icon">C</div>
                    </div>
                    {/* <div className="row setiment"> */}
                    {/* <div className="col-5 text">
                        {secondsToTime(chat[1][0])}
                      </div> */}
                    {/* <div className='col-6 icon2 text-end'><SetimentIcon setiment={chat[3]}/></div> */}
                    {/* </div> */}
                  </div>
                )
              )
            )}
          </div>
        )}
      </div>
      {model === true && (
        <ShowScore setModel={setModel} model={model} scores={scores} />
      )}
    </div>
  );
};

export default TranscriptChat;
