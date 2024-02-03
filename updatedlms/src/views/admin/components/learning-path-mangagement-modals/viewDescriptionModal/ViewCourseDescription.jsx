import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "../../../../../component/ticketsDescriptionModal/ticketsDescriptionModal.css";

function ViewCourseDescription(props) {
  const [reportshow, setReportshow] = useState(false);
  return (
    <>
      <p
        className="pointer"
        style={{
          color: "#4060D4",
          fontWeight: "500",
        }}
        onClick={() => setReportshow(true)}
      >
        View
      </p>
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="ticket-description-modal"
      >
        <Modal.Header className="modalHeading position-relative d-flex  ">
          <Modal.Title>Description</Modal.Title>

          <CloseButton
            className="modal-close-btn"
            variant="white"
            onClick={() => setReportshow(false)}
          />
        </Modal.Header>
        <Modal.Body className="py-2 px-4">
          <div
            className="overflow-y-scroll pe-2"
            style={{
              fontSize: "14px",
              wordBreak: "break-word",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {props.description}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewCourseDescription;
