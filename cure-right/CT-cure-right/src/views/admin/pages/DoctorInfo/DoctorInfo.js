import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import KpiCard from "../../../../components/KpiCard/KpiCard";
import PatientFeedbackSection from "../../components/PatientFeedbackSection/PatientFeedbackSection.js";
import REVENUE_ICON from "../../../../assets/icons/revenue.svg";
import purple from "../../../../assets/background/purple.svg";
import pink from "../../../../assets/background/pink.svg";
import blue from "../../../../assets/background/blue.svg";
import { setDoctorAnalytics } from "../../../../redux/actions";
import "./DoctorInfo.css";
import {
  getDoctor,
  getDoctorTicketList,
  getDoctorAnalyticsApi,
} from "../../../../services/adminApi";
import { getPatientFeedback } from "../../../../services/commonApi";
import Loader from "../../../../components/Loader/Loader";
import AboutDoctor from "../../components/DoctorDetailsSection/DoctorDetailsSection";
import DoctorSpecialitiesSection from "../../components/DoctorSpecialitiesSection/DoctorSpecialitiesSection";
import Calendar from "../../components/CalendarSection/CalendarSection";
import TicketsSection from "../../components/TicketsSection/TicketsSection";

const DoctorInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [patientFeedbackList, setPatientFeedbackList] = useState([]);
  const [doctorData, setDoctorData] = useState({});
  const [ticketsList, setTicketsList] = useState([]);
  const [patientFeedbackLoading, setPatientFeedbackLoading] = useState(true);
  const [doctorDataLoading, setDoctorDataLoading] = useState(true);
  const [ticketsListLoading, setTicketsListLoading] = useState(true);
  const [doctorAnalyticsLoading, setDoctorAnalyticsLoading] = useState(true);
  const adminReducer = useSelector((state) => state.AdminReducer);

  const getPatientsFeedbackData = async (e) => {
    setPatientFeedbackLoading(true);
    try {
      let res = await getPatientFeedback(id);
      setPatientFeedbackList(res?.data?.data);
    } catch (err) {
      console.log("getPatientsFeedbackData", err);
    }
    setPatientFeedbackLoading(false);
  };

  const getDoctorData = async (e) => {
    setDoctorDataLoading(true);
    try {
      let res = await getDoctor(id);
      setDoctorData(res?.data?.data[0]);
    } catch (err) {
      console.log(err);
    }
    setDoctorDataLoading(false);
  };

  const getDoctorTickets = async (e) => {
    setTicketsListLoading(true);
    try {
      let res = await getDoctorTicketList(id);
      setTicketsList(res?.data?.data);
    } catch (err) {
      console.log("getDoctorTickets", err);
    }
    setTicketsListLoading(false);
  };

  const doctorAnalyticsApi = async () => {
    setDoctorAnalyticsLoading(true);
    try {
      const res = await getDoctorAnalyticsApi(id);
      dispatch(setDoctorAnalytics(res?.data?.data[0]));
    } catch (error) {
      console.log(error);
    }
    setDoctorAnalyticsLoading(false);
  };

  useEffect(() => {
    getPatientsFeedbackData();
    getDoctorData();
    getDoctorTickets();
    doctorAnalyticsApi();
  }, []);

  return (
    <>
      {!doctorDataLoading &&
      !patientFeedbackLoading &&
      !ticketsListLoading &&
      !doctorAnalyticsLoading ? (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="mb-2">
              <h3 className="heading-overview mb-1">Doctors</h3>
              <h2 className="heading-homepage">
                List of Doctors/{doctorData?.FullName}
              </h2>
            </div>
            <button className="Onboard_New">View Patients</button>
          </div>
          <div className="tilesContainer admin-tiles doc-info pb-12px">
            <KpiCard
              name={"Active Hours"}
              cardAlign={"Admin"}
              total={adminReducer?.doctorAnalytics?.ActiveHours || 0}
              imgUrl={REVENUE_ICON}
              bgImg={purple}
            />
            <KpiCard
              cardAlign={"Admin"}
              name={"Patient Retention"}
              total={adminReducer?.doctorAnalytics?.patientRetention || 0}
              imgUrl={REVENUE_ICON}
              bgImg={blue}
            />
            <KpiCard
              cardAlign={"Admin"}
              total={adminReducer?.doctorAnalytics?.patientCount || 0}
              name={"Total Patients "}
              imgUrl={REVENUE_ICON}
              bgImg={pink}
            />
            <KpiCard
              cardAlign={"Admin"}
              name={"Average Feedback"}
              total={adminReducer?.doctorAnalytics?.averageFeedback || 0}
              imgUrl={REVENUE_ICON}
              bgImg={purple}
            />
            <KpiCard
              cardAlign={"Admin"}
              name={"Online Consultation"}
              total={adminReducer?.doctorAnalytics?.online_consultancy || 0}
              imgUrl={REVENUE_ICON}
              bgImg={blue}
            />
            <KpiCard
              cardAlign={"Admin"}
              total={adminReducer?.doctorAnalytics?.offline_consultancy || 0}
              name={"Offline Consultation"}
              imgUrl={REVENUE_ICON}
              bgImg={pink}
            />
          </div>
          <div className="row px-0 m-0 w-100 pb-12px">
            <div
              className="column gap-lg-0 col-lg-4 p-0 d-flex flex-column"
              style={{ minHeight: "100%" }}
            >
              <div className="">
                <AboutDoctor doctorData={doctorData} />
              </div>
              <div className="pt-12px flex-grow-1">
                <PatientFeedbackSection
                  patientFeedbackList={patientFeedbackList}
                />
              </div>
            </div>
            <div className="column gap-lg-0 col-lg-8 pe-0 m-0 ps-12px">
              <div className="admin-calender h-50 w-100 pb-12px">
                <Calendar />
              </div>
              <div className="right-bottom-cont row w-100 m-0 p-0 h-50">
                <div className="ticket-doctor ps-0 pe-12px h-100 col-lg-6 col-md-12">
                  <TicketsSection ticketsList={ticketsList} />
                </div>
                <div className="h-100 px-0 col-lg-6 col-md-12 ">
                  <DoctorSpecialitiesSection />
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
};

export default DoctorInfo;
