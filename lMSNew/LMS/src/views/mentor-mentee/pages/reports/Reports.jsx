import React, { useState } from "react";
import LearningPathCardReports from "../../../../component/learningPathCard/LearningPathCardReports";
import { HiDownload } from "react-icons/hi";
import TicketPending from "../../../../component/tickets/ticketsStatusTiles/TicketPending";
import TicketApproved from "../../../../component/tickets/ticketsStatusTiles/TicketApproved";
import TicketsRejected from "../../../../component/tickets/ticketsStatusTiles/TicketsRejected";
import TicketCardReports from "../../../../component/ticketsCard/TicketCardReports";
// import { ticketschartdata } from "../../../../utils/ticketchartcarddetails/data";
import FeedbackForm from "../../../../component/feedbackCard/FeedbackForm";
// import FeedbackCard from "../../../../component/feedbackCard/FeedbackCard";
import Reportfileupload from "../../../../component/reportfileuploadmodal/Reportfileupload";
import "./reports.css";
import ReportCalandar from "../../../../component/reportCalendarFilter/ReportCalendarFIlter";
// import { MdMailOutline } from "react-icons/md";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import moment from "moment";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import nointerviewimg from "../../../../assets/svg/mentorReport/nointerviewdoc.svg";
import InterviewFeedbackSubmitModal from "../../../../component/feedbackCard/InterviewFeedbackSubmitModal";
import InterviewFeedbackViewModal from "../../../../component/feedbackCard/InterviewFeedbackViewModal";
import coursestatus from "../../../../assets/svg/mentorReport/coursestatus.svg";
// import profileimg from "../../../../assets/images/profileimg.png";
import tippy from "tippy.js";
import { useCallback } from "react";
import InterviewFeedbackUploadModal from "../../../../component/feedbackCard/InterviewFeedbackUploadModal";
import InterviewFeedbackUpdateModal from "../../../../component/feedbackCard/InterviewFeedbackUpdateModal";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";

function Reports() {
  const pathname = useParams();
  const {
    navigate,
    menteedetailsforview,
    menteedetailsofview,
    enrollcoursesreport,
    gettaskdonereport,
    taskdonereport,
    getfeedbackofmentee,
    feedbackfromreport,
    hrm_id,
    projectlistofper,
  } = useContext(GlobalContext);
  const [current, setCurrrent] = useState({
    month: 1,
    year: 2023,
  });
  const rev = useCallback((temp) => {
    setCurrrent(temp);
  });
  useEffect(() => {
    if (pathname) {
      menteedetailsforview(pathname?.id);
      projectlistofper(pathname?.id);
      // gettaskdonereport(pathname.id);
      // getfeedbackofmentee(pathname.id);
    }
    document.title = `Reports | ${process.env.REACT_APP_APP_NAME}`;
  }, []);
  return (
    <>
      {Object.keys(menteedetailsofview).length === 0 ? (
        <div className="page-loader-div">
          <Bars
            height="50"
            width="50"
            color="#4F52B2"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass="page-loader"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="col-md-3 bg-white p-3 d-flex flex-column reports-col-md-3 h-100 overflow-y-scroll reports-left">
            <div className="px-3 d-flex flex-column menteeProfileContainer">
              <div className="menteeProfileDetailsContainer">
                <div className="menteeProfileimg rounded-circle">
                  <ImageWithFallback
                    src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                      pathname.id.split("@")[0]
                    }.jpg`}
                    fallbackSrc="big"
                    classes="profilephoto"
                  />
                </div>
                <div className="menteeProfileDetails">
                  <p className="menteeName" style={{ fontSize: "18px" }}>
                    {menteedetailsofview?.name}
                  </p>
                  <p className="menteeDesignation" style={{ fontSize: "14px" }}>
                    {menteedetailsofview?.emailId}
                  </p>
                </div>
              </div>
              <div className="py-2 d-flex flex-column otherMenteeDetailContainer">
                <div className="d-flex otherMenteeDetail">
                  <p>Designation: </p>
                  <span title={menteedetailsofview?.Designation}>
                    {menteedetailsofview.Designation}
                  </span>
                </div>
                <div className="d-flex otherMenteeDetail">
                  <p>HRM:</p>
                  <span> {menteedetailsofview?.HRMID.split("M")[1]}</span>
                </div>
                <div className="d-flex otherMenteeDetail">
                  <p>Date of Joining: </p>
                  <span>{menteedetailsofview?.doj}</span>
                </div>

                <div className="d-flex otherMenteeDetail">
                  <p>Contact No. </p>
                  <span>{menteedetailsofview?.Mobile}</span>
                </div>
                <div className="d-flex otherMenteeDetail">
                  <p>College: </p>
                  <span title={menteedetailsofview?.collegeName}>
                    {menteedetailsofview?.collegeName}
                  </span>
                </div>
                <div className="d-flex otherMenteeDetail">
                  <p>Year of Graduation: </p>
                  <span>{menteedetailsofview?.yearOfPassing}</span>
                </div>
                <div className="d-flex otherMenteeDetail">
                  <p>Reporting Manager: </p>
                  <span title={menteedetailsofview?.reportingTo}>
                    {menteedetailsofview?.reportingTo}
                  </span>
                </div>
                <div className="d-flex otherMenteeDetail">
                  <p>Employement Type: </p>
                  <span title={menteedetailsofview?.Designation}>
                    {menteedetailsofview?.Designation}
                  </span>
                </div>
                <div className="d-flex otherMenteeDetail">
                  <p>Department: </p>
                  <span title={menteedetailsofview?.Department}>
                    {menteedetailsofview?.Department}
                  </span>
                </div>
                {menteedetailsofview.viewEvaluationReports && (
                  <div className="d-flex otherMenteeDetail">
                    <p>Evaluation: </p>
                    <span
                      className="pointer pointer-report text-dark"
                      onClick={() =>
                        navigate(
                          `/evaluationreports/userevaluationreport/${
                            menteedetailsofview?.emailId.split("@")[0]
                          }`
                        )
                      }
                    >
                      view
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white border">
              {/* <div className="d-flex justify-content-between p-2">
            <p className="px-1 learningPathCardHeading">Learning Path</p>
            <select
              name="courseselect"
              id="select-course"
              className="learning-path-course-select"
            >
              <option className="learning-path-course-option">LP_NODEJS</option>
              <option className="learning-path-course-option">
                LP_REACTJS
              </option>
              <option className="learning-path-course-option">LP_UI/UX</option>
              <option className="learning-path-course-option">LP_.NET</option>
            </select>
          </div> */}
              <LearningPathCardReports heightp={2} />
            </div>
            {/* <div className=" bg-white reportTicketCardContainer">
              <div className="col-12  ticketsHeight bg-white ">
                <div className="border rounded p-2">
                  <div className="d-flex justify-content-between px-1 py-1">
                    <p
                      className="col-9 "
                      style={{
                        fontWeight: "500",
                        fontSize: "20px",
                      }}
                    >
                      Tickets
                    </p>
                  </div>
                  <div>
                    <TicketCardReports />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-md-9 reports-col-md-9 d-flex flex-column py-2">
            {/* <div className="d-flex align-items-center allcourseheading">
              <p
                style={{ color: "#4F52B2" }}
                className="pointer"
                onClick={() => navigate("/menteelist")}
              >
                Mentee List
              </p>
              <p>&#x3e;</p>
              <p>Reports</p>
            </div> */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center"
                  onClick={() => window.history.back()}
                >
                  <img
                    src={arrow}
                    alt="leftArrowIcon"
                    style={{ height: "16px" }}
                    className="pointer"
                  />
                </div>
                <p className="reportHead ms-2" style={{ fontSize: "18px" }}>
                  Report
                </p>
              </div>
              {/* <div className="d-flex report-head-row-btns">
                <button className="downloadReportBtn uni-border d-flex align-items-center">
                  Download Report
                  <span>
                    <HiDownload className="downloadIcon" />
                  </span>
                </button>
                <button className="downloadReportBtn uni-border d-flex align-items-center">
              Send via Mail
              <span>
               // <MdMailOutline className="downloadIcon" />
              </span>
            </button>
              </div> */}
            </div>
            <div className="calenderFilter uni-border row px-2 mt-2 bg-white">
              <ReportCalandar current={current} rev={rev} />
            </div>
            <div className="reportsCardContainer uni-border mt-2 m d-flex flex-column bg-white">
              <div className="reportsCardContainerHead">
                <p className="px-2" style={{ fontSize: "16px" }}>
                  Enrolled Course Status
                </p>
              </div>
              <div
                className="reportsPageTableContainer tableFixHead overflow-y-scroll"
                style={{ height: "140px" }}
              >
                {enrollcoursesreport?.length !== 0 ? (
                  <table className="table">
                    <thead>
                      <tr className="report-title-page-table-row">
                        <th className="col-2  ps-3">Course Name</th>
                        <th className="col-2 ">Complexity</th>
                        <th className="col-2  ">Duration(days)</th>
                        <th className="col-2  ">Start Date</th>
                        <th className="col-2  ">Expected End Date</th>
                        <th className="col-1  ">Status</th>
                        {/* <th className="col-1  ">Rank</th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {enrollcoursesreport?.map((elem) => {
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
                            <td className="col-1  ">
                              {/* {elem.completionStatus === 2 ? (
                                  <TicketsRejected />
                                ) : elem.completionStatus === 1 ? (
                                  <TicketApproved />
                                ) : (
                                  <TicketPending />
                                )} */}
                              {elem.completionStatus}%
                            </td>
                            {/* <td className="col-1  ">
                                {elem.rank}
                              </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-100 w-100 d-flex align-items-center justify-content-center ">
                    <img
                      src={coursestatus}
                      alt="coursestatus"
                      className="pb-3"
                      style={{ height: "75%" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="reportsCardContainer m d-flex flex-column mb-1 bg-white mt-2">
              <div className="interview-documentation-ContainerHead  d-flex">
                <p
                  className="px-2 d-flex align-items-center"
                  style={{ fontSize: "16px" }}
                >
                  Interview Documentation
                </p>
                <Reportfileupload
                  current={current}
                  flag={
                    menteedetailsofview?.reportingTo.split(" ")[0] !== hrm_id
                  }
                />
                <InterviewFeedbackUploadModal />
              </div>
              <div
                className="tableFixHead reportsPageTableContainer pb-1 overflow-y-scroll"
                style={{ height: "30vh" }}
              >
                {taskdonereport?.length !== 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="col-2 px-3">Interview</th>
                        <th className="col-2">Date</th>
                        <th className="col-2">Interview Recording</th>
                        <th className="col-2">Attached Doc</th>
                        <th className="col-2">Review</th>
                        <th className="col-2">Feedback Status</th>
                        <th className="col-2">Feedback Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskdonereport?.map((elem) => {
                        return (
                          <tr>
                            <td className="col-2 px-3">
                              {elem.interviewTitle}
                            </td>
                            <td className="col-2">
                              {moment(elem.interviewDate).format("DD.MM.YYYY")}
                            </td>
                            {elem.recordingLink !== null ? (
                              <td
                                className="col-2 meetingRecordingLink pointer"
                                onClick={() =>
                                  window.open(`${elem.recordingLink}`, "_blank")
                                }
                              >
                                Link for Meeting
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
                                  style={
                                    menteedetailsofview.reportingTo.split(
                                      " "
                                    )[0] !== hrm_id
                                      ? {
                                          opacity: "0.5",
                                          pointerEvents: "none",
                                          filter: "grayscale(1)",
                                        }
                                      : {}
                                  }
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
                                  <InterviewFeedbackViewModal
                                    modalinfo={elem}
                                  />
                                  {menteedetailsofview.reportingTo.split(
                                    " "
                                  )[0] == hrm_id &&
                                  elem.formEditable == true ? (
                                    <InterviewFeedbackUpdateModal
                                      modalinfo={elem}
                                      personId={elem.interviewId}
                                      pathid={elem.emailId}
                                      interviewtype={elem.interviewTitle}
                                    />
                                  ) : null}
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                    <img
                      src={nointerviewimg}
                      alt="nointerviewimg"
                      style={{ height: "55%" }}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* <div className="d-flex justify-content-between feedback-ticket-row">
              <div className="bg-white reportFeedbackContainer p-2">
                <FeedbackForm pathid={pathname.id} />
              </div>
              <div className=" bg-white reportTicketCardContainer">
                <div className="col-12 bg-white ">
                  <div className="border rounded p-2">
                    <div className="d-flex justify-content-between px-1 py-1">
                      <p
                        className="col-9 "
                        style={{
                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                      >
                        Tickets
                      </p>
                    </div>
                    <div>
                      <TicketCardReports />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
}

export default Reports;
