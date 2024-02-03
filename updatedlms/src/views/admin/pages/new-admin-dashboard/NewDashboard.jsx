// import React, { useState, useEffect } from "react";
// import { AiFillPieChart, AiOutlinePieChart } from "react-icons/ai";
// import { RiOrganizationChart } from "react-icons/ri";
// import { VscOrganization } from "react-icons/vsc";
// import "./newadmindashboard.css";
// import DataAnalytics from "../dashboard/Data Analytics/DataAnalytics";
// import Dashboard from "../dashboard/EmployeeList/Dashboard";
// import OrgChart from "../dashboard/OrgChart/OrgChart";
// import LpAnalytics from "../dashboard/LPAnalytics/LpAnalytics";

// function NewDashboard({setAdminswitch}) {
//     const [activeButton, setActiveButton] = useState(1);
//     const [ticketReason, setTicketReason] = useState("");
//     const reasonsofticket = ["App Developemnt", "PMO", "HR", "UI/UX", "Big Data", "All"]
//     const handleButtonClick = (buttonNumber) => {
//         setActiveButton(buttonNumber);
//     };
//     useEffect(() => {
//         const geturl = window.location.pathname.split("/");
//         if (geturl[1] === "admin") {
//             setAdminswitch(true);
//         } else {
//           setAdminswitch(false);
//         }
//       }, []);
//     return (
//         <>
            {/* {loading === true ? (
        <div className="page-loader-div">
          <Bars
            height="50"
            width="50"
            color="#4F52B2"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass="page-loader"
            visible={true}
          />
        </div>
      ) : null} */}
            {/* <div className="adminDashboardBtnContainer rowGap-10">
                <div className="d-flex justify-content-start align-items-center flex-wrap columnGap-10 rowGap-10">
                    <button type="button" className="modal-outer-primary-btn d-flex align-items-center text-white columnGap-10 p-2 nowrap" onClick={() => handleButtonClick(1)}><AiOutlinePieChart />Data Analytics</button>
                    <button type="button" className="modal-outer-secondary-btn d-flex align-items-center text-white columnGap-10 p-2 nowrap" onClick={() => handleButtonClick(2)}><VscOrganization />Employee List</button>
                    <button type="button" className="modal-outer-secondary-btn d-flex align-items-center text-white columnGap-10 p-2 nowrap" onClick={() => handleButtonClick(3)}><RiOrganizationChart />Org Chart</button>
                    <button type="button" className="modal-outer-secondary-btn d-flex align-items-center text-white columnGap-10 p-2 nowrap" onClick={() => handleButtonClick(4)}><RiOrganizationChart />LP Analytics</button>
                </div>
                <select
                    name="reason"
                    id="selectReason"
                    onChange={(e) => setTicketReason(e.target.value)}
                    className="w-25 px-3 py-2 rounded ms-3 pointer"
                    required
                    style={{
                        textOverflow: "ellipsis",
                    }}
                >
                    <option value="All" hidden selected>
                        Select Department
                    </option>
                    {reasonsofticket.map((elem) => {
                        return (
                            <option value={elem}>
                                {elem}
                            </option>
                        );
                    })}
                </select>
            </div>
            {activeButton === 1 && <DataAnalytics />}
            {activeButton === 2 && <Dashboard setAdminswitch={setAdminswitch} />}
            {activeButton === 3 && <OrgChart />}
            {activeButton === 4 && <LpAnalytics />}
        </>
    );
}

export default NewDashboard; */}