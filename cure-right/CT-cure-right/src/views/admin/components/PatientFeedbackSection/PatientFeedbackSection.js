import React from "react";
import star from "../../../doctor/assets/icons/star.svg";
import emptystar from "../../../doctor/assets/icons/emptystar.svg";
import "./PatientFeedbackSection.css";

const Patientfeedback = ({ patientFeedbackList }) => {
  return (
    <div className="persona-list-right1 m-0 h-100">
      <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
        <span className="pre-text mx-2">Patient's Feedback</span>
      </div>
      <div className=" list-container1 bg-white p-2 mb-1">
        <div className="list h-100">
          <div className="dept-list">
            {patientFeedbackList.length !== 0 &&
              patientFeedbackList?.map((feedback, i) => {
                return (
                  <div key={i} className="feedback">
                    <b className="font_name">{feedback?.Name || "-"}</b>
                    <span className="ms-3">
                      {new Array(feedback?.rating)?.fill(0)?.map((item, i) => {
                        return (
                          <img key={i} src={star} className="star1" alt="" />
                        );
                      })}
                      {new Array(5 - feedback?.rating)
                        ?.fill(0)
                        ?.map((item, i) => {
                          return (
                            <img
                              key={i}
                              src={emptystar}
                              className="star1"
                              alt=""
                            />
                          );
                        })}
                    </span>
                    <div className=" d-flex">
                      <p className="text-feedback d-flex mt-1">
                        {feedback?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patientfeedback;
