import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import deleteicon from "../../../assets/delete.svg";
import "./removemodal.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";

function RemoveRoleModalHr(props) {
  const { deleteHr } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  return (
    <>
      <img
        src={deleteicon}
        alt="deleteicon"
        onClick={() => setReportshow(!reportshow)}
        className="action-icon"
        height={14}
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
            Remove HR Buddy
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
              {`${props.content}`}
            </p>
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
                const deledata = {
                  roleId:props.toggle,
                  state:0,
                  deleteState:1,
                  emailId:props.mail,
                  searchkey:props.courseSearchKey,
                  pageno:props.currentPage,
                  department:props.department,
                  seldep:props.seldep
                }
                deleteHr(deledata);
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

export default RemoveRoleModalHr;
