import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import KpiCard from "../../../../components/KpiCard/KpiCard";
import appointment from "../../assets/icons/appointment.svg";
import member from "../../assets/icons/member.svg";
import online from "../../assets/icons/online.svg";
import offline from "../../assets/icons/offline.svg";
import video from "../../assets/icons/video.svg";
import marco from "../../assets/icons/marco.svg";
import star from "../../assets/icons/star.svg";
import right1 from "../../../../assets/icons/right1.png";
import watchIcon from "../../../../assets/icons/watchIcon.png";
import emergency from "../../assets/icons/emergency.svg";
import emptystar from "../../assets/icons/emptystar.svg";
import board from "../../assets/icons/board.svg";
import "./DoctorHome.css";
import { getDoctorAppointmentStats } from "../../../../services/doctorApi";
import {
  getPatientFeedback,
  getUserTicketStatus,
} from "../../../../services/commonApi";
import { useNavigate } from "react-router-dom";
import { getDoctorUpcomingAppointmentsList } from "../../../../services/doctorApi";
import {
  setAppointmentStatistics,
  setFeedbacklist,
  setTicketsCount,
  setUpcomingAppointmentDoctor,
} from "../../../../redux/actions";
import Loader from "../../../../components/Loader/Loader";

function DoctorHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ticketsCountLoading, setTicketsCountLoading] = useState(true);
  const [appointmentStatsLoading, setAppointmentStatsLoading] = useState(true);
  const [upcomingAppListLoading, setUpcomingAppListLoading] = useState(true);
  const [feedbackListLoading, setFeedbackListLoading] = useState(true);
  const doctorReducer = useSelector((store) => store.DoctorReducer);
  const BoardMeeting = [
    {
      title: "Board Meeting",
      time: "Today 12:30",
    },
    {
      title: "Board Meeting",
      time: "Today 18:30",
    },
    {
      title: "Board Meeting",
      time: "Tomorrow 9:30",
    },
    {
      title: "Board Meeting",
      time: "Tomorrow 10:30",
    },
    {
      title: "Board Meeting",
      time: " Tomorrow 11:30",
    },
  ];
const appointmentLength=doctorReducer?.upcomingAppointmentListDoctor?.length;

const appointmentId = doctorReducer?.upcomingAppointmentListDoctor[appointmentLength-1]?.appointmentId;
console.log(appointmentId)
localStorage.setItem("appointmentId",appointmentId)

  const handleJoinCall = (meetingId) => {
    // navigate(`/doctor/meet/${meetingId}`);
    navigate(`/doctor/meet/75dfb54c-9d94-48dc-ae1e-42a36ec65fef`);
  };

  const handleViewAllTickets = () => {
    navigate("/doctor/tickets");
  };

  const getTicketsStatus = async () => {
    setTicketsCountLoading(true);
    try {
      const res = await getUserTicketStatus();
      dispatch(setTicketsCount(res?.data?.data));
    } catch (error) {
      console.log("getTicketsStatus", error);
    }
    setTicketsCountLoading(false);
  };

  const getDoctorAppointentStats = async (e) => {
    setAppointmentStatsLoading(true);
    try {
      let res = await getDoctorAppointmentStats();
      dispatch(setAppointmentStatistics(res?.data));
    } catch (err) {
      console.log("getDoctorAppointentStats", err);
    }
    setAppointmentStatsLoading(false);
  };

  const getUpcomingAppointments = async () => {
    setUpcomingAppListLoading(true);
    try {
      const res = await getDoctorUpcomingAppointmentsList("1", "200");
      dispatch(setUpcomingAppointmentDoctor(res?.data?.data));
    } catch (err) {
      console.error("Some Error", err);
    }
    setUpcomingAppListLoading(false);
  };

  const getPatientsFeedbackData = async (e) => {
    setFeedbackListLoading(true);
    try {
      let res = await getPatientFeedback();
      dispatch(setFeedbacklist(res?.data?.data));
    } catch (err) {
      console.log("getPatientsFeedbackData", err);
    }
    setFeedbackListLoading(false);
  };

  useEffect(() => {
    getTicketsStatus();
    getDoctorAppointentStats();
    getPatientsFeedbackData();
    getUpcomingAppointments();
  }, []);

  return (
    <>
      {!ticketsCountLoading &&
      !appointmentStatsLoading &&
      !upcomingAppListLoading &&
      !feedbackListLoading ? (
        <div className="doctor-home pb-2">
          <div className="h-100">
            <Col md={12}>
              <div className="">
                <h3 className="heading-overview mb-1">Overview</h3>
                <h2 className="heading-homepage">Homepage</h2>
              </div>
            </Col>
            <div className="tilesContainer pb-12px">
              <KpiCard
                name={"In-House meetings"}
                total={
                  doctorReducer?.appointmentStatistics?.inHouseMeeting || 0
                }
                cardAlign={"Doctor"}
                imgUrl={member}
                color={"#F1F8FF"}
              />
              <KpiCard
                name={"Online Consultations"}
                total={
                  doctorReducer?.appointmentStatistics?.onineConsultance || 0
                }
                cardAlign={"Doctor"}
                imgUrl={online}
                color={"#F1F8FF"}
              />
              <KpiCard
                name={"Offline Consultations"}
                total={
                  doctorReducer?.appointmentStatistics?.offlineConsultance || 0
                }
                cardAlign={"Doctor"}
                imgUrl={offline}
                color={"#F1F8FF"}
              />
              <KpiCard
                name={"Today's Appointment"}
                total={
                  doctorReducer?.appointmentStatistics?.TodaysAppointments || 0
                }
                cardAlign={"Doctor"}
                imgUrl={appointment}
                color={"#F1F8FF"}
              />
              <KpiCard
                name={"Emergency Bookings"}
                total={
                  doctorReducer?.appointmentStatistics?.emergencyBookings || 0
                }
                cardAlign={"Doctor"}
                imgUrl={emergency}
                color={"#F1F8FF"}
              />
            </div>
            <div className="row m-0 p-0 gap-2 gap-lg-0 h-auto">
              <div className="persona-list col-lg-5 col-md-12">
                <span className="pre-text mx-1 ">Upcoming Appointments</span>
                <div className=" list-container_2 bg-white p-2 pt-1 pe-1">
                  <div className="list">
                    <div className="h-100 pe-1 overflow">
                      {doctorReducer?.upcomingAppointmentListDoctor?.map(
                        (item, i) => {
                          return (
                            <div key={i} className="list-item">
                              <div className="d-flex">
                                <img
                                  className="list-item-img"
                                  src={item?.Image || marco}
                                  alt=""
                                />
                                <div className="list-title">
                                  <p className="t-name">{item?.PatientName}</p>
                                  <div className="t-designation">{`Age ${
                                    item?.age || 32
                                  }`}</div>
                                </div>
                              </div>
                              <div className="list-desc">
                                <div className="t-name1 doc-issue">
                                  <p className="">{item?.problem}</p>
                                </div>
                              </div>
                              <button className="list-btn primary">
                                <img className="video" src={video} alt="abc" />
                                <span
                                  className="m-auto text-nowrap"
                                  onClick={() =>
                                    handleJoinCall(item?.MeetingId)
                                  }
                                >
                                  Join the Call
                                </span>
                              </button>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <div className="meetings">
                    <div className="d-flex">
                      <div className="line1"></div>
                      <div className="in_house text-nowrap">
                        In-House Meetings
                      </div>
                      <div className="line1"></div>
                    </div>
                    <div className="pe-1 boardmeeting">
                      {BoardMeeting.map((item, i) => (
                        <div
                          key={i}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <div className="d-flex">
                            <img
                              className="board p-1"
                              width="30px"
                              src={board}
                              alt=""
                            />
                            <div className="t-name2 text-nowrap">
                              {item.title}
                            </div>{" "}
                          </div>
                          <button className="list-btn mt-3">{item.time}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="doctor-p-feedback col-md-12 col-lg-7 pe-0 py-0 ps-12px">
                <div className="persona-list-right">
                  <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                    <span className="pre-text">Patient's Feedback</span>
                  </div>
                  <div className=" list-container1 bg-white py-2 ">
                    <div className="list h-100">
                      <div className="dept-list">
                        {doctorReducer?.feedbackList &&
                          doctorReducer?.feedbackList?.map(
                            (feedback, feedbackId) => {
                              return (
                                <div
                                  key={feedbackId}
                                  className="feedback mb-1 pb-1"
                                >
                                  <b className="font_name">
                                    {feedback?.Name || "Dummy Name"}
                                  </b>
                                  <div className=" d-flex justify-content-between pe-4">
                                    <p className="text d-flex">
                                      {feedback?.description}
                                    </p>
                                    <div>
                                      {new Array(feedback?.rating)
                                        ?.fill(0)
                                        ?.map((m, i) => {
                                          return (
                                            <img
                                              key={i}
                                              src={star}
                                              className="star"
                                              alt=""
                                            />
                                          );
                                        })}
                                      {new Array(5 - feedback?.rating)
                                        ?.fill(0)
                                        ?.map((m, i) => {
                                          return (
                                            <img
                                              key={i}
                                              src={emptystar}
                                              className="star"
                                              alt=""
                                            />
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100 ticket-status-cont pt-12px">
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
                              <span className="fw-bold">Resolved</span>
                              <div className="h-auto">
                                {doctorReducer?.ticketsCount?.resolved || 0}
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
                              <span className="fw-bold">Active</span>
                              <div className="h-auto">
                                {doctorReducer?.ticketsCount?.active || 0}
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
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default DoctorHome;
