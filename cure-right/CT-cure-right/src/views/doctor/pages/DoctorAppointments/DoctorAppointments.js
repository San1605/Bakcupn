import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Loader from "../../../../components/Loader/Loader";
import PREV from "../../../../assets/icons/prevArrow.svg";
import NEXT from "../../../../assets/icons/nextArrow.svg";
import eye from "../../../../assets/icons/eye.svg";
import video from "../../assets/icons/video.svg";
import person from "../../../../assets/images/person.svg";
import "./DoctorAppointments.css";
import {
  getDoctorPastAppointmentsList,
  getDoctorUpcomingAppointmentsList,
} from "../../../../services/doctorApi";
import {
  setPastAppointmentDoctor,
  setUpcomingAppointmentDoctor,
} from "../../../../redux/actions";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabs] = useState(["Upcoming", "Past Appointments"]);
  const [pageNoUpcoming, setPageNoUpcoming] = useState(1);
  const [pageNoPast, setPageNoPast] = useState(1);
  const [totalpagesUpcoming, setTotalPagesUpcoming] = useState(1);
  const [totalpagesPast, setTotalPagesPast] = useState(1);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingPast, setLoadingPast] = useState(true);
  const doctorReducer = useSelector((store) => store.DoctorReducer);

  const handleTabChange = (i) => {
    setActiveTabIndex(i);
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  };

  const getFormattedTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amOrPm = "AM";
    if (hours >= 12) {
      amOrPm = "PM";
      hours %= 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;
  };

  const handleViewPatient = (val) => {
    navigate(`/doctor/patient/${val}`);
  };

  const HandlePrevUpcoming = () => {
    if (pageNoUpcoming > 1) {
      setPageNoUpcoming(pageNoUpcoming - 1);
    }
  };
  const HandleNextUpcoming = () => {
    if (pageNoUpcoming < totalpagesUpcoming) {
      setPageNoUpcoming(pageNoUpcoming + 1);
    }
  };
  const HandlePrevPast = () => {
    if (pageNoPast > 1) {
      setPageNoPast(pageNoPast - 1);
    }
  };

  const HandleNextPast = () => {
    if (pageNoPast < totalpagesPast) {
      setPageNoPast(pageNoPast + 1);
    }
  };

  const handleInputChangeUpcoming = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    const numberValue = parseInt(value);
    const lowerLimit = 1;
    const upperLimit = totalpagesUpcoming;
    if (isNaN(numberValue) || numberValue < lowerLimit) {
      setPageNoUpcoming(lowerLimit);
    } else if (numberValue > upperLimit) {
      setPageNoUpcoming(upperLimit);
    } else {
      setPageNoUpcoming(numberValue);
    }
  };

  const handleInputChangePast = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    const numberValue = parseInt(value);
    const lowerLimit = 1;
    const upperLimit = totalpagesPast;
    if (isNaN(numberValue) || numberValue < lowerLimit) {
      setPageNoPast(lowerLimit);
    } else if (numberValue > upperLimit) {
      setPageNoPast(upperLimit);
    } else {
      setPageNoPast(numberValue);
    }
  };

  const getUpcomingAppointments = async () => {
    setLoadingUpcoming(true);
    try {
      const res = await getDoctorUpcomingAppointmentsList(pageNoUpcoming, "9");
      dispatch(setUpcomingAppointmentDoctor(res?.data?.data));
      setTotalPagesUpcoming(res?.data?.pages?.Total_Pages);
    } catch (err) {
      console.log("getUpcomingAppointments", err);
    }
    setLoadingUpcoming(false);
  };

  const getPastAppointments = async () => {
    setLoadingPast(true);
    try {
      const res = await getDoctorPastAppointmentsList(pageNoPast, "9");
      dispatch(setPastAppointmentDoctor(res?.data?.data));
      setTotalPagesPast(res?.data?.pages?.Total_Pages);
    } catch (err) {
      console.log("getPastAppointments", err);
    }
    setLoadingPast(false);
  };

  useEffect(() => {
    getUpcomingAppointments();
  }, [pageNoUpcoming]);

  useEffect(() => {
    getPastAppointments();
  }, [pageNoPast]);

  return (
    <>
      {!loadingUpcoming && !loadingPast ? (
        <div className="appointment-doctor">
          <div className="mb-2">
            <h3 className="headings-overview mb-1">My Appointments</h3>
            <h2 className="heading-homepage doctor-appointment ">
              My Appointments
            </h2>
          </div>
          <div className="personal-border"></div>
          <div className="d-flex  align-items-center mt-3">
            {tabs.map((tab, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    handleTabChange(i);
                  }}
                  className={`tab ${activeTabIndex === i && "text_section"}`}
                >
                  {tab}
                </div>
              );
            })}
          </div>
          {activeTabIndex === 0 ? (
            <div className="list-container_div1 bg-white px-2 mt-2">
              <Table className="w-100 overflow-auto admin-custom-table">
                <thead className="">
                  <tr className="doctor_table_heading">
                    <th className="table-header tid">ID</th>
                    <th className="table-header "></th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Number</th>
                    <th className="table-header">Mode</th>
                    <th className="table-header">Type</th>
                    <th className="table-header">Date</th>
                    <th className="table-header">Time</th>
                    <th className="table-header text-nowrap">Other Details</th>
                    <th className="table-header">Appointment</th>
                    {/* <th className="ps-4">Join</th> */}
                  </tr>
                </thead>

                <tbody className="app-table-body">
                  {!loadingUpcoming &&
                    doctorReducer?.upcomingAppointmentListDoctor?.map(
                      (appointment, index) => (
                        <tr className="appointment_onhovers">
                          <td className="table-body tid">
                            {appointment.patientId}
                          </td>
                          <td className="table-body ">
                            <div className="dp m-auto">
                              <img
                                className=""
                                src={appointment.Image || person}
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="table-body  text-nowrap">
                            {appointment.PatientName}
                          </td>
                          <td className="table-body text-nowrap">
                            {appointment.MobileNumber}
                          </td>
                          <td className="table-body text-nowrap">
                            {appointment.mode}
                          </td>
                          <td className="table-body text-nowrap">
                            {appointment.type || "Scheduled"}
                          </td>
                          <td className="table-body text-nowrap">
                            {getFormattedDate(
                              appointment.selectedAppointmentDate
                            )}
                          </td>
                          <td className="table-body">
                            {getFormattedTime(
                              appointment.selectedAppointmentStartTime
                            )}
                          </td>
                          <td className="table-body">
                            {" "}
                            <img
                              src={eye}
                              alt=""
                              width="20px"
                              className="icon_img cursor-pointer"
                              onClick={() =>
                                handleViewPatient(appointment.patientId)
                              }
                            />
                          </td>
                          <td className="table-body">
                            <button className="list-btn primary">
                              {" "}
                              <img
                                className="video"
                                src={video}
                                alt="abc"
                              />{" "}
                              <span className="m-auto text-nowrap">
                                {" "}
                                Join the Call{" "}
                              </span>{" "}
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </Table>
            </div>
          ) : (
            activeTabIndex === 1 && (
              <div className="list-container_div1 bg-white px-2 mt-2">
                <Table className="w-100 overflow-auto admin-custom-table">
                  <thead className="">
                    <tr className="doctor_table_heading">
                      <th className="table-header tid">ID</th>
                      <th className="table-header "></th>
                      <th className="table-header">Name</th>
                      <th className="table-header">Number</th>
                      <th className="table-header">Mode</th>
                      <th className="table-header">Type</th>
                      <th className="table-header">Date</th>
                      <th className="table-header">Time</th>
                      <th className="table-header text-nowrap">
                        Other Details
                      </th>
                      <th className="table-header">Appointment</th>
                      {/* <th className="ps-4">Join</th> */}
                    </tr>
                  </thead>

                  <tbody className="app-table-body">
                    {!loadingUpcoming &&
                      doctorReducer?.pastAppointmentListDoctor?.map(
                        (appointment, index) => (
                          <tr className="appointment_onhovers">
                            <td className="table-body tid">
                              {appointment.patientId}
                            </td>
                            <td className="table-body ">
                              <div className="dp m-auto">
                                <img
                                  className=""
                                  src={appointment.Image || person}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td className="table-body  text-nowrap">
                              {appointment.PatientName}
                            </td>
                            <td className="table-body text-nowrap">
                              {appointment.MobileNumber}
                            </td>
                            <td className="table-body text-nowrap">
                              {appointment.mode}
                            </td>
                            <td className="table-body text-nowrap">
                              {appointment.type || "Scheduled"}
                            </td>
                            <td className="table-body text-nowrap">
                              {getFormattedDate(
                                appointment.selectedAppointmentDate
                              )}
                            </td>
                            <td className="table-body">
                              {getFormattedTime(
                                appointment.selectedAppointmentStartTime
                              )}
                            </td>
                            <td className="table-body">
                              {" "}
                              <img
                                src={eye}
                                alt=""
                                width="20px"
                                className="icon_img cursor-pointer"
                                onClick={() =>
                                  handleViewPatient(appointment.patientId)
                                }
                              />
                            </td>
                            <td className="table-body">
                              <button className="list-btn primary">
                                {" "}
                                <img
                                  className="video"
                                  src={video}
                                  alt="abc"
                                />{" "}
                                <span className="m-auto text-nowrap">
                                  {" "}
                                  Join the Call{" "}
                                </span>{" "}
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </Table>
              </div>
            )
          )}

          {activeTabIndex === 0
            ? activeTabIndex === 0 && (
                <div className="table-pagination">
                  <div className="pagination-content">
                    Page{" "}
                    <input
                      type="number"
                      min={1}
                      max={totalpagesUpcoming}
                      value={pageNoUpcoming}
                      onChange={handleInputChangeUpcoming}
                    />{" "}
                    of {totalpagesUpcoming}
                  </div>
                  <div className="d-flex rounded-1 overflow-hidden">
                    <button
                      className="prevBtn"
                      aria-label="Previous Page"
                      onClick={HandlePrevUpcoming}
                    >
                      <img src={PREV} alt="" />
                    </button>

                    <button
                      className="nextBtn"
                      onClick={HandleNextUpcoming}
                      aria-label="Next Page"
                    >
                      <img src={NEXT} alt="" />
                    </button>
                  </div>
                </div>
              )
            : activeTabIndex === 1 && (
                <div className="table-pagination">
                  <div className="pagination-content">
                    Page{" "}
                    <input
                      type="number"
                      min={"1"}
                      max={totalpagesPast}
                      value={pageNoPast}
                      onChange={handleInputChangePast}
                    />{" "}
                    of {totalpagesPast}
                  </div>
                  <div className="d-flex rounded-1 overflow-hidden">
                    <button
                      className="prevBtn"
                      aria-label="Previous Page"
                      onClick={HandlePrevPast}
                    >
                      <img src={PREV} alt="" />
                    </button>
                    <button
                      className="nextBtn"
                      onClick={HandleNextPast}
                      aria-label="Next Page"
                    >
                      <img src={NEXT} alt="" />
                    </button>
                  </div>
                </div>
              )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DoctorAppointments;
