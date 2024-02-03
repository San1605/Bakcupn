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
import deleteicon from "../../../assets/delete.svg";
import AddCourseReviewer from "../../../components/rolemanagementModals/addModals/AddCourseReviewer";
import EditCourseReviewer from "../../../components/rolemanagementModals/editModals/EditCourseReviewer";
import RemoveCourseReviewer from "../../../components/rolemanagementModals/removeModal/RemoveCourseReviewer";
import { GlobalContext } from "../../../../../context/GlobalState";
import moment from "moment";
import { Bars } from "react-loader-spinner";

function CourseReviewer() {
  const [eventkeyArr, setEventkeyArr] = useState([]);
  const {lpnamereleventfilter, lpnamesapi, listCourseReviewer, coursemanagerlist, deletecourseReviewer, loading} = useContext(GlobalContext);

  //Pagination code 👍
  const [pageCount, setPageCount] = useState(0);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [learningPath, setLearningPath] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    listCourseReviewer(selectedpageno, courseSearchKey);
  };

  useEffect(() => {
    if (coursemanagerlist) {
      setPageCount(coursemanagerlist?.pages?.Total_Pages);
      setSelectedCourses(coursemanagerlist?.list);
    }
  }, [coursemanagerlist]);

  useEffect(() => {
    lpnamesapi()
  }, []);
  useEffect(()=>{
    listCourseReviewer(currentPage, courseSearchKey, learningPath);
  },[learningPath])
  const searchinit = () => {
    if (courseSearchKey === "") {
      setSelectedCourses(coursemanagerlist?.list);
      listCourseReviewer(currentPage, courseSearchKey, learningPath);
    } else {
        listCourseReviewer(currentPage, courseSearchKey, learningPath);
    }
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
  const handlecheckeditor = (toggle,stateid,sepid)=>{
    const toggledata = selectedCourses.map((ele)=>{

      if(ele.roleId == toggle)
      {
        if(ele.state == 0)
        {
          return {...ele,state:1}
        }
        else
        {
          return{...ele,state:0}
        }
      }
      else
      {
        return{...ele}
      }
    })
    setSelectedCourses(toggledata);
    const deletedata = {
      roleId:toggle,
      state:stateid?2:1,
      deleteState:0,
      emailId:sepid,
      searchkey:courseSearchKey,
      pageno:currentPage,
      learningPath:"",
      seldep:learningPath,
      courseId:"",
    }
    deletecourseReviewer(deletedata);
  }
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
            Course Reviewer
          </p>
        </div>
        <div className="hrbuddy-modal-row">
          <AddCourseReviewer />
        </div>
      </div>
      <div className="hrbuddyListContainer bg-white">
        <div
          className="hrbuddyPageTitle pt-3 d-flex align-items-center px-4"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Course Reviewer List
          <span className="hrbuddyTotalCount ms-2">{coursemanagerlist ? coursemanagerlist.count : 0}</span>
        </div>
        <div className="row pb-3 pt-2 px-4 justify-content-between align-items-center">
          <div className="col-md-6 col-6 d-flex align-items-center">
            <div className="col-md-5 col-12">
              <div className="px-2 py-1 rounded CourseSearchContainer d-flex align-items-center justify-content-between border">
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
            </div>
            <div className="department-select col-md-5 col-12 ms-3">
              <select
                name="lp"
                id="select-department"
                className="p-2 rounded w-100"
                style={{
                  backgroundColor: "#fff",
                  outline: "1px solid #D6D6D6",
                }}
                onChange={(e) =>{
                  if(e.target.value == "All Learning Paths")
                  {
                    setLearningPath("");
                  }
                  else{
                    setLearningPath(e.target.value)}
                  }
                }
              >
                <option value="" selected hidden>
                  Select Learning Path
                </option>
                {lpnamereleventfilter?.length !== 0
                  ? lpnamereleventfilter.map((elem) => {
                      return (
                        <option value={elem}>
                          {elem}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 d-flex justify-content-end">
          {pageCount > 1 ? (
              <Pagination
                onChangeEventhandler={onChangeEventhandler}
                total={pageCount}
              />
            ) : null}
            </div>
        </div>
        <>
          <table className="table m-0">
            <thead className="thead">
              <tr className="trow w-100 conversion-accordian-row">
                <th>
                  <BsChevronDown className="first-th" />
                </th>
                <th className="col-4"></th>
                <th className="col-3">Course Assigned By</th>
                <th className="col-3">Course Assigned on</th>
                <th className="col-2">State</th>
              </tr>
            </thead>
          </table>
          <div className="Accordian-container overflow-y-scroll">
          {selectedCourses ? (
                  selectedCourses.length > 0 ? (
                    selectedCourses.map((items, index) => {
                      return (
            <Accordion>
              <Card className="conversion-card">
                <Card.Header className="conversion-card-header">
                  <ContextAwareToggle eventKey={1}>
                    <td className="col-4">
                      <div className="employee-details-col">
                        <div className="employee-details-col-img">
                        <img src={`https://storageaccountforprofile.blob.core.windows.net/profile/${items.emailId.split('@')[0]}.jpg`} alt="Employee" />
                        </div>
                        <div className="employee-details-col-name">
                          <p>{items.name}</p>
                          <p>{items.emailId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="col-3"></td>
                    <td className="col-3"></td>
                    <td className="col-2">
                      <label class="switch">
                      <input type="checkbox" checked={items.state == 1} onChange={()=>{handlecheckeditor(items.roleId,items.state,items.emailId)}}/>
                        <span class="slider round"></span>
                      </label>
                    </td>
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={1}>
                  <Card.Body className="conversion-card-body">
                    <div className="conversion-card-body-content">
                      {items.courses.length > 0?items.courses.map((elem)=>{
                        return(
                      <div
                        className="conversion-card-body-content-row"
                        style={{ borderBottom: "1px solid #E4E4E4" }}
                      >
                        <div
                          className="col-2"
                          style={{
                            paddingLeft: "0px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                          <p>{elem.learningPath}</p>
                        </div>
                        <div
                          className="col-2"
                          style={{
                            paddingLeft: "0px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                          <p>{elem.courseId}</p>
                        </div>
                        <div
                          className="col-3"
                          style={{
                            paddingLeft: "14px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                          <p>{elem.assignedBy}</p>
                        </div>
                        <div
                          className="col-3"
                          style={{
                            paddingLeft: "26px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                          <p>{moment(elem.assignedDate).format("DD/MM/YYYY")}</p>
                        </div>
                        <div className="col-2">
                          <RemoveCourseReviewer 
                            head="Remove Buddy"
                            content={`${items.name}'s access will be revoked from course ${elem.courseId} of learninPath ${elem.learningPath}?`}
                            mail={items.emailId}
                            learningPath={elem.learningPath}
                            courseId={elem.courseId}
                            currentPage={currentPage}
                            courseSearchKey={courseSearchKey}
                            toggle={items.roleId}
                            seldep={learningPath}
                          />
                        </div>
                      </div>
                      )
                    }):null}
                      {items.state == 1 && <div
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
                          <EditCourseReviewer items={items}/>
                        </div>
                      </div>}
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            );
          })
        ) : (
          <div className="w-100 text-nowrap nolpfoundtext ">
            No Course Reviewer found
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
          No Course Reviewer found
        </div>
      )}
          </div>
        </>
      </div>
    </div>
  );
}

export default CourseReviewer;
