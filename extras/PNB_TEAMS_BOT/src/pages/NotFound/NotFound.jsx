import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/data_driven_chat");
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="">Route Not Found</p>
    </div>
  );
};

export default NotFound;
