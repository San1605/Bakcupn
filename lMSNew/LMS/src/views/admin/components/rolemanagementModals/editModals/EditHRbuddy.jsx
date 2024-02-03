import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import editpencilicon from "../../../assets/editPencil.svg";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Select from "react-select";

function EditHRbuddy(props) {
  const { departmentlistdatahr, newhrbuddycreate, departmentlist } =
    useContext(GlobalContext);
  const [department, setDepartment] = useState([]);
  const [reportshow, setReportshow] = useState(false);
  const [multiDropdown, setMultiDropdown] = useState([]);
  const [types, setTypes] = useState([]);
  const [accessDropdown, setAccessDropdown] = useState([
    {
      label: "Intern",
      value: "Intern",
    },
    {
      label: "Trainee",
      value: "Trainee",
    },
    {
      label: "FTE",
      value: "FTE",
    },
  ]);
  useEffect(() => {
    departmentlist();
  }, []);
  const savehr = () => {
    if (department.length == 0 && types.length === 0) {
      toast.error(" Invalid Credentials");
    } else {
      newhrbuddycreate({
        emailId: props.items.emailId,
        department: department,
        employeeType: types
      });
      setReportshow(!reportshow);
    }
  };
  useEffect(() => {
    let multiDropArr = departmentlistdatahr
      .filter((ele) => {
        return ele.Department !== "All Departments";
      })
      .map((el) => {
        return { label: el.Department, value: el.Department };
      });
    setMultiDropdown(multiDropArr);
  }, [departmentlistdatahr]);
  const handledepartmentedit = (data) => {
    const depdata = data.map((ele) => {
      return {
        name: ele.value,
        status: 1,
      };
    });
    setDepartment(depdata);
  };
  const handletype = (data)=> {
    const depdata = data.map((elem)=>{
      return elem.value
    })
    setTypes(depdata);
  }
  return (
    <>
      <div
        style={{ color: "#0356D3" }}
        className="pointer d-flex align-items-center gap-2"
        onClick={() => setReportshow(!reportshow)}
      >
        <img
          src={editpencilicon}
          alt="editpencilicon"
          height={12}
          className="action-icon profile-edit-icon"
        />
        Edit Access
        {/* + Assign New Department */}
      </div>
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Edit HR Buddy
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <div>
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form className="p-2">
              <div className="employee-details-col mb-3">
                <div className="employee-details-col-img">
                  <img
                    src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                      props.items.emailId.split("@")[0]
                    }.jpg`}
                    alt="Employee"
                  />
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
                <Form.Label className="col-3 pt-2">Role Assigned:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="HR Buddy"
                  className="inputFieldTextarea bo-none w-100"
                  disabled
                />
              </div>
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Assign Department
                </Form.Label>
                <Select
                  isMulti
                  name="Conversion Tyoe"
                  options={multiDropdown}
                  className="basic-multi-select w-100 pointer"
                  classNamePrefix="multiSelect"
                  placeholder="Select Department"
                  onChange={(e) => handledepartmentedit(e)}
                />
              </div>
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Employee Type
                </Form.Label>
                <Select
                  isMulti
                  name="access type"
                  options={accessDropdown}
                  className="basic-multi-select w-100 pointer"
                  classNamePrefix="multiSelect"
                  placeholder="Select Access"
                  onChange={(e)=> handletype(e)}
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="modal-inner-sec-btn"
              onClick={() => setReportshow(!reportshow)}
            >
              Discard
            </Button>
            <Button
              className="modal-inner-primary-btn"
              onClick={() => savehr()}
            >
              <div>Save</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default EditHRbuddy;
