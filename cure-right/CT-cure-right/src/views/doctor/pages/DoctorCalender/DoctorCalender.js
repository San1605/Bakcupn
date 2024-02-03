import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./DoctorCalender.css";
import DoctorCalenderModal from "../../components/DoctorCalenderModal/DoctorCalenderModal";
import { getCalenderAppointments } from "../../../../services/commonApi";
// import VerticalStepperComponent from "./Stepper";
// import StepperNew from "./Stepper";

const DoctorCalender = () => {
  const localizer = momentLocalizer(moment);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [eventsArr, setEventArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
        style: {
          backgroundColor: "#FFEDED",
        },
      };
    }

    return {};
  };

  const startDate = moment(currentDate).startOf("week").format("YYYY-MM-DD");
  const endDate = moment(currentDate).endOf("week").format("YYYY-MM-DD");

  function convertDateStringToCustomDate(inputDate, inputTime) {
    if (inputDate?.split("T").length > 0 && inputTime?.split("T").length > 0) {
      const parts = inputDate?.split("T");
      const datePart = parts[0]?.split("-");
      const TimeString = inputTime?.split("T");
      const timePart = TimeString[1]?.split(".")[0]?.split(":");

      const year = parseInt(datePart[0]);
      const month = parseInt(datePart[1]) - 1;
      const day = parseInt(datePart[2]);

      const hours = parseInt(timePart[0]);
      const minutes = parseInt(timePart[1]);

      return new Date(year, month, day, hours, minutes);
    }
  }

  const getCalendatEvents = async () => {
    let userId = localStorage.getItem("userId")
    try {
      const res = await getCalenderAppointments(userId, startDate, endDate);
      setEventArr(res?.data?.data);
      // console.log(res?.data?.data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCalendatEvents();
  }, []);

  const arrayOfEvents = [];

  eventsArr?.map((event, index) => {
    arrayOfEvents.push({
      id: event.appointmentId,
      title: event.problem,
      start:
        convertDateStringToCustomDate(
          event?.selectedAppointmentDate,
          event?.selectedAppointmentStartTime
        ) || "1900-01-01T11:00:00.000Z",
      end:
        convertDateStringToCustomDate(
          event?.selectedAppointmentDate,
          event?.selectedAppointmentEndTime
        ) || "1900-01-01T11:00:00.000Z",
    });
  });

  const CustomEvent = ({ event }) => {
    return (
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          textAlign: "center",
          fontSize: "10px",
          height: "100%",
          width: "100%",
          borderLeft:
            event.title === "Appointment"
              ? "3px solid #B979FC"
              : "3px solid #FAAE00",
        }}
      >
        {/* {event.title} */}
        Appointment
      </p>
    );
  };

  const CustomToolbar = ({ date, onNavigate }) => {
    const goToBack = () => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    };

    const goToNext = () => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    };

    const goToCurrent = () => {
      setCurrentDate(new Date());
    };

    const startDate = moment(currentDate).startOf("week").format("DD-MM-YYYY");
    const endDate = moment(currentDate).endOf("week").format("DD-MM-YYYY");

    return (
      <div
        className={"toolbar-container"}
        style={{
          textAlign: "right",
          marginBottom: "1rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #F1E3FF",
        }}
      >
        <div
          className={"back-next-buttons"}
          style={{
            border: "none",
          }}
        >
          <button
            className={"btn-back"}
            onClick={goToBack}
            style={{
              border: "none",
              marginRight: "0.6rem",
              fontSize: "1.2rem",
              backgroundColor: "transparent",
            }}
          >
            &#8249;
          </button>
          <button
            className={"btn-current"}
            onClick={goToCurrent}
            style={{
              border: "none",
              fontSize: "0.8rem",
              backgroundColor: "transparent",
            }}
          >
            <span
              style={{
                backgroundColor: "#F1E3FF",
                padding: "0.5rem",
                marginRight: "0.3rem",
              }}
            >{`${startDate}`}</span>
            -
            <span
              style={{
                backgroundColor: "#F1E3FF",
                padding: "0.5rem",
                marginLeft: "0.3rem",
              }}
            >{` ${endDate}`}</span>
          </button>

          <button
            className={"btn-next"}
            onClick={goToNext}
            style={{
              border: "none",
              marginLeft: "0.6rem",
              fontSize: "1.2rem",
              backgroundColor: "transparent",
            }}
          >
            &#8250;
          </button>
        </div>
      </div>
    );
  };

  const handleSelectEvent = (event) => {
    console.log("Selected event:", event);
  };

  const handleDoubleClickEvent = (event) => {
    console.log("Double-clicked event:", event);
  };
  const handleSelectSlot = (slotInfo) => {
    console.log("Selected slot:", slotInfo);
    setShowModal(true);
  };

  return (
    <div className="doctorCalender h-100">
      <div className="home-top p-0 m-0 w-100 mb-0">
        <h3 className="heading-overview mb-0">My Calendar</h3>
        <h2 className="heading-homepage mb-0">My Calendar</h2>
      </div>
      <BigCalendar
        localizer={localizer}
        formats={{ dayFormat: customDateHeaderFormat }}
        startAccessor="start"
        events={arrayOfEvents}
        endAccessor="end"
        culture={"en-gb"}
        popup={true}
        views={["week"]}
        date={currentDate}
        defaultView="week"
        // step={60} // Set the step to 60 (for 60 minutes)
        min={moment().startOf("day").add(9, "hours").toDate()} // Set the minimum time to 9 AM
        max={moment().startOf("day").add(19, "hours").toDate()} // Set the maximum time to 7 PM (adjust as needed)
        now={new Date()}
        dayPropGetter={dayPropGetter}
        // eventPropGetter={customEventStyleGetter}
        components={{
          event: CustomEvent,
          timeGutterHeader: CustomTimeGutterHeader,
          toolbar: CustomToolbar,
        }}
        onSelectEvent={handleSelectEvent}
        onDoubleClickEvent={handleDoubleClickEvent}
        onSelectSlot={handleSelectSlot}
        selectable={true}
      />
      {/* <StepperNew /> */}
      {/* <DoctorCalenderModal
        show={showModal}
        setShow={setShowModal}
        //  onClose={() => setShowModal(false)}
      /> */}
    </div>
  );
};

export default DoctorCalender;
