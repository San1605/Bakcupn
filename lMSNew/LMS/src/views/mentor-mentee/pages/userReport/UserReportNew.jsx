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
import "./userReportNew.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import skillsOptions from "../../../../utils/userSkillsData/data";
import ReportEvaluation from "./ReportEvaluation";
import coursestatus from "../../../../assets/svg/mentorReport/coursestatus.svg";
import nointerviewimg from "../../../../assets/svg/mentorReport/nointerviewdoc.svg";
import Reportfileupload from "../../../../component/reportfileuploadmodal/Reportfileupload";
import InterviewFeedbackUploadModal from "../../../../component/feedbackCard/InterviewFeedbackUploadModal";
import { HiDownload } from "react-icons/hi";
import InterviewFeedbackSubmitModal from "../../../../component/feedbackCard/InterviewFeedbackSubmitModal";
import InterviewFeedbackViewModal from "../../../../component/feedbackCard/InterviewFeedbackViewModal";
import InterviewFeedbackUpdateModal from "../../../../component/feedbackCard/InterviewFeedbackUpdateModal";
import TicketsDescriptionModal from "../../../../component/ticketsDescriptionModal/TicketsDescriptionModal";

function UserReportNew() {
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

  const dummyWorkExp = [
    {
      previousCompany: "Celebal Technologies",
      jobTitle: "Full stack Web Development Summer Intern",
      fromDate: "05-05-2022",
      endDate: "16-08-2022",
      descripton:
        "This was a summer training internship where I am under the guidance of some of the technical team members of Celebal Technologies for the role of Full stack summer trainee intern where they take multiple session a week and based on those session learning assigns tasks and my responsibilities were to complete and submit all tasks in given deadline.",
      previousCompanyDoc: null,
    },
    {
      previousCompany: "Bagcampus",
      jobTitle: "FrontendWeb Development Intern",
      fromDate: "02-12-2021",
      endDate: "20-02-2022",
      descripton:
        "It was a 2-month remote internship. In which, first we assigned in a team of four including one team leader from Bagcampus and then we have multiple weekly session in which they taught us Frontend Technologies and gives daily tasks. At last, we were given our final major project where we all have to work together that was for our coordinating and Team-managing skills.",
      previousCompanyDoc: {
        fileName: "Letter_of_Recommendation .pdf",
        url: "https://celeballmsstorage.blob.core.windows.net/data-evaluation-files/15-09-2023%2C-03-26-21-pm_Divyanshu%20Rana%20-%20HRM2601.pdf",
        createdOn: "Sep 15 2023  3:26PM",
      },
    },
    {
      previousCompany: "The Sparks Foundation",
      jobTitle: "Web Development &amp; Design Intern",
      fromDate: "01-08-2021",
      endDate: "01-09-2021",
      descripton:
        "Designed and Developed a DonationWebsite Using, Pugjs,<br>Node.js, Express.js,and Integrated Razorpay Payment Gateway<br>for Payment Functionality",
      previousCompanyDoc: {
        fileName: "sparks-certificate.jpg",
        url: "https://celeballmsstorage.blob.core.windows.net/data-evaluation-files/15-09-2023%2C-03-26-21-pm_Divyanshu%20Rana%20-%20HRM2601.pdf",
        createdOn: "Sep 15 2023  3:26PM",
      },
    },
  ];
  const coursesData = [
    {
      completionStatus: 100,
      courseId: "CT_NOD001",
      complexity: "Beginner",
      days: 10,
      startDate: "17/7/2023",
      endDate: "27/7/2023",
    },
    {
      completionStatus: 100,
      courseId: "CT_NOD002",
      complexity: "Intermediate",
      days: 10,
      startDate: "19/7/2023",
      endDate: "29/7/2023",
    },
    {
      completionStatus: 100,
      courseId: "CT_NOD003",
      complexity: "Advance",
      days: 10,
      startDate: "25/7/2023",
      endDate: "4/8/2023",
    },
  ];
  const interviewsData = [
    {
      formEditable: false,
      projectDetails: [
        {
          cprojectName: null,
          cprojectManager: null,
          projectManagerEditable: true,
        },
      ],
      cdecisionMaker: "prashant.kumar@celebaltech.com",
      celigible: "Yes",
      cprojectList: "HandsFree Automation\nCt-CureRight",
      noOfMonthlyMock: "0",
      reasonOfUndeploybility: "",
      leavesInMonth: "0",
      lpsCompleted: "CT_NODEJS",
      certifications: "No",
      rigidnessOfResource: "Low",
      interviewId: "I_01868",
      emailId: "abhishek.sharma4@celebaltech.com",
      interviewTitle: "Trainee Conversion",
      interviewDate: "2023-07-13 00:00:00",
      recordingLink:
        "https://celebaltech-my.sharepoint.com/:v:/p/hemant_sharma/EYzHHO0GYDBLohltDBdBKcgB4JFR-4gdP6R8xisT2RoewA",
      attachedDoc: null,
      review: null,
      communicationScore: "4",
      technicalScore: "4",
      learningAdaptibility: "5",
      punctuality: "5",
      feedback: "Approved for Trainee",
      overallPerformance: "Excellent",
      taskPerformance: "4",
      isResumeUpdated: "yes",
      finalVerdict:
        "Concern resource can be able to qualify client-side interview.\r Eligible for deployment in any relevant project (Interview\r Qualified Successfully)",
      strengthInTechnical: "Node.js, WebSockets, SQL Database",
      weaknessInTechnical: "GrapjQl",
      improvementArea: "More fluent communication",
      POC: "Ct-CureRight",
      comingToOffice: "Yes",
      relocatedToOffice: "Yes",
    },
    {
      formEditable: true,
      projectDetails: [
        {
          cprojectName: null,
          cprojectManager: null,
          projectManagerEditable: true,
        },
      ],
      cdecisionMaker: null,
      celigible: null,
      cprojectList: null,
      noOfMonthlyMock: null,
      reasonOfUndeploybility: null,
      leavesInMonth: null,
      lpsCompleted: null,
      certifications: null,
      rigidnessOfResource: null,
      interviewId: "I_02321",
      emailId: "abhishek.sharma4@celebaltech.com",
      interviewTitle: "Monthly",
      interviewDate: "2023-07-29 00:00:00",
      recordingLink:
        "https://celebaltech-my.sharepoint.com/:v:/p/hemant_sharma/EctclCpAGSNPrQUbfoy4ZOIBevvxRgomXP0Qbqr4loOXoQ",
      attachedDoc: null,
      review: null,
      communicationScore: "4",
      technicalScore: "4",
      learningAdaptibility: "5",
      punctuality: "5",
      feedback: "Ok",
      overallPerformance: "Good",
      taskPerformance: "4",
      isResumeUpdated: "yes",
      finalVerdict:
        "Interview Qualified Successfully but need more training for\r getting deployed on a project.",
      strengthInTechnical: "Rest APi",
      weaknessInTechnical: "Socket",
      improvementArea: "Javascript",
      POC: "No",
      comingToOffice: "Yes",
      relocatedToOffice: "Yes",
    },
  ];

  const [current, setCurrrent] = useState({
    month: 1,
    year: 2023,
  });
  const [activeNav, setActiveNav] = useState(1);
  return (
    <>
      <div className="col-md-3 bg-white p-3 d-flex flex-column reports-col-md-3 h-100 overflow-y-scroll reports-left">
        <div className="px-3 d-flex flex-column menteeProfileContainer gap-1">
          <div className="menteeProfileDetailsContainer">
            <div className="menteeProfileimg rounded-circle">
              <ImageWithFallback
                src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
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
          <div className="report-navigation-div">
            <div
              className={`report-navigation-row ${
                activeNav === 1 && "report-navigation-row-active"
              }`}
              onClick={() => {
                setActiveNav(1);
              }}
            >
              Profile
            </div>
            <div
              className={`report-navigation-row ${
                activeNav === 2 && "report-navigation-row-active"
              }`}
              onClick={() => {
                setActiveNav(2);
              }}
            >
              Engagements
            </div>
            <div
              className={`report-navigation-row ${
                activeNav === 3 && "report-navigation-row-active"
              }`}
              onClick={() => {
                setActiveNav(3);
              }}
            >
              L&D
            </div>
            <div
              className={`report-navigation-row ${
                activeNav === 4 && "report-navigation-row-active"
              }`}
              onClick={() => {
                setActiveNav(4);
              }}
            >
              Skills & Certifications
            </div>
            <div
              className={`report-navigation-row ${
                activeNav === 5 && "report-navigation-row-active"
              }`}
              onClick={() => {
                setActiveNav(5);
              }}
            >
              Interview Documentation
            </div>
            <div
              className={`report-navigation-row ${
                activeNav === 6 && "report-navigation-row-active"
              }`}
              onClick={() => {
                setActiveNav(6);
              }}
            >
              Evaluation Reports
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9 p-3 d-flex flex-column user-report-col9">
        {activeNav === 1 && (
          <div className="h-100 w-100 overflow-y-scroll pe-2">
            <div className="profile-cards-block-grid">
              <div className="projects-block profile-cards">
                <div className="profile-cards-title primary-skill-head w-100">
                  <div className="work-head w-100">Basic Info</div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block">
                    <div className="profile-cards-content-block-title">
                      HRM ID:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.HRMID}
                    </div>
                  </div>
                  <div className="profile-cards-content-block">
                    <div className="profile-cards-content-block-title">
                      Designation:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.Designation}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block">
                    <div className="profile-cards-content-block-title">
                      Department:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.Department}
                    </div>
                  </div>
                  <div className="profile-cards-content-block">
                    <div className="profile-cards-content-block-title">
                      Date of Joining:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.Dateofjoining}
                    </div>
                  </div>
                </div>
              </div>
              <div className="projects-block profile-cards">
                <div className="profile-cards-title primary-skill-head w-100">
                  <div className="work-head w-100">Reporting</div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block w-100">
                    <div className="profile-cards-content-block-title">
                      Direct Reporting:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.reportingTo}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block w-100">
                    <div className="profile-cards-content-block-title">
                      Secondary Reporting:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.secondReportingTo === "-"
                        ? "NA"
                        : userprofiledata.secondReportingTo}
                    </div>
                  </div>
                </div>
              </div>
              <div className="projects-block profile-cards">
                <div className="profile-cards-title primary-skill-head w-100">
                  <div className="work-head w-100">Contact</div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block w-100">
                    <div className="profile-cards-content-block-title">
                      Mobile:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.Mobile}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block w-100">
                    <div className="profile-cards-content-block-title">
                      Email:
                    </div>
                    <div className="profile-cards-content-block-value">
                      {userprofiledata.emailId}
                    </div>
                  </div>
                </div>
              </div>
              <div className="projects-block profile-cards">
                <div className="profile-cards-title primary-skill-head w-100">
                  <div className="work-head w-100  d-flex justify-content-between align-items-center">
                    Work Details
                    {!switchIt && (
                      <img
                        src={editpencilicon}
                        alt="editpencilicon"
                        className="action-icon profile-edit-icon"
                        onClick={() => setSwitchit(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block w-100">
                    <div className="profile-cards-content-block-title">
                      Work Mode:
                    </div>
                    {switchIt ? (
                      <select
                        title="Select Work Mode"
                        id="selectLocationInfo"
                        name="workMode"
                        className="profile-popver-input"
                        style={{
                          width: "60%",
                          fontSize: "12px",
                          marginLeft: "26px",
                        }}
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
                      <div className="profile-cards-content-block-value">
                        {/* {userprofiledata.workMode} */}
                        {workMode === "" ? "NA" : workMode}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between ps-2">
                  <div className="profile-cards-content-block w-100">
                    <div className="profile-cards-content-block-title">
                      Work Location:
                    </div>
                    {switchIt ? (
                      <select
                        title="Select Work Location"
                        id="selectLocationInfo"
                        name="Work Location"
                        className="profile-popver-input ms-2"
                        style={{ width: "60%", fontSize: "12px" }}
                        value={workOffice}
                        onChange={(e) => setWorkOffice(e.target.value)}
                      >
                        <option value="" selected hidden>
                          Select Location
                        </option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Jaipur - Jhalana">
                          Jaipur - Jhalana
                        </option>
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
                      <div className="profile-cards-content-block-value">
                        {/* {userprofiledata.workLocation} */}
                        {workOffice === "" ? "NA" : workOffice}
                      </div>
                    )}
                  </div>
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
            <div className="mt-3 w-100 d-flex gap-2 justify-content-between profile-cards-block">
              <div className="w-100 projects-block profile-cards">
                <div className="profile-cards-title primary-skill-head w-100">
                  <div className="work-head w-100">Work Experience</div>
                </div>
                <div className="w-100 profile-cards-work-experience-block">
                  <div
                    className="fixed-table-container"
                    style={{
                      overflow: "hidden",
                      height: "fit-content",
                    }}
                  >
                    {dummyWorkExp ? (
                      dummyWorkExp.length > 0 ? (
                        <>
                          <div
                            className="project-details-table mt-2"
                            style={{
                              overflow: "hidden",
                              minHeight: "fit-content",
                              maxHeight: "calc(100% - 40px)",
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
                                    <th className="col-3">
                                      Previous Company Name
                                    </th>
                                    <th className="col-2"> Job Title</th>
                                    <th className="col-1"> From Date</th>
                                    <th className="col-1"> To Date</th>
                                    <th className="col-2"> Job Description</th>
                                    <th className="col-1"> Previous Company</th>
                                  </tr>
                                </thead>
                                <tbody className="tbody">
                                  {dummyWorkExp?.map((elem) => {
                                    return (
                                      <tr>
                                        <td className="col-2 px-3">
                                          {elem.previousCompany}
                                        </td>
                                        <td className="col-2">
                                          {elem.jobTitle}
                                        </td>
                                        <td className="col-2  ">
                                          {elem.fromDate}
                                        </td>
                                        <td className="col-2  ">
                                          {elem.endDate}
                                        </td>
                                        <td className="col-2  ">
                                          <TicketsDescriptionModal
                                            description={elem.descripton}
                                          />
                                        </td>
                                        {elem.previousCompanyDoc == null ? (
                                          <td className="col-2 ">-</td>
                                        ) : (
                                          <td className="col-2  pointer">
                                            <a
                                              href={elem.previousCompanyDoc.url}
                                              target="blank"
                                            >
                                              {elem.previousCompanyDoc.fileName}
                                            </a>
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className=" w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                          style={{ fontSize: "14px" }}
                        >
                          {/* <img src={noData} alt="noData" height={120} /> */}
                          No Resources Found
                        </div>
                      )
                    ) : (
                      <div className="page-loader-div">
                        {/* <Bars
                          height="50"
                          width="50"
                          color="#4F52B2"
                          ariaLabel="bars-loading"
                          wrapperStyle={{}}
                          wrapperClass="page-loader"
                          visible={true}
                        /> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeNav === 2 && (
          <div className="user-report-block projects-block h-100">
            <div className="project-detail-head">Project Details</div>
            <div
              className="project-details-table mt-2"
              style={{
                overflow: "hidden",
                minHeight: "fit-content",
                maxHeight: "calc(100% - 40px)",
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
        )}
        {activeNav === 3 && (
          <div className="user-report-block projects-block h-100">
            <div className="project-detail-head">Enrolled Course Status</div>
            <div
              className="project-details-table mt-2"
              style={{
                overflow: "hidden",
                minHeight: "fit-content",
                maxHeight: "calc(100% - 40px)",
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
                      <th className="col-2  ps-3">Course Name</th>
                      <th className="col-2 ">Complexity</th>
                      <th className="col-2  ">Duration(days)</th>
                      <th className="col-2  ">Start Date</th>
                      <th className="col-2  ">Expected End Date</th>
                      <th className="col-1  ">Status</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {coursesData?.map((elem) => {
                      return (
                        <tr className="report-title-page-table-row">
                          <td className="col-2 ps-3 ">{elem.courseId}</td>
                          <td className="col-2 ">{elem.complexity}</td>
                          <td className="col-2  ">{elem.days}</td>
                          <td className="col-2  ">
                            {elem.startDate == "" ? "_" : elem.startDate}
                          </td>
                          <td className="col-2  ">
                            {elem.endDate == "" ? "_" : elem.endDate}
                          </td>
                          <td className="col-1  ">{elem.completionStatus}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeNav === 4 && (
          <div className="user-report-col9-content overflow-y-scroll pe-2">
            <div className="user-report-block projects-block">
              <div className="project-detail-head">
                Skills
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
                    <div
                      className="customRole-row pt-1"
                      style={{ width: "40%" }}
                    >
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
                    <div className="cert-uploaded-action mt-3">
                      <div
                        className="modal-outer-secondary-btn cert-cancel py-1 px-3"
                        onClick={() => {
                          setSavePrimarySkill(
                            userprofileengagementdata.skills[0].primarySkill !==
                              null
                              ? userprofileengagementdata.skills[0].primarySkill
                              : ""
                          );
                          setSaveOverallSkills(
                            userprofileengagementdata.skills[0]
                              .overallSkills !== null
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
                              toast.error(
                                'Skills can not include "," character'
                              );
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
                  <div class="tab-text tab1-text">Certifications</div>
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
                      {/* <div className="project-detail-head">
                        Certifications List
                      </div> */}
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
        )}
        {activeNav === 5 && (
          <div className="user-report-block projects-block h-100">
            <div className="project-detail-head d-flex align-items-center justify-content-between w-100">
              Interview Documentation
              <Reportfileupload
                current={current}
                // flag={menteedetailsofview?.reportingTo.split(" ")[0] !== hrm_id}
              />
              <InterviewFeedbackUploadModal />
            </div>
            <div
              className="project-details-table mt-2"
              style={{
                overflow: "hidden",
                minHeight: "fit-content",
                maxHeight: "calc(100% - 40px)",
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
                      <th className="col-2 px-3">Interview</th>
                      <th className="col-2">Date</th>
                      <th className="col-2">Interview Recording</th>
                      <th className="col-2">Attached Doc</th>
                      <th className="col-2">Review</th>
                      <th className="col-2">Feedback Status</th>
                      <th className="col-2">Feedback Action</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {interviewsData?.map((elem) => {
                      return (
                        <tr>
                          <td className="col-2 px-3">{elem.interviewTitle}</td>
                          <td className="col-2">
                            {moment(elem.interviewDate).format("DD.MM.YYYY")}
                          </td>
                          {elem.recordingLink !== null ? (
                            <td className="col-2 meetingRecordingLink pointer form-link">
                              <a href={elem.recordingLink} target="blank">
                                Link for Meeting
                              </a>
                            </td>
                          ) : (
                            <td className="col-2  pointer">_</td>
                          )}
                          {elem.attachedDoc !== null ? (
                            <td
                              className="col-2 pointer"
                              onClick={() =>
                                window.open(`${elem.attachedDoc}`, "_blank")
                              }
                            >
                              <HiDownload className="downloadIcon" />
                            </td>
                          ) : (
                            <td className="col-2 pointer">_</td>
                          )}
                          <td className="col-2">{elem.review}</td>
                          {elem.overallPerformance === null ? (
                            <>
                              <td className="col-2">
                                <p className=" feedbackstatus-pending">
                                  Pending
                                </p>
                              </td>
                              <td
                                className="col-2"
                                // style={
                                //   menteedetailsofview.reportingTo.split(
                                //     " "
                                //   )[0] !== hrm_id
                                //     ? {
                                //         opacity: "0.5",
                                //         pointerEvents: "none",
                                //         filter: "grayscale(1)",
                                //       }
                                //     : {}
                                // }
                              >
                                <InterviewFeedbackSubmitModal
                                  personId={elem.interviewId}
                                  pathid={elem.emailId}
                                  interviewtype={elem.interviewTitle}
                                />
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="col-2">
                                <p className=" feedbackstatus-submit">
                                  Submitted
                                </p>
                              </td>
                              <td className="col-2 d-flex">
                                <InterviewFeedbackViewModal modalinfo={elem} />
                                {/* {menteedetailsofview.reportingTo.split(
                                  " "
                                )[0] == hrm_id && elem.formEditable == true ? (
                                  <InterviewFeedbackUpdateModal
                                    modalinfo={elem}
                                    personId={elem.interviewId}
                                    pathid={elem.emailId}
                                    interviewtype={elem.interviewTitle}
                                  />
                                ) : null} */}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeNav === 6 && (
          <ReportEvaluation id={userMail?.split("@")[0]} flag={"UserReport"} />
        )}
      </div>
    </>
  );
}

export default UserReportNew;
