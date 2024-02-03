import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import deleteicon from "../../../../admin/assets/delete.svg";
import { GlobalContext } from "../../../../../context/GlobalState";
function RemoveInterviewScheduler(props) {
  const { deleteInterviewer } = useContext(GlobalContext);
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
            Remove Interview Scheduler
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
              Are you sure, you want to remove <br /> {`${props.data.name} as Interviewer?`}
            </p>
          </Modal.Body>
          <Modal.Footer className="remove-modal-footer">
            <div
              className="modal-inner-sec-btn d-flex align-items-center justify-content-center "
              onClick={() => setReportshow(!reportshow)}
              style={{ cursor: "pointer" }}
            >
              Cancel
            </div>
            <div
              className="modal-inner-primary-btn d-flex align-items-center justify-content-center"
              onClick={() => {
                const deletedata = {
                  roleId:props.data.roleId,
                  state:0, 
                  deleteState:1,
                  emailId:props.data.emailId,
                  searchkey:props.courseSearchKey,
                  pageno:props.currentPage
                }
                deleteInterviewer(deletedata);
                setReportshow(!reportshow);
              }}
              style={{ cursor: "pointer" }}
            >
              Confirm
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default RemoveInterviewScheduler;
