import React from 'react'
import logo from "../assets/images/celebal-logo.svg";
import '../assets/css/navbar.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ type }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("userInfo", "");
    navigate("/")
  }

  return (
    <div className='top-navbar'>
      <Container fluid>
        <Row>
          <Col xs={7}>
            <div className='logo'>
              <img className='app_logo' src={logo} alt='logo' />
            </div>
          </Col>{
            type === 1 &&
            <Col xs={5} className='d-flex justify-content-end'>
              <div className="user">
                <div className="user-icon">
                  C
                </div>
                <div className="user-name">
                  Celebal
                  <div className="logout-button" onClick={() => logout()}>
                    Logout
                  </div>
                </div>
              </div>
            </Col>}
        </Row>
      </Container>
    </div>
  )
}

export default Navbar