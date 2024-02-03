import React, { useContext, useEffect, useState } from "react";
import emptyLeaderboardIcon from "../../assets/svg/dashboard/leaderBoard/leaderboard-empty-icon.svg";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalState";
import "./leaderboardCard.css";
function LeaderBoardCard() {
  const { userMail,getLeaderBoard,leaderboardData } = useContext(GlobalContext);
  const [courses, setCourses] = useState([]);
  const [currentSelectCourse, setCurrentSelectCourse] = useState("");
  const [filterrankData, setFilterRankdata] = useState([]);

  useEffect(()=>{
    getLeaderBoard();
  },[])
  useEffect(() => {
    const uniqueCourse = [
      ...new Set(leaderboardData.map((item) => item.courseCode)),
    ];
    setCourses(uniqueCourse);
    if (uniqueCourse.length > 0) {
      setCurrentSelectCourse(uniqueCourse[0]);
    }
  }, [leaderboardData]);

  const changecourse = (ekey) => {
    if (courses.length > 0) {
      const currentIndex = courses.indexOf(currentSelectCourse);
      if (ekey === -1) {
        if (currentIndex !== 0) {
          setCurrentSelectCourse(courses[currentIndex - 1]);
        }
      } else {
        if (courses.length - 1 > currentIndex) {
          setCurrentSelectCourse(courses[currentIndex + 1]);
        }
      }
    }
  };

  useEffect(() => {
    if (currentSelectCourse !== "" && leaderboardData.length > 0) {
      const filtercData = leaderboardData.filter(
        (data) => data.courseCode === currentSelectCourse
      );
      setFilterRankdata(filtercData);
    }
  }, [currentSelectCourse]);

  return (
    <>
      {filterrankData.length < 0 ? (
        <div className="px-1 mt-1">
          <div className="row d-flex align-items-center justify-content-around leaderBoardCourse leaderBoardCourse-nav">
            <div className="left-course-shift col-1 ">
              <MdNavigateBefore
                className="courseNavIcon pointer"
                onClick={() => changecourse(-1)}
              />
            </div>
            <div className="leaderBoardCourseName col-8 d-flex align-items-center justify-content-center overflow-hidden">
              <p>{currentSelectCourse}</p>
            </div>
            <div className="right-course-shift col-1">
              <MdNavigateNext
                className="courseNavIcon pointer"
                onClick={() => changecourse(1)}
              />
            </div>
          </div>
          <div className="row mt-2 d-flex align-items-center justify-content-between myRank mt-1 px-3 py-1 text-white">
            <div className="col-8">My Rank</div>
            <div className="col-2 ps-1">
              {filterrankData &&
              filterrankData.filter((data) => data.emailId === userMail)
                .length > 0
                ? filterrankData.filter((data) => data.emailId === userMail)[0]
                    .rank
                : "-"}
            </div>
          </div>
          <div className="overflow-y-scroll rankers">
            {filterrankData &&
              filterrankData.map((eachrank, index) => {
                if (eachrank.emailId !== userMail) {
                  return (
                    <div
                      className="row d-flex align-items-center justify-content-between px-3 ranklist"
                      key={index}
                    >
                      <div className="col-8" style={{ fontSize: "13px" }}>
                        {eachrank.name}
                      </div>
                      <div className="col-2 " style={{paddingLeft:"5px"}}>
                        <b>{eachrank.rank}</b>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      ) : (
        <div style={{flexGrow:"1",height:"90%"}} className="d-flex flex-column align-items-center justify-content-center">
          <img
            src={emptyLeaderboardIcon}
            alt="noSamplerImg"
           
            
          />
          <p className="mt-3 text-center" style={{ fontSize: "12px", color: " #424242" }}>
            Start learning to get your rank on leaderboard
          </p>
        </div>
      )}
    </>
  );
}

export default LeaderBoardCard;
