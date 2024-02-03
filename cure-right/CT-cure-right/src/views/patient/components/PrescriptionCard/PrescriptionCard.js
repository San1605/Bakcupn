import React from "react";
import MEDICINE from "../../assets/images/medicineImg.png";
import "./PrescriptionCard.css";

const PrescriptionCard = (props) => {
  const dateAfter30 = (inputDateStr) => {
    var inputDate = new Date(inputDateStr);
    inputDate.setDate(inputDate.getDate() + 30);
    var newDateFormatted = inputDate.toISOString().split("T")[0];
    return newDateFormatted;
  };

  const formatDate = (dateStr) => {
    console.log(dateStr);
    const options = {  month: 'short', day: 'numeric', year: '2-digit'};
    const formattedDate = new Date(dateStr).toLocaleDateString(undefined, options);
    const [day,month, year] = formattedDate.split(" ");
    let dayWithSuffix = day;
    if (day.endsWith("1") && day !== "11") {
      dayWithSuffix += "st";
    } else if (day.endsWith("2") && day !== "12") {
      dayWithSuffix += "nd";
    } else if (day.endsWith("3") && day !== "13") {
      dayWithSuffix += "rd";
    } else {
      dayWithSuffix += "th";
    }

    return ` ${dayWithSuffix} ${month}, ${year}`;
  };

  return (
    <div className="prescriptionCard">
      <div className="pres-top">
        <img src={MEDICINE} alt="" height="45" />
        <div className=" pres-title flex flex-column">
          <span className="">{props?.fullName}</span>
          <span className="dignosis_state">Online</span>
        </div>
      </div>
      <hr />
      <div className="pres-bottom">
        <label className="prescription-concern">Concern</label>
        <label className="prescription-concern1">
          {(props?.Diagnosis[0]?.info?.concern === "fever" && "Fever") || "problem"}
        </label>
        <label className="prescription-concern">Date of Appointment</label>
        <label className="prescription-concern1">
          {/* {formatDate(props?.createdAt)} */} 13th Aug, 23
        </label>
      </div>
    </div>
  );
};

export default PrescriptionCard;