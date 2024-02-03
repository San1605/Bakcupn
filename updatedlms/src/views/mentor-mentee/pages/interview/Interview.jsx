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
        </div>
        <div style={{ overflow: "hidden", height: "calc(100vh - 250px)" }}>
          <div
            className="row col-12 tableFixHead"
            style={{
              overflowY: "auto",
              maxHeight: "calc(100vh - 250px)",
              minHeight: "fit-content",
              height: "unset",
            }}
          >
            {Object.keys(interviewlist).length > 0 ? (
              <table className="table m-0">
                <thead className="thead">
                  <tr className="trow w-100 conversion-accordian-row">
                    <th className="col-2 ps-4">Interviewee</th>
                    <th className="col-1">Interviewee Department</th>
                    <th className="col-1">Interview Type</th>
                    <th className="col-1">Interview Title</th>
                    <th className="col-2">Attendees</th>
                    <th className="col-2">Scheduler</th>
                    <th className="col-1">Interview Status</th>
                    <th className="col-1">Final Verdict</th>
                    <th className="col-1">Date</th>
                    <th className="col-1">Attached Doc</th>
                    <th className="col-1">Feedback form</th>
                  </tr>
                </thead>
                <tbody className="tbody">
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
                  ) : null}
                  {interviewlist.finalData.map((elem) => {
                    return (
                      <tr
                        style={{
                          borderBottom: "1px solid #E2E8F0",
                        }}
                      >
                        <td className="col-2 ps-4">
                          <div className="employee-details-col">
                            <div className="employee-details-col-img">
                              <img
                                src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                  elem.intervieweeMail.split("@")[0]
                                }.jpg`}
                                alt="Employee"
                              />
                            </div>
                            <div className="employee-details-col-name">
                              <p>{elem.intervieweeName}</p>
                              <p>{elem.intervieweeHRM}</p>
                            </div>
                          </div>
                        </td>
                        <td className="col-1 ps-2">{`${elem.intervieweeDepartment}`}</td>
                        <td className="col-1 ps-2">{`${elem.interviewType} Interview`}</td>
                        <td className="col-1 ps-2">{elem.interviewTitle}</td>
                        <td
                          className="col-2 ps-2 nowrap"
                          title={
                            elem.attendees.length > 0
                              ? elem.attendees.map((el, index) => {
                                  return `${el.name}`;
                                })
                              : "-"
                          }
                        >
                          <p
                            className="department-ellipses"
                            style={{ width: "11rem" }}
                          >
                            {elem.attendees.length > 0
                              ? elem.attendees.map((el, index) => {
                                  return `${el.name}${
                                    index < elem.attendees.length - 1 ? "," : ""
                                  }`;
                                })
                              : "-"}
                          </p>
                        </td>
                        <td
                          className={`col-1 ps-2`}
                          title={`${elem.scheduledBymail}`}
                        >
                          <div className="employee-details-col">
                            <div className="employee-details-col-img">
                              <img
                                src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                  elem.scheduledBymail.split("@")[0]
                                }.jpg`}
                                alt="Employee"
                              />
                            </div>
                            <div className="employee-details-col-name">
                              <p>{elem.scheduledByName}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`col-1 ps-2 status-${elem.status}`}>
                          {elem.status}
                        </td>
                        <td
                          className="col-1 ps-2 nowrap"
                          title={elem.finalVerdict ? elem.finalVerdict : "-"}
                        >
                          <p
                            className="department-ellipses"
                            style={{ width: "11rem" }}
                          >
                            {elem.finalVerdict ? elem.finalVerdict : "-"}
                          </p>
                        </td>
                        <td className="col-1 ps-2">
                          {moment(elem.date).format("DD/MM/YYYY")}
                        </td>
                        <td
                          className={` col-1 ps-2 ${
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
                          className="col-1 ps-2 form-link"
                          style={
                            elem.viewFeedbackForm == 0 && elem.feedbackForm == 0
                              ? {
                                  opacity: "0.5",
                                  pointerEvents: "none",
                                  filter: "grayscale(1)",
                                }
                              : {}
                          }
                        >
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
            ) : (
              <div
                style={{
                  maxHeight: "calc(100vh - 250px)",
                  minHeight: "calc(100vh - 250px)",
                }}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <img src={noData} alt="noData" height={120} />
                <p>No Interview Records</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
