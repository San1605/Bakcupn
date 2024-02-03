import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";
import { TopMostNav } from "../components/TopMostNav";
import { Container, Row, Col } from "react-bootstrap";
import TranscriptChat from "../components/transcript/TranscriptChat";
import ChatDescription from "../components/ChatDescription";
import CallDistribution from "../components/CallDistribution";
import TranscriptKeyword from "../components/TranscriptKeyword";
import NameEntityRecognition from "../components/NameEntityRecognition";
import SetimentGraph from "../components/SetimentGraph";
import WordCloud from "../components/WordCloud";
import TranscriptPlayer from "../components/audioPlayer/TranscriptPlayer";
import Conversation from "./Conversation";
import VerticalStepper from "../components/VerticalStepper";
import Audio from "../assets/call-8.wav";
import summaryData from "../assets/call-8 (2).json";

const FileSummary = () => {
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
  return (
    <>
      <TopMostNav />
      <Container fluid className="mt-3 p-2">
        <Row>
          <Col md={2} sm={12} style={{ minHeight: "100% !important" }}>
            <VerticalStepper />
          </Col>
          <Col md={6} sm={12} style={{ minHeight: "100% !important" }}>
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
          <Col md={4} sm={12} style={{minHeight: "78vh" , maxHeight:"79vh" , }}>
            <Conversation />
          </Col>
        </Row>
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
      </Container>
    </>
  );
};

export default FileSummary;
