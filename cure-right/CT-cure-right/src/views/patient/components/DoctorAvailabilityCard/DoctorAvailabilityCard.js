import React, { useEffect } from "react";
import "./DoctorAvailabilityCard.css";
import personImage from "../../../../assets/icons/profile.svg";
import star from "../../../doctor/assets/icons/star.svg";
import { useSelector } from "react-redux";
import { setBookAppointmentPayload } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
const DoctorAvailabilityCard = ({ doctor, i }) => {
  const dispatch = useDispatch();
  let patientReducer = useSelector((state) => {
    return state.PatientReducer;
  });

  useEffect(() => {
    if (i === 0) {
      dispatch(
        setBookAppointmentPayload({
          ...patientReducer?.bookAppointmentPayload,
          selectedAppointmentStartTime: doctor?.AvailableTImeSLots[0],
          selectedAppointmentEndTime:
            doctor?.AvailableTImeSLots.length > 0
              ? getUpdatedTime(doctor?.AvailableTImeSLots[0])
              : null,
          doctorId: doctor?.doctorId,
        })
      );
    }
  }, []);

  const separateTimeBy12 = (array) => {
    const before12 = [];
    const after12 = [];
    for (let i = 0; i < array?.length; i++) {
      const time = array[i];
      const hour = parseInt(time.split(":")[0]);
      if (hour < 12) {
        before12.push(time);
      } else {
        after12.push(time);
      }
    }
    return [before12, after12];
  };

  const getUpdatedTime = (timeString) => {
    console.log(timeString, "time getUpdated");
    const [hours, minutes] = timeString.split(":");
    const dateObj = new Date();
    dateObj.setHours(Number(hours));
    dateObj.setMinutes(Number(minutes));

    // Step 2: Add 20 minutes to the Date object
    dateObj.setMinutes(dateObj.getMinutes() + 20);

    // Step 3: Format the resulting time back to the "hh:mm" format
    const updatedHours = String(dateObj.getHours()).padStart(2, "0");
    const updatedMinutes = String(dateObj.getMinutes()).padStart(2, "0");
    const updatedTimeString = `${updatedHours}:${updatedMinutes}`;

    return updatedTimeString;
  };

  const [timeBefore12, timeAfter12] = separateTimeBy12(
    doctor?.AvailableTImeSLots
  );
  useEffect(() => {
    console.log(timeBefore12, timeAfter12);
  }, [timeAfter12, timeBefore12]);

  const handleSetTime = (time, doctorId) => {
    console.log(getUpdatedTime(time), "time");

    dispatch(
      setBookAppointmentPayload({
        ...patientReducer?.bookAppointmentPayload,
        selectedAppointmentStartTime: time,
        selectedAppointmentEndTime: getUpdatedTime(time),
        doctorId: doctorId,
      })
    );
  };

  return (
  <div className="doctorAvailabilityCard">
      <div className="left">
        <div className="doctorDetail">
          <div className="img-cont">
            <img src={doctor?.image || personImage} alt="" className="h-100" />
          </div>
          <div>
            <div className="d-flex gap-2">
              <div>
                <p className="m-0 d-name">{doctor?.FullName}</p>
                <span className="m-0">{doctor?.experience} years of exp.</span>
              </div>
              <div className="star-cont d-flex gap-1">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="specialization">
          <div>
            <p className="m-0 d-name">Specialization:</p>
            <span className="m-0">
              {doctor?.Speciality1 || "Null"}, {doctor?.Speciality2 || "Null"}
            </span>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="heading-right">Available Slots</div>
        {timeBefore12.length > 0 && (
          <>
            <div className="slot">Morning</div>
            <div className="timeslot-chip-container">
              {timeBefore12?.map((time, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleSetTime(time, doctor?.doctorId)}
                    className={`timeslot-chip w-auto ${
                      doctor?.doctorId ===
                        patientReducer?.bookAppointmentPayload?.doctorId &&
                      time ===
                        patientReducer?.bookAppointmentPayload
                          ?.selectedAppointmentStartTime &&
                      "timeslot-chip-active"
                    }`}
                  >
                    {time}
                  </div>
                );
              })}
            </div>
          </>
        )}
        {timeAfter12.length > 0 && (
          <>
            <div className="slot mt-2">Afternoon</div>
            <div className="timeslot-chip-container mb-2">
              {timeAfter12?.map((time, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleSetTime(time, doctor?.doctorId)}
                    className={`timeslot-chip w-auto ${
                      doctor?.doctorId ===
                        patientReducer?.bookAppointmentPayload?.doctorId &&
                      time ===
                        patientReducer?.bookAppointmentPayload
                          ?.selectedAppointmentStartTime &&
                      "timeslot-chip-active"
                    }`}
                  >
                    {time}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorAvailabilityCard;
