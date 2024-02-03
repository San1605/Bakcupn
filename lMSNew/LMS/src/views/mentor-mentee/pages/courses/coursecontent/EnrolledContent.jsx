import React, { useRef } from "react";
import { useState } from "react";
import dropdown from "../../../../../assets/svg/coursecontent/dropdown.svg";
import playvideo from "../../../../../assets/svg/coursecontent/playvideo.svg";
import reading from "../../../../../assets/svg/coursecontent/reading.svg";
import "./coursecontent.css";

function EnrolledContent(props) {
  const contentref = useRef(null);
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

  return (
    <div className="px-2 py-2 justify-content-between border-bottom">
      <div
        className="moduleheading row justify-content-around pointer"
        onClick={() => showinnercoursecontent()}
        style={{ padding: "5px" }}
      >
        <div
          className="w-75"
          style={{
            fontWeight: 500,
            fontSize: "15px",
            color: "#242424",
            lineHeight: "1.2",
          }}
        >
          {Object.keys(props.coursecontent)[0]}
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
          {Object.values(props.coursecontent)[0].map((elem, index) => {
            return (
              <li
                key={index}
                className="d-flex px-2 py-2 justify-content-center align-items-center pointer"
                style={{ columnGap: "1rem" }}
                
              >
                <div className="d-flex justify-content-center ">
                  <img
                    src={elem.contentType === "Video" ? playvideo : reading}
                    alt="courseicon"
                    style={{ height: " 24px", marginTop: "3px" }}
                  />
                </div>
                <div className="d-flex w-75">
                  <p className="video-topictitle">
                    {elem.contentType}: &nbsp;
                    <span className="w-100">{elem.subtopic}</span>
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
export default EnrolledContent;
