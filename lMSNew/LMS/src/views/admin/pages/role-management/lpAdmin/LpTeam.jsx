import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../../../../component/pagination/Pagination";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import AddTeamMember from "../../../components/rolemanagementModals/addModals/AddTeamMember";
import EditTeamMember from "../../../components/rolemanagementModals/editModals/EditTeamMember";
import RemoveTeamMember from "../../../components/rolemanagementModals/removeModal/RemoveTeamMember";
import { useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../../../../context/GlobalState";

function LpTeam() {
  const {lpinnerlistdata, innerlpteam, lpnamesapi, lpnamelist, deleteinnerlp} = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const [paramsobj,setParamsobj] = useState({})
  //Pagination code 👍
  useEffect(()=>{
      setParamsobj({ name: searchParams.get('name'), lp:searchParams.get('lp')});
  },[])
  const [pageCount, setPageCount] = useState(0);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [searchcourse, setSearchcourse] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    innerlpteam(selectedpageno, courseSearchKey, paramsobj.lp, searchcourse);
  };

  useEffect(() => {
    if (lpinnerlistdata) {
      setPageCount(lpinnerlistdata?.pages?.Total_Pages);
      setSelectedCourses(lpinnerlistdata?.list);
    }
  }, [lpinnerlistdata]);

  useEffect(() => {
    lpnamesapi();
  }, []);

  useEffect(()=>{
    if(searchcourse !== "" && Object.keys(paramsobj).length > 0)
    {
      innerlpteam(currentPage, courseSearchKey, paramsobj.lp, searchcourse);
    }
   },[searchcourse])

  const searchinit = () => {
    if (courseSearchKey === "") {
      setSelectedCourses(lpinnerlistdata?.list);
      innerlpteam(currentPage, courseSearchKey, paramsobj.lp, searchcourse);
    } else {
        innerlpteam(currentPage, courseSearchKey, paramsobj.lp, searchcourse);
      }
  };
  useEffect(() => {
    if (courseSearchKey == "" && Object.keys(paramsobj).length > 0) {
      searchinit();
    }
  }, [courseSearchKey, paramsobj]);

  
  const handlelpteam = (toggle,stateid,sepid, sepcourse, seprole)=>{
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
      courseId:sepcourse,
      role:seprole,
      pageno:currentPage,
      learningPath:paramsobj?.lp,
      selcour:searchcourse,
    }
    deleteinnerlp(deletedata);
  }

  return Object.keys(paramsobj).length > 0 && (
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
            {paramsobj.name}
          </p>
        </div>
        <div className="hrbuddy-modal-row">
          <AddTeamMember lp={paramsobj.lp}/>
        </div>
      </div>
      <div className="hrbuddyListContainer bg-white">
        <div
          className="hrbuddyPageTitle pt-3 d-flex align-items-center px-4"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          {`${paramsobj.lp} Team`}
          <span className="hrbuddyTotalCount ms-2">{lpinnerlistdata? lpinnerlistdata.count : 0}</span>
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
                  if(e.target.value == "All Courses")
                  {
                    setSearchcourse("");
                  }
                  else{
                    setSearchcourse(e.target.value)}
                  }
                }
              >
                <option value="" selected hidden>
                  Select Course
                </option>
                {Object.keys(lpnamelist).length > 0
                  ? lpnamelist[`${paramsobj?.lp}`].concat("All Courses").map((elem) => {
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
        <div style={{ overflow: "hidden", height: "calc(100vh - 250px)" }}>
          <div
            className="row col-12 tableFixHead"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}
          >
            <table className="table">
              <thead className="thead">
                <tr className="trow">
                  <th className="col-3 ps-4">Employee Name</th>
                  <th className="col-2">Course Name</th>
                  <th className="col-1">Role Assigned</th>
                  <th className="col-2 ps-5">Role Assigned by</th>
                  <th className="col-1">State</th>
                  <th className="col-1">Action</th>
                  <th className="col-2">Access Details</th>
                </tr>
              </thead>
              <tbody>
              {selectedCourses ? (
                  selectedCourses.length > 0 ? (
                    selectedCourses.map((items, index) => {
                      return (
                <tr>
                  <td className="col-3 ps-4">
                    <div className="employee-details-col">
                    <div className="employee-details-col-img">
                        <img src={`https://storagefortimetrigger.blob.core.windows.net/profile/${items.emailId.split('@')[0]}.jpg`} alt="Employee" />
                        </div>
                        <div className="employee-details-col-name">
                          <p>{items.name}</p>
                          <p>{items.emailId}</p>
                        </div>
                    </div>
                  </td>
                  <td className="col-2 ps-2">{items.courseId}</td>
                  <td className="col-1 ps-2">{items.role}</td>
                  <td className="col-2 ps-5">{items.assignedBy}</td>
                  <td className="col-1 ps-2">
                    <label class="switch">
                    <input type="checkbox" checked={items.lpManagerState == 1} onChange={()=>{items.state == 1 && handlelpteam(items.roleId,items.lpManagerState,items.emailId, items.courseId, items.role)}}/>
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td className="col-1">
                    <RemoveTeamMember 
                     head="Remove member"
                     content={`Are you sure, you want to remove ${items.name} as Team Member?`}
                     mail={items.emailId}
                     learningPath={paramsobj.lp}
                     currentPage={currentPage}
                     courseId={items.courseId}
                     courseSearchKey={courseSearchKey}
                     toggle={items.roleId}
                     selcour={searchcourse}
                     role={items.role}
                     />
                  </td>
                  <td className="col-2">
                    <div className="d-flex align-items-center justify-content-start gap-3 ps-3">
                      <EditTeamMember items={items} lp={paramsobj.lp}/>
                    </div>
                  </td>
                </tr>
                );
              })
            ) : (
              <div className="w-100 text-nowrap nolpfoundtext ">
                No Member found
              </div>
            )
          ) : (
            <div className="w-100 text-nowrap nolpfoundtext ">
              No Member found
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

export default LpTeam;
