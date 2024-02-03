import React, { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../../../../component/pagination/Pagination";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";
import AddDepartmentManager from "../../../components/rolemanagementModals/addModals/AddDepartmentManager";
import EditDepartmentManager from "../../../components/rolemanagementModals/editModals/EditDepartmentManager";
import RemoveDepartmentManager from "../../../components/rolemanagementModals/removeModal/RemoveDepartmentManager";
import { GlobalContext } from "../../../../../context/GlobalState";
import moment from "moment";
import { Bars } from "react-loader-spinner";

function DepartmentManager() {
  const {
    adminDepartmentListDephead,
    AdminDepartmentListData,
    listdephead,
    depheadlistall,
    deletedephead,
    loading,
  } = useContext(GlobalContext);
  const [eventkeyArr, setEventkeyArr] = useState([]);
  //Pagination code 👍
  const [pageCount, setPageCount] = useState(0);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    listdephead(selectedpageno, courseSearchKey);
  };

  useEffect(() => {
    if (depheadlistall) {
      setPageCount(depheadlistall?.pages?.Total_Pages);
      setSelectedCourses(depheadlistall?.list);
    }
  }, [depheadlistall]);

  useEffect(() => {
    AdminDepartmentListData();
  }, []);
  useEffect(() => {
      listdephead(currentPage, courseSearchKey, department);
  }, [department]);
  const searchinit = () => {
    if (courseSearchKey === "") {
      setSelectedCourses(depheadlistall?.list);
    }
    listdephead(currentPage, courseSearchKey, department);
  };
  useEffect(() => {
    if (courseSearchKey == "") {
      searchinit();
    }
  }, [courseSearchKey]);

  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, () => {
      callback && callback(eventKey);
      if (eventKey !== "") {
        if (eventkeyArr?.includes(eventKey)) {
          const filterArr = eventkeyArr?.filter((item) => item !== eventKey);
          setEventkeyArr(filterArr);
        } else {
          setEventkeyArr([...eventkeyArr, eventKey]);
        }
      }
    });

    // useEffect(() => {
    //   console.log(eventkeyArr, "eventkeyArr");
    // }, [eventkeyArr]);

    const isCurrentEventKey = activeEventKey == eventKey;

    return (
      <div>
        <table className="table m-0">
          <tbody className="tbody">
            <tr className="trow w-100 conversion-accordian-row">
              <td onClick={() => decoratedOnClick()} className="pointer">
                <div className="conversion-details-text">
                  {!isCurrentEventKey ? <BsChevronDown /> : <BsChevronUp />}
                </div>
              </td>
              {children}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  const handlecheckhr = (toggle, stateid, sepid) => {
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
      department: "",
      seldep: department,
    };
    deletedephead(deletedata);
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
            Department Manager
          </p>
        </div>
        <div className="hrbuddy-modal-row">
          <AddDepartmentManager />
        </div>
      </div>
      <div className="hrbuddyListContainer bg-white">
        <div
          className="hrbuddyPageTitle pt-3 d-flex align-items-center px-4"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Department Manager List
          <span className="hrbuddyTotalCount ms-2">
            {depheadlistall ? depheadlistall.count : 0}
          </span>
        </div>
        <div className="pb-3 pt-2 px-4 d-flex align-items-center hrbuddy-search-pagination-row">
          <div className="col-lg-3 col-md-4 col-12 px-2 rounded searchContainer searchContainer-hrbuddy">
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
          <div className="department-select col-md-3 col-12 ms-3">
            <select
              name="lp"
              id="select-department"
              className="p-2 rounded w-100"
              style={{
                backgroundColor: "#fff",
                outline: "1px solid #D6D6D6",
              }}
              onChange={(e) => {
                if (e.target.value == "All Departments") {
                  setDepartment("");
                } else {
                  setDepartment(e.target.value);
                }
              }}
            >
              <option value="" selected hidden>
                Select Department
              </option>
              {adminDepartmentListDephead.length !== 0
                ? adminDepartmentListDephead.map((elem) => {
                    return (
                      <option value={elem.Department}>{elem.Department}</option>
                    );
                  })
                : null}
            </select>
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
        {/* ___________________________________________________________________ */}
        <>
          <table className="table m-0">
            <thead className="thead">
              <tr className="trow w-100 conversion-accordian-row">
                <th>
                  <BsChevronDown className="first-th" />
                </th>
                <th className="col-4"></th>
                <th className="col-2">Role Assigned By</th>
                <th className="col-2">Assigned on</th>
                <th className="col-2"> </th>
                <th className="col-2">State</th>
              </tr>
            </thead>
          </table>
          <div className="Accordian-container overflow-y-scroll">
            {selectedCourses ? (
              selectedCourses.length > 0 ? (
                selectedCourses.map((items, index) => {
                  return (
                    <Accordion key={items.roleId}>
                      <Card className="conversion-card">
                        <Card.Header className="conversion-card-header">
                          <ContextAwareToggle eventKey={1}>
                            <td className="col-4">
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
                            <td className="col-2"></td>
                            <td className="col-2"></td>
                            <td className="col-2"></td>
                            <td className="col-2">
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  checked={items.state == 1}
                                  onChange={() => {
                                    handlecheckhr(
                                      items.roleId,
                                      items.state,
                                      items.emailId
                                    );
                                  }}
                                />
                                <span class="slider round"></span>
                              </label>
                            </td>
                          </ContextAwareToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={1}>
                          <Card.Body className="conversion-card-body">
                            <div className="conversion-card-body-content">
                              {items.department.length > 0
                                ? items.department.map((elem) => {
                                    return (
                                      <div
                                        className="conversion-card-body-content-row"
                                        style={{
                                          borderBottom: "1px solid #E4E4E4",
                                        }}
                                      >
                                        <div
                                          className="col-4 pointer"
                                          style={{
                                            paddingLeft: "0px",
                                            fontSize: "12px",
                                            color: "#424242E4",
                                          }}
                                        >
                                          <p>{elem.department}</p>
                                        </div>
                                        <div
                                          className="col-2"
                                          style={{
                                            paddingLeft: "14px",
                                            fontSize: "12px",
                                            color: "#424242E4",
                                          }}
                                        >
                                          <p>{elem.assignedBy}</p>
                                        </div>
                                        <div
                                          className="col-2"
                                          style={{
                                            paddingLeft: "20px",
                                            fontSize: "12px",
                                            color: "#424242E4",
                                          }}
                                        >
                                          <p>
                                            {moment(elem.assignedDate).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </p>
                                        </div>
                                        <div
                                          className="col-2"
                                          style={{
                                            paddingLeft: "28px",
                                            fontSize: "12px",
                                            color: "#424242E4",
                                          }}
                                        >
                                          <RemoveDepartmentManager
                                            head="Remove Buddy"
                                            content={`${items.name}'s access will be revoked from department ${elem.department}?`}
                                            mail={items.emailId}
                                            department={elem.department}
                                            currentPage={currentPage}
                                            courseSearchKey={courseSearchKey}
                                            toggle={items.roleId}
                                            seldep={department}
                                          />
                                        </div>
                                        <div className="col-2"></div>
                                      </div>
                                    );
                                  })
                                : null}
                              <div
                                className="conversion-card-body-content-row"
                                style={{ borderBottom: "1px solid #E4E4E4" }}
                              >
                                <div
                                  className="col-4"
                                  style={{
                                    paddingLeft: "0px",
                                    fontSize: "12px",
                                    color: "#424242E4",
                                  }}
                                >
                                  <EditDepartmentManager items={items} />
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  );
                })
              ) : (
                <div className="w-100 text-nowrap nolpfoundtext ">
                  No HR Buddy found
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
                No HR Buddy found
              </div>
            )}
          </div>
        </>
        {/* ___________________________________________________________________ */}
        {/* <div
          className="courselisttable-container"
          style={{ overflow: "hidden" }}
        >
          <div className="row col-12 hrbuddyList tableFixHead overflow-y-scroll">
            <table className="table">
              <thead className="thead">
                <tr className="trow">
                  <th className="col-3 resourseListTableHead nowrap ps-4">
                    Employee Details
                  </th>
                  <th className="col-3 resourseListTableHead nowrap">
                    Assigned Department
                  </th>
                  <th className="col-2 resourseListTableHead nowrap">
                    Role Assigned by
                  </th>
                  <th className="col-2 resourseListTableHead nowrap">
                    Assigned on
                  </th>
                  <th className="col-1 resourseListTableHead nowrap">State</th>
                  <th className="col-1 resourseListTableHead nowrap pe-4">
                    Access Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-3 resourseListTablecontent nowrap ps-4">
                    <div className="employee-details-col">
                      <div className="employee-details-col-img">
                        <img src="#" alt="" />
                      </div>
                      <div className="employee-details-col-name">
                        <p>Ishan Jain</p>
                        <p>ishan.jain@celebaltech.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="col-3 resourseListTablecontent nowrap">
                    <select name="department" id="role-flow-dropdown">
                      <option>App Development</option>
                      <option>Cloud</option>
                      <option>IT Infra</option>
                      <option>Sales</option>
                    </select>
                  </td>
                  <td className="col-2 resourseListTablecontent nowrap">
                    Role Assigned by
                  </td>
                  <td className="col-2 resourseListTablecontent nowrap">
                    Assigned on
                  </td>
                  <td className="col-1 resourseListTablecontent nowrap">
                    State
                  </td>
                  <td className="col-1 resourseListTablecontent nowrap pe-4">
                    Access Details
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
        {/* ___________________________________________________________________ */}
      </div>
    </div>
  );
}

export default DepartmentManager;
