import React, { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import "./coursemanagement.css";
import Pagination from "../../../../component/pagination/Pagination";
import moment from "moment";
import { GlobalContext } from "../../../../context/GlobalState";

function Coursemanagerdash() {
  const {
    navigate,
    navroutes,
    lplistdata,
    lplistforlpm,
    departmentlist,
    departmentlistdata,
    getlistofcoursemanager,
    cmlist,
    dispatch
  } = useContext(GlobalContext);
  // const [department, setDepartment] = useState("");
  //Pagination code 👍
  // const [pageCount, setPageCount] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [courseSearchKey, setCourseSearchKey] = useState("");
  // const [selectedCourses, setSelectedCourses] = useState([]);

  // useEffect(() => {
  //   if (lplistdata) {
  //     setPageCount(lplistdata?.pages?.Total_Pages);
  //     setSelectedCourses(lplistdata?.Lps);
  //   }
  // }, [lplistdata]);

  useEffect(() => {
    if(navroutes?.includes('/pathmanagement'))
    {
    document.title = `Course Management | ${process.env.REACT_APP_APP_NAME}`;
    // departmentlist();
    dispatch({
      type:"ACCOUNT_NAV",
      payload:"12"
    })
    getlistofcoursemanager();
  }
  else{
    navigate("/")
  }
  }, [navroutes]);
  // useEffect(() => {
  //   if (courseSearchKey === "") {
  //     setSelectedCourses(cmlist);
  //   } else {
  //     if (cmlist.length > 0) {
  //       const searchSImplerFiles = cmlist.filter(
  //         (data) =>
  //           data.learningPath.toLowerCase().indexOf(courseSearchKey.toLowerCase()) > -1
  //       );
  //       setSelectedCourses(searchSImplerFiles);
  //     }
  //   }
  // }, [courseSearchKey, cmlist]);
  // const onChangeEventhandler = (event) => {
  //   const selectedpageno = event.selected + 1;
  //   setCurrentPage(selectedpageno);
  //   lplistforlpm(selectedpageno, courseSearchKey, department);
  // };
  // const searchinit = () => {
  //   if (courseSearchKey === "" && department !== "") {
  //     setSelectedCourses(lplistdata?.Lps);
  //     lplistforlpm(currentPage, courseSearchKey, department);
  //   } else {
  //     if (lplistdata?.Lps.length > 0) {
  //       lplistforlpm(currentPage, courseSearchKey, department);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (department !== "") {
  //     lplistforlpm(currentPage, courseSearchKey, department);
  //   }
  // }, [department]);

  // useEffect(() => {
  //   if (departmentlistdata.length > 0) {
  //     setDepartment(departmentlistdata[0].Department);
  //   }
  // }, [departmentlistdata]);

  return (
    <>
      <div className="courseManagementContainer">
        <div className=" d-flex align-items-center justify-content-between coursemanagement-head-row">
          <p className="courseManagementHead" style={{ fontSize: "18px" }}>
            Learning Path Management
          </p>
          <div className="coursemanagement-modal-row"></div>
        </div>
        <div className="coursemanagerListContainer px-3 bg-white mt-2">
          <div
            className="resourcesPageTitle pt-3 pb-2 d-flex align-items-center"
            style={{ fontSize: "16px" }}
          >
            Total Learning Paths
            <span className="resourcessTotalCount px-2">
              {cmlist !== undefined ? cmlist.length : 0}
            </span>
          </div>
          <div className="row py-2 pb-0 justify-content-between align-items-center">
            <div className="col-md-6 col-6 d-flex align-items-center">
              {/* <div className="col-md-5 col-12">
                <div className="px-2 py-1 rounded CourseSearchContainer d-flex align-items-center justify-content-between border">
                  <input
                    type="search"
                    placeholder="Search"
                    className=" border-0 CourseSamplersearch col-10"
                    onChange={(e) => {
                      setCourseSearchKey(e.target.value);
                    }}
                  />
                  <FiSearch
                    className="pointer col-1"
                    style={{ color: "#212121" }}
                  />
                </div>
              </div> */}
              {/* <div className="department-select col-md-5 col-12 ms-3">
                <select
                  name="department"
                  id="select-department"
                  className="p-2 rounded w-100"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departmentlistdata.length > 0
                    ? departmentlistdata.map((elem, index) => {
                        return (
                          <option value={elem.Department} key={index}>
                            {elem.Department}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div> */}
            </div>
            {/* <div className="col-md-4 col-12 d-flex justify-content-end">
              {pageCount > 1 ? (
                <Pagination
                  onChangeEventhandler={onChangeEventhandler}
                  total={pageCount}
                />
              ) : null}
            </div> */}
          </div>
          <div
            className="lpmanagement-container"
            style={{ height: "68vh", overflow: "hidden" }}
          >
            <div className="row col-12 adminCoursesList  overflow-scroll mt-2">
              <table className="table">
                <thead className="thead">
                  <tr className="trow">
                    <th className="col-1 resourseListTableHead nowrap">S.no</th>
                    <th className="col-1 resourseListTableHead nowrap ">
                      Learning Path
                    </th>
                    <th className="col-1 resourseListTableHead nowrap">
                      Department
                    </th>
                    <th className="col-1 resourseListTableHead nowrap">
                      Path Duration
                    </th>
                    <th className="col-1 resourseListTableHead nowrap">
                      No. of courses
                    </th>
                    <th className="col-1 resourseListTableHead nowrap">
                      Last Modified By
                    </th>
                    <th className="col-1 resourseListTableHead nowrap">
                      Last Modified on
                    </th>
                    <th className="col-1 resourseListTableHead nowrap">
                      Added By
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cmlist ? (
                    cmlist.length > 0 ? (
                      cmlist.map((items, index) => {
                        return (
                          <tr>
                            <td className="col-1 resourseListTablecontent nowrap">
                              {index + 1}
                            </td>
                            <td
                              className="col-1 resourseListTablecontent nowrap pointer lp-name-link"
                              onClick={() =>
                                navigate(
                                  `/singlepathmanagement/${items.learningPath}`
                                )
                              }
                            >
                              {items.learningPath}
                            </td>
                            <td className="col-1 resourseListTablecontent nowrap">
                              {items.department}
                            </td>
                            <td className="col-1 resourseListTablecontent nowrap">
                              {items.pathDuration}
                            </td>
                            <td className="col-1 resourseListTablecontent nowrap">
                              {items.noOfCourses}
                            </td>
                            <td className="col-1 resourseListTablecontent nowrap">
                              {items.lastModifiedBy == "-"
                                ? "_"
                                : items.lastModifiedBy}
                            </td>
                            <td className="col-1 resourseListTablecontent nowrap">
                              {items.lastModifiedOn == null
                                ? "_"
                                : moment(items.lastModifiedOn).format(
                                    "D/M/YYYY"
                                  )}
                            </td>
                            <td className="col-1 resourseListTablecontent nowrap">
                              {items.addedBy}
                            </td>
                            {/* <td className="col-1 resourseListTablecontent">
                              <EditNewCourseModal />
                            </td> */}
                          </tr>
                        );
                      })
                    ) : (
                      <div className="w-100 text-nowrap nolpfoundtext ">
                        No Learning Paths found
                      </div>
                    )
                  ) : (
                    <div className="w-100 text-nowrap nolpfoundtext ">
                      No Learning Paths found
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coursemanagerdash;
