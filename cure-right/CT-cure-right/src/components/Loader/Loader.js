import React from "react";
import LoaderGif from "../../assets/LoaderGif.gif";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loadingDiv">
      <img className="loader" src={LoaderGif} alt="loader" />
    </div>
  );
};

export default Loader;
