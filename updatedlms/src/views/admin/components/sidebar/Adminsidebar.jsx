import React from "react";
import { NavLink } from "react-router-dom";
import "../../../../component/sidebar/sidebar.css";
function Sidebar(props) {
  return (
    <>
      <div className={props.toggle ? "sidebar show" : "sidebar hide"}>
        <div className="sidebarlinks">
          <NavLink exact activeClassName="active" to="/admin/dashboard">
            <div className="sidebarinnerlink d-flex w-100">
              <div
                className="innerlinktext text-white"
                onClick={() => {
                  props.setToggle(!props.toggle);
                }}
              >
                Dashboard
              </div>
            </div>
          </NavLink>
          <NavLink exact activeClassName="active" to="/admin/coursemanagement">
            <div className="sidebarinnerlink d-flex w-100">
              <div
                className="innerlinktext text-white"
                onClick={() => {
                  props.setToggle(!props.toggle);
                }}
              >
                Course Management
              </div>
            </div>
          </NavLink>
          <NavLink exact activeClassName="active" to="/admin/rolemanagement">
            <div className="sidebarinnerlink d-flex w-100">
              <div
                className="innerlinktext text-white"
                onClick={() => {
                  props.setToggle(!props.toggle);
                }}
              >
                Role Management
              </div>
            </div>
          </NavLink>
          {/* <NavLink exact activeClassName="active" to="/admin/tickets">
            <div className="sidebarinnerlink d-flex w-100">
              <div
                className="innerlinktext text-white"
                onClick={() => {
                  props.setToggle(!props.toggle);
                }}
              >
                Tickets
              </div>
            </div>
          </NavLink> */}
        </div>
      </div>
    </>
  );
}
export default Sidebar;
