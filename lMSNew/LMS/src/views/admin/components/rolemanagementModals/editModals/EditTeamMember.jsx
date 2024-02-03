import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import editpencilicon from "../../../assets/editPencil.svg";
import Select from "react-select";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import toast from "react-hot-toast";

function EditTeamMember(props) {
  const { lpnamesapi, lpnamelist, newinnerlpteam } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [innerlplist, setInnerlplist] = useState([]);
  const [multiDropdown, setMultiDropdown] = useState([]);

  const editteam = () => {
    if ((innerlplist.length == 0 )) {
      toast.error(" Invalid Credentials");
    } else {
      newinnerlpteam({ emailId: props.items.emailId, courseId: innerlplist, learningPath: props.lp, role: props.items.role });
      setInnerlplist([]);
      setReportshow(!reportshow);
    }
  };

  useEffect(()=>{
    lpnamesapi();
  },[])

  useEffect(()=>{
    if(Object.keys(lpnamelist).length > 0)
    {
    let multiDropArr = lpnamelist[`${props.lp}`].map((el) => {
        return { label: el, value: el };
      });
      setMultiDropdown(multiDropArr);
    }
  },[lpnamelist])

  const handlelps = (data)=>{
    const depdata = data.map((ele)=>{
      return(ele.value)
    })
    setInnerlplist(depdata);
  }

  useEffect(()=>{
    if(!reportshow)
    {
      setInnerlplist([]);
    }
  },[reportshow])

  return (
    <>
      <img
        src={editpencilicon}
        alt="editpencilicon"
        className="pointer"
        height={13}
        onClick={() => setReportshow(!reportshow)}
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
                 <img src={`https://storagefortimetrigger.blob.core.windows.net/profile/${props.items.emailId.split('@')[0]}.jpg`} alt="Employee" />
                </div>
                <div className="employee-details-col-name">
                  <p style={{ fontSize: "14px" }}>{props.items.name}</p>
                  <p style={{ fontSize: "12px" }}>{props.items.emailId}</p>
                </div>
              </div>
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">Learning Path:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`${props.lp}`}
                  className="inputFieldTextarea bo-none w-100"
                  disabled
                />
              </div>
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Assign Course<span>*</span>
                </Form.Label>
                <Select
                  isMulti
                  name="Conversion Tyoe"
                  options={multiDropdown}
                  className="basic-multi-select w-100 mt-1"
                  classNamePrefix="multiSelect"
                  placeholder="Select Courses"
                  onChange={(e)=> handlelps(e)}
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
            <Button className="modal-inner-primary-btn" onClick={()=> editteam()}>
              <div>Save</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default EditTeamMember;
