import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarSection.css";
import { getCalenderAppointments } from "../../../../services/commonApi";
import { useParams } from "react-router-dom";

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventsArr, setEventArr] = useState([]);
  const localizer = momentLocalizer(moment);

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

  const customDateHeaderFormat = (date, culture, localizer) => {
    return `${localizer.format(date, "DD-MMM", culture)}`;
  };

  const isSunday = (date) => {
    return date.getDay() === 0;
  };

  const dayPropGetter = (date) => {
    const isSundayHoliday = isSunday(date);
    if (isSundayHoliday) {
      return {
        className: "sunday-holiday",
        style: {
          backgroundColor: "#FFEDED !important",
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
  const { id } = useParams();
  const getCalendatEvents = async () => {
    try {
      const res = await getCalenderAppointments(id, startDate, endDate);
      setEventArr(res?.data?.data);
      console.log(res?.data?.data, "calender");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCalendatEvents();
  }, []);

  const arrayOfEvents = [];

  eventsArr.map((event) => {
    arrayOfEvents.push({
      id: event.appointmentId,
      title: event.problem,
      start:
        convertDateStringToCustomDate(
          event.selectedAppointmentDate,
          event.selectedAppointmentStartTime
        ) || "1900-01-01T11:00:00.000Z",
      end:
        convertDateStringToCustomDate(
          event.selectedAppointmentDate,
          event.selectedAppointmentEndTime
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
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          borderLeft:
            event.title === "Appointment"
              ? "3px solid #B979FC"
              : "3px solid #FAAE00",
        }}
      >
        Appointment
      </p>
    );
  };

  return (
    <div className="persona-list-right1 h-100">
      <div className="d-flex justify-content-between align-items-center h-auto mt-1">
        <span className="pre-text mx-2 ">Calendar</span>
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
        min={moment().startOf("day").add(9, "hours").toDate()}
        max={moment().startOf("day").add(19, "hours").toDate()}
        now={new Date()}
        dayPropGetter={dayPropGetter}
        toolbar={null}
        components={{
          event: CustomEvent,
          timeGutterHeader: CustomTimeGutterHeader,
        }}
      />
    </div>
  );
};

export default CalendarSection;
