import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./reportfileupload.css";
import { AiOutlineUpload } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import CloseButton from "react-bootstrap/CloseButton";
import { useEffect } from "react";
import moment from "moment/moment";
import { useDropzone } from "react-dropzone";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function Reportfileupload(props) {
  const paramextractor = useParams();
  const [reportshow, setReportshow] = useState(false);
  const [title, setTitle] = useState("");
  const [interviewdate, setInterviewdate] = useState("");
  const [interviewlink, setInterviewlink] = useState("");
  const [taskdata, setTaskdata] = useState("");
  const today = new Date();
  const todaystr = today.toISOString().substring(0, 10);
  const { uploadtaskofmentee } = useContext(GlobalContext);
  function isValidHttpUrl(string) {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) {
      return false;
    }
  }

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      minSize: 0,
    });
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setTaskdata(acceptedFiles[0]);
    }
  }, [acceptedFiles]);
  const handlesubmit = () => {
    if (
      title !== "" &&
      interviewdate !== "" &&
      interviewlink !== "" &&
      // taskdata !== "" &&
      // feedback !== "" &&
      isValidHttpUrl(interviewlink) &&
      new Date().getTime() - new Date(interviewdate).getTime() > 0
    ) {
          const uploadintask = {
            title,
            date: moment(interviewdate).format("D/M/YYYY"),
            recordingLink: interviewlink,
            // review: feedback,
            docfile: taskdata || null,
          };
          console.log(uploadintask, "upload");
          uploadtaskofmentee(uploadintask, paramextractor.id);
          setInterviewlink("");
          // setFeedback("");
          setTitle("");
          setTaskdata("");
          setInterviewdate("");
          setReportshow(!reportshow);
    } else {
      toast.error("Please fill the details correctly");
    }
  };
  const endDate = moment(
    `${props.current.year}-${props.current.month}`,
    "YYYY-MM"
  ).daysInMonth();

  const month = () => {
    if (props.current.month < 10) {
      return `0${props.current.month}`;
    } else {
      return props.current.month;
    }
  };
  const currentMonthEndDate = () => {
    if (
      month(props.current.month) == new Date().getMonth() + 1 &&
      new Date().getFullYear() == props.current.year
    ) {
      return `${new Date().getFullYear()}-${month(
        new Date().getMonth()
      )}-${checkDate(new Date().getDate())}`;
    } else {
      return `${props.current.year}-${month(props.current.month)}-${endDate}`;
    }
  };
  const checkDate = () => {
    if (new Date().getDate() < 10) {
      return `0${new Date().getDate()}`;
    } else {
      return new Date().getDate();
    }
  };
  useEffect(() => {
    if (!reportshow) {
      setInterviewlink("");
      // setFeedback("");
      setTitle("");
      setTaskdata("");
      setInterviewdate("");
    }
  }, [reportshow]);
  // console.log(endDate, "end date");
  // console.log(new Date().getDate(), "get date");
  // console.log(checkDate(new Date().getDate()), "month get date");
  // console.log(new Date().getFullYear(), "get year");
  // console.log(props.current.year, "current.year");
  // console.log(month(props.current.month), "month currentmonth");
  // console.log(currentMonthEndDate(props.current.month), "currentMonthEndDate");
  // console.log(
  //   `${props.current.year}-${month(props.current.month)}-${moment(
  //     `${props.current.year}-${props.current.month}`,
  //     "YYYY-MM"
  //     ).daysInMonth()}`,
  //     "currentMonthEndDate"
  //     );
  // console.log(endDate, "enddate");
  // console.log(currentMonthEndDate(props.current.month), "function");
  // console.log(
  //   moment(
  //     `${props.current.year}-${props.current.month}`,
  //     "YYYY-MM"
  //   ).daysInMonth(),"total days"
  // );
  // console.log(`${props.current.year}-${month(props.current.month)}-01`);
  return (
    <>
      <Button
        className="reportuploadbtn modal-outer-primary-btn mx-2"
        style={
          props.flag
            ? { opacity: "0.5", pointerEvents: "none", filter: "grayscale(1)" }
            : {}
        }
        onClick={() => setReportshow(!reportshow)}
      >
        Upload
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
            Interview Details
          </Modal.Title>
          <CloseButton
            variant="white"
            style={{ fontSize: "14px" }}
            onClick={() => setReportshow(!reportshow)}
          />
        </Modal.Header>
        <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
          <Form className="p-2">
            <div
              className="mb-3 d-flex inputField align-items-center"
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label className="m-0">
                Type<span>*</span>
              </Form.Label>
              <select
                name="departmentlist"
                className="inputFieldTextarea dropdownstyle pointer"
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="" selected hidden>
                  Select Interview Type
                </option>
                <option value="Monthly">Monthly</option>
                <option value="Trainee Conversion">Trainee Conversion</option>
                <option value="FTE Conversion">FTE Conversion</option>
              </select>
            </div>
            <div
              className="mb-3 d-flex inputField align-items-center"
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label className="m-0">
                Date<span>*</span>
              </Form.Label>
              <div style={{ width: "80%" }} className="position-relative">
                <input
                  type="date"
                  placeholder="mm/dd/yyyy"
                  className="inputFieldTextarea pointer interviewdate-input"
                  value={interviewdate}
                  onChange={(e) => setInterviewdate(e.target.value)}
                  min={`${props.current.year}-${month(props.current.month)}-01`}
                  max={currentMonthEndDate(props.current.month)}
                />
                <BsCalendar3 className="calendar-icon" />
              </div>
            </div>

            <div
              className="mb-0 d-flex inputField "
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label>Interview<span>*</span> Recording</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link for Meeting"
                style={{ width: "88%" }}
                className="inputFieldTextarea uploadLink"
                // pattern="http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?"
                value={interviewlink}
                onChange={(e) => setInterviewlink(e.target.value)}
              />
            </div>
            <div
              className="mb-0 d-flex inputField "
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label>&nbsp;</Form.Label>
              <p style={{ width: "80%",fontSize:"10px",marginTop:"-6px" }} className="text-danger">* Please provide only on the public access link</p>
            </div>

            <div
              className="mb-3 d-flex inputField "
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label>
                Task Submitted <br />
                by Candidate
              </Form.Label>
              {/* <label
                for="file-upload"
                className="inputFieldTextarea d-flex justify-content-between pointer"
              >
                <div
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "0.775rem" }}
                >
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    style={{ fontSize: "14px" }}
                  >
                    {taskdata ? taskdata.name : "Upload"}
                    <input {...getInputProps()} />
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center chooseupload">
                  <div {...getRootProps({ className: "dropzone d-flex pt-1 align-items-center" })}>
                    <AiOutlineUpload className="mx-1" />
                    <input {...getInputProps()} />
                    <p className="mx-1"> Choose File</p>
                  </div>
                </div>
              </label> */}
              <label
                for="file-upload"
                className="inputFieldTextarea d-flex justify-content-between"
              >
                <div
                  {...getRootProps({
                    className:
                      "dropzone d-flex align-items-center pointer w-100",
                  })}
                  style={{ paddingLeft: "0.775rem" }}
                >
                  <div style={{ width: "70%", fontSize: "14px" }}>
                    {taskdata ? taskdata.name : "Upload"}
                  </div>
                  <div
                    style={{ width: "30%", whiteSpace: "nowrap" }}
                    className="d-flex justify-content-center align-items-center chooseupload"
                  >
                    <div className="dropzone d-flex pt-1 align-items-center">
                      <AiOutlineUpload className="mx-1" />
                      <input {...getInputProps()} />
                      <p className="mx-1"> Choose File</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {/* <div
              className="mb-3 d-flex uploadField"
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label>
                Feedback<span>*</span>
              </Form.Label>
              <div className="radioInputBtn">
                <div
                  className="radio"
                  style={{ display: "flex", alignItem: "center" }}
                >
                  <label htmlFor="rad1" className="radioLabels">
                    <input
                      type="radio"
                      id="rad1"
                      name="feedback"
                      value="Good"
                      className="inputRadio"
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    Good
                  </label>
                </div>
                <div className="radio">
                  <label htmlFor="rad2" className="radioLabels">
                    <input
                      type="radio"
                      id="rad2"
                      name="feedback"
                      value="Average"
                      className="inputRadio"
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    Average
                  </label>
                </div>
                <div className="radio">
                  <label htmlFor="rad3" className="radioLabels">
                    <input
                      type="radio"
                      id="rad3"
                      name="feedback"
                      value="Poor"
                      className="inputRadio"
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    Poor
                  </label>
                </div>
              </div>
            </div> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
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
            onClick={() => handlesubmit()}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Reportfileupload;
