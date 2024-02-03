import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import KpiCard from "../../../../components/KpiCard/KpiCard";
import Searchbar from "../../../../components/Searchbar/Searchbar";
import Button from "../../../../components/Button/Button";
import Loader from "../../../../components/Loader/Loader";
import REVENUE_ICON from "../../../../assets/icons/revenue.svg";
import purple from "../../../../assets/background/purple.svg";
import pink from "../../../../assets/background/pink.svg";
import blue from "../../../../assets/background/blue.svg";
import GEN_MED_ICON from "../../assets/icons/gen-medicine.svg";
import neuro from "../../../../views/admin/assets/icons/neuro.svg";
import radiology from "../../../../views/admin/assets/icons/radiology.svg";
import orthopedic from "../../../../views/admin/assets/icons/orthopedic.svg";
import CLOCK_ICON from "../../../../assets/icons/watchIcon.png";
import WARN_ICON from "../../assets/icons/warn-status.png";
import "./AdminHome.css";
import {
  getAdminAnalyticsApi,
  getDoctorList,
} from "../../../../services/adminApi";
import { setAdminAnalytics, setDoctorsList } from "../../../../redux/actions";

const AdminHome = () => {
  const dispatch = useDispatch();
  const [tabs] = useState(["Doctors", "Patients", "Staff Members"]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const [isLoadingDoctorList, setIsLoadingDoctorList] = useState(true);
  const adminReducer = useSelector((state) => state.AdminReducer);

  const handleTabChange = (i) => {
    setActiveTabIndex(i);
  };

  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  }

  const getAdminAnalytics = async () => {
    setIsLoadingAnalytics(true);
    try {
      const res = await getAdminAnalyticsApi();
      dispatch(setAdminAnalytics(res?.data?.data[0]));
    } catch (err) {
      console.log("getAdminAnalytics", err);
    }
    setIsLoadingAnalytics(false);
  };

  const getDoctorsList = async (e) => {
    setIsLoadingDoctorList(true);
    try {
      let res = await getDoctorList();
      dispatch(setDoctorsList(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
    setIsLoadingDoctorList(false);
  };

  useEffect(() => {
    getDoctorsList();
    getAdminAnalytics();
  }, []);

  return (
    <>
      {!isLoadingAnalytics && !isLoadingDoctorList ? (
        <div className="admin-home h-100">
          <div className="h-100">
            <Col md={12}>
              <div className="mb-3">
                <h3 className="heading-overview mb-1">Overview</h3>
                <h2 className="heading-homepage">Homepage</h2>
              </div>
            </Col>
            <div className="tilesContainer admin-tiles">
              <KpiCard
                cardAlign={"Admin"}
                name={"Offline Consultation"}
                total={adminReducer?.adminAnaltyics?.offline_consultancy}
                imgUrl={REVENUE_ICON}
                bgImg={purple}
              />

              <KpiCard
                cardAlign={"Admin"}
                name={"Online Consultation"}
                total={adminReducer?.adminAnaltyics?.online_consultancy}
                imgUrl={REVENUE_ICON}
                bgImg={blue}
              />
              <KpiCard
                cardAlign={"Admin"}
                name={"Total Doctors"}
                total={adminReducer?.adminAnaltyics?.total_doctors}
                imgUrl={REVENUE_ICON}
                bgImg={pink}
              />
              <KpiCard
                cardAlign={"Admin"}
                name={"Total Patients "}
                total={adminReducer?.adminAnaltyics?.total_patients}
                imgUrl={REVENUE_ICON}
                bgImg={purple}
              />
              <KpiCard
                cardAlign={"Admin"}
                name={"Total Revenue"}
                total={adminReducer?.adminAnaltyics?.total_revenue}
                imgUrl={REVENUE_ICON}
                bgImg={blue}
              />
              <KpiCard
                cardAlign={"Admin"}
                name={"Total Staff"}
                total={adminReducer?.adminAnaltyics?.total_staff}
                imgUrl={REVENUE_ICON}
                bgImg={pink}
              />
            </div>
            <div className="admin-bottom row m-0 pt-12px pb-12px">
              <div className="persona-list-admin col-12 col-lg-5">
                <div className="incallTabs-admin ps-2">
                  {tabs.map((tab, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          handleTabChange(i);
                        }}
                        className={`tab ${activeTabIndex === i && "activeTab"}`}
                      >
                        {tab}
                      </div>
                    );
                  })}
                </div>
                {activeTabIndex === 0 ? (
                  <div className=" list-container bg-white">
                    <Searchbar type="tab" />
                    <div className="admin-list">
                      {adminReducer?.doctorList?.length > 0 &&
                        adminReducer?.doctorList?.map((doctor, index) => (
                          <div
                            className="admin-list-item"
                            key={doctor?.doctorId}
                          >
                            <div className="d-flex h-100 align-items-center  gap-3">
                              <img
                                className="admin-doctor-image"
                                src={doctor?.image}
                                alt="img"
                              />
                              <div className="admin-list-title ">
                                <div className="admin-t-name ">
                                  <p className="maxWidthClass">
                                    {`Dr. ${doctor?.FullName} `}
                                  </p>
                                </div>
                                <div className="admin-t-designation">
                                  {doctor?.Qualifications || "(MBBS, MD)"}
                                </div>
                              </div>
                            </div>
                            <div className="admin-list-desc">
                              <div className="admin-t-name">
                                {/* {getFormattedDate(doctor?.DateOfJoining)} || */}
                                24-04-2023
                              </div>
                              <div className="admin-t-designation">
                                Date of Joining
                              </div>
                            </div>
                            <button
                              className="admin-list-btn"
                              style={{
                                backgroundColor:
                                  doctor?.status === 1 ? "#D8FFD9" : "#FFF6D8",
                                color:
                                  doctor?.status === 1 ? "#3A673B" : "#9C7800",
                              }}
                            >
                              {doctor?.status === 1
                                ? "Available"
                                : "Unavailable"}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : activeTabIndex === 1 ? (
                  <div className=" list-container bg-white">
                    <Searchbar type="tab" />
                  </div>
                ) : (
                  <div className=" list-container bg-white">
                    <Searchbar type="tab" />
                  </div>
                )}
              </div>
              <div className="admin-right col-12 col-lg-7 ps-12px pe-0">
                <div className="dep-lists pb-12px">
                  <div className="persona-list-right h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                      <span className="pre-text mx-2">List of Departments</span>
                      <div className="d-flex gap-2">
                        <Button
                          type="primary"
                          text="Add New"
                          className="py-1 px-2"
                        />
                        <Button
                          type="primary"
                          text="View All"
                          className="py-1 px-2 view-all-btn"
                        />
                      </div>
                    </div>
                    <div className=" list-container bg-white">
                      <Searchbar type="tab" />
                      <div className="dept-list">
                        <div className=" d-flex justify-content-between align-item-center px-2 dept-list-item  border-1 border-bottom">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={GEN_MED_ICON} alt="" />
                            <p className="title h-auto my-auto">
                              General Medicine
                            </p>
                          </div>
                          <p className="medicineCount my-auto">240</p>
                        </div>
                        <div className=" d-flex justify-content-between align-item-center px-2  border-1 border-bottom dept-list-item">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={neuro} alt="" />
                            <p className="title h-auto my-auto">Neurology</p>
                          </div>
                          <p className="medicineCount my-auto">210</p>
                        </div>
                        <div className=" d-flex justify-content-between align-item-center px-2  border-1 border-bottom dept-list-item">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={radiology} alt="" />
                            <p className="title h-auto my-auto">Radiology</p>
                          </div>
                          <p className="medicineCount my-auto">102</p>
                        </div>
                        <div className=" d-flex justify-content-between align-item-center px-2 dept-list-item">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={orthopedic} alt="" />
                            <p className="title h-auto my-auto">Orthopedics</p>
                          </div>
                          <p className="medicineCount my-auto">80</p>
                        </div>
                        <div className=" d-flex justify-content-between align-item-center px-2 dept-list-item  border-1 border-bottom">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={GEN_MED_ICON} alt="" />
                            <p className="title h-auto my-auto">
                              General Medicine
                            </p>
                          </div>
                          <p className="medicineCount my-auto">240</p>
                        </div>
                        <div className=" d-flex justify-content-between align-item-center px-2  border-1 border-bottom dept-list-item">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={neuro} alt="" />
                            <p className="title h-auto my-auto">Neurology</p>
                          </div>
                          <p className="medicineCount my-auto">210</p>
                        </div>
                        <div className=" d-flex justify-content-between align-item-center px-2  border-1 border-bottom dept-list-item">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={radiology} alt="" />
                            <p className="title h-auto my-auto">Radiology</p>
                          </div>
                          <p className="medicineCount my-auto">102</p>
                        </div>
                        <div className=" d-flex justify-content-between align-item-center px-2 dept-list-item">
                          <div className="d-flex align-item-center gap-2">
                            <img height={39} src={orthopedic} alt="" />
                            <p className="title h-auto my-auto">Orthopedics</p>
                          </div>
                          <p className="medicineCount my-auto">80</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100 ticket-status-cont ">
                  <div className="inner-details-down p-2 overflow-auto">
                    <div className="d-flex justify-content-between h-100 px-2 py-1">
                      <div className="p-0">
                        <div
                          className="d-flex flex-column mb-2"
                          style={{ fontSize: "13px", fontWeight: "600" }}
                        >
                          <div>Tickets Status</div>
                          <div className="presmall-text">Last 30 days</div>
                        </div>
                        <button className="right-section-btn add-new">
                          View All
                        </button>
                      </div>
                      <div className="d-flex gap-4 me-3">
                        <div className="status-tile px-2 py-2 d-flex align-items-center bg-white rounded">
                          <div className=" d-flex align-items-center w-100 justify-content-between gap-3">
                            <div className="d-flex flex-column">
                              <span className="">New Ticket</span>
                              <div className="h-auto">24</div>
                            </div>
                            <img src={WARN_ICON} alt="greentick" height={45} />
                          </div>
                        </div>
                        <div className="status-tile px-2 py-2 d-flex align-items-center bg-white rounded">
                          <div className="d-flex align-items-center w-100 justify-content-between gap-3">
                            <div className="d-flex flex-column">
                              <span className="">Active</span>{" "}
                              <div className="h-auto">2</div>
                            </div>
                            <img src={CLOCK_ICON} alt="greentick" height={45} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AdminHome;
