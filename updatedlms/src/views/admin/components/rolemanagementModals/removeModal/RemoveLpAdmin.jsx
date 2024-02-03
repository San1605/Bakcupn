import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import deleteicon from "../../../assets/delete.svg";
import "./removemodal.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";

function RemoveLpAdmin(props) {
  const { deletelpAdmin } = useContext(GlobalContext);
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
            Remove Admin
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
              Are you sure, you want to remove <br /> {`${props.data.name} as Admin?`}
            </p>
          </Modal.Body>
          <Modal.Footer className="remove-modal-footer">
            <Button
              className=" modal-inner-sec-btn"
              onClick={() => setReportshow(!reportshow)}
            >
              Cancel
            </Button>
            <Button
              className=" modal-inner-primary-btn"
              onClick={() => {
                const deletedata = {
                  roleId:props.data.roleId,
                  state:0, 
                  deleteState:1,
                  emailId:props.data.emailId,
                  searchkey:props.courseSearchKey,
                  pageno:props.currentPage
                }
                deletelpAdmin(deletedata);
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

export default RemoveLpAdmin;
