import React from 'react';
import "./Sidebar.css";
import { logo, dashboardIcon, Events, Help, LearningPath, roleManagementIcon, SidebarImg, Colleges } from "../../Assets/globalIcons";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ type, collapseSideBar }) => {
    const role = localStorage.getItem("role");

    const roleNavLinks = {
        user: [
            { to: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
            { to: "/courses", icon: roleManagementIcon, label: "Courses Enrolled" },
            { to: "/communitychat", icon: Colleges, label: "Community" },
            { to: "/games", icon: LearningPath, label: "Brain Games" },
            { to: "/events", icon: Events, label: "Event & Calendar" },
            { to: "/help", icon: Help, label: "Help & Support" },
        ],
        Mentor: [
            { to: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
            { to: "/lpmanagement", icon: LearningPath, label: "Learning Path" },
            { to: "/communitychat", icon: Colleges, label: "Community" },
            { to: "/games", icon: LearningPath, label: "Brain Games" },
            { to: "/events", icon: Events, label: "Event & Calendar" },
            { to: "/help", icon: Help, label: "Help & Support" },
        ],
        Admin: [
            { to: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
            { to: "/lpmanagement", icon: LearningPath, label: "Learning Path" },
            { to: "/colleges", icon: Colleges, label: "Colleges" },
            { to: "/rolemanagement", icon: roleManagementIcon, label: "Role Management" },
            { to: "/events", icon: Events, label: "Event & Calendar" },
            { to: "/help", icon: Help, label: "Help & Support" },
        ],
        hrbuddy: [
            { to: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
            { to: "/lpmanagement", icon: LearningPath, label: "Learning Path" },
            { to: "/colleges", icon: Colleges, label: "Colleges" },
            { to: "/rolemanagement", icon: roleManagementIcon, label: "Role Management" },
            { to: "/events", icon: Events, label: "Event & Calendar" },
            { to: "/help", icon: Help, label: "Help & Support" },
        ],
        mentor: [
            { to: "/dashboard", icon: dashboardIcon, label: "Dashboard" },
            { to: "/feedback", icon: Colleges, label: "Students Feedback" },
            { to: "/communitychat", icon: LearningPath, label: "Community" },
            { to: "/events", icon: Events, label: "Event & Calendar" },
            { to: "/help", icon: Help, label: "Help & Support" },
        ],
    };

    const currentRoleNavLinks = role === 'HR Buddy' ? roleNavLinks["hrbuddy"] : roleNavLinks[role] || [];

    return (
        <div
            id='sidebar'
            style={{
                position: type === "collapse" && "absolute",
                top: type === "collapse" && "0",
                left: type === "collapse" && "0"
            }}
            className={`SideBar ${type === "collapse" ? !collapseSideBar ? "articleShowSidebar" : "articleHideSidebar" : ""}`}>
            <div className='sidebarDiv'>
                <div className='sidebarLogo'>
                    <img src={logo} alt='' />
                </div>

                <div className="sidebarItemsDiv">
                    {currentRoleNavLinks.map(({ to, icon, label }, index) => (
                        <NavLink
                            key={index}
                            to={to}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebarItemActive"
                                    : "sidebarItem"
                            }
                        >
                            <img src={icon} alt='dashboard' />
                            <div>{label}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="sideBarImage">
                <img src={SidebarImg} alt='/sidebarimg' />
            </div>
        </div>
    );
}

export default Sidebar;
