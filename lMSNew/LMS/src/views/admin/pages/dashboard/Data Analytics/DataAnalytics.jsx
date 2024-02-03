import { useState, useContext, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Bars } from "react-loader-spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import locationIcon from "../../../assets/newAdminDashboard/location.svg";
import AdminDashboardKpiCard from "../../../components/adminDashboardKpiCard/AdminDashboardKpiCard";
import totalResourcesIcon from "../../../assets/newAdminDashboard/totalResources.svg";
import totalFTEIcon from "../../../assets/newAdminDashboard/totalFTE.svg";
import totalTraineesIcon from "../../../assets/newAdminDashboard/totalTrainees.svg";
import totalInternsIcon from "../../../assets/newAdminDashboard/totalInterns.svg";
import totalContractualResourcesIcon from "../../../assets/newAdminDashboard/totalContractualResources.svg";
import activeLMSUsersIcon from "../../../assets/newAdminDashboard/activeLMSUsers.svg";
import "./dataanalytics.css";
import { GlobalContext } from "../../../../../context/GlobalState";

const DataAnalytics = (props) => {
  const {
    adminDataAnalytics,
    adminDataOfDepartmentSelect,
    adminLoading,
    dispatch,
    adminnameloading,
    adminDataAnalyticsActiveUsers
  } = useContext(GlobalContext);
  const [searchListClose, setSearchListClose] = useState(false);
  const totalInternsHired =
    adminDataAnalytics.otherSource +
    adminDataAnalytics.offCampusSource +
    adminDataAnalytics.ReferralSource +
    adminDataAnalytics.COESource +
    adminDataAnalytics.onCampusSource;
  const totalResourcesToRM =
    adminDataAnalytics.totalBillableCriticalReportee +
    adminDataAnalytics.totalBillableNonCriticalReportee +
    adminDataAnalytics.totalNonBillableCriticalReportee +
    adminDataAnalytics.totalNonBillableNonCriticalReportee +
    adminDataAnalytics.totalFullyUtilizationReportee +
    adminDataAnalytics.totalOnBenchReportee;
  const barWidth = (a, b) => {
    if (a === 0 && b === 0) {
      return 0;
    } else {
      return (a / (a + b)) * 100;
    }
  };
  const barWidth1 = (instanceCount, totalCount) => {
    if (instanceCount === 0 && totalCount === 0) {
      return 0;
    } else {
      return (instanceCount / totalCount) * 100;
    }
  };
  const handleclickeventinner = (e)=>{
    const insider = document.getElementById("inside");
    let actual = e.target;
    if (actual === insider) {
      setSearchListClose(true);
    } else {
      setSearchListClose(false);
    }
  }
  useEffect(()=>{
    document.addEventListener("click", (e) => handleclickeventinner(e));
    return () => {
      document.removeEventListener("click", (e) => handleclickeventinner(e))
  }
  },[])
  useEffect(()=>{
    if(props.searchStr === "")
    {
      dispatch({
          type: "ADMIN_DATA_ANALYTICS_MENTOR_HRMID",
          payload: "",
        });
    }
  },[props.searchStr])
  return (
    <>
      <div className="col-12">
        <div className="row dashboardContainer" id="outside">
          <div className="bg-white d-flex flex-column rounded px-4 py-2 position-relative">
            {adminLoading ? (
              <div className="data-analytics-page-loader-div bg-white">
                <Bars
                  height="50"
                  width="50"
                  color="#4F52B2"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass="data-analytics-page-loader"
                  visible={true}
                />
              </div>
            ) : (
              <>
                <div className="row mt-4 mb-adminDashboardCards kpiCardContainer">
                  <div className="">
                    <AdminDashboardKpiCard
                      kpi={{
                        id: 0,
                        image: totalResourcesIcon,
                        title: "Total Resources",
                        innerno: adminDataAnalytics.totalEmployees,
                      }}
                    />
                  </div>
                  <div className="">
                    <AdminDashboardKpiCard
                      kpi={{
                        id: 1,
                        image: totalFTEIcon,
                        title: "Total FTE",
                        innerno: adminDataAnalytics.totalFTE,
                      }}
                    />
                  </div>
                  <div className="">
                    <AdminDashboardKpiCard
                      kpi={{
                        id: 2,
                        image: totalTraineesIcon,
                        title: "Total Trainees",
                        innerno: adminDataAnalytics.totalTrainees,
                      }}
                    />
                  </div>
                  <div className="">
                    <AdminDashboardKpiCard
                      kpi={{
                        id: 3,
                        image: totalInternsIcon,
                        title: "Total Interns",
                        innerno: adminDataAnalytics.totalInterns,
                      }}
                    />
                  </div>
                  <div className="">
                    <AdminDashboardKpiCard
                      kpi={{
                        id: 0,
                        image: totalContractualResourcesIcon,
                        title: "Contractual Resources",
                        innerno: adminDataAnalytics.totalContractual,
                      }}
                    />
                  </div>
                  <div className="">
                    <AdminDashboardKpiCard
                      kpi={{
                        id: 0,
                        image: activeLMSUsersIcon,
                        title: "Active LMS Users",
                        innerno: adminDataAnalyticsActiveUsers,
                      }}
                    />
                  </div>
                </div>
                <div className="resourceStatisticsContainer mb-adminDashboardCards">
                  <div className="col-md-12 border rounded px-3 py-3 d-flex flex-column rowGap-10">
                    <p className="nowrap resourcesDataContainerTitle">
                      Resource Billability
                    </p>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">FTE</div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.billableFTE}
                        </div>

                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.billableFTE}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.billableFTE,
                                  adminDataAnalytics.nonBillableFTE
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.nonBillableFTE}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.nonBillableFTE,
                                  adminDataAnalytics.billableFTE
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.nonBillableFTE}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">
                        Trainees
                      </div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.billableTrainee}
                        </div>
                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.billableTrainee}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.billableTrainee,
                                  adminDataAnalytics.nonBillableTrainee
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.nonBillableTrainee}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.nonBillableTrainee,
                                  adminDataAnalytics.billableTrainee
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.nonBillableTrainee}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">
                        Interns
                      </div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.billableIntern}
                        </div>
                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.billableIntern}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.billableIntern,
                                  adminDataAnalytics.nonBillableIntern
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.nonBillableIntern}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.nonBillableIntern,
                                  adminDataAnalytics.billableIntern
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.nonBillableIntern}
                        </div>
                      </div>
                    </div>
                    <div className="workLocationLegend">
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot billableResourceBar"></div>
                        <div className="legentTileName">Billable</div>
                      </div>
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot nonBillableResourceBar"></div>
                        <div className="legentTileName">Non - Billable</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 border rounded px-3 py-3 d-flex flex-column rowGap-10">
                    <p className="nowrap resourcesDataContainerTitle">
                      Resource Availability
                    </p>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">FTE</div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.onBenchResourceAvailableFTE}
                        </div>
                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.onBenchResourceAvailableFTE}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.onBenchResourceAvailableFTE,
                                  adminDataAnalytics.deployableResourceAvailableFTE
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.deployableResourceAvailableFTE
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.deployableResourceAvailableFTE,
                                  adminDataAnalytics.onBenchResourceAvailableFTE
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.deployableResourceAvailableFTE}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">
                        Trainees
                      </div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.onBenchResourceAvailableTrainee}
                        </div>
                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.onBenchResourceAvailableTrainee
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.onBenchResourceAvailableTrainee,
                                  adminDataAnalytics.deployableResourceAvailableTrainee
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.deployableResourceAvailableTrainee
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.deployableResourceAvailableTrainee,
                                  adminDataAnalytics.onBenchResourceAvailableTrainee
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {
                            adminDataAnalytics.deployableResourceAvailableTrainee
                          }
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">
                        Interns
                      </div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.onBenchResourceAvailableIntern}
                        </div>
                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.onBenchResourceAvailableIntern
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.onBenchResourceAvailableIntern,
                                  adminDataAnalytics.deployableResourceAvailableIntern
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.deployableResourceAvailableIntern
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.deployableResourceAvailableIntern,
                                  adminDataAnalytics.onBenchResourceAvailableIntern
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.deployableResourceAvailableIntern}
                        </div>
                      </div>
                    </div>
                    <div className="workLocationLegend">
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot billableResourceBar"></div>
                        <div className="legentTileName">On Bench</div>
                      </div>
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot nonBillableResourceBar"></div>
                        <div className="legentTileName">
                          Deployable Resources
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 border rounded px-3 py-3 d-flex flex-column rowGap-10">
                    <p className="nowrap resourcesDataContainerTitle">
                      Project Type
                    </p>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">FTE</div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.internalResourceProgressFTE}
                        </div>

                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.internalResourceProgressFTE}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.internalResourceProgressFTE,
                                  adminDataAnalytics.clientResourceProgressFTE
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {adminDataAnalytics.clientResourceProgressFTE}
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.clientResourceProgressFTE,
                                  adminDataAnalytics.internalResourceProgressFTE
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.clientResourceProgressFTE}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">
                        Trainees
                      </div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.internalResourceProgressTrainee}
                        </div>
                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.internalResourceProgressTrainee
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.internalResourceProgressTrainee,
                                  adminDataAnalytics.clientResourceProgressTrainee
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.clientResourceProgressTrainee
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.clientResourceProgressTrainee,
                                  adminDataAnalytics.internalResourceProgressTrainee
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.clientResourceProgressTrainee}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 adminDashboardGeneralText">
                        Interns
                      </div>
                      <div className="col-10 columnGap-10 d-flex justify-content-end align-items-center">
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.internalResourceProgressIntern}
                        </div>
                        <div className="progress w-50p my-auto barHeight-7">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.internalResourceProgressIntern
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer billableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.internalResourceProgressIntern,
                                  adminDataAnalytics.clientResourceProgressIntern
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                {
                                  adminDataAnalytics.clientResourceProgressIntern
                                }
                              </Tooltip>
                            }
                          >
                            <div
                              className="progress-bar pointer nonBillableResourceBar"
                              style={{
                                width: `${barWidth(
                                  adminDataAnalytics.clientResourceProgressIntern,
                                  adminDataAnalytics.internalResourceProgressIntern
                                )}%`,
                              }}
                            ></div>
                          </OverlayTrigger>
                        </div>
                        <div className="adminKcsTitle mw-30px text-center">
                          {adminDataAnalytics.clientResourceProgressIntern}
                        </div>
                      </div>
                    </div>
                    <div className="workLocationLegend">
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot billableResourceBar"></div>
                        <div className="legentTileName">Internal Projects</div>
                      </div>
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot nonBillableResourceBar"></div>
                        <div className="legentTileName">Client Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded px-3 py-3 mb-adminDashboardCards">
                  <div className="workLocationHeader mb-3">
                    <p className="nowrap resourcesDataContainerTitle">
                      Work Location
                    </p>
                    <div className="workLocationLegend">
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot FTEBullet"></div>
                        <div className="adminDashboardGeneralText">FTE</div>
                      </div>
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot traineesBullet"></div>
                        <div className="adminDashboardGeneralText">
                          Trainees
                        </div>
                      </div>
                      <div className="resorsesBarLegendTitle d-flex align-items-center">
                        <div className="locationDot internsBullet"></div>
                        <div className="adminDashboardGeneralText">Interns</div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="locationIcon mb-2"
                      />
                      <div className="nowrap mb-1 adminDashboardGeneralText">
                        Jaipur
                      </div>
                      <div className="d-flex flex-column">
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot FTEBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.jaipurEmployeeFTE}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot traineesBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.jaipurEmployeeTrainee}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot internsBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.jaipurEmployeeIntern}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="locationIcon mb-2"
                      />
                      <div className="nowrap mb-1 adminDashboardGeneralText">
                        Noida
                      </div>
                      <div className="d-flex flex-column">
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot FTEBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.noidaEmployeeFTE}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot traineesBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.noidaEmployeeTrainee}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot internsBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.noidaEmployeeIntern}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="locationIcon mb-2"
                      />
                      <div className="nowrap mb-1 adminDashboardGeneralText">
                        Pune
                      </div>
                      <div className="d-flex flex-column">
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot FTEBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.puneEmployeeFTE}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot traineesBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.puneEmployeeTrainee}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot internsBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.puneEmployeeIntern}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="locationIcon mb-2"
                      />
                      <div className="nowrap mb-1 adminDashboardGeneralText">
                        Jalpaiguri
                      </div>
                      <div className="d-flex flex-column">
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot FTEBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.jalpaiguriEmployeeFTE}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot traineesBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.jalpaiguriEmployeeTrainee}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot internsBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.jalpaiguriEmployeeIntern}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="locationIcon mb-2"
                      />
                      <div className="nowrap mb-1 adminDashboardGeneralText">
                        Gurgaon
                      </div>
                      <div className="d-flex flex-column">
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot FTEBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.gurgaonEmployeeFTE}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot traineesBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.gurgaonEmployeeTrainee}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot internsBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.gurgaonEmployeeIntern}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={locationIcon}
                        alt="Location Icon"
                        className="locationIcon mb-2"
                      />
                      <div className="nowrap mb-1 adminDashboardGeneralText">
                        Others
                      </div>
                      <div className="d-flex flex-column">
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot FTEBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.othePlacesEmployeeFTE}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot traineesBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.othePlacesEmployeeTrainee}
                          </div>
                        </div>
                        <div className="resorsesBarLegendTitle d-flex align-items-center mb-1">
                          <div className="locationDot internsBullet"></div>
                          <div className="adminDashboardGeneralText">
                            {adminDataAnalytics.othePlacesEmployeeIntern}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded px-3 py-3">
                  <p className="resourcesDataContainerTitle mb-3">
                    Source of Intern Hiring
                  </p>
                  <div className="resourcesCountBarContainer d-flex flex-column border rounded px-3 py-2">
                    <div className="resourcesCountHead d-flex align-items-center mb-1"></div>
                    {Object.keys(adminDataAnalytics).length !== 0 && (
                      <div className="progress w-100 row ">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.onCampusSource}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer onCampusBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.onCampusSource,
                                totalInternsHired
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.COESource}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer COEBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.COESource,
                                totalInternsHired
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.ReferralSource}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer referralBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.ReferralSource,
                                totalInternsHired
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.offCampusSource}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer offCampusBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.offCampusSource,
                                totalInternsHired
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.otherSource}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer summerInternshipBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.otherSource,
                                totalInternsHired
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                      </div>
                    )}
                    <div className="row my-3 gy-2 resorsesBarLegendsContainer ">
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 onCampusBar"></div>
                          <div className="legentTileName">On Campus</div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.onCampusSource}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between offset-lg-1 offset-md-1">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 COEBar"></div>
                          <div className="legentTileName">COE</div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.COESource}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between offset-lg-1 offset-md-1">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 referralBar"></div>
                          <div className="legentTileName">Referral</div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.ReferralSource}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between offset-lg-1">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 offCampusBar"></div>
                          <div className="legentTileName">Off Campus</div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.offCampusSource}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 summerInternshipBar"></div>
                          <div className="legentTileName">Others</div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.otherSource}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
                )}
                
                  <div className="border rounded px-3 py-3 mt-4 adminDashboardCards">
                  <p className="resourcesDataContainerTitle mb-3">
                    Resources as per Reporting Manager
                  </p>
                  <div className="position-relative ">
                    <div
                      className="col-2 px-2 mb-3 uni-border searchContainer d-flex align-items-center justify-content-between adminDashboardSearchBar"
                      id="inside"
                    >
                      <input
                        type="text"
                        placeholder="Type Name"
                        className=" border-0 sampler-search col-10"
                        value={props.mentorName || props.searchStr}
                        onChange={(e) => {
                          props.setSearchStr(e.target.value);
                          setSearchListClose(true);
                        }}
                        onKeyDown={(e) =>
                          e.key === "Backspace" ? props.setMentorName("") : ""
                        }
                      />
                      <FiSearch
                        className="pointer col-2"
                        // onClick={() => setMentorName(props.searchStr)}
                      />
                    </div>
                    {searchListClose ? (
                      <div
                        className={`userdata-searchlist overflow-y-scroll w-30p mw-fit ${
                          searchListClose === true ||
                          props.searchStr.length === 0
                            ? "hidetransition"
                            : ""
                        }`}
                        style={
                          props.searchStr.length === 0
                            ? { display: "none" }
                            : { display: "inline-block", overflowX: "hidden" }
                        }
                      >
                        {adminDataOfDepartmentSelect.length >= 0
                          ? adminDataOfDepartmentSelect
                              .filter((names) =>
                                names.name
                                  .toLowerCase()
                                  .includes(props.searchStr.toLowerCase())
                              )
                              .map((elem) => {
                                return (
                                  <div
                                    className="d-flex align-items-center gap-2 text-nowrap pointer userdata-searchlist-row absolute-options"
                                    onClick={() => {
                                      props.setMentorName(elem.name);
                                      setSearchListClose(false);
                                      dispatch({
                                        type: "ADMIN_DATA_ANALYTICS_MENTOR_HRMID",
                                        payload: elem.emailId,
                                      });
                                    }}
                                  >
                                    <div className="searchlist-profiledetails">
                                      <p className="searchlist-name">
                                        {elem.name}
                                      </p>
                                      <p className="searchlist-email">
                                        {elem.emailId}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })
                          : null}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {adminnameloading ? (  
                    <div className="d-flex align-items-center justify-content-center">
                      
                  <Bars
                  height="50"
                  width="50"
                  color="#4F52B2"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  />
                  </div>
                  )
                    :
                 ( <div className="resourcesCountBarContainer d-flex flex-column border rounded px-3 py-2">
                    <div className="resourcesManagerName d-flex align-items-center mb-1">
                      {props.mentorName}
                    </div>
                    <div className="resourcesCountHead d-flex align-items-center mb-1">
                      Total Resources:
                      <span className="px-1">
                        {adminDataAnalytics.totalMentees}
                      </span>
                    </div>
                    {Object.keys(adminDataAnalytics).length !== 0 && (
                      <div className="progress w-100 row ">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.totalBillableCriticalReportee}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer billableBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.totalBillableCriticalReportee,
                                totalResourcesToRM
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {
                                adminDataAnalytics.totalBillableNonCriticalReportee
                              }
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer nonBillableBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.totalBillableNonCriticalReportee,
                                totalResourcesToRM
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {
                                adminDataAnalytics.totalNonBillableCriticalReportee
                              }
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer fullyUtilizationBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.totalNonBillableCriticalReportee,
                                totalResourcesToRM
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {
                                adminDataAnalytics.totalNonBillableNonCriticalReportee
                              }
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer onPIPBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.totalNonBillableNonCriticalReportee,
                                totalResourcesToRM
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.totalFullyUtilizationReportee}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer onBenchBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.totalFullyUtilizationReportee,
                                totalResourcesToRM
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {adminDataAnalytics.totalOnBenchReportee}
                            </Tooltip>
                          }
                        >
                          <div
                            className="progress-bar pointer projectDeployableBar"
                            style={{
                              width: `${barWidth1(
                                adminDataAnalytics.totalOnBenchReportee,
                                totalResourcesToRM
                              )}%`,
                            }}
                          ></div>
                        </OverlayTrigger>
                      </div>
                    )}
                    <div className="row my-3 gy-2 resorsesBarLegendsContainer ">
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 billableBar"></div>
                          <div className="legentTileName">
                            Billable & Critical
                          </div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.totalBillableCriticalReportee}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between offset-lg-1 offset-md-1">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 nonBillableBar"></div>
                          <div className="legentTileName">
                            Billable & Non-Critical
                          </div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.totalBillableNonCriticalReportee}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between offset-lg-1">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 fullyUtilizationBar"></div>
                          <div className="legentTileName">
                            Non-Billable & Critical
                          </div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.totalNonBillableCriticalReportee}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between offset-lg-1">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 onPIPBar"></div>
                          <div className="legentTileName">
                            Non-Billable & Non-Critical
                          </div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {
                            adminDataAnalytics.totalNonBillableNonCriticalReportee
                          }
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 onBenchBar"></div>
                          <div className="legentTileName">
                            Fully Utilization
                          </div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.totalFullyUtilizationReportee}
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 d-flex align-items-center justify-content-between offset-lg-1">
                        <div className="resorsesBarLegendTitle d-flex align-items-center">
                          <div className="legentTileDot p-1 projectDeployableBar"></div>
                          <div className="legentTileName">On Bench</div>
                        </div>
                        <div className="resorsesBarLegendValue">
                          {adminDataAnalytics.totalOnBenchReportee}
                        </div>
                      </div>
                    </div>
                  </div>)
                  }
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataAnalytics;
