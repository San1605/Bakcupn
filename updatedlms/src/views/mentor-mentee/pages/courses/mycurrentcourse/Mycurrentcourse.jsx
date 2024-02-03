import React from "react";
import EnrolledeachContent from "../coursecontent/EnrolledeachContent";
import ReactPlayer from "react-player";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./mycurrentcourse.css";
import CourseReferences from "./courseReferences/CourseReferences";
import CourseDescription from "./courseDescription/CourseDescription";
import CourseCommunity from "./courseCommunity/CourseCommunity";
import addNotesBtn from "../../../../../assets/svg/myCurrentCourses/addNotesBtn.svg";
import { useContext, useRef } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
// import Iframe from "react-iframe";
import readingframe from "../../../../../assets/svg/myCurrentCourses/readingframe.svg";
import opennew from "../../../../../assets/svg/myCurrentCourses/opennew.svg";
import { toast } from "react-hot-toast";
import PauseModal from "../../../../../component/playPauseModal/PauseModal";
import ResumeModal from "../../../../../component/playPauseModal/ResumeModal";
import Iframe from "react-iframe";
function Mycurrentcourse() {
  let { id } = useParams();
  const player = useRef();
  const searchInput = useRef(null);
  const {
    navigate,
    enrolledCourseInfo,
    notesforenrolled,
    addNotes,
    linkforenrolledvideo,
    getvideoafterclick,
    saveanote,
    saveatime,
    posttimeofstartingcourse,
    saveacourseid,
    notes,
    getNotes,
    putupdateofcurrentcourse,
    saveatopicIDinenrolled,
    saveasubtopicIDinenrolled,
    saveasubtopic,
    saveatopic,
    updateoftimefromlasttime,
    runrequest,
    playpause,
  } = useContext(GlobalContext);
  const [contentswitch, setContentswitch] = useState();
  const [iscompleted, setIscompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtopicDescp, setSubtopicDescp] = useState("");
  const [sendrequest, setSendrequest] = useState(false);
  const [note, setNote] = useState("");
  const [timer, setTimer] = useState(0);
  const [putupdate, setPutupdate] = useState(false);
  const [latestupdate, setLatestupdate] = useState(false);
  useEffect(() => {
    if (putupdate === true) {
      putupdateofcurrentcourse(enrolledCourseInfo.courseId);
      setPutupdate(false);
    }
  }, [putupdate]);
  const insametopic = async () => {
    let oldtopic = `${Number(
      enrolledCourseInfo.startData.subTopicId.split(".")[0]
    )}.${Number(enrolledCourseInfo.startData.subTopicId.split(".")[1]) + 1}`;
    let newsubtopicid = Number(oldtopic).toFixed(oldtopic.split(".")[1].length);
    await saveasubtopicIDinenrolled(newsubtopicid);
    await saveatopic(
      enrolledCourseInfo.topics[Number(enrolledCourseInfo.startData.topicId)]
        .topicName
    );
    await saveasubtopic(
      enrolledCourseInfo.topics[Number(enrolledCourseInfo.startData.topicId)]
        .topicData[
        Number(enrolledCourseInfo.startData.subTopicId.split(".")[1])
      ].subtopic
    );
    setPutupdate(true);
  };
  const innexttopic = async () => {
    await saveatopicIDinenrolled(
      Number(enrolledCourseInfo.startData.topicId) + 1
    );
    await saveasubtopicIDinenrolled(
      `${Number(enrolledCourseInfo.startData.topicId)}.0`
    );
    await saveatopic(
      enrolledCourseInfo.topics[Number(enrolledCourseInfo.startData.topicId)]
        .topicName
    );
    await saveasubtopic(
      enrolledCourseInfo.topics[Number(enrolledCourseInfo.startData.topicId)]
        .topicData[0].subtopic
    );
    setPutupdate(true);
  };
  useEffect(() => {
    if (iscompleted === true) {
      if (notes.subtopicID === enrolledCourseInfo.startData.subTopicId) {
        if (
          enrolledCourseInfo.topics[
            Number(enrolledCourseInfo.startData.topicId)
          ].topicData.length >
          Number(enrolledCourseInfo.startData.subTopicId.split(".")[1]) + 1
        ) {
          insametopic();
        } else if (
          enrolledCourseInfo.topics.length >
          Number(enrolledCourseInfo.startData.topicId) + 1
        ) {
          innexttopic();
        } else {
          console.log("you have completed the course");
        }
      }
      setLatestupdate(true);
      setIscompleted(false);
    }
  }, [iscompleted]);
  useEffect(() => {
    if (id) {
      posttimeofstartingcourse(id);
    }
  }, [id]);
  const seektotime = (timeinmin) => {
    let sec = 0;
    if (timeinmin.length === 3) {
      sec =
        Number(timeinmin[0]) * 3600 +
        Number(timeinmin[1]) * 60 +
        Number(timeinmin[2]);
    } else {
      sec = Number(timeinmin[0]) * 60 + Number(timeinmin[1]);
    }
    setTimeout(() => {
      player.current.seekTo(sec);
    }, 1000);
  };

  const findthecontent = async () => {
    console.log(enrolledCourseInfo.startData, "startdata");
    const firstlink =
      enrolledCourseInfo.topics[
        parseInt(enrolledCourseInfo.startData.topicIdLatest)
      ].topicData[
        Number(enrolledCourseInfo.startData.subTopicIdLatest.split(".")[1])
      ];
    if (firstlink.contentType === "Video") {
      await getvideoafterclick(`${firstlink.link1}`);
      setSubtopicDescp(`${firstlink.description}`);
      setContentswitch(false);
      seektotime(enrolledCourseInfo.startData.timeStamp.split(":"));
    } else {
      await getvideoafterclick(`${firstlink.link2}`);
      setContentswitch(true);
    }
    getNotes(true);
  };
  useEffect(() => {
    if (Object.keys(enrolledCourseInfo).length !== 0) {
      if (!enrolledCourseInfo.courseId) {
        navigate("/courses");
      } else {
        runrequest(enrolledCourseInfo.technology);
        findthecontent();
      }
    }
  }, [enrolledCourseInfo]);
  const addnotesfirst = () => {
    setIsPlaying(false);
  };
  useEffect(() => {
    if (sendrequest === true) {
      addNotes();
      setSendrequest(false);
      setNote("");
    }
  }, [sendrequest]);

  const saveintonote = async () => {
    await saveanote(note);
    setSendrequest(true);
  };
  useEffect(() => {
    if (latestupdate === true) {
      updateoftimefromlasttime(enrolledCourseInfo.courseId);
      setLatestupdate(false);
    }
  }, [latestupdate]);
  const convert_to_min = async (e) => {
    const h = Math.floor(e / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");
    await saveatime(`${h}:${m}:${s}`);
    setLatestupdate(true);
  };
  return (
    <>
      {Object.keys(enrolledCourseInfo).length ? (
        <div className="h-100 px-3 py-2 row">
          <div className="col-md-3 col-12 h-100 bg-white">
            <div
              className="py-3 px-2 border-bottom h-10 d-flex align-items-center"
              style={{ fontWeight: "600", fontSize: "17px", color: "#242424" }}
            >
              <div
                className="d-flex align-items-center"
                onClick={() => window.history.back()}
              >
                <img
                  src={arrow}
                  alt="leftArrowIcon"
                  style={{ height: "16px" }}
                  className="pointer"
                />
              </div>
              <p
                className="ps-2"
                style={{ fontSize: "18px", fontWeight: "600 !important" }}
              >
                Course Content
              </p>
            </div>
            <div className="h-90 overflow-y-scroll enrollcourses-div">
              {enrolledCourseInfo.topics.map((elem, index) => {
                return (
                  <EnrolledeachContent
                    coursecontent={elem}
                    setContentswitch={setContentswitch}
                    setIsPlaying={setIsPlaying}
                    setSubtopicDescp={setSubtopicDescp}
                    shouldopen={
                      parseInt(enrolledCourseInfo.startData.topicIdLatest) ===
                      index
                        ? "yes"
                        : "no"
                    }
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-md-9 col-12 px-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div
                className="pt-2"
                style={{ fontWeight: "600", fontSize: "18px" }}
              >
                {enrolledCourseInfo.courseId}
              </div>
              <div
                className="progress-pp-action"
                style={
                  enrolledCourseInfo.completionStatus == 100
                    ? {
                        justifyContent: "end",
                        marginRight: "12px",
                      }
                    : null
                }
              >
                <div className="progressBarContainer">
                  <div className="">
                    <div className="details-head">Progress:</div>
                  </div>
                  <div className="col-7 d-flex flex-row-reverse justify-content-between align-items-center">
                    <p
                      className="col-2 text-end ms-1"
                      style={{ fontSize: "12px" }}
                    >
                      {enrolledCourseInfo.completionStatus}%
                    </p>

                    <div
                      className="progress col-10 mt-0"
                      style={{ background: "#FFEBEB" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: `${enrolledCourseInfo.completionStatus}%`,
                        }}
                        aria-valuemin="00"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>

                {enrolledCourseInfo.completionStatus !== 100 ? (
                  playpause == "" ||
                  playpause == "Pause" ||
                  playpause == "Pause Pending" ? (
                    <PauseModal lpname={enrolledCourseInfo.technology} profile={enrolledCourseInfo.employee_type}/>
                  ) : (
                    <ResumeModal lpname={enrolledCourseInfo.technology} />
                  )
                ) : null}
              </div>
            </div>
            <div
              className="itschild d-flex justify-content-between coursePlayerNotesContainer"
              style={{ columnGap: "1rem" }}
            >
              {contentswitch ? (
                // <h1
                //   onClick={() => setIscompleted(true)}
                //   style={{ width: " 59%", height: "328px" }}
                // >
                //
                //   docs
                // </h1>
                <div style={{ width: "100%" }}>
                  {/* <Iframe
                    url={`${linkforenrolledvideo}#toolbar=0&navpanes=0`}
                    width="640px"
                    height="320px"
                    toolBar="0"
                    id=""
                    className=""
                    display="block"
                    position="relative"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                  /> */}
                  <div className="readingframe-div">
                    <img src={readingframe} alt="readingframe" />
                    <div
                      className="modal-outer-primary-btn opennew pointer"
                      onClick={() =>
                        window.open(linkforenrolledvideo, "_blank")
                      }
                    >
                      <p>Open</p>{" "}
                      <img src={opennew} alt="opennew" height={16} />
                    </div>
                    {contentswitch ? (
                      <h5
                        className="pointer"
                        style={{
                          color: "#4f52b2",
                          fontSize: "12px",
                          textDecoration: "underline",
                          textUnderlineOffset: "5px",
                        }}
                        onClick={() => setIscompleted(true)}
                      >
                        Click here to mark as done
                      </h5>
                    ) : null}
                  </div>
                </div>
              ) : (
                <ReactPlayer
                  ref={player}
                  onEnded={() => setIscompleted(true)}
                  onProgress={(progress) => {
                    setTimer(progress.playedSeconds);
                  }}
                  className="react-player"
                  onPause={() => {
                    convert_to_min(timer);
                  }}
                  playing={isPlaying}
                  controls
                  width="100%"
                  height="400px"
                  url={linkforenrolledvideo}
                />
              )}
              {/* <div
                className="bg-white px-4 py-3 notesContainer"
                style={{ width: "40%" }}
              >
                <div className="row notesHead" style={{ fontSize: "18px" }}>
                  Notes
                </div>
                <div className="d-flex addNotesContainer px-2 py-1 rounded">
                  <input
                    type="text"
                    placeholder="Add notes here..."
                    value={note}
                    className="col-11 addNotesinput px-2"
                    ref={searchInput}
                    onBlur={() => {
                      setIsPlaying(true);
                    }}
                    onClick={() => addnotesfirst()}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        if (note.trim().length != 0) {
                          saveintonote();
                          setNote("");
                          searchInput.current.blur();
                          setIsPlaying(true);
                        } else {
                          toast.error("Empty notes detected");
                        }
                      }
                    }}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <img
                    src={addNotesBtn}
                    alt="addNotesBtn"
                    className="col-1 pointer"
                    onClick={() => {
                      if (note.trim().length != 0) {
                        saveintonote();
                        setNote("");
                      } else {
                        toast.error("Empty notes detected");
                      }
                    }}
                  />
                </div>
                <div
                  className="overflow-y-scroll notes-div mt-2"
                  style={{ height: "200px" }}
                >
                  {notesforenrolled.length !== 0
                    ? notesforenrolled.map((ele, index) => {
                        // console.log(enrolledCourseInfo.topics[notes.topicID].topicData[Number(notes.subtopicID.split(".")[1])].link1 == "","notes");
                        return (
                          <div className="notes-row d-flex py-2 " key={index}>
                            {enrolledCourseInfo.topics[notes.topicID].topicData[
                              Number(notes.subtopicID.split(".")[1])
                            ].link1 !== "" ? (
                              <>
                                <div className="timestamp">
                                  <div className="timestampTime d-flex justify-content-center align-items-center w-100">
                                    {ele.timeFrame == ""
                                      ? "00:00:00"
                                      : ele.timeFrame}
                                  </div>
                                </div>
                              </>
                            ) : null}
                            <div className="notes">{ele.Notes}</div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div> */}
            </div>
            <div className="border my-3" style={{ backgroundColor: "#FFFFFF" }}>
              <Tabs id="controlled-tab-example" defaultActiveKey="Notes">
                {/* <Tab eventKey="References" title="References">
                  <CourseReferences />
                </Tab> */}
                {/* <Tab eventKey="Community" title="Community">
                  <CourseCommunity />
                </Tab> */}
                <Tab eventKey="Notes" title="Notes">
                  <div className="notes-tab px-3 pb-3">
                    <div className="overflow-y-scroll notes-div-tab">
                      {notesforenrolled.length !== 0
                        ? notesforenrolled.map((ele, index) => {
                            // console.log(enrolledCourseInfo.topics[notes.topicID].topicData[Number(notes.subtopicID.split(".")[1])].link1 == "","notes");
                            return (
                              <div
                                className="notes-row notes-row-tab d-flex"
                                key={index}
                              >
                                {enrolledCourseInfo.topics[notes.topicID]
                                  .topicData[
                                  Number(notes.subtopicID.split(".")[1])
                                ].link1 !== "" ? (
                                  <>
                                    <div className="timestamp timestamp-tab">
                                      <div className="timestampTime d-flex justify-content-center align-items-center w-100">
                                        {ele.timeFrame == ""
                                          ? "00:00:00"
                                          : ele.timeFrame}
                                      </div>
                                    </div>
                                  </>
                                ) : null}
                                <div className="notes timestamp-notes-tab">
                                  {ele.Notes}
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    <div className="d-flex addNotesContainer addNotesContainer-tab px-2 py-1 rounded">
                      <textarea
                        rows="1"
                        placeholder="Add notes here..."
                        value={note}
                        className="addNotesinput addNotesinput-tab px-2"
                        ref={searchInput}
                        onBlur={() => {
                          setIsPlaying(true);
                        }}
                        onClick={() => addnotesfirst()}
                        // onKeyDown={(e) => {
                        //   if (e.key == "Enter") {
                        //     if (note.trim().length != 0) {
                        //       saveintonote();
                        //       setNote("");
                        //       searchInput.current.blur();
                        //       setIsPlaying(true);
                        //     } else {
                        //       toast.error("Empty notes detected");
                        //     }
                        //   }
                        // }}
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                      <img
                        src={addNotesBtn}
                        alt="addNotesBtn"
                        className="addNotesBtn-tab pointer"
                        onClick={() => {
                          if (note.trim().length != 0) {
                            saveintonote();
                            setNote("");
                            searchInput.current.blur();
                            setIsPlaying(true);
                          } else {
                            toast.error("Empty notes detected");
                          }
                        }}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Description" title="Description">
                  <CourseDescription subtopicDescp={subtopicDescp} />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <div className="page-loader-div">
          <Bars
            height="50"
            width="50"
            color="#4F52B2"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass="page-loader"
            visible={true}
          />
        </div>
      )}
    </>
  );
}
export default Mycurrentcourse;
