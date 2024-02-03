import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import deleteicon from "../../assets/delete.svg";
import { HiOutlinePencil } from "react-icons/hi2";
import "./customRole.css";

function EditCustomRole() {
  const [reportshow, setReportshow] = useState(false);

  return (
    <>
      <div
        className="custom-role d-flex gap-2 align-items-center"
        onClick={() => setReportshow(!reportshow)}
      >
        <HiOutlinePencil /> <p>Edit Role</p>
      </div>
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal customRole-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Edit Role
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => {
              setReportshow(!reportshow);
            }}
          />
        </Modal.Header>
        <div className=" ">
          <Modal.Body className="addmodalbody pb-4">
            <div className="hrbuddyListContainer bg-white p-0 m-0 ">
              <div className="customrole-content overflow-y-scroll pe-4">
                <div className="customRole-border">
                  <div className="customRole-row" style={{ width: "40%" }}>
                    <p className="customRole-label">Custom Role name</p>
                    <input
                      type="text"
                      className="customRole-input"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "40%" }}
                  >
                    <p className="customRole-label">User Details</p>
                    <div className="flex-input-row">
                      <label>
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="customRole-input"
                        placeholder="Enter Role Name Here"
                      />
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "65%" }}
                  >
                    <div className="active-role">
                      <input type="checkbox" className="mb-1" />
                      <p className="customRole-label">Course Editor</p>
                    </div>
                    <div className="multi-input-row">
                      <div className="flex-input-row">
                        <label>
                          Select Learning Path
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select name="lp" id="lp" className="multirow-select">
                          <option value="" selected hidden>
                            Select LP
                          </option>
                          <option value="">lp</option>
                        </select>
                      </div>
                      <div className="flex-input-row">
                        <label>
                          Select Course
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select name="lp" id="lp" className="multirow-select">
                          <option value="" selected hidden>
                            Select Course
                          </option>
                          <option value="">course</option>
                        </select>
                      </div>
                      <div className="addmore-btn">+ Add</div>
                    </div>
                    <div className="multi-input-row">
                      <div className="flex-input-row">
                        <label></label>
                        <div className="selected-value">LP_NodeJS</div>
                      </div>
                      <div className="flex-input-row">
                        <label></label>

                        <div className="selected-value selected-value-course">
                          CT_Node001
                        </div>
                      </div>
                      <div className="delete-icon">
                        <img src={deleteicon} alt="deleteicon" height={16} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "65%" }}
                  >
                    <div className="active-role">
                      <input type="checkbox" className="mb-1" />
                      <p className="customRole-label">Course Reviewer</p>
                    </div>
                    <div className="multi-input-row">
                      <div className="flex-input-row">
                        <label>
                          Select Learning Path
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select name="lp" id="lp" className="multirow-select">
                          <option value="" selected hidden>
                            Select LP
                          </option>
                          <option value="">lp</option>
                        </select>
                      </div>
                      <div className="flex-input-row">
                        <label>
                          Select Course
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select name="lp" id="lp" className="multirow-select">
                          <option value="" selected hidden>
                            Select Course
                          </option>
                          <option value="">course</option>
                        </select>
                      </div>
                      <div className="addmore-btn">+ Add</div>
                    </div>
                    <div className="multi-input-row">
                      <div className="flex-input-row">
                        <label></label>
                        <div className="selected-value">LP_NodeJS</div>
                      </div>
                      <div className="flex-input-row">
                        <label></label>

                        <div className="selected-value selected-value-course">
                          CT_Node001
                        </div>
                      </div>
                      <div className="delete-icon">
                        <img src={deleteicon} alt="deleteicon" height={16} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input type="checkbox" className="mb-1" />
                      <p className="customRole-label">Conversion Manager</p>
                    </div>
                    <div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Type <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="manager"
                        id="manager"
                        className="singlerow-select"
                      >
                        <option value="" selected hidden>
                          Select
                        </option>
                        <option value="Trainee">Trainee</option>
                        <option value="FTE">FTE</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input type="checkbox" className="mb-1" />
                      <p className="customRole-label">LP Manager</p>
                    </div>
                    <div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Learning Path
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="manager"
                        id="manager"
                        className="singlerow-select"
                      >
                        <option value="" selected hidden>
                          Select
                        </option>
                        <option value="">LP_NodeJS</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input type="checkbox" className="mb-1" />
                      <p className="customRole-label">HR Buddy</p>
                    </div>
                    <div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Department
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="manager"
                        id="manager"
                        className="singlerow-select"
                      >
                        <option value="" selected hidden>
                          Select
                        </option>
                        <option value="">Department</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="customRole-border">
                  <div
                    className="customRole-row pt-2-5"
                    style={{ width: "50%" }}
                  >
                    <div className="active-role">
                      <input type="checkbox" className="mb-1" />
                      <p className="customRole-label">Department Manager</p>
                    </div>
                    <div className="flex-input-row">
                      <label className="singlerow-label">
                        Select Department
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="manager"
                        id="manager"
                        className="singlerow-select"
                      >
                        <option value="" selected hidden>
                          Select
                        </option>
                        <option value="">Department</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="save-cancel-row ">
                  <div className="modal-inner-sec-btn">Cancel</div>
                  <div className="modal-inner-primary-btn">Save</div>
                  {/* <div className="cancel">Cancel</div> */}
                  {/* <div className="save">Save</div> */}
                </div>
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button
              variant="secondary"
              className="modal-inner-sec-btn"
              onClick={() => {
                setReportshow(!reportshow);
              }}
            >
              Cancel
            </Button>
            <Button variant="light" className="modal-inner-primary-btn">
              <div>Add Admin</div>
            </Button>
          </Modal.Footer> */}
        </div>
      </Modal>
    </>
  );
}

export default EditCustomRole;
