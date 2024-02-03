import React from "react";
import "./Header.css";
import ctlogo from "../src/Assets/ctlogo.svg";

function Header() {
  return (
    <div className="Container">
      <div className="main-wrapper">
        <img className="ct-img" src={ctlogo} />

        <p>Ct CodeConvert</p>
      </div>
      <div className="wrapper-down">
        <p>Pricing</p>
        <p>Contact</p>
        <button className="btn">Login</button>
      </div>
    </div>
  );
}

export default Header;
