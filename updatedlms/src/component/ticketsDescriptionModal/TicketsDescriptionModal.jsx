import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../../views/mentor-mentee/pages/courses/allcourses/unenrolledcourse/unenrolledcourse.css";
import "./ticketsDescriptionModal.css";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useState } from "react";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="ticket-description-modal"
    >
      <Modal.Header className="modalHeading position-relative d-flex  ">
        <Modal.Title>Description</Modal.Title>

        <CloseButton
          className="modal-close-btn"
          variant="white"
          onClick={() => props.setDescriptionmodalshow(false)}
        />
      </Modal.Header>
      <Modal.Body className="py-2 px-4">{props.description}</Modal.Body>
    </Modal>
  );
}

function TicketsDescriptionModal(props) {
  const [descriptionmodalshow, setDescriptionmodalshow] = useState(false);

  return (
    <>
      <p
        className="pointer"
        style={{ color: "#1162FF", textDecoration: "underline",fontWeight:"500" }}
        onClick={() => setDescriptionmodalshow(true)}
      >
        view
      </p>

      <MyVerticallyCenteredModal
        show={descriptionmodalshow}
        setDescriptionmodalshow={setDescriptionmodalshow}
        description={props.description}
        onHide={() => setDescriptionmodalshow(false)}
      />
    </>
  );
}

export default TicketsDescriptionModal;
