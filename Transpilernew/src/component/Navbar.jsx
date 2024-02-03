import React, { useState } from "react";
import logo from "../assets/icons/logo.svg";
import profile from "../assets/icons/profile.svg";
import { useNavigate } from "react-router";
import profileImg from "../assets/img/pranavsir.png"

const Navbar = () => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("user-name");

  const logout = () => {
    sessionStorage.removeItem("user-email");
    sessionStorage.removeItem("user-name");
    navigate("/")
  };


  return (
    <div className="w-screen h-[50px] flex flex-row justify-between items-center px-[22px] ">
      <img src={logo} alt="logo" />
      <div className="relative" onClick={() => setShowPopover(!showPopover)} style={{ textAlign: "right" }}>
        <img src={(userName === "admin" || userName==="Admin") ? profileImg : profile} alt="logo" className="cursor-pointer block mx-auto"
          style={{ maxWidth: (userName === "admin" || userName==="Admin") && "34px", maxHeight: (userName === "admin" || userName==="Admin") && "34px", borderRadius: (userName === "admin" || userName==="Admin") && "50%" }} />
        {showPopover && (
          <div
            className="bg-white hover:bg-[#f8f8f8] py-0.5 px-1 absolute bottom-[-50px] rounded right-0 w-[100px] flex items-center shadow-[0_3px_4px_0px_#e4e4e4]  z-20"
            onClick={() => logout()}
          >
            <p className="neue-r tracking-wide text-[15px] py-1.5 px-2 w-full cursor-pointer ">
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
