import React from "react";
import "./ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import { setIsSidebarNavDisplay } from "../../redux/actions";
import { useDispatch } from "react-redux";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setIsSidebarNavDisplay(false));
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("communicationUserId");
    const geturl = window.location.pathname.split("/");
    let redirectURL = "/";
    if (geturl[1] === "admin") {
      redirectURL = "/admin";
    } else if (geturl[1] === "doctor") {
      redirectURL = "/doctor";
    }
    navigate(redirectURL);
  };

  return (
    <div className="profile-menu">
      <ul>
        <li>My Profile</li>
        <li>Health Metrics</li>
        <li>Emergency Details</li>
        <li>Change Password</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
