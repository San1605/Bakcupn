import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoBot from "../../components/InfoBot/InfoBot";
import Loader from "../../../../components/Loader/Loader";
import PrescriptionInfo from "../../components/PrescriptionInfo/PrescriptionInfo";
import { getPatientParticularPrescription } from "../../../../services/patientApi";
import "./ParticularPrescription.css";

const ParticularPrescription = () => {
  const { id } = useParams();
  const [prescription, setprescription] = useState({});
  const [mlResponse, setMlResponse] = useState("");
  const [prescriptionLoading, setPrescriptionLoading] = useState(true);
  const [medName, setMedName] = useState();

  const getParticularPrescription = async () => {
    setPrescriptionLoading(true);
    try {
      const res = await getPatientParticularPrescription(id);
      setprescription(res?.data?.data[0]);
    } catch (err) {
      console.log("getParticularPrescription", err);
    }
    setPrescriptionLoading(false);
  };

  useEffect(() => {
    getParticularPrescription();
  }, []);

  return (
    <>
      {!prescriptionLoading ? (
        <div className="particularpriscription">
          <div className=" home-top row m-0 p-0 w-100">
            <div className="mb-2 p-0">
              <h3 className="heading-overview mb-1">Prescriptions</h3>
              <h2 className="heading-homepage">Prescriptions/{id}</h2>
            </div>
          </div>
          <div className="d-flex">
            <div className="left">
              <PrescriptionInfo
                chiefConcern={prescription.chiefConcern}
                diagnosis={prescription.Diagnosis}
                followUp={prescription.followUp}
                setMlResponse={setMlResponse}
                setMedName={setMedName}
              />
            </div>
            {mlResponse && (
              <InfoBot
                medName={medName}
                mlResponse={mlResponse}
                setMlResponse={setMlResponse}
              />
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ParticularPrescription;
