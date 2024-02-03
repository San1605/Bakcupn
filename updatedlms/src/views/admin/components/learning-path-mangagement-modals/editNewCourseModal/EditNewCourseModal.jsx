import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiOutlineUpload } from "react-icons/ai";
import CloseButton from "react-bootstrap/CloseButton";
import { HiOutlinePencil } from "react-icons/hi";
import "../addNewCourseModal/addNewCourseModal.css";

function EditNewCourseModal() {
  const [reportshow, setReportshow] = useState(false);
  const [courseDuration, setCourseDuration] = useState("");
  return (
    <>
      <HiOutlinePencil
        className="pointer editCoursePencilIcon"
        onClick={() => setReportshow(!reportshow)}
      />
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="infoModalHead">
          <Modal.Title>Edit Course details</Modal.Title>
          <CloseButton
            variant="white"
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <div className="addCourseModelBody">
          <Modal.Body>
            <Form className="p-2">
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Title<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Color Theory"
                  className="inputFieldTextarea "
                />
              </div>

              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Course Code<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="UI/UX100"
                  className="inputFieldTextarea"
                />
              </div>

              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Description<span>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  rows="3"
                  className="inputFeildtextarea inputFeildtextarea1"
                />
              </div>

              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Department<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="App Development"
                  className="inputFieldTextarea"
                />
              </div>

              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Technology<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="UI/UX Design"
                  className="inputFieldTextarea"
                />
              </div>

              <div
                className="mb-3 d-flex uploadField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Complexity<span>*</span>
                </Form.Label>
                <div className="d-flex flex-column">
                  <div>
                    <input
                      type="radio"
                      id="age1"
                      name="age"
                      value="30"
                      className="inputRadio pt-2"
                    />
                    <label for="age1">Beginner</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="age2"
                      name="age"
                      value="60"
                      className="inputRadio pt-1"
                    />
                    <label for="age2">Intermediate</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="age3"
                      name="age"
                      value="100"
                      className="inputRadio pt-1"
                    />
                    <label for="age3">Advanced</label>
                  </div>
                </div>
              </div>
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Duration<span>*</span>
                </Form.Label>
                <div className="col-9">
                  <Form.Control
                    type="text"
                    placeholder=""
                    className="inputFieldTextarea"
                    value={courseDuration}
                    onChange={(e) => {
                      setCourseDuration(e.target.value);
                    }}
                  />
                  <br />
                  {courseDuration === "" ? (
                    <div
                      className="text-danger"
                      style={{ fontSize: "12px", marginTop: "-3vh" }}
                    >
                      You can't leave this field open !
                    </div>
                  ) : null}
                </div>
              </div>
              <div
                className="mb-3 d-flex inputField "
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Upload Document<span>*</span>
                </Form.Label>
                <label
                  for="file-upload"
                  className="inputFieldTextarea d-flex flex-row"
                >
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      paddingLeft: "0.775rem",
                      color: "#818181",
                      width: "69.5%",
                    }}
                  >
                    Upload Excel (only .xlsm)
                  </div>

                  <div className="chooseupload nowrap">
                    <AiOutlineUpload className="mx-1" />
                    <span className="mx-1"> Choose File</span>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  placeholder="Upload document"
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="cancelButton"
              onClick={() => setReportshow(!reportshow)}
            >
              Cancel
            </Button>
            <Button
              variant="light"
              className="coursesSubmitButton submitButton"
              onClick={() => setReportshow(!reportshow)}
            >
              <div>Update Course</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default EditNewCourseModal;
