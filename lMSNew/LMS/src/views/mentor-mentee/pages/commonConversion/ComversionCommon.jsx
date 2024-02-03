import React, { useContext, useEffect, useState } from "react";
import ConversionPopUP from "../buddies/conversionPopUp/ConversionPopUP";
import ConversionPagination from "../../../../component/pagination/ConversionPagination";
import { FiSearch } from "react-icons/fi";
import "../buddies/buddies.css";
import { Bars } from "react-loader-spinner";
import downloadArrow from "../../../../assets/svg/downloadArrow.svg";
import { exportToExcel } from "react-json-to-excel";
import CryptoJS from "crypto-js";
import { GlobalContext } from "../../../../context/GlobalState";
import ImageWithFallback from "../../../admin/components/rolemanagementModals/ImageWithFallback";

function ComversionCommon() {
  const {
    navigate,
    loading,
    navroutes,
    commonconverionbigapi,
    hrbuddyConversionList,
    // hrBuddiesDepartmentList,
    AdminDepartmentListData,
    comdeplist,
    convtype,
    convarr,
    dispatch,
    comconprev,
    downreportforcomcon,
    downrepforcommoncon,
  } = useContext(GlobalContext);
  const [buddyDepartment, setBuddyDepartment] = useState(
    comconprev.buddyDepartment
  );
  const [searchstr, setSearchstr] = useState(comconprev.hrBuddyName);
  const [conversionType, setConversionType] = useState(
    comconprev.conversionType
  );
  const [conversionRangeToYear, setConversionRangeToYear] = useState("");
  const [conversionRangeToMonth, setConversionRangeToMonth] = useState("");
  const [conversionRangeFromYear, setConversionRangeFromYear] = useState("");
  const [conversionRangeFromMonth, setConversionRangeFromMonth] = useState("");
  const [conversionRangeSelect, setConversionRangeSelect] = useState(
    comconprev.conversionRangeSelect
  );
  const [hrBuddyName, setHrBuddyName] = useState(comconprev.hrBuddyName);
  const [toDates, setToDates] = useState(comconprev.toDates);
  const [fromDates, setFromDates] = useState(comconprev.fromDates);
  //pagination code
  const [pageCount, setPageCount] = useState(0);
  const [pmno, setPmno] = useState(1);
  const [coursePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(comconprev.currentPage);
  useEffect(() => {
    setPageCount(Math.ceil(hrbuddyConversionList?.pages?.Total_Pages));
    setPmno(Number(hrbuddyConversionList?.pages?.maxProjectManager));
  }, [hrbuddyConversionList]);
  const onChangeEventhandler = (data) => {
    setCurrentPage(data.selected + 1);
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    if (navroutes?.includes("/assignedconversion")) {
      dispatch({
        type: "ACCOUNT_NAV",
        payload: "23",
      });
      AdminDepartmentListData();
      convtype();
    } else {
      navigate("/");
    }
  }, [navroutes]);
  useEffect(() => {
    if (convarr.length > 0 && comdeplist.length > 0) {
      if (
        Array.isArray(hrbuddyConversionList) ||
        currentPage !== comconprev.currentPage ||
        hrBuddyName !== comconprev.hrBuddyName
      ) {
        dispatch({
          type: "COM_CON_UPDATE",
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
          if (conversionType == "") {
            commonconverionbigapi(
              currentPage,
              comdeplist.toString(),
              capitalizeFirst(hrBuddyName),
              convarr.toString(),
              fromDates,
              toDates
            );
          } else {
            commonconverionbigapi(
              currentPage,
              comdeplist.toString(),
              capitalizeFirst(hrBuddyName),
              conversionType,
              fromDates,
              toDates
            );
          }
        } else {
          if (conversionType == "") {
            commonconverionbigapi(
              currentPage,
              buddyDepartment.toString(),
              capitalizeFirst(hrBuddyName),
              convarr.toString(),
              fromDates,
              toDates
            );
          } else {
            commonconverionbigapi(
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
    }
  }, [currentPage, hrBuddyName, comdeplist, convarr]);
  useEffect(() => {
    if (searchstr === "") {
      setHrBuddyName("");
      if (comconprev.hrBuddyName !== "") {
        setCurrentPage(1);
      }
    }
  }, [searchstr]);
  useEffect(() => {
    if (downrepforcommoncon.length > 0) {
      exportToExcel(downrepforcommoncon, "Filtered_Report");
      dispatch({
        type: "REPORTDATA_COMMON_CON",
        payload: [],
      });
    }
  }, [downrepforcommoncon]);
  const downloadexcel = () => {
    if (buddyDepartment.length <= 0) {
      if (conversionType == "") {
        downreportforcomcon(
          comdeplist.toString(),
          capitalizeFirst(hrBuddyName),
          convarr.toString(),
          fromDates,
          toDates
        );
      } else {
        downreportforcomcon(
          comdeplist.toString(),
          capitalizeFirst(hrBuddyName),
          conversionType,
          fromDates,
          toDates
        );
      }
    } else {
      if (conversionType == "") {
        downreportforcomcon(
          buddyDepartment.toString(),
          capitalizeFirst(hrBuddyName),
          convarr.toString(),
          fromDates,
          toDates
        );
      } else {
        downreportforcomcon(
          buddyDepartment.toString(),
          capitalizeFirst(hrBuddyName),
          conversionType,
          fromDates,
          toDates
        );
      }
    }
  };
  const searchhrbuddy = () => {
    setHrBuddyName(searchstr);
    setCurrentPage(1);
  };
  return (
    <div className="buddielistPage">
      <div className="row buddielistcard pt-1 pb-3 px-3 gap-2">
        {/* <div>
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
            </div> */}
        {/* )} */}
        <div
          className="w-100 d-flex align-items-center justify-content-between"
          style={{ borderBottom: "1.5px solid #eaeaea" }}
        >
          <div className="buddiePageTitle">
            Total Resources
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
                value={searchstr}
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
            <ConversionPopUP
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
          style={{ overflow: "hidden", height: "calc(100vh - 220px)" }}
        >
          <div
            class="tableFixHead"
            style={{
              maxHeight: "calc(100vh - 220px)",
              height: "calc(100vh - 220px)",
            }}
          >
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
                  <th className="fix-th nowrap">Potential FTE Conversion</th>
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
                    <th className="fix-th nowrap">Project manager verdict</th>
                  )}

                  <th className="fix-th nowrap">Team Lead verdict</th>

                  {/* <th className="fix-th nowrap">External Interview 1</th>
                  <th className="fix-th nowrap">External Interview 2</th> */}
                  <th className="fix-th nowrap">Conversion Details</th>
                </tr>
              </thead>
              <tbody className="fix-tbody">
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
                        <td className="fix-td">{elem.department}</td>
                        <td className="fix-td nowrap">{elem.employee_type}</td>
                        <td className="fix-td nowrap">{elem.dateOfJoining}</td>
                        <td className="fix-td nowrap">
                          {elem.conversionMonth ? elem.conversionMonth : "-"}
                        </td>
                        <td className="fix-td nowrap">
                          {elem.Potential_Trainee_Conversion_Month
                            ? elem.Potential_Trainee_Conversion_Month
                            : "-"}
                        </td>
                        <td className="fix-td nowrap">
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
                        {/* <td className="fix-td nowrap">-</td>
                        <td className="fix-td nowrap">-</td> */}
                        <td className="fix-td nowrap">
                          <u
                            className="pointer pointer-report text-dark"
                            onClick={() => {
                              const secretKey = process.env.REACT_APP_APP_KEY;
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
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ComversionCommon;
