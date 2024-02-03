import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import ReactPlayer from "react-player";
import Tab from "react-bootstrap/Tab";
import Dropzone from "react-dropzone";
import Tabs from "react-bootstrap/Tabs";
import RichTextEditor from "react-rte";
import { AiOutlineUpload } from "react-icons/ai";
import finalAssessmentimg from "../../../../../assets/finalAssessment.png";

function NewFlow() {
  //   const deleteoption = (indexvalue) => {
  //     if (indexvalue.includes(".")) {
  //       const temp = coursearray.map((elem, index) => {
  //         if (index == Number(indexvalue.split(".")[0])) {
  //           let innertemp = elem;
  //           innertemp.value = elem.value.filter(
  //             (el, ind) => ind !== Number(indexvalue.split(".")[1])
  //           );
  //           return innertemp;
  //         } else {
  //           return elem;
  //         }
  //       });
  //       setCoursearray(temp);
  //       setSelectedindex("");
  //     } else {
  //       const temp = coursearray.filter(
  //         (elem, index) => index !== Number(indexvalue)
  //       );
  //       setCoursearray(temp);
  //       setSelectedindex("");
  //     }
  //     };

  //   const Accordianadd = () => {
  //     return (
  //       <Accordion.Item eventKey="0">
  //         <Accordion.Header>
  //           <div className="d-flex align-items-center">
  //             <p title={"jai ho"}>jai ho</p>
  //           </div>
  //         </Accordion.Header>
  //         <Accordion.Body>
  //           <div className="added-item-div">ce dckiknmqweikn cvfik</div>
  //         </Accordion.Body>
  //       </Accordion.Item>
  //     );
  //   };
  // {/* {value.map((elum, index) => {
  //   if (elum.type == "subtopic") {
  //     return <Subtopicadd indexvalue={indexval + `.${index}`} />;
  //   } else if (elum.type == "task") {
  //     return <Taskadd indexvalue={indexval + `.${index}`} />;
  //   } else {
  //     return <Quizadd indexvalue={indexval + `.${index}`} />;
  //   }
  // })} */}

  const [show, setShow] = useState("");
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [file, setFile] = useState("");
  const [confirmStart, setConfirmStart] = useState(false);
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      if (
        [".jpg", ".jpeg", ".png", ".pdf"].includes(
          acceptedFiles[0].name.substring(
            acceptedFiles[0].name.lastIndexOf(".")
          )
        )
      ) {
        setFile(acceptedFiles[0]);
      } else {
        window.alert("File type not supported.");
      }
    }
  };
  useEffect(() => {
    setValue(
      RichTextEditor.createValueFromString("<p>Custom Article Here</p>", "html")
    );
  }, []);
  // const Subtopicadd = () => {
  //   return (
  //     <div className={`added-item-row active-inner-row`}>
  //       <p>1. Subtopic - title</p>
  //     </div>
  //   );
  // };
  const Quizadd = () => {
    return (
      <div
        className={`added-item-row active-inner-row`}
        onClick={() => {
          setShow("Quiz");
        }}
      >
        <p>2. Quiz</p>
      </div>
    );
  };
  const Taskadd = () => {
    return (
      <div
        className={`added-item-row active-inner-row`}
        onClick={() => {
          setShow("Task");
        }}
      >
        <p>3. Task</p>
      </div>
    );
  };
  const Learning = () => {
    return (
      <div className="h-100 pe-2 overflow-y-scroll">
        {show === "Video" ? (
          <ReactPlayer
            className="react-player"
            controls
            width="100%"
            height="350px"
            url={"https://youtu.be/a_7Z7C_JCyo?si=nDeifXq3LTI30P7f"}
            // ref={player}
            // onEnded={() => setIscompleted(true)}
            // onProgress={(progress) => {
            //   setTimer(progress.playedSeconds);
            // }}
            // onPause={() => {
            //   convert_to_min(timer);
            // }}
            // playing={isPlaying}
          />
        ) : show === "articleLink" ? (
          <div style={{ width: "100%" }}>
            <div className="readingframe-div" style={{ height: "350px" }}>
              {/* <img src={readingframe} alt="readingframe" /> */}
              <div
                className="modal-outer-primary-btn opennew pointer"
                onClick={() =>
                  window.open(
                    "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/",
                    "_blank"
                  )
                }
              >
                <p>Open</p>
                {/* <img src={opennew} alt="opennew" height={16} /> */}
              </div>

              <h5
                className="pointer"
                style={{
                  color: "#4f52b2",
                  fontSize: "12px",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                }}
              >
                Click here to mark as done
              </h5>
            </div>
          </div>
        ) : show === "articleWritten" ? (
          <RichTextEditor
            value={value}
            //   onChange={(newValue) => {
            //     setValue(newValue);
            //   }}
            className="RichTextEditor"
            disabled
          />
        ) : null}
        <div className="bg-white mt-3" style={{ height: "200px" }}>
          <Tabs id="controlled-tab-example" defaultActiveKey="Description">
            <Tab eventKey="Description" title="Description">
              <div className="overflow-y-scroll" style={{ height: "145px" }}>
                <p
                  className="ps-3"
                  style={{
                    color: "#616161",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  subTopicData?.value?.description
                </p>
              </div>
            </Tab>
            <Tab eventKey="References" title="References">
              <div className="overflow-y-scroll" style={{ height: "145px" }}>
                <p
                  className="ps-3"
                  style={{
                    color: "#616161",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  subTopicData?.value?.refmaterial
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  };
  const Task = () => {
    return (
      <div className="h-100 w-100 bg-white py-2 px-3">
        <div className="h-100 w-100 d-flex flex-column align-items-start gap-3 overflow-y-scroll">
          <div className="w-100 d-flex flex-column">
            <p className="" style={{ fontSize: "14px", fontWeight: "500" }}>
              Question 1
            </p>
            <p className="" style={{ fontSize: "12px", fontWeight: "400" }}>
              How does Facebook help user interpret social behaviour
            </p>
            <textarea
              name="overall Feedback"
              id="feedback"
              rows="3"
              className="w-100 p-1 mt-2 rounded"
              placeholder="Write your answer here"
            ></textarea>
            {file === "" ? (
              <>
                <p className="w-100 mt-1" style={{ textAlign: "center" }}>
                  or
                </p>
                <Dropzone onDrop={onDrop} style={{ cursor: "pointer" }}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div
                        className="dropzone-inner-text cert-dropzone mt-1 py-1 pointer"
                        style={{ border: "1px dashed #e2dcdc" }}
                      >
                        <p>
                          Drag and Drop files here{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <p>Or</p>
                        <p className="upload-excel-btn">
                          <AiOutlineUpload /> Choose File
                        </p>
                        <p className="cert-upload-note">
                          <span>*</span>
                          Supported formats: .pdf, .jpg, .jpeg, .png only.
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </>
            ) : (
              <div className="cert-uploaded mt-2">
                <div className="cert-uploaded-details d-flex gap-4">
                  <div className="cert-file-details">{file.name}</div>
                  <p
                    className="cert-close"
                    onClick={() => {
                      setFile("");
                    }}
                  >
                    x
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="w-100 d-flex flex-column">
            <p className="" style={{ fontSize: "14px", fontWeight: "500" }}>
              Question 2
            </p>
            <p className="" style={{ fontSize: "12px", fontWeight: "400" }}>
              How does Facebook help user interpret social behaviour
            </p>
            <textarea
              name="overall Feedback"
              id="feedback"
              rows="3"
              className="w-100 p-1 mt-2 rounded"
              placeholder="Write your answer here"
            ></textarea>
            {file === "" ? (
              <>
                <p className="w-100 mt-1" style={{ textAlign: "center" }}>
                  or
                </p>
                <Dropzone onDrop={onDrop} style={{ cursor: "pointer" }}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div
                        className="dropzone-inner-text cert-dropzone mt-1 py-1 pointer"
                        style={{ border: "1px dashed #e2dcdc" }}
                      >
                        <p>
                          Drag and Drop files here{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <p>Or</p>
                        <p className="upload-excel-btn">
                          <AiOutlineUpload /> Choose File
                        </p>
                        <p className="cert-upload-note">
                          <span>*</span>
                          Supported formats: .pdf, .jpg, .jpeg, .png only.
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </>
            ) : (
              <div className="cert-uploaded mt-2">
                <div className="cert-uploaded-details d-flex gap-4">
                  <div className="cert-file-details">{file.name}</div>
                  <p
                    className="cert-close"
                    onClick={() => {
                      setFile("");
                    }}
                  >
                    x
                  </p>
                </div>
              </div>
            )}
          </div>
          <div
            className="modal-outer-primary-btn px-4 py-1 pointer"
            style={{ color: "white" }}
          >
            Submit
          </div>
        </div>
      </div>
    );
  };
  const Quiz = () => {
    return (
      <div className="h-100 w-100 bg-white d-flex flex-column p-3 overflow-y-scroll">
        <div className="w-100 d-flex flex-column mb-2">
          <p className="" style={{ fontSize: "14px", fontWeight: "600" }}>
            Question 1
          </p>
          <p className="" style={{ fontSize: "14px", fontWeight: "500" }}>
            How does Facebook help user interpret social behaviour
          </p>
          <div className="d-flex flex-column align-items-center ps-2">
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "12px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis perferendis est pariatur ipsam error provident
                temporibus nesciunt ducimus?
              </label>
            </div>
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "14px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                quae blanditiis reprehenderit necessitatibus eaque cupiditate,
                laborum quia quis fugiat doloribus nobis porro sit iste cum.
              </label>
            </div>
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "14px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur pariatur necessitatibus ex nesciunt, et assumenda
                numquam totam veniam ullam nam.
              </label>
            </div>
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "14px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                aperiam maiores quod reprehenderit veniam assumenda natus modi
                distinctio debitis incidunt, sequi totam deserunt ipsa, tempore
                quas dolore ad consequuntur? Doloremque.
              </label>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-column mb-2">
          <p className="" style={{ fontSize: "14px", fontWeight: "600" }}>
            Question 2
          </p>
          <p className="" style={{ fontSize: "14px", fontWeight: "500" }}>
            How does Facebook help user interpret social behaviour
          </p>
          <div className="d-flex flex-column align-items-center ps-2">
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "12px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis perferendis est pariatur ipsam error provident
                temporibus nesciunt ducimus?
              </label>
            </div>
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "14px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                quae blanditiis reprehenderit necessitatibus eaque cupiditate,
                laborum quia quis fugiat doloribus nobis porro sit iste cum.
              </label>
            </div>
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "14px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur pariatur necessitatibus ex nesciunt, et assumenda
                numquam totam veniam ullam nam.
              </label>
            </div>
            <div className="d-flex align-items-start">
              <input
                type="radio"
                id="quizUser"
                name="quizUser"
                className="inputRadio mt-1"
              />
              <label
                htmlFor="quizUser"
                className="single-option-radio-label"
                style={{
                  fontSize: "14px",
                  color: "#424242",
                  fontWeight: "400",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                aperiam maiores quod reprehenderit veniam assumenda natus modi
                distinctio debitis incidunt, sequi totam deserunt ipsa, tempore
                quas dolore ad consequuntur? Doloremque.
              </label>
            </div>
          </div>
        </div>
        <div
          className="modal-outer-primary-btn px-4 py-1 pointer"
          style={{ color: "white", width: "fit-content" }}
        >
          Submit
        </div>
      </div>
    );
  };
  const Final = () => {
    return <Task />;
  };
  const NoData = ({ title }) => {
    return (
      <div>
        <div className="main-topic-detail inner-field justify-content-between h-100">
          <strong>{title}</strong>
          <div
            className="w-100 d-flex align-items-center justify-content-center"
            style={{ padding: "1rem 0" }}
          >
            <img
              src={finalAssessmentimg}
              alt="finalAssessment"
              style={{ width: "25%" }}
            />
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
            <div
              className="modal-outer-primary-btn manual-final-submit text-white py-1 me-2"
              onClick={() => {
                setConfirmStart(true);
              }}
              style={{ width: "fit-content" }}
            >
              Start {title}
            </div>
            <div
              className="modal-outer-secondary-btn manual-final-submit text-white py-1 me-2"
              onClick={() => {
                setShow("Video");
              }}
              style={{ width: "fit-content" }}
            >
              Continue Learning
            </div>
          </div>
          <div className="w-100 d-flex flex-column">
            <div
              className="importantBtn modal-outer-primary-btn manual-final-submit py-1 me-2"
              style={{
                backgroundColor: "#EDEEFF",
                color: "#242424",
                width: "fit-content",
              }}
            >
              Important Note:
            </div>
            <p style={{ fontSize: "12px", color: "#424242" }} className="mt-1">
              Note that Your course progress will not be updated to 100% or
              considered complete unless you have successfully completed all
              quizzes and tasks.
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="courseManagementContainer">
      <div
        className="d-flex bredcumb-header"
        style={{ columnGap: "8px", fontSize: "12px" }}
      >
        <p className="pointer">Learning Path</p>
        <p>&#x3e;</p>
        <p className="pointer" onClick={() => window.history.back()}>
          LP_React
        </p>
        <p>&#x3e;</p>
        <p style={{ color: "#4F52B2" }}>CT_RCT007</p>
      </div>
      <div className="create-course-head-manually py-2">
        <div className="create-course-head">
          <img
            src={arrow}
            alt="leftArrowIcon"
            style={{ height: "16px" }}
            className="pointer"
            onClick={() => window.history.back()}
          />
          CT_RCT007
        </div>
      </div>
      <div className="add-course-manually-page">
        <div className="add-course-manually-accordian-div">
          <div className="accordian-div w-100">
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <p title={"Subtopic"}>Subtopic</p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    className="added-item-div"
                    onClick={() => {
                      setShow("articleLink");
                    }}
                  >
                    articleLink
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Taskadd />
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <p title={"jai ho"}>jai hooooo</p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    className="added-item-div"
                    onClick={() => {
                      setShow("articleWritten");
                    }}
                  >
                    articleWritten
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <p title={"jai ho"}>Test</p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    className="added-item-div"
                    onClick={() => {
                      setShow("Video");
                    }}
                  >
                    Video
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Quizadd />
            </Accordion>
          </div>
          <div
            className={`modal-outer-secondary-btn final-assessment-btn pointer w-100 finalAssessmentActive`}
            onClick={() => {
              setShow("Final");
            }}
          >
            Final Assessment
          </div>
        </div>
        <div className="add-course-manually-filldetails-div">
          {show === "" ? (
            "yeeeeeeeeeeeeeeeeeeeeeeeeee"
          ) : show === "Video" ? (
            <Learning />
          ) : show === "articleLink" ? (
            <Learning />
          ) : show === "articleWritten" ? (
            <Learning />
          ) : show === "Task" ? (
            confirmStart ? (
              <Task />
            ) : (
              <NoData title={"Task"} />
            )
          ) : show === "Quiz" ? (
            confirmStart ? (
              <Quiz />
            ) : (
              <NoData title={"Quiz"} />
            )
          ) : show === "Final" && confirmStart ? (
            <Final />
          ) : (
            <NoData title={"Assessment"} />
          )}
        </div>
      </div>
    </div>
  );
}
export default NewFlow;
