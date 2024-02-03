import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./components/Loader/Loader";
import { ROUTES } from "./utils/routeUtils";
import SideBar from "./components/SideBar/SideBar";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal/DeleteConfirmationModal";
import { AppContext } from "./utils/Context/AppContext";
import FeedbackModal from "./components/FeedbackModal/FeedbackModal";
import HandleClickOutside from "./utils/helpers/HandleOutsideClick";
import NAV_ARROW from "./assets/pnbAssets/doubleLeftArrow.svg";

const Layout = () => {
  const { appData, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const path = window.location.pathname;
  const authToken = localStorage.getItem("authToken");
  const [loader, setLoader] = useState(true);
  const [route, setRoute] = useState();
  const [hideSidebar, setHideSidebar] = useState(true);
  console.log(window.location.pathname)
  useEffect(() => {
    setLoader((prev) => true);
    const routeObj = ROUTES.find((item, i) => item.path === path);
    setRoute(routeObj);
    if (path === "/" && authToken) {
      navigate("/data_driven_chat");
    } else if (!authToken) {
      let userId = searchParams.get("uid");
      let pass = searchParams.get("pwd");
      if (userId && pass) {
        navigate(`?uid=${userId}&pwd=${pass}`);
      } else {
        navigate("/");
      }
    }
    setLoader((prev) => false);
  }, [authToken, window.location.pathname]);

  const [firstTime, setFirstTime] = useState(true);
  const handleHamburgerClick = () => {
    setFirstTime(false);
    if (hideSidebar) {
      setHideSidebar(false);
    } else {
      setHideSidebar(true);
    }
  };

  HandleClickOutside(sidebarRef, () => {
    if (!hideSidebar) {
      setHideSidebar(true);
    }
  });

  useEffect(() => {
    if (window.innerWidth < 635) {
      dispatch({
        type: "hideSidebar",
        payload: true,
      });
    }
  }, []);

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
              <>
                {appData.hideSidebar ? (
                  <aside
                    ref={sidebarRef}
                    className={`sm:relative absolute top-0 w-[255px] bg-white z-[30] float-left sm:float-none z-[10] ${
                      window.innerWidth < 635 &&
                      (firstTime
                        ? "qwertyShow"
                        : hideSidebar
                        ? "dealProfileShow"
                        : "dealProfileHide")
                    } `}
                    id="aside"
                  >
                    <SideBar
                      setFirstTime={setFirstTime}
                      setHideSidebar={setHideSidebar}
                      handleHamburgerClick={handleHamburgerClick}
                    />
                  </aside>
                ) : (
                  <button
                    className="absolute top-5 h-[37px] max-w-[37px] border-[1px] mb-3 border-[#E1E1E1] flex items-center justify-center  gap-3 text-[#444791] rounded-[6px] w-full text-sm"
                    onClick={() =>
                      dispatch({
                        type: "hideSidebar",
                        payload: true,
                      })
                    }
                  >
                    <img
                      className="rotate-180 h-[10px] "
                      src={NAV_ARROW}
                      alt=""
                    />
                  </button>
                )}
              </>
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
