import React from "react";
import files from "../../../admin/assets/icons/files.svg";

const AppointmentSection = () => {
  return (
    <div className="about_patient h-100 px-2 round-2 py-2">
      <h5 className="about_patient_heading">Appointments</h5>
      <div className="about_ticket_info p-3 overflow-auto">
        <div className="d-flex ps-4 mx-1 align-items-center justify-content-md-around gap-2 gap-md-0 appoitment-follow-ups">
          <div className="admin_patient_ticket_dot"></div>
          <p className="ticket_text text-nowrap m-0">Follow Up</p>
          <p className="ticket_text text-nowrap text-black-50 m-0">
            Dr. Medison Shane
          </p>
          <p className="ticket_text text-nowrap text-black-50 m-0">
            26, April 2023 | 09:00 AM
          </p>
          <button className="border-0 text-nowrap appointment_btn_status">
            Planned
          </button>
          <button className="border-0 bg-white text-nowrap appointment_btn_file">
            <img
              className=""
              style={{
                width: "1rem",
              }}
              src={files}
              alt=""
            />{" "}
            Files
          </button>
        </div>
        <div className="d-flex ps-4 mx-1 align-items-center justify-content-md-around gap-2 gap-md-0 appoitment-follow-ups">
          <div className="admin_patient_ticket_dot"></div>
          <p className="ticket_text text-nowrap m-0">Follow Up</p>
          <p className="ticket_text text-nowrap text-black-50 m-0">
            Dr. Medison Shane
          </p>
          <p className="ticket_text text-nowrap text-black-50 m-0">
            26, April 2023 | 09:00 AM
          </p>
          <button className="border-0 text-nowrap appointment_btn_status">
            Planned
          </button>
          <button className="border-0 bg-white text-nowrap appointment_btn_file">
            <img
              className=""
              style={{
                width: "1rem",
              }}
              src={files}
              alt=""
            />{" "}
            Files
          </button>
        </div>
        <div className="d-flex ps-4 mx-1 align-items-center justify-content-md-around gap-2 gap-md-0 appoitment-follow-ups">
          <div className="admin_patient_ticket_dot"></div>
          <p className="ticket_text text-nowrap m-0">Follow Up</p>
          <p className="ticket_text text-nowrap text-black-50 m-0">
            Dr. Medison Shane
          </p>
          <p className="ticket_text text-nowrap text-black-50 m-0">
            26, April 2023 | 09:00 AM
          </p>
          <button className="border-0 text-nowrap appointment_btn_status">
            Planned
          </button>
          <button className="border-0 text-nowrap bg-white appointment_btn_file">
            <img
              className=""
              style={{
                width: "1rem",
              }}
              src={files}
              alt=""
            />{" "}
            Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
