import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calender.css";
import moment from "moment";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import Mycourses from "../../views/mentor-mentee/pages/courses/mycourses/Mycourses";

function Calender() {
  const { myCourses } = useContext(GlobalContext);
  const [markeddates, setMarkeddates] = useState([]);
  const [trigger,setTrigger] = useState(false);
  useEffect(() => {
    const temp = myCourses.map((elem) => {
      return elem.courseMustEnd;
    });

    setMarkeddates(temp);
  }, [myCourses]);
  const sendClasses = (currentIteration) => {
    let classes = "date-";
    for (let i = 0; i < markeddates.length; i++) {
      if (markeddates[i] == moment(currentIteration.date).format("D/M/YYYY")) {
        classes += `${i + 1}`;
      }
    }
    return classes;
  };
  useEffect(() => {
    if (markeddates.length !== 0) {
      setTimeout(() => {
        const arr = new Set(
          myCourses.map((elem) => {
            return elem.courseMustEnd;
          })
        );
        arr.forEach((elem) => {
          const atdate = myCourses.filter((item) => {
            return item.courseMustEnd === elem;
          });
          const newdate = `.d${elem.split("/").join("")}`;

          tippy(`${newdate}`, {
            content: `<div class="due-date-tooltip"><p class="due-date-tooltip-head">End Date</p> <p class="due-date-tooltip-content">${atdate.map(
              (thing) => {
                return thing.courseId;
              }
            )}</p></div>`,
            allowHTML: true,
            placement: "top",
            arrow: true,
            animation: "fade",
          });
        });
      }, 10);
    }
  }, [markeddates,trigger]);

  return (
    <div onClick={()=>setTrigger(!trigger)}>
      {markeddates.length !== 0 ? (
        <Calendar
          value={new Date()}
          tileClassName={(currentIteration) => {
            if (
              !moment(moment(currentIteration.date).format("D/M/YYYY")).isSame(
                moment(new Date()).format("D/M/YYYY")
              )
            ) {
              if (
                markeddates.find((x) => {
                  if (moment(currentIteration.date).format("D/M/YYYY") === x) {
                    return true;
                  } else {
                    return false;
                  }
                })
              ) {
                if (
                  moment(currentIteration.date).isAfter(new Date())
                  //   .split("/")[0] >
                  // moment(new Date()).format("D/M/YYYY").split("/")[0]
                ) {
                  return `due-date ${sendClasses(currentIteration)}  
                      d${moment(currentIteration.date)
                        .format("D/M/YYYY")
                        .split("/")
                        .join("")}`;
                } else {
                  return `due-date-passed ${sendClasses(currentIteration)} 
                  d${moment(currentIteration.date)
                    .format("D/M/YYYY")
                    .split("/")
                    .join("")}`;
                }
                //     style={{
                //   borderColor:
                //     markeddates.indexOf(currentIteration.date) == 0
                //       ? "#91DAEA"
                //       : markeddates.indexOf(currentIteration.date) == 1
                //       ? "#EAB691"
                //       : "#DD91EA",
                // }}
              }
            }
          }}
        />
      ) : (
        <Calendar value={new Date()} />
      )}
    </div>
  );
}

export default Calender;
