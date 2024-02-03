import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./sidebar.css";
function Sidebar(props) {
  const {role, pmtlrole} = useContext(GlobalContext)
  return (
    <>
      <div className={props.toggle ? "sidebar show" : "sidebar hide"}>
        <div className="sidebarlinks">
          <NavLink exact activeClassName="active" to="/dashboard">
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
          <NavLink exact activeClassName="active" to="/courses">
            <div className="sidebarinnerlink d-flex w-100">
              <div
                className="innerlinktext text-white"
                onClick={() => {
                  props.setToggle(!props.toggle);
                }}
              >
                All Courses
              </div>
            </div>
          </NavLink>
          <NavLink exact activeClassName="active" to="/mycourses">
            <div className="sidebarinnerlink d-flex w-100">
              <div
                className="innerlinktext text-white"
                onClick={() => {
                  props.setToggle(!props.toggle);
                }}
              >
                My Courses
              </div>
            </div>
          </NavLink>
          <NavLink exact activeClassName="active" to="/tickets">
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
          </NavLink>
          {role === 3 ? (
            <>
              <NavLink exact activeClassName="active" to="/menteelist">
                <div className="sidebarinnerlink d-flex w-100">
                  <div
                    className="innerlinktext text-white"
                    onClick={() => {
                      props.setToggle(!props.toggle);
                    }}
                  >
                    Mentee List
                  </div>
                </div>
              </NavLink>
              <NavLink exact activeClassName="active" to="/buddies">
                <div className="sidebarinnerlink d-flex w-100">
                  <div
                    className="innerlinktext text-white"
                    onClick={() => {
                      props.setToggle(!props.toggle);
                    }}
                  >
                    Buddies
                  </div>
                </div>
              </NavLink>
            </>
          ) : role === 1 ? (
            <NavLink exact activeClassName="active" to="/menteelist">
              <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                  Mentee List
                </div>
              </div>
            </NavLink>
          ) : role === 2 ? (
            <NavLink exact activeClassName="active" to="/buddies">
              <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                  Buddies
                </div>
              </div>
            </NavLink>
          ) : role === 4 ? (
              <NavLink exact activeClassName="active" to="/pathmanagement">
               <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                Learning Path Management
                </div>
              </div>
              </NavLink>
          ): role === 5 ? (
            <>
            <NavLink exact activeClassName="active" to="/menteelist">
              <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                  Mentee List
                </div>
              </div>
            </NavLink>
            <NavLink exact activeClassName="active" to="/pathmanagement">
               <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                Learning Path Management
                </div>
              </div>
              </NavLink>
          </>
          ): role === 6 ? (
            <>
            <NavLink exact activeClassName="active" to="/buddies">
              <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                  Buddies
                </div>
              </div>
            </NavLink>
            <NavLink exact activeClassName="active" to="/pathmanagement">
               <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                Learning Path Management
                </div>
              </div>
              </NavLink>
          </>
          ): role === 7 ? (
            <>
            <NavLink exact activeClassName="active" to="/menteelist">
              <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                  Mentee List
                </div>
              </div>
            </NavLink>
            <NavLink exact activeClassName="active" to="/buddies">
              <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                  Buddies
                </div>
              </div>
            </NavLink>
            <NavLink exact activeClassName="active" to="/pathmanagement">
               <div className="sidebarinnerlink d-flex w-100">
                <div
                  className="innerlinktext text-white"
                  onClick={() => {
                    props.setToggle(!props.toggle);
                  }}
                >
                Learning Path Management
                </div>
              </div>
              </NavLink>
          </>
          ):null}
          {
            role !== 0 || pmtlrole !== 0? 
            <NavLink exact activeClassName="active" to="/requests">
            <div className="sidebarinnerlink d-flex w-100">
              <div
                className="innerlinktext text-white"
                onClick={() => {
                  props.setToggle(!props.toggle);
                }}
              >
                Requests
              </div>
            </div>
          </NavLink>:null
          }
        </div>
      </div>
    </>
  );
}
export default Sidebar;
