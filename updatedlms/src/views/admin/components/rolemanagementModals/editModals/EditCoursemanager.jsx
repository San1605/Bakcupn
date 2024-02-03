import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import editpencilicon from "../../../assets/editPencil.svg";
import { GlobalContext } from "../../../../../context/GlobalState";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function EditCoursemanager(props) {
  const {
    departmentlistdata,
    newcoursemanager,
    departmentlist,
    lpfordep,
    lpListdatacoursemanager,
  } = useContext(GlobalContext);
  const [learningPath, setLearningPath] = useState("");
  const [department, setDepartment] = useState("");
  const [reportshow, setReportshow] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(props.mail);
    departmentlist();
  }, []);
  useEffect(() => {
    if (department !== "") {
      setLearningPath("");
      lpfordep(department);
    }
  }, [department]);
  const addlpmanager = () => {
    if (
      (email === "" && !/\S+@\S+\.\S+/.test(email)) ||
      department == "" ||
      learningPath == ""
    ) {
      toast.error(" Invalid Credentials");
    } else {
      newcoursemanager({
        emailId: email,
        learningPath: learningPath,
        department: department,
      });
      setEmail("");
      setDepartment("");
      setLearningPath("");
      setReportshow(!reportshow);
    }
  };
  return (
    <>
      <img
        src={editpencilicon}
        onClick={() => setReportshow(!reportshow)}
        alt="editpencilicon"
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
            Edit Course Manager
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <div className="addroleModelBody">
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form className="p-2">
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  User Mail<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email Id"
                  style={{
                    width: "100%",
                    border: "none",
                    padding: "6px 0px",
                    color: "#B8B8B8",
                    fontWeight: "300",
                  }}
                  className="inputFieldTextarea notchange"
                  value={email}
                />
              </div>
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Department<span>*</span>
                </Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter Department name"
                  className="inputFieldTextarea"
                  /api/admin/listLpsOfDepartment?department=App Development
                /> */}
                <select
                  name="departmentlist"
                  className="dropdownstyle pointer"
                  style={{ width: "100%" }}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Department
                  </option>
                  {departmentlistdata.length !== 0
                    ? departmentlistdata.map((elem) => {
                        return (
                          <option value={elem.Department}>
                            {elem.Department}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Learning Path<span>*</span>
                </Form.Label>
                <select
                  name="Lplist"
                  className={`dropdownstyle pointer ${
                    lpListdatacoursemanager.length == 0 ? "lppointer" : ""
                  }`}
                  style={{ width: "100%" }}
                  onChange={(e) => setLearningPath(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select LearningPath
                  </option>
                  {lpListdatacoursemanager.length !== 0
                    ? lpListdatacoursemanager.map((elem) => {
                        return (
                          <option value={elem.learningPath}>
                            {elem.learningPath}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="modal-inner-sec-btn"
              onClick={() => {
                setDepartment("");
                setReportshow(!reportshow);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="light"
              className="modal-inner-primary-btn"
              onClick={() => addlpmanager()}
            >
              <div>Save</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default EditCoursemanager;
