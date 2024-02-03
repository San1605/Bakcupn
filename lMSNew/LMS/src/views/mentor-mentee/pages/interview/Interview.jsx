import React, { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../../../component/pagination/Pagination";
import ScheduleInterview from "../../../../component/interview/ScheduleInterview";
import "./interview.css";
import InterviewListFilter from "../../../../component/interview/InterviewListFilter";
import ConversionPagination from "../../../../component/pagination/ConversionPagination";
import { Bars } from "react-loader-spinner";
import { GlobalContext } from "../../../../context/GlobalState";
import moment from "moment";
import RealInterviewFeedbackSubmitModal from "../../../../component/interviewfeedback/RealInterviewFeedbackSubmitModal";
import RealInterviewFeedbackViewModal from "../../../../component/interviewfeedback/RealInterviewFeedbackViewModal";
import noData from "../../../../assets/noData.png";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
import profileimg90 from "../../../../assets/images/profileimg90.png";
import downloadArrow from "../../../../assets/svg/downloadArrow.svg";
import { exportToExcel } from "react-json-to-excel";

function Interview() {
  const {
    navigate,
    loading,
    navroutes,
    interviewlist,
    interviewlistdata,
    dispatch,
    departmentlist,
    departmentlistdata,
    download_report_for_interview_scheduling,
    downintersched,
  } = useContext(GlobalContext);
  const [interviewTypelist, setInterviewTypelist] = useState([]);
  const [searchstr, setSearchstr] = useState("");
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [conversionRangeToYear, setConversionRangeToYear] = useState("");
  const [conversionRangeToMonth, setConversionRangeToMonth] = useState("");
  const [conversionRangeFromYear, setConversionRangeFromYear] = useState("");
  const [conversionRangeFromMonth, setConversionRangeFromMonth] = useState("");
  const [buddyDepartment, setBuddyDepartment] = useState([]);
  const [conversionRangeSelect, setConversionRangeSelect] = useState("");
  const [intervieename, setIntervieename] = useState("");
  const [toDates, setToDates] = useState("");
  const [fromDates, setFromDates] = useState("");
  //pagination code
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  useEffect(() => {
    setPageCount(Math.ceil(interviewlist?.pages?.Total_Pages));
  }, [interviewlist]);
  const onChangeEventhandler = (data) => {
    setCurrentPage(data.selected + 1);
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    departmentlist();
  }, []);
  useEffect(() => {
    if (navroutes?.includes("/interview")) {
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "50",
      });
    } else {
      navigate("/");
    }
  }, [navroutes]);
  useEffect(() => {
    if (downintersched.length > 0) {
      exportToExcel(downintersched, "Filtered_Report");
      dispatch({
        type: "REPORTDATA_INTERVIEW_SCHEDULING",
        payload: [],
      });
    }
  }, [downintersched]);
  const downloadexcel = () => {
    download_report_for_interview_scheduling(
      buddyDepartment.length > 0
        ? buddyDepartment.toString()
        : departmentlistdata.map((val) => val.Department).toString(),

      intervieename,

      interviewTypelist.length > 0
        ? interviewTypelist.toString()
        : "Mock,Trainee,FTE",

      fromDates,

      toDates,

      interviewStatus.length > 0
        ? interviewStatus.toString()
        : "Completed,Scheduled"
    );
  };
  useEffect(() => {
    if (departmentlistdata.length > 0) {
      interviewlistdata({
        pageNumber: currentPage,
        from: fromDates,
        to: toDates,
        name: intervieename,
        interviewType:
          interviewTypelist.length > 0
            ? interviewTypelist.toString()
            : "Mock,Trainee,FTE",
        interviewStatus:
          interviewStatus.length > 0
            ? interviewStatus.toString()
            : "Completed,Scheduled",
        department:
          buddyDepartment.length > 0
            ? buddyDepartment.toString()
            : departmentlistdata.map((val) => val.Department).toString(),
      });
    }
  }, [currentPage, intervieename, buddyDepartment, departmentlistdata]);
  useEffect(() => {
    if (searchstr === "") {
      setIntervieename("");
      setCurrentPage(1);
    }
  }, [searchstr]);
  const searchhrbuddy = () => {
    setIntervieename(searchstr);
    setCurrentPage(1);
  };
  return (
    <div className="hrbuddyContainer">
      <div className=" d-flex align-items-center justify-content-between hrbuddy-head-row">
        <div className="d-flex align-items-center">
          <p className="hrbuddyHead pt-1 ms-3" style={{ fontSize: "18px" }}>
            Interview History
          </p>
        </div>
        <div className="hrbuddy-modal-row">
          {interviewlist?.pages?.showScheduleInterviewButton == 1 && (
            <ScheduleInterview currentPage={currentPage} />
          )}
        </div>
      </div>
      <div className="hrbuddyListContainer bg-white">
        {/* <div
          className="hrbuddyPageTitle pt-3 d-flex align-items-center px-4"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Admin List
          <span className="hrbuddyTotalCount ms-2">1</span>
        </div> */}
        {Object.keys(interviewlist).length > 0 &&
          interviewlist?.finalData?.length > 0 && (
            <div className="pb-3 pt-3 px-4 d-flex align-items-center justify-content-between hrbuddy-search-pagination-row">
              <div className="col-6 d-flex align-items-center justify-items-between">
                <div className="col-md-7 col-12 px-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search by Employee Name"
                    className="border-0 sampler-search col-10 resourceListSearch"
                    onChange={(e) => setSearchstr(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchhrbuddy() : null
                    }
                  />
                  <FiSearch
                    className="pointer col-2"
                    onClick={() => searchhrbuddy()}
                  />
                </div>
                <InterviewListFilter
                  className="col-1"
                  interviewTypelist={interviewTypelist}
                  setInterviewTypelist={setInterviewTypelist}
                  interviewStatus={interviewStatus}
                  setInterviewStatus={setInterviewStatus}
                  buddyDepartment={buddyDepartment}
                  setBuddyDepartment={setBuddyDepartment}
                  conversionRangeFromMonth={conversionRangeFromMonth}
                  conversionRangeFromYear={conversionRangeFromYear}
                  conversionRangeToMonth={conversionRangeToMonth}
                  conversionRangeToYear={conversionRangeToYear}
                  conversionRangeSelect={conversionRangeSelect}
                  setCurrentPage={setCurrentPage}
                  setFromDates={setFromDates}
                  setToDates={setToDates}
                  onChangeEventhandler={onChangeEventhandler}
                  setConversionRangeFromMonth={setConversionRangeFromMonth}
                  setConversionRangeFromYear={setConversionRangeFromYear}
                  setConversionRangeToMonth={setConversionRangeToMonth}
                  setConversionRangeToYear={setConversionRangeToYear}
                  setConversionRangeSelect={setConversionRangeSelect}
                />
              </div>
              <div className="col-md-3 col-12 d-flex justify-content-end hrbuddy-pagination">
                {pageCount > 1 ? (
                  <ConversionPagination
                    onChangeEventhandler={onChangeEventhandler}
                    total={pageCount}
                    currentPage={currentPage}
                  />
                ) : null}
              </div>
              <div
                className="downloadReportBtn pointer"
                onClick={() => downloadexcel()}
              >
                Download All Reports
                <img
                  src={downloadArrow}
                  alt="downloadArrow"
                  className="downloadIcon"
                />
              </div>
            </div>
          )}
        <div
          className="fixed-table-container"
          style={{
            overflow: "hidden",
            height: "calc(100vh - 230px)",
          }}
        >
          {loading ? (
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
          ) : Object.keys(interviewlist).length > 0 ? (
            interviewlist?.finalData.length > 0 ? (
              <>
                <div
                  class="tableFixHead"
                  style={{
                    maxHeight: "calc(100vh - 230px)",
                    height: "calc(100vh - 230px)",
                  }}
                >
                  <table class="table table-bordered fix-table">
                    <thead className="fix-thead">
                      <tr className="fix-thead-tr">
                        <th className="fix-th first-table-col">HRM ID</th>
                        <th className="fix-th">Interviewee</th>
                        <th className="fix-th">Interviewee Department</th>
                        <th className="fix-th ">Interview Type</th>
                        <th className="fix-th nowrap">Interview Title</th>
                        <th className="fix-th nowrap">Attendees</th>
                        <th className="fix-th nowrap">Scheduler</th>
                        <th className="fix-th nowrap">Interview Status</th>
                        <th className="fix-th nowrap">Final Verdict</th>
                        <th className="fix-th nowrap">Date</th>
                        <th className="fix-th nowrap">Attached Doc</th>
                        <th className="fix-th nowrap">Feedback form</th>
                      </tr>
                    </thead>
                    <tbody className="fix-tbody">
                      {interviewlist.finalData.map((elem, index) => {
                        return (
                          <tr className="fix-tbody-tr" key={index}>
                            <td className="fix-td first-table-col">
                              {elem.intervieweeHRM}
                            </td>
                            <td className="fix-td ">
                              <div className="employee-details-col">
                                <div className="employee-details-col-img">
                                  <ImageWithFallback
                                    src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                      elem.intervieweeMail.split("@")[0]
                                    }.jpg`}
                                    fallbackSrc="small"
                                  />
                                </div>
                                <div className="employee-details-col-name">
                                  {elem.intervieweeName}
                                </div>
                              </div>
                            </td>
                            <td className="fix-td">{`${elem.intervieweeDepartment}`}</td>
                            <td className="fix-td">{elem.interviewType}</td>
                            <td className="fix-td">{elem.interviewTitle}</td>
                            <td
                              className="fix-td nowrap"
                              title={
                                elem.attendees.length > 0
                                  ? elem.attendees.map((el, index) => {
                                      return `${el.name}`;
                                    })
                                  : "-"
                              }
                            >
                              <div className="d-flex gap-2">
                                {elem.attendees.length > 0
                                  ? elem.attendees.map((el, index) => {
                                      return (
                                        <div className="employee-details-col">
                                          <div
                                            className="employee-details-col-img"
                                            title={el.name}
                                          >
                                            <ImageWithFallback
                                              src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                                el.emailId.split("@")[0]
                                              }.jpg`}
                                              fallbackSrc="small"
                                            />
                                          </div>
                                          {/* <div className="employee-details-col-name">
                                          {el.name}
                                          {index < elem.attendees.length - 1
                                            ? ","
                                            : ""}
                                        </div> */}
                                        </div>
                                      );
                                    })
                                  : "-"}
                              </div>
                              {/* {elem.attendees.length > 0
                                ? elem.attendees.map((el, index) => {
                                    return `${el.name}${
                                      index < elem.attendees.length - 1
                                        ? ","
                                        : ""
                                    }`;
                                  })
                                : "-"} */}
                            </td>
                            <td className="fix-td nowrap">
                              <div className="employee-details-col">
                                <div className="employee-details-col-img">
                                  <ImageWithFallback
                                    src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                      elem.scheduledBymail.split("@")[0]
                                    }.jpg`}
                                    fallbackSrc="small"
                                  />
                                </div>
                                <div className="employee-details-col-name">
                                  <p>{elem.scheduledByName}</p>
                                </div>
                              </div>
                            </td>
                            <td
                              className={`fix-td nowrap status-${elem.status}`}
                            >
                              {elem.status}
                            </td>
                            <td
                              className="fix-td nowrap"
                              title={
                                elem.finalVerdict ? elem.finalVerdict : "-"
                              }
                            >
                              <p
                                className="department-ellipses"
                                style={{ width: "11rem" }}
                              >
                                {elem.finalVerdict ? elem.finalVerdict : "-"}
                              </p>
                            </td>
                            <td className="fix-td nowrap">
                              {moment(elem.date).format("DD/MM/YYYY")}
                            </td>
                            <td
                              className={` fix-td nowrap ${
                                elem.attachedDoc !== "" && "form-link"
                              }`}
                              onClick={() => {
                                if (elem.attachedDoc !== "") {
                                  window.open(`${elem.attachedDoc}`, "_blank");
                                }
                              }}
                            >
                              {elem.attachedDoc == "" ? "_" : "Link"}
                            </td>
                            <td
                              className="fix-td nowrap form-link"
                              style={
                                elem.viewFeedbackForm == 0 &&
                                elem.feedbackForm == 0
                                  ? {
                                      opacity: "0.5",
                                      pointerEvents: "none",
                                      filter: "grayscale(1)",
                                    }
                                  : {}
                              }
                            >
                              {" "}
                              {elem.feedbackForm == 0 ? (
                                <RealInterviewFeedbackSubmitModal
                                  personId={elem.sInterviewId}
                                  pathid={elem.intervieweeMail}
                                  interviewtype={elem.interviewType}
                                  currentPage={currentPage}
                                />
                              ) : (
                                <RealInterviewFeedbackViewModal
                                  elemId={elem.sInterviewId}
                                  interviewtype={elem.interviewType}
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div
                className={`w-100 h-100 d-flex flex-column align-items-center justify-content-center ${
                  interviewlist?.finalData?.length === 0 && "mt-4 pt-4"
                }`}
                style={{ fontSize: "14px" }}
              >
                <img src={noData} alt="noData" height={120} />
                No Interview Records
              </div>
            )
          ) : (
            <div
              className=" w-100 h-100 d-flex flex-column align-items-center justify-content-center"
              style={{ fontSize: "14px" }}
            >
              <img src={noData} alt="noData" height={120} />
              No Interview Records
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
