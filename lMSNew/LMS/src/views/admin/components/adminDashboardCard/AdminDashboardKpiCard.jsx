import React from "react";
import AdminDashboardCardHalfPie from "./AdminDashboardCardPie";

function AdminDashboardKpiCard(props) {
  return (
    <div className="col-lg-4 col-md-6 col-12 padding-admin-kpi-card">
      <div className="adminDashboardKpiPadding AdminDashboardKpiCard bg-white">
        <div className="adminDashboardCardTitle">
          <p>{props.title}</p>
        </div>
        <div className="col-12 row adminDashboardSubContainer">
          <div className="col-6 adminCardPieWidth">
            <div className="adminDashboardCardComponentContainer">
              <AdminDashboardCardHalfPie data={props.data} />
            </div>
          </div>
          <div className="col-4 text-center d-flex flex-column adminDashboardLabelMainContainer">
            <div className="adminDashboardLabelSubContainer">
              <div className="adminDashboardCardLabelContainer d-flex align-items-center">
                <div className="adminDashboardCardLabelDot p-1 adminDashboardCardLabelOne"></div>
                <div className="legentTileName">{props.data1}</div>
              </div>
              <div className="adminDashboardCardLabelContainer d-flex align-items-center">
                <div className="adminDashboardCardLabelDot p-1 adminDashboardCardLabelTwo"></div>
                <div className="legentTileName">{props.data2}</div>
              </div>
              <div className="adminDashboardCardLabelContainer d-flex align-items-center">
                <div className="adminDashboardCardLabelDot p-1 adminDashboardCardLabelThree"></div>
                <div className="legentTileName">{props.data3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardKpiCard;
