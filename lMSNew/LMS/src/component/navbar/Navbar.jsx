import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import "./navbar.css";
import profileimg from "../../assets/images/profileimg.png";
import logo from "../../assets/ct-logo/all-screen-logo.png";
import { AppContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import UserProfilePopover from "../userprofilePopover/UserProfilePopover";
import navbellicon from "../../assets/svg/navbar/navbell.svg";
import { BsChevronDown } from "react-icons/bs";
import NotificationPopover from "../notoficationPopover/NotificationPopover";
import NotificationModal from "../NotificationModal/NotificationModal";
// import NotificationPopover from "../notificationsModal/notificatonPopovers/NotificationPopover";
const Navbar = (props) => {
  const {
    role,
    navigate,
    getprofiledata,
    refreshtoken,
    // pmtlrole,
    // pmtc,
    rolecheckregular,
    havenav,
    navdata,
    activenavpoint,
    NotificationArray
  } = useContext(GlobalContext);
  const { instance } = useMsal();
  const { setIsAuthenticated } = useContext(AppContext);
  const [activeNav, setActiveNav] = useState(0);
  const [innerActiveNav, setInnerActiveNav] = useState("00");
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    havenav();
    getprofiledata();
    // pmtc();
    refreshtoken();
    rolecheckregular();
    const interval = setInterval(() => {
      refreshtoken();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    setActiveNav(Number(activenavpoint[0]));
    setInnerActiveNav(activenavpoint);
  }, [activenavpoint]);
  const handleLogout = (logoutType) => {
    localStorage.clear("token");
    document.cookie = "access_token=";
    setIsAuthenticated(false);
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    }
  };
  const showsidebar = () => {
    props.setToggle(!props.toggle);
  };
  const linkref = useRef(null);
  const linkcontaineref = useRef(null);
  useEffect(() => {
    const linkheight = linkref.current.getBoundingClientRect().height;
    if (props.toggle) {
      linkcontaineref.current.style.height = `${linkheight}px`;
      linkcontaineref.current.style.margin = `1rem 0 1rem 0`;
    } else {
      linkcontaineref.current.style.height = `0px`;
      linkcontaineref.current.style.margin = `0`;
    }
  }, [props.toggle]);

  return (
    <div className="navbar">
      <div className=" d-flex justify-content-between  align-items-center w-100 h-100">
        <div className="logo d-flex align-items-center">
          <img
            src={logo}
            alt="celebal"
            className="pointer"
            onClick={() => navigate("/dashboard")}
          />
        </div>
        <div className="navtab-navlinks-d">
          <div className="navlinks-d">
            {navdata.length > 0
              ? navdata.map((elem, index) => {
                  return (
                    elem.view && (
                      <div
                        className="navlink-block"
                        onClick={() => {
                          if (elem.insideTabs.length == 0) {
                            setActiveNav(index);
                            navigate(`${elem.route}`);
                          }
                        }}
                      >
                        <div
                          className={`navlink-d ${
                            activeNav == index ? "active-navlink-d" : ""
                          } `}
                        >
                          {elem.tabName}
                          {elem.insideTabs.length > 0 ? (
                            <BsChevronDown className="nav-chevron" />
                          ) : null}
                        </div>
                        {elem.insideTabs.length > 0 &&
                        elem.insideTabs.find((el) => el.view == true) ? (
                          <div className="navlink-dropdown-block">
                            {elem.insideTabs.map((innerelem, innerindex) => {
                              return (
                                innerelem.view && (
                                  <p
                                    className={`${
                                      innerActiveNav ==
                                      index + "" + (innerindex + "")
                                        ? "active-dropdown-navlink"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setActiveNav(index);
                                      setInnerActiveNav(
                                        index + "" + (innerindex + "")
                                      );
                                      navigate(`${innerelem.route}`);
                                    }}
                                  >
                                    {innerelem.tabName}
                                  </p>
                                )
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    )
                  );
                })
              : null}
          </div>
        </div>
        <div className="profile d-flex justify-content-between align-items-center">
          {/* <NotificationPopover /> */}
         

          
        <NotificationModal
          showModal={showModal}
          setShowModal={setShowModal}
          // onHide={()=>setShowModal(false)}
        />
      


          {/* <IoNotificationsOutline className="noti-icon  text-white" /> */}
          {/* <div className="noti-dot d-flex justify-content-center align-items-center rounded-circle">
              2
            </div> */}
          {/* <div className="noti-dot noti-dot-small d-flex justify-content-center align-items-center rounded-circle"></div> */}
          {/* <div className="profileimg rounded-circle">
            <img
              src={profileimg}
              alt="profile"
              onClick={() => handleLogout("popup")}
              className="profilephoto pointer"
            />
          </div> */}


          <UserProfilePopover />
          <AiOutlineMenu
            className="hamburger pointer text-white"
            onClick={() => showsidebar()}
          />
        </div>
      </div>
      <div className="hiddenav" ref={linkcontaineref}>
        <ul className="navlinks-ul m-0 p-0" ref={linkref}>
          <li className="navlink-li" onClick={() => navigate("/dashboard")}>
            <NavLink
              className="text-decoration-none text-white "
              to="/dashboard"
              onClick={() => showsidebar()}
            >
              Dashboard
            </NavLink>
          </li>
          <li className=" navlink-li my-3" onClick={() => navigate("/courses")}>
            <NavLink
              className="text-decoration-none text-white "
              to="/courses"
              onClick={() => showsidebar()}
            >
              All Courses
            </NavLink>
          </li>
          <li
            className=" navlink-li my-3"
            onClick={() => navigate("/mycourses")}
          >
            <NavLink
              className="text-decoration-none text-white "
              to="/mycourses"
              onClick={() => showsidebar()}
            >
              My Courses
            </NavLink>
          </li>
          <li className="navlink-li" onClick={() => navigate("/tickets")}>
            <NavLink
              className="text-decoration-none text-white  "
              to="/tickets"
              onClick={() => showsidebar()}
            >
              Tickets
            </NavLink>
          </li>
          {role === 3 ? (
            <>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/menteelist")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/menteelist"
                  onClick={() => showsidebar()}
                >
                  Mentee List
                </NavLink>
              </li>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/buddies")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/buddies"
                  onClick={() => showsidebar()}
                >
                  Buddies
                </NavLink>
              </li>
            </>
          ) : role === 1 ? (
            <li
              className=" navlink-li mt-3"
              onClick={() => navigate("/menteelist")}
            >
              <NavLink
                className="text-decoration-none text-white  "
                to="/menteelist"
                onClick={() => showsidebar()}
              >
                Mentee List
              </NavLink>
            </li>
          ) : role === 2 ? (
            <li
              className=" navlink-li mt-3"
              onClick={() => navigate("/buddies")}
            >
              <NavLink
                className="text-decoration-none text-white  "
                to="/buddies"
                onClick={() => showsidebar()}
              >
                Buddies
              </NavLink>
            </li>
          ) : role === 4 ? (
            <li
              className=" navlink-li mt-3"
              onClick={() => navigate("/pathmanagement")}
            >
              <NavLink
                className="text-decoration-none text-white  "
                to="/pathmanagement"
                onClick={() => showsidebar()}
              >
                Learning Path Management
              </NavLink>
            </li>
          ) : role === 5 ? (
            <>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/menteelist")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/menteelist"
                  onClick={() => showsidebar()}
                >
                  Mentee List
                </NavLink>
              </li>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/pathmanagement")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/pathmanagement"
                  onClick={() => showsidebar()}
                >
                  Learning Path Management
                </NavLink>
              </li>
            </>
          ) : role === 6 ? (
            <>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/buddies")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/buddies"
                  onClick={() => showsidebar()}
                >
                  Buddies
                </NavLink>
              </li>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/pathmanagement")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/pathmanagement"
                  onClick={() => showsidebar()}
                >
                  Learning Path Management
                </NavLink>
              </li>
            </>
          ) : role === 7 ? (
            <>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/menteelist")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/menteelist"
                  onClick={() => showsidebar()}
                >
                  Mentee List
                </NavLink>
              </li>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/buddies")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/buddies"
                  onClick={() => showsidebar()}
                >
                  Buddies
                </NavLink>
              </li>
              <li
                className=" navlink-li mt-3"
                onClick={() => navigate("/pathmanagement")}
              >
                <NavLink
                  className="text-decoration-none text-white  "
                  to="/pathmanagement"
                  onClick={() => showsidebar()}
                >
                  Learning Path Management
                </NavLink>
              </li>
            </>
          ) : null}
          {role !== 0 ? (
            <li className="navlink-li" onClick={() => navigate("/requests")}>
              <NavLink
                className="text-decoration-none text-white  "
                to="/requests"
                onClick={() => showsidebar()}
              >
                Requests
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
