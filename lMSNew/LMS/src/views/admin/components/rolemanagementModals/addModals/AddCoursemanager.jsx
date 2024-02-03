import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { GlobalContext } from "../../../../../context/GlobalState";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import profileimg from "../../../../../assets/images/profileimg.png";

function AddEditCoursemanager() {
  const {
    departmentlistdata,
    newcoursemanager,
    departmentlist,
    lpfordep,
    graphapiforempdetails,
    poc,
    lpListdatacoursemanager,
  } = useContext(GlobalContext);
  const [learningPath, setLearningPath] = useState("");
  const [department, setDepartment] = useState("");
  const [reportshow, setReportshow] = useState(false);
  const [email, setEmail] = useState("");
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [name, setName] = useState("");
  const [profileofselect, setProfileofselect] = useState("");
  useEffect(() => {
    departmentlist();
  }, []);
  useEffect(() => {
    if (department !== "") {
      setLearningPath("");
      lpfordep(department);
    }
  }, [department]);
  const addlpmanagerinadd = () => {
    if (
      email !== "" &&
      /\S+@\S+\.\S+/.test(email) &&
      department !== "" &&
      learningPath !== ""
    ) {
      newcoursemanager({
        emailId: email,
        learningPath: learningPath,
        department: department,
      });
      setEmail("");
      setDepartment("");
      setLearningPath("");
      setProfileofselect("");
      setName("");
      setReportshow(!reportshow);
    } else {
      toast.error(" Invalid Credentials");
    }
  };

  useEffect(() => {
    if (name !== "") {
      setShowSearchresult(true);
      graphapiforempdetails(name);
    } else {
      setTimeout(() => {
        setShowSearchresult(false);
      }, 150);
      setProfileofselect("");
    }
  }, [name]);
  useEffect(() => {
    if (email) {
      console.log(email, "email here");
    }
  }, [email]);
  return (
    <>
      <Button
        className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center "
        onClick={() => setReportshow(!reportshow)}
        style={{ fontSize: "12px" }}
      >
        Add Learnng Path Manager &nbsp; <span>+</span>
      </Button>

      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Add Learnng Path Manager
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setEmail("");
              setDepartment("");
              setProfileofselect("");
              setName("");
              setReportshow(!reportshow);
            }}
          />
        </Modal.Header>
        <div>
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form className="p-2">
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Name<span>*</span>
                </Form.Label>

                <div className="position-relative" style={{ width: "80%" }}>
                  <div className="selected-role ">
                    {profileofselect ? (
                      <img
                        src={profileofselect}
                        className="selected-role-img"
                        alt="profileofselect"
                      />
                    ) : null}
                    <Form.Control
                      type="text"
                      placeholder="Enter name here"
                      className="inputFieldTextarea"
                      value={name}
                      style={{
                        width: "100%",
                        border: "none",
                        padding: "6px 4px",
                      }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {showSearchresult ? (
                    <div
                      className={`userdata-searchlist overflow-y-scroll position-relative ${
                        name == "" ? "hidetransition" : ""
                      }`}
                    >
                      {poc.length > 0
                        ? poc.map((elem) => {
                            return (
                              <div
                                className="d-flex align-items-center gap-2 
                      text-nowrap pointer userdata-searchlist-row"
                                onClick={() => {
                                  setName(elem.displayName);
                                  setEmail(elem.mail);
                                  setProfileofselect(elem.photo);
                                  setTimeout(() => {
                                    setShowSearchresult(false);
                                  }, 500);
                                }}
                              >
                                <img
                                  src={elem.photo || profileimg}
                                  alt="profileimg"
                                  className="userdata-searchlist-profilimg"
                                />
                                <div className="searchlist-profiledetails">
                                  <p className="searchlist-name">
                                    {elem.displayName}
                                  </p>
                                  <p className="searchlist-email">
                                    {elem.mail}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  ) : null}
                </div>
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
                  style={{ width: "100%", fontSize: "12px" }}
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
                setEmail("");
                setDepartment("");
                setProfileofselect("");
                setName("");
                setReportshow(!reportshow);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="light"
              className="modal-inner-primary-btn"
              onClick={() => addlpmanagerinadd()}
            >
              <div>Add</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddEditCoursemanager;
