import React from "react";
import "./UnenrolledCourseContent.css";

function UnenrolledCourseContent(props) {
  return (
    <>
      <div
        className="moduleheading row pointer justify-content-around m-2 border-bottom"
        // onClick={() => showinnercoursecontent()}
      >
        <div className="p-2 coursemodulediv">
          Section {props.section} : the leap into electronic typesetting
        </div>
      </div>
    </>
  );
}

export default UnenrolledCourseContent;
