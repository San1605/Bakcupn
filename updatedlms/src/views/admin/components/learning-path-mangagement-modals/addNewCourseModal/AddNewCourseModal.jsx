import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiOutlineUpload } from "react-icons/ai";
import CloseButton from "react-bootstrap/CloseButton";
import { useDropzone } from "react-dropzone";
import "./addNewCourseModal.css";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import downloadicon from "../../../assets/downloadblack.svg";

function AddNewCourseModal(props) {
  const { uploadcourse } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [xl, setXl] = useState("");
  // const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [complexity, setComplexity] = useState("");
  // const [department, setDepartment] = useState(props.department);
  const [technology, setTechnology] = useState(props.lpname);
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      minSize: 0,
    });
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setXl(acceptedFiles[0]);
    }
  }, [acceptedFiles]);
  const handlesubmit = () => {
    if (
      // courseName !== "" &&
      courseId !== "" &&
      complexity !== "" &&
      technology !== "" &&
      days !== "" &&
      description !== "" &&
      xl !== ""
    ) {
      const uploadingcourse = {
        // courseName,
        courseId,
        complexity,
        department: props.department,
        technology,
        days,
        description,
        xl,
      };
      console.log(uploadingcourse, "ajabhai");
      uploadcourse(uploadingcourse, props.lpname);
      setReportshow(!reportshow);
    } else {
      toast.error("Please fill the details correctly");
    }
  };
  return (
    <>
      <Button
        className="modal-outer-primary-btn reportuploadbtn py-2 px-3 d-flex align-items-center "
        onClick={() => setReportshow(!reportshow)}
        style={{ fontSize: "12px" }}
      >
        Add Course &nbsp; <span>+</span>
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
            Add Courses
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <div className="addCourseModelBody modal-body-scroll">
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <div>
              {/* <div
                className="mb-3 d-flex align-itms-center inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Title<span>*</span>
                </label>
                <input
                  type="text"
                  value={courseName}
                  className="inputFieldTextarea addcourse-input"
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div> */}
              <div
                className="mb-3 d-flex inputField align-items-center"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 ">
                  Learning Path
                  {/* <span>*</span> */}
                </label>
                <p style={{ fontSize: "13px", width: "80%" }}>{props.lpname}</p>
                {/* <select
                  name="current Technologies"
                  className="w-75  inputFeildtextarea1 addcourse-select"
                  id="current-technology-dropdown"
                  onChange={(e) => setTechnology(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Learning Path
                  </option>
                  {lplistdata.length !== 0?lplistdata.map((elem)=>{return(<option value={elem}>{elem}</option>)}):null}
                </select> */}
              </div>
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Course Name<span>*</span>
                </label>
                <input
                  type="text"
                  value={courseId}
                  className="inputFieldTextarea addcourse-input"
                  onChange={(e) => setCourseId(e.target.value)}
                />
              </div>
              {/* <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Course Sequence<span>*</span>
                </label>
                <select
                  name="current department"
                  className="w-75  inputFeildtextarea1 addcourse-select"
                  id="current-department-dropdown"
                  // onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="sequence" selected>01</option>
                  <option value="sequence">02</option>
                  <option value="sequence">03</option>
                  <option value="sequence">04</option>
                </select>
              </div> */}

              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Description<span>*</span>
                </label>
                <textarea
                  rows="3"
                  column="12"
                  className="inputFeildtextarea1 addcourse-input"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              <div
                className="mb-3 d-flex inputField align-items-center"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 ">
                  Department
                  {/* <span>*</span> */}
                </label>
                {/* <select
                  name="current department"
                  className="w-75  inputFeildtextarea1 addcourse-select"
                  id="current-department-dropdown"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Department
                  </option>
                  <option value="App Development">App Development</option>
                  <option value="Digital Commerce">Digital Commerce</option>
                  <option value="Cloud Infra & Security">
                    Cloud Infra & Security
                  </option>
                </select> */}
                <p style={{ fontSize: "13px", width: "80%" }}>
                  {props.department}
                </p>
              </div>
              <div
                className="mb-3 d-flex uploadField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Complexity<span>*</span>
                </label>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      id="age1"
                      name="age"
                      value="Beginner"
                      className="inputRadio pt-2"
                      onChange={(e) => setComplexity(e.target.value)}
                    />
                    <label htmlFor="age1">Beginner</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      id="age2"
                      name="age"
                      value="Intermediate"
                      className="inputRadio pt-1"
                      onChange={(e) => setComplexity(e.target.value)}
                    />
                    <label htmlFor="age2">Intermediate</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      id="age3"
                      name="age"
                      value="Advanced"
                      className="inputRadio pt-1"
                      onChange={(e) => setComplexity(e.target.value)}
                    />
                    <label htmlFor="age3">Advanced</label>
                  </div>
                </div>
              </div>
              <div
                className="mb-3 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2 d-flex">
                  Duration<span>*</span>
                  <p className="duration-indays">(in Days)</p>
                </label>
                <div className="col-9">
                  <input
                    type="text"
                    placeholder=""
                    className="duration-input addcourse-input"
                    value={days}
                    onChange={(e) => {
                      setDays(e.target.value);
                    }}
                  />
                  {/* <br /> */}
                  {/* {courseDuration === "" ? (
                    <div
                      className="text-danger"
                      style={{ fontSize: "12px", marginTop: "-3vh" }}
                    >
                      You can't leave this field open !
                    </div>
                  ) : null} */}
                </div>
              </div>
              <div
                className="mb-3 d-flex inputField "
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Sample Document
                  {/* <span>*</span> */}
                </label>
                <div style={{ width: "80%" }}>
                  <a href={props.sampledown} style={{ textDecoration: "none" }}>
                    <div
                      className="chooseupload nowrap d-flex align-items-center pt-1"
                      style={{ width: "fit-content" }}
                    >
                      {/* <AiOutlineUpload className="mx-1" /> */}
                      <img src={downloadicon} alt="downloadicon" />
                      <div className="mx-1" style={{ textDecoration: "none" }}>
                        Download Sample File
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="mb-3 d-flex inputField "
                controlId="exampleForm.ControlInput1 "
              >
                <label className="col-3 pt-2">
                  Upload Document<span>*</span>
                </label>
                <label
                  htmlFor="file-upload"
                  className="inputFieldTextarea pointer d-flex flex-row"
                >
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      paddingLeft: "0.775rem",
                      color: "#818181",
                      width: "69.5%",
                    }}
                  >
                    <div {...getRootProps({ className: "dropzone pt-2" })}>
                      {xl ? xl.name : "Upload Excel (only .xlsm)"}
                      <input {...getInputProps()} />
                    </div>
                  </div>

                  <div className="chooseupload nowrap">
                    <div
                      {...getRootProps({ className: "dropzone d-flex pt-1" })}
                    >
                      <AiOutlineUpload className="mx-1" />
                      <input {...getInputProps()} />
                      <p className="mx-1"> Choose File</p>
                    </div>
                  </div>
                </label>
              </div>
              <div className="addcourse-btn-row">
                <Button
                  variant="secondary"
                  className="modal-inner-sec-btn"
                  onClick={() => setReportshow(!reportshow)}
                >
                  Cancel
                </Button>
                <Button
                  variant="light"
                  className="modal-inner-primary-btn"
                  onClick={() => {
                    // setReportshow(!reportshow)
                    handlesubmit();
                  }}
                >
                  <div>Add Course</div>
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default AddNewCourseModal;
