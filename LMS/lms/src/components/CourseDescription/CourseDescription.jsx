import React from "react";
import "./CourseDescription.css";

function CourseDescription(props) {
  return (
    <div className="CourseDescription px-3 d-flex flex-column overflow-y-scroll">
      {/* <div className="CourseDescriptionRow" style={{ rowGap: "11px" }}>
        <div className="courseDescriptionHead ">
          Module 01: 100 things every UI/UX Designer Should Know
        </div>
        <div className="courseDescriptionText">
          The of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic of
          type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap intobut also the leap into
          electronic
        </div>
      </div>

      <div className="CourseDescriptionRow" style={{ rowGap: "11px" }}>
        <div className="courseDescriptionHead ">
          Module 01: 100 things every UI/UX Designer Should Know
        </div>
        <div className="courseDescriptionText">
          The of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic of
          type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap intobut also the leap into
          electronic
        </div>
      </div>

      <div className="CourseDescriptionRow" style={{ rowGap: "11px" }}>
        <div className="courseDescriptionHead ">
          Module 01: 100 things every UI/UX Designer Should Know
        </div>
        <div className="courseDescriptionText">
          The of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic of
          type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap intobut also the leap into
          electronic
        </div>
      </div> */}
      <div className="courseDescriptionText">{props.subtopicDescp}</div>
    </div>
  );
}

export default CourseDescription;
