import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import AddInterviewScheduler from "./depResourceModals/AddInterviewScheduler";
import RemoveInterviewScheduler from "./depResourceModals/RemoveInterviewScheduler";
import Pagination from "../../../../component/pagination/Pagination";
import { Bars } from "react-loader-spinner";
import { GlobalContext } from "../../../../context/GlobalState";

function InterviewschedulerDephead() {
    const { listinterviewers, interviewerlist, deleteInterviewer, loading } =
    useContext(GlobalContext);
    const [pageCount, setPageCount] = useState(0);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    listinterviewers(selectedpageno, courseSearchKey);
  };

  useEffect(() => {
    if (interviewerlist) {
      setPageCount(interviewerlist?.pages?.Total_Pages);
      setSelectedCourses(interviewerlist?.list);
    }
  }, [interviewerlist]);

  const searchinit = () => {
    if (courseSearchKey === "") {
      setSelectedCourses(interviewerlist?.list);
      listinterviewers(1, courseSearchKey);
    } else {
      listinterviewers(1, courseSearchKey);
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
    deleteInterviewer(deletedata);
  };
  return (
    <div>
            <div>
              <div
                className="w-100 d-flex align-items-center justify-content-between"
                style={{ borderBottom: "1.5px solid #eaeaea" }}
              >
                <div className="buddiePageTitle">
                  Total Resources
                  <span className="buddiesTotalCount">{interviewerlist ? interviewerlist.count : 0}</span>
                </div>
                <div className="">
                  <AddInterviewScheduler />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center buddies-search-download-row">
                <div className="col-6 d-flex align-items-center justify-items-between">
                  <div className="col-md-7 col-12 px-2 my-2 rounded searchContainer d-flex align-items-center justify-content-between">
                    <input
                      type="search"
                      placeholder="Search by HRM ID OR Employee Name"
                      className="border-0 buddies-search col-10"
                      style={{ height: "1.8rem", fontSize: "14px" }}
                      onChange={(e) => setCourseSearchKey(e.target.value)}
              onKeyDown={(event) =>
                event.key === "Enter" ? searchinit() : null
              }
                    />
                    <FiSearch className="pointer col-2" onClick={() => searchinit()}/>
                  </div>
                </div>
                {pageCount > 1 ? (
                <Pagination
                onChangeEventhandler={onChangeEventhandler}
                total={pageCount}
              />
              ) : null}
              </div>
              <div
                style={{ overflow: "hidden", height: "calc(100vh - 270px)" }}
              >
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
                        <RemoveInterviewScheduler 
                     head="Delete Interviewer"
                     content={`Are you sure, you want to remove ${items.name} as admin?`}
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
                No Admin found
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
              No Interviewer found
            </div>
          )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  )
}

export default InterviewschedulerDephead