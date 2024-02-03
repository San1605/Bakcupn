import React, { useEffect, useState } from "react";
import { recommendCourseCardDetails } from "../../../../utils/recommendCourseData/data";
import CourseCard from "../../../../component/courseCard/CourseCard";
import RecommendedCourseCard from "../../../../component/recommendedCourseCard/RecommendedCourseCard";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./course.css";
import { useContext } from "react";
import Pagination from "../../../../component/pagination/Pagination";
import { Bars } from "react-loader-spinner";
import NoCourseCard from "../../../../component/courseCard/noCourseCard/NoCourseCard";
import { GlobalContext } from "../../../../context/GlobalState";
function Courses() {
  const {
    getMyCourse,
    myCourses,
    // getTechnogoies,
    // getTechnogoiesInfo,
    navigate,
    // allCousersData,
    getAllCourses,
    loading,
    getallpath,
    allunenrolledpath,
    getsingleunenrolledpath,
    departmentlist,
    departmentlistdata,
    depselforallpath,
    dispatch,
  } = useContext(GlobalContext);

  // const [recommendedCourseCardData, setrecommendedCourseCardData] = useState(
  //   []
  // );
  const [pageCount, setPageCount] = useState(0);
  const [department, setDepartment] = useState("");
  // const [selectedTechnologies, SetSelectedTechnologies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [courseSearchKey, setCourseSearchKey] = useState("Search");
  const [selectedCourses, setSelectedCourses] = useState([]);
  // const [techSearchKey, setTechSearchKey] = useState("");
  // const [selectedAllTechnologies, SetSelectedAllTechnologies] = useState(getTechnogoiesInfo);

  useEffect(() => {
    // getallpath(1, 10);
    // getTechnogoies();
    departmentlist();
    getMyCourse();
    dispatch({
      type:"ACCOUNT_NAV",
      payload:"11"
    })
    document.title = `Courses | ${process.env.REACT_APP_APP_NAME}`;
  }, []);

  useEffect(() => {
    if (departmentlistdata.length > 0) {
      console.log(depselforallpath,"dep");
      if(depselforallpath !== "")
      {
        setDepartment(depselforallpath);
      }
      else{
        setDepartment(departmentlistdata[0].Department);
      }
    }
  }, [departmentlistdata]);

  useEffect(() => {
    if (allunenrolledpath) {
      setPageCount(allunenrolledpath?.pages?.Total_Pages);
      setSelectedCourses(allunenrolledpath?.Lps);
    }
  }, [allunenrolledpath]);

  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    getallpath(selectedpageno, department, courseSearchKey);
  };

  const searchinit = () => {
    if (courseSearchKey === "" && department !== "") {
      setSelectedCourses(allunenrolledpath?.Lps);
      getallpath(currentPage, department, courseSearchKey);
    } else {
      if (allunenrolledpath?.Lps.length > 0) {
        getallpath(currentPage, department, courseSearchKey);
      }
    }
  };
  useEffect(()=>{
    if(Object.keys(allunenrolledpath).length !== 0)
    {
      if(courseSearchKey == "")
      {
        searchinit();
      }
    }
  },[courseSearchKey,,department])
  useEffect(() => {
    if (department !== "") {
      setCourseSearchKey("")
      getallpath(currentPage, department, "");
    }
  }, [department]);

  return (
    <>
      {loading === true ? (
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
      ) : null}
      <div className="col-12">
        <div className="row other-courses-row">
          <p className="mt-2" style={{ fontWeight: "600", fontSize: "18px" }}>
            All Learning Paths
          </p>
          <div
            className="col-12 courses-list-container mt-2"
            style={{ borderRadius: "6px" }}
          >
            <div
              className="row uni-border bg-white "
              style={{ padding: "16px", borderRadius: "6px" }}
            >
              <div className="row p-2 pb-0 justify-content-between align-items-center">
                <div className="col-md-6 col-6 d-flex align-items-center">
                  <div className="col-md-5 col-12">
                    <div className="px-2 py-1 rounded CourseSearchContainer d-flex align-items-center justify-content-between border">
                      <input
                        type="search"
                        placeholder="Search"
                        className=" border-0 CourseSamplersearch col-10"
                        value={courseSearchKey}
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
                      onChange={(e) =>{
                         setDepartment(e.target.value)
                         dispatch({
                          type:"ASSIGN_DEP",
                          payload:e.target.value
                         })
                        }}
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
              <div
                className="row"
                style={{ marginTop: "14px" }}
                // style={{ height: "240px" }}
              >
                {/* <div className="Coursetile d-flex">
                  {selectedTechnologies.map((stech, index) => {
                    return (
                      <div
                        key={index}
                        className="filtertile m-2 px-3 py-1 d-flex align-items-center justify-content-between"
                      >
                        <span
                          style={{
                            paddingRight: "1rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {stech}
                        </span>
                        <span
                          style={{ color: "#4F52B2" }}
                          onClick={() => selectUnTech(stech)}
                          className="closeremovepointer"
                        >
                          <AiOutlineCloseCircle />
                        </span>
                      </div>
                    );
                  })}
                </div> */}
                <div className="lpListContainer">
                  <div
                    className="courseTable uni-border bg-white overflow-y-scroll"
                    style={{ height: "100%" }}
                  >
                    <table className="table">
                      <thead className="thead ">
                        <tr className="trow">
                          <th className="col-3">Learning Path</th>
                          <th className="col-3">No. of Courses</th>
                          <th className="col-3 ">Course Duration(Days)</th>
                          <th className="col-3 ">LP Manager</th>
                        </tr>
                      </thead>
                      <tbody className="tbody">
                      {selectedCourses ? (
                    selectedCourses.length > 0 ? (
                      selectedCourses.map((items, index) => {
                        return (
                              <tr
                                className=" pointer"
                                key={index}
                                style={{ fontSize: "12px" }}
                              >
                                <td
                                  className="col-3 pointer lp-name-link"
                                  onClick={() =>
                                    navigate(
                                      `/enrollpath/${items.learningPath}`
                                    )
                                  }
                                >
                                  {items.learningPath}
                                </td>
                                <td className="col-3 ">{items.noOfCourses}</td>
                                <td className="col-3 ">{items.pathDuration}</td>
                                <td className="col-3 ">{items.addedBy}</td>
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
          </div>
        </div>
      </div>
      {/* <div className="col-lg-3 col-12 bg-white p-2">
        <div className="px-2 mb-2">
          <p style={{ fontWeight: "500", fontSize: "18px" }}>
            Recommended courses
          </p>
        </div>
        <div className="row overflow-y-scroll" style={{ height: "82vh" }}>
          <div className="row recommended-course-container">
            {recommendedCourseCardData.map((elem) => {
              return (
                <div
                  className=" col-lg-4 col-md-6 col-12 p-2 recommended-coursecard"
                  key={elem.id}
                >
                  <RecommendedCourseCard courseInfo={elem} />
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Courses;



// onClick={() =>
//   navigate(
//     `/enrollpath/${items.learningPath}`
//   )
// }