import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import EnrollCourseModal from "../../../../../component/enrollCourseModal/EnrollCourseModal";
import "./unenrolledPath.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
function UnenrolledPath() {
  const pathname = useParams();
  const { navigate, singlePathInfo, getsingleunenrolledpath } =
    useContext(GlobalContext);
  // const courseDetails = (courseID) => {
  //   courseDataById(courseID);
  // };
  useEffect(() => {
    if (pathname) {
      getsingleunenrolledpath(pathname.id);
    }
  }, []);
  return (
    <>
      {Object.keys(singlePathInfo).length !== 0 ? (
        <div className="learning-path-page">
          <div
            className="d-flex bredcumb-header"
            style={{ columnGap: "8px", fontSize: "12px" }}
          >
            <p className="pointer" onClick={() => navigate("/courses")}>
              All Learning Paths
            </p>
            <p>&#x3e;</p>
            <p style={{ color: "#4F52B2" }}>{singlePathInfo.lp}</p>
          </div>
          <div className="learning-path-head-row py-2">
            <p className="learning-path-heading" style={{ fontSize: "18px" }}>
              Learning Path
            </p>
          </div>
          <div className="lp-course-table bg-white">
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center">
                <div className="learning-path-name">{singlePathInfo.lp}</div>
                <div
                  className="learning-path-course-count ps-2"
                  style={{ fontSize: "16px" }}
                >
                  {singlePathInfo.noOfCourses} &nbsp;
                  {singlePathInfo.noOfCourses == 1 ? "Course" : "Courses"}
                </div>
              </div>
              <div>
                <EnrollCourseModal pathname={singlePathInfo.lp} />
              </div>
            </div>
            <div className="lp-courses-list-container mt-2">
              <div
                className="uni-border bg-white overflow-y-scroll"
                style={{ height: "100%" }}
              >
                <table className="table">
                  <thead className="thead ">
                    <tr className="trow">
                      <th className="col-2 first-table-col nowrap">S.No.</th>
                      <th className="col-2 nowrap">Course Name</th>
                      <th className="col-6 nowrap">Description</th>
                      <th className="col-2 nowrap">Duration(days)</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {singlePathInfo.courses?.map((elem, index) => {
                      return (
                        <tr
                          className="border-bottom pointer  "
                          style={{ fontSize: "12px" }}
                          onClick={() =>
                            elem.enrolled == 0?navigate(`/singlecourse/${elem.courseId}`):navigate(`/mycurrentcourse/${elem.courseId}`)
                          }
                        >
                          <td className="col-2 first-table-col pointer fw-500">
                            {index + 1}
                          </td>
                          <td className="col-2 fw-500">{elem.courseId}</td>
                          <td className="col-6 fw-500">
                            <div className="course-desc">
                              <p className="text-truncate">
                                {elem.description}
                              </p>
                            </div>
                          </td>
                          <td className="col-2 fw-500">{elem.days}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
export default UnenrolledPath;
