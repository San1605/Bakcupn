import React, { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import "./coursemanagement.css";
import ConversionPagination from "../../../../../component/pagination/ConversionPagination";
import AddSamplerModal from "../../../components/learning-path-mangagement-modals/addSamplerModal/AddSamplerModal";
import AddLearningPathModal from "../../../components/learning-path-mangagement-modals/addLearningPathModal/AddLearningPathModal";
import { GlobalContext } from "../../../../../context/GlobalState";
import moment from "moment";
import { Bars } from "react-loader-spinner";
import AssignLpDepartment from "../../../components/learning-path-mangagement-modals/assignLPdepartment/AssignLpDepartment";
// import Data from "../../../utils/courseManagementData/Data";

function Coursemanagement(props) {
  const {
    navigate,
    lplistdata,
    lplistforlpm,
    coursemanagechangingdata,
    dispatch
  } = useContext(GlobalContext);
  const [department, setDepartment] = useState(coursemanagechangingdata.departmentname);
  const [departmentlist, setDepartmentlist] = useState([]);
  //Pagination code 👍
  const [courseSearchKey, setCourseSearchKey] = useState(coursemanagechangingdata.searchkey);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    if (Object.keys(lplistdata).length > 0) {
      if(department == "")
      {
        setSelectedCourses(lplistdata?.map["All Departments"]);
      }
      setDepartmentlist(lplistdata?.department);
    }
  }, [lplistdata]);

  useEffect(() => {
    document.title = `Course Management | ${process.env.REACT_APP_APP_NAME}`;
    lplistforlpm();
    if(!props.adminswitch)
    {
      dispatch({
        type:"ACCOUNT_NAV",
        payload:"12"
      })
    }
  }, []);
useEffect(()=>{
  const data ={
    searchkey:courseSearchKey,
    departmentname:department
  }
  dispatch({
    type:"CMDATA",
    payload:data
  })
},[courseSearchKey, department])
  const searchinit = () => {
    if (courseSearchKey === "" && department !== "") {
      setSelectedCourses(lplistdata?.map[`${department}`]);
    } else {
      if (selectedCourses.length > 0) {
        const temp = selectedCourses.filter(
          (elem)=>elem.learningPath.toLowerCase().includes(courseSearchKey.toLowerCase()))
          setSelectedCourses(temp);
      }
    }
  };
  useEffect(() => {
    if (department !== "") {
      setSelectedCourses(lplistdata.map[`${department}`]);
    }
  }, [department]);

  useEffect(() => {
    if (departmentlist.length > 0 && department == "") {
      setDepartment(departmentlist[0]);
    }
  }, [departmentlist]);
  useEffect(() => {
    if (Object.keys(lplistdata).length > 0) {
      if (courseSearchKey == "") {
        searchinit();
      }
    }
  }, [courseSearchKey]);
  return (
    <>
      <div className="courseManagementContainer">
        <div className=" d-flex align-items-center justify-content-between coursemanagement-head-row">
          <p
            className="courseManagementHead"
            style={{
              fontSize: "18px",
            }}
          >
            Learning Path Management
          </p>
          <div className="coursemanagement-modal-row">
            {/* {props.adminswitch ? (
              <> */}
                {lplistdata?.access?.showAssignDepartmentButton == 1 &&<AssignLpDepartment/>}
                {lplistdata?.access?.showAssignDepartmentButton == 1 &&<AddLearningPathModal />}
                {lplistdata?.access?.showAssignDepartmentButton == 1 &&<AddSamplerModal />}
              {/* </>
            ) : (
              <></>
            )} */}
            {/* <AddNewCourseModal /> */}
          </div>
        </div>
        <div className="coursemanagerListContainer lp-cards-container px-3 bg-white mt-2">
          <div
            className="resourcesPageTitle py-3 d-flex align-items-center"
            style={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Total Learning Paths
            <span className="resourcessTotalCount px-2">
              {lplistdata !== undefined ? lplistdata?.learningPaths?.length : 0}
            </span>
          </div>
          <div className="row py-2 pb-0 justify-content-between align-items-center">
            <div className="col-md-6 col-6 d-flex align-items-center">
              <div className="col-md-5 col-12"> 
                <div className="px-2 py-1 rounded CourseSearchContainer d-flex align-items-center justify-content-between border">
                  <input
                    type="search"
                    placeholder="Search"
                    className=" border-0 CourseSamplersearch col-10"
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
                  name="department"
                  id="select-department"
                  className="p-2 rounded w-100"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departmentlist.length > 0
                    ? departmentlist.map((elem, index) => {
                        return (
                          <option value={elem} key={index}>
                            {elem}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
            {/* <div className="col-md-4 col-12 d-flex justify-content-end">
              {pageCount > 1 ? (
                <ConversionPagination
                  onChangeEventhandler={onChangeEventhandler}
                  total={pageCount}
                  currentPage={currentPage}
                />
              ) : null}
            </div> */}
          </div>
          <div className="lp-cards-div">
            {selectedCourses ? (
              selectedCourses.length > 0 ? (
                selectedCourses.map((items) => {
                  return (
                    <div
                      className="lpcard pointer"
                      onClick={() =>
                        props.adminswitch
                          ? navigate(
                              `/admin/coursesmanagement/${items.learningPath}`
                            )
                          : navigate(
                              `/singlepathmanagement/${items.learningPath}`
                            )
                      }
                    >
                      <div className="lpcard-img-div">
                        <img
                          src={`https://celeballmsstorage.blob.core.windows.net/thumbnailforlp/${items.learningPath}`}
                          alt="lpcardimg"
                          onError={(e) => {
                            e.target.src = `https://celeballmsstorage.blob.core.windows.net/thumbnailforlp/default`;
                          }}
                          className="lpcard-img"
                        />
                      </div>
                      <div className="lpcard-content">
                        <div className="lpcard-content-row">
                          <p className="lpcard-lpname">{items.learningPath}</p>
                          <p>
                            LP Manager -&nbsp;
                            {items.name ? items.name : "NA"}
                          </p>
                          <p>
                            Last Modified on -&nbsp;
                            {items.lastModifiedOn == null
                              ? "_"
                              : moment(items.lastModifiedOn).format("D/M/YYYY")}
                          </p>
                        </div>
                        <div className="lpcard-block-row">
                          <div className="lpcard-content-row">
                            <p>Created By</p>
                            <p>{items.addedBy}</p>
                          </div>
                          <div className="lpcard-content-row">
                            <p>Duration</p>
                            <p>{items.pathDuration}</p>
                          </div>
                          <div className="lpcard-content-row">
                            <p>No. of Courses</p>
                            <p> {items.noOfCourses}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                "No Learning Paths Found"
              )
            ) : (
              <Bars
                height="30"
                width="30"
                color="#4F52B2"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="page-loader"
                visible={true}
                className="mt-4"
                style={{ top: "60% !important" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Coursemanagement;
