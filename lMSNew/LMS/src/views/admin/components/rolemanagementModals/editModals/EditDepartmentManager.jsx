import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { GlobalContext } from "../../../../../context/GlobalState";
import toast from "react-hot-toast";
import Select from "react-select";

function EditDepartmentManager(props) {
  const { adminDepartmentList, newheadofdepcreate, AdminDepartmentListData } =
    useContext(GlobalContext);
  const [department, setDepartment] = useState([]);
  const [reportshow, setReportshow] = useState(false);
  const [email, setEmail] = useState("");
  const [multiDropdown, setMultiDropdown] = useState([]);
  useEffect(() => {
    AdminDepartmentListData();
    setEmail(props.mail);
  }, [props]);
  const savehr = () => {
    console.log(email, department);
    if (email == "" || department == "") {
      toast.error(" Invalid Credentials");
    } else {
      newheadofdepcreate({
        emailId: props.items.emailId,
        department: department,
        searchkey:props.courseSearchKey,
        seldep: props.seldep
      });
      setEmail("");
      setReportshow(!reportshow);
    }
  };
  useEffect(() => {
    let multiDropArr = adminDepartmentList.map((el) => {
      return { label: el.Department, value: el.Department };
    });
    setMultiDropdown(multiDropArr);
  }, [adminDepartmentList]);
  const handledepartmentedit = (data) => {
    const depdata = data.map((ele) => {
      return {
        name: ele.value,
        status: 1,
      };
    });
    setDepartment(depdata);
  };
  return (
    <>
      <p
        style={{ color: "#0356D3" }}
        className="pointer"
        onClick={() => setReportshow(!reportshow)}
      >
        + Assign New Department
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
            Edit Department Manager
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
                  placeholder="Department Manager"
                  className="inputFieldTextarea bo-none w-100"
                  disabled
                />
              </div>
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Assign Department<span>*</span>
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
                {/* <select
                  name="departmentlist"
                  className="dropdownstyle pointer"
                  style={{ width: "100%" }}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Department
                  </option>
                  {adminDepartmentList.length !== 0
                    ? adminDepartmentList.map((elem) => {
                        return (
                          <option value={elem.Department}>
                            {elem.Department}
                          </option>
                        );
                      })
                    : null}
                </select> */}
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

export default EditDepartmentManager;