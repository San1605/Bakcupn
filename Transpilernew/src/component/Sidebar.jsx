import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarImg from "../assets/img/sidebarImg.svg";
import home from "../assets/icons/home.svg";
import projects from "../assets/icons/projects.svg";
import analyzer from "../assets/icons/analyzer.svg";
import convertor from "../assets/icons/convertor.svg";
import homeFill from "../assets/icons/homeFill.svg";
import projectsFill from "../assets/icons/projectsFill.svg";
import analyzerFill from "../assets/icons/analyzerFill.svg";
import convertorFill from "../assets/icons/ConvertorFill.svg";
import testing from "../assets/icons/testing.svg";
import testingFill from "../assets/icons/testingFill.svg";


const Sidebar = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState(null);

  useEffect(() => {
    const pathname = location.pathname;
    console.log(pathname, "pathname");
    if (pathname.includes("home")) {
      setActiveNavItem("home");
    } else if (pathname.includes("projects")) {
      setActiveNavItem("projects");
    } else if (pathname.includes("analyzer")) {
      setActiveNavItem("analyzer");
    } else if (pathname.includes("convertor")) {
      setActiveNavItem("convertor");
    }
    else if (pathname.includes("testing")) {
      setActiveNavItem("testing");
    }
    else {
      setActiveNavItem(null);
    }
  }, [location.pathname]);

  return (
    <div className="h-full w-[230px] flex flex-col justify-between border-r border-[#ECECEC] pt-[1px]">
      <div className="sideNavlink-block">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `px-4 py-3 flex flex-row  items-center gap-[11px] ${isActive
              ? "bg-[#DBF7F7] text-[#2D9596] font-medium"
              : "text-[#242424] "
            }`
          }
        >
          <img src={activeNavItem === "home" ? homeFill : home} alt="home" />
          <p className="navlink-text"> Home</p>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `px-4 py-3 flex flex-row  items-center gap-[11px] ${isActive
              ? "bg-[#DBF7F7] text-[#2D9596] font-medium"
              : "text-[#242424] "
            }`
          }
        >
          <img
            src={activeNavItem === "projects" ? projectsFill : projects}
            alt="home"
          />
          <p className="navlink-text">Projects</p>
        </NavLink>

        <NavLink
          to="/analyzer"
          className={({ isActive }) =>
            `px-4 py-3 flex flex-row  items-center gap-[11px] ${isActive
              ? "bg-[#DBF7F7] text-[#2D9596] font-medium"
              : "text-[#242424] "
            }`
          }
        >
          <img
            src={activeNavItem === "analyzer" ? analyzerFill : analyzer}
            alt="home"
          />
          <p className="navlink-text">Analyze</p>
        </NavLink>
        <NavLink
          to="/convertor"
          className={({ isActive }) =>
            `px-4 py-3 flex flex-row  items-center gap-[11px] ${isActive
              ? "bg-[#DBF7F7] text-[#2D9596] font-medium"
              : "text-[#242424] "
            }`
          }
        >
          <img
            src={activeNavItem === "convertor" ? convertorFill : convertor}
            alt="home"
          />
          <p className="navlink-text">Convert</p>
        </NavLink>
        <NavLink
          to="/testing"
          className={({ isActive }) =>
            `px-4 py-3 flex flex-row  items-center gap-[11px] ${isActive
              ? "bg-[#DBF7F7] text-[#2D9596] font-medium"
              : "text-[#242424] "
            }`
          }
        >
          <img
            src={activeNavItem === "testing" ? testingFill : testing}
            alt="home"
          />
          <p className="navlink-text">Test</p>
        </NavLink>
      </div>
      <img src={SidebarImg} alt="" />
    </div>
  );
};

export default Sidebar;
