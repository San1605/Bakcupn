import React from "react";
import "./Button.css";
//types of button  // 1. primary   // 2. red-bordered   // 3. primary-bordered
const Button = ({ text, onClick, style, className, type }) => {
  return (
    <>
      {type === "primary" ? (
        <button
          className={`primary cure-btn text-nowrap ${className}`}
          onClick={onClick}
          style={style}
        >
          {text}
        </button>
      ) : type.includes("bordered") ? (
        <button
          className={`bg-transparent cure-btn ${type}-btn ${className} `}
          onClick={onClick}
          style={style}
        >
          {text}
        </button>
      ) : (
        <button>Btn</button>
      )}
    </>
  );
};

export default Button;
