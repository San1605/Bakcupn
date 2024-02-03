import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../views/mentor-mentee/pages/courses/allcourses/unenrolledcourse/unenrolledcourse.css";
import "./enrollCourseModal.css";
import { GlobalContext } from "../../context/GlobalState";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoCheckmark } from "react-icons/io5";
import closeIcon from "../../assets/svg/close.svg";

function MyVerticallyCenteredModal(props) {
  const { navigate } = useContext(GlobalContext);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="enrolled-modal"
    >
      <Modal.Header
        className="modal-head-block position-relative  "
        style={{ height: "3rem" }}
      >
        <p style={{ fontSize: "18px" }}>Enroll Learning Path</p>
        <img
          src={closeIcon}
          alt="close Icon"
          className="pointer"
          onClick={props.onHide}
          height={12}
        />
      </Modal.Header>
      <Modal.Body className="modalContent pt-3 pb-2">
        <p
          className="modalConfirmation my-2"
          style={{
            fontSize: "16px",
          }}
        >
          Are you sure, you want to Enroll for this Learning Path?
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center mb-1">
        <Button
          className="modalCancel modal-inner-sec-btn"
          onClick={props.onHide}
        >
          Cancel
        </Button>
        <Button
          className="modalConfirm modal-inner-primary-btn"
          onClick={() => {
            props.enrollPath(props.pathname);
            navigate("/mycourses");
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function EnrollCourseModal({ pathname }) {
  const { enrollPath, singlePathInfo } = useContext(GlobalContext);
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      {singlePathInfo?.state == 0 ? (
        <>
          <Button
            className="enrollButton modal-outer-primary-btn"
            onClick={() => setModalShow(true)}
            style={{ padding: "5px 25px" }}
          >
            Enroll
          </Button>
        </>
      ) : singlePathInfo?.state == 1 ? (
        <>
          <div className="Request-pending">
            {`Request has been sent to ${singlePathInfo.reporting_To}`}
            <button
              type="button"
              style={{ border: "none", background: "none" }}
              data-toggle="tooltip"
              data-placement="top"
              title="Pending Approval"
            >
              <AiOutlineInfoCircle
                className="communication-icon pointer"
                style={{ color: "#4F52B2", fontSize: "15px" }}
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="enrolled-state">
            <IoCheckmark style={{ color: "#18B531", fill: "#18B531" }} />{" "}
            Enrolled
          </div>
        </>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        enrollPath={enrollPath}
        pathname={pathname}
      />
    </>
  );
}

export default EnrollCourseModal;
