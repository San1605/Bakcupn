import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../courseCard/CourseCard";
import { courseCardDetails } from "../../../utils/courseCardData/data";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../pagination/Pagination";
import CompletedCourseList from "../../pagination/CompletedCourseList";
import Data from "../../pagination/Data";

function tempcourses() {
  const navigatetomycourse = useNavigate();
  const [courseCardData, setCourseCardData] = useState([]);

  useEffect(() => {
    setCourseCardData(courseCardDetails);
    setPageCount(Math.ceil(Data.length / coursePerPage));
  }, [Data]);

  const [pageCount, setPageCount] = useState(0);
  const [coursePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeEventhandler = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentCourse = Data.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <>
      <div>
        <div
          className="row media-padding"
          style={{ padding: " 0.5rem 1rem 0rem 2rem" }}
        >
          <div
            className="d-flex px-2"
            style={{ columnGap: "0.25rem", fontSize: "14px" }}
          >
            <div className="pointer">All Courses</div>
            <div className="">{">"}</div>
            <div className="text-primary pointer">My Courses</div>
          </div>
          <div
            className="px-2 row allCourses "
            style={{ fontWeight: "500", fontSize: "24px" }}
          >
            All Courses
          </div>
          <div className="row">
            <div className="px-2 d-flex align-items-center justify-content-between">
              <p style={{ fontWeight: "500", fontSize: "20px" }}>
                Ongoing Courses
              </p>
            </div>
            <div className="row ">
              {courseCardData.map((elem) => {
                return (
                  <div
                    className="col-lg-3 col-md-6 col-12 p-2 pointer"
                    key={elem.id}
                    onClick={() => navigatetomycourse("/mycurrentcourse")}
                  >
                    <CourseCard courseInfo={elem} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 " style={{ paddingLeft: "1rem" }}>
        <div className="px-2 d-flex align-items-center justify-content-between">
          <p style={{ fontWeight: "500", fontSize: "20px" }}>
            Completed Courses
          </p>
        </div>
        <div
          className="row bg-white "
          style={{ rowGap: "0.7rem", paddingTop: "1rem" }}
        >
          <div className="row  px-4 justify-content-between align-items-center">
            <div className="col-md-4 col-12">
              <div className="px-2 py-1 rounded CourseSearchContainer d-flex align-items-center justify-content-between border">
                <input
                  type="search"
                  placeholder="Search"
                  className=" border-0 CourseSamplersearch col-10"
                />
                <FiSearch
                  className="pointer col-2"
                  style={{ color: "#212121" }}
                />
              </div>
            </div>
            <div className="col-md-4 py-1 col-12">
              <Pagination
                onChangeEventhandler={onChangeEventhandler}
                total={pageCount}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="courseTable bg-white overflow-scroll"
              style={{ height: "201px" }}
            >
              {/* Courses Table*/}
              <CompletedCourseList data={currentCourse} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default tempcourses;
