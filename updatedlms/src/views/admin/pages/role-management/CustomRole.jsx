import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../../../component/pagination/Pagination";
import arrow from "../../../../assets/svg/unenrolledCourses/arrow.svg";
import "./admin/adminrole.css";
import EditCustomRole from "../../components/rolemanagementModals/EditCustomRole";
import AddCustomRoleMember from "../../components/rolemanagementModals/AddCustomRoleMember";
import { GlobalContext } from "../../../../context/GlobalState";
import deleteicon from "../../assets/delete.svg";
import { useParams } from "react-router-dom";
import moment from "moment";

function CustomRole() {
  const params = useParams();
  const { customindata, listcustomdata, deleteempofcustom } =
    useContext(GlobalContext);
  const [pageCount, setPageCount] = useState(0);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    listcustomdata(selectedpageno, courseSearchKey);
  };

  useEffect(() => {
    if (customindata) {
      setPageCount(customindata?.pages?.Total_Pages);
      setSelectedCourses(customindata?.list);
    }
  }, [customindata]);

  useEffect(() => {
    listcustomdata(currentPage, courseSearchKey, params.id);
  }, []);

  const searchinit = () => {
    if (courseSearchKey === "") {
      setSelectedCourses(customindata?.list);
      listcustomdata(1, courseSearchKey, params.id);
    } else {
      listcustomdata(1, courseSearchKey, params.id);
    }
  };
  useEffect(() => {
    if (courseSearchKey == "") {
      searchinit();
    }
  }, [courseSearchKey]);
  const handlecheck = (toggle, stateid, sepid) => {
    const toggledata = selectedCourses.map((ele) => {
      if (ele.roleId == toggle) {
        if (ele.state == 0) {
          return { ...ele, state: 1 };
        } else {
          return { ...ele, state: 0 };
        }
      } else {
        return { ...ele };
      }
    });
    setSelectedCourses(toggledata);
    const deletedata = {
      roleId: toggle,
      state: stateid ? 2 : 1,
      customRoleId: params.id,
      deleteState: 0,
      emailId: sepid,
      searchkey: courseSearchKey,
      pageno: currentPage,
    };
    deleteempofcustom(deletedata);
  };
  const handledelete = (id, sepid) => {
    const deletedata = {
      roleId: id,
      state: 0,
      customRoleId: params.id,
      deleteState: 1,
      emailId: sepid,
      searchkey: courseSearchKey,
      pageno: currentPage,
    };
    deleteempofcustom(deletedata);
  };
  return (
    <div className="hrbuddyContainer">
      <div className=" d-flex align-items-center justify-content-between hrbuddy-head-row">
        <div className="d-flex align-items-center">
          <img
            src={arrow}
            alt="leftArrowIcon"
            style={{ height: "16px" }}
            className="pointer"
            onClick={() => window.history.back()}
          />
          <p className="hrbuddyHead pt-1 ms-3" style={{ fontSize: "18px" }}>
            {`${params.title}`}
          </p>
        </div>
        <div className="hrbuddy-modal-row d-flex gap-3">
          {/* <EditCustomRole /> */}
          <AddCustomRoleMember
            courseSearchKey={courseSearchKey}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div
        className="hrbuddyListContainer bg-white"
        style={{ height: "calc(100vh - 140px)" }}
      >
        <div
          className="hrbuddyPageTitle pt-3 d-flex align-items-center px-4"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          {`${params.title}'s List`}
          <span className="hrbuddyTotalCount ms-2">{customindata?.count}</span>
        </div>
        <div className="pb-3 pt-2 px-4 d-flex align-items-center justify-content-between hrbuddy-search-pagination-row">
          <div className="col-lg-3 col-md-4 col-12 px-2 rounded searchContainer searchContainer-hrbuddy">
            <input
              type="search"
              placeholder="Search by Employee Name"
              className="border-0 sampler-search col-10 resourceListSearch"
              onChange={(e) => setCourseSearchKey(e.target.value)}
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
          <div className="col-md-3 col-12 d-flex justify-content-end hrbuddy-pagination">
            {pageCount > 1 ? (
              <Pagination
                onChangeEventhandler={onChangeEventhandler}
                total={pageCount}
              />
            ) : null}
          </div>
        </div>
        <div
          style={{
            overflow: "hidden",
            minHeight: "fit-content",
            maxHeight: "calc(100vh - 250px)",
          }}
        >
          <div
            className="row col-12 tableFixHead"
            style={{
              overflowY: "auto",
              height: "unset",
              minHeight: "fit-content",
              maxHeight: "calc(100vh - 250px)",
            }}
          >
            <table className="table m-0">
              <thead className="thead">
                <tr className="trow w-100 conversion-accordian-row">
                  <th className="col-4 ps-4">Employee Name</th>
                  <th className="col-4">Role Assigned on</th>
                  <th className="col-1">State</th>
                  <th className="col-1">Delete</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {selectedCourses ? (
                  selectedCourses.length > 0 ? (
                    selectedCourses.map((items, index) => {
                      return (
                        <tr
                          style={{
                            borderBottom: "1px solid #E2E8F0",
                          }}
                        >
                          <td className="col-4 ps-4">
                            <div className="employee-details-col">
                              <div className="employee-details-col-img">
                                <img
                                  src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                    items.emailId.split("@")[0]
                                  }.jpg`}
                                  alt="Employee"
                                />
                              </div>
                              <div className="employee-details-col-name">
                                <p>{items.name}</p>
                                <p>{items.emailId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="col-4 ps-2">
                            {moment(items.lastModifiedOn).format("DD/MM/YYYY")}
                          </td>
                          <td className="col-1 ps-2">
                            <label class="switch">
                              <input
                                type="checkbox"
                                checked={items.state == 1}
                                onChange={() => {
                                  handlecheck(
                                    items.roleId,
                                    items.state,
                                    items.emailId
                                  );
                                }}
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="col-1 ps-2">
                            <img
                              src={deleteicon}
                              alt="deleteicon"
                              onClick={() =>
                                handledelete(items.roleId, items.emailId)
                              }
                              className="action-icon"
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="w-100 text-nowrap nolpfoundtext ">
                      No Person Found
                    </div>
                  )
                ) : (
                  <div className="w-100 text-nowrap nolpfoundtext ">
                    No Person Found
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

export default CustomRole;
