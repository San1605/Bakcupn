import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useProSidebar } from "react-pro-sidebar";
import { setIsSidebarNavDisplay, toggleSidebar } from "./redux/actions";
import { Outlet, Navigate } from "react-router-dom";
import ChatBot from "./components/ChatBot/ChatBot";
import ROUTES from "./utils/routesUtils";

const Layout = ({ route }) => {
  const dispatch = useDispatch();
  const { collapseSidebar } = useProSidebar();
  const appReducer = useSelector((state) => state.AppReducer);
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");
  const isPrivateRoute = authToken && userType === route?.accessType;
  
  let shouldRedirect = null;
  
  if (!isPrivateRoute && authToken) {
    shouldRedirect = getRedirectUrl(authToken, userType);
  } else if (!isPrivateRoute && route?.accessType !== null) {
    shouldRedirect = getRedirectUrl(authToken, userType);
  }
  console.log("IN LAYOUT", authToken ?true :false , userType, route?.accessType, route?.isLayoutDisplay);

  useEffect(() => {
    const path = window.location.pathname;
    const object = ROUTES.find((i) => i.path === path || path.match(i.regexPattern));
    console.log(object);
    dispatch(setIsSidebarNavDisplay(object?.isLayoutDisplay));

    if (
      !window.location.pathname.includes("/meet") &&
      !appReducer.sidebarCollapse
    ) {
      dispatch(toggleSidebar(true));
      collapseSidebar();
    }
  }, [window.location.pathname]);

  if (shouldRedirect) {
    return <Navigate to={shouldRedirect} />;
  }

  const mainClass = `main ${!appReducer?.isSidebarNavDisplay ? "p-0" : ""}`;
  const pagesContainerClass = `pages-container ${
    !appReducer?.isSidebarNavDisplay ? "p-0 h-100" : ""
  }`;

  return (
    <>
      {appReducer?.isSidebarNavDisplay && (
        <Sidebar menuCollapse={appReducer?.sidebarCollapse} />
      )}
      <div className={mainClass}>
        {appReducer?.isSidebarNavDisplay && (
          <header className="header position-sticky top-0">
            <Navbar />
          </header>
        )}
        <main className={pagesContainerClass}>
          <Outlet />
        </main>
      </div>
      {appReducer?.isSidebarNavDisplay && (
        <div className="chatbot-comp">
          {appReducer?.showChatBot && <ChatBot />}
        </div>
      )}
    </>
  );
};

export default Layout;

const getRedirectUrl = (authToken, userType) => {
  const geturl = window.location.pathname.split("/");
  if (authToken) {
    if (userType && userType !== "patient") {
      return `/${userType}/home`;
    } else {
      return "/home";
    }
  } else {
    if (userType === "admin" || geturl[1] === "admin") {
      return "/admin";
    } else if (userType === "doctor" || geturl[1] === "doctor") {
      return "/doctor";
    } else {
      return "/";
    }
  }
};
