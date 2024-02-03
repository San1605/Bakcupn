import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./deprources.css";
import { GlobalContext } from "../../../../context/GlobalState";
import { Bars, RotatingLines } from "react-loader-spinner";
import downloadArrow from "../../../../assets/svg/downloadArrow.svg";
import { exportToExcel } from "react-json-to-excel";
import CryptoJS from "crypto-js";
import noData from "../../../../assets/noData.png";

//Muskan code : add tabs in buddies section and
import ConversionPagination from "../../../../component/pagination/ConversionPagination";
import ConversionPopUPBuddy from "./depwiseconversionPopUp/ConversionPopUPdpresources";
import AddTeamLeads from "./depResourceModals/AddTeamLeads";
import RemoveTeamLead from "./depResourceModals/RemoveTeamLead";
import InterviewschedulerDephead from "./InterviewschedulerDephead";
import Teamleadscreendep from "./Teamleadscreendep";
import { useRef } from "react";
import debounce from "lodash/debounce";
import FilterComponent from "../../../admin/components/filterComponent/FilterComponent";
import moment from "moment";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
import DownloadExcelFilterModal from "../../../admin/components/DownloadExcelFilterModal/DownloadExcelFilterModal";

let lastScrollTop = 0;

function DepResources() {
  const {
    navigate,
    navroutes,
    loading,
    depheadlist,
    depheadlistdata,
    departmentlistdata,
    depheadConversionList,
    depheadconversionlist,
    dispatch,
    depheadconprev,
    depheadactiveside,
    deplistsearchvar,
    deplistdepartsaved,
    downrepoindephead,
    downreportfordephead,
    depheaddeplist,
    deplongerintegration,
    depheaddatapageno,
    deploading,
  } = useContext(GlobalContext);
  console.log(departmentlistdata,"asasasaas")
  const [indexofselect, setIndexofselect] = useState({});
  const [courseSearchKey, setCourseSearchKey] = useState(deplistsearchvar);
  const [filtersearch, setFiltersearch] = useState([]);
  const [departmentList, setDepartmentList] = useState(deplistdepartsaved);
  const [pageno, setPageno] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [workmodeList, setWorkmodeList] = useState([]);
  const [workLocationList, setWorkLocationList] = useState([]);
  const [engagementList, setEngagementList] = useState([]);
  const [availableList, setAvailableList] = useState([]);
  const [projectstatusList,setProjectstatusList] = useState([]);
  const scrollContainerRef = useRef(null);
  const [showDownloadExcelFilter, setShowDownlaodExcelFilter] = useState(false);

  const debouncedHandleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPageno(pageno + 1);
      depheadlist(
        depheaddatapageno,
        courseSearchKey,
        departmentList.length === 0
          ? departmentlistdata
          : departmentList,
        employeeList.length === 0
          ? ["Intern","Trainee","Permanent"]
          : employeeList,
        workmodeList.toString(),
        workLocationList.toString(),
        engagementList.toString(),
        availableList.toString(),
        projectstatusList.toString(),
      );
    }
  }, 300);
  const handleScroll = () => {
    debouncedHandleScroll();
  };

  useEffect(() => {
    if (navroutes?.includes("/department-resources")) {
      depheaddeplist();
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "22",
      });
    } else {
      navigate("/");
    }
  }, [navroutes]);

  useEffect(() => {
    if (deplistdepartsaved) {
      setDepartmentList(deplistdepartsaved);
    }
  }, [deplistdepartsaved]);

  const searchit = () => {
    setPageno(1);
    depheadlist(
      1,
      courseSearchKey,
      departmentList.length === 0
        ? departmentlistdata
        : departmentList,
      employeeList.length === 0
        ? ["Intern","Trainee","Permanent"]
        : employeeList,
      workmodeList.toString(),
      workLocationList.toString(),
      engagementList.toString(),
      availableList.toString(),
      projectstatusList.toString(),
    );
  };

  useEffect(() => {
    if (departmentlistdata.length > 0 && courseSearchKey == "") {
      searchit();
    }
  }, [
    departmentlistdata,
    courseSearchKey,
    departmentList,
    employeeList,
    workmodeList,
    workLocationList,
    engagementList,
    availableList,
    projectstatusList,
  ]);

  useEffect(() => {
    if (depheadlistdata) {
      console.log(depheadlistdata,"deparr")
      setFiltersearch(depheadlistdata.deparr);
    }
  }, [depheadlistdata]);

  //Muskan code : add tabs in buddies section
  const [activeButton, setActiveButton] = useState(depheadactiveside);
  const [buddyDepartment, setBuddyDepartment] = useState(
    depheadconprev.buddyDepartment
  );
  const [conversionType, setConversionType] = useState(
    depheadconprev.conversionType
  );
  const [conversionRangeToYear, setConversionRangeToYear] = useState("");
  const [conversionRangeToMonth, setConversionRangeToMonth] = useState("");
  const [conversionRangeFromYear, setConversionRangeFromYear] = useState("");
  const [conversionRangeFromMonth, setConversionRangeFromMonth] = useState("");
  const [conversionRangeSelect, setConversionRangeSelect] = useState(
    depheadconprev.conversionRangeSelect
  );
  const [hrBuddyName, setHrBuddyName] = useState(depheadconprev.hrBuddyName);
  const [toDates, setToDates] = useState(depheadconprev.toDates);
  const [fromDates, setFromDates] = useState(depheadconprev.fromDates);
  const [searchstrcs, setSearchstrcs] = useState(depheadconprev.hrBuddyName);
  //pagination code
  const [pageCount, setPageCount] = useState(0);
  const [coursePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(depheadconprev.currentPage);
  useEffect(() => {
    setPageCount(depheadconversionlist?.pages?.Total_Pages);
  }, [depheadconversionlist]);
  const onChangeEventhandler = (data) => {
    console.log(data, "data page");
    setCurrentPage(data.selected + 1);
  };

  const handleButtonClick = (buttonNumber) => {
    dispatch({
      type: "DEPHEAD_ACTIVE_SIDE",
      payload: buttonNumber,
    });
    setActiveButton(buttonNumber);
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    if (activeButton === 2) {
      dispatch({
        type: "DEPLIST_DEP_SAVED",
        payload: departmentList,
      });
    }
  }, [activeButton]);
  useEffect(() => {
    if (activeButton === 2) {
      if (
        Array.isArray(depheadconversionlist) ||
        currentPage !== depheadconprev.currentPage ||
        hrBuddyName !== depheadconprev.hrBuddyName
      ) {
        dispatch({
          type: "DEPHEAD_CON_PREV",
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
          depheadConversionList(
            currentPage,
            departmentlistdata.toString(),
            capitalizeFirst(hrBuddyName),
            conversionType,
            fromDates,
            toDates
          );
        } else {
          depheadConversionList(
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
  }, [currentPage, hrBuddyName, departmentlistdata, activeButton]);
  useEffect(() => {
    if (searchstrcs === "") {
      setHrBuddyName("");
      if (depheadconprev.hrBuddyName !== "") {
        setCurrentPage(1);
      }
    }
  }, [searchstrcs]);
  const searchhrbuddy = () => {
    setHrBuddyName(searchstrcs);
    setCurrentPage(1);
  };

  const changeProjectItem = (indexVal, HRMID) => {
    setIndexofselect({ ...indexofselect, [HRMID]: indexVal });
  };
  // useEffect(() => {
  //   if (downrepoindephead.length > 0) {
  //     exportToExcel(downrepoindephead, "Filtered_Report");
  //     dispatch({
  //       type: "REPORTDATA_DEP_HEAD",
  //       payload: [],
  //     });
  //   }
  // }, [downrepoindephead]);

  const downloadexcel = () => {
    downreportfordephead(
      courseSearchKey,
      departmentList.length > 0
      ? departmentList
      : departmentlistdata,
      employeeList.length === 0
      ? ["Intern","Trainee","Permanent"]
      : employeeList,
      workmodeList.toString(),
      workLocationList.toString(),
      engagementList.toString(),
      availableList.toString(),
      projectstatusList.toString(),

    );
  };

  return (
    <div className="buddielistPage">
      <div className="row buddielistcard pt-1 pb-3 px-3">
        <div className="buddiesBtnContainer py-2 rowGap-10">
          <div className="d-flex w-100 justify-content-start align-items-center flex-wrap border-bottom columnGap-10 rowGap-10">
            <button
              type="button"
              className={`${
                activeButton === 1
                  ? "buddies-tag-primary"
                  : "buddies-tag-secondary"
              } d-flex align-items-center text-white columnGap-10 py-2 pe-2 nowrap locationName`}
              onClick={() => handleButtonClick(1)}
            >
              Department Resources List
            </button>
            <button
              type="button"
              className={`${
                activeButton === 2
                  ? "buddies-tag-primary"
                  : "buddies-tag-secondary"
              } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
              onClick={() => handleButtonClick(2)}
            >
              Resources Conversion Status
            </button>
            <button
              type="button"
              className={`${
                activeButton === 3
                  ? "buddies-tag-primary"
                  : "buddies-tag-secondary"
              } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
              onClick={() => handleButtonClick(3)}
            >
              Team Leads
            </button>
            <button
              type="button"
              className={`${
                activeButton === 4
                  ? "buddies-tag-primary"
                  : "buddies-tag-secondary"
              } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
              onClick={() => handleButtonClick(4)}
            >
              Interview Scheduler
            </button>
          </div>
        </div>
        {activeButton === 1 ? (
          <>
            <div
              className="w-100 d-flex align-items-center justify-content-between"
              style={{ borderBottom: "1.5px solid #eaeaea" }}
            >
              <div className="buddiePageTitle">
                Total Resources
                <span className="buddiesTotalCount">
                  {filtersearch?.length > 0? filtersearch[0].Total_Records : 0 }
                </span>
              </div>
              {/* <div
                className="downloadReportBtn pointer"
                onClick={() => exportToExcel(downloadrepoforhr, "Department_Head_Report")}
              >
                Download All Reports
                <img
                  src={downloadArrow}
                  alt="downloadArrow"
                  className="downloadIcon"
                />
              </div> */}
            </div>
            <div className="d-flex justify-content-between align-items-center buddies-search-download-row">
              <div className="col-6 d-flex align-items-center justify-items-between">
                <div className="col-md-5 col-12 px-2 my-2 rounded searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search by Employee Name"
                    className="border-0 buddies-search col-10"
                    style={{ height: "1.8rem", fontSize: "14px" }}
                    onChange={(e) => setCourseSearchKey(e.target.value)}
                    value={courseSearchKey}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchit() : null
                    }
                  />
                  <FiSearch
                    className="pointer col-2"
                    onClick={() => searchit()}
                  />
                </div>
                <div className="col-md-5 col-12 departmentCardTitle d-flex align-items-center mx-2">
                  <FilterComponent
                    className="col-1"
                    departmentList={departmentList}
                    setDepartmentList={setDepartmentList}
                    employeeList={employeeList}
                    setEmployeeList={setEmployeeList}
                    setCourseSearchKey={setCourseSearchKey}
                    workmodeList={workmodeList}
                    setWorkmodeList={setWorkmodeList}
                    workLocationList={workLocationList}
                    setWorkLocationList={setWorkLocationList}
                    engagementList={engagementList}
                    setEngagementList={setEngagementList}
                    availableList={availableList}
                    setAvailableList={setAvailableList}
                    projectstatusList={projectstatusList}
                    setProjectstatusList={setProjectstatusList}
                    fromwhere="dephead"
                  />
                </div>
              </div>
              <div
                className="downloadReportBtn pointer nowrap ms-2"
                onClick={() => {
                  downloadexcel();
                  setShowDownlaodExcelFilter(true);
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
                show={showDownloadExcelFilter}
                onHide={() => setShowDownlaodExcelFilter(false)}
                // downrepoindephead={downrepoindephead}
                modalKey="departmentResources"
              />
            </div>

            <div
              className="fixed-table-container"
              style={{
                overflow: "hidden",
                height: "calc(100vh - 270px)",
              }}
            >
              {deploading && pageno === 1 && (
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
              {filtersearch ? (
                filtersearch.length > 0 ? (
                  <>
                    <div
                      class="tableFixHead"
                      style={{
                        maxHeight: deploading
                          ? "calc(100vh - 320px)"
                          : "calc(100vh - 270px)",
                        height: deploading
                          ? "calc(100vh - 320px)"
                          : "calc(100vh - 270px)",
                      }}
                      onScroll={() =>
                        deplongerintegration &&
                        depheaddatapageno > pageno &&
                        handleScroll()
                      }
                      ref={scrollContainerRef}
                    >
                      <table class="table table-bordered fix-table">
                        <thead className="fix-thead">
                          <tr className="fix-thead-tr">
                            <th className="fix-th first-table-col">HRM ID</th>
                            <th className="fix-th">Employee Name</th>
                            <th className="fix-th">Department</th>
                            <th className="fix-th nowrap">Employment Type</th>
                            <th className="fix-th nowrap">Date of Joining</th>
                            <th className="fix-th nowrap">Reporting Manager</th>
                            {/* <th className="fix-th nowrap">Enrolled Course</th> */}
                            <th className="fix-th nowrap">Project</th>
                            <th className="fix-th nowrap">Project Status</th>
                            <th className="fix-th nowrap">Billability</th>
                            <th className="fix-th nowrap">Utilization %</th>
                            <th className="fix-th nowrap">
                              Project Start date
                            </th>
                            <th className="fix-th nowrap">Project End date</th>
                            <th className="fix-th nowrap">Work Mode</th>
                            <th className="fix-th nowrap">Work Location</th>
                            <th className="fix-th nowrap">Reports</th>
                          </tr>
                        </thead>
                        <tbody className="fix-tbody">
                          {filtersearch.map((elem, index) => {
                            let billable =
                              elem.Project_Name.length > 0
                                ? elem.BillableStatus[
                                    indexofselect[elem.EmployeeID]
                                      ? indexofselect[elem.EmployeeID]
                                      : 0
                                  ]
                                : 0;
                            let utilize =
                              elem.Project_Name.length > 0
                                ? elem.Resource_Utilization[
                                    indexofselect[elem.EmployeeID]
                                      ? indexofselect[elem.EmployeeID]
                                      : 0
                                  ]
                                : 0;
                            let startdate =
                              elem.Project_Name.length > 0
                                ? elem.Engagement_Start_Date[
                                    indexofselect[elem.EmployeeID]
                                      ? indexofselect[elem.EmployeeID]
                                      : 0
                                  ]
                                : "_";
                            let enddate =
                              elem.Project_Name.length > 0
                                ? elem.Engagement_End_Date[
                                    indexofselect[elem.EmployeeID]
                                      ? indexofselect[elem.EmployeeID]
                                      : 0
                                  ]
                                : "_";
                            let viewtype =
                              elem.Project_Name.length > 0
                                ? elem.projectviewtype[
                                    indexofselect[elem.EmployeeID]
                                      ? indexofselect[elem.EmployeeID]
                                      : 0
                                  ]
                                : "_";
                            return (
                              <tr className="fix-tbody-tr" key={index}>
                                <td className="fix-td first-table-col">
                                  {elem.EmployeeID}
                                </td>
                                <td className="fix-td">
                                  <div
                                    className="employee-details-col"
                                    title={elem.Name}
                                  >
                                    <div className="employee-details-col-img">
                                      {console.log(elem)}
                                      <ImageWithFallback
                                        src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                          elem.EmailID.split("@")[0]
                                        }.jpg`}
                                        fallbackSrc="small"
                                      />
                                    </div>
                                    <div className="employee-details-col-name">
                                      {elem.Name}
                                    </div>
                                  </div>
                                  {/* <p
                                  style={{
                                    width: "9rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={`${elem.FirstName} ${elem.LastName}`}
                                >{`${elem.FirstName} ${elem.LastName}`}</p> */}
                                </td>
                                <td className="fix-td">{elem.Department}</td>
                                <td className="fix-td nowrap">
                                  {elem.Employee_type}
                                </td>
                                <td className="fix-td nowrap">
                                  {elem.Dateofjoining}
                                </td>
                                <td className="fix-td nowrap">
                                  <p
                                    style={{
                                      width: "9rem",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                    title={elem.Reporting_To}
                                  >
                                    {elem.Reporting_To}
                                  </p>
                                </td>
                                {/* <td className="fix-td nowrap">
                                  {elem.lpLists.length !== 0 ? (
                                    <select
                                      name="current courses"
                                      className="current-courses-dropdown outline-hide"
                                      id="current-courses-dropdown"
                                      style={{
                                        width: "10rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {elem.lpLists.length !== 0
                                        ? elem.lpLists.map((lpname, ind) => {
                                            return (
                                              <option key={ind}>
                                                {lpname}
                                              </option>
                                            );
                                          })
                                        : null}
                                    </select>
                                  ) : (
                                    "-"
                                  )}
                                </td> */}
                                <td className="fix-td nowrap">
                                  {elem.Project_Name.length !== 0 ? (
                                    <select
                                      name="projects"
                                      className="projectsListDropdown pointer"
                                      onChange={(e) =>
                                        changeProjectItem(
                                          e.target.value,
                                          elem.EmployeeID
                                        )
                                      }
                                      style={{
                                        width: "10rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {elem.Project_Name.map((items, index) => {
                                        return (
                                          <option value={index}>{items}</option>
                                        );
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
                                <td className="fix-td nowrap">
                                  {" "}
                                  {utilize + "%"}
                                </td>
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
                                  {elem.workMode == null ? "_" : elem.workMode}
                                </td>
                                <td
                                  className="fix-td nowrap"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {elem.workLocation == null
                                    ? "_"
                                    : elem.workLocation}
                                </td>
                                <td className="fix-td nowrap">
                                  <u
                                    className="pointer pointer-report text-dark"
                                    onClick={() => {
                                      dispatch({
                                        type: "DEP_HEAD_LIST",
                                        payload: courseSearchKey,
                                      });
                                      dispatch({
                                        type: "DEPLIST_DEP_SAVED",
                                        payload: departmentList,
                                      });
                                      navigate(
                                        `/reports/${elem.EmailID.split("@")[0]}`
                                      );
                                    }}
                                  >
                                    view
                                  </u>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {deploading && pageno !== 1 && (
                      <div className="d-flex align-items-center justify-content-center">
                        <RotatingLines
                          strokeColor="#4F52B2"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="50"
                          visible={true}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className=" w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                    style={{ fontSize: "14px" }}
                  >
                    <img src={noData} alt="noData" height={120} />
                    No Resources Found
                  </div>
                )
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
            <div
              className="w-100 d-flex align-items-center justify-content-between"
              style={{ borderBottom: "1.5px solid #eaeaea" }}
            >
              <div className="buddiePageTitle">
                Total Resources
                <span className="buddiesTotalCount">
                  {depheadconversionlist?.pages?.Total_Records}
                </span>
              </div>
              {/* <div
                className="downloadReportBtn pointer"
                onClick={() => exportToExcel(downloadrepoforhr, "Department_Head_Report")}
              >
                Download All Reports
                <img
                  src={downloadArrow}
                  alt="downloadArrow"
                  className="downloadIcon"
                />
              </div> */}
            </div>
            <div className="d-flex justify-content-between align-items-center buddies-search-download-row">
              <div className="col-6 d-flex align-items-center justify-items-between">
                <div className="col-md-7 col-12 px-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search by Employee Name"
                    className="border-0 buddies-search col-10"
                    style={{ height: "1.8rem", fontSize: "14px" }}
                    onChange={(e) => setSearchstrcs(e.target.value)}
                    value={searchstrcs}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchhrbuddy() : null
                    }
                  />
                  <FiSearch
                    className="pointer col-2"
                    onClick={() => searchhrbuddy()}
                  />
                </div>
                <ConversionPopUPBuddy
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
                  onChangeEventhandler={onChangeEventhandler}
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
              className="buddieslist-container"
              style={{ overflow: "hidden", height: "calc(100vh - 275px)" }}
            >
              {depheadconversionlist.finalData ? (
                depheadconversionlist.finalData.length > 0 ? (
                  <div
                    className="row col-12 buddiesList tableFixHead overflow-y-scroll"
                    style={{
                      maxHeight: "calc(100vh - 275px)",
                      minHeight: "fit-content",
                      height: "unset",
                    }}
                  >
                    <table className="table">
                      <thead className="thead">
                        <tr className="trow w-100">
                          <th className="th nowrap first-table-col">HRM ID</th>
                          <th className="th nowrap">Employee Name</th>
                          <th className="th nowrap">Department</th>
                          <th className="th nowrap">Employment Type</th>
                          <th className="th nowrap">Joining Date</th>
                          <th className="th nowrap">Conversion Month</th>
                          <th className="th nowrap">
                            Potential Trainee <br /> Conversion
                          </th>
                          <th className="th nowrap">
                            Potential FTE <br /> Conversion
                          </th>
                          <th className="th nowrap">Conversion Details</th>
                        </tr>
                      </thead>
                      <tbody className="overflow-y-scroll">
                        {depheadconversionlist.finalData.map((elem, index) => {
                          return (
                            <tr className="trow" key={index}>
                              <td className="td nowrap first-table-col">
                                {elem.employeeId}
                              </td>
                              <td className="td nowrap">
                                <div
                                  className="employee-details-col"
                                  title={elem.name}
                                >
                                  <div className="employee-details-col-img">
                                    <ImageWithFallback
                                      src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                        elem.emailId.split("@")[0]
                                      }.jpg`}
                                      fallbackSrc="small"
                                    />
                                  </div>
                                  <div className="employee-details-col-name">
                                    {elem.name}
                                  </div>
                                </div>
                                {/* <p
                                  style={{
                                    width: "9rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={elem.name}
                                >
                                  {elem.name}
                                </p> */}
                              </td>
                              <td className="td nowrap">{elem.department}</td>
                              <td className="td nowrap">
                                {elem.employee_type}
                              </td>
                              <td className="td nowrap">
                                {elem.dateOfJoining}
                              </td>
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
                                    const secretKey =
                                      process.env.REACT_APP_APP_KEY;
                                    const iv =
                                      CryptoJS.lib.WordArray.random(16);
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
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div
                    className=" w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                    style={{ fontSize: "14px" }}
                  >
                    <img src={noData} alt="noData" height={120} />
                    No Resources Found
                  </div>
                )
              ) : (
                <div
                  className=" w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                  style={{ fontSize: "14px" }}
                >
                  <img src={noData} alt="noData" height={120} />
                  No Resources Found
                </div>
              )}
            </div>
          </div>
        ) : null}
        {activeButton === 3 ? <Teamleadscreendep /> : null}
        {activeButton === 4 ? <InterviewschedulerDephead /> : null}
      </div>
    </div>
  );
}

export default DepResources;

//it was on 787
// <div>
//   <div
//     className="w-100 d-flex align-items-center justify-content-between"
//     style={{ borderBottom: "1.5px solid #eaeaea" }}
//   >
//     <div className="buddiePageTitle">
//       Total Resources
//       <span className="buddiesTotalCount">1</span>
//     </div>
//     <div className="">
//       <AddTeamLeads />
//     </div>
//   </div>
//   <div className="d-flex justify-content-between align-items-center buddies-search-download-row">
//     <div className="col-6 d-flex align-items-center justify-items-between">
//       <div className="col-md-7 col-12 px-2 my-2 rounded searchContainer d-flex align-items-center justify-content-between">
//         <input
//           type="search"
//           placeholder="Search by Employee Name"
//           className="border-0 buddies-search col-10"
//           style={{ height: "1.8rem", fontSize: "14px" }}
//         />
//         <FiSearch className="pointer col-2" />
//       </div>
//     </div>
//     {/* {pageCount > 1 ? (
//       <Pagination
//       onChangeEventhandler={onChangeEventhandler}
//       total={pageCount}
//     />
//     ) : null} */}
//   </div>
//   <div style={{ overflow: "hidden", height: "calc(100vh - 270px)" }}>
//     <div
//       className="row col-12 tableFixHead"
//       style={{
//         overflowY: "auto",
//         minHeight: "fit-content",
//         height: "unset",
//         maxHeight: "calc(100vh - 270px)",
//       }}
//     >
//       <table className="table m-0">
//         <thead className="thead">
//           <tr className="trow w-100 conversion-accordian-row">
//             <th className="col-3 ps-4">Employee Name</th>
//             <th className="col-2">Department</th>
//             <th className="col-2">Designation</th>
//             <th className="col-1">State</th>
//             <th className="col-1">Action</th>
//           </tr>
//         </thead>
//         <tbody className="tbody">
//           <tr
//             style={{
//               borderBottom: "1px solid #E2E8F0",
//             }}
//           >
//             <td className="col-3 ps-4">
//               <div className="employee-details-col">
//                 <div className="employee-details-col-img">
//                   {/* <img
//                             src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
//                               items.emailId.split("@")[0]
//                             }.jpg`}
//                             alt="Employee"
//                           /> */}
//                   <img
//                     src={`https://storagefortimetrigger.blob.core.windows.net/profile/sujit.jha.jpg`}
//                     alt="Employee"
//                   />
//                 </div>
//                 <div className="employee-details-col-name">
//                   <p>Sujit Jha</p>
//                   <p>sujit.jha@celebaltech.com</p>
//                 </div>
//               </div>
//             </td>
//             <td className="col-2 ps-2">App Development</td>
//             <td className="col-2 ps-2">Associate</td>
//             <td className="col-1 ps-2">
//               <label class="switch">
//                 <input type="checkbox" />
//                 <span class="slider round"></span>
//               </label>
//             </td>
//             <td className="col-1 ps-3">
//               <RemoveTeamLead />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
//it was on 380
{
  /* <div
              className="buddieslist-container"
              style={{ overflow: "hidden", height: "calc(100vh - 290px)" }}
            >
              <div
                className="row col-12 buddiesList tableFixHead overflow-y-scroll"
                style={{
                  maxHeight: "calc(100vh - 290px)",
                  height: "unset",
                  minHeight: "fit-content",
                }}
              >
                <table className="table">
                  <thead className="thead">
                    <tr className="trow w-100">
                      <th className="th nowrap first-table-col">HRM ID</th>
                      <th className="th nowrap">Employee Name</th>
                      <th className="th nowrap">Department</th>
                      <th className="th nowrap">Employee Type</th>
                      <th className="th nowrap">Joining date</th>
                      <th className="th nowrap">Reporting Manager</th>
                      <th className="th nowrap">Enrolled Course</th>
                      <th className="th nowrap">Reports</th>
                      {/* <th className="th nowrap">Conversion Details</th> 
                    </tr>
                  </thead>
                  <tbody className="overflow-y-scroll">
                    {console.log(filtersearch)}
                    {filtersearch ? (
                      filtersearch.map((elem, index) => {
                        return (
                          <tr className="trow" key={index}>
                            <td className="td nowrap first-table-col">
                              {elem.EmployeeId}
                            </td>
                            <td className="td nowrap">
                              <p
                                style={{
                                  width: "9rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={`${elem.FirstName} ${elem.LastName}`}
                              >{`${elem.FirstName} ${elem.LastName}`}</p>
                            </td>
                            {/* <td className="td nowrap">
                              {elem.yearOfPassing !== null
                                ? elem.yearOfPassing
                                : "-"}
                            </td> 
                            <td className="td nowrap">{elem.Department}</td>
                            <td className="td nowrap">{elem.Employee_type}</td>
                            <td className="td nowrap">{elem.Dateofjoining}</td>
                            <td className="td nowrap">
                              <p
                                style={{
                                  width: "9rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={elem.Reporting_To}
                              >
                                {elem.Reporting_To}
                              </p>
                            </td>
                            <td className="td nowrap">
                              {elem.lpLists.length !== 0 ? (
                                <select
                                  name="current courses"
                                  className="w-75 current-courses-dropdown outline-hide"
                                  id="current-courses-dropdown"
                                >
                                  {elem.lpLists.length !== 0
                                    ? elem.lpLists.map((lpname, ind) => {
                                        return (
                                          <option key={ind}>{lpname}</option>
                                        );
                                      })
                                    : null}
                                </select>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="td nowrap">
                              <u
                                className="pointer pointer-report text-dark"
                                onClick={() => {
                                  dispatch({
                                    type: "DEP_HEAD_LIST",
                                    payload: searchstr,
                                  });
                                  dispatch({
                                    type: "DEPLIST_DEP_SAVED",
                                    payload: department,
                                  });
                                  navigate(
                                    `/reports/${elem.EmailId.split("@")[0]}`
                                  );
                                }}
                              >
                                view
                              </u>
                            </td>
                            {/* <td className="td nowrap">
                              <u
                                className="pointer pointer-report text-dark"
                                onClick={() => {
                                  dispatch({
                                    type:"DEP_HEAD_LIST",
                                    payload: searchstr,
                                  })
                                  dispatch({
                                    type:"DEPLIST_DEP_SAVED",
                                    payload:department
                                  })
                                  const secretKey =
                                    process.env.REACT_APP_APP_KEY;
                                  const iv = CryptoJS.lib.WordArray.random(16);
                                  const encrypted = CryptoJS.AES.encrypt(
                                    elem.EmailId.split("@")[0],
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
            </div> */
}
