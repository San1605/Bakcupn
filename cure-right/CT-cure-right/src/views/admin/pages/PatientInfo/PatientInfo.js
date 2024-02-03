import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DoctorConsultedModal from "../../components/DoctorConsultedModal/DoctorConsultedModal";
import Loader from "../../../../components/Loader/Loader";
import eyes_icon from "../../../admin/assets/icons/eyes_icon.svg";
import {
  getPatientByPatientId,
  getPatientTicketList,
} from "../../../../services/adminApi";
import "./PatientInfo.css";
import PatientDetailsSection from "../../components/PatientDetailsSection/PatientDetailsSection";
import PatientFilesSection from "../../components/PatientFilesSection/PatientFilesSection";
import AppointmentSection from "../../components/AppointmentsSection/AppointmentsSection";
import TicketsSection from "../../components/TicketsSection/TicketsSection";

const PatientInfo = () => {
  const { id } = useParams();
  const [ticketsList, setTicketsList] = useState([]);
  const [patientInfo, setPatientInfo] = useState();
  const [showComponent, setShowComponent] = useState(false);
  const [ticketsListLoading, setTicketsListLoading] = useState(true);
  const [patientInfoLoading, setPatientInfoLoading] = useState(true);

  const getPatientTicketlist = async (e) => {
    setTicketsListLoading(true);
    try {
      let res = await getPatientTicketList(id);
      setTicketsList(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
    setTicketsListLoading(false);
  };

  const getPatientById = async (e) => {
    setPatientInfoLoading(true);
    try {
      let res = await getPatientByPatientId(id);
      console.log(res?.data?.data[0]);
      setPatientInfo(res?.data?.data[0]);
    } catch (err) {
      console.log(err);
    }
    setPatientInfoLoading(false);
  };

  useEffect(() => {
    getPatientTicketlist();
    getPatientById();
  }, []);

  return (
    <>
      {!ticketsListLoading && !patientInfoLoading ? (
        <div>
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2">
                <h3 className="heading-overview mb-1">Patients</h3>
                <h2 className="heading-homepage">
                  List of Patients/Shane Watson
                </h2>
              </div>
              <button
                className="Onboard_New"
                onClick={() => setShowComponent(true)}
              >
                Doctor's Consulted{" "}
                <img src={eyes_icon} alt="/" className="ms-2 eyes_icon" />{" "}
              </button>
            </div>
            <div className="row m-0 gap-2 gap-lg-0  p-0">
              <div className="col-lg-8 ps-0">
                <PatientDetailsSection patientInfo={patientInfo} />
              </div>
              <div className="col-lg-4 p-0">
                <PatientFilesSection />
              </div>
            </div>
            <div className="row gap-2 gap-lg-0  m-0 pt-12px">
              <div className="col-lg-7 ps-0 pe-12px">
                <AppointmentSection />
              </div>
              <div className="col-lg-5 p-0">
                <TicketsSection ticketsList={ticketsList} />
              </div>
            </div>
          </>
          {showComponent && (
            <DoctorConsultedModal
              show={showComponent}
              onHide={() => {
                setShowComponent(false);
              }}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PatientInfo;
