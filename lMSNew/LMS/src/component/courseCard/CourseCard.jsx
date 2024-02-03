import React from "react";
import "./course-card.css";
import courseIcon from "../../assets/svg/dashboard/coursecard/courseIcon.svg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
function CourseCard(props) {
  const [ifdue, setIfdue] = useState(false);
  useEffect(() => {
    if (props.courseInfo.dueBy !== 0) {
      setIfdue(true);
    }
  }, []);
  return (
    <>
      <NavLink
        className="row course-card rounded overflow-hide pointer course-card-navlink"
        to={`/mycurrentcourse/${props.courseInfo.courseId}`}
      >
        <div className="d-flex course-card-header position-relative">
          <div className="course-icon position-absolute bg-white p-4 rounded-circle">
            <img src={courseIcon} alt="courseIcon" />
          </div>
          <div className="course-title text-white">
            <p className="course-name">{props.courseInfo.courseId}</p>
            <p className="course-field" style={{marginTop:"4px"}}>{props.courseInfo.department}</p>
          </div>
          <div className="course-duration position-absolute">
            <p style={{ fontSize: "10px" }}>{props.courseInfo.days} days</p>
          </div>
        </div>
        <div className="row course-card-details bg-white">
          <div className="row mb-2 mt-1">
            <div className="col-6">
              <div className="row details-head">Level:</div>
              <div className="row details-text">{props.courseInfo.level}</div>
            </div>
            <div className="col-6">
              <div className="row details-head">Complexity:</div>
              <div className="row details-text">
                {props.courseInfo.complexity}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="details-head">
                <p>
                  Progress:
                  <span className="text-dark">
                    {props.courseInfo.completionStatus}%
                  </span>
                </p>
                {ifdue ? (
                  <p className="progress-due-text">
                    Due by {props.courseInfo.dueBy} Days!
                  </p>
                ) : null}
              </div>
              <div className="row">
                <div className="progress" style={{ background: "#FFEBEB" }}>
                  <div
                    className={`${
                      ifdue
                        ? "progress-bar coursed-card-progres-bar-due"
                        : "progress-bar coursed-card-progres-bar-green"
                    }`}
                    role="progressbar"
                    style={{ width: `${props.courseInfo.completionStatus}%` }}
                    aria-valuemin="00"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default CourseCard;
