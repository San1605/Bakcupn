import React from "react";
import finalAssessmentimg from "../../../../../../assets/finalAssessment.png";

function Confirmation({ finalobj, setSelectedindex }) {
  return (
    <div>
      <div className="main-topic-detail inner-field justify-content-between h-100">
        <strong>Final Assessment</strong>
        <div
          className="w-100 d-flex align-items-center justify-content-center"
          style={{ padding: "1rem 0" }}
        >
          <img
            src={finalAssessmentimg}
            alt="finalAssessment"
            style={{ width: "25%" }}
          />
        </div>
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <div
            className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2"
            onClick={() => {
              setSelectedindex("FinalForm");
            }}
            style={{ width: "fit-content" }}
          >
            proceed
          </div>
        </div>
        <div className="w-100 d-flex flex-column">
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
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
