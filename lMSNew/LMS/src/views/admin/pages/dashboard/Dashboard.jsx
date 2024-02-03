import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import "./dashboard.css";
import { useContext } from "react";
import { Bars, RotatingLines } from "react-loader-spinner";
import { GlobalContext } from "../../../../context/GlobalState";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import profileimg from "../../../../assets/images/profileimg.png";
import { AiOutlinePieChart } from "react-icons/ai";
import { VscOrganization } from "react-icons/vsc";
import DataAnalytics from "./Data Analytics/DataAnalytics";
import OrgChart from "./OrgChart/OrgChart";
import LpAnalytics from "./LPAnalytics/LpAnalytics";
import downloadArrow from "../../../../assets/svg/downloadArrow.svg";
import EmployeeListFilterComponent from "./EmployeeListFilterComponent/EmployeeListFilterComponent";
import ConversionPagination from "../../../../component/pagination/ConversionPagination";
import CryptoJS from "crypto-js";
import { exportToExcel } from "react-json-to-excel";
import moment from "moment";
import DownloadExcelFilterModal from "../../components/DownloadExcelFilterModal/DownloadExcelFilterModal";
import ImageWithFallback from "../../components/rolemanagementModals/ImageWithFallback";
import { debounce } from "lodash";

function Dashboard(props) {
  const {
    rolecheck,
    hrm_id,
    loading,
    navigate,
    admindashdata,
    dashlist,
    admindashline,
    departmentlist,
    departmentlistdata,
    graphapiforempdetails,
    poc,
    adminDepartmentList,
    AdminDepartmentListData,
    AdminDashboardDataSelect,
    AdminDashboardDataAnalytics,
    AdminDashboardNameAnalytics,
    dispatch,
    adminDataAnalyticsDepartmentName,
    adminDataAnalyticsMentorHrmId,
    // admindashgraph,
    // graphdata,
    hrBuddiesConversionList,
    hrbuddyConversionList,
    // departmentlistdata
    // departmentlist
    downrepoforadminemp,
    downreportforadminemp,
    activeAdminDashboard,
    adminempcurrentpage,
    adminemplongerintegration
  } = useContext(GlobalContext);

  const [indexofselect, setIndexofselect] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [workmodeList, setWorkmodeList] = useState([]);
  const [workLocationList, setWorkLocationList] = useState([]);
  const [engagementList, setEngagementList] = useState([]);
  const [availableList,setAvailableList] = useState([]);
  const [projectstatusList,setProjectstatusList] = useState([]);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [showSearchresult, setShowSearchresult] = useState(false);
  const [empmail, setEmpmail] = useState("");
  const [
    showDownloadFiltersForEmployeeList,
    setShowDownloadFiltersForEmployeeList,
  ] = useState(false);
  // //console.log(showSearchresult, "default");

  useEffect(() => {
    document.title = `Admin Dashboard | ${process.env.REACT_APP_APP_NAME}`;
  }, []);
  useEffect(() => {
    rolecheck(hrm_id);
    admindashline();
    departmentlist();
    AdminDepartmentListData();
    // admindashdata(1, courseSearchKey, departmentList, employeeList, empmail);
  }, []);

  useEffect(() => {
    if (dashlist !== undefined) {
      // //console.log((dashlist.allEmployees), Array.isArray(dashlist.allEmployees), typeof(dashlist.allEmployees))
      setSelectedCourses(dashlist);
    }
  }, [dashlist]);
  const divRef = useRef(null);

  const debouncedHandleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } =
    divRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setCurrentPage(currentPage + 1);
      admindashdata(
        adminempcurrentpage,
        courseSearchKey,
        departmentList.length === 0
          ? departmentlistdata.map((elem)=>{ return elem.Department})
          : departmentList,
        employeeList.length === 0
          ?["Intern","Trainee","Permanent","Contractual"]
          : employeeList,
          empmail,
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

  const changeProjectItem = (indexVal, HRMID) => {
    setIndexofselect({ ...indexofselect, [HRMID]: indexVal });
  };
  const searchit = () => {
    setCurrentPage(1);
        admindashdata(
          1,
          courseSearchKey,
          departmentList.length === 0
        ? departmentlistdata.map((elem)=>{ return elem.Department})
        : departmentList,
        employeeList.length === 0
        ? ["Intern","Trainee","Permanent","Contractual"]
        : employeeList,
          empmail,
          workmodeList.toString(),
          workLocationList.toString(),
          engagementList.toString(),
          availableList.toString(),
          projectstatusList.toString(),
        );
        
      };


  useEffect(() => {
    if (
      departmentlistdata.length > 0 
    ) {
      if (courseSearchKey == "") {
        setTimeout(() => {
          setShowSearchresult(false);
        }, 150);
        searchit();
      } else {
        graphapiforempdetails(courseSearchKey);
        setShowSearchresult(true);
      }
    }
  }, [
    courseSearchKey,
    departmentlistdata,
    departmentList,
    employeeList,
    workmodeList,
    workLocationList,
    engagementList,
    availableList,
    projectstatusList
  ]);

  

  const handleclickevent = (e) => {
    // const outsider = document.getElementById("outside");
    const insider = document.getElementById("inside");
    let actual = e.target;
    if (actual == insider) {
      if (courseSearchKey !== "") {
        setShowSearchresult(true);
      } else {
        setShowSearchresult(false);
      }
    } else {
      setShowSearchresult(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", (e) => handleclickevent(e));
    return () => {
      document.removeEventListener("click", (e) => handleclickevent(e));
    };
  }, []);
  const onEnter = () => {
    searchit();
    setTimeout(() => {
      setShowSearchresult(false);
    }, 150);
  };

  useEffect(() => {
    if (empmail !== "") {
      setShowSearchresult(false);
      admindashdata(
        1,
        courseSearchKey,
        departmentList,
        employeeList,
        empmail,
        workmodeList.toString(),
        workLocationList.toString(),
        engagementList.toString(),
        availableList.toString(),
        projectstatusList.toString(),
      );
      setEmpmail("");
    }
  }, [empmail]);

  const [activeButton, setActiveButton] = useState(
    activeAdminDashboard.adminmain
  );
  const [mentorName, setMentorName] = useState("");

  const [searchStr, setSearchStr] = useState("");

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  useEffect(() => {
    dispatch({
      type: "ACTIVE_ADMIN_DASHBOARD",
      payload: { adminmain: activeButton },
    });
  }, [activeButton]);
  useEffect(() => {
    AdminDashboardDataAnalytics({
      department:
        adminDataAnalyticsDepartmentName !== null
          ? adminDataAnalyticsDepartmentName
          : "",
    });
    setSearchStr("");
  }, [adminDataAnalyticsDepartmentName]);

  useEffect(() => {
    AdminDashboardNameAnalytics(
      adminDataAnalyticsMentorHrmId,
      adminDataAnalyticsDepartmentName !== null
        ? adminDataAnalyticsDepartmentName
        : ""
    );
  }, [adminDataAnalyticsMentorHrmId]);

  useEffect(() => {
    dispatch({
      type: "ADMIN_DATA_ANALYTICS_MENTOR_HRMID",
      payload: "",
    });
    AdminDashboardDataSelect({
      department:
        adminDataAnalyticsDepartmentName === null
          ? ""
          : `${adminDataAnalyticsDepartmentName}`,
    });
  }, [adminDataAnalyticsDepartmentName]);

  const adminDepartmentList1 = departmentlistdata.map((val) => val.Department);
  const [employeeActiveButton, setEmployeeActiveButton] = useState(
    activeAdminDashboard.admin_inner
  );
  const OnButtonClick = (buttonNumber) => {
    setEmployeeActiveButton(buttonNumber);
  };
  useEffect(() => {
    dispatch({
      type: "ACTIVE_ADMIN_DASHBOARD",
      payload: { admin_inner: employeeActiveButton },
    });
  }, [employeeActiveButton]);
  const [buddyDepartment, setBuddyDepartment] = useState([]);
  const [conversionType, setConversionType] = useState("");
  const [conversionRangeToYear, setConversionRangeToYear] = useState("");
  const [conversionRangeToMonth, setConversionRangeToMonth] = useState("");
  const [conversionRangeFromYear, setConversionRangeFromYear] = useState("");
  const [conversionRangeFromMonth, setConversionRangeFromMonth] = useState("");
  const [conversionRangeSelect, setConversionRangeSelect] = useState("");
  const [hrBuddyName, setHrBuddyName] = useState("");
  const [searchStr1, setSearchStr1] = useState("");
  const [toDates, setToDates] = useState("");
  const [fromDates, setFromDates] = useState("");
  //pagination code
  const [pageCount1, setPageCount1] = useState(0);
  const [coursePerPage] = useState(10);
  const [currentPage1, setCurrentPage1] = useState(1);
  useEffect(() => {
    setPageCount1(hrbuddyConversionList?.pages?.Total_Pages);
  }, [hrbuddyConversionList]);
  const onChangeEventhandler1 = (data) => {
    setCurrentPage1(data.selected + 1);
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    employeeActiveButton === 2 && departmentlist();
  }, [employeeActiveButton]);
  useEffect(() => {
    if (employeeActiveButton === 2) {
      if (buddyDepartment.length <= 0) {
        hrBuddiesConversionList(
          currentPage1,
          adminDepartmentList1.toString(),
          capitalizeFirst(hrBuddyName),
          conversionType,
          fromDates,
          toDates
        );
        console.log(buddyDepartment, "buddyDepartment if");
      } else {
        console.log(buddyDepartment, "buddyDepartment else");
        hrBuddiesConversionList(
          currentPage1,
          buddyDepartment.toString(),
          capitalizeFirst(hrBuddyName),
          conversionType,
          fromDates,
          toDates
        );
      }
    }
  }, [currentPage1, hrBuddyName, employeeActiveButton]);

  const searchhrbuddy = () => {
    setHrBuddyName(searchStr1);
    setCurrentPage1(1);
  };
  useEffect(() => {
    if (searchStr1 === "") {
      setHrBuddyName("");
      setCurrentPage(1);
    }
  }, [searchStr1]);

  // useEffect(() => {
  //   if (downrepoforadminemp.length > 0) {
  //     exportToExcel(downrepoforadminemp, "Filtered_Report");
  //     dispatch({
  //       type: "REPORTDATA_ADMIN_EMP",
  //       payload: [],
  //     });
  //   }
  // }, [downrepoforadminemp]);

  const downloadexcel = () => {
    if (downrepoforadminemp.length <= 0) {
      downreportforadminemp(
        capitalizeFirst(courseSearchKey),
        departmentList.length > 0 ? departmentList:departmentlistdata.map((elem)=>{return elem.Department}),
        employeeList.length > 0? employeeList: ["Intern", "Trainee", "Permanent", "Contractual"],
        empmail,
        workmodeList.toString(),
        workLocationList.toString(),
        engagementList.toString(),
        availableList.toString(),
        projectstatusList.toString(),
      );
    }
  };
  return (
    <div className="h-100 d-flex flex-column">
      {/* {loading === true ? (
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
      ) : null} */}
      <div className="adminDashboardBtnContainer rowGap-10 pt-3 pb-1">
        <div className="d-flex justify-content-start align-items-center flex-wrap columnGap-10 rowGap-10">
          <button
            type="button"
            className={`${
              activeButton === 1
                ? "admin-dashboard-btn-primary"
                : "admin-dashboard-btn-secondary"
            } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
            onClick={() => handleButtonClick(1)}
          >
            <AiOutlinePieChart />
            Data Analytics
          </button>
          <button
            type="button"
            className={`${
              activeButton === 2
                ? "admin-dashboard-btn-primary"
                : "admin-dashboard-btn-secondary"
            } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
            onClick={() => handleButtonClick(2)}
          >
            <VscOrganization />
            Employee List
          </button>
        </div>
        <select
          name="reason"
          onChange={(e) => {
            dispatch({
              type: "ADMIN_DATA_ANALYTICS_DEPARTMENT_NAME",
              payload: e.target.value,
            });
            setMentorName("");
          }}
          className={`w-25 px-3 py-2 rounded ms-3 pointer adminDashboardSearchBar locationName ${
            activeButton !== 1 && "d-none"
          }`}
          required
          style={{
            textOverflow: "ellipsis",
          }}
        >
          <option value="" selected={adminDataAnalyticsDepartmentName === null}>
            All Departments
          </option>
          {adminDepartmentList.map((val) => {
            return (
              <option
                value={val.Department}
                selected={adminDataAnalyticsDepartmentName === val.Department}
              >
                {val.Department}
              </option>
            );
          })}
          {/* <option value="" selected={adminDataAnalyticsDepartmentName === ""}>All</option> */}
        </select>
      </div>
      {activeButton === 1 && (
        <DataAnalytics
          mentorName={mentorName}
          setMentorName={setMentorName}
          searchStr={searchStr}
          setSearchStr={setSearchStr}
        />
      )}
      {activeButton === 2 && (
        <div className="dashboardContainer d-flex flex-column" id="outside">
          <div className="resourcesListContainer px-3 bg-white">
            <div className="dashBtnContainer pt-2 rowGap-10">
              <div className="d-flex w-100 justify-content-start align-items-center flex-wrap border-bottom columnGap-10 rowGap-10">
                <button
                  type="button"
                  className={`${
                    employeeActiveButton === 1
                      ? "dashboard-employee-list-tag-primary"
                      : "dashboard-employee-list-tag-secondary"
                  } d-flex align-items-center text-white columnGap-10 py-2 pe-2 nowrap locationName`}
                  onClick={() => OnButtonClick(1)}
                >
                  Employee List
                </button>
                <button
                  type="button"
                  className={`${
                    employeeActiveButton === 2
                      ? "dashboard-employee-list-tag-primary"
                      : "dashboard-employee-list-tag-secondary"
                  } d-flex align-items-center text-white columnGap-10 p-2 nowrap locationName`}
                  onClick={() => OnButtonClick(2)}
                >
                  Conversion Status
                </button>
              </div>
            </div>
            {employeeActiveButton === 1 && (
              <div>
                <div
                  className="w-100 d-flex align-items-center justify-content-between"
                  style={{ borderBottom: "1.5px solid #eaeaea" }}
                >
                  <div
                    className="resourcesPageTitle d-flex align-items-center"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      padding: "12px 0",
                    }}
                  >
                    Total Resources
                    <span className="resourcessTotalCount px-2">
                      {dashlist !== undefined && dashlist.length > 0
                        ? dashlist[0].Total_Records
                        : 0}
                    </span>
                  </div>
                  <div
                    className="downloadReportBtn pointer"
                    onClick={() => {
                      downloadexcel();
                      setShowDownloadFiltersForEmployeeList(true);
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
                    show={showDownloadFiltersForEmployeeList}
                    onHide={() => setShowDownloadFiltersForEmployeeList(false)}
                    // downrepoindephead={downrepoforadminemp}
                    modalKey="adminEmployeeList"
                  />
                </div>
                <div className="py-2 d-flex align-items-center justify-content-between admin-reasourselist-head">
                  <div className="col-lg-3 col-md-6 col-12 d-flex align-items-center justify-content-between gap-2">
                    <div className=" col-11 position-relative ">
                      <div
                        className={`px-2 rounded searchContainer w-100 ${
                          showSearchresult ? "search-active " : ""
                        }`}
                      >
                        <input
                          type="search"
                          id="inside"
                          placeholder="Search Employee Name"
                          className="border-0 sampler-search col-10 resourceListSearch"
                          value={courseSearchKey}
                          onChange={(e) => {
                            setCourseSearchKey(e.target.value);
                          }}
                          onKeyDown={(event) =>
                            event.key === "Enter" ? onEnter() : null
                          }
                        />
                        <FiSearch
                          className="pointer col-2"
                          onClick={() => searchit()}
                        />
                      </div>
                      {showSearchresult ? (
                        <div
                          className={`userdata-searchlist overflow-y-scroll ${
                            courseSearchKey == "" ? "hidetransition" : ""
                          }`}
                        >
                          {poc.length > 0
                            ? poc.map((elem) => {
                                return (
                                  <div
                                    className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row"
                                    onClick={() => {
                                      setCourseSearchKey(elem.displayName);
                                      setEmpmail(elem.mail);
                                      // setTimeout(() => {
                                      // }, 500);
                                    }}
                                  >
                                    <img
                                      src={elem.photo || profileimg}
                                      alt="profileimg"
                                      className="userdata-searchlist-profilimg"
                                    />
                                    <div className="searchlist-profiledetails">
                                      <p className="searchlist-name">
                                        {elem.displayName}
                                      </p>
                                      <p className="searchlist-email">
                                        {elem.mail}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      ) : null}
                    </div>
                    <FilterComponent
                      className="col-1"
                      departmentList={departmentList}
                      setDepartmentList={setDepartmentList}
                      employeeList={employeeList}
                      setEmployeeList={setEmployeeList}
                      setCourseSearchKey={setCourseSearchKey}
                      empmail={empmail}
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
                      fromwhere="admin"
                    />
                  </div>
                </div>
                <div
                  className="fixed-table-container"
                  style={{
                    overflow: "hidden",
                    height: "calc(100vh - 290px)",
                  }}
                >
                  {dashlist === undefined ? (
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
                  ) : selectedCourses.length > 0 ? (
                    <>
                      <div
                        class="tableFixHead"
                        style={{
                          maxHeight: loading
                            ? "calc(100vh - 350px)"
                            : "calc(100vh - 300px)",
                          height: loading
                            ? "calc(100vh - 350px)"
                            : "calc(100vh - 300px)",
                        }}
                        onScroll={() =>
                          adminemplongerintegration &&
                          adminempcurrentpage > currentPage &&
                          handleScroll()
                        }
                        ref={divRef}
                      >
                        <table class="table table-bordered fix-table">
                          <thead className="fix-thead">
                            <tr className="fix-thead-tr">
                              <th className="fix-th first-table-col">HRM ID</th>
                              <th className="fix-th">Employee Name</th>
                              <th className="fix-th">Department</th>
                              <th className="fix-th">Reporting Manager</th>
                              <th className="fix-th nowrap">Employment Type</th>
                              <th className="fix-th nowrap">Project</th>
                              <th className="fix-th nowrap">Project Status</th>
                              <th className="fix-th nowrap">Billability</th>
                              <th className="fix-th nowrap">Engagement</th>
                              <th className="fix-th nowrap">
                                Project Start date
                              </th>
                              <th className="fix-th nowrap">
                                Project End date
                              </th>
                              <th className="fix-th nowrap">Work Mode</th>
                              <th className="fix-th nowrap">Work Location</th>
                              <th className="fix-th nowrap">Reports</th>
                            </tr>
                          </thead>
                          <tbody className="fix-tbody">
                            {selectedCourses.map((val, index) => {
                              let billable =
                                val.Project_Name.length > 0
                                  ? val.BillableStatus[
                                      indexofselect[val.EmployeeID]
                                        ? indexofselect[val.EmployeeID]
                                        : 0
                                    ]
                                  : 0;
                              let utilize =
                                val.Project_Name.length > 0
                                  ? val.Resource_Utilization[
                                      indexofselect[val.EmployeeID]
                                        ? indexofselect[val.EmployeeID]
                                        : 0
                                    ]
                                  : 0;
                              let startdate =
                                val.Project_Name.length > 0
                                  ? val.Engagement_Start_Date[
                                      indexofselect[val.EmployeeID]
                                        ? indexofselect[val.EmployeeID]
                                        : 0
                                    ]
                                  : "_";
                              let enddate =
                                val.Project_Name.length > 0
                                  ? val.Engagement_End_Date[
                                      indexofselect[val.EmployeeID]
                                        ? indexofselect[val.EmployeeID]
                                        : 0
                                    ]
                                  : "_";
                              let viewtype =
                                val.Project_Name.length > 0
                                  ? val.projectviewtype[
                                      indexofselect[val.EmployeeID]
                                        ? indexofselect[val.EmployeeID]
                                        : 0
                                    ]
                                  : "_";
                              return (
                                <tr className="fix-tbody-tr" key={index}>
                                  <td className="fix-td first-table-col">
                                    {val.EmployeeID}
                                  </td>
                                  <td className="fix-td ">
                                    <div className="employee-details-col">
                                      <div className="employee-details-col-img">
                                        <ImageWithFallback
                                          src={`https://storagefortimetrigger.blob.core.windows.net/profile/${
                                            val.EmailID.split("@")[0]
                                          }.jpg`}
                                          fallbackSrc="small"
                                        />
                                      </div>
                                      <div className="employee-details-col-name">
                                        {val.Name.split(" ")
                                          .slice(0, 2)
                                          .join(" ")}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="fix-td nowrap">
                                    {" "}
                                    {val.Department === ""
                                      ? "_"
                                      : val.Department}
                                  </td>
                                  <td className="fix-td nowrap">
                                    {" "}
                                    {val.Reporting_To === ""
                                      ? "_"
                                      : val.Reporting_To.split("-")
                                          .slice(0, 2)
                                          .join("-")}
                                  </td>
                                  <td className="fix-td nowrap">
                                    {" "}
                                    {val.Employee_type === ""
                                      ? "_"
                                      : val.Employee_type}
                                  </td>
                                  <td className="fix-td nowrap">
                                    {" "}
                                    {val.Project_Name.length !== 0 ? (
                                      <select
                                        name="projects"
                                        className="projectsListDropdown pointer"
                                        onChange={(e) =>
                                          changeProjectItem(
                                            e.target.value,
                                            val.EmployeeID
                                          )
                                        }
                                      >
                                        {val.Project_Name.map(
                                          (items, index) => {
                                            return (
                                              <option value={index}>
                                                {items}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    ) : (
                                      "_"
                                    )}
                                  </td>{" "}
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
                                  <td className="fix-td nowrap">{utilize}</td>
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
                                    {val.workMode == null ? "_" : val.workMode}
                                  </td>
                                  <td
                                    className="fix-td nowrap"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {" "}
                                    {val.workLocation == null
                                      ? "_"
                                      : val.workLocation}
                                  </td>
                                  <td
                                    className="fix-td nowrap viewReportsLink pointer"
                                    onClick={() => {
                                      navigate(
                                        `/reports/${val.EmailID.split("@")[0]}`
                                      );
                                    }}
                                  >
                                    view
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {loading && (
                        <div className="d-flex align-items-center justify-content-center pt-2">
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
                    <tbody
                      style={{ whiteSpace: "nowrap", fontSize: "14px" }}
                      className="pt-2"
                    >
                      No Resource data found
                    </tbody>
                  )}
                </div>
                {/* <div
                  className="row col-12 tableFixHead admin-dashboard-resource-list position-relative"
                  ref={divRef}
                  style={{
                    minHeight: "fit-content",
                    maxHeight: "calc(100vh - 290px)",
                    height: "unset",
                  }}
                >
                  {dashlist === undefined ? (
                    <div className="employee-list-page-loader-div">
                      <Bars
                        height="50"
                        width="50"
                        color="#4F52B2"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass="employee-list-page-loader"
                        visible={true}
                      />
                    </div>
                  ) : (
                    <table className="table">
                      <thead className="thead">
                        <tr className="trow">
                          <th className="col-1 resourseListTableHead nowrap">
                            HRM ID
                          </th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Employee Name
                          </th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Reporting Manager
                          </th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Department
                          </th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Employment Type
                          </th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Project
                          </th>
                          <th className="fix-th nowrap">Project Status</th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Billability
                          </th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Engagement
                          </th>

                          <th className="fix-th nowrap">Project Start date</th>
                          <th className="fix-th nowrap">Project End date</th>
                          <th className="fix-th nowrap">Work Mode</th>
                          <th className="fix-th nowrap">Work Location</th>
                          <th className="col-1 resourseListTableHead nowrap">
                            Reports
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td className="col-1 text-center" colSpan={10}>
                              <RotatingLines
                                strokeColor="#4F52B2"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="30"
                                visible={true}
                              />
                            </td>
                          </tr>
                        )}
                        {selectedCourses.length > 0 ? (
                          selectedCourses.map((val) => {
                            let billable =
                              val.Project_Name.length > 0
                                ? val.BillableStatus[
                                    indexofselect[val.EmployeeID]
                                      ? indexofselect[val.EmployeeID]
                                      : 0
                                  ]
                                : 0;
                            let utilize =
                              val.Project_Name.length > 0
                                ? val.Resource_Utilization[
                                    indexofselect[val.EmployeeID]
                                      ? indexofselect[val.EmployeeID]
                                      : 0
                                  ]
                                : 0;
                            let startdate =
                              val.Project_Name.length > 0
                                ? val.Engagement_Start_Date[
                                    indexofselect[val.EmployeeID]
                                      ? indexofselect[val.EmployeeID]
                                      : 0
                                  ]
                                : "_";
                            let enddate =
                              val.Project_Name.length > 0
                                ? val.Engagement_End_Date[
                                    indexofselect[val.EmployeeID]
                                      ? indexofselect[val.EmployeeID]
                                      : 0
                                  ]
                                : "_";
                            let viewtype =
                              val.Project_Name.length > 0
                                ? val.projectviewtype[
                                    indexofselect[val.EmployeeID]
                                      ? indexofselect[val.EmployeeID]
                                      : 0
                                  ]
                                : "_";
                            return (
                              <tr>
                                <td className="col-1 resourseListTablecontent nowrap">
                                  {val.EmployeeID}
                                </td>
                                <td className="col-1 resourseListTablecontent nowrap">
                                  {val.Name.split(" ").slice(0, 2).join(" ")}
                                </td>
                                <td className="col-1 resourseListTablecontent nowrap">
                                  {val.Reporting_To === ""
                                    ? "_"
                                    : val.Reporting_To.split("-")
                                        .slice(0, 2)
                                        .join("-")}
                                </td>

                                <td className="col-1 resourseListTablecontent nowrap">
                                  {val.Department === "" ? (
                                    "_"
                                  ) : (
                                    <p
                                      className="department-ellipses"
                                      title={val.Department}
                                    >
                                      {val.Department}
                                    </p>
                                  )}
                                </td>
                                <td className="col-1 resourseListTablecontent nowrap">
                                  {val.Employee_type === ""
                                    ? "_"
                                    : val.Employee_type}
                                </td>
                                <td className="col-1 resourseListTablecontent nowrap">
                                  {val.Project_Name.length !== 0 ? (
                                    <select
                                      name="projects"
                                      className="projectsListDropdown pointer"
                                      onChange={(e) =>
                                        changeProjectItem(
                                          e.target.value,
                                          val.EmployeeID
                                        )
                                      }
                                    >
                                      {val.Project_Name.map((items, index) => {
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
                                  className="col-1 resourseListTablecontent nowrap"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {billable == 0 ? "_" : billable}
                                </td>
                                <td className="col-1 resourseListTablecontent nowrap">
                                  {utilize}
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
                                  {val.workMode == null ? "_" : val.workMode}
                                </td>
                                <td
                                  className="fix-td nowrap"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {val.workLocation == null
                                    ? "_"
                                    : val.workLocation}
                                </td>
                                <td
                                  className="col-1 resourseListTablecontent nowrap viewReportsLink pointer"
                                  onClick={() => {
                                    navigate(
                                      `/reports/${val.EmailID.split("@")[0]}`
                                    );
                                  }}
                                >
                                  view
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tbody
                            style={{ whiteSpace: "nowrap", fontSize: "14px" }}
                            className="pt-2"
                          >
                            No Resource data found
                          </tbody>
                        )}
                      </tbody>
                    </table>
                  )}
                </div> */}
              </div>
            )}
            {employeeActiveButton === 2 && (
              <div>
                <div className="w-100 d-flex align-items-center justify-content-between menteePageTitleRow">
                  <div
                    className="menteePageTitle"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Total Resources
                    <span className="menteesTotalCount">
                      {hrbuddyConversionList?.pages?.Total_Records}
                    </span>
                  </div>
                </div>
                <div className="py-2 d-flex align-items-center justify-content-between admin-reasourselist-head">
                  <div className="col-lg-3 col-md-6 col-12 d-flex align-items-center justify-content-between gap-2">
                    <div className=" col-11 position-relative ">
                      <div
                        className={`px-2 rounded searchContainer w-100 ${
                          showSearchresult ? "search-active " : ""
                        }`}
                      >
                        <input
                          type="search"
                          placeholder="Search by Employee Name"
                          className="border-0 sampler-search col-10 resourceListSearch"
                          style={{ height: "1.8rem", fontSize: "14px" }}
                          onChange={(e) => setSearchStr1(e.target.value)}
                          onKeyDown={(event) =>
                            event.key === "Enter" ? searchhrbuddy() : null
                          }
                        />
                        <FiSearch
                          className="pointer col-2"
                          onClick={() => searchhrbuddy()}
                        />
                      </div>
                    </div>
                    {/* <AddSecondaryMentorModal />  */}
                    <EmployeeListFilterComponent
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
                      adminDepartmentList1={adminDepartmentList1}
                      setCurrentPage1={setCurrentPage1}
                      setFromDates={setFromDates}
                      setToDates={setToDates}
                      setConversionRangeFromMonth={setConversionRangeFromMonth}
                      setConversionRangeFromYear={setConversionRangeFromYear}
                      setConversionRangeToMonth={setConversionRangeToMonth}
                      setConversionRangeToYear={setConversionRangeToYear}
                      setConversionRangeSelect={setConversionRangeSelect}
                    />
                  </div>
                  <div className="col-md-3 col-12 d-flex justify-content-end resourcelist-pagination">
                    {pageCount1 > 1 ? (
                      <ConversionPagination
                        onChangeEventhandler={onChangeEventhandler1}
                        total={pageCount1}
                        currentPage={currentPage1}
                      />
                    ) : null}
                  </div>
                </div>
                <div
                  className="row col-12 tableFixHead admin-dashboard-resource-list position-relative"
                  style={{
                    minHeight: "fit-content",
                    maxHeight: "calc(100vh - 290px)",
                    height: "unset",
                  }}
                >
                  {/* <div className="row col-12 menteelist"> */}
                  <table className="table">
                    <thead className="thead">
                      <tr className="trow">
                        <th className="col-1 resourseListTableHead nowrap">
                          HRM ID
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Employee Name
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Department
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Employee Type
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Date of Joining
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Conversion Month
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Potential Trainee Conversion
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Potential FTE Conversion
                        </th>
                        <th className="col-1 resourseListTableHead nowrap">
                          Conversion Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                      {loading && (
                        <tr>
                          <td className="col-1 text-center" colSpan={9}>
                            <RotatingLines
                              strokeColor="#4F52B2"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="30"
                              visible={true}
                            />
                          </td>
                        </tr>
                      )}
                      {!!hrbuddyConversionList.finalData &&
                        hrbuddyConversionList.finalData.map((elem, index) => {
                          return (
                            <tr key={index}>
                              <td className="col-1 resourseListTablecontent nowrap first-table-col">
                                {elem.employeeId}
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
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
                                    {elem.name}
                                  </div>
                                </div>
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
                                {elem.department}
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
                                {elem.employee_type}
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
                                {elem.dateOfJoining}
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
                                {elem.conversionMonth
                                  ? elem.conversionMonth
                                  : "-"}
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
                                {elem.Potential_Trainee_Conversion_Month
                                  ? elem.Potential_Trainee_Conversion_Month
                                  : "-"}
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
                                {elem.Potential_FTE_Conversion_Month
                                  ? elem.Potential_FTE_Conversion_Month
                                  : "-"}
                              </td>
                              <td className="col-1 resourseListTablecontent nowrap">
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
                  {/* </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {activeButton === 3 && <OrgChart />}
      {activeButton === 4 && <LpAnalytics />}
    </div>
  );
}

export default Dashboard;
