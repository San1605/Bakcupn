import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./buddies.css";
import { GlobalContext } from "../../../../context/GlobalState";
import { Bars, RotatingLines } from "react-loader-spinner";
import downloadArrow from "../../../../assets/svg/downloadArrow.svg";
import { exportToExcel } from "react-json-to-excel";
import CryptoJS from "crypto-js";
import noData from "../../../../assets/noData.png";
//Muskan code : add tabs in buddies section and
import ConversionPagination from "../../../../component/pagination/ConversionPagination";
import ConversionPopUPBuddy from "./conversionPopUp/ConversionPopUPBuddy";
import moment from "moment";
import { debounce } from "lodash";
import FilterComponent from "../../../admin/components/filterComponent/FilterComponent";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";
import DownloadExcelFilterModal from "../../../admin/components/DownloadExcelFilterModal/DownloadExcelFilterModal";
import PIPModal from "../../../admin/components/PIPModal/PIPModal";

function Buddies() {
  const {
    navigate,
    navroutes,
    loading,
    hrbuddylist,
    buddylists,
    downloadrepoforhr,
    downloadreportforhr,
    hrBuddiesConversionList,
    hrbuddyConversionList,
    departmentsForHr,
    hrBuddiesDepartmentList,
    dispatch,
    buddyconprev,
    buddyactivestate,
    buddylistsearchvar,
    downloadreportforhrsimple,
    hrbuddylongerintegration,
    hrbuddypageno,
    hrloading,
    downloadrepoforhrsimple,
    empsforHr,
  } = useContext(GlobalContext);
  const [searchstr, setSearchstr] = useState(buddylistsearchvar);
  const [filtersearch, setFiltersearch] = useState([]);
  const [department, setDepartment] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [workmodeList, setWorkmodeList] = useState([]);
  const [workLocationList, setWorkLocationList] = useState([]);
  const [engagementList, setEngagementList] = useState([]);
  const [availableList, setAvailableList] = useState([]);
  const [projectstatusList,setProjectstatusList] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [showBuddyListDownloadFilter, setShowBuddyListDownloadFilter] =
    useState(false);
  // useEffect(() => {
  //   if (downloadrepoforhrsimple.length > 0) {
  //     exportToExcel(downloadrepoforhrsimple, "Filtered_Report");
  //     dispatch({
  //       type: "MUL_HR",
  //       payload: [],
  //     });
  //   }
  // }, [downloadrepoforhrsimple]);
  const downloadexcelsimple = () => {
    downloadreportforhrsimple(
      department.length > 0
        ? department
        : departmentsForHr,
      capitalizeFirst(searchstr),
      employeeList.length > 0 ? employeeList : empsforHr,
      workmodeList.toString(),
      workLocationList.toString(),
      engagementList.toString(),
      availableList.toString(),
      projectstatusList.toString(),
    );
  };
  useEffect(() => {
    if (navroutes?.includes("/buddies")) {
      hrBuddiesDepartmentList();
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "21",
      });
    } else {
      navigate("/");
    }
  }, [navroutes]);

  useEffect(() => {
    if (departmentsForHr.length > 0) {
      dispatch({
        type: "DEPARTMENT_LIST",
        payload: departmentsForHr,
      });
    }
  }, [departmentsForHr]);
  const scrollContainerRef = useRef(null);

  const debouncedHandleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPageno(pageno + 1);
      hrbuddylist(
        hrbuddypageno,
        searchstr,
        department.length === 0
          ? departmentsForHr
          : department,
        employeeList.length === 0
          ? empsforHr
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

  const searchit = () => {
    setPageno(1);
    hrbuddylist(
      1,
      searchstr,
      department.length === 0
        ? departmentsForHr
        : department,
      employeeList.length === 0
        ? empsforHr
        : employeeList,
      workmodeList.toString(),
      workLocationList.toString(),
      engagementList.toString(),
      availableList.toString(),
      projectstatusList.toString(),
    );
  };

  useEffect(() => {
    if (
      departmentsForHr.length > 0 &&
      searchstr == "" &&
      empsforHr.length > 0
    ) {
      searchit();
    }
  }, [
    searchstr,
    departmentsForHr,
    department,
    empsforHr,
    employeeList,
    workmodeList,
    workLocationList,
    engagementList,
    availableList,
    projectstatusList,
  ]);

  useEffect(() => {
    if (buddylists) {
      setFiltersearch(buddylists.hrarr);
    }
  }, [buddylists]);

  //Muskan code : add tabs in buddies section
  const [activeButton, setActiveButton] = useState(buddyactivestate);
  const [buddyDepartment, setBuddyDepartment] = useState(
    buddyconprev.buddyDepartment
  );
  const [conversionType, setConversionType] = useState(
    buddyconprev.conversionType
  );
  const [conversionRangeToYear, setConversionRangeToYear] = useState("");
  const [conversionRangeToMonth, setConversionRangeToMonth] = useState("");
  const [conversionRangeFromYear, setConversionRangeFromYear] = useState("");
  const [conversionRangeFromMonth, setConversionRangeFromMonth] = useState("");
  const [conversionRangeSelect, setConversionRangeSelect] = useState(
    buddyconprev.conversionRangeSelect
  );
  const [hrBuddyName, setHrBuddyName] = useState(buddyconprev.hrBuddyName);
  const [toDates, setToDates] = useState(buddyconprev.toDates);
  const [fromDates, setFromDates] = useState(buddyconprev.fromDates);
  const [searchstrcs, setSearchstrcs] = useState(buddyconprev.hrBuddyName);
  //pagination code
  const [pageCount, setPageCount] = useState(0);
  const [pmno, setPmno] = useState(1);
  const [coursePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(buddyconprev.currentPage);
  const [showPIPModal, setShowPIPModal] = useState(false);
  const [indexForPIPModal, setIndexForPIPModal] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(hrbuddyConversionList?.pages?.Total_Pages));
    setPmno(Number(hrbuddyConversionList?.pages?.maxProjectManager));
  }, [hrbuddyConversionList]);
  const onChangeEventhandler = (data) => {
    console.log(data, "data page");
    setCurrentPage(data.selected + 1);
  };

  const handleButtonClick = (buttonNumber) => {
    dispatch({
      type: "BUDDY_ACTIVE_SIDE",
      payload: buttonNumber,
    });
    setActiveButton(buttonNumber);
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    if (activeButton === 2) {
      if (
        Array.isArray(hrbuddyConversionList) ||
        currentPage !== buddyconprev.currentPage ||
        hrBuddyName !== buddyconprev.hrBuddyName
      ) {
        dispatch({
          type: "BUDDY_CON_PREV",
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
          hrBuddiesConversionList(
            currentPage,
            departmentsForHr.toString(),
            capitalizeFirst(hrBuddyName),
            conversionType,
            fromDates,
            toDates
          );
        } else {
          hrBuddiesConversionList(
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
  }, [currentPage, hrBuddyName, departmentsForHr, activeButton]);
  useEffect(() => {
    if (searchstrcs === "") {
      setHrBuddyName("");
      if (buddyconprev.hrBuddyName !== "") {
        setCurrentPage(1);
      }
    }
  }, [searchstrcs]);
  const searchhrbuddy = () => {
    setHrBuddyName(searchstrcs);
    setCurrentPage(1);
  };
  useEffect(() => {
    if (downloadrepoforhr.length > 0) {
      exportToExcel(downloadrepoforhr, "Filtered_Report");
      dispatch({
        type: "MUL_HR",
        payload: [],
      });
    }
  }, [downloadrepoforhr]);
  const downloadexcel = () => {
    if (buddyDepartment.length <= 0) {
      downloadreportforhr(
        departmentsForHr.toString(),
        capitalizeFirst(hrBuddyName),
        conversionType,
        fromDates,
        toDates
      );
    } else {
      downloadreportforhr(
        buddyDepartment.toString(),
        capitalizeFirst(hrBuddyName),
        conversionType,
        fromDates,
        toDates
      );
    }
  };
  // ____________________________________________Test
  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const makeRandomScores = () => {
    let scoreArray = [];
    for (let inning = 1; inning < 10; inning++) {
      scoreArray.push(rand(0, 4));
    }
    scoreArray.push(scoreArray.reduce((a, b) => a + b, 0));
    return scoreArray;
  };

  const teams = [
    { name: "Milwaukee Brewers", scores: makeRandomScores() },
    { name: "Los Angles Dodgers", scores: makeRandomScores() },
    { name: "New York Mets", scores: makeRandomScores() },
    { name: "St. Louis Cardinals", scores: makeRandomScores() },
    { name: "Houston Astros", scores: makeRandomScores() },
    { name: "Toronto Blue Jays", scores: makeRandomScores() },
    { name: "Boston Red Sox", scores: makeRandomScores() },
    { name: "Chicago Cubs", scores: makeRandomScores() },
    { name: "Philadelphia Phillies", scores: makeRandomScores() },
    { name: "Chicago White Sox", scores: makeRandomScores() },
    { name: "San Diego Padres", scores: makeRandomScores() },
    { name: "Cleveland Indians", scores: makeRandomScores() },
    { name: "San Francisco Giants", scores: makeRandomScores() },
    { name: "Cincinatti Reds", scores: makeRandomScores() },
    { name: "Minnesota Twins", scores: makeRandomScores() },
    { name: "Tampa Bay Rays", scores: makeRandomScores() },
    { name: "Miami Marlins", scores: makeRandomScores() },
    { name: "Oakland Athletics", scores: makeRandomScores() },
    { name: "Detroit Tigers", scores: makeRandomScores() },
    { name: "Pittsburgh Pirates", scores: makeRandomScores() },
    { name: "Seattle Mariners", scores: makeRandomScores() },
    { name: "Atlanta Braves", scores: makeRandomScores() },
  ];
  // ____________________________________________Test

  const [indexofselect, setIndexofselect] = useState({});
  const changeProjectItem = (indexVal, HRMID) => {
    setIndexofselect({ ...indexofselect, [HRMID]: indexVal });
  };
  useEffect(() => {
    console.log(buddylists, "filtersearch");
  }, [buddylists]);
  return (
    <div className="buddielistPage">
      <div className="row buddielistcard pt-1 pb-3 px-3 ">
        <div className="buddiesBtnContainer pt-2 rowGap-10">
          <div className="d-flex w-100 justify-content-start align-items-center flex-wrap border-bottom columnGap-10 rowGap-10">
            <button
              type="button"
              className={`${activeButton === 1
                ? "buddies-tag-primary"
                : "buddies-tag-secondary"
                } d-flex align-items-center text-white columnGap-10 py-2 pe-2 nowrap locationName`}
              onClick={() => handleButtonClick(1)}
            >
              Buddy List
            </button>
            <button
              type="button"
              className={`${activeButton === 2
                ? "buddies-tag-primary"
                : "buddies-tag-secondary"
                } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
              onClick={() => handleButtonClick(2)}
            >
              Buddy Conversion Status
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
                Total Buddies
                <span className="buddiesTotalCount">
                {filtersearch?.length > 0? filtersearch[0].Total_Records : 0 }
                </span>
              </div>
              <div
                className="downloadReportBtn pointer"
                onClick={() => {
                  console.log("simple");
                  downloadexcelsimple();
                  setShowBuddyListDownloadFilter(true);
                }}
              >
                {/* <a
                href={`https://celebaltech-lms-dev.azurewebsites.net/api/hrbuddy/downloadBuddyList?emailId=${userMail}`}
                className="download-btn-link"
              > */}
                Download Details
                <img
                  src={downloadArrow}
                  alt="downloadArrow"
                  className="downloadIcon"
                />
              </div>

              <DownloadExcelFilterModal
                show={showBuddyListDownloadFilter}
                onHide={() => setShowBuddyListDownloadFilter(false)}
                modalKey="buddyList"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center buddies-search-download-row">
              <div className="col-6 d-flex align-items-center justify-items-between">
                <div className="col-md-5 col-12 px-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search by Employee Name"
                    className="border-0 buddies-search col-10"
                    style={{ height: "1.8rem", fontSize: "14px" }}
                    onChange={(e) => setSearchstr(e.target.value)}
                    value={searchstr}
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
                    departmentList={department}
                    setDepartmentList={setDepartment}
                    employeeList={employeeList}
                    setEmployeeList={setEmployeeList}
                    setCourseSearchKey={setSearchstr}
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
                    fromwhere="hrbuddy"
                  />
                </div>
                {/* <div className="col-1 ps-2 d-flex align-items-center justify-content-between">
              <div className="filter-icon pointer">
              <img src={filterImage} alt="filterimg" />
            </div>
              </div> */}
              </div>
            </div>
            <div
              className="fixed-table-container"
              style={{
                overflow: "hidden",
                height: "calc(100vh - 255px)",
              }}
            >
              {hrloading && pageno === 1 && (
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
                        maxHeight: hrloading
                          ? "calc(100vh - 290px)"
                          : "calc(100vh - 260px)",
                        height: hrloading
                          ? "calc(100vh - 290px)"
                          : "calc(100vh - 260px)",
                      }}
                      onScroll={() =>
                        hrbuddylongerintegration &&
                        hrbuddypageno > pageno &&
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
                            <th className="fix-th nowrap">
                              Conversion Details
                            </th>
                            <th className="fix-th nowrap">Initiate PIP</th>
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
                                      <ImageWithFallback
                                        src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem.EmailID.split("@")[0]
                                          }.jpg`}
                                        fallbackSrc="small"
                                      />
                                    </div>
                                    <div className="employee-details-col-name">
                                      <p>{elem.Name}</p>
                                    </div>
                                  </div>
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
                                        type: "BUDDY_LAST_SAVED_NAME",
                                        payload: searchstr,
                                      });
                                      navigate(
                                        `/reports/${elem.EmailID.split("@")[0]}`
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
                                        type: "BUDDY_LAST_SAVED_NAME",
                                        payload: searchstr,
                                      });
                                      const secretKey =
                                        process.env.REACT_APP_APP_KEY;
                                      const iv =
                                        CryptoJS.lib.WordArray.random(16);
                                      const encrypted = CryptoJS.AES.encrypt(
                                        elem.EmailID.split("@")[0],
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
                                <td className="fix-td nowrap">
                                  <u
                                    className="pointer pointer-report text-dark"
                                    onClick={() => {
                                      setShowPIPModal(true)
                                      setIndexForPIPModal(index)
                                    }}
                                  >
                                    Initiate
                                  </u>
                                </td>
                              </tr>
                            );
                          })}

                          <PIPModal
                            show={showPIPModal}
                            EmployeeData={filtersearch!==undefined && filtersearch.length > 0 && filtersearch[indexForPIPModal]}
                            onHide={() => setShowPIPModal(false)}
                          />
                        </tbody>
                      </table>
                    </div>
                    {hrloading && pageno !== 1 && (
                      <div className="pt-1 d-flex align-items-center justify-content-center">
                        <RotatingLines
                          strokeColor="#4F52B2"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="35"
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
                Total Buddies
                <span className="buddiesTotalCount">
                  {hrbuddyConversionList?.pages?.Total_Records}
                </span>
              </div>
              <div
                style={{
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="color-indicator-div">
                  <div className="color-indication-block">
                    <div className="color-dot-g"></div>
                    <div className="color-indication">Approved</div>
                  </div>
                  <div className="color-indication-block">
                    <div className="color-dot-r"></div>
                    <div className="color-indication">Rejected</div>
                  </div>
                  <div className="color-indication-block">
                    <div className="color-dot-o"></div>
                    <div className="color-indication">Pending</div>
                  </div>
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
              className="fixed-table-container"
              style={{ overflow: "hidden" }}
            >
              <div class="tableFixHead">
                <table class="table table-bordered fix-table">
                  <thead className="fix-thead">
                    <tr className="fix-thead-tr">
                      <th className="fix-th first-table-col">HRM ID</th>
                      <th className="fix-th">Employee Name</th>
                      <th className="fix-th">Department</th>
                      <th className="fix-th nowrap">Employment Type</th>
                      <th className="fix-th nowrap">Joining Date</th>
                      <th className="fix-th nowrap">Conversion Month</th>
                      <th className="fix-th nowrap">
                        Potential Trainee Conversion
                      </th>
                      <th className="fix-th nowrap">
                        Potential FTE Conversion
                      </th>
                      <th className="fix-th nowrap">Mentor verdict</th>
                      {pmno > 1 ? (
                        Array.from({ length: pmno }, (_, index) => {
                          return (
                            <th className="fix-th nowrap">{`Project manager ${index + 1
                              } verdict`}</th>
                          );
                        })
                      ) : (
                        <th className="fix-th nowrap">
                          Project manager verdict
                        </th>
                      )}

                      <th className="fix-th nowrap">Team Lead verdict</th>
                      <th className="fix-th nowrap">Conversion Details</th>
                    </tr>
                  </thead>
                  <tbody className="fix-tbody">
                    {!!hrbuddyConversionList.finalData &&
                      hrbuddyConversionList.finalData.map((elem, index) => {
                        return (
                          <tr className="fix-tbody-tr" key={index}>
                            <td className="fix-td first-table-col">
                              {elem.employeeId}
                            </td>
                            <td className="fix-td">
                              <div
                                className="employee-details-col"
                                title={elem.name}
                              >
                                <div className="employee-details-col-img">
                                  <ImageWithFallback
                                    src={`https://storagefortimetrigger.blob.core.windows.net/profile/${elem.emailId.split("@")[0]
                                      }.jpg`}
                                    fallbackSrc="small"
                                  />
                                </div>
                                <div className="employee-details-col-name">
                                  {elem.name}
                                </div>
                              </div>
                            </td>
                            <td className="fix-td">{elem.department}</td>
                            <td className="fix-td nowrap">
                              {elem.employee_type}
                            </td>
                            <td className="fix-td nowrap">
                              {elem.dateOfJoining}
                            </td>
                            <td className="fix-td nowrap">
                              {elem.conversionMonth
                                ? elem.conversionMonth
                                : "-"}
                            </td>
                            <td style={{ paddingLeft: "16px" }}>
                              {elem.Potential_Trainee_Conversion_Month
                                ? elem.Potential_Trainee_Conversion_Month
                                : "-"}
                            </td>
                            <td style={{ paddingLeft: "16px" }}>
                              {elem.Potential_FTE_Conversion_Month
                                ? elem.Potential_FTE_Conversion_Month
                                : "-"}
                            </td>

                            <td
                              className="fix-td nowrap"
                              style={
                                elem.mentorStatus == "Approved"
                                  ? { color: "green" }
                                  : elem.mentorStatus == "Rejected"
                                    ? { color: "red" }
                                    : { color: "orange" }
                              }
                            >
                              {elem.mentorName == null ? "_" : elem.mentorName}
                            </td>
                            {Array.from({ length: pmno }, (_, index) => {
                              return (
                                <td
                                  className="fix-td nowrap"
                                  style={
                                    elem.projectManager.length > index
                                      ? elem.projectManager[index].status ==
                                        "Filled"
                                        ? { color: "green" }
                                        : { color: "orange" }
                                      : { color: "white" }
                                  }
                                >
                                  {elem.projectManager.length > index
                                    ? elem.projectManager[index].name
                                    : "_"}
                                </td>
                              );
                            })}
                            <td
                              className="fix-td nowrap"
                              style={
                                elem.decisionMakerStatus == "Approved"
                                  ? { color: "green" }
                                  : elem.decisionMakerStatus == "Rejected"
                                    ? { color: "red" }
                                    : { color: "orange" }
                              }
                            >
                              {elem.decisionMaker == null
                                ? "_"
                                : elem.decisionMaker}
                            </td>
                            <td className="fix-td nowrap">
                              <u
                                className="pointer pointer-report text-dark"
                                onClick={() => {
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
                      })}
                    {/* <tr className="fix-tbody-tr">
                      <td className="fix-td first-table-col">HRM 2601</td>
                      <td className="fix-td">Hemendra Singh Shekhawat</td>
                      <td className="fix-td">Devops & App Mordenization</td>
                      <td className="fix-td nowrap">Employment Type</td>
                      <td className="fix-td nowrap">Joining Date</td>
                      <td className="fix-td nowrap">Conversion Month</td>
                      <td className="fix-td nowrap">
                        Potential Trainee Conversion
                      </td>
                      <td className="fix-td nowrap">Potential FT Conversion</td>
                      <td className="fix-td nowrap">Conversion Details</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
              {/* <div className="row col-12 buddiesList tableFixHead overflow-y-scroll">
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
                        Potential Trainee Conversion
                      </th>
                      <th className="th nowrap">Potential FT Conversion</th>
                      <th className="th nowrap">Conversion Details</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-scroll">
                    {!!hrbuddyConversionList.finalData &&
                      hrbuddyConversionList.finalData.map((elem, index) => {
                        return (
                          <tr className="trow" key={index}>
                            <td className="td nowrap first-table-col">
                              {elem.employeeId}
                            </td>
                            <td className="td nowrap">{elem.name}</td>
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
                      })}
                  </tbody>
                </table>
              </div> */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Buddies;
