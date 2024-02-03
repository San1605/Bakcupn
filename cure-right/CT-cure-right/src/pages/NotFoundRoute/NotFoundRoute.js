import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsSidebarNavDisplay } from "../../redux/actions";

const NotFoundRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in notfoundroute ====> FALSE");
    dispatch(setIsSidebarNavDisplay(false));
  }, []);

  return (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
      <h5>Route Not Found</h5>
    </div>
  );
};

export default NotFoundRoute;
