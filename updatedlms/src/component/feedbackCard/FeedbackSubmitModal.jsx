import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../views/mentor-mentee/pages/courses/allcourses/unenrolledcourse/unenrolledcourse.css";

function MyVerticallyCenteredModalinfeedback(props) {
  const triggerevents =()=>{
    props.submitfunction();
    // props.onHide();
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="enrolled-modal"
    >
      <Modal.Header
        className="enroll-modal-header modalHeading position-relative  "
        style={{ height: "4.5rem" }}
      >
        <p style={{ fontSize: "20px" }}>Submit Feedback</p>
      </Modal.Header>
      <Modal.Body className="modalContent pt-4 pb-3">
        <h4 className="modalSubHeading">Submit Feedback</h4>
        <p className="modalConfirmation my-2">
          Are you sure, you want to submit the feedback?
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center mt-2 mb-1">
        <Button className="modalCancel modal-inner-sec-btn" onClick={props.onHide}>Cancel</Button>
        <Button className="modalConfirm modal-inner-primary-btn" onClick={()=>triggerevents()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function FeedbackSubmitModal({submitfunction}) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        className="feedback-submit-btn modal-outer-primary-btn ms-2"
        onClick={() => setModalShow(true)}
      >
        Submit
      </Button>

      <MyVerticallyCenteredModalinfeedback
        show={modalShow}
        submitfunction={submitfunction}
        // onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default FeedbackSubmitModal;
