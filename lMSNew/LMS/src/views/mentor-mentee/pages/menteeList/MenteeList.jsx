import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import "./menteeList.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { Bars } from "react-loader-spinner";
import AddSecondaryMentorModal from "../../../../component/addsSecMentorModal/AddSecondaryMentorModal";
import downloadArrow from "../../../../assets/svg/downloadArrow.svg";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import { exportToExcel } from "react-json-to-excel";
import MenteeConversionFilter from "./MenteeConversionFilter/MenteeConversionFilter";
import ConversionPagination from "../../../../component/pagination/ConversionPagination";
import CryptoJS from "crypto-js";
import moment from "moment";
import DownloadExcelFilterModal from "../../../admin/components/DownloadExcelFilterModal/DownloadExcelFilterModal";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
function MenteeList() {
  const [filtersearch, setFiltersearch] = useState([]);
  const [showconversion, setShowconversion] = useState(false);
  const {
    dispatch,
    loading,
    navigate,
    navroutes,
    getallmenteelist,
    menteelistdata,
    downloadreportall,
    downloadreportalldata,
    getallmenteelistforeach,
    mentorinfomail,
    departmentsForMentee,
    menteeDepartmentList,
    menteedepConversionList,
    menteeConversionList,
    menteeconprev,
    secondaryseen,
    mentoractivestate,
    mentorlistsearchvar,
    listoffreementee,
    getallfullmenteelist,
    hiearchydata,
    activehierarchy,
  } = useContext(GlobalContext);
  const [searchstr, setSearchstr] = useState(mentorlistsearchvar);
  const [reporteeView, setReporteeView] = useState(activehierarchy);
  const [showDownloadModalForMenteeList, setShowDownloadModalForMenteeList] =
    useState(false);
  const handleButtonClickreportees = (buttonNumber) => {
    dispatch({
      type: "ACTIVE_HIERARCHY",
      payload: buttonNumber,
    });
    setReporteeView(buttonNumber);
  };
  useEffect(() => {
    if (reporteeView == 1) {
      dispatch({
        type: "ALL_MENTEE_LIST",
        payload: hiearchydata.alist,
      });
    } else {
      dispatch({
        type: "ALL_MENTEE_LIST",
        payload: hiearchydata.blist,
      });
    }
  }, [reporteeView, hiearchydata]);
  useEffect(() => {
    if (navroutes?.includes("/menteelist")) {
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "20",
      });
      getallmenteelist();
      downloadreportall();
      getallfullmenteelist();
      menteeDepartmentList();
      document.title = `Mentee List | ${process.env.REACT_APP_APP_NAME}`;
    } else {
      navigate("/");
    }
  }, [navroutes, listoffreementee]);
  const searchit = () => {
    if (searchstr === "") {
      setFiltersearch(menteelistdata);
    } else {
      if (menteelistdata.length > 0) {
        const searchSImplerFiles = menteelistdata.filter(
          (data) =>
            data.FirstName.toLowerCase().indexOf(searchstr.toLowerCase()) > -1
        );
        setFiltersearch(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    if (menteelistdata?.length !== 0) {
      searchit();
    }
  }, [searchstr, menteelistdata]);
  useEffect(() => {
    setShowconversion(secondaryseen);
  }, [secondaryseen]);
  //muskan chopra menteelist conversion status
  const [activeButton, setActiveButton] = useState(mentoractivestate);
  const handleButtonClick = (buttonNumber) => {
    dispatch({
      type: "MENTOR_ACTIVE_PAGE",
      payload: buttonNumber,
    });
    setActiveButton(buttonNumber);
  };
  const [buddyDepartment, setBuddyDepartment] = useState(
    menteeconprev.buddyDepartment
  );
  const [conversionType, setConversionType] = useState(
    menteeconprev.conversionType
  );
  const [conversionRangeToYear, setConversionRangeToYear] = useState("");
  const [conversionRangeToMonth, setConversionRangeToMonth] = useState("");
  const [conversionRangeFromYear, setConversionRangeFromYear] = useState("");
  const [conversionRangeFromMonth, setConversionRangeFromMonth] = useState("");
  const [conversionRangeSelect, setConversionRangeSelect] = useState(
    menteeconprev.conversionRangeSelect
  );
  const [hrBuddyName, setHrBuddyName] = useState(menteeconprev.hrBuddyName);
  const [toDates, setToDates] = useState(menteeconprev.toDates);
  const [fromDates, setFromDates] = useState(menteeconprev.fromDates);
  const [searchstrcs, setSearchstrcs] = useState(menteeconprev.hrBuddyName);
  //pagination code
  const [pageCount, setPageCount] = useState(0);
  const [coursePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(menteeconprev.currentPage);
  useEffect(() => {
    setPageCount(Math.ceil(menteeConversionList?.pages?.Total_Pages));
  }, [menteeConversionList]);
  const onChangeEventhandler = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    if (activeButton === 2) {
      if (
        Array.isArray(menteeConversionList) ||
        currentPage !== menteeconprev.currentPage ||
        hrBuddyName !== menteeconprev.hrBuddyName
      ) {
        dispatch({
          type: "MENTEE_CON_PREV",
          payload: {
            currentPage: currentPage,
            buddyDepartment: buddyDepartment,
            hrBuddyName: hrBuddyName,
            conversionType: conversionType,
            fromDates: fromDates,
            toDates: toDates,
            conversionRangeSelect: conversionRangeSelect,
          },
        });
        if (buddyDepartment.length <= 0) {
          menteedepConversionList(
            currentPage,
            departmentsForMentee.toString(),
            capitalizeFirst(hrBuddyName),
            conversionType,
            fromDates,
            toDates
          );
        } else {
          menteedepConversionList(
            currentPage,
            buddyDepartment.toString(),
            capitalizeFirst(hrBuddyName),
            conversionType,
            fromDates,
            toDates
          );
        }
      }
    }
  }, [currentPage, hrBuddyName, departmentsForMentee, activeButton]);
  useEffect(() => {
    if (searchstrcs === "") {
      setHrBuddyName("");
      if (menteeconprev.hrBuddyName !== "") {
        setCurrentPage(1);
      }
    }
  }, [searchstrcs]);
  const searchhrbuddy = () => {
    setHrBuddyName(searchstrcs);
    setCurrentPage(1);
  };

  const [indexofselect, setIndexofselect] = useState({});
  const changeProjectItem = (indexVal, HRMID) => {
    setIndexofselect({ ...indexofselect, [HRMID]: indexVal });
  };
  return menteelistdata.length !== 0 ? (
    <div className="menteeListPage">
      <div className="row menteelistcard pt-1 pb-3 px-3">
        {activeButton === 1 && (
          <div className="radio-options-div pt-2">
            <div
              className="d-flex align-items-center"
              style={{ width: "8.5rem" }}
            >
              <input
                type="radio"
                id="direct"
                name="direct"
                value="direct"
                checked={reporteeView === 1}
                onChange={() => handleButtonClickreportees(1)}
                className="inputRadio pt-2"
              />
              <label htmlFor="Level-1" style={{ whiteSpace: "nowrap" }}>
                Direct Reportees
              </label>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ width: "8.5rem" }}
            >
              <input
                type="radio"
                id="all"
                name="all"
                value="all"
                checked={reporteeView === 2}
                onChange={() => handleButtonClickreportees(2)}
                className="inputRadio pt-2"
              />
              <label htmlFor="Level-2 nowrap nowrap">All Reportees</label>
            </div>
          </div>
        )}
        <div className="buddiesBtnContainer pt-2 rowGap-10">
          <div className="d-flex w-100 justify-content-start align-items-center flex-wrap border-bottom columnGap-10 rowGap-10">
            {/* {reporteeView === 1 ? ( */}
            <button
              type="button"
              className={`${
                activeButton === 1
                  ? "buddies-tag-primary"
                  : "buddies-tag-secondary"
              } d-flex align-items-center text-white columnGap-10 py-2 pe-2 nowrap locationName`}
              onClick={() => handleButtonClick(1)}
            >
              Mentee List
            </button>
            {/* ) : (
              reporteeView === 2 && (
                <button
                  type="button"
                  className={`${
                    activeButton === 1
                      ? "buddies-tag-primary"
                      : "buddies-tag-secondary"
                  } d-flex align-items-center text-white columnGap-10 py-2 pe-2 nowrap locationName`}
                  onClick={() => handleButtonClick(3)}
                >
                  All Reportees
                </button>
              )
            )} */}
            {showconversion && (
              <button
                type="button"
                className={`${
                  activeButton === 2
                    ? "buddies-tag-primary"
                    : "buddies-tag-secondary"
                } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
                onClick={() => handleButtonClick(2)}
              >
                Mentee Conversion Status
              </button>
            )}
          </div>
        </div>
        {activeButton === 1 ? (
          <>
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
            <div className="w-100 d-flex align-items-center justify-content-between menteePageTitleRow">
              <div className="menteePageTitle" style={{ fontSize: "16px" }}>
                {mentorinfomail !== "" ? (
                  <span
                    className="d-flex align-items-center"
                    onClick={() => getallmenteelistforeach(mentorinfomail)}
                  >
                    <img
                      src={arrow}
                      alt="leftArrowIcon"
                      style={{ height: "16px" }}
                      className="pointer"
                    />
                  </span>
                ) : null}
                {reporteeView == 1 ? "Direct Mentees" : "Total Mentees"}
                <span className="menteesTotalCount">
                  {menteelistdata.length}
                </span>
              </div>
              <div
                className="downloadReportBtn pointer"
                onClick={() => {
                  setShowDownloadModalForMenteeList(true);
                }}
              >
                Download Details
                <img
                  src={downloadArrow}
                  alt="downloadArrow"
                  className="downloadIcon"
                />
              </div>
              <DownloadExcelFilterModal
                show={showDownloadModalForMenteeList}
                onHide={() => setShowDownloadModalForMenteeList(false)}
                modalKey="menteeList"
                reporteeView={reporteeView}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center py-1">
              <div className="col-lg-3 col-md-6 col-12 px-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
                <input
                  type="search"
                  placeholder="Search by Employee Name"
                  className="border-0 sampler-search col-10"
                  style={{ height: "1.8rem", fontSize: "14px" }}
                  value={searchstr}
                  onChange={(e) => setSearchstr(e.target.value)}
                  onKeyDown={(event) =>
                    event.key === "Enter" ? searchit() : null
                  }
                />
                <FiSearch
                  className="pointer col-2"
                  onClick={() => searchit()}
                />
              </div>
              {showconversion && reporteeView == 1 && (
                <AddSecondaryMentorModal />
              )}
            </div>
            <div
              className="fixed-table-container"
              style={{ overflow: "hidden", height: "calc(100vh - 295px)" }}
            >
              <div
                class="tableFixHead"
                style={{
                  maxHeight: "calc(100vh - 295px)",
                  height: "calc(100vh - 295px)",
                }}
              >
                <table class="table table-bordered fix-table">
                  <thead className="fix-thead">
                    <tr className="fix-thead-tr">
                      <th className="fix-th first-table-col">HRM ID</th>
                      <th className="fix-th">Employee Name</th>
                      <th className="fix-th">Department</th>
                      <th className="fix-th nowrap">Employment Type</th>
                      <th className="fix-th nowrap">Secondary Mentor</th>
                      <th className="fix-th nowrap">Date of Joining</th>
                      {/* <th className="fix-th nowrap">Current Courses</th> */}
                      <th className="fix-th nowrap">Project</th>
                      <th className="fix-th nowrap">Project Status</th>
                      <th className="fix-th nowrap">Billability</th>
                      <th className="fix-th nowrap">Utilization %</th>
                      <th className="fix-th nowrap">Project Start date</th>
                      <th className="fix-th nowrap">Project End date</th>
                      <th className="fix-th nowrap">Work Mode</th>
                      <th className="fix-th nowrap">Work Location</th>
                      <th className="fix-th nowrap">Reports</th>
                      <th className="fix-th nowrap">Conversion Details</th>
                      {reporteeView == 1 && (
                        <th className="fix-th nowrap">Resources</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="fix-tbody">
                    {filtersearch.map((menteelist, index) => {
                      let billable =
                        menteelist.Project_Name.length > 0
                          ? menteelist.engagementTypeName[
                              indexofselect[menteelist.EmployeeID]
                                ? indexofselect[menteelist.EmployeeID]
                                : 0
                            ]
                          : 0;
                      let utilize =
                        menteelist.Project_Name.length > 0
                          ? menteelist.resource_utilization[
                              indexofselect[menteelist.EmployeeID]
                                ? indexofselect[menteelist.EmployeeID]
                                : 0
                            ]
                          : 0;
                      let startdate =
                        menteelist.Project_Name.length > 0
                          ? menteelist.Engagement_Start_Date[
                              indexofselect[menteelist.EmployeeID]
                                ? indexofselect[menteelist.EmployeeID]
                                : 0
                            ]
                          : "_";
                      let enddate =
                        menteelist.Project_Name.length > 0
                          ? menteelist.Engagement_End_Date[
                              indexofselect[menteelist.EmployeeID]
                                ? indexofselect[menteelist.EmployeeID]
                                : 0
                            ]
                          : "_";
                      let viewtype =
                        menteelist.Project_Name.length > 0
                          ? menteelist.projectviewtype[
                              indexofselect[menteelist.EmployeeID]
                                ? indexofselect[menteelist.EmployeeID]
                                : 0
                            ]
                          : "_";
                      return (
                        <tr className="fix-tbody-tr" key={index}>
                          <td className="fix-td first-table-col">
                            {menteelist.EmployeeID}
                          </td>
                          <td className="fix-td">
                            <div className="employee-details-col">
                              <div className="employee-details-col-img">
                                <ImageWithFallback
                                  src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                    menteelist.EmailID.split("@")[0]
                                  }.jpg`}
                                  fallbackSrc="small"
                                />
                              </div>
                              <div className="employee-details-col-name">
                                <p>{`${menteelist.FirstName} ${menteelist.LastName}`}</p>
                              </div>
                            </div>
                          </td>
                          <td className="fix-td">{menteelist.Department}</td>
                          <td className="fix-td nowrap">
                            {menteelist.Employee_type}
                          </td>
                          <td className="fix-td nowrap">
                            {" "}
                            {menteelist.Second_Reporting_To == null ? (
                              <p className="w-100">-</p>
                            ) : (
                              <div className="employee-details-col">
                                <div className="employee-details-col-img">
                                  <ImageWithFallback
                                    src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                      menteelist.secMentorEmail.split("@")[0]
                                    }.jpg`}
                                    fallbackSrc="small"
                                  />
                                </div>
                                <div className="employee-details-col-name">
                                  <p>{menteelist.Second_Reporting_To}</p>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="fix-td nowrap">
                            {menteelist.Dateofjoining}
                          </td>
                          {/* <td className="fix-td nowrap">
                            {menteelist.courseList.length !== 0 ? (
                              <select
                                name="current courses"
                                className="current-courses-dropdown outline-hide pointer"
                                id="current-courses-dropdown"
                                style={{
                                  width: "10rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {menteelist.courseList.length !== 0
                                  ? menteelist.courseList.map((item) => {
                                      return (
                                        <option value={item}>{item}</option>
                                      );
                                    })
                                  : null}
                              </select>
                            ) : (
                              "-"
                            )}
                          </td> */}
                          <td className="fix-td nowrap">
                            {menteelist.Project_Name.length !== 0 ? (
                              <select
                                name="projects"
                                className="projectsListDropdown pointer"
                                onChange={(e) =>
                                  changeProjectItem(
                                    e.target.value,
                                    menteelist.EmployeeID
                                  )
                                }
                                style={{
                                  width: "10rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {menteelist.Project_Name.map((items, index) => {
                                  return <option value={index}>{items}</option>;
                                })}
                              </select>
                            ) : (
                              "_"
                            )}
                          </td>
                          <td
                            className="fix-td nowrap"
                            style={{ textTransform: "capitalize" }}
                          >
                            {viewtype}
                          </td>
                          <td
                            className="fix-td nowrap"
                            style={{ textTransform: "capitalize" }}
                          >
                            {billable == 0 ? "_" : billable}
                          </td>
                          <td className="fix-td nowrap"> {utilize}</td>
                          <td
                            className="fix-td nowrap"
                            style={{ textTransform: "capitalize" }}
                          >
                            {startdate !== "_"
                              ? moment(startdate).format("DD/MM/YYYY")
                              : "_"}
                          </td>
                          <td className="fix-td nowrap">
                            {" "}
                            {enddate !== "_"
                              ? moment(enddate).format("DD/MM/YYYY")
                              : "_"}
                          </td>
                          <td
                            className="fix-td nowrap"
                            style={{ textTransform: "capitalize" }}
                          >
                            {menteelist.workMode == null
                              ? "_"
                              : menteelist.workMode}
                          </td>
                          <td
                            className="fix-td nowrap"
                            style={{ textTransform: "capitalize" }}
                          >
                            {menteelist.workLocation == null
                              ? "_"
                              : menteelist.workLocation}
                          </td>
                          <td className="fix-td nowrap">
                            <u
                              className="pointer pointer-report text-dark"
                              onClick={() => {
                                dispatch({
                                  type: "MENTOR_SEARCHED_NAME",
                                  payload: searchstr,
                                });
                                navigate(
                                  `/reports/${menteelist.EmailID.split("@")[0]}`
                                );
                              }}
                            >
                              view
                            </u>
                          </td>
                          <td className="fix-td nowrap">
                            <u
                              className="pointer pointer-report text-dark"
                              onClick={() => {
                                dispatch({
                                  type: "MENTOR_SEARCHED_NAME",
                                  payload: searchstr,
                                });
                                const secretKey = process.env.REACT_APP_APP_KEY;
                                const iv = CryptoJS.lib.WordArray.random(16);
                                const encrypted = CryptoJS.AES.encrypt(
                                  menteelist.EmailID.split("@")[0],
                                  secretKey,
                                  { iv }
                                );
                                let encstring = (
                                  iv.toString() + encrypted.toString()
                                ).replace(/\//g, "hedge");
                                navigate(`/conversion/${encstring}`);
                              }}
                            >
                              view
                            </u>
                          </td>
                          {reporteeView == 1 && (
                            <td className="fix-td nowrap">
                              {menteelist.viewReportee == 1 ? (
                                <u
                                  className="pointer pointer-report text-dark"
                                  onClick={() =>
                                    getallmenteelistforeach(menteelist.EmailID)
                                  }
                                >
                                  view
                                </u>
                              ) : null}
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
        ) : null}
        {activeButton === 2 ? (
          <div>
            {loading && (
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
            )}
            <div className="w-100 d-flex align-items-center justify-content-between menteePageTitleRow">
              <div className="menteePageTitle" style={{ fontSize: "18px" }}>
                Total Mentees
                <span className="menteesTotalCount">
                  {menteeConversionList?.pages?.Total_Records}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center py-1 buddies-search-download-row">
              <div className="col-6 d-flex align-items-center justify-items-between">
                <div className="col-md-7 col-12 px-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search by Employee Name"
                    className="border-0 sampler-search col-10"
                    style={{ height: "1.8rem", fontSize: "14px" }}
                    value={searchstrcs}
                    onChange={(e) => setSearchstrcs(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchhrbuddy() : null
                    }
                  />
                  <FiSearch
                    className="pointer col-2"
                    onClick={() => searchhrbuddy()}
                  />
                </div>
                {/* <AddSecondaryMentorModal /> */}
                <MenteeConversionFilter
                  className="col-1"
                  conversionType={conversionType}
                  setConversionType={setConversionType}
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
                  setConversionRangeFromMonth={setConversionRangeFromMonth}
                  setConversionRangeFromYear={setConversionRangeFromYear}
                  setConversionRangeToMonth={setConversionRangeToMonth}
                  setConversionRangeToYear={setConversionRangeToYear}
                  setConversionRangeSelect={setConversionRangeSelect}
                />
              </div>
              {pageCount > 1 ? (
                <ConversionPagination
                  onChangeEventhandler={onChangeEventhandler}
                  total={pageCount}
                  currentPage={currentPage}
                />
              ) : null}
            </div>
            <div
              className="menteelist-container"
              style={{ height: "calc(100vh - 275px)" }}
            >
              <div className="row col-12 menteelist">
                <table className="table">
                  <thead className="thead">
                    <tr className="trow w-100">
                      <th className="th" scope="col">
                        HRM ID
                      </th>
                      <th className="th" scope="col">
                        Employee Name
                      </th>
                      <th className="th" scope="col">
                        Department
                      </th>
                      <th className="th" scope="col">
                        Employee Type
                      </th>
                      <th className="th" scope="col">
                        Date of Joining
                      </th>
                      <th className="th" scope="col">
                        Conversion Month
                      </th>
                      <th className="th" scope="col">
                        Potential Trainee Conversion
                      </th>
                      <th className="th" scope="col">
                        Potential FT Conversion
                      </th>
                      <th className="th" scope="col">
                        Conversion Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-scroll">
                    {!!menteeConversionList.finalData ? (
                      menteeConversionList.finalData.map((elem, index) => {
                        return (
                          <tr className="trow" key={index}>
                            <td className="td nowrap first-table-col">
                              {elem.employeeId}
                            </td>
                            <td className="td nowrap">
                              <div className="employee-details-col">
                                <div className="employee-details-col-img">
                                  <ImageWithFallback
                                    src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                      elem.emailId.split("@")[0]
                                    }.jpg`}
                                    fallbackSrc="small"
                                  />
                                </div>
                                <div className="employee-details-col-name">
                                  <p>{elem.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="td nowrap">{elem.department}</td>
                            <td className="td nowrap">{elem.employee_type}</td>
                            <td className="td nowrap">{elem.dateOfJoining}</td>
                            <td className="td nowrap">
                              {elem.conversionMonth
                                ? elem.conversionMonth
                                : "-"}
                            </td>
                            <td>
                              {elem.Potential_Trainee_Conversion_Month
                                ? elem.Potential_Trainee_Conversion_Month
                                : "-"}
                            </td>
                            <td>
                              {elem.Potential_FTE_Conversion_Month
                                ? elem.Potential_FTE_Conversion_Month
                                : "-"}
                            </td>
                            <td className="td nowrap">
                              <u
                                className="pointer pointer-report text-dark"
                                onClick={() => {
                                  console.log(process.env.SECRET_KEY, "key");
                                  const secretKey =
                                    process.env.REACT_APP_APP_KEY;
                                  const iv = CryptoJS.lib.WordArray.random(16);
                                  const encrypted = CryptoJS.AES.encrypt(
                                    elem.emailId.split("@")[0],
                                    secretKey,
                                    { iv }
                                  );
                                  let encstring = (
                                    iv.toString() + encrypted.toString()
                                  ).replace(/\//g, "hedge");

                                  navigate(`/conversion/${encstring}`);
                                }}
                              >
                                view
                              </u>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
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
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
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
  );
}

export default MenteeList;
