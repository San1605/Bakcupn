import React, { useContext, useState, useEffect } from "react";
import Kpicard from "../../../../component/kpiCards/Kpicard";
import CourseCard from "../../../../component/courseCard/CourseCard";
import LearningPathCard from "../../../../component/learningPathCard/LearningPathCard";
import SamplersCard from "../../../../component/samplerCard/SamplersCard";
import { FiSearch } from "react-icons/fi";
import LeaderBoardCard from "../../../../component/leaderboardCard/LeaderBoardCard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Calender from "../../../../component/calender/Calender";
import "./content.css";
import { GlobalContext } from "../../../../context/GlobalState";
import courseCompleted from "../../../../assets/svg/dashboard/kpicards/courseCompleted.svg";
import progresslp from "../../../../assets/svg/dashboard/kpicards/progresslp.svg";
import pausedlp from "../../../../assets/svg/dashboard/kpicards/pausedlp.svg";
import enrolledlp from "../../../../assets/svg/dashboard/kpicards/enrolledlp.svg";
import NoCourseCard from "../../../../component/courseCard/noCourseCard/NoCourseCard";
import TicketCardHome from "../../../../component/ticketsCard/TicektCardHome";
import { Bars } from "react-loader-spinner";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

function MenteeDashboard(props) {
  const {
    courseCompletionData,
    getCourseCompletionNumber,
    getMyCourse,
    myCourses,
    sampleFiles,
    getSamplerFile,
    navigate,
    loading,
    checkadmin,
    userToken,
    getTicketStatusInfo,
    ticketStatusInfo,
  } = useContext(GlobalContext);

  const [searchStr, setSearchStr] = useState("");
  const [filterSimpleFiles, setFilterSimpleFiles] = useState([]);
  useEffect(() => {
    props.setAdminswitch(false);
    getMyCourse();
    getSamplerFile();
    getCourseCompletionNumber();
    checkadmin(userToken, false);
    document.title = `Dashboard | ${process.env.REACT_APP_APP_NAME}`;
  }, []);
  const searchinit = () => {
    if (searchStr === "") {
      setFilterSimpleFiles(sampleFiles);
    } else {
      if (sampleFiles.length > 0) {
        const searchSImplerFiles = sampleFiles.filter(
          (data) =>
            data.blobname.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
        );
        setFilterSimpleFiles(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    if (searchStr == "") {
      searchinit();
    }
  }, [searchStr, sampleFiles]);

  useEffect(() => {
    getTicketStatusInfo();
    if (props?.notFoundRoute === true) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    }
  }, []);

  tippy(".leaderboardinfo-icon", {
    content:
      '<div class="leaderboardinfo-icon-tooltip-container"> <p class="leaderboardinfo-icon-tooltip-text">The rank is calculated as per the score of individual and course completion time</p> </div>',
    allowHTML: true,
    placement: "bottom",
    arrow: true,
    animation: "fade",
  });
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
      <div
        className="col-lg-9 col-12 "
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="row media-padding"
          style={{ padding: " .75rem 1rem 0rem 2.5rem", flex: "1" }}
        >
          <div className="row mt-1 ">
            <div className="col-lg-3 col-md-6 col-12 pe-2">
              <Kpicard
                kpi={{
                  id: 0,
                  color: "#E1F0FFE5",
                  image: enrolledlp,
                  title: "Enrolled Learning Path",
                  innerno: courseCompletionData?.enrolled,
                }}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-12 pe-2">
              <Kpicard
                kpi={{
                  id: 1,
                  color: "#FFE7D5B2",
                  image: progresslp,
                  title: "Learning Path in Progress",
                  innerno: courseCompletionData?.inProgress,
                }}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-12 pe-2">
              <Kpicard
                kpi={{
                  id: 2,
                  color: "#E9FFE5",
                  image: courseCompleted,
                  title: "Courses Completed",
                  innerno: courseCompletionData?.completed,
                }}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <Kpicard
                kpi={{
                  id: 3,
                  color: "#FFE9E9B2",
                  image: pausedlp,
                  title: "Paused Learning Path",
                  innerno: courseCompletionData?.paused,
                }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="d-flex align-items-center justify-content-between mt-2 mb-1">
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "19px",
                  marginBottom: "4px",
                }}
              >
                Ongoing Courses
              </p>
              {/* {myCourses.length > 0 ? (
                <p
                  className="view-all-btn pointer"
                  onClick={() => navigate("/mycourses")}
                >
                  View All
                </p>
              ) : null} */}
            </div>
            <div className="row ">
              {myCourses.length > 0 ? (
                myCourses.map((elem, index) => {
                  return (
                    <div
                      className="col-lg-4 col-md-6 col-12 pb-2 my-course-card-row"
                      key={index}
                    >
                      <CourseCard courseInfo={elem} />
                    </div>
                  );
                })
              ) : (
                <div className="col-lg-4 col-md-6 col-12 mb-2">
                  <NoCourseCard />
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{ flex: "1", paddingBottom: "1rem" }}
          className="row sampler-path-row mt-1"
        >
          <div className="col-md-6 col-12 uni-border bg-white learning-path-box-shadow">
            <LearningPathCard />
          </div>
          <div className="col-md-6 col-12 sampler-container ">
            <div className="bg-white h-100 uni-border py-2 px-3 sampler-card-container ">
              <div className="sampler-head d-flex justify-content-between  py-2 mb-1">
                <p
                  className="col-4 px-1"
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                >
                  General Files
                </p>
                <div className="col-6 px-2 uni-border searchContainer d-flex align-items-center justify-content-between">
                  <input
                    type="search"
                    placeholder="Search"
                    className=" border-0 sampler-search col-10"
                    onChange={(e) => setSearchStr(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchinit() : null
                    }
                  />
                  <FiSearch
                    className="pointer col-2"
                    onClick={() => searchinit()}
                  />
                </div>
              </div>
              <SamplersCard sampleFiles={filterSimpleFiles} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-12 bg-white h-100 ">
        <div
          className=" h-100 dash-col3-div overflow-y-scroll"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            paddingRight: "2rem",
          }}
        >
          <a
            className="workshop-div"
            href="https://testworkshops.azurewebsites.net/"
            target={"blank"}
          >
            Workshops »
          </a>

          <div style={{ marginBottom: "1vh" }}>
            {/* <div className="border uni-border p-2 h-100 px-3">
              <div className="d-flex justify-content-between px-1 py-1">
                <p
                  className="col-9 "
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  Leaderboard
                </p>

                <div className=" col-2 px-2 rounded d-flex align-items-center justify-content-end ">
                  <AiOutlineInfoCircle
                    className="leaderboardinfo-icon pointer"
                    style={{ color: "#4F52B2" }}
                  />
                </div>
              </div>
              <LeaderBoardCard />
            </div> */}
            <div
              className="border uni-border p-2 px-3 duedate-div"
              style={{
                background: "#f5f5ff",
                height: "100%",
              }}
            >
              <div className="d-flex justify-content-between px-1 ">
                <p
                  className="col-9 pt-1"
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                >
                  Due Dates
                </p>
              </div>
              <Calender />
            </div>
          </div>
          <div className="" style={{ flexGrow: "0", marginTop: "1vh" }}>
            <div className="border rounded " style={{ padding: "8px 16px" }}>
              <div className="d-flex justify-content-between px-1 pt-1">
                <p
                  className="col-9 "
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                >
                  Tickets
                  <span className="menteesTotalCount">
                    {ticketStatusInfo.raised}
                  </span>
                </p>
              </div>
              <div>
                <TicketCardHome />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenteeDashboard;
