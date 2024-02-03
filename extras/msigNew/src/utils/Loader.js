import React from "react";
// import "./Loader.css";
import { ThreeDots } from "react-loader-spinner";
const Loader = ({ className }) => {
  return (
    <ThreeDots
      height="40"
      width="40"
      color="red"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
export default Loader;