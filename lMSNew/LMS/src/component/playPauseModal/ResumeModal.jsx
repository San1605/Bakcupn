import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import resumesvg from "../../assets/svg/myCurrentCourses/resumeLP.svg";
import { GlobalContext } from "../../context/GlobalState";
import "./playPauseModal.css";

function ResumeModal(props) {
  const{playpause,allrequestexit} = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(true);
  useEffect(() => {
    document.body.className = "resume-modal-body";
  }, [reportshow]);
  const opensender = ()=>{
    const sender = { 
      lp:props.lpname,
      requestType:"Resume",
      requestedDate: new Date().toISOString()
    }
    allrequestexit(sender);
  }
  return (
    <Modal
      show={reportshow}
      // onHide={() => setReportshow(!reportshow)}
      size="lg"
      centered
      className="resume-modal"
    >
      {playpause == "Resume"?<div className="resume-modal-content-div">
        <div className="resume-modal-content">
          <div className="resume-modal-content-head">Resume Learning Path</div>
          <div className="resume-modal-content-text">
            You do not have access to the course content, since the learning
            path is paused. Resume Learning Path to access the course content
          </div>
        </div>
        <div className="resume-modal-content-btn-div">
          <div className="resume-btn" onClick={()=>opensender()}>Resume</div>
          <div className="back-btn" onClick={() => window.history.back()}>
            Back
          </div>
        </div>
      </div>
      :<div className="resume-modal-content-div">
                <div className="resume-modal-content">
                  <div className="resume-modal-content-head">
                    Request Sent To Your Mentor
                  </div>
                  <div className="resume-modal-content-text">
                    Request for resuming this Learning Path has been sent to your
                    Mentor.
                  </div>
                </div>
                <div className="resume-modal-content-btn-div">
                  <p
                    style={{
                      color: "#4f52b2",
                      fontSize: "14px",
                    }}
                    className="pointer"
                    onClick={() => window.history.back()}
                  >
                    Back
                  </p>
                </div>
              </div>}
      <div className="resume-modal-svg-div">
        <img src={resumesvg} alt="resumesvg" />
      </div>
    </Modal>
  );
}

export default ResumeModal;
