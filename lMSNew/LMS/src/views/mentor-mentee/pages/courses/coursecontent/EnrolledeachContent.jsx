import React, { useRef, useState } from "react";
import "./coursecontent.css";
import dropdown from "../../../../../assets/svg/coursecontent/dropdown.svg";
import playvideo from "../../../../../assets/svg/coursecontent/playvideo.svg";
import videoComplete from "../../../../../assets/svg/coursecontent/videoComplete.svg";
import readComplete from "../../../../../assets/svg/coursecontent/readComplete.svg";
import reading from "../../../../../assets/svg/coursecontent/reading.svg";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
// import {SlArrowDown} from "react-icons/sl"
import { useEffect } from "react";
function EnrolledeachContent(props) {
  const {
    getNotes,
    getvideoafterclick,
    saveasubtopicID,
    saveatopicID,
    enrolledCourseInfo,
    notes,
  } = useContext(GlobalContext);

  const contentref = useRef(null);
  const [clickcondition, setClickcondition] = useState(false);
  const contentcontaineref = useRef(null);
  const showinnercoursecontent = () => {
    const contentheight = contentref.current.getBoundingClientRect().height;
    const containerheight =
      contentcontaineref.current.getBoundingClientRect().height;
    if (containerheight > 0) {
      contentcontaineref.current.style.height = `0px`;
      contentcontaineref.current.style.paddingTop = "0";
      contentcontaineref.current.style.paddingBottom = "0";
    } else {
      contentcontaineref.current.style.height = `${contentheight}px`;
      contentcontaineref.current.style.paddingTop = "0.5rem";
      contentcontaineref.current.style.paddingBottom = "0.5rem";
    }
    setDroparrow(!droparrow);
  };
  
  const [droparrow, setDroparrow] = useState(true);
  const setnotedetail = async (innercontentID) => {
    await saveasubtopicID(innercontentID);
    await saveatopicID(props.coursecontent.topicId);
    setClickcondition(true);
  };
  useEffect(() => {
    if (clickcondition === true) {
      getNotes(false);
      setClickcondition(false);
    }
  }, [clickcondition]);
  useEffect(() => {
    if (props.shouldopen === "yes") {
      setTimeout(() => {
        showinnercoursecontent();
      }, (1500));
    }
  }, []);
  function propvalidator(a, b) {
    if (Number(a.split(".")[0]) < Number(b.split(".")[0])) {
      return true;
    } else if (Number(a.split(".")[0]) > Number(b.split(".")[0])) {
      return false;
    } else {
      if (Number(a.split(".")[1]) > Number(b.split(".")[1])) {
        return false;
      }
      return true;
    }
  }
  return (
    <div className="px-2 py-2 justify-content-between border-bottom">
      <div
        className="moduleheading row pointer justify-content-around"
        onClick={() => showinnercoursecontent()}
        style={{ padding: "5px" }}
      >
        <div
          className={
            Number(props.coursecontent.topicId) <=
            Number(enrolledCourseInfo.startData.topicId)
              ? "heading-true w-75"
              : "heading-unread w-75"
          }
          style={{ fontSize: "15px" }}
        >
          {props.coursecontent.topicName}
        </div>
        <div className="w-10 row justify-content-between align-items-center">
          {droparrow ? (
            <img src={dropdown} alt="dropdown" style={{ height: "6px" }} />
          ) : (
            <img
              src={dropdown}
              alt="dropdown"
              style={{ height: "6px", rotate: "180deg" }}
            />  
          )}
        </div>
      </div>
      <div className="hiddencoursecontent" ref={contentcontaineref}>
        <ul className="courseul list-unstyled m-0" ref={contentref}>
          {props.coursecontent.topicData.map((elem, index) => {
            let conditioncheck = propvalidator(
              elem.ID,
              enrolledCourseInfo.startData.subTopicId
            );
            return (
              <li
                key={index}
                className="d-flex px-2 py-2 justify-content-center pointer"
                style={{ columnGap: "1rem" }}
                onClick={() => {
                  if (
                    conditioncheck
                    // parseFloat((elem.ID).toFixed(elem.ID.split(".")[1].length)) <=
                    // parseFloat((enrolledCourseInfo.startData.subTopicId).toFixed(enrolledCourseInfo.startData.subTopicId.split(".")[1].length))
                  ) {
                    if (elem.contentType === "Video") {
                      getvideoafterclick(elem.link1);
                      props.setContentswitch(false);
                      props.setIsPlaying(true);
                    } else {
                      getvideoafterclick(elem.link2);
                      props.setContentswitch(true);
                      // window.open(elem.link2, "_blank");
                    }
                    props.setSubtopicDescp(elem.description);
                    setnotedetail(elem.ID);
                  }
                }}
              >
                <div className="d-flex justify-content-center ">
                  <img
                    src={
                      propvalidator(
                        elem.ID,
                        enrolledCourseInfo.startData.subTopicId
                      )
                        ? elem.contentType === "Video"
                          ? videoComplete
                          : readComplete
                        : elem.contentType === "Video"
                        ? playvideo
                        : reading
                    }
                    alt="courseicon"
                    style={{ height: " 24px", marginTop: "3px" }}
                  />
                </div>
                <div className="d-flex w-75">
                  <p
                    className={
                      propvalidator(
                        elem.ID,
                        enrolledCourseInfo.startData.subTopicId
                      )
                        ? "video-topictitle course-done-text"
                        : "video-topictitle course-undone-text"
                    }
                  >
                    {elem.contentType}: &nbsp;
                    <span
                      className={
                        propvalidator(
                          elem.ID,
                          enrolledCourseInfo.startData.subTopicId
                        )
                          ? "video-topictitle-span course-done-text w-100"
                          : "video-topictitle-span course-undone-text w-100"
                      }
                    >
                      {elem.subtopic}
                    </span>
                    {/* <div style={{ fontSize: "12px" }}>{elem.duration}</div> */}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default EnrolledeachContent;
