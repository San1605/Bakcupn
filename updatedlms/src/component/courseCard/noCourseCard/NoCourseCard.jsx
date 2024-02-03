import React, { useContext } from "react";
import "./nocourseCard.css";
import NoCourseImg from "../../../assets/svg/dashboard/coursecard/noOngoingCourse.svg";
import blankcard from "../../../assets/svg/blankcard.svg";
import nocourse from "../../../assets/svg/dashboard/coursecard/nocourse.svg";
import { GlobalContext } from "../../../context/GlobalState";

function NoCourseCard() {
  const { navigate } = useContext(GlobalContext);
  return (
    <div
      className="no-course-card bg-white"
      style={{
        backgroundImage: "url(" + nocourse + ")",
        borderRadius: "10px"
      }}
    >
      <div className="no-course-btn">
        <button
          className="start-learning-btn uni-border pointer"
          onClick={() => navigate("/courses")}
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}

export default NoCourseCard;
