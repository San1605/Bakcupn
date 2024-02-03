import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import PrescriptionModal from "../PrescriptionModal/PrescriptionModal";
import CURE_RIGHT_LOGO from "../../assets/icons/cureRightLogo.svg";
import BG_TICK from "../../assets/images/cureRightSidebarBg.svg";
import CURE_RIGHT_ICON from "../../assets/icons/cureRightIcon.png";
import SIDE_NAV_ITEMS from "../../utils/sideNavUtils";
import chat1 from "../../assets/icons/chat1.svg";
import { mtoggleSidebar, setShowChatBot } from "../../redux/actions";
import "./Sidebar.css";

function Sidebar({ menuCollapse }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const [prescriptionData] = useState({});
  const [routes, setRoutes] = useState([]);
  const appReducerData = useSelector((state) => state.AppReducer);
  let isAdmin = localStorage.getItem("userType") === "admin";

  useEffect(() => {
    let pathArr = location?.pathname.split("/");
    if (pathArr[1].toLowerCase() === "doctor") {
      setRoutes(SIDE_NAV_ITEMS.doctor);
    } else if (pathArr[1].toLowerCase() === "admin") {
      setRoutes(SIDE_NAV_ITEMS.admin);
    } else {
      setRoutes(SIDE_NAV_ITEMS.patient);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (routes) {
      const matchedRoute = routes.find(
        (item) => item.route === location.pathname
      );
      setActiveRoute(matchedRoute || activeRoute);
    }
  }, [routes, location.pathname]);

  return (
    <>
      {false && (
        <PrescriptionModal
          show={false}
          setPrescriptionModal={setShowPrescriptionModal}
          chiefConcern={prescriptionData?.chiefConcern}
          diagnosis={prescriptionData?.diagnosis}
          arr={prescriptionData?.medications}
          followUp={prescriptionData?.followUp}
        />
      )}
      <aside
        id={`header`}
        className={`${appReducerData.msidebarCollapse ? "display-m" : ""}`}
      >
        <ProSidebar className="h-100 prosidebar">
          <div className="logo-container d-flex justify-content-center align-items-center my-2">
            {menuCollapse ? (
              <img src={CURE_RIGHT_LOGO} alt="logo" width="175px" />
            ) : (
              <img src={CURE_RIGHT_ICON} alt="logo" width="35px" />
            )}
            <div
              className="close-sidebar-icon"
              onClick={() => {
                dispatch(mtoggleSidebar(!appReducerData?.msidebarCollapse));
              }}
            >
              <AiOutlineCloseCircle />
            </div>
          </div>
          <div>
            <Menu iconShape="square">
              {routes?.map((item) => {
                return (
                  <MenuItem
                    key={item.label}
                    icon={
                      <img
                        className={`sidebar_icons ${
                          activeRoute?.label === item?.label && "active-icon"
                        }`}
                        src={item?.icon}
                        alt=""
                      />
                    }
                    className={`menuItem ${
                      activeRoute?.label === item?.label && "active"
                    }`}
                    onClick={(e) => {
                      navigate(item?.route);
                    }}
                  >
                    {item?.label}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          {menuCollapse ? (
            <div className="sidebar-bottom">
              <img
                src={BG_TICK}
                alt="bigicon"
                width="230px"
                height="170px"
                style={{ marginLeft: "20px" }}
              />
            </div>
          ) : null}
          {!isAdmin && (
            <div>
              {appReducerData?.sidebarCollapse ? (
                <button
                  className="chatbot_sidebar"
                  onClick={() => {
                    dispatch(setShowChatBot(true));
                  }}
                >
                  <img src={chat1} alt="/" />
                  Chatbot
                </button>
              ) : (
                <img
                  src={chat1}
                  alt="/"
                  className="meet-chatbot_sidebar"
                  onClick={() => {
                    dispatch(setShowChatBot(true));
                  }}
                />
              )}
            </div>
          )}
        </ProSidebar>
      </aside>
    </>
  );
}

export default Sidebar;
