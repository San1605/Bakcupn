import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import Pagination from "../../../../../component/pagination/Pagination";
import "./hrbuddy.css";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function SingleHrDetails() {
  const param = useLocation();
  const { adminhrinnerlist, bdt, navigate } = useContext(GlobalContext);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [filtersearch, setFiltersearch] = useState([]);

  useEffect(() => {
    if (param) {
      const department = param.search.slice(1).split("&")[0].split("=")[1];
      const mail = param.search.slice(1).split("&")[1].split("=")[1];
      adminhrinnerlist(department, mail);
    }
  }, [param]);

  const searchit = () => {
    if (courseSearchKey === "") {
      setFiltersearch(bdt);
    } else {
      if (bdt.length > 0) {
        const searchSImplerFiles = bdt.filter(
          (data) =>
            data.FirstName.toLowerCase().indexOf(
              courseSearchKey.toLowerCase()
            ) > -1
        );
        setFiltersearch(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    if (bdt?.length !== 0) {
      if (courseSearchKey == "") {
        searchit();
      }
    }
  }, [courseSearchKey, bdt]);

  return (
    <div className="hrbuddyContainer">
      <div
        className="d-flex bredcumb-header pt-2"
        style={{ columnGap: "8px", fontSize: "12px" }}
      >
        <p
          className="pointer"
          onClick={() => navigate("/admin/rolemanagement")}
        >
          Role Management
        </p>
        <p>&#x3e;</p>
        <p
          className="pointer"
          onClick={() => navigate("/admin/rolemanagement/hrbuddy")}
        >
          HR Buddy
        </p>
        <p>&#x3e;</p>
        <p style={{ color: "#4F52B2" }}>
          {param.search
            .slice(1)
            .split("&")[2]
            .split("=")[1]
            .split("%20")
            .join(" ")}
        </p>
      </div>
      <div className=" d-flex align-items-center justify-content-between hrbuddy-head-row p-0">
        <p className="hrbuddyHead pt-2" style={{ fontSize: "18px" }}>
          HR Buddy
        </p>
      </div>
      <div className="hrbuddyListContainer px-3 bg-white mt-1">
        <div className="d-flex align-items-center pt-3">
          <div
            className="d-flex align-items-center"
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="leftArrowIcon"
              style={{ height: "16px" }}
              className="pointer"
            />
          </div>
          <div
            className="hrbuddyPageTitle  d-flex align-items-center ps-2"
            style={{ fontSize: "16px", fontWeight: "500" }}
          >
            {param.search
              .slice(1)
              .split("&")[2]
              .split("=")[1]
              .split("%20")
              .join(" ")}
            <span className="hrbuddyTotalCount ms-2">
              {bdt ? bdt.length : 0}
            </span>
          </div>
        </div>
        <div className="py-2 d-flex align-items-center justify-content-between hrbuddy-search-pagination-row">
          <div className="col-lg-3 col-md-4 col-12 px-2 rounded searchContainer searchContainer-hrbuddy">
            <input
              type="search"
              placeholder="Search by Employee Name"
              className="border-0 sampler-search col-10 resourceListSearch"
              onChange={(e) => {
                setCourseSearchKey(e.target.value);
              }}
              onKeyDown={(event) => (event.key === "Enter" ? searchit() : null)}
            />
            <FiSearch
              className="pointer col-2"
              style={{ color: "#212121" }}
              onClick={() => searchit()}
            />
          </div>
        </div>
        <div
          className="courselisttable-container"
          style={{ overflow: "hidden" }}
        >
          <div className="row col-12 hrbuddyList tableFixHead overflow-y-scroll">
            <table className="table">
              <thead className="thead">
                <tr className="trow">
                  <th className="col-1 resourseListTableHead nowrap">HRM ID</th>
                  <th className="col-2 resourseListTableHead nowrap">Name</th>
                  <th className="col-2 resourseListTableHead nowrap">Email</th>
                  <th className="col-2 resourseListTableHead nowrap">
                    Reporting Manager
                  </th>
                  <th className="col-2 resourseListTableHead nowrap">
                    Employment Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtersearch ? (
                  filtersearch.length > 0 ? (
                    filtersearch.map((items, index) => {
                      return (
                        <tr>
                          <td className="col-1 resourseListTablecontent nowrap">
                            {items.EmployeeId}
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap">
                            {items.FirstName} {items.LastName}
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap">
                            {items.EmailId}
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap">
                            {items.Reporting_To.split("-")[1]}{" "}
                            {items.Reporting_To.split("-")[2]}
                          </td>
                          <td className="col-2 resourseListTablecontent nowrap action-column">
                            {items.Employee_type}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="w-100 text-nowrap nolpfoundtext ">
                      No Person found
                    </div>
                  )
                ) : (
                  <div className="w-100 text-nowrap nolpfoundtext ">
                    No Person found
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

export default SingleHrDetails;
