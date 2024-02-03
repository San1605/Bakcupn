import React from "react";
import "./Loader.css";
const Loader = ({ className }) => {
  return (
    <div
      className={`h-full w-full flex items-center justify-center m-auto ${className}`}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
