import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./buddies.css";
import { GlobalContext } from "../../../../context/GlobalState";
import { Bars } from "react-loader-spinner";
import downloadArrow from "../../../../assets/svg/downloadArrow.svg";
import { exportToExcel } from "react-json-to-excel";
import CryptoJS from "crypto-js";

//Muskan code : add tabs in buddies section and
import ConversionPagination from "../../../../component/pagination/ConversionPagination";
import ConversionPopUPBuddy from "./conversionPopUp/ConversionPopUPBuddy";

function Buddies() {
  const {
    navigate,
    navroutes,
    loading,
    hrbuddylist,
    buddylists,
    buddydepartlist,
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
    downloadrepoforhrsimple,
  } = useContext(GlobalContext);
  const [searchstr, setSearchstr] = useState(buddylistsearchvar);
  const [filtersearch, setFiltersearch] = useState([]);
  const [department, setDepartment] = useState("");
  useEffect(() => {
    if (navroutes?.includes("/buddies")) {
      hrbuddylist();
      downloadreportforhrsimple();
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "21",
      });
    } else {
      navigate("/");
    }
  }, [navroutes]);

  // const changedepartment = (dep) => {
  //   const temp = buddydepartlist.departmentResources.find((elem) => {
  //     return elem.department === dep;
  //   });
  //   setDepartment(temp);
  // };
  useEffect(() => {
    if (department !== "") {
      if (buddylists.length > 0) {
        const searchSImplerFiles = buddylists.filter(
          (data) => data.Department == department
        );
        setFiltersearch(searchSImplerFiles);
      }
    } else {
      setFiltersearch(buddylists);
    }
  }, [department]);
  const searchit = () => {
    if (searchstr == "" && department !== "") {
      if (buddylists.length > 0) {
        const searchSImplerFiles = buddylists.filter(
          (data) => data.Department == department
        );
        setFiltersearch(searchSImplerFiles);
      }
    } else if (searchstr === "" && department == "") {
      setFiltersearch(buddylists);
    } else {
      if (department !== "") {
        if (buddylists.length > 0) {
          const searchSImplerFiles = filtersearch.filter(
            (data) =>
              data.FirstName.toLowerCase().indexOf(searchstr.toLowerCase()) > -1
          );
          setFiltersearch(searchSImplerFiles);
        }
      } else {
        if (buddylists.length > 0) {
          const searchSImplerFiles = buddylists.filter(
            (data) =>
              data.FirstName.toLowerCase().indexOf(searchstr.toLowerCase()) > -1
          );
          setFiltersearch(searchSImplerFiles);
        }
      }
    }
  };

  useEffect(() => {
    if (buddylists?.length !== 0) {
      searchit();
    }
  }, [searchstr, buddylists]);

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
    activeButton === 2 && hrBuddiesDepartmentList();
  }, [activeButton]);
  useEffect(() => {
    if (activeButton === 2) {
      if( Array.isArray(hrbuddyConversionList) || currentPage !== buddyconprev.currentPage || hrBuddyName !== buddyconprev.hrBuddyName )
      {
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
      if(buddyconprev.hrBuddyName !== "")
      {
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
  return (
    <div className="buddielistPage">
      <div className="row buddielistcard pt-1 pb-3 px-3 gap-2">
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
              Buddy List
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
                  {buddylists ? buddylists.length : 0}
                </span>
              </div>
              <div
                className="downloadReportBtn pointer"
                onClick={() =>
                  exportToExcel(downloadrepoforhrsimple, "All Report")
                }
              >
                {/* <a
                href={`https://celebaltech-lms-dev.azurewebsites.net/api/hrbuddy/downloadBuddyList?emailId=${userMail}`}
                className="download-btn-link"
              > */}
                Download All Reports
                <img
                  src={downloadArrow}
                  alt="downloadArrow"
                  className="downloadIcon"
                />
                {/* </a> */}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center buddies-search-download-row">
              <div className="col-6 d-flex align-items-center justify-items-between">
                <div className="col-md-5 col-12 px-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search by Employee name"
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
                <div className="col-md-5 col-12 departmentCardTitle d-flex align-items-center">
                  {buddydepartlist.length !== 1 ? (
                    <select
                      name="department"
                      id="select-department"
                      className="p-2 rounded ms-3 pointer w-100"
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="" selected>
                        All Department
                      </option>
                      {buddydepartlist.length !== 0
                        ? buddydepartlist.map((elem) => {
                            return <option value={elem}>{elem}</option>;
                          })
                        : null}
                    </select>
                  ) : (
                    <select
                      id="select-department"
                      className="p-2 rounded ms-3 pointer w-100"
                      style={{ appearance: "none", pointerEvents: "none" }}
                    >
                      <option selected hidden>
                        Department - {buddydepartlist}
                      </option>
                    </select>
                  )}
                </div>
                {/* <div className="col-1 ps-2 d-flex align-items-center justify-content-between">
              <div className="filter-icon pointer">
              <img src={filterImage} alt="filterimg" />
            </div>
              </div> */}
              </div>
            </div>
            <div
              className="buddieslist-container"
              style={{
                overflow: "hidden",
                maxHeight: "calc(100vh - 285px)",
                minHeight: "fit-content",
              }}
            >
              <div
                className="row col-12 buddiesList tableFixHead overflow-y-scroll"
                style={{
                  height: "unset",
                  minHeight: "fit-content",
                  maxHeight: "calc(100vh - 275px)",
                }}
              >
                <table className="table">
                  <thead className="thead">
                    <tr className="trow w-100">
                      <th className="th nowrap first-table-col">HRM ID</th>
                      <th className="th nowrap">Employee Name</th>
                      <th className="th nowrap">Year of Passing</th>
                      <th className="th nowrap">Date of Joining</th>
                      {/* <th className="th nowrap">College Name</th> */}
                      {/* <th className="th nowrap">Department</th> */}
                      <th className="th nowrap">Enrolled Course</th>
                      {/* <th className="th nowrap">Notification</th> */}
                      <th className="th nowrap">Reports</th>
                      <th className="th nowrap">Conversion Details</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-scroll">
                    {filtersearch ? (
                      filtersearch.map((elem, index) => {
                        return (
                          <tr className="trow" key={index}>
                            <td className="td nowrap first-table-col">
                              {elem.EmployeeId}
                            </td>
                            <td className="td nowrap">{`${elem.FirstName} ${elem.LastName}`}</td>
                            <td className="td nowrap">
                              {elem.yearOfPassing !== null
                                ? elem.yearOfPassing
                                : "-"}
                            </td>
                            <td className="td nowrap">{elem.Dateofjoining}</td>
                            {/* <td className="td nowrap">
                            {elem.collegeName !== null ? elem.collegeName : "-"}
                          </td> */}
                            {/* <td className="td nowrap">{elem.Department}</td> */}
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
                            {/* <td
                            className="td d-flex align-items-center 
                        nowrap"
                          >
                            <div className="ticketIconContainer pointer">
                              <img
                                src={bellIcon}
                                alt="bellIcon"
                                className=" ticketIconStyle"
                                onClick={() => navigate("/requests")}
                              />
                              {elem.noOfTickets === 0 ? null : (
                                <div className="ticketIcon-dot d-flex justify-content-center align-items-center rounded-circle">
                                  {`+${elem.noOfTickets}`}
                                </div>
                              )}
                            </div>
                          </td> */}
                            <td className="td nowrap">
                              <u
                                className="pointer pointer-report text-dark"
                                onClick={() => {
                                  dispatch({
                                    type: "BUDDY_LAST_SAVED_NAME",
                                    payload: searchstr,
                                  });
                                  navigate(
                                    `/reports/${elem.EmailId.split("@")[0]}`
                                  );
                                }}
                              >
                                view
                              </u>
                            </td>
                            <td className="td nowrap">
                              <u
                                className="pointer pointer-report text-dark"
                                onClick={() => {
                                  dispatch({
                                    type: "BUDDY_LAST_SAVED_NAME",
                                    payload: searchstr,
                                  });
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
                    placeholder="Search by HRM ID OR Employee Name"
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
                      <th className="fix-th nowrap">Potential FT Conversion</th>
                      <th className="fix-th nowrap">Mentor verdict</th>
                      {pmno > 1 ? (
                        Array.from({ length: pmno }, (_, index) => {
                          return (
                            <th className="fix-th nowrap">{`Project manager ${
                              index + 1
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
                            <td className="fix-td">{elem.name}</td>
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
