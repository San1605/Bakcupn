import React, { useState, useEffect } from "react";
import finalAssessmentimg from "../../../../../../assets/finalAssessment.png";
import Accordion from "react-bootstrap/Accordion";
import RichTextEditor from "react-rte";

function FinalAssessmentView({ finalobj }) {
  const [startFinal, setStartFinal] = useState(false);
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  return (
    <div className="h-100 overflow-y-scroll">
      {Object.keys(finalobj).length > 0 && !startFinal ? (
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
                setStartFinal(true);
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
              Note
            </p>
          </div>
        </div>
      ) : (
        <div className="h-100 bg-white p-3 overflow-y-scroll">
          <div className="d-flex align-items-center justify-content-between">
            <p
              className="inner-field-head"
              style={{ fontSize: "16px", color: "#424242" }}
            >
              {finalobj?.title}
            </p>
            <p className="" style={{ fontSize: "12px", color: "#424242" }}>
              <strong>Duration :</strong> {finalobj?.estimatedDuration !== ""? finalobj?.estimatedDuration:"30 min"}
            </p>
          </div>
          <div
            className="inner-field-head mt-1"
            style={{ fontSize: "14px", color: "#424242", fontWeight: "400" }}
          >
            {finalobj?.description}
          </div>
          {finalobj?.assignment !== "" &&
          <div className="d-flex flex-column align-items-start mt-2">
            <p
              className="inner-field-head"
              style={{ fontSize: "14px", color: "#424242" }}
            >
              Instructions:
            </p>
            <p className="" style={{ fontSize: "12px", color: "#424242" }}>
              {finalobj?.assignment}
            </p>
          </div>}
          <div
            className="p-3 mt-3 d-flex flex-column gap-2 taskPreview"
            style={{ backgroundColor: "#f9f9f9", height: "fit-content" }}
          >
            <Accordion defaultActiveKey="0">
              {finalobj?.questions.map((el, i) => {
                return (
                  <Accordion.Item eventKey={`${i}`}>
                    <Accordion.Header>{el.questiontext}</Accordion.Header>
                    <Accordion.Body>
                      <RichTextEditor
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        className="RichTextEditor"
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
          <div className="w-100 d-flex justify-content-end">
            <div className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2 mt-2">
              Submit
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalAssessmentView;
