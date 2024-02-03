import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ className }) => {
  const loaderStyle = {
    marginLeft: "35px", // Adjust the margin as needed
  };

  return (
    <ThreeDots
      height="40"
      width="40"
      color="#FFEAA5"
      ariaLabel="bars-loading"
      wrapperStyle={loaderStyle} // Apply the style here
      wrapperClass={className} // Pass the className if provided
      visible={true}
    />
  );
};

export default Loader;
