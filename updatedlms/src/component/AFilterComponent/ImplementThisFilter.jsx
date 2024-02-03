import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import "./dashboard.css";
import { useContext } from "react";
import { Bars } from "react-loader-spinner";
import { GlobalContext } from "../../../../context/GlobalState";
import Pagination from "../../../../component/pagination/Pagination";
import AFilterComponent from "./AFilterComponent";

function ImplementThisFilter(props) {
  const {
    loading,
    hrBuddiesConversionList,
    hrbuddyConversionList,
    departmentlistdata,
    departmentlist,
  } = useContext(GlobalContext);
  const adminDepartmentList1 = departmentlistdata.map((val) => val.Department);
  const [employeeActiveButton, setEmployeeActiveButton] = useState(1);
  const OnButtonClick = (buttonNumber) => {
    setEmployeeActiveButton(buttonNumber);
  };
  const [buddyDepartment, setBuddyDepartment] = useState([]);
  const [conversionType, setConversionType] = useState("");
  const [conversionRangeToYear, setConversionRangeToYear] = useState("");
  const [conversionRangeToMonth, setConversionRangeToMonth] = useState("");
  const [conversionRangeFromYear, setConversionRangeFromYear] = useState("");
  const [conversionRangeFromMonth, setConversionRangeFromMonth] = useState("");
  const [conversionRangeSelect, setConversionRangeSelect] = useState("");
  const [hrBuddyName, setHrBuddyName] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [courseInEachPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [toDates, setToDates] = useState("");
  const [fromDates, setFromDates] = useState("");
  useEffect(() => {
    setTotalPages(
      Math.ceil(hrbuddyConversionList?.pages?.Total_Records / courseInEachPage)
    );
  }, [hrbuddyConversionList]);
  const onChangeEventhandler1 = (data) => {
    setCurrentPageNumber(data.selected + 1);
  };
  useEffect(() => {
    employeeActiveButton === 2 && departmentlist();
  }, [employeeActiveButton]);
  useEffect(() => {
    if (employeeActiveButton === 2) {
      if (buddyDepartment == [] || buddyDepartment == "") {
        hrBuddiesConversionList(
          currentPageNumber,
          adminDepartmentList1.toString(),
          capitalizeFirst(hrBuddyName),
          conversionType,
          fromDates,
          toDates
        );
      } else {
        hrBuddiesConversionList(
          currentPageNumber,
          buddyDepartment.toString(),
          capitalizeFirst(hrBuddyName),
          conversionType,
          fromDates,
          toDates
        );
      }
    }
  }, [currentPageNumber, hrBuddyName, buddyDepartment, employeeActiveButton]);
  const searchingNameInInput = () => {
    setHrBuddyName(searchedValue);
    setCurrentPageNumber(1);
  };
  useEffect(() => {
    if (searchedValue === "") {
      setHrBuddyName("");
      setCurrentPageNumber(1);
    }
  }, [searchedValue]);

  useEffect(() => {
    hrBuddiesConversionList(
      currentPageNumber,
      adminDepartmentList1.toString(),
      capitalizeFirst(hrBuddyName),
      conversionType,
      fromDates,
      toDates
    );
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="resourcesListContainer px-3 bg-white">
        <div className="dashBtnContainer py-2 rowGap-10">
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
        {employeeActiveButton === 2 && (
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
                  {hrbuddyConversionList?.pages?.Total_Records}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center buddies-search-download-row">
              <div className="col-6 d-flex align-items-center justify-items-between">
                <div className="col-md-7 col-12 px-2 my-1 rounded searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search by HRM ID OR Employee Name"
                    className="border-0 sampler-search col-10"
                    style={{ height: "1.8rem", fontSize: "14px" }}
                    onChange={(e) => setSearchedValue(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchingNameInInput() : null
                    }
                  />
                  <FiSearch
                    className="pointer col-2"
                    onClick={() => searchingNameInInput()}
                  />
                </div>
                {/* <AddSecondaryMentorModal /> */}
                <AFilterComponent
                  className="col-1"
                  employeeList={conversionType}
                  setEmployeeList={setConversionType}
                  departmentList={buddyDepartment}
                  setDepartmentList={setBuddyDepartment}
                  conversionRangeFromMonth={conversionRangeFromMonth}
                  conversionRangeFromYear={conversionRangeFromYear}
                  conversionRangeToMonth={conversionRangeToMonth}
                  conversionRangeToYear={conversionRangeToYear}
                  conversionRangeSelect={conversionRangeSelect}
                  setCurrentPage1={setCurrentPageNumber}
                  setConversionRangeFromMonth={setConversionRangeFromMonth}
                  setConversionRangeFromYear={setConversionRangeFromYear}
                  setConversionRangeToMonth={setConversionRangeToMonth}
                  setConversionRangeToYear={setConversionRangeToYear}
                  setConversionRangeSelect={setConversionRangeSelect}
                  setToDates={setToDates}
                  setFromDates={setFromDates}
                  name={hrBuddyName}
                  APICallingFunction={hrBuddiesConversionList}
                  APIDepartmentList={adminDepartmentList1}
                />
              </div>
              {totalPages > 1 ? (
                <Pagination
                  onChangeEventhandler={onChangeEventhandler1}
                  total={totalPages}
                />
              ) : null}
            </div>
            <div className="menteelist-container">
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
                    {!!hrbuddyConversionList.finalData ? (
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
                                  navigate(
                                    `/conversion/${elem.emailId.split("@")[0]}`
                                  );
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
        )}
      </div>
    </div>
  );
}

export default ImplementThisFilter;
