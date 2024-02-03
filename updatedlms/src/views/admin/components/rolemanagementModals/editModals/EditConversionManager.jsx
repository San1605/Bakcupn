import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import Select from "react-select";
import toast from "react-hot-toast";

function EditConversionManager(props) {
  const { newconversionmanageradd} = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [permission,setPermission] = useState([]);
  const realoptions = [
    { value: "FTE", label: "FTE" },
    { value: "Trainee", label: "Trainee" },
  ];
  const options = realoptions.filter((elem)=>{
    return elem.value !== props.items.conversionType[0].conversionType 
  })
  const saveconvmanager = () => {
    if (permission.length == 0) {
      toast.error(" Invalid Credentials");
    } else {
      newconversionmanageradd({ emailId: props.items.emailId, conversionType: permission.length == 1?permission[0]:"Both" });
      setReportshow(!reportshow);
      setPermission([]);
    }
  };
  const handlesubmit = (data)=>{
    const depdata = data.map((ele)=>{
      return(ele.value)
    })
    setPermission(depdata);
  }
  return (
    <>
      <p
        style={{ color: "#0356D3" }}
        className="pointer"
        onClick={() => setReportshow(!reportshow)}
      >
        + Assign New Permission
      </p>
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Edit Details
          </Modal.Title>
          <CloseButton
            onClick={() => setReportshow(false)}
            variant="white"
            style={{ fontSize: "14px" }}
          />
        </Modal.Header>
        <div>
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form className="p-2">
              <div className="employee-details-col mb-3">
                <div className="employee-details-col-img">
                <img src={`https://storageaccountforprofile.blob.core.windows.net/profile/${props.items.emailId.split('@')[0]}.jpg`} alt="Employee" />
                </div>
                <div className="employee-details-col-name">
                <p style={{ fontSize: "14px" }}>{props.items.name}</p>
                  <p style={{ fontSize: "12px" }}>{props.items.emailId}</p>
                </div>
              </div>
              <div
                className="mb-0 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">Role Assigned:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Conversion Manager"
                  className="inputFieldTextarea bo-none w-100"
                  disabled
                />
              </div>
              <div
                className="mb-0 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Select Conversion Type<span>*</span>
                </Form.Label>
                <Select
                  isMulti
                  name="Conversion Tyoe"
                  options={options}
                  className="basic-multi-select w-100"
                  classNamePrefix="multiSelect"
                  placeholder="Select Type"
                  onChange={(e)=>handlesubmit(e)}
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="modal-inner-sec-btn"
              onClick={() => {
                setReportshow(!reportshow);
              }}
            >
              Discard
            </Button>
            <Button className="modal-inner-primary-btn" onClick={()=> saveconvmanager()}>
              <div>Save</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default EditConversionManager;
