import React, { useContext, useState } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import NavBarLogo from "../assets/images/logo.png";
import UserLogo from "../assets/images/user-icon.svg";
import "../assets/css/topmostnav.css";
import { Context } from "../context/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

export const TopMostNav = () => {
  const { show, setShow , extensionId ,  callid , setChat , setConversation} = useContext(Context);
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const toggleExtension = () => {
    setIsExtensionOpen(!isExtensionOpen);
  };
  return (
    <Navbar className="topnav-bar h-[60px]">
      <Container fluid>
        <Row className="w-100">
          <Col xs={11}>
            <Navbar.Brand href="/">
              <img
                alt="navbar"
                src={NavBarLogo}
                className="d-inline-block align-top navbarlogo"
              />
            </Navbar.Brand>
          </Col>
          <Col xs={1} className="text-end cursor-pointer relative flex" onClick={toggleExtension}>
            <img src={UserLogo} alt="usericon" className="usericon" />
            {isExtensionOpen && (
       <div className="flex flex-col absolute right-2 top-7"> 
       <div className=" py-1 px-3 whitespace-nowrap shadow-lg bg-white border border-solid border-gray-300 rounded-lg">
                <button onClick={() =>handleShow()} className="text-gray-900 text-sm font-semibold">Change Extension</button>
        </div>
        <div className="py-1 px-3 whitespace-nowrap shadow-lg bg-white border border-solid border-gray-300 rounded-lg" onClick={() =>{
                sessionStorage.clear()
                setChat([]);
                setConversation([]);
                navigate("/login")
                }
                }>
                <button className="text-gray-900 text-sm font-semibold">Logout</button>
        </div>
        </div>
      )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};
