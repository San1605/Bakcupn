import React, { useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "../../../../component/navbar/navbar.css";
import profileimg from "../../../../assets/images/profileimg.png";
import logo from "../../../../assets/ct-logo/all-screen-logo.png";
import UserProfilePopover from "../../../../component/userprofilePopover/UserProfilePopover";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
const AdminNavbar = (props) => {
  const { navigate, refreshtoken, rolecheckregular, getprofiledata } = useContext(GlobalContext);
  const showsidebar = () => {
    props.setToggle(!props.toggle);
  };
  const linkref = useRef(null);
  const linkcontaineref = useRef(null);
  useEffect(() => {
    rolecheckregular();
    refreshtoken();
    const interval = setInterval(() => {
      refreshtoken();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    getprofiledata();
  }, []);
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
      <div className=" d-flex justify-content-between  w-100">
        <div className="logo d-flex align-items-center">
          <img
            src={logo}
            alt="celebal"
            className="navbar-sidebar-logo pointer"
            onClick={() => navigate("/admin/dashboard")}
          />
        </div>
        <ul className="d-flex innerul m-0 p-0">
          <li className="navlink" onClick={() => navigate("/admin/dashboard")}>
            <NavLink
              className="text-decoration-none text-white "
              to="/admin/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li
            className=" navlink"
            onClick={() => navigate("/admin/coursemanagement")}
          >
            <NavLink
              className="text-decoration-none text-white "
              to="/admin/coursemanagement"
            >
              Learning Path Management
            </NavLink>
          </li>
          <li
            className="navlink"
            onClick={() => navigate("/admin/rolemanagement")}
          >
            <NavLink
              className="text-decoration-none text-white  "
              to="/admin/rolemanagement"
            >
              Role Management
            </NavLink>
          </li>
          {/* <li className=" navlink" onClick={() => navigate("/admin/tickets")}>
            <NavLink
              className="text-decoration-none text-white  "
              to="/admin/tickets"
            >
              Tickets
            </NavLink>
          </li> */}
        </ul>
        <div className="profile d-flex justify-content-between align-items-center">
          {/* <div className="notification" onClick={() => {
              navigate("/notification");
            }}>
            <IoNotificationsOutline className="noti-icon pointer text-white" />
            <div className="noti-dot noti-dot-small d-flex justify-content-center align-items-center rounded-circle"></div>
          </div> */}
           {/* <div className="noti-dot d-flex justify-content-center align-items-center rounded-circle">
              2
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
          <li
            className="navlink-li"
            onClick={() => navigate("/admin/dashboard")}
          >
            <NavLink
              className="text-decoration-none text-white "
              to="/admin/dashboard"
              onClick={() => showsidebar()}
            >
              Dashboard
            </NavLink>
          </li>
          <li
            className=" navlink-li my-3"
            onClick={() => navigate("/admin/coursemanagement")}
          >
            <NavLink
              className="text-decoration-none text-white "
              to="/admin/coursemanagement"
              onClick={() => showsidebar()}
            >
              Learning Path Management
            </NavLink>
          </li>
          <li
            className="navlink-li"
            onClick={() => navigate("/admin/rolemanagement")}
          >
            <NavLink
              className="text-decoration-none text-white  "
              to="/admin/rolemanagement"
              onClick={() => showsidebar()}
            >
              Role Management
            </NavLink>
          </li>
          {/* <li
            className=" navlink-li mt-3"
            onClick={() => navigate("/admin/tickets")}
          >
            <NavLink
              className="text-decoration-none text-white  "
              to="/admin/tickets"
              onClick={() => showsidebar()}
            >
              Tickets
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};
export default AdminNavbar;
