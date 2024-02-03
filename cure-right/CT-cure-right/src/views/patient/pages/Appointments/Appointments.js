import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Loader from "../../../../components/Loader/Loader";
import ProfileIcon from "../../../../assets/icons/profile.svg";
import PREV from "../../../../assets/icons/prevArrow.svg";
import NEXT from "../../../../assets/icons/nextArrow.svg";
import downloadIcon from "../../../../assets/icons/downloadIcon.svg";
import "./Appointments.css";
import {
  getPatientUpcomingAppointmentsList,
  getPatientPastAppointmentsList,
} from "../../../../services/patientApi";
import {
  setUpcomingAppointmentPatient,
  setPastAppointmentPatient,
} from "../../../../redux/actions/index";

const Appointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabs] = useState(["Upcoming Appointments", "Past Appointments"]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [pageNoUpcoming, setPageNoUpcoming] = useState(1);
  const [pageNoPast, setPageNoPast] = useState(1);
  const [totalpagesUpcoming, setTotalPagesUpcoming] = useState(1);
  const [totalpagesPast, setTotalPagesPast] = useState(1);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingPast, setLoadingPast] = useState(false);

  const [upcomingAppointments, pastAppointments] = useSelector((store) => [
    store.PatientReducer.upcomingAppointmentListPatient,
    store.PatientReducer.pastAppointmentListPatient,
  ]);

  const handleTabChange = (i) => {
    setActiveTabIndex(i);
  };
  const handleJoinCall = (e) => {
    navigate("/meet/75dfb54c-9d94-48dc-ae1e-42a36ec65fef");
  };

  const getUpcomingAppointments = async () => {
    setLoadingUpcoming(true);
    try {
      const res = await getPatientUpcomingAppointmentsList(pageNoUpcoming, "9");
      dispatch(setUpcomingAppointmentPatient(res?.data?.data));
      setTotalPagesUpcoming(res?.data?.pages?.Total_Pages);
    } catch (err) {
      console.error("getUpcomingAppointments", err);
    }
    setLoadingUpcoming(false);
  };

  const getPastAppointments = async () => {
    setLoadingPast(true);
    try {
      const res = await getPatientPastAppointmentsList(pageNoPast, "9");
      dispatch(setPastAppointmentPatient(res?.data?.data));
      setTotalPagesPast(res?.data?.pages?.Total_Pages);
    } catch (err) {
      console.log("getPastAppointments", err);
    }
    setLoadingPast(false);
  };

  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""
      }${month}-${year}`;
  }

  function getFormattedTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""
      }${minutes}`;
  }

  const handlePrevUpcoming = () => {
    if (pageNoUpcoming > 1) {
      setPageNoUpcoming(pageNoUpcoming - 1);
    }
  };
  const handleNextUpcoming = () => {
    if (pageNoUpcoming < totalpagesUpcoming) {
      setPageNoUpcoming(pageNoUpcoming + 1);
    }
  };
  const handlePrevPast = () => {
    if (pageNoPast > 1) {
      setPageNoPast(pageNoPast - 1);
    }
  };

  const handleNextPast = () => {
    if (pageNoPast < totalpagesPast) {
      setPageNoPast(pageNoPast + 1);
    }
  };

  const handleInputChangeUpcoming = (e) => {
    let value = e.target.value;
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

  const handleInputChangePast = (e) => {
    let value = e.target.value;
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

  useEffect(() => {
    getUpcomingAppointments();
  }, [pageNoUpcoming]);

  useEffect(() => {
    getPastAppointments();
  }, [pageNoPast]);

  return (
    <>
      {!loadingUpcoming && !loadingPast ? (
        <div className="my-appointments-patient h-100">
          <div className=" home-top row m-0 p-0 w-100">
            <div className="mb-2 p-0">
              <h3 className="heading-overview mb-1">My Appointments</h3>
              <h2 className="heading-homepage">Appointments</h2>
            </div>
          </div>
          <div className=" row px-0 pt-0 m-0 pb-12px">
            <div className="ps-0 pe-12px col-lg-7 col-md-12">
              <div className=" h-100 upcoming_div">
                <div className="pre-text">Upcoming Appointment Details</div>
                <div className="upcoming1 w-100 d-flex mt-3">
                  <div className="upcoming_profile col-5 d-flex align-items-center justify-content-center gap-2 px-2">
                    <img
                      src={ProfileIcon}
                      alt=""
                      className="upcoming_img m-0"
                    />
                    <div className="consulted1 w-100">
                      <h2 className="pre-text1 text-nowrapm-0 m-0">
                        {upcomingAppointments[0]?.doctorName || "Doctor's Name"}
                      </h2>
                      <h3 className="heading_homepage m-0">
                        {upcomingAppointments[0]?.problem || "problem "}
                      </h3>
                    </div>
                  </div>
                  <div className="upcoming_button col-4 d-flex flex-column justify-content-center gap-2 ps-3">
                    <div className="d-flex w-100">
                      {/* <img src={calender1} alt="" className='calender1_img position-absolute '/> */}
                      <input
                        type="date"
                        className="calender1 w-100"
                        value={upcomingAppointments[0]?.selectedAppointmentDate?.substring(
                          0,
                          10
                        )}
                      />
                    </div>
                    <div className="d-flex">
                      {/* <img src={clock1} alt="" className='clock1_img'/> */}
                      <input
                        type="time"
                        className="clock1 w-100"
                        value={getFormattedTime(
                          upcomingAppointments[0]?.selectedAppointmentStartTime
                        )}
                      />
                    </div>
                  </div>
                  <div className="upcoming_button col-3 d-flex flex-column justify-content-center gap-2 ps-3">
                    <button className="modify">Modify</button>
                    <button className="cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-lg-5 col-md-12 gap-lg-0 p-0 pe-md-0 ps-md-0 pe-0 ps-0">
              <div className="previously_div p-2 ps-2">
                <div className="d-flex justify-content-between">
                  <div className="consulted w-100">
                    <h2 className="pre-text1 text-nowrap m-0 mx-2 mt-2">
                      Previously Consulted Doctors
                    </h2>
                    <h3 className="heading_homepage mx-2">Last 30 days</h3>
                  </div>
                  <button className="consulted_button text-nowrap mt-2 me-2">
                    View All
                  </button>
                </div>
                <div className="previously_consulted bg-white mx-2 mb-2 ">
                  <div className="previously_consulted_inside ">
                    <img
                      src={ProfileIcon}
                      className=""
                      alt=""
                      style={{
                        width: "2.4rem",
                        // marginLeft:"1rem"
                      }}
                    />
                    <span className="previously_consulted_span">
                      <p style={{ fontWeight: "600" }}>
                        {pastAppointments[0]?.fullName}
                      </p>
                      <p style={{ color: "#707070" }} className="">
                        {pastAppointments[0]?.Speciality1 || "Orthopedics"}{" "}
                      </p>
                    </span>
                    <span className="previously_consulted_span2">
                      <p>
                        {getFormattedTime(
                          pastAppointments[0]?.selectedAppointmentStartTime
                        )}
                      </p>
                      <p>|</p>
                      <p className="">
                        {getFormattedDate(
                          pastAppointments[0]?.selectedAppointmentDate
                        )}
                      </p>
                    </span>
                    <img
                      src={downloadIcon}
                      className=""
                      alt=""
                      style={{
                        width: "0.8rem",
                        marginLeft: "1rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="appointment_div">
            <div className="d-flex  align-items-center mt-1">
              {tabs.map((tab, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      handleTabChange(i);
                    }}
                    className={`tab ${activeTabIndex === i && "pre-text2"}`}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>

            {activeTabIndex === 0 ? (
              <div className="list-container_div1 bg-white px-2 mt-2">
                <Table className="table borderles overflow-auto ">
                  <thead>
                    <tr className="doctor_table_heading">
                      <th className="text-nowrap">Doctor's Name</th>
                      <th>Issue</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th className="ps-4">Join</th>
                      {/* <th>Recording</th> */}
                    </tr>
                  </thead>

                  {/*  api  */}
                  <tbody className="app-table-body">
                    {!loadingUpcoming &&
                      upcomingAppointments?.map((appointment, index) => (
                        <tr className="onhovers ">
                          <td className="doctor_table_heading1">
                            {appointment.doctorName}
                          </td>
                          <td className="doctor_table_heading1 up-app-issue">
                            <p>{appointment.problem}</p>
                          </td>
                          <td className="doctor_table_heading1 text-nowrap">
                            {getFormattedDate(
                              appointment.selectedAppointmentDate
                            )}
                          </td>
                          <td className="doctor_table_heading1 text-nowrap">
                            {getFormattedTime(
                              appointment.selectedAppointmentStartTime
                            )}
                          </td>
                          <td className="doctor_table_heading1">
                            <button
                              className="patient_table_button"
                              onClick={() => handleJoinCall()}
                            >
                              Join
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              activeTabIndex === 1 && (
                <div className="list-container_div1 bg-white px-2 mt-2">
                  <Table className="table borderles overflow-auto ">
                    <thead>
                      <tr className="doctor_table_heading">
                        <th className="text-nowrap">Doctor’s Name</th>
                        <th>Issue</th>
                        <th>Date</th>
                        <th>Report</th>
                        <th>Prescription</th>
                        <th>Recording</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {!loadingPast &&
                        pastAppointments.map((appointment, index) => (
                          <tr className="onhovers">
                            <td className="doctor_table_heading1">
                              {appointment.fullName}
                            </td>
                            <td className="doctor_table_heading1 up-app-issue">
                              <p>{appointment.problem}</p>
                            </td>
                            <td className="doctor_table_heading1 text-nowrap">
                              {getFormattedDate(
                                appointment.selectedAppointmentDate
                              )}
                            </td>
                            <td className="doctor_table_heading2">MRI.pdf</td>
                            <td className="doctor_table_heading2">
                              Medicine.pdf
                            </td>
                            <td className="doctor_table_heading2">
                              Appointment.mp4
                            </td>
                          </tr>
                        ))}
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
                      onClick={handlePrevUpcoming}
                    >
                      <img src={PREV} alt="" />
                    </button>

                    <button
                      className="nextBtn"
                      onClick={handleNextUpcoming}
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
                      onClick={handlePrevPast}
                    >
                      <img src={PREV} alt="" />
                    </button>
                    <button
                      className="nextBtn"
                      onClick={handleNextPast}
                      aria-label="Next Page"
                    >
                      <img src={NEXT} alt="" />
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Appointments;
