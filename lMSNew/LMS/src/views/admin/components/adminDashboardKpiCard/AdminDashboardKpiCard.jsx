import React from "react"
import "./adminDashboardKpiCard.css"

const AdminDashboardKpiCard = (props) => {
    return (
        <div className="adminKpiCard border rounded">
            <div className="d-flex align-items-center justify-content-between">
                <img src={props.kpi.image} alt="#" className="uni-border icon pe-5" />
                <div className="adminKcsCount" >{props.kpi.innerno}</div>
            </div>
            <p className="adminKcsTitle">{props.kpi.title}</p>
        </div>
    )
}

export default AdminDashboardKpiCard
