import React, { useState } from "react";
import "./SpecializationCard.css";
import { useNavigate } from "react-router-dom";

const SpecializationCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    image,
    departmentName,
    departmentAbout,
    numberOfDoctors,
    surgeriesPerformed,
  } = data;
  const [departName] = useState(
    departmentName?.split(" ")?.join("")?.toLowerCase()
  );
  return (
    <div
      className="specialization-card"
      onClick={() => navigate(`/departments/speciality/${departName}`)}
    >
      <div className="specialization-card-content">
        <div className="img-cont">
          <img className="w-100" src={image} alt="" />
        </div>
        <div className="title">{departmentName}</div>
        <div className="desc">{departmentAbout}</div>
      </div>
      <div className="card-bottom">
        <div className="left">
          <div>No. of Doctors</div>
          <div>Surgeries Performed</div>
        </div>
        <div className=" right">
          <div>{numberOfDoctors}</div>
          <div>{surgeriesPerformed}</div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationCard;
