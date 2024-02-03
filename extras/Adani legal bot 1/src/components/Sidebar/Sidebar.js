import React, { useContext } from "react";
import "./sidebar.css";
import sideBarLogo from "../../assets/images/sideBar-badge.svg";
import ArrowDownIcon from "../../assets/images/icons/arrow-down.svg";
import ArrowUpIcon from "../../assets/images/icons/arrow-up.svg";
import { GlobalContext } from "../../context/GlobalState";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Sidebar = () => {
  const { navigate, documentFiles, dropDownIcon, dropDownIcon1, toggleDropDownHandler, toggleDropDownHandler1, toggleSidebarDisplay, toggleSidebarFun } = useContext(GlobalContext);

  //sidebar file list dropdown handler
  const dropDownHandler = () => {
    dropDownIcon === "down"
      ? toggleDropDownHandler("up")
      : toggleDropDownHandler("down");
  };

  const dropDownHandler1 = () => {
    dropDownIcon1 === "down"
      ? toggleDropDownHandler1("up")
      : toggleDropDownHandler1("down");
  };

  const uploadPromptHandler = () => {
    navigate("/upload");
  };

  //sidebar toogle
  function sideBarDisplay(displayType) {
    toggleSidebarFun(displayType);
  }


  return (
    <>
      <div
        className={`sidebar-parent-container ${toggleSidebarDisplay ? "display-mb" : "display-none"
          }`}
      >
        <div
          className={`sidebar-md-icon ${toggleSidebarDisplay ? "display-mb" : "display-none"
            }`}
          onClick={() => sideBarDisplay(!toggleSidebarDisplay)}
        >
          <div className="desktop-display">
            {!toggleSidebarDisplay ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
          </div>
          <div className="mobile-display">
            {toggleSidebarDisplay ? <BsChevronDoubleLeft /> : <BsChevronDoubleRight />}
          </div>
        </div>
        <div
          className={`sidebar-container ${!toggleSidebarDisplay ? "display-mb" : "display-none"
            }`}
        >
          <button className="upload-btn" onClick={() => uploadPromptHandler()}>
            Upload Document
          </button>
          {documentFiles.length > 0 ? (
            <>
              <div className="sidebar-row mt-1">
                <button
                  className="doc-box doc-box-btn"
                  onClick={() => dropDownHandler()}
                >
                  Documents
                  {dropDownIcon === "down" ? (
                    <img
                      src={ArrowDownIcon}
                      alt="ArrowDownIcon"
                      className="drop-icon"
                    />
                  ) : (
                    <img
                      src={ArrowUpIcon}
                      alt="ArrowUpIcon"
                      className="drop-icon"
                    />
                  )}
                </button>
                <div className="w-100 doc-box-items">
                  {documentFiles.map((element, index) => {
                    return dropDownIcon === "up" ? (
                      <div key={index} className="doc-box doc-box-item">
                        <img
                          className="sidebar-img"
                          src={sideBarLogo}
                          alt="sideBarBadge"
                        />
                        <div className="sidebar-ietm-text">
                          {element}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </>
          ) : "No File Found."}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
