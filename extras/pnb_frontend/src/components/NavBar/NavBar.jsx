import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/Context/AppContext";
import LOGO from "../../assets/pnbAssets/pnbLogo.svg";
import PROFILE from "../../assets/profilePic.svg";
import HAMBURGER from "../../assets/hamburger.png";
import NEW_CHAT from "../../assets/NewChat.svg";
import { useNavigate, useSearchParams } from "react-router-dom";

const NavBar = ({ handleHamburgerClick, hamburgerRef, hideSidebar }) => {
  let path = window.location.pathname;
  const [activeTab, setActiveTab] = useState(null);
  const [hoverState, setHoverState] = useState(false);
  const navigate = useNavigate();
  const { appData, dispatch } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  let conversationId = searchParams.get("conversation_id");

  const handleLogoClick = () => {
    navigate(`${window.location.pathname}?new_conversation`);
  };

  const handleClick = (text) => {
    if (text === "AI Converser") {
      if (appData?.aiConverserChat?.length > 0) {
        navigate(`/ai_converser?conversation_id=0`);
      } else {
        navigate(`/ai_converser?new_conversation`);
      }
    } else {
      if (appData?.dataDrivenChat?.length > 0) {
        navigate(`/data_driven_chat?conversation_id=0`);
      } else {
        navigate(`/data_driven_chat?new_conversation`);
      }
    }
  };
  const handleCreateNewChat = () => {
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
    navigate(`${window.location.pathname}?new_conversation`);
  };

  useEffect(() => {
    // if (path === "/ai_converser") {
    //   setActiveTab("AI Converser");
    // } else {
    //   setActiveTab("Data-driven Chat");
    // }
  }, [window.location.pathname]);

  return (
    <nav className="navbar bg-[#EFF8FF] flex items-center justify-between px-6 py-3 h-[60px]">
      <div className="sm:hidden flex items-center gap-4">
        <button onClick={handleHamburgerClick} disabled={!hideSidebar}>
          <img className="h-[15px] cursor-pointer" src={HAMBURGER} alt="" />
        </button>
        <div className="logo sm:h-full sm:hidden inline-blobk h-[20px]  w-fit">
          <img
            ref={hamburgerRef}
            className="h-full w-full cursor-pointer"
            src={LOGO}
            alt=""
            onClick={handleLogoClick}
          />
        </div>
      </div>
      <div className="hidden sm:inline-block logo sm:h-full max-h-[21px] w-fit">
        <img
          className="h-full w-full cursor-pointer"
          src={LOGO}
          alt=""
          onClick={handleLogoClick}
        />
      </div>
      <div className="right items-center gap-5  hidden sm:flex">
        {/* <div className={`flex btn-group gap-4 sm:gap-1 w-fit`}>
          <div className="relative">
            <button
              className={`${
                activeTab === "AI Converser"
                  ? "bg-[#EBEEF8]"
                  : "sm:bg-transparent bg-[#FAFAFA]"
              } text-[#2957A4] text-[13px] sm:py-[7px] py-[10px] sm:px-3 px-5 rounded-[4px] whitespace-nowrap`}
              onClick={() => handleClick("AI Converser")}
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              AI Converser
            </button>
            {hoverState && (
              <>
                <div className="angle absolute top-[36px] left-[18px] h-[13px] w-[13px] bg-[#333333] z-[2] rotate-45 rounded-[1.5px] border-[0.5px]  "></div>
                <div className="disclaimer absolute w-[18rem] top-[41px] py-2 px-3 rotate-[5] z-[10000000] bg-[#333333] rounded-[6px]">
                  <p className="text-[12px] text-white">
                    <svg
                      class="_iconColor_v2jgn_127 ___12fm75w_v8ls9a0 f1w7gpdv fez10in fg4l7m0 inline-block mt-[-1px] me-[1px]"
                      fill="currentColor"
                      aria-hidden="true"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 4.5a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1ZM6 6.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-.79-5.3a.9.9 0 0 1 1.58 0l4.09 7.18a.92.92 0 0 1-.79 1.37H1.91a.92.92 0 0 1-.79-1.37l4.1-7.17Zm.79.67L2.08 8.98h7.84L6 2.12Z"
                        fill="yellow"
                      ></path>
                    </svg>
                    The information provided by Chatbot on this AI Converser tab is based on the knowledge available up to September 2021. It is important to verify any critical information or make decisions based on the latest and most up-to-date sources. ChatGPT's responses should not be considered a substitute for professional advice, and we encourage you to consult relevant experts or official sources for current information.
                  </p>
                </div>
              </>
            )}
          </div>
          <button
            className={`${
              activeTab === "Data-driven Chat"
                ? "bg-[#EBEEF8]"
                : "sm:bg-transparent bg-[#FAFAFA]"
            } text-[#2957A4] text-[13px] sm:py-[7px] py-[10px] sm:px-3 px-5 rounded-[4px] whitespace-nowrap`}
            onClick={() => handleClick("Data-driven Chat")}
          >
            Data-driven Chat
          </button>
        </div> */}
        <div className="profile h-ful">
          <img className="h-2/3" src={PROFILE} alt="" />
        </div>
      </div>
      <div
        onClick={handleCreateNewChat}
        className="sm:hidden flex items-center gap-2 sm:none justify-self-end"
      >
        <button className="text-[15px]">New Chat</button>
        <img className="h-[13px] mb-[1px]" src={NEW_CHAT} alt="" />
      </div>
    </nav>
  );
};

export default NavBar;
