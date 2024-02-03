import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import PatientHomeCarousel from "../../components/PatientHomeCarousel/PatientHomeCarousel";
import CustomDropdown from "../../../../components/CustomDropdown/CustomDropdown";
import CustomRadioBtn from "../../../../components/CustomRadioBtn/CustomRadioBtn";
import MedicineTracker from "../../components/MedicineTracker/MedicineTracker";
import Loader from "../../../../components/Loader/Loader";
import Button from "../../../../components/Button/Button";
import watchIcon from "../../../../assets/icons/watchIcon.png";
import right1 from "../../../../assets/icons/right1.png";
import "./Home.css";
import { getPatientMyAppointmentsList } from "../../../../services/patientApi";
import {
  setBookAppointmentPayload,
  setShowAppointmentModal,
  setUpcomingAppointmentList,
} from "../../../../redux/actions";
import { getUserTicketStatus } from "../../../../services/commonApi";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentDateTime] = useState(null);

  const [showOptions, setShowOptions] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [ticketStatusData, setTicketStatusData] = useState({});

  const [ticketsCountLoading, setTicketsCountLoading] = useState(true);
  const [myAppointmentsLoading, setMyAppointmentsLoading] = useState(true);

  let [appReducer, patientReducer] = useSelector((state) => {
    return [state.AppReducer, state.PatientReducer];
  });

  const handleBookAppPayload = (e) => {
    if (e.target.name === "emergency") {
      dispatch(
        setBookAppointmentPayload({
          ...patientReducer?.bookAppointmentPayload,
          [e.target.name]: e.target.value,
          slot: e.target.value === "0" ? "1" : "0",
        })
      );
    } else {
      dispatch(
        setBookAppointmentPayload({
          ...patientReducer?.bookAppointmentPayload,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleViewAllTickets = () => {
    navigate("/tickets");
  };

  const getAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getAppointmentTime = (dateString) => {
    const dateObj = new Date(dateString);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  const isCurrentTimeGreaterOrEqual = (
    appointmentDateTime,
    currentDateTime
  ) => {
    const appointmentTime = new Date(appointmentDateTime).getTime();
    const currentTime = new Date(currentDateTime).getTime();
    return currentTime >= appointmentTime;
  };

  const handleJoinCall = (appointment) => {
    // navigate(`/meet/${appointment?.MeetingId}`);
    navigate(`/meet/75dfb54c-9d94-48dc-ae1e-42a36ec65fef`);
    localStorage.setItem("appointmentId", 28);
  };

  const getUpcomingAppointments = async () => {
    setMyAppointmentsLoading(true);
    try {
      let res = await getPatientMyAppointmentsList();
      dispatch(setUpcomingAppointmentList([...res?.data?.data].reverse()));
    } catch (err) {
      console.log("getUpcomingAppointments", err);
    }
    setMyAppointmentsLoading(false);
  };

  const getTicketsStatus = async () => {
    setTicketsCountLoading(true);
    try {
      const res = await getUserTicketStatus();
      if (res) {
        setTicketStatusData(res.data.data);
      }
    } catch (err) {
      console.log("getTicketsStatus", err);
    }
    setTicketsCountLoading(false);
  };

  useEffect(() => {
    getTicketsStatus();
    getUpcomingAppointments();
  }, []);

  return (
    <>
      {!myAppointmentsLoading && !ticketsCountLoading ? (
        <div className="h-auto d-flex flex-column">
          <div className="home-top p-0 m-0 w-100">
            <div className="mb-3">
              <h3 className="heading-overview mb-1">Overview</h3>
              <h2 className="heading-homepage">Homepage</h2>
            </div>
            <div className="row w-100 p-0 m-0">
              <div className="col-lg-8 col-md-12 p-0">
                <div className="book-appointment h-100">
                  <h5 className="book-appointment-heading mb-3">
                    Book Appointment
                  </h5>
                  <div className="d-flex h-auto gap-4 mb-2 mt-1">
                    <CustomRadioBtn
                      name="emergency"
                      id="Emergency"
                      value={"1"}
                      text="Emergency"
                      onChange={handleBookAppPayload}
                      checked={
                        patientReducer?.bookAppointmentPayload?.emergency ===
                          "1" &&
                        patientReducer?.bookAppointmentPayload?.slot === "0"
                      }
                    />
                    <CustomRadioBtn
                      name="emergency"
                      id="SlotWise"
                      value={"0"}
                      text="Select Date & Time"
                      onChange={handleBookAppPayload}
                      checked={
                        patientReducer?.bookAppointmentPayload?.emergency ===
                          "0" &&
                        patientReducer?.bookAppointmentPayload?.slot === "1"
                      }
                    />
                  </div>
                  <textarea
                    name="description"
                    rows="2"
                    className="textarea col-xs-12 col-sm-8 col-md-6 p-2"
                    placeholder="Brief description of health issue..."
                    value={
                      patientReducer?.bookAppointmentPayload?.description || ""
                    }
                    onChange={handleBookAppPayload}
                  >
                    {patientReducer?.bookAppointmentPayload?.description || ""}
                  </textarea>
                  <div className="mt-2 p-0">
                    <Button
                      type="primary"
                      text="Book Appointment"
                      onClick={() => dispatch(setShowAppointmentModal(true))}
                      className="py-2 px-4"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 pe-0 ps-12px m-0 d-none d-lg-inline">
                <div className="carousel-cont w-100 h-100">
                  <PatientHomeCarousel />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-2 gap-lg-0 flex-lg-row w-100 m-0 pt-12px pb-12px">
            <div className="col-lg-6 col-md-12 flex h-auto h-md-100 flex-column p-0 ">
              <div className="w-100 appointment-details-alag">
                <div className="innerreport h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="pre-text">
                      My Appointments
                      <br />
                      <span className="presmall-text">Last 30 days</span>
                    </span>
                    <div>
                      <Button
                        type="primary"
                        text="View All"
                        onClick={() => {}}
                        className="py-1 px-3"
                      />
                    </div>
                  </div>
                  <div
                    className="my-appointments-table w-100 overflow-auto mt-2"
                    style={{
                      height: "calc(100% -30px)",
                    }}
                  >
                    <Table className="mb-1 h-auto">
                      <thead className="position-sticky top-0">
                        <tr>
                          <th className="table-header position-sticky top-0">
                            Issue
                          </th>
                          <th className="table-header position-sticky top-0">
                            Doctor's Name
                          </th>
                          <th className="table-header position-sticky top-0">
                            Date
                          </th>
                          <th className="table-header position-sticky top-0">
                            Time
                          </th>
                          <th className="table-header position-sticky top-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientReducer?.upcomingAppointmentList?.length > 0 &&
                          patientReducer?.upcomingAppointmentList?.map(
                            (appointment, i) => {
                              return (
                                <tr key={i}>
                                  <td
                                    className="table-body issue"
                                    title={appointment?.problem || "-"}
                                  >
                                    <p className="">
                                      {appointment?.problem || "-"}
                                    </p>
                                  </td>
                                  <td className="table-body">
                                    {appointment?.doctorName || "-"}
                                  </td>
                                  <td className="table-body">
                                    {getAppointmentDate(
                                      appointment?.selectedAppointmentDate
                                    ) || "-"}
                                  </td>
                                  <td className="table-body">
                                    {getAppointmentTime(
                                      appointment?.selectedAppointmentStartTime
                                    )}
                                  </td>
                                  <td className="table-body">
                                    {!isCurrentTimeGreaterOrEqual(
                                      appointment?.selectedAppointmentDate,
                                      currentDateTime
                                    ) ? (
                                      <Button
                                        type="primary"
                                        text="Join"
                                        className="btn-join"
                                        onClick={() => {
                                          handleJoinCall(appointment);
                                        }}
                                      />
                                    ) : (
                                      <Button
                                        type="primary-bordered"
                                        text="View"
                                        className="btn-join"
                                        onClick={() => {
                                          toast("It's not Appointment time");
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="w-100 ticket-status-cont h-100 ">
                <div className="inner-details-down p-2 overflow-auto">
                  <div className="d-flex justify-content-between align-items-center h-100 px-2 py-1">
                    <div className="p-0">
                      <div
                        className="d-flex flex-column mb-2"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      >
                        <div>Tickets Status</div>
                        <div className="presmall-text">Last 30 days</div>
                      </div>
                      <button
                        className="right-section-btn add-new"
                        onClick={handleViewAllTickets}
                      >
                        View All
                      </button>
                    </div>
                    <div className="d-flex gap-4">
                      <div className="status-tile px-2 py-2 bg-white rounded">
                        <div className=" d-flex align-items-center justify-content-between gap-3">
                          <div className="d-flex flex-column">
                            <span className="patientTicketSpan">Resolved</span>
                            <div className="h-auto">
                              {ticketStatusData?.resolved || 0}
                            </div>
                          </div>
                          <img
                            src={right1}
                            alt="greentick"
                            className="p-2"
                            style={{ height: "3.7rem" }}
                          />
                        </div>
                      </div>
                      <div className="status-tile px-2 py-2 bg-white rounded">
                        <div className="d-flex align-items-center justify-content-between gap-3">
                          <div className="d-flex flex-column">
                            <span className="patientTicketSpan">Active</span>
                            <div className="h-auto">
                              {ticketStatusData?.active || 0}
                            </div>
                          </div>
                          <img
                            src={watchIcon}
                            alt="greentick"
                            className="p-2"
                            style={{ height: "3.7rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-12 ps-12px pe-0 mt-2 mt-lg-0 mb-0"
              style={{ height: "323px" }}
            >
              <div className="medicine-tracker h-100 w-100 ">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="pre-text">Medicine Tracker</span>
                  <div className="d-flex gap-3">
                    <CustomDropdown
                      value={"Viral"}
                      options={["Viral"]}
                      showOptions={showOptions}
                      setShowOptions={setShowOptions}
                      onClick={() => {}}
                    />
                    <CustomDropdown
                      value={"Daily"}
                      options={["Daily"]}
                      showOptions={showOptions2}
                      setShowOptions={setShowOptions2}
                      onClick={() => {}}
                    />
                  </div>
                </div>
                <MedicineTracker />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
