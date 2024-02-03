import React from "react";
import "./recommendedCourseCard.css";
function RecommendedCourseCard(props) {
  return (
    <>
      <div className="row course-card rounded overflow-hide w-100">
        <div className="d-flex course-card-header position-relative">
          <div className="course-icon position-absolute bg-white p-4 rounded-circle">
            <img src={props.courseInfo.image} alt="courseIcon" />
          </div>
          <div className="recommended-course-title text-white">
            <p
              className="course-name"
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              {props.courseInfo.title}
            </p>
            <p
              className="course-field"
              style={{ fontSize: "12px", fontWeight: "300" }}
            >
              {props.courseInfo.domain}
            </p>
          </div>
          <div className="course-duration position-absolute">
            <p style={{ fontSize: "10px" }}>{props.courseInfo.duration}</p>
          </div>
        </div>
        <div className="row recommended-coursecard-details bg-white">
          <div className="col-12">
            <div className="details-head">Complexity: <span className="details-text">{props.courseInfo.complexity}</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendedCourseCard;
