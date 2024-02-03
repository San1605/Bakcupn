import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import "../../component/courses/allcourses/unenrolledcourse/unenrolledcourse.css";
import "./Modal1.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        className="modalHeading position-relative d-flex justify-content-center "
        style={{ height: "4.5rem" }}
      >
        <div
          className="modalIcon position-absolute rounded-circle bg-white d-flex justify-content-center align-items-center "
          style={{
            height: "4.5rem",
            width: "4.5rem",
            border: "2px solid #4F52B2",
            bottom: "-30%",
          }}
        >
          <p style={{ fontSize: "3rem", color: "#4F52B2", fontWeight: "600" }}>
            !
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="modalContent py-4">
        <h4 className="modalSubHeading">Enroll Course</h4>
        <p className="modalConfirmation">
          Are you sure, you want to Enroll for this Course?
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          className="modalCancel"
          onClick={props.onHide}
          style={{ fontWeight: 600, border: "2px solid #4F52B2" }}
        >
          Cancel
        </Button>
        <Button
          className="modalConfirm"
          onClick={props.onHide}
          style={{ fontWeight: 600, border: "2px solid #4F52B2" }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Modal1() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className="enrollButton" onClick={() => setModalShow(true)}>
        Enroll
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Modal1;
