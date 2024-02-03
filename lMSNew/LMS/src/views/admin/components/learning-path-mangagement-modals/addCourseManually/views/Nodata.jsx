import React from "react";
import nodataimg from "../../../../../../assets/noData.png";

function Nodata() {
  return (
    <div className="h-100">
      <div className="main-topic-detail inner-field justify-content-center h-100">
        {/* <strong>Final Assessment</strong> */}
        <div
          className="w-100 d-flex align-items-center justify-content-center"
          style={{ padding: "1rem 0 0 0" }}
        >
          <img src={nodataimg} alt="finalAssessment" style={{ width: "15%" }} />
        </div>
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          No data
        </div>
        {/* <div className="w-100 d-flex flex-column">
          <div
            className="importantBtn modal-outer-primary-btn manual-final-submit py-1 me-2"
            style={{
              backgroundColor: "#EDEEFF",
              color: "#242424",
              width: "fit-content",
            }}
          >
            Important Note:
          </div>
          <p style={{ fontSize: "12px", color: "#424242" }} className="mt-1">
            Note that even if you add additional topics or subtopics to the
            course after the assessment has been created, the assessment will
            still be displayed at the end, covering all the materials included .
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Nodata;
