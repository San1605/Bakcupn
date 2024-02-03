import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopMostNav } from "../components/TopMostNav";
import TranscriptChat from "../components/transcript/TranscriptChat";
import Conversation from "./Conversation";

import Audio from "../assets/call-8.wav";
import summaryData from "../assets/call-8 (2).json";
import ExtensionModal from "../components/ExtensionModal/ExtensionModal";
import { Context } from "../context/ContextProvider";
const Home = () => {
  const { socket, setChat, setCallStatus , extensionId ,  AuthToken  , setAuthToken ,  callid , setCallid} = useContext(Context)
  const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate(); 
  const { show, setShow } = useContext(Context);
  const [audioTotalTime, setAudioTotalTime] = useState(0.01);
  const [isProgress, setIsprogress] = useState(true);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  useEffect(()=>{
if(extensionId===""){
  setShow(true)
  console.log(extensionId , "mj")
}
  } , [])

  useEffect(() => {
    if (socket) {
      socket.on("start", (response) => {
        setCallStatus(true);
        setChat([])
        setCallid(response?.channelData?.callID)
        console.log(response, "call connected");

      })

      socket.on("end", (response) => {
        // setChat([])
        setCallStatus(false)
        console.log(response, "call disconnected")
      }) 
      socket?.on('error', (error) => {
        // Assuming you've defined an error code for authentication issues (e.g., 'AUTH_ERROR')
        localStorage.clear();
        socket.disconnect();
          navigate('/login');
      });


      return () => {
        socket.off("start");
        socket.off("end");
      }
    }
  }, [socket , extensionId])

  const location = useLocation();
  // let summaryData = [];
  let fileType = "audio";
  let fileUrl = { Audio };
  if (location.state) {
    // summaryData = location.state.filedata;
    summaryData = summaryData.filedata;
    fileUrl = summaryData.fileUrl;
    if (summaryData.fileType) {
      fileType = summaryData.fileType;
    }
  }
  console.log(callid , "myid")
  // console.log(summaryData.length, "length");
  // console.log(summaryData.chat, "length");
  useEffect(() => {
    if (audioTotalTime <= currentTime) {
      setTimeout(() => {
        setIsprogress(false);
      }, 2000);
    }
  }, [currentTime, audioTotalTime]);
  return (
    <div className="main-app">
      <TopMostNav />
      <div className="p-3 h-[calc(100vh_-_60px)] w-[100vw] overflow-hidden flex gap-x-1 gap-y-1">
        <div className="w-[35%] flex flex-col gap-y-2">
        {(callid !== "" && callid !== undefined) &&  
        <div className="flex border-2 border-[#00829B] text-[#00829B] p-1 h-[12%] rounded items-center gap-2 bg-[white] overflow-x-auto">
        <div className="whitespace-nowrap flex-shrink-0">Call id :</div>
        <div style={{ width: '80%'  }}>
          {(callid === "" && callid === undefined) ? "Call in Progress" : callid}
        </div>
      </div>
      }
          <div className="flex gap-3 w-100" style={{height:`${(callid !== "" && callid !== undefined) ? "88%" : "100%"}`}}>
            <div className="flex flex-col w-100 rounded-lg border border-gray-300 bg-white shadow-md">
              <div className=" px-4 py-2 bg-[#00829B] rounded-t-lg border-b border-gray-300 h-[40px] flex items-center">
                <h5
                  className="text-white m-0 font-semibold"
                  style={{ fontSize: "18px !important" }}
                >
                  Transcript
                </h5>
              </div>
              <div className="h-[calc(100%_-_40px)] flex items-end justify-between gap-2 bg-white overflow-hidden">
                {/* <VerticalStepper className="pt-2 bg-[#F8F9F9]" /> */}
                <TranscriptChat
                  isProgress={isProgress}
                  currentTime={currentTime}
                  transcript={summaryData?.chat}
                  scores={summaryData.length > 0 ? summaryData[0].scores : ""}
                  style={{ border: "2px solid red !important" }}
                  className="border-2 border-[#ff00ff]"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-[65%]"
        >
          <Conversation />
        </div>
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExtensionModal show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} />
    </div>
  );
};

export default Home;
