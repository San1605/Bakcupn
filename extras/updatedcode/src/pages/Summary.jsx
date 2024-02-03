import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";
import { TopMostNav } from "../components/TopMostNav";
import { Container, Row, Col } from "react-bootstrap";
import TranscriptChat from "../components/transcript/TranscriptChat";
import TranscriptPlayer from "../components/audioPlayer/TranscriptPlayer";
import Audio from "../assets/call-8.wav";
import summaryData from "../assets/call-8 (2).json";
import audioIcon from "../assets/images/audio_bot.svg";

const Summary = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [audioTotalTime, setAudioTotalTime] = useState(0.01);
  const [isProgress, setIsprogress] = useState(true);

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
  console.log(summaryData.length, "length");
  console.log(summaryData.chat, "length");
  useEffect(() => {
    if (audioTotalTime <= currentTime) {
      setTimeout(() => {
        setIsprogress(false);
      }, 2000);
    }
  }, [currentTime, audioTotalTime]);

  const Question = () => {
    return (
      <div className="bg-[#fff] rounded-md w-full flex items-center gap-x-3 p-2">
        <input
          type="checkbox"
          name="check"
          id="check"
          style={{ borderColor: "#00829B !important" }}
          className="accent-[#00829B] cursor-pointer"
        />
        <div className="flex flex-col">
          <p className="m-0 text-[#7A7A7A] text-[12px]">
            Lorem ipsum dolor sit abet, connecter.......
          </p>
          <p className="m-0 text-[#353535] text-[14px] leading-4 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="m-0 text-[#5A5A5A] text-[10px] pt-1">01:03 min</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <TopMostNav />
      <Container fluid className="mt-3 p-2">
        <Row>
          <Col md={8} sm={12} style={{ minHeight: "100% !important" }}>
            {fileType === "audio" ? (
              <AudioPlayer
                fileUrl={fileUrl}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                audioTotalTime={audioTotalTime}
                setAudioTotalTime={setAudioTotalTime}
              />
            ) : (
              <TranscriptPlayer
                chat={summaryData.length > 0 ? summaryData[0].chat : ""}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                audioTotalTime={audioTotalTime}
                setAudioTotalTime={setAudioTotalTime}
              />
            )}
            <TranscriptChat
              isProgress={isProgress}
              currentTime={currentTime}
              transcript={summaryData?.chat}
              scores={summaryData.length > 0 ? summaryData[0].scores : ""}
            />
          </Col>
          <Col md={4} sm={12} style={{ minHeight: "100% !important" }}>
            <div className="flex flex-col gap-y-6 h-full w-full">
              <div className="h-[60%] flex flex-col w-full border border-[#E7E7E7] rounded-lg overflow-hidden">
                <div className="flex gap-x-4 items-center px-4 py-2 border-b border-[#E9E9E9]">
                  <img src={audioIcon} alt="audioIcon" height={20} />
                  <p className="m-0 font-bold text-sm">
                    Knowledge Miner
                  </p>
                </div>
                <div className="h-[160px] mt-2 mx-4 bg-[#F4F4F4] p-2 flex flex-col gap-y-2 overflow-y-auto">
                  <Question />
                  <Question />
                  <Question />
                  <Question />
                  <Question />
                  <Question />
                </div>
                {/* <div className="mt-2 w-full flex items-center justify-center gap-x-2">
                  <div className="font-medium cursor-pointer rounded h-[26px] w-[22px] pb-1 flex items-center justify-center bg-[#00829B36]">
                    {"<"}
                  </div>
                  <div className="font-medium cursor-pointer rounded h-[26px] w-[22px] pb-1 flex items-center justify-center">
                    {">"}
                  </div>
                </div> */}
                <div className="mt-2 generate w-full flex justify-end py-2 px-4 border-t border-[#E9E9E9]">
                  <div className="py-1.5 px-3 rounded-[4px]  bg-[#00829B] text-[#fff] text-xs cursor-pointer">
                    Generate Response
                  </div>
                </div>
              </div>
              <div className="h-[40%] w-full border border-[#E7E7E7] rounded-lg overflow-hidden">
                <div className="flex gap-x-4 items-center px-4 py-2 border-b border-[#E9E9E9]">
                  <p className="m-0 font-bold text-sm">Response</p>
                </div>
                <div className="w-full h-[140px] flex flex-col overflow-y-auto p-2">
                  <div className="bg-[#EFF6F8] p-2">
                    <div className="text-xs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. PellentesqueA1.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. PellentesqueA1.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. PellentesqueA1.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. Pellentesque.
                    </div>
                    <div className="text-[#5a5a5a] text-[10px]">00:45 sec</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Summary;
