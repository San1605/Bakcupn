import React from "react";
import back from "../../assets/img/Group 11.svg";
import "../Navbar/navbar.css";

export const Navbar = () => {
  return (
    <div
      className="px-md-5 px-3 d-flex justify-content-center align-items-end  navbar_main "
      style={{ backgroundImage: `url("${back}")` }}
    >
      <div className=" navbar_main_inner  text-center d-flex flex-column justify-content-end ">
        <h1 className="navbar_heading  ">
          Unleash Limitless Learning with DBE Cloud Anytime, Anywhere!
        </h1>
        <p className="navbar_description mt-md-3 pb-4  ">
          An education based web-portalfor the South African Community
        </p>
      </div>
    </div>
  );
};
