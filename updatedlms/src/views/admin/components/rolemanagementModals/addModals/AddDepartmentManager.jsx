import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { useEffect } from "react";
import profileimg from "../../../../../assets/images/profileimg.png";
import Select from "react-select";

function AddDepartmentManager() {
  const {
    adminDepartmentList,
    newheadofdepcreate,
    AdminDepartmentListData,
    graphapiforempdetails,
    poc,
  } = useContext(GlobalContext);
  const [department, setDepartment] = useState([]);
  const [reportshow, setReportshow] = useState(false);
  const [email, setEmail] = useState("");
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [name, setName] = useState("");
  const [profileofselect, setProfileofselect] = useState("");
  const [multiDropdown, setMultiDropdown] = useState([]);

  useEffect(() => {
    AdminDepartmentListData();
  }, []);
  const saveadmin = () => {
    if (
      (email === "" && !/\S+@\S+\.\S+/.test(email)) ||
      department.length == 0
    ) {
      toast.error(" Invalid Credentials");
    } else {
      newheadofdepcreate({ emailId: email, department: department });
      setEmail("");
      setProfileofselect("");
      setName("");
      setReportshow(!reportshow);
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
    let multiDropArr = adminDepartmentList.map((el) => {
      return { label: el.Department, value: el.Department };
    });
    setMultiDropdown(multiDropArr);
  }, [adminDepartmentList]);
  const handledepartment = (data) => {
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
      <Button
        className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center "
        onClick={() => setReportshow(!reportshow)}
        style={{ fontSize: "12px" }}
      >
        Add Department Manager &nbsp; <span>+</span>
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
            Add Department Manager
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setEmail("");
              setProfileofselect("");
              setName("");
              setReportshow(!reportshow);
            }}
          />
        </Modal.Header>
        <div>
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form>
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
                        padding: "6px 14px",
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
                  onChange={(e) => handledepartment(e)}
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
              onClick={() => {
                setEmail("");
                setProfileofselect("");
                setName("");
                setReportshow(!reportshow);
              }}
            >
              Cancel
            </Button>
            <Button
              className="modal-inner-primary-btn"
              onClick={() => saveadmin()}
            >
              <div>Add</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddDepartmentManager;
