import React, { useContext } from "react";
import { AppContext } from "../../utils/Context/AppContext";
import LOGO from "../../assets/pnbAssets/pnbLogo.svg";
import HAMBURGER from "../../assets/hamburger.png";
import PROFILE from "../../assets/profilePic.svg";
import NEW_CHAT from "../../assets/NewChat.svg";
import { useNavigate } from "react-router-dom";

const NavBar = ({ handleHamburgerClick, hamburgerRef, hideSidebar }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const handleLogoClick = () => {
    dispatch({
      type: "addSuggestions",
      payload: [],
    });
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
    navigate(`${window.location.pathname}?new_conversation`);
  };

  const handleCreateNewChat = () => {
    dispatch({
      type: "addSuggestions",
      payload: [],
    });
    dispatch({
      type: "CITATION_BAR",
      payload: false,
    });
    navigate(`${window.location.pathname}?new_conversation`);
  };

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
