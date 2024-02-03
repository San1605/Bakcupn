import "./reportCalendarFilter.css";
import React from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
function ReportCalandar({current,rev}) {
  const pathofreport = useParams();
  const { coursestatusofmentee,setcurrreport } = useContext(GlobalContext);
  const month = [
    { id: 1, monthname: "Jan" },
    { id: 2, monthname: "Feb" },
    { id: 3, monthname: "Mar" },
    { id: 4, monthname: "Apr" },
    { id: 5, monthname: "May" },
    { id: 6, monthname: "Jun" },
    { id: 7, monthname: "Jul" },
    { id: 8, monthname: "Aug" },
    { id: 9, monthname: "Sep" },
    { id: 10, monthname: "Oct" },
    { id: 11, monthname: "Nov" },
    { id: 12, monthname: "Dec" },
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [currentYearActive, setCurrentYearActive] = useState(currentYear);
  const [currentMonthActive, setCurrentMonthActive] = useState(
    currentMonth + 1
  );
  const yearArr = Array.from(new Array(5), (val, index) => currentYear - index);
  const coursesofmentee = useMemo(() => {
    if (pathofreport) {
      coursestatusofmentee(
        pathofreport.id,
        currentYearActive,
        currentMonthActive
      );
    }
  }, [currentMonthActive, currentYearActive]);
  useEffect(() => {
    // setCurrent({
    //   month: currentMonthActive,
    //   year: currentYearActive,
    // });
    const temp = {
        month: currentMonthActive,
        year: currentYearActive,
    };
    rev(temp);
    const tempreport = {
      idhere:pathofreport.id,
      month: currentMonthActive,
      year: currentYearActive,
    }
    setcurrreport(tempreport);
  }, [currentMonthActive, currentYearActive]);
  return (
    <div className="row py-1 report-calender-row">
      <div className="dropdown year-dropdown col-1">
        <button
          className="btn dropdown-toggle calendar-year-dropdown"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {currentYearActive}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {yearArr.map((val) => {
            return (
              <li
                className="dropdown-item pointer"
                onClick={() => setCurrentYearActive(val)}
              >
                {val}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-11 month-row">
        <div className="row month-row-padding">
          {month.map((elem) => {
            return (
              <button
                onClick={() => setCurrentMonthActive(elem.id)}
                className={`${
                  currentMonthActive === elem.id ? "yearmatch" : ""
                } ${
                  currentYearActive - new Date().getFullYear() >= 0
                    ? elem.id - (new Date().getMonth() + 1) <= 0
                      ? ""
                      : "cursor-block-disable"
                    : ""
                } col-1 pointer border-none bg-white d-flex justify-content-center align-items-center reportMonthFilter `}
              >
                {elem.monthname}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ReportCalandar;
