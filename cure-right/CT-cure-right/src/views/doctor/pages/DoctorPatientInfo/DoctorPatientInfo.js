import React from "react";
import PatientDetailsSection from "../../../admin/components/PatientDetailsSection/PatientDetailsSection";
import PatientFilesSection from "../../../admin/components/PatientFilesSection/PatientFilesSection";
import AppointmentSection from "../../../admin/components/AppointmentsSection/AppointmentsSection";

const DoctorPatientInfo = () => {
  return (
    <>
      <div className="mb-2">
        <h3 className="heading-overview mb-1">Patients</h3>
        <h2 className="heading-homepage">My Patients</h2>
      </div>

      <div className="row m-0  gap-lg-0  pe-12px  p-0">
        <div className="col-lg-8 h-100 p-0">
          <PatientDetailsSection />
        </div>
        <div className="col-lg-4  ps-12px pe-0">
          <PatientFilesSection
            style={{
              backgroundColor: "#FBF5FD",
            }}
          />
        </div>
      </div>
      <div className="row gap-2 gap-lg-0  m-0 pt-12px ">
        <div className="col-lg-12 p-0 ">
          <AppointmentSection />
        </div>
      </div>
    </>
  );
};

export default DoctorPatientInfo;
