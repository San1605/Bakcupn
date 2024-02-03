import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineUpload } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import deleteicon from "../../../assets/delete.svg";
import "./removemodal.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";

function RemoveRoleModal(props) {
  const { deletemanager } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  return (
    <>
      <img
        src={deleteicon}
        alt="deleteicon"
        onClick={() => setReportshow(!reportshow)}
        className="action-icon"
      />

      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            {props.head}
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
            <p className="removemodal-content"> {props.content}</p>
          </Modal.Body>
          <Modal.Footer className="remove-modal-footer">
            <Button
              className="modalCancel modal-inner-sec-btn"
              onClick={() => setReportshow(!reportshow)}
            >
              Cancel
            </Button>
            <Button
              className="modalConfirm modal-inner-primary-btn"
              onClick={() => {
                deletemanager(props.mail, props.lp);
                setReportshow(!reportshow);
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default RemoveRoleModal;
