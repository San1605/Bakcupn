import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./addcollegedetailsmodal.css";
import CloseButton from "react-bootstrap/CloseButton";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

function AddCollegeDetailsModal() {
  const {firstattempt, updateprofiledata ,firsttimelogin} = useContext(GlobalContext)
  const [reportshow, setReportshow] = useState(false);
  const [yop, setYop] = useState("");
  const [collegename, setCollegename] = useState("");
  useEffect(()=>{
    firsttimelogin();
  },[])

  useEffect(()=>{
      setReportshow(firstattempt)
  },[firstattempt])

  const switchtodash = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const specialCharsforyop = /[ eE`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (
      yop !== "" &&
      collegename !== "" &&
      yop.length === 4 &&
      collegename[0] !== " " &&
      yop[0] != 0 &&
      collegename.length <= 128 &&
      !specialChars.test(collegename) &&
      !specialCharsforyop.test(yop)
    ) {
      const updater = {
        collegeName: collegename,
        yearOfPassing: yop,
      };
      updateprofiledata(updater);
      setYop("");
      setCollegename("");
    } else {
      toast.error("Enter details properly");
    }
  };
  return (
    <>
      <Modal
        show={reportshow}
        // onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="details-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{fontSize:"18px"}}>Basic Information</Modal.Title>
          {/* <CloseButton
            variant="white"
            // onClick={() => setReportshow(!reportshow)}
          /> */}
        </Modal.Header>
        <Modal.Body className="details-modalbody">
          <Form >
            <div
              className="mb-3 d-flex details-inputField"
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label className="m-0">
                College Name<span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter College Name"
                className="inputFieldTextarea"
                value={collegename}
                onChange={(e) => setCollegename(e.target.value)}
              />
            </div>

            <div
              className="mb-3 d-flex details-inputField"
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label className="m-0">
                Year of Passing<span>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Year of Passing"
                className="inputFieldTextarea numberinput"
                value={yop}
                onChange={(e) => setYop(e.target.value)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-inner-primary-btn" onClick={() => switchtodash()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCollegeDetailsModal;
