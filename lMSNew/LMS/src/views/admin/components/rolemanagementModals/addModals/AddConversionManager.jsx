import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { GlobalContext } from "../../../../../context/GlobalState";
import profileimg from "../../../../../assets/images/profileimg.png";
import Select from "react-select";
import toast from "react-hot-toast";

function AddConversionManager() {
  const { graphapiforempdetails, poc, newconversionmanageradd } =
    useContext(GlobalContext);
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [reportshow, setReportshow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profileofselect, setProfileofselect] = useState("");
  const [permission, setPermission] = useState([]);

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
  const savemanager = () => {
    if (
      (email === "" && !/\S+@\S+\.\S+/.test(email)) ||
      permission.length == 0
    ) {
      toast.error(" Invalid Credentials");
    } else {
      newconversionmanageradd({
        emailId: email,
        conversionType: permission.length == 1 ? permission[0] : "Both",
      });
      setEmail("");
      setProfileofselect("");
      setPermission([]);
      setName("");
      setReportshow(!reportshow);
    }
  };
  const options = [
    { value: "FTE", label: "FTE" },
    { value: "Trainee", label: "Trainee" },
  ];
  const handlesubmit = (data) => {
    const depdata = data.map((ele) => {
      return ele.value;
    });
    setPermission(depdata);
  };
  return (
    <>
      <Button
        className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center "
        onClick={() => setReportshow(!reportshow)}
        style={{ fontSize: "12px" }}
      >
        Add Conversion Manager &nbsp; <span>+</span>
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
            Add Conversion Manager
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setReportshow(!reportshow);
            }}
          />
        </Modal.Header>

        <div>
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form>
              <div
                className="mb-2 d-flex inputField"
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
                      className="inputFieldTextarea "
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
                  className="basic-multi-select w-100 mt-1"
                  classNamePrefix="multiSelect"
                  placeholder="Select Type"
                  onChange={(e) => handlesubmit(e)}
                />
                {/* <select
                  name="departmentlist"
                  className="dropdownstyle pointer mt-2"
                  style={{ width: "100%", height: "30px" }}
                >
                  <option value="" selected hidden>
                    Select Type
                  </option>
                  <option value="">FTE</option>
                  <option value="">Trainee</option>
                  <option value="">Both</option>
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
              onClick={() => savemanager()}
            >
              <div>Add</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddConversionManager;
