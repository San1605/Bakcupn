import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { utils } from "../../utils/meetingUtils";
import { CallClient, LocalVideoStream } from "@azure/communication-calling";
// import { CallAutomationClient } from '@azure/communication-call-automation';
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import LocalStreamMedia from "./LocalStreamMedia";
import ScreenShare from "./ScreenShare";
import MediaGallery from "./MediaGallery";
import Report from "../Report/Report";
import { Grid } from "react-loader-spinner";
// import fs from "fs"
import {
  BsMicMute,
  BsMic,
  BsCameraVideo,
  BsCameraVideoOff,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { TbScreenShare, TbScreenShareOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Meeting.css";
import OnCall from "../../components/OnCallChats/OnCall";
import patientImg from "../../assets/icons/profile.svg";
import medicineIcon from "../../assets/icons/medicineIcon.svg";
import PrescriptionModal from "../../components/PrescriptionModal/PrescriptionModal";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useProSidebar } from "react-pro-sidebar";
import pdfIcon from "../../assets/icons/pdfIcon.png";
import axios from "axios";
import { startRecordingApi } from "../../services/patientApi";


const Meeting = ({
  userToken,
  communicationUserId,
  groupId,
  chatMessages,
  setChatMessages,
  call,
  setCall,
}) => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  groupId = id;
  const [userName] = useState("User " + Math.random(1, 999));
  const [callAgent, setCallAgent] = useState(null);
  const [deviceManager, setDeviceManager] = useState(null);
  const [selectedCameraDeviceId, setSelectedCameraDeviceId] = useState("");
  const [selectedMicrophoneDeviceId, setSelectedMicrophoneDeviceId] =
    useState("");
  const [selectedSpeakerDeviceId, setSelectedSpeakerDeviceId] = useState("");
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callState, setCallState] = useState("");
  const [screenShareStream, setScreenShareStream] = useState();
  const [view, setView] = useState(null);
  const [isMicrosphoneEnabled, setIsMicrophone] = useState(false);
  const [localVideoStream, setLocalVideoStream] = useState(null);
  const tempUserName = "User " + Math.random(1, 999);
  const [remoteParticipants, setRemoteParticiPants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [speakers, setSpeakers] = useState();
  const [cameras, setCameras] = useState();
  const [microphones, setMicrophones] = useState();
  const [tokenCredential, setTokenCredential] = useState(null);
  const [isDicom, setIsDicom] = useState(false);
  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const isDoctor = localStorage.getItem("userType") === "doctor" ? true : false;
  const [initialTime, setInitialTime] = useState(Date.now());
  const [currTime, setCurrTime] = useState(new Date());
  const [meetTime, setMeetTime] = useState();
  const [remainingTime, setRemainingTime] = useState();
  const [menuCollapse, setMenuCollapse] = useState();
  const [tabs, setTabs] = useState(["In-Call Messages", "Patient details"]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);


  let appReducerData = useSelector((state) => {
    return state.AppReducer;
  });

  const [arr, setArr] = useState([
    {
      medicineName: "",
      frequency: "",
      duration: "",
      instruction: "",
      notes: "",
    },
  ]);
  const [chiefConcern, setChiefConcern] = useState({
    desc: "",
    sinceWhen: "",
    complaint: "",
  });

  const [diagnosis, setDiagnosis] = useState({
    desc: "",
    discoveredOn: "",
    concern: "",
  });
  const [followUp, setFollowUp] = useState({
    date: "",
    time: "",
  });

  async function initClient(token) {
    setIsLoading(true);
    if (callAgent) {



      
      // Dipose before initialize callAgent if already callAgent is set.
      await callAgent.dispose();

      setIsLoading(false);
    }
    try {
      const tokenCredential = new AzureCommunicationTokenCredential({
        token: token,
      });
      setTokenCredential(tokenCredential);
      const callClient = new CallClient();
      // console.log("callClient", callClient);
      const addedCallAgent = await callClient.createCallAgent(tokenCredential, {
        displayName: userName ? userName : tempUserName,
      });




      // const callInvite = await addedCallAgent.waitForCall() 
      // const serverCallId = callInvite.callId;
      // console.log(serverCallId,"**********************************")
      console.log("addedCallAgent", addedCallAgent);








      const addedDeviceManager = await callClient.getDeviceManager();
      const result = await addedDeviceManager.askDevicePermission({
        audio: true,
        video: true,
      });
      const speakers = await addedDeviceManager.getSpeakers();
      const microphones = await addedDeviceManager.getMicrophones();
      const cameras = await addedDeviceManager.getCameras();

      setSpeakers(speakers);
      setMicrophones(microphones);
      setCameras(cameras);

      if (result.audio !== undefined) {
        if (result.audio) {
          setSelectedMicrophoneDeviceId(microphones[0].id);
          setSelectedSpeakerDeviceId(speakers[0].id);
        }
      }
      if (result.video !== undefined) {
        if (result.video) {
          setSelectedCameraDeviceId(cameras[0].id);
          const localvs = new LocalVideoStream(cameras[0]);
          setLocalVideoStream(localvs);
          setIsVideoEnabled(true);
        }
      }
      // console.log("addedCallAgent",addedCallAgent);
      setCallAgent(addedCallAgent);
      // addedCallAgent.callerInfo.getServerCallId().then(result => {
      //   console.log("getServerCallId ======>",result);
      // })
      setDeviceManager(addedDeviceManager);
      setIsLoading(false);
      addedCallAgent.on("callsUpdated", (e) => {
        e.added.forEach((addedCall) => {
          if (call && addedCall.isIncoming) {
            addedCall.reject();
            return;
          }
          addedCall.on("stateChanged", () => {
            if (addedCall.state === "Connected")
              setCallState(addedCall.state);
          });

          addedCall.on("remoteParticipantsUpdated", (ev) => {
            ev.added.forEach((addedRemoteParticipant) => {
              subscribeToParticipant(addedRemoteParticipant, addedCall);
              setRemoteParticiPants([...addedCall.remoteParticipants]);
            });

            if (ev.removed.length > 0) {
              setRemoteParticiPants([...addedCall.remoteParticipants]);
            }
          });

          addedCall.on("isScreenSharingOnChanged", (ev) => {
            setIsScreenSharing(addedCall.isScreenSharingOn);
          });

          const rp = [...addedCall.remoteParticipants];
          rp.forEach((v) => subscribeToParticipant(v, addedCall));
          setRemoteParticiPants(rp);
          setCallState(addedCall.state);
        });

        const subscribeToParticipant = (participant, call) => {
          const userId = utils.getId(participant.identifier);
          participant.on("stateChanged", () => {
            setRemoteParticiPants([...call.remoteParticipants]);
          });

          participant.on("videoStreamsUpdated", (e) => {
            e.added.forEach((addedStream) => {
              if (addedStream.type === "Video") {
                return;
              }
              addedStream.on("isAvailableChanged", () => {
                if (addedStream.isAvailable) {
                  setScreenShareStream(addedStream);
                  setIsScreenShared(true);
                } else {
                  setScreenShareStream(undefined);
                  setIsScreenShared(false);
                }
              });
            });
          });
        };
      });
    } catch (error) { }
  }


  const handleCamera = (event) => setSelectedCameraDeviceId(event.target.value);

  const handleMicrophone = (event) => {
    setSelectedMicrophoneDeviceId(event.target.value);
    const microphoneDeviceInfo = microphones.find((microphoneDevice) => {
      return microphoneDevice.id === event.target.value;
    });
    setIsMicrophone(true);
    deviceManager.selectMicrophone(microphoneDeviceInfo);
  };
  const handleSpeaker = async (event) => {
    setSelectedSpeakerDeviceId(event.target.value);
    const speakerDeviceInfo = speakers.find((speakerDevice) => {
      return speakerDevice.id === event.target.value;
    });
    deviceManager.selectSpeaker(speakerDeviceInfo);
  };

  async function toggleVideoCamera() {
    const cameraDeviceInfo = await cameras.find((cameraDevice) => {
      return cameraDevice.id === selectedCameraDeviceId;
    });

    const isVideo = !isVideoEnabled;
    const localvs = new LocalVideoStream(cameraDeviceInfo);
    setLocalVideoStream(isVideo ? localvs : undefined);
    setIsVideoEnabled(isVideo);

    if (isVideo && call) {
      await call.startVideo(localvs);
      // console.log( "Remove Video is sent" );
    } else if (!isVideo && call) {
      try {
        await call.stopVideo(call.localVideoStreams[0]);
        view.dispose();
        // console.log( "Remove Video is stopped" );
      } catch (error) {
        // console.log( error );
      }
    } else if (!isVideo && !call) {
      if (view) {
        view.dispose();
      }
    }
  }

  async function toggleSpeaker() {
    setIsSpeakerEnabled(!isSpeakerEnabled);
  }

  async function toggleMicrophone() {
    try {
      if (isMicrosphoneEnabled && call) {
        await call.mute();
        setIsMicrophone(!isMicrosphoneEnabled);
      } else if (!isMicrosphoneEnabled && call) {
        await call.unmute();
        setIsMicrophone(!isMicrosphoneEnabled);
      } else {
        setIsMicrophone(!isMicrosphoneEnabled);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getCallOptions() {
    let callOptions = {
      videoOptions: {
        localVideoStreams: undefined,
      },
      audioOptions: {
        muted: !isMicrosphoneEnabled,
      },
    };

    if (isVideoEnabled) {
      callOptions.videoOptions = { localVideoStreams: [localVideoStream] };
    } else {
      callOptions.videoOptions = { localVideoStreams: undefined };
    }
    console.log(callOptions, "callOptions");
    return callOptions;
  }

  async function startCall() {
    // console.log("start call");
    try {
      const callOptions = await getCallOptions(false);
      // console.log(callOptions);
      const call = callAgent.join({ groupId: groupId }, callOptions);

      // initChatClient();
      console.log("CALL OBJECT ===>", call);

      console.log(call.id,"erytuyudhffytyfdhguyfhdgfggfjghfgfgfghfjfjghfxfydhffyh") 
      setCall(call);
     if(call)startRecording(call.id)
    } catch (e) {
      console.log(e, "in catch");
      toast.error("Failed to join a call");
      // setInterval(function () {
      //   dispatch(toggleSidebar(true));
      //   collapseSidebar();
      //   navigate(isDoctor ? "/doctor/home" : "/home");
      // }, 2500);
      console.error("Failed to join a call", e);
    }
  }

  function hangUpCall() {
    call.hangUp();
    if (isDoctor) {
      setPrescriptionModal(true);
    } else {
      navigate("/home");
      toast(
        "Once the doctor updates and sends the prescription, you will receive it as the meeting has concluded."
      );
    }
  }

  async function toggleScreenShare() {
    if (call && !isScreenSharing) {
      await call.startScreenSharing();
    } else if (call && isScreenSharing) {
      await call.stopScreenSharing();
    }
    setIsScreenSharing(!isScreenSharing);
  }

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours}:${minutes % 60}:${seconds % 60}`;
  };

  const handleTabChange = (i) => {
    setActiveTabIndex(i);
  };

 


  const startRecording = async (callId) => {
    try {
      const response =  await startRecordingApi(callId)
      if (response) {
        console.log(response)
      }
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      setCurrTime(new Date());
      const currentTime = Date.now();
      const elapsed = currentTime - initialTime;
      setMeetTime(elapsed);
      const duration = 30 * 60 * 1000; // 30 minutes in milliseconds
      const remaining = duration - elapsed;
      setRemainingTime(remaining);
    }, 1000);
    if (appReducerData?.sidebarCollapse === true) {
      dispatch(toggleSidebar(false));
      collapseSidebar();
    }
  }, [])

  useEffect(() => {
    if (userToken) {
      setIsLoading(true);
      initClient(userToken);
      // console.log("hello");

    }
  }, [userToken]);
 
  return (
    <>
      <div className={`meeting app ${menuCollapse ? "toggled" : ""}`}>
        {!isDicom ? (
          <div className="w-100 h-100">
            {call && call.state === "Connected" ? (
              <>

                <div className="d-flex justify-content-between align-items-center w-100 p-0 m-0 mb-1">
                  <div>
                    <h3 className="heading-overview mb-1 p-0">
                      My Appointments
                    </h3>
                    <h2 className="heading-homepage p-0">
                      Appointments\active booking
                    </h2>
                  </div>
                  {isDoctor && (
                    <Button
                      type="primary"
                      text="DICOM Viewer"
                      onClick={() => {
                        setIsDicom(!isDicom);
                      }}
                      className="py-2 px-4 h-50 rounded"
                    />
                  )}
                </div>
                <div className="d-flex flex-column flex-lg-row flex-md-row w-100 gap-3 main-parent">
                  <div className="main-container">
                    {isScreenShared && (
                      <ScreenShare stream={screenShareStream} />
                    )}
                    <MediaGallery
                      meetTime={meetTime}
                      remoteParticipants={remoteParticipants}
                      userId={communicationUserId}
                      displayName={userName ? userName : tempUserName}
                      localVideoStream={localVideoStream}
                      setView={setView}
                    />
                    <div className="button-container overflow-auto">
                      <div className="time-info">
                        <div className="time text-nowrap">
                          {currTime.toLocaleTimeString()} |
                          <span className="meet-id"> qzy-mptq-dro</span>
                        </div>
                      </div>
                      <div className="Call-grid-item Call-grid-btns">
                        <button
                          className={
                            isSpeakerEnabled
                              ? "Call-button mic-btn callBtns enable"
                              : "Call-button mic-btn callBtns disbale"
                          }
                          itemType="button"
                          // disabled={!selectedMicrophoneDeviceId}
                          onClick={toggleSpeaker}
                        >
                          {isSpeakerEnabled ? (
                            <BiVolumeFull />
                          ) : (
                            <BiVolumeMute />
                          )}
                        </button>

                        <button
                          className={
                            isMicrosphoneEnabled
                              ? "Call-button mic-btn callBtns enable"
                              : "Call-button mic-btn callBtns disbale"
                          }
                          itemType="button"
                          disabled={!selectedMicrophoneDeviceId}
                          onClick={toggleMicrophone}
                        >
                          {isMicrosphoneEnabled ? <BsMic /> : <BsMicMute />}
                        </button>

                        <button
                          className={
                            isVideoEnabled
                              ? "Call-button mic-btn callBtns enable"
                              : "Call-button mic-btn callBtns disbale"
                          }
                          itemType="button"
                          disabled={!selectedCameraDeviceId}
                          onClick={toggleVideoCamera}
                        >
                          {!isVideoEnabled ? (
                            <BsCameraVideoOff />
                          ) : (
                            <BsCameraVideo />
                          )}
                        </button>
                        <button
                          style={{ backgroundColor: "#EB5757" }}
                          className="Call-button end-btn callBtns"
                          itemType="button"
                          disabled={!call || call.state === "Disconnected"}
                          onClick={hangUpCall}
                        >
                          <AiOutlineClose style={{ color: "#fff" }} />
                        </button>

                        <button
                          className={
                            !isScreenSharing
                              ? "Call-button mic-btn callBtns diable"
                              : "Call-button mic-btn callBtns enable"
                          }
                          itemType="button"
                          disabled={!call || call.state === "Disconnected"}
                          onClick={toggleScreenShare}
                        >
                          {!isScreenSharing ? (
                            <TbScreenShare />
                          ) : (
                            <TbScreenShareOff />
                          )}
                        </button>
                        {isDoctor && (
                          <button
                            className="Call-button callBtns"
                            itemType="button"
                            onClick={() => {
                              console.log("prescription show");
                              setPrescriptionModal(true);
                            }}
                          // disabled={!call || call.state === "Disconnected"}
                          >
                            <img src={medicineIcon} alt="" />
                          </button>
                        )}
                        {/* <button  className="Call-button callBtns"> <img src={tablet_img} alt="" /></button> */}
                      </div>
                      <div className="d-flex time-btn-cont">
                        <span className="text-nowrap">
                          <b className="text-bold">Time left</b>
                        </span>
                        <div className="time_button">
                          {formatTime(remainingTime)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-container">
                    <div className="inCall-Messages">
                      <div className="incallTabs">
                        {tabs.map((tab, i) => {
                          return (
                            <>
                              {i === 1 ? (
                                <>
                                  {isDoctor === true && (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        handleTabChange(i);
                                      }}
                                      className={`tab ${activeTabIndex === i && "activeTab"
                                        }`}
                                    >
                                      {tab}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div
                                  onClick={() => {
                                    handleTabChange(i);
                                  }}
                                  className={`tab ${activeTabIndex === i &&
                                    isDoctor &&
                                    "activeTab"
                                    }
                                    ${!isDoctor && "fw-600"}
                                    `}
                                >
                                  {tab}
                                </div>
                              )}
                            </>
                          );
                        })}
                      </div>
                      {activeTabIndex === 0 ? (
                        <OnCall
                          tokenCredential={tokenCredential}
                          userName={userName}
                          tempUserName={tempUserName}
                          // // setInCallMessageDialog={setInCallMessageDialog}
                          chatMessages={chatMessages}
                          setChatMessages={setChatMessages}
                          communicationUserId={communicationUserId}
                        />
                      ) : (
                        <div className="patientDetailsCard">
                          <div className="patientInfo">
                            <div>
                              <img src={patientImg} alt="" />
                            </div>
                            <div className="content">
                              <div className="pInfo">
                                <span>Suresh Raina</span>
                                <div className="pMetaInfo">
                                  <div>
                                    <span>Age: </span>36
                                  </div>
                                  <div>
                                    <span>Gender: </span>Female
                                  </div>
                                </div>
                              </div>
                              <p style={{ marginBottom: "0" }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut et massa mi. Aliquam in
                                hendrerit urna.
                              </p>
                            </div>
                          </div>
                          <div className="docsContaienr">
                            <div className="docsHeader">
                              <div className="docs-title">Last Interaction</div>
                              <a href="#">View All</a>
                            </div>
                            <div className="pdf-container">
                              {[
                                {
                                  fileIcon: pdfIcon,
                                  fileName: "Report.pdf",
                                  fileDate: "2-04-2023",
                                },
                                {
                                  fileIcon: pdfIcon,
                                  fileName: "Prescription.pdf",
                                  fileDate: "24-04-2023",
                                },
                                {
                                  fileIcon: pdfIcon,
                                  fileName: "MRI-Report.pdf",
                                  fileDate: "29-09-2022",
                                },
                                {
                                  fileIcon: pdfIcon,
                                  fileName: "X-ray.pdf",
                                  fileDate: "14-01-2023",
                                },
                              ].map((item) => {
                                return (
                                  <div className="pdfCont">
                                    <img src={item.fileIcon} alt="" />
                                    <div>
                                      <h5>{item?.fileName}</h5>
                                      <span>{item?.fileDate}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <LocalStreamMedia
                      type={2}
                      key={communicationUserId}
                      displayName={userName ? userName : tempUserName}
                      stream={localVideoStream}
                      setView={setView}
                      style={{
                        width: "100%",
                        height: "160px",
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className=" h-100 w-100 d-flex align-items-center justify-content-center">
                <div
                  className="device-information "
                  style={{
                    width: "70%",
                    // margin: "7rem auto",
                    margin: "0 2rem 2rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <Row
                    style={{
                      width: "100%",
                    }}
                  >
                    <Col
                      md={7}
                      sm={12}
                      className="text-center"
                      style={{ minWidth: "30rem !important" }}
                    >
                      {isLoading ? (
                        <div
                          className="d-flex h-100 align-items-center justify-content-center"
                          style={{ minWidth: "30rem" }}
                        >
                          <Grid
                            height="60"
                            width="60"
                            color="#f3bf47"
                            ariaLabel="grid-loading"
                            radius="12.5"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        </div>
                      ) : (
                        <div
                          className="start-call"
                          style={{
                            borderRadius: "1rem",
                            overflow: "hidden",
                          }}
                        >
                          <LocalStreamMedia
                            type={1}
                            stream={localVideoStream}
                            setView={setView}
                          />
                        </div>
                      )}
                    </Col>
                    <Col md={5} sm={12} className="d-flex align-items-center">
                      <div className="Call-grid-item">
                        <Form
                          className="mb-2"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "20rem",
                          }}
                        >
                          <Form.Group className="mb-3" controlId="camera">
                            <Form.Label>
                              <b>Camera</b>
                            </Form.Label>
                            <Form.Select
                              aria-label="Select Camera"
                              name="camera"
                              id="camera"
                              value={selectedCameraDeviceId}
                              onChange={handleCamera}
                            >
                              <option
                                key="camera-none"
                                id="camera-none"
                                value=""
                              >
                                Not selected
                              </option>
                              {cameras &&
                                cameras.map((camera) => (
                                  <option
                                    key={camera.id}
                                    id={camera.id}
                                    value={camera.id}
                                  >
                                    {camera.name}
                                  </option>
                                ))}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Microphone">
                            <Form.Label>
                              <b>Microphone</b>
                            </Form.Label>
                            <Form.Select
                              aria-label="Select Microphone"
                              name="microphone"
                              id="microphone"
                              value={selectedMicrophoneDeviceId}
                              onChange={handleMicrophone}
                            >
                              <option
                                key="camera-none"
                                id="camera-none"
                                value=""
                              >
                                Not selected
                              </option>
                              {microphones &&
                                microphones.map((microphone) => (
                                  <option
                                    key={microphone.id}
                                    id={microphone.id}
                                    value={microphone.id}
                                  >
                                    {microphone.name}
                                  </option>
                                ))}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Speaker">
                            <Form.Label>
                              <b>Speaker</b>
                            </Form.Label>
                            <Form.Select
                              aria-label="Select Speaker"
                              name="speaker"
                              id="speaker"
                              value={selectedSpeakerDeviceId}
                              onChange={handleSpeaker}
                            >
                              <option
                                key="camera-none"
                                id="camera-none"
                                value=""
                              >
                                Not selected
                              </option>
                              {speakers &&
                                speakers.map((speaker) => (
                                  <option
                                    key={speaker.id}
                                    id={speaker.id}
                                    value={speaker.id}
                                  >
                                    {speaker.name}
                                  </option>
                                ))}
                            </Form.Select>
                          </Form.Group>
                        </Form>
                        <button
                          className="new-meeting-btn"
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          disabled={!callAgent}
                          onClick={() => startCall()}
                        >
                          Join Now
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-100">
            <Report
              communicationUserId={communicationUserId}
              userName={userName}
              tempUserName={tempUserName}
              localVideoStream={localVideoStream}
              setView={setView}
              setIsDicom={setIsDicom}
            />
          </div>
        )}
      </div>
      {prescriptionModal && (
        <>
          <PrescriptionModal
            callEnded={call.state !== "Connected"}
            show={prescriptionModal}
            setPrescriptionModal={setPrescriptionModal}
            arr={arr}
            setArr={setArr}
            chiefConcern={chiefConcern}
            setChiefConcern={setChiefConcern}
            diagnosis={diagnosis}
            setDiagnosis={setDiagnosis}
            followUp={followUp}
            setFollowUp={setFollowUp}
          />
        </>
      )}
    </>
  );
};
export default Meeting;