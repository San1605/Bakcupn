import React from "react";
import { FiSearch } from "react-icons/fi";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import RemoveTeamLead from "../../../../mentor-mentee/pages/departmentResources/depResourceModals/RemoveTeamLead";
import AddTeamLeads from "../../../../mentor-mentee/pages/departmentResources/depResourceModals/AddTeamLeads";
import { GlobalContext } from "../../../../../context/GlobalState";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "../../../../../component/pagination/Pagination";
import { Bars } from "react-loader-spinner";
import ImageWithFallback from "../../../components/rolemanagementModals/ImageWithFallback";
import profileimg from "../../../../../assets/images/profileimg.png";

function TeamLeadRole() {
  const { listteamleads, listdataofteamleads, deleteTeamlead, loading } =
  useContext(GlobalContext);
//Pagination code 👍
const [pageCount, setPageCount] = useState(0);
const [courseSearchKey, setCourseSearchKey] = useState("");
const [selectedCourses, setSelectedCourses] = useState([]);
const [currentPage, setCurrentPage] = useState(1);

const onChangeEventhandler = (event) => {
  const selectedpageno = event.selected + 1;
  setCurrentPage(selectedpageno);
  listteamleads(selectedpageno, courseSearchKey);
};

useEffect(() => {
  if (listdataofteamleads) {
    setPageCount(listdataofteamleads?.pages?.Total_Pages);
    setSelectedCourses(listdataofteamleads?.list);
  }
}, [listdataofteamleads]);

const searchinit = () => {
  if (courseSearchKey === "") {
    setSelectedCourses(listdataofteamleads?.list);
    listteamleads(1, courseSearchKey);
  } else {
    listteamleads(1, courseSearchKey);
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
    deleteState: 0,
    emailId: sepid,
    searchkey: courseSearchKey,
    pageno: currentPage,
  };
  deleteTeamlead(deletedata);
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
            Team Lead
          </p>
        </div>
        <div className="hrbuddy-modal-row">
          <AddTeamLeads />
        </div>
      </div>
      <div className="hrbuddyListContainer bg-white">
        <div
          className="hrbuddyPageTitle pt-3 d-flex align-items-center px-4"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Team Lead List
          <span className="hrbuddyTotalCount ms-2">{listdataofteamleads ? listdataofteamleads.count : 0}</span>
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
            <FiSearch className="pointer col-2" style={{ color: "#212121" }} onClick={() => searchinit()}/>
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
        <div style={{ overflow: "hidden", height: "calc(100vh - 270px)" }}>
          <div
            className="row col-12 tableFixHead"
            style={{
              overflowY: "auto",
              minHeight: "fit-content",
              height: "unset",
              maxHeight: "calc(100vh - 270px)",
            }}
          >
            <table className="table m-0">
              <thead className="thead">
                <tr className="trow w-100 conversion-accordian-row">
                  <th className="col-3 ps-4">Employee Name</th>
                  <th className="col-2">Department</th>
                  <th className="col-2">Designation</th>
                  <th className="col-1">State</th>
                  <th className="col-1">Action</th>
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
                  <td className="col-3 ps-4">
                    <div className="employee-details-col">
                      <div className="employee-details-col-img">
                        {/* <img
                                        src={`https://storageaccountforprofile.blob.core.windows.net/profile/${
                                          items.emailId.split("@")[0]
                                        }.jpg`}
                                        alt="Employee"
                                      /> */}
                        <ImageWithFallback src={`https://storageaccountforprofile.blob.core.windows.net/profile/${items.emailId.split("@")[0]}.jpg`} fallbackSrc={profileimg} alt="Employee"/>

                      </div>
                      <div className="employee-details-col-name">
                      <p>{items.name}</p>
                        <p>{items.emailId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="col-2 ps-2">{items.department}</td>
                  <td className="col-2 ps-2">{items.designation}</td>
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
                  <td className="col-1 ps-3">
                    <RemoveTeamLead 
                    head="Delete Team Lead"
                    content={`Are you sure, you want to remove ${items.name} as Team lead?`}
                    data={items}
                    courseSearchKey={courseSearchKey}
                    currentPage={currentPage}
                    />
                  </td>
                </tr>
                 );
                })
              ) : (
                <div className="w-100 text-nowrap nolpfoundtext ">
                  No Team lead found
                </div>
              )
            ) : loading === true ? (
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
            ) : (
              <div className="w-100 text-nowrap nolpfoundtext ">
                No Team lead found
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

export default TeamLeadRole;
