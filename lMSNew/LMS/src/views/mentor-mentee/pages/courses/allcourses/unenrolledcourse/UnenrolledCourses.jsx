import React, { useContext } from "react";
import ReactPlayer from "react-player";
import "./unenrolledcourse.css";
import arrow from "../../../../../../assets/svg/unenrolledCourses/arrow.svg";
import clock from "../../../../../../assets/svg/unenrolledCourses/clock.svg";
import EnrolledContent from "../../coursecontent/EnrolledContent";
import { useEffect } from "react";
import { GlobalContext } from "../../../../../../context/GlobalState";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import defaultimg from "../../../../../../assets/svg/unenrolledCourses/default.svg";
function UnenrolledCourses() {
  const param = useParams();
  const { navigate, singleCourseInfo, courseDataById } =
    useContext(GlobalContext);
  useEffect(() => {
    if (param) {
      courseDataById(param.id);
    }
  }, []);

  return Object.keys(singleCourseInfo).length !== 0 ? (
    <div className="row">
      <div className="col-md-8 col-12 unenrolled-course-page">
        <div
          className="d-flex bredcumb-header"
          style={{ columnGap: "8px", fontSize: "12px" }}
        >
          <p className="pointer" onClick={() => navigate("/courses")}>
            All Learning Paths
          </p>
          <p>&#x3e;</p>
          <p
            className="pointer"
            onClick={() =>
              navigate(`/enrollpath/${singleCourseInfo.technology}`)
            }
          >
            {singleCourseInfo.technology}
          </p>
          <p>&#x3e;</p>
          <p style={{ color: "#4F52B2", cursor: "default" }}>
            {singleCourseInfo.courseId}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="d-flex"
            style={{ columnGap: "1rem", fontSize: "1.5rem" }}
          >
            <div
              className="align-items-top pointer"
              style={{ paddingTop: ".7rem" }}
              onClick={() =>
                navigate(`/enrollpath/${singleCourseInfo.technology}`)
              }
            >
              <img src={arrow} alt="leftArrowIcon" width="20px" />
            </div>
            <div className="py-3">
              <p className="courseHeading" style={{ fontSize: "18px" }}>
                {singleCourseInfo.courseId}
              </p>
              {/* <p className="courseContent">
                No. of enrollments: {singleCourseInfo.totalEnrollments}
              </p> */}
            </div>
          </div>
        </div>
        <div
          className="itschild d-flex justify-content-center coursePlayerContainer"
          style={{ borderRadius: "8px", background: "white" }}
        >
          <img src={defaultimg} alt="defaultimg" style={{ height: "100%" }} />
        </div>
        <div
          className="videoDescriptionSection px-2 mb-3
        "
        >
          <div className="aboutCourse row">
            <div
              className="aboutHeading col-md-5 col-12  "
              style={{ fontSize: "18px" }}
            >
              About the Course
            </div>
            <div className="row col-lg-6 col-12 aboutCourseButtons">
              <div className="courseDuration col-3">
                <span>{singleCourseInfo.complexity}</span>
              </div>
              <div className="courseDuration col-3 ">
                <span className="d-flex" style={{ paddingRight: "10px" }}>
                  <img src={clock} alt="clock" />
                </span>
                <span>{singleCourseInfo.days} days</span>
              </div>
              <div className="courseDuration col-3">
                <span>Levels : {singleCourseInfo.level}</span>
              </div>
            </div>
          </div>
          <div className=" allCourseDescription px-2">
            {singleCourseInfo.description}
          </div>
        </div>
      </div>
      <div
        className="col-md-4 col-12 unenrolled-page-content-tab"
        style={{ height: "90vh" }}
      >
        <div className="h-100 bg-white">
          <div
            className="h-10 courseContentContainer"
            style={{ fontWeight: "600" }}
          >
            <p className="ps-1">Course Content</p>
          </div>
          <div
            className="h-90 unenrollcourse-div"
            style={{ overflowY: "auto" }}
          >
            {singleCourseInfo.topics.map((elem, index) => {
              return <EnrolledContent coursecontent={elem} key={index} />;
            })}
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
  );
}
export default UnenrolledCourses;
