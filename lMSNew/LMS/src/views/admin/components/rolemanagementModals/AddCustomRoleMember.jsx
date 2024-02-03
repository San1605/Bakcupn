import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import profileimg from "../../../../assets/images/profileimg.png";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function AddCustomRoleMember(props) {
  const params = useParams();
  const { graphapiforempdetails, poc, addcustommember } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [name, setName] = useState("");
  const [profileofselect, setProfileofselect] = useState("");
  const [email, setEmail] = useState("");

  const saveadmin = () => {
    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      toast.error(" Invalid Credentials");
    } else {
      addcustommember({ emailId: [email],customRoleId:params.id, pageno:props.currentPage, searchkey:props.courseSearchKey });
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
        Add Member &nbsp; <span>+</span>
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
            Add Member
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
              <div
                className="mb-0 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">Role Assigned:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Custom Role"
                  className="inputFieldTextarea bo-none w-100"
                  disabled
                />
              </div>
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
                      className="inputFieldTextarea ps-3"
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
            <Button className="modal-inner-primary-btn" onClick={()=>saveadmin()}>
              <div>Save</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddCustomRoleMember;
