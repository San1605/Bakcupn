import React, { useState, useEffect } from "react";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import { TfiDownload } from "react-icons/tfi";
import { AiOutlineUpload } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import noCert from "../../../../assets/no-cert.svg";
import noSkill from "../../../../assets/noskill.svg";
import delIcon from "../../../admin/assets/delete-red.svg";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import pdfIcon from "../../../../assets/svg/dashboard/samplers/samplerpdficon.png";
import jpgIcon from "../../../../assets/svg/dashboard/samplers/samplerjpg.png";
import pngIcon from "../../../../assets/svg/dashboard/samplers/samplerpng.png";
import moment from "moment";
import CreatableSelect from "react-select/creatable";
import editpencilicon from "../../../admin/assets/editPencil.svg";
import "./userReport.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import skillsOptions from "../../../../utils/userSkillsData/data";

function UserReport() {
  const {
    dispatch,
    getprofiledata,
    userprofiledata,
    userMail,
    getprofileengagement,
    userprofileengagementdata,
    uploadcertificate,
    deletecertificate,
    navigate,
    addworkmodelocation,
    addskills,
  } = useContext(GlobalContext);
  const [activeCustomTab, setActiveCustomTab] = useState(2);
  const [certName, setCertName] = useState("");
  const [certDate, setCertDate] = useState("");
  const [projectdata, setProjectdata] = useState([]);
  const [certificatedata, setCertificatedata] = useState([]);
  const [file, setFile] = useState("");
  const [switchIt, setSwitchit] = useState(false);
  const [workOffice, setWorkOffice] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [skillSwitch, setSkillSwitch] = useState(false);
  const [saveOverallSkills, setSaveOverallSkills] = useState([]);
  const [savePrimarySkill, setSavePrimarySkill] = useState("");
  const handleeditorcourses = (data) => {
    setSaveOverallSkills(data);
  };
  useEffect(() => {
    document.title = `User Report | ${process.env.REACT_APP_APP_NAME}`;
    dispatch({
      type: "ACCOUNT_NAV",
      payload: "99",
    });
    if (!(Object.keys(userprofiledata).length > 0)) {
      getprofiledata();
    }
    getprofileengagement();
  }, []);
  useEffect(() => {
    if (Object.keys(userprofiledata).length > 0) {
      setWorkMode(
        userprofiledata.workMode !== null ? userprofiledata.workMode : ""
      );
      setWorkOffice(
        userprofiledata.workLocation !== null
          ? userprofiledata.workLocation
          : ""
      );
    }
  }, [userprofiledata]);
  useEffect(() => {
    if (Object.keys(userprofileengagementdata).length > 0) {
      setProjectdata(userprofileengagementdata.projects);
      setCertificatedata(userprofileengagementdata.certificates);
      setSavePrimarySkill(
        userprofileengagementdata.skills[0].primarySkill !== null
          ? userprofileengagementdata.skills[0].primarySkill
          : ""
      );
      setSaveOverallSkills(
        userprofileengagementdata.skills[0].overallSkills !== null
          ? userprofileengagementdata.skills[0].overallSkills
              .split(",")
              .map((elem) => {
                return { label: elem, value: elem };
              })
          : ""
      );
    }
  }, [userprofileengagementdata]);
  const currentDate = moment().format("YYYY-MM-DD");
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
        toast.error("File type not supported.");
      }
    }
  };
  const handleDownload = (blobStorageLink) => {
    const link = document.createElement("a");
    link.href = blobStorageLink;
    link.download = "file.jpg";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const checker = [
    null, undefined , ""
  ]
  const Dummytrow = ({ elem }) => {
    return (
      <tr
        style={{
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <td className="col-3">
          <p>{!checker.includes(elem.Project_Name)?elem.Project_Name:"-"}</p>
        </td>
        <td className="col-2">
          <p>{!checker.includes(elem.project_manager_name)?elem.project_manager_name:"-"}</p>
        </td>
        <td className="col-1">
          {!checker.includes(elem.Engagement_Start_Date) ? moment(elem.Engagement_Start_Date.split(" ")[0]).format("DD/MM/YYYY"):"-"}
        </td>
        <td className="col-1">
          {!checker.includes(elem.Engagement_End_Date) ? moment(elem.Engagement_End_Date.split(" ")[0]).format("DD/MM/YYYY"):"-"}
        </td>
        <td className="col-2">
          <p>{!checker.includes(elem.engagementTypeName)?elem.engagementTypeName:"-"}</p>
        </td>
        <td className="col-1">
          <p>{!checker.includes(elem.ProjectRoleName)?elem.ProjectRoleName:"-"}</p>
        </td>
        <td className="col-1">{!checker.includes(elem.resource_utilization)?`${elem.resource_utilization}%`:"-"}</td>
      </tr>
    );
  };
  const Dummytrow1 = ({ elem }) => {
    return (
      <tr
        style={{
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <td className="col-4">{elem.certificateName}</td>
        <td className="col-3">
          {moment(elem.certificationDate).format("DD/MM/YYYY")}
        </td>
        {/* <td className="col-3">
          <a href="learn.microsoft.com" target="blank">
            learn.microsoft.com
          </a>
        </td> */}
        <td className="col-3">
          <div
            className="download-cert"
            onClick={() => handleDownload(elem.blobStorageLink)}
          >
            <TfiDownload className="me-1" /> Download
          </div>
        </td>
        <td className="col-1">
          <img
            src={delIcon}
            alt="delIcon"
            className="me-1 pointer"
            onClick={() => deletecertificate(elem.certificateId)}
            style={{ width: "14px" }}
          />
        </td>
      </tr>
    );
  };

  const handleDiscard = () => {
    setCertDate("");
    setCertName("");
    setFile("");
  };
  const handlesave = () => {
    if (certName !== "" && certDate !== "" && file !== "") {
      const data = {
        name: certName,
        file: file,
        date: moment(certDate).format("YYYY-MM-DD"),
      };
      uploadcertificate(data);
      setCertDate("");
      setCertName("");
      setFile("");
    } else {
      toast.error("Mandatory fields can't be empty");
    }
  };
  useEffect(() => {
    console.log(file, "upload");
  }, [file]);
  // useEffect(() => {
  //   console.log(saveOverallSkills, "saveOverallSkills");
  // }, [saveOverallSkills]);
  return (
    <>
      <div className="col-md-3 bg-white p-3 d-flex flex-column reports-col-md-3 h-100 overflow-y-scroll reports-left">
        <div className="px-3 d-flex flex-column menteeProfileContainer gap-1">
          <div className="menteeProfileDetailsContainer">
            <div className="menteeProfileimg rounded-circle">
              <ImageWithFallback
                src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                  userMail?.split("@")[0]
                }.jpg`}
                fallbackSrc="big"
                classes="profilephoto pointer"
              />
            </div>
            <div className="menteeProfileDetails">
              <p className="menteeName" style={{ fontSize: "18px" }}>
                {userprofiledata.name}
              </p>
              <p className="menteeDesignation" style={{ fontSize: "14px" }}>
                {userMail}
              </p>
            </div>
          </div>
          <div className="py-2 d-flex flex-column otherMenteeDetailContainer">
            <div className="work-head ps-2">Basic Info</div>
            <div className="d-flex otherMenteeDetail ps-2">
              <p>Designation: </p>
              <span title={"designation"}>{userprofiledata.Designation}</span>
            </div>
            <div className="d-flex otherMenteeDetail ps-2">
              <p>HRM:</p>
              <span>{userprofiledata.HRMID}</span>
            </div>
            {/* <div className="d-flex otherMenteeDetail ps-2">
              <p>Date of Joining: </p>
              <span>{userprofiledata.Dateofjoining}</span>
            </div> */}
            <div className="d-flex otherMenteeDetail ps-2">
              <p>Contact No. </p>
              <span>{userprofiledata.Mobile}</span>
            </div>
            {/* <div className="d-flex otherMenteeDetail ps-2">
              <p>College: </p>
              <span title={"clg name"}>{userprofiledata.collegeName}</span>
            </div>
            <div className="d-flex otherMenteeDetail ps-2">
              <p>Year of Graduation: </p>
              <span>{userprofiledata.yearOfPassing}</span>
            </div> */}
            <div className="d-flex otherMenteeDetail ps-2">
              <p>Reporting Manager: </p>
              <span title={userprofiledata.reportingTo}>
                {userprofiledata.reportingTo}
              </span>
            </div>
            <div className="d-flex otherMenteeDetail ps-2">
              <p>Department: </p>
              <span title={"Department"}>{userprofiledata.Department}</span>
            </div>
            {userprofiledata.viewEvaluationReports && (
              <div className="d-flex otherMenteeDetail ps-2">
                <p>Evaluation: </p>
                <span
                  className="pointer pointer-report text-dark"
                  onClick={() =>
                    navigate(
                      `/evaluationreports/userevaluationreport/${
                        userMail.split("@")[0]
                      }`
                    )
                  }
                >
                  view
                </span>
              </div>
            )}
            <div className="info-head ps-2">
              <p>Location</p>
              <img
                src={editpencilicon}
                alt="editpencilicon"
                className="action-icon profile-edit-icon"
                onClick={() => setSwitchit(true)}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between otherMenteeDetail ps-2">
              <p>Work Mode: </p>
              {switchIt ? (
                <select
                  title="Select Work Mode"
                  id="selectLocationInfo"
                  name="workMode"
                  className="profile-popver-input"
                  style={{ width: "60%" }}
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Mode
                  </option>
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                </select>
              ) : (
                <span> {workMode === "" ? "NA" : workMode}</span>
              )}
            </div>
            <div className="d-flex otherMenteeDetail ps-2">
              <p>Work Location: </p>
              {switchIt ? (
                <select
                  title="Select Work Location"
                  id="selectLocationInfo"
                  name="Work Location"
                  className="profile-popver-input w-75"
                  value={workOffice}
                  onChange={(e) => setWorkOffice(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Location
                  </option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Jaipur - Jhalana">Jaipur - Jhalana</option>
                  <option value="Jaipur - Malviya Nagar">
                    Jaipur - Malviya Nagar
                  </option>
                  <option value="Jaipur - Mansarovar">
                    Jaipur - Mansarovar
                  </option>
                  <option value="Jalpaiguri">Jalpaiguri</option>
                  <option value="Noida">Noida</option>
                  <option value="Pune">Pune</option>
                </select>
              ) : (
                <span>{workOffice === "" ? "NA" : workOffice}</span>
              )}
            </div>
            {switchIt && (
              <div className="cert-uploaded-action">
                <div
                  className="modal-outer-secondary-btn cert-cancel py-1 px-3"
                  onClick={() => {
                    setWorkMode(
                      userprofiledata.workMode !== null
                        ? userprofiledata.workMode
                        : ""
                    );
                    setWorkOffice(
                      userprofiledata.workLocation !== null
                        ? userprofiledata.workLocation
                        : ""
                    );
                    setSwitchit(false);
                  }}
                >
                  Discard
                </div>
                <div
                  className="modal-outer-primary-btn cert-save py-1 px-3"
                  onClick={() => {
                    setSwitchit(false);
                    addworkmodelocation(workMode, workOffice);
                  }}
                >
                  Save
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-9 p-3 d-flex flex-column user-report-col9">
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center"
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="leftArrowIcon"
              style={{ height: "14px" }}
              className="pointer"
            />
          </div>
          <p className="reportHead ms-2" style={{ fontSize: "18px" }}>
            Report
          </p>
        </div>
        <div className="user-report-col9-content overflow-y-scroll pe-2">
          <div className="user-report-block projects-block">
            <div className="project-detail-head">Project Details</div>
            <div
              className="project-details-table mt-2"
              style={{
                overflow: "hidden",
                minHeight: "fit-content",
                maxHeight: "calc(100% - 30px)",
              }}
            >
              <div
                className="row col-12 tableFixHead"
                style={{
                  overflowY: "auto",
                  minHeight: "fit-content",
                  height: "unset",
                  maxHeight: "100%",
                }}
              >
                <table className="table m-0">
                  <thead className="thead">
                    <tr className="trow w-100 conversion-accordian-row">
                      <th className="col-3">Project Name</th>
                      <th className="col-2">Project Manager</th>
                      <th className="col-1">Start Date</th>
                      <th className="col-1">End Date</th>
                      <th className="col-2">Eng. Type</th>
                      <th className="col-1">Role</th>
                      <th className="col-1">Utilization</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {projectdata.length > 0 ? (
                      projectdata.map((elem) => {
                        return <Dummytrow elem={elem} />;
                      })
                    ) : (
                      <div>No Engagement Found</div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="user-report-block projects-block">
            <div className="project-detail-head">
              User Skills
              {!skillSwitch &&
                savePrimarySkill !== "" &&
                saveOverallSkills.length > 0 && (
                  <img
                    src={editpencilicon}
                    alt="editpencilicon"
                    className="action-icon profile-edit-icon ms-2"
                    onClick={() => setSkillSwitch(true)}
                  />
                )}
            </div>
            <div className="add-skills-block">
              {!skillSwitch ? (
                savePrimarySkill !== "" && saveOverallSkills.length > 0 ? (
                  <div className="skill-show-div">
                    <div className="primary-skill-div">
                      <div className="primary-skill-head">
                        <div className="work-head">Primary Skill</div>
                        {/* <div class="rac-div skill-rac"></div> */}
                      </div>

                      <div className="primary-skill">{savePrimarySkill}</div>
                    </div>
                    <div className="primary-skill-div">
                      <div className="primary-skill-head">
                        <div className="work-head">Overall Skills</div>
                        {/* <div class="rac-div skill-rac"></div> */}
                      </div>

                      <div className="overall-skill-wrapper overflow-y-scroll">
                        {saveOverallSkills?.map((el) => {
                          return (
                            <div className="primary-skill">{el.value}</div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center gap-1 pb-2">
                    <img
                      src={noSkill}
                      alt="noSkill"
                      style={{ height: "80px" }}
                    />
                    <p className="noCert-text m-0">
                      No Skills has been added yet
                    </p>
                    <div
                      className="modal-outer-secondary-btn pointer mt-1"
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        setSkillSwitch(true);
                      }}
                    >
                      + Add Skills
                    </div>
                  </div>
                )
              ) : (
                <div className="addSkill-block pe-2">
                  <div className="customRole-row pt-1" style={{ width: "40%" }}>
                    <div className="flex-input-row">
                      <label style={{ color: "#242424", fontWeight: "400" }}>
                        Primary Skill <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="primarySkill"
                        id="primarySkill"
                        className="singlerow-select"
                        style={{ width: "85%" }}
                        value={savePrimarySkill}
                        onChange={(e) => setSavePrimarySkill(e.target.value)}
                      >
                        <option value="" selected hidden>
                          Select primary skill
                        </option>
                        {skillsOptions.primarySkillsOption.length > 0 &&
                          skillsOptions.primarySkillsOption.map((el, i) => {
                            return <option value={el}>{el}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  <div
                    className="customRole-row pt-1 mt-2"
                    style={{ width: "40%" }}
                  >
                    <div className="flex-input-row">
                      <label style={{ color: "#242424", fontWeight: "400" }}>
                        Overall Skills<span style={{ color: "red" }}>*</span>
                      </label>
                      <CreatableSelect
                        id="skill"
                        isMulti
                        name="Overall Skills"
                        className="basic-multi-select overall-skill-select"
                        classNamePrefix="multiSelect"
                        placeholder="Select Skill"
                        options={skillsOptions.overallSkillSet}
                        value={saveOverallSkills}
                        onChange={(e) => handleeditorcourses(e)}
                        isClearable
                      />
                    </div>
                  </div>
                  <div
                    className="cert-uploaded-action"
                    style={{ marginTop: "12px" }}
                  >
                    <div
                      className="modal-outer-secondary-btn cert-cancel py-1 px-3"
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        setSavePrimarySkill(
                          userprofileengagementdata.skills[0].primarySkill !==
                            null
                            ? userprofileengagementdata.skills[0].primarySkill
                            : ""
                        );
                        setSaveOverallSkills(
                          userprofileengagementdata.skills[0].overallSkills !==
                            null
                            ? userprofileengagementdata.skills[0].overallSkills
                                .split(",")
                                .map((elem) => {
                                  return { label: elem, value: elem };
                                })
                            : []
                        );
                        setSkillSwitch(false);
                      }}
                    >
                      Discard
                    </div>
                    <div
                      className="modal-outer-primary-btn cert-save py-1 px-3"
                      style={{ fontSize: "12.5px" }}
                      onClick={() => {
                        if (saveOverallSkills.length > 0) {
                          console.log(
                            saveOverallSkills.find((elem) =>
                              elem.value.includes(",")
                            )
                          );
                          if (
                            saveOverallSkills.find((elem) =>
                              elem.value.includes(",")
                            ) === undefined
                          ) {
                            setSkillSwitch(false);
                            addskills(
                              savePrimarySkill,
                              saveOverallSkills
                                .map((elem) => {
                                  return elem.value;
                                })
                                .toString()
                            );
                          } else {
                            toast.error('Skills can not include "," character');
                          }
                        } else {
                          toast.error(
                            "Primary and Overall skills can't be empty"
                          );
                        }
                      }}
                    >
                      Save
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="user-report-block Certificates-block">
            <div className="tabs-switch-div">
              <div
                className={`tab-switch tab1-switch ${
                  activeCustomTab === 2 && "active-tab-switch"
                }`}
                onClick={() => {
                  setActiveCustomTab(2);
                }}
              >
                <div class="tab-text tab1-text">Certificate List</div>
                <div class="rac-div">
                  <div className="rac-hline"></div>
                </div>
              </div>
              <div
                className={`tab-switch tab2-switch ${
                  activeCustomTab === 1 && "active-tab-switch"
                }`}
                onClick={() => {
                  setActiveCustomTab(1);
                }}
              >
                <div class="tab-text tab2-text">Upload Certificate</div>
                <div class="rac-div">
                  <div className="rac-hline"></div>
                </div>
              </div>
            </div>
            <div className="tab-content-block">
              {activeCustomTab === 1 && (
                <div className=" tab-content tab1-content">
                  <div className="user-report-block certification-block">
                    <div className="project-detail-head d-flex w-100 align-items-center justify-content-between">
                      Upload Certficate
                      {/* {(file === "" || certName === "" || certDate === "") && ""} */}
                      <div className="cert-uploaded-action">
                        <div
                          className="modal-outer-secondary-btn cert-cancel py-1 px-3"
                          onClick={() => {
                            handleDiscard();
                          }}
                        >
                          Discard
                        </div>
                        <div
                          className="modal-outer-primary-btn cert-save py-1 px-3"
                          onClick={() => {
                            handlesave();
                          }}
                        >
                          Save
                        </div>
                      </div>
                    </div>
                    <div className="upload-certificate-block">
                      <div className="upload-details-div">
                        <div className="detail-input-row">
                          <label className="cert-label">
                            Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="cert-input"
                            placeholder="Certificate Name"
                            value={certName}
                            onChange={(e) => {
                              setCertName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="detail-input-row">
                          <label className="cert-label">
                            Issue Date<span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="cert-input-date  position-relative">
                            <input
                              type="date"
                              placeholder="mm/dd/yyyy"
                              className=" inputFieldTextarea pointer interviewdate-input"
                              value={certDate}
                              onChange={(e) => setCertDate(e.target.value)}
                              max={currentDate}
                            />
                            <BsCalendar3 className="calendar-icon" />
                          </div>
                        </div>
                      </div>
                      <div className="upload-certificate-div">
                        {file === "" ? (
                          <Dropzone
                            onDrop={onDrop}
                            style={{ cursor: "pointer" }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="dropzone-inner-text cert-dropzone">
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
                                    Supported formats: .pdf, .jpg, .jpeg, .png
                                    only.
                                  </p>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                        ) : (
                          <div className="cert-uploaded">
                            <div className="cert-uploaded-details">
                              <div className="cert-file-details">
                                <img
                                  src={
                                    file.name.includes("pdf")
                                      ? pdfIcon
                                      : file.name.includes(".jpg" || ".jpeg")
                                      ? jpgIcon
                                      : file.name.includes(".png") && pngIcon
                                  }
                                  alt="pdfIcon"
                                  height={22}
                                />
                                {file.name}
                              </div>
                              <IoCloseCircleOutline
                                className="cert-close"
                                onClick={() => {
                                  setFile("");
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeCustomTab === 2 && (
                <div className=" tab-content tab2-content">
                  <div className="user-report-block certification-block">
                    <div className="project-detail-head">
                      Certifications List
                    </div>
                    <div
                      className="project-details-table mt-2"
                      style={{
                        // overflow: "hidden",
                        minHeight: "fit-content",
                        maxHeight: "calc(100% - 30px)",
                      }}
                    >
                      <div
                        className="row col-12 tableFixHead certificate-table-list"
                        style={{
                          overflowY: "auto",
                          minHeight: "fit-content",
                          height: "unset",
                        }}
                      >
                        {certificatedata.length > 0 ? (
                          <table className="table m-0">
                            <thead className="thead">
                              <tr className="trow w-100 conversion-accordian-row">
                                <th className="col-4">Certificate Name </th>
                                <th className="col-3">Certification Date</th>
                                {/* <th className="col-3">Certification Link</th> */}
                                <th className="col-3">Certificate</th>
                                <th className="col-1"></th>
                              </tr>
                            </thead>
                            <tbody className="tbody">
                              {certificatedata.map((elem) => {
                                return <Dummytrow1 elem={elem} />;
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div className="nocert-div">
                            <img
                              src={noCert}
                              alt="noCert"
                              className="noCert-img"
                            />
                            <p className="noCert-text">
                              No Certification has been added yet
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserReport;
