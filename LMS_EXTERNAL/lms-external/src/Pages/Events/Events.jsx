import React, { useContext, useEffect, useMemo, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Events.css";
import EventScheduleModal from "../../Components/EventScheduleModal/EventScheduleModal";
import { addEvent, plus } from "../../Assets/globalIcons";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../../Context/GlobalContext";
import { globalActions } from "../../Context/GlobalActions";
import EventDetailModal from "../../Components/EventDetailModal/EventDetailModal";

const Events = () => {
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("")
  const { eventsArray, getEvents, dispatch } = useContext(GlobalContext);
  const [arrayOfEvents, setArrayOfEvents] = useState([]);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const localizer = momentLocalizer(moment);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);


  console.log(showEventDetailModal)

  // const [currentDate, setCurrentDate] = React.useState(new Date());



  const CustomTimeGutterHeader = () => {
    return (
      <div
        className="custom-gutter-header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        IST
      </div>
    );
  };

  const customDateHeaderFormat = (date, culture, localizer) => `
${localizer.format(date, "dddd", culture)}
  ${localizer.format(date, "DD-MM-YYYY", culture)}
`;

  const isSunday = (date) => {
    return date.getDay() === 0;
  };

  const dayPropGetter = (date) => {
    const isSundayHoliday = isSunday(date);
    if (isSundayHoliday) {
      return {
        className: "sunday-holiday",
        // style: {
        //   backgroundColor: "#FFEDED",
        // },
      };
    }

    return {};
  };

  // const startDate = moment(currentDate).startOf("week").format("YYYY-MM-DD");
  // const endDate = moment(currentDate).endOf("week").format("YYYY-MM-DD");

  function convertDateStringToCustomDate(inputDate) {
    if (inputDate?.split("T").length > 0) {
      const parts = inputDate?.split("T");
      const datePart = parts[0]?.split("-");
      const TimeString = parts[1];
      const timePart = TimeString?.split(".")[0]?.split(":");

      const year = parseInt(datePart[0]);
      const month = parseInt(datePart[1]) - 1;
      const day = parseInt(datePart[2]);

      const hours = parseInt(timePart[0]);
      const minutes = parseInt(timePart[1]);

      return new Date(year, month, day, hours, minutes);
    }
  }

  const getCalendatEvents = async () => {
    try {
      const res = await getEvents();
      console.log(res?.data, 'res')
      dispatch({
        type: globalActions.GET_EVENTS,
        payload: res.data
      })
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCalendatEvents();

    // document.addEventListener("click", handleDocumentClick);
    // return () => {
    //   document.removeEventListener("click", handleDocumentClick);
    // };
  }, [])

  // const handleDocumentClick = (e) => {
  //   if (document.getElementById("Events")?.contains(e.target) && !document.getElementById('eventDetails')?.contains(e.target) && !document.querySelector(".rbc-event-content")?.contains(e.target)) {
  //     setShowEventDetailModal(false);
  //   }
  // };

  console.log(eventsArray, 'eventsArray')

  useEffect(() => {
    if (eventsArray?.length > 0) {
      // console.log(eventsArray, "event")
      const arr = []
      eventsArray?.map((event, index) => {
        arr.push({
          id: event.id,
          title: event.title,
          start:
            convertDateStringToCustomDate(
              event?.start
            ) || "1900-01-01T11:00:00.000Z",
          end:
            convertDateStringToCustomDate(
              event?.end
            ) || "1900-01-01T11:00:00.000Z",
        });
      });

      setArrayOfEvents(arr)
    }
  }, [eventsArray])

  // console.log(arrayOfEvents, 'wwwwwwwwwwww')

  const handleSelectEvent = (event) => {
    console.log("Selected event:", event);
    setShowEventDetailModal(true);
    setSelectedEvent(event?.id)
  };

  const handleDoubleClickEvent = (event) => {
    // console.log("Double-clicked event:", event);
  };

  const handleSelectSlot = (slotInfo) => {
    // console.log("Selected slot:", slotInfo);
  };

  return (
    <div id="Events" className="Events">
      {localStorage.getItem("role") !== "user" && <button className="addEventButtonCalender" onClick={() => setShow(true)}>
        <img alt="" src={addEvent} />
      </button>}
      <BigCalendar
        localizer={localizer}
        formats={{ dayFormat: customDateHeaderFormat }}
        startAccessor="start"
        events={arrayOfEvents}
        endAccessor="end"
        culture={"en-gb"}
        popup={true}
        views={['week', 'day', "agenda"]}
        // date={currentDate}
        defaultView="day"
        // step={60} // Set the step to 60 (for 60 minutes)
        min={moment().startOf("day").add(10, "hours").toDate()} // Set the minimum time to 9 AM
        max={moment().startOf("day").add(20, "hours").toDate()} // Set the maximum time to 7 PM (adjust as needed)
        now={new Date()}
        dayPropGetter={dayPropGetter}
        // eventPropGetter={customEventStyleGetter}
        components={{
          // event: CustomEvent,
          timeGutterHeader: CustomTimeGutterHeader,
          // toolbar: CustomToolbar,
        }}
        onSelectEvent={handleSelectEvent}
        onDoubleClickEvent={handleDoubleClickEvent}
        onSelectSlot={handleSelectSlot}
        selectable={true}
      />

      <EventScheduleModal
        show={show}
        setShow={setShow}
        api={getCalendatEvents}
      //  onClose={() => setShowModal(false)}
      />

      {showEventDetailModal && <EventDetailModal
        show={showEventDetailModal}
        setShow={setShowEventDetailModal}
        selectedEvent={selectedEvent}
        eventArray={eventsArray}
      />}
    </div>
  );
};

export default Events;






// const CustomEvent = ({ event }) => {
//   return (
//     <p
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "black",
//         textAlign: "center",
//         fontSize: "10px",
//         height: "100%",
//         width: "100%",
//         borderLeft:
//           event.title === "Appointment"
//             ? "3px solid #B979FC"
//             : "3px solid #FAAE00",
//       }}
//     >
//       {/* {event.title} */}
//       Appointment
//     </p>
//   );
// };

// const CustomToolbar = ({ date, onNavigate }) => {
//   const goToBack = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() - 7);
//     setCurrentDate(newDate);
//   };

//   const goToNext = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + 7);
//     setCurrentDate(newDate);
//   };

//   const goToCurrent = () => {
//     setCurrentDate(new Date());
//   };

//   const startDate = moment(currentDate).startOf("week").format("DD-MM-YYYY");
//   const endDate = moment(currentDate).endOf("week").format("DD-MM-YYYY");

//   return (
//     <div
//       className={"toolbar-container"}
//       style={{
//         textAlign: "right",
//         marginBottom: "1rem",
//         paddingBottom: "1rem",
//         borderBottom: "2px solid #F1E3FF",
//       }}
//     >
//       <div
//         className={"back-next-buttons"}
//         style={{
//           border: "none",
//         }}
//       >
//         <button
//           className={"btn-back"}
//           onClick={goToBack}
//           style={{
//             border: "none",
//             marginRight: "0.6rem",
//             fontSize: "1.2rem",
//             backgroundColor: "transparent",
//           }}
//         >
//           &#8249;
//         </button>
//         <button
//           className={"btn-current"}
//           onClick={goToCurrent}
//           style={{
//             border: "none",
//             fontSize: "0.8rem",
//             backgroundColor: "transparent",
//           }}
//         >
//           <span
//             style={{
//               backgroundColor: "#F1E3FF",
//               padding: "0.5rem",
//               marginRight: "0.3rem",
//             }}
//           >{`${startDate}`}</span>
//           -
//           <span
//             style={{
//               backgroundColor: "#F1E3FF",
//               padding: "0.5rem",
//               marginLeft: "0.3rem",
//             }}
//           >{` ${endDate}`}</span>
//         </button>

//         <button
//           className={"btn-next"}
//           onClick={goToNext}
//           style={{
//             border: "none",
//             marginLeft: "0.6rem",
//             fontSize: "1.2rem",
//             backgroundColor: "transparent",
//           }}
//         >
//           &#8250;
//         </button>
//       </div>
//     </div>
//   );
// };
