import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import Pagination from "../../../../../component/pagination/Pagination";
import RemoveRoleModal from "../../../components/rolemanagementModals/removeModal/RemoveRoleModal";
import AddCoursemanager from "../../../components/rolemanagementModals/addModals/AddCoursemanager";
import EditCoursemanager from "../../../components/rolemanagementModals/editModals/EditCoursemanager";
import "./coursemanager.css";
import { useEffect } from "react";
import { Bars } from "react-loader-spinner";

function CourseManager() {
  const { learningpathmanagerlist, managerlistall, navigate, loading } =
    useContext(GlobalContext);
  //Pagination code 👍
  const [pageCount, setPageCount] = useState(0);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedlp, setSelectedlp] = useState({});

  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    learningpathmanagerlist(selectedpageno, courseSearchKey);
  };
  useEffect(() => {
    if (managerlistall) {
      setPageCount(managerlistall?.pages?.Total_Pages);
      setSelectedCourses(managerlistall?.lists);
    }
  }, [managerlistall]);

  useEffect(() => {
    learningpathmanagerlist(currentPage, courseSearchKey);
  }, []);

  useEffect(() => {
    if (managerlistall.length !== 0) {
      console.log(managerlistall);
    }
  }, [managerlistall]);

  const searchinit = () => {
    if (courseSearchKey === "") {
      setSelectedCourses(managerlistall?.lists);
      learningpathmanagerlist(currentPage, courseSearchKey);
    } else {
        learningpathmanagerlist(currentPage, courseSearchKey);
    }
  };
  useEffect(() => {
    if (selectedCourses?.length > 0) {
      let sum = {};
      selectedCourses.forEach((elem, index) => {
        const indi = index;
        const value = elem.lpLists[0];
        sum = { ...sum, [indi]: value };
      });
      setSelectedlp(sum);
    }
  }, [selectedCourses]);
  useEffect(() => {
    if (courseSearchKey == "") {
      searchinit();
    }
  }, [courseSearchKey]);
  return (
    <div className="coursemanagerContainer">
      <div
        className="d-flex bredcumb-header"
        style={{ columnGap: "8px", fontSize: "12px" }}
      >
        <p
          className="pointer"
          onClick={() => navigate("/admin/rolemanagement")}
        >
          Role Management
        </p>
        <p>&#x3e;</p>
        <p style={{ color: "#4F52B2" }}>Learnng Path Manager</p>
      </div>
      <div className=" d-flex align-items-center justify-content-between coursemanager-head-row">
        <p className="coursemanagerHead" style={{ fontSize: "18px" }}>
          Learnng Path Manager
        </p>
        <div className="coursemanager-modal-row">
          {/* <AddNewCourseModal />
          <AddSamplerModal /> */}
          <AddCoursemanager />
        </div>
      </div>
      <div className="coursemanagerListContainer px-3 bg-white mt-3">
        <div
          className="coursemanagerPageTitle pt-3 d-flex align-items-center"
          style={{ fontWeight: "500" }}
        >
          Total Learning Paths
          <span className="coursemanagerTotalCount px-2">
            {managerlistall !== undefined ? managerlistall.totalLps : 0}
          </span>
        </div>
        <div className="py-2 d-flex align-items-center justify-content-between coursemanager-search-pagination-row">
          <div className="col-lg-3 col-md-4 col-12 px-2 rounded searchContainer searchContainer-coursemanager">
            <input
              type="search"
              placeholder="Search by Employee Name"
              className="border-0 sampler-search col-10 resourceListSearch"
              onChange={(e) => {
                setCourseSearchKey(e.target.value);
              }}
              onKeyDown={(event) =>
                event.key === "Enter" ? searchinit() : null
              }
            />
            <FiSearch
              className="pointer col-2"
              style={{ color: "#212121" }}
              onClick={() => searchinit()}
            />
          </div>
          <div className="col-md-3 col-12 d-flex justify-content-end coursemanager-pagination">
            {pageCount > 1 ? (
              <Pagination
                onChangeEventhandler={onChangeEventhandler}
                total={pageCount}
              />
            ) : null}
          </div>
        </div>
        <div style={{ height: "59vh" }}>
          <div className="row col-12 coursemanagerList tableFixHead  overflow-y-scroll">
            <table className="table">
              <thead className="thead">
                <tr className="trow">
                  <th className="col-1 resourseListTableHead nowrap">HRM ID</th>
                  <th className="col-2 resourseListTableHead nowrap">Name</th>
                  <th className="col-3 resourseListTableHead nowrap">Email</th>
                  <th className="col-3 resourseListTableHead nowrap">
                    Learning Path
                  </th>
                  <th className="col-2 resourseListTableHead nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses ? (
                  selectedCourses.length > 0 ? (
                    selectedCourses.map((items, index) => {
                      return (
                        <tr>
                          <td className="col-1 resourseListTablecontent nowrap">
                            {items.EmployeeID}
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap">
                            {items.Name}
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap">
                            {items.emailId}
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap">
                            <select
                              name="current courses"
                              className="w-75 current-courses-dropdown lpmanager-lplist outline-hide"
                              id="current-courses-dropdown"
                              onChange={(e) =>
                                setSelectedlp({
                                  ...selectedlp,
                                  [index]: e.target.value,
                                })
                              }
                            >
                              {items.lpLists.map((elem, ind) => {
                                return (
                                  <option value={elem} key={ind}>
                                    {elem}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap action-column">
                            <EditCoursemanager mail={items.emailId} />
                            <RemoveRoleModal
                              head="Remove Path Manager"
                              content={`Are you sure, you want to remove ${
                                items.Name
                              } from path ${selectedlp[[index]]}?`}
                              lp={selectedlp[[index]]}
                              mail={items.emailId}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="w-100 text-nowrap nolpfoundtext ">
                      No Course Manager found
                    </div>
                  )
                ) :
                loading === true ? (
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
                  </div>): (
                  <div className="w-100 text-nowrap nolpfoundtext ">
                    No Course Manager found
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseManager;
