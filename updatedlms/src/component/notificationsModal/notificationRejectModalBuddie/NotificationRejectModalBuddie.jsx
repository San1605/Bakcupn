import React, { useState } from "react";
import { useContext } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { GlobalContext } from "../../../context/GlobalState";
import "./notificationRejectModalBuddie.css";

function NotificationRejectModal(props) {
  const {updatebuddieticketrequest} = useContext(GlobalContext);
  const [NotificationShow, setNotificationShow] = useState(false);
  const NotificationhandleClose = () => setNotificationShow(false);
  const NotificationhandleShow = () => setNotificationShow(true);
  const [reason,setReason] = useState("");
  const handlestatus = ()=>{
    if(reason !== ""){
      NotificationhandleClose();
      updatebuddieticketrequest(2,reason,props.mailid,props.date);
    }
    else{
      window.alert("Please give a valid reason");
    }
      
  }

  return (
    <>
      {props.status === 0 ? (
        <Button className="notificationReject" onClick={NotificationhandleShow}>
          Reject
        </Button>
      ) : (
        <Button className="curson-block-disable notificationReject ticketReject ">
          Reject
        </Button>
      )}

      <Modal
        show={NotificationShow}
        onHide={NotificationhandleClose}
        size="md"
        centered
      >
        <Modal.Header className=" modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Rejection Reason
          </Modal.Title>
          <AiOutlineClose
            className="modal-close-icon pointer"
            onClick={NotificationhandleClose}
          />
        </Modal.Header>
        <Modal.Body style={{ padding: "8px 16px 0px 16px" }}>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="reject-modal-reason-heading">
                Enter a reason for rejection
              </Form.Label>
              <Form.Control
                className="reject-modal-placeholder"
                as="textarea"
                rows={5}
                value={reason}
                placeholder={"Add description here..."}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button
            className="modal-inner-sec-btn"
            onClick={NotificationhandleClose}
          >
            Cancel
          </Button>
          <Button
            className="modal-inner-primary-btn"
            onClick={() => handlestatus()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationRejectModal;
