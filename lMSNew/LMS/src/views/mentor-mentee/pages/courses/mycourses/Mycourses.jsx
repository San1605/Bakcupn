import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
// import Pagination from "../../../../../component/pagination/Pagination";
import noSamplerImg from "../../../../../assets/svg/dashboard/samplers/nosamplerfound.svg";
import { GlobalContext } from "../../../../../context/GlobalState";
import CourseCard from "../../../../../component/courseCard/CourseCard";
import NoCourseCard from "../../../../../component/courseCard/noCourseCard/NoCourseCard";
import { Bars } from "react-loader-spinner";
import moment from "moment";
import nocontent from "../../../../../assets/svg/learningstatus.svg";

function Mycourses() {
  const { getMyCourse, myCourses, navigate, loading, myCompletedcourses, dispatch } =
    useContext(GlobalContext);

  useEffect(() => {
    getMyCourse();
    dispatch({
      type:"ACCOUNT_NAV",
      payload:"10"
    })
    document.title = `My Courses | ${process.env.REACT_APP_APP_NAME}`;
  }, []);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [filtersearch, setFiltersearch] = useState([]);
  const searchit = () => {
    if (courseSearchKey === "") {
      setFiltersearch(myCompletedcourses);
    } else {
      if (myCompletedcourses.length > 0) {
        const searchSImplerFiles = myCompletedcourses.filter(
          (data) =>
            data.courseId.toLowerCase().indexOf(courseSearchKey.toLowerCase()) >
            -1
        );
        setFiltersearch(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    if (myCompletedcourses.length !== 0) {
      if (courseSearchKey == "") {
        searchit();
      }
    }
  }, [courseSearchKey, myCompletedcourses]);
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
      <div className="my-courses-page">
        <div className="row allCourses ">My Learning Paths</div>
        <div className="d-flex align-items-center justify-content-between">
          <p style={{ fontWeight: "500", fontSize: "16px" }}>Ongoing courses</p>
        </div>
        <div className="row mt-2 ">
          {myCourses.length > 0 ? (
            myCourses.map((elem) => {
              return (
                <div
                  className="col-lg-3 col-md-6 col-12 mycourses-page-row"
                  key={elem.id}
                >
                  <CourseCard courseInfo={elem} />
                </div>
              );
            })
          ) : (
            <div className="col-lg-3 col-md-6 col-12">
              <NoCourseCard />
            </div>
          )}
        </div>
        <p className="mt-3" style={{ fontWeight: "500", fontSize: "16px" }}>
          My Learning Status
        </p>
        <div className="col-12 mt-2">
          <div
            className="row bg-white uni-border"
            style={{ rowGap: "0.7rem", padding: "16px" }}
          >
            <div className="row  justify-content-between align-items-center">
              <div className="col-lg-3 col-md-6 col-12">
                {myCompletedcourses?.length !== 0 ? (
                  <div className="px-2 py-1 rounded CourseSearchContainer d-flex align-items-center justify-content-between border">
                    <input
                      type="search"
                      placeholder="Search"
                      className=" border-0 CourseSamplersearch col-10"
                      onChange={(e) => setCourseSearchKey(e.target.value)}
                      onKeyDown={(event) =>
                        event.key === "Enter" ? searchit() : null
                      }
                    />
                    <FiSearch
                      className="pointer col-2"
                      style={{ color: "#212121" }}
                      onClick={() => searchit()}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* <div className="col-lg-2 col-md-4 col-12">
                {pageCount > 1 ? (
                  <Pagination
                    onChangeEventhandler={onChangeEventhandler}
                    total={pageCount}
                  />
                ) : null}
              </div> */}
            </div>
            {/* <div className="ta" style={{ height: "170px" }}>
              <div className="row"> */}
            {myCompletedcourses?.length !== 0 ? (
              <div className=" mycourse-courseTable tableFixHead bg-white">
                <table className="table">
                  <thead className="thead" style={{ whiteSpace: "nowrap" }}>
                    <tr className="trow">
                      <th className="col-2 padding-left-th-td">Courses</th>
                      <th className="col-2">Learning Path</th>
                      <th className="col-2 ">Department</th>
                      <th className="col-2 ">Start Date</th>
                      <th className="col-2 ">Completion Date</th>
                      <th className="col-2 ">Status</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {filtersearch.length !== 0 ? (
                      filtersearch.map((items) => {
                        return (
                          <tr className="border-bottom">
                            <td
                              className="col-2 pointer padding-left-th-td lp-name-link"
                              onClick={() =>
                                navigate(`/mycurrentcourse/${items.courseId}`)
                              }
                            >
                              {items.courseId}
                            </td>
                            <td className="col-2">{items.technology}</td>
                            <td className="col-2 ">{items.department}</td>
                            <td className="col-2 ">
                              {moment(items.courseStartDate).format(
                                "DD/MM/YYYY"
                              )}
                            </td>
                            <td className="col-2 ">
                              {items.courseEndDate == null
                                ? "_"
                                : moment(items.courseEndDate).format(
                                    "DD/MM/YYYY"
                                  )}
                            </td>
                            <td
                              className="col-2"
                              style={
                                items.courseEndDate == null
                                  ? { color: "#E89F13" }
                                  : { color: "#05CD9A" }
                              }
                            >
                              {items.courseEndDate == null
                                ? "Paused"
                                : "Completed"}
                            </td>
                            {/* <td className="col-1 ">{items.rank}</td> */}
                          </tr>
                        );
                      })
                    ) : (
                      <div className="w-100 text-nowrap nolpfoundtext ">
                        No Courses were found
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                className=" mycourse-courseTable tableFixHead bg-white"
                style={{ height: "38vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <img
                    src={nocontent}
                    alt="noSamplerImg"
                    className="noSamplerImg"
                    style={{ height: "75%" }}
                  />
                  <p className="mt-3" style={{ fontSize: "14px" }}>
                    Start completing your courses...
                  </p>
                </div>
              </div>
            )}

            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Mycourses;
