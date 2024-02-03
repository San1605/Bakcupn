import React, { useEffect, useState } from "react";
import PrescriptionCard from "../../components/PrescriptionCard/PrescriptionCard";
import "./Prescriptions.css";
import { Link, useNavigate } from "react-router-dom";
import { getPatientPrescriptionList } from "../../../../services/patientApi";
import Loader from "../../../../components/Loader/Loader";

const Prescriptions = () => {
  const navigate = useNavigate();
  const [prescriptionList, setprescription] = useState([]);
  const [prescriptionListLoading, setprescriptionLoading] = useState();

  const handleNavigate = (prescriptionId) => {
    navigate(`/prescriptions/${prescriptionId}`);
  };

  const getPrescriptionList = async () => {
    setprescriptionLoading(true);
    try {
      const res = await getPatientPrescriptionList();
      setprescription(res?.data);
    } catch (error) {
      console.log(error);
    }
    setprescriptionLoading(false);
  };

  useEffect(() => {
    getPrescriptionList();
  }, []);

  return (
    <>
      {!prescriptionListLoading ? (
        <div className="h-auto d-flex flex-column">
          <div className="home-top p-0 m-0 w-100 mb-3">
            <h3 className="heading-overview mb-0">Prescriptions</h3>
            <h2 className="heading-homepage">Prescriptions</h2>
          </div>
          <div className="prescriptions-cards-cont">
            {prescriptionList?.length > 0 &&
              prescriptionList?.map((list, index) => (
                <div
                  key={list.prescriptionId}
                  onClick={() => handleNavigate(list.prescriptionId)}
                >
                  <PrescriptionCard {...list} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Prescriptions;
