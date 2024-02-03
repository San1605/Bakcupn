import React from "react";
import "./kpicard.css";
function Kpicard(props) {
  return (
    <>
      <div className="kpi-card row p-2 justify-content-between bg-white">
        <div className="icon col-3 d-flex align-items-center justify-content-center">
          <div
            className="kpi-card-icon p-2 rounded "
            style={{ backgroundColor: `${props.kpi.color}` }}
          >
            <img src={props.kpi.image} alt="#" />
          </div>
        </div>
        <div className="kpi-card-stats col-9 ps-2">
          <div className="kcs-count" >{props.kpi.innerno}</div>
          <div className="kcs-title">
            <p>{props.kpi.title}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Kpicard;
