import React, { useState, useEffect } from "react";
import profileimg90 from "../../../../assets/images/profileimg90.png";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import { TfiDownload } from "react-icons/tfi";
import { AiOutlineUpload } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import noCert from "../../../../assets/no-cert.svg";
import delIcon from "../../../admin/assets/delete-red.svg";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import pdfIcon from "../../../../assets/svg/dashboard/samplers/samplerpdficon.png";
import jpgIcon from "../../../../assets/svg/dashboard/samplers/samplerjpg.png";
import pngIcon from "../../../../assets/svg/dashboard/samplers/samplerpng.png";
import moment from "moment";
import "./userReport.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";

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
  } = useContext(GlobalContext);
  const [activeCustomTab, setActiveCustomTab] = useState(1);
  const [certName, setCertName] = useState("");
  const [certDate, setCertDate] = useState("");
  const [projectdata, setProjectdata] = useState([]);
  const [certificatedata, setCertificatedata] = useState([]);
  const [file, setFile] = useState("");
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
    if (Object.keys(userprofileengagementdata).length > 0) {
      setProjectdata(userprofileengagementdata.projects);
      setCertificatedata(userprofileengagementdata.certificates);
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
  const Dummytrow = ({ elem }) => {
    return (
      <tr
        style={{
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <td className="col-3">
          <p>{elem.Project_Name}</p>
        </td>
        <td className="col-2">
          <p>{elem.project_manager_name}</p>
        </td>
        <td className="col-1">
          {moment(elem.Engagement_Start_Date.split(" ")[0]).format(
            "DD/MM/YYYY"
          )}
        </td>
        <td className="col-1">
          {moment(elem.Engagement_End_Date.split(" ")[0]).format("DD/MM/YYYY")}
        </td>
        <td className="col-2">
          <p>{elem.engagementTypeName}</p>
        </td>
        <td className="col-1">
          <p>{elem.ProjectRoleName}</p>
        </td>
        <td className="col-1">{`${elem.resource_utilization}%`}</td>
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
  return (
    <>
      <div className="col-md-3 bg-white p-3 d-flex flex-column reports-col-md-3 h-100 overflow-y-scroll reports-left">
        <div className="px-3 d-flex flex-column menteeProfileContainer">
          <div className="menteeProfileDetailsContainer">
            <div className="menteeProfileimg rounded-circle">
              <ImageWithFallback
                src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                  userMail?.split("@")[0]
                }.jpg`}
                fallbackSrc={profileimg90}
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
            <div className="d-flex otherMenteeDetail">
              <p>Designation: </p>
              <span title={"designation"}>{userprofiledata.Designation}</span>
            </div>
            <div className="d-flex otherMenteeDetail">
              <p>HRM:</p>
              <span>{userprofiledata.HRMID}</span>
            </div>
            <div className="d-flex otherMenteeDetail">
              <p>Date of Joining: </p>
              <span>{userprofiledata.Dateofjoining}</span>
            </div>

            <div className="d-flex otherMenteeDetail">
              <p>Contact No. </p>
              <span>{userprofiledata.Mobile}</span>
            </div>
            <div className="d-flex otherMenteeDetail">
              <p>College: </p>
              <span title={"clg name"}>{userprofiledata.collegeName}</span>
            </div>
            <div className="d-flex otherMenteeDetail">
              <p>Year of Graduation: </p>
              <span>{userprofiledata.yearOfPassing}</span>
            </div>
            <div className="d-flex otherMenteeDetail">
              <p>Reporting Manager: </p>
              <span title={userprofiledata.reportingTo}>
                {userprofiledata.reportingTo}
              </span>
            </div>
            <div className="d-flex otherMenteeDetail">
              <p>Department: </p>
              <span title={"Department"}>{userprofiledata.Department}</span>
            </div>
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
        <div className="user-report-col9-content">
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
          <div className="user-report-block Certificates-block">
            <div className="tabs-switch-div">
              <div
                className={`tab-switch tab1-switch ${
                  activeCustomTab === 1 && "active-tab-switch"
                }`}
                onClick={() => {
                  setActiveCustomTab(1);
                }}
              >
                <div class="tab-text tab1-text">Upload Certificate</div>
                <div class="rac-div">
                  <div className="rac-hline"></div>
                </div>
              </div>
              <div
                className={`tab-switch tab2-switch ${
                  activeCustomTab === 2 && "active-tab-switch"
                }`}
                onClick={() => {
                  setActiveCustomTab(2);
                }}
              >
                <div class="tab-text tab2-text">Certificate List</div>
                <div class="rac-div">
                  <div className="rac-hline"></div>
                </div>
              </div>
            </div>
            <div className="tab-content-block">
              {activeCustomTab === 1 && (
                <div className=" tab-content tab1-content">
                  <div className="user-report-block certification-block">
                    <div className="project-detail-head">Upload Certficate</div>
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
                        <div className="cert-uploaded-action">
                          <div
                            className="modal-outer-secondary-btn cert-cancel"
                            onClick={() => {
                              handleDiscard();
                            }}
                          >
                            Discard
                          </div>
                          <div
                            className="modal-outer-primary-btn cert-save"
                            onClick={() => {
                              handlesave();
                            }}
                          >
                            Save
                          </div>
                        </div>
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
                        overflow: "hidden",
                        minHeight: "fit-content",
                        maxHeight: "calc(100% - 20px)",
                      }}
                    >
                      <div
                        className="row col-12 tableFixHead"
                        style={{
                          overflowY: "auto",
                          minHeight: "fit-content",
                          height: "unset",
                          maxHeight: "calc(100vh - 475px)",
                        }}
                      >
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
                            {certificatedata.length > 0 ? (
                              certificatedata.map((elem) => {
                                return <Dummytrow1 elem={elem} />;
                              })
                            ) : (
                              <div>No Certificate Founded</div>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {/* <div className="nocert-div">
                        <img src={noCert} alt="noCert" className="noCert-img" />
                        <p className="noCert-text">
                          No Certification has been added yet
                        </p>
                      </div> */}
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
