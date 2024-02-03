import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import pauseSvg from "../../assets/svg/myCurrentCourses/pause.svg";
import infoSvg from "../../assets/svg/myCurrentCourses/info.svg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./playPauseModal.css";
import { GlobalContext } from "../../context/GlobalState";

function PauseModal(props) {
  const {allrequestexit,playpause} = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const opensender = ()=>{
    const sender = { 
      lp:props.lpname,
      requestType:"Pause",
      requestedDate: new Date().toISOString()
    }
    allrequestexit(sender);
    setReportshow(!reportshow);
  }
  return (
    <>
      {playpause == "" || playpause === "Pause"?<Button
        className="reportuploadbtn modal-outer-primary-btn mx-2 coursepause-btn"
        onClick={() => setReportshow(!reportshow)}
      >
        Pause <img src={pauseSvg} alt="pauseSvg" />
      </Button>:
      <div
        className="Request-pending"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        Request Pending
        <button
          type="button"
          style={{ border: "none", background: "none" }}
          data-toggle="tooltip"
          data-placement="top"
          title="‘Pause’ request for this learning path has been sent to your Mentor"
        >
          <AiOutlineInfoCircle
            className="communication-icon pointer"
            style={{ color: "#4F52B2", fontSize: "15px" }}
          />
        </button>
      </div>}
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Pause Learning Path
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <div>
          <Modal.Body
            className="remove-modal-body pb-2"
            style={{ padding: "12px 16px 0px 16px" }}
          >
            <p className="removemodal-content">
              Are you sure, you want to pause this Learning Path?
            </p>
          </Modal.Body>
          <div className="pause-action-btn-div">
            <Button
              className="modalCancel modal-inner-sec-btn"
              onClick={() => setReportshow(!reportshow)}
            >
              Cancel
            </Button>
            <Button
              className="modalConfirm modal-inner-primary-btn"
              onClick={() => {
                opensender();
                // setReportshow(!reportshow);
              }}
            >
              Confirm
            </Button>
          </div>
          {props?.profile == "Trainee" && <Modal.Footer className="remove-modal-footer pause-lp-modal-footer">
            <img src={infoSvg} alt="infoSvg" className="info-svg" />
            <p className="pause-lp-modal-footer-text">
              Notification for approval will be sent to your mentor, please wait
              until it’s approved.
            </p>
          </Modal.Footer>}
        </div>
      </Modal>
    </>
  );
}

export default PauseModal;
