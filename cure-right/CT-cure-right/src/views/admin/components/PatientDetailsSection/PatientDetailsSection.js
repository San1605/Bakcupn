<<<<<<< Updated upstream:src/views/admin/components/PatientDetailsSection/PatientDetailsSection.js
import React from "react";
import ProfileIcon from "../../../../assets/icons/profile.svg";
import sms from "../../../../assets/icons/sms.svg";
import phone from "../../../../assets/icons/phone.svg";

const PatientDetailsSection = ({ patientInfo }) => {
  return (
    <div className="about_patient px-2 round-2 py-2">
      <h5 className="about_patient_heading">About Patient</h5>
      <div className="about_patient_info p-3">
        <div className="d-flex gap-3 align-items-center flex-column flex-md-row">
          <img
            src={patientInfo?.Image || ProfileIcon}
            alt=""
            className="about_patient_personal_info_img p-1"
          />
          <p className="about_patient_personal_name text-nowrap m-0">
            {patientInfo?.Name || "Anita Henderson"}
          </p>
          <button className="about_patient_personal_info_btn">
            <img src={phone} alt="" />
            {patientInfo?.MobileNumber || "7969696588"}
          </button>
          <button className="about_patient_personal_info_btn">
            <img src={sms} alt="" />
            {patientInfo?.email || "anitahender@gmail.com"}
          </button>
        </div>
=======
import React, { useState ,useEffect} from "react";
import ProfileIcon from "../../../../../assets/icons/profile.svg";
import sms from "../../../../../assets/icons/sms.svg";
import phone from "../../../../../assets/icons/phone.svg";
import { useParams } from "react-router-dom";
import Loader from "../../../../../components/Loader/Loader";
import { getPatientInfoDoctor } from "../../../../../services/doctorApi";

const AboutPatient = () => {
>>>>>>> Stashed changes:src/views/admin/components/PatientInfo/PatientInfoComponents/AboutPatient.jsx


const {id  }  = useParams();
  
  const [patientInfo,setPatientInfo]=useState([]);
  const [patientInfoloading,setpatientInfoLoading]=useState(true);

  const getPatientInfo = async () => {  
  try {
    setpatientInfoLoading(true);
    const res = await getPatientInfoDoctor(id);
    console.log(res?.data?.data[0]);
    setPatientInfo(res?.data?.data[0]);
    setpatientInfoLoading(false);
  }

  catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  getPatientInfo();
}, []);


if(patientInfoloading){
  return <Loader/>
}


function getFormattedDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;
}




return (
  <div className="about_patient px-2 round-2 py-2">
    <h5 className="about_patient_heading">About Patient</h5>
    <div className="about_patient_info p-3">
      <div className="d-flex gap-3 align-items-center flex-column flex-md-row">
        <img
          src={patientInfo?.Image || ProfileIcon}
          alt=""
          className="about_patient_personal_info_img p-1"
        />
        <p className="about_patient_personal_name text-nowrap m-0">
          {patientInfo?.Name || "Anita Henderson"}
        </p>
        <button className="about_patient_personal_info_btn">
          <img src={phone} alt="" />
          {patientInfo?.MobileNumber || "7969696588"}
        </button>
        <button className="about_patient_personal_info_btn">
          <img src={sms} alt="" />
          {patientInfo?.email || "anitahender@gmail.com"}
        </button>
      </div>

      <h5 className="about_patient_basic_info my-1">Basic Info</h5>

      <div className="row m-0 p-0">
        <label className="about_patient_med_label p-0 col-lg-2 col-3">
          Blood Group:{" "}
        </label>
        <p className="about_patient_med_label_info ps-3 col-lg-4 col-3">
          {patientInfo?.bloodGroup || "A+"}
        </p>
      </div>

      <div className="row m-0 p-0">
        <label className="about_patient_med_label p-0 col-lg-2 col-3">
          Date of Birth:
        </label>
        <p className="about_patient_med_label_info ps-3 col-lg-4 col-6">
          {patientInfo?.DOB || "12 June, 1994"}
        </p>
      </div>
      <div className="row m-0 p-0">
        <label className="about_patient_med_label p-0 col-lg-2 col-3 text-nowrap">
          Chronic Disease:{" "}
        </label>
        <p className="about_patient_med_label_info ps-3 col-lg-4 col-6">
          {patientInfo?.chronicDisease || "None"}
        </p>
      </div>
      <div className="row m-0 p-0">
        <label className="about_patient_med_label p-0 col-lg-2 col-3">
          Allergic To:{" "}
        </label>
        <p className="about_patient_med_label_info ps-3 col-lg-4 col-6 text-danger">
          {patientInfo?.AllergicTo || "Ibuprofen"}
        </p>
      </div>
      {/* <div className="row m-0 p-0">
          <label className="about_patient_med_label p-0 col-lg-2 col-3">
            Address:{" "}
          </label>
          <p className="about_patient_med_label_info ps-3 text-nowrap col-lg-4 col-6">
            {patientInfo?.Address || "68, Pennsylvania, Washington"}
          </p>
        </div> */}
      <div className="row m-0 p-0">
        <label className="about_patient_med_label p-0 col-lg-2 col-3">
          Onboarded On:{" "}
        </label>
        <p className="about_patient_med_label_info ps-3 col-lg-4 col-3">
          {getFormattedDate(patientInfo?.createdAt) || "12-02-2021"}
        </p>
      </div>
    </div>
  </div>
);
};

export default PatientDetailsSection;
