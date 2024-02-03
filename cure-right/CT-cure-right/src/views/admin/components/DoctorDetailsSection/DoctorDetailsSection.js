import React from "react";
import "./DoctorDetailsSection.css";
import ProfileIcon from "../../../../assets/icons/profile.svg";

const DoctorDetailsSection = ({ doctorData }) => {
  return (
    <div className="doctor_div">
      <div className="doctor_div1 overflow-auto">
        <div className="doctor_border d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={doctorData?.image || ProfileIcon}
              alt=""
              className="about_img ms-3"
            />
            <div className="year_div ms-2">
              <h6 className="doctor_font m-0 text-nowrap">
                {doctorData?.FullName}
              </h6>
            </div>
          </div>
          <div className="button1 px-2">View Details</div>
        </div>
        <div className="aboutDoctor">
          <b className="bold_text">Contact Information</b>
          <div className="patient_div d-flex flex-row  pt-1">
            <div className="font_contact pt-2 d-flex flex-column  ">
              <p>Phone Number:</p>
              <p>Email:</p>
              <p>Address: </p>
            </div>
            <div className="font d-flex flex-column ">
              <p>{doctorData?.phoneNumber1}</p>
              <p>{doctorData?.email}</p>
              <p>{doctorData?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsSection;
