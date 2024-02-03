import React from "react";
import "./KpiCard.css";

const KpiCard = ({ color, imgUrl, name, total, bgImg, cardAlign }) => {
  return (
    <div
      className={`totaldisplaycard  h-100 d-flex ${
        cardAlign === "Admin"
          ? " totaldisplaycard flex-column justify-content-center align-items-start gap-1"
          : " totaldisplaycard_doctor flex-row justify-content-start align-items-center gap-2"
      }`}
      style={
        !!color && !bgImg
          ? { background: `${color}` }
          : { backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }
      }
    >
      <img
        className={`totaldisplaycard_image ${
          cardAlign === "Doctor" &&
          "bg-white rounded py-1 px-1 totaldisplaycard_image_doctor"
        }`}
        width="30px"
        src={imgUrl}
        alt=""
      />
      <div className="d-flex gap-0 flex-column">
        <h5
          className={`m-0 text-nowrap ${
            cardAlign === "Admin" && "text-black-50"
          }`}
        >
          {name}
        </h5>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default KpiCard;
