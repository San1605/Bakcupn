import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./components/Loader/Loader";
import { ROUTES } from "./utils/routeUtils";
import SideBar from "./components/SideBar/SideBar";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal/DeleteConfirmationModal";
import { AppContext } from "./utils/Context/AppContext";
import FeedbackModal from "./components/FeedbackModal/FeedbackModal";
import { validation } from "./utils/services/api";
import HandleClickOutside from "./utils/helpers/HandleOutsideClick";

const Layout = () => {
  const { appData, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const path = window.location.pathname;
  const authToken = localStorage.getItem("authToken");
  const [loader, setLoader] = useState(true);
  const [route, setRoute] = useState();
  // const [translateXSidebar, setTranslateXSidebar] = useState(100);
  const [hideSidebar, setHideSidebar] = useState(true);

  useEffect(() => {
    setLoader((prev) => true);
    // console.log("authToken", a uthToken);
    const routeObj = ROUTES.find((item, i) => item.path === path);
    setRoute(routeObj);
    if (path === "/" && !authToken) {
      navigate("/ai_converser");
    } else if (authToken) {
      navigate("/");
    }
    setLoader((prev) => false);
  }, [authToken, window.location.pathname]);

  const validateAuthToken = async () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        let response = await validation(authToken);
        // console.log(response);
      } catch (err) {
        if(err.Message === "Expierd Token"){
          localStorage.removeItem("authToken");
          localStorage.removeItem("tab");
          localStorage.removeItem("userName");
          navigate("/");

        }
      }
    }
  };

  const [firstTime, setFirstTime] = useState(true);
  const handleHamburgerClick = () => {
    setFirstTime(false);
    if (hideSidebar) {
      setHideSidebar(false);
    } else {
      setHideSidebar(true);
    }
  };

  // const outsideClose = (event) => {
  //   if (!hideSidebar) {
  //     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
  //       setHideSidebar(true);
  //     }
  //   }
  // };

  useEffect(() => {
    validateAuthToken();
  }, [appData?.authToken]);

  HandleClickOutside(sidebarRef, () => {
    if (!hideSidebar) {
      setHideSidebar(true);
    }
    // console.log("I am called sidebarRef qqqq");
  });

  return (
    <div className="layout h-full w-full relative">
      {!loader ? (
        <>
          {route?.isNavBarDisplay && (
            <header className="header sticky top-0 z-100 shadow-sm bg-white z-[1]">
              <NavBar
                hamburgerRef={hamburgerRef}
                handleHamburgerClick={handleHamburgerClick}
                hideSidebar={hideSidebar}
              />
            </header>
          )}
          <main
            style={
              route?.isNavBarDisplay
                ? {
                    height: "calc(100% - 60px)",
                  }
                : {
                    height: "100%",
                  }
            }
            className="w-full flex relative z-[0]"
          >
            {!hideSidebar && (
              <div className="bg-black absolute top-0 h-[100%] w-screen opacity-20 z-[4]"></div>
            )}
            {route?.isSideBarDisplay && (
              <aside
                ref={sidebarRef}
                className={`sm:relative absolute top-0 w-[80vw] sm:w-[255px] bg-white z-[30] float-left sm:float-none z-[10] ${
                  window.innerWidth < 635 &&
                  (firstTime
                    ? "qwertyShow"
                    : hideSidebar
                    ? "dealProfileShow"
                    : "dealProfileHide")
                } `}
                id="aside"
              >
                <SideBar setHideSidebar={setHideSidebar} handleHamburgerClick={handleHamburgerClick} />
              </aside>
            )}
            {window.location.pathname ===
            "/ai_converser || /data_driven_chat" ? (
              <div className={window.innerWidth > 635 ? "outlet" : "w-full"}>
                <Outlet />
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </>
      ) : (
        <Loader />
      )}
      {appData?.deleteModalOpen?.flag && (
        <DeleteConfirmationModal
          isOpen={appData.deleteModalOpen}
          onClose={() =>
            dispatch({
              type: "deleteModal",
              payload: false,
            })
          }
        />
      )}
      {appData?.feedbackModalOpen?.flag && (
        <FeedbackModal
          isOpen={appData.feedbackModalOpen}
          onClose={() =>
            dispatch({
              type: "feedbackModal",
              payload: false,
            })
          }
        />
      )}
    </div>
  );
};

export default Layout;
