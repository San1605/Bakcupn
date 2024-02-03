import React, { useState, useCallback, useEffect, useContext } from "react";
import { Container, Navbar, Dropdown } from "react-bootstrap";
// import AbuIcon from "../../assets/images/airport-logo.png";
import './header.css';
import celebelLogo from "../../assets/images/celebal-logo.svg";
import profile from '../../assets/images/profile.svg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ChatContext from "../../Context/Context";
import flag from '../../assets/images/flag.svg';
import drop from '../../assets/images/drop.svg';
import flag1 from '../../assets/images/arbi.svg';


const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isOn, setIsOn } =
    useContext(ChatContext);
  // console.log(isOn,"isOn")

  const handleClick = (lang) => {
    // if (isOn === "English") {
    //   console.log(isOn, "ison")
      setIsOn(lang);
    // } else {
    //   setIsOn("English");
    // }
    console.log(isOn)
  };

  //set of api callingn method all main api
  const languageApi = useCallback(() => {

    let data = JSON.stringify({
      "lang": isOn
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://20.127.168.63:8082/language_parameter',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }, [isOn]);

  useEffect(() => {
    languageApi();
  }, [isOn, setIsOn]);

  return (
    <Navbar style={{ backgroundColor: '#0F0C22' }}>
      <Container fluid>
        <Navbar.Brand href="#home" style={{ marginLeft: "15px" }}>
          <img
            src={celebelLogo}
            width="100"
            className="d-inline-block align-top"
            alt="Logo"
          // onClick={() => navigate("/")}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          {/* <Navbar.Text style={{ color: "#fff" , fontWeight:'400', fontSize:'1.3rem'}}>RFP Document Generator </Navbar.Text> */}
        </Navbar.Collapse>
        {/* <div className="d-flex" style={{width : '7rem'}}>
        <img src={isOn === "English" ? flag : flag1} alt=""  className="flag_icon"/>
        <div>
          <img
            src={drop}
            alt=""
            className="ms-1"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
          {isOn === "English" ? "English" : "Arabic"}
        </div>
      </div> */}


        {/* <div className="d-flex" style={{ width: '7rem' }}>
  <div>
    {isOn === "English" ? (
      <>
       <span className="font"> English </span> 
        <img
          src={drop}
          alt=""
          className="ms-1"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      </>
    ) : (
      <>
       <span className="font">Arebic </span> 
        <img
          src={drop}
          alt=""
          className="ms-1"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      </>
    )}
  </div>
</div> */}


        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-basic">
            <div className="d-flex" style={{ width: '7rem' }}>
              <div>
                {isOn === "English" ? (
                  <>
                    <span className="font">English</span>
                    <img
                      src={drop}
                      alt=""
                      className="ms-1"
                      onClick={() => handleClick("English")}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                ) : (
                  <>
                    <span className="font">عربي </span>
                    <img
                      src={drop}
                      alt=""
                      className="ms-1"
                      onClick={() => handleClick("Arabic")}
                      style={{ cursor: "pointer" }}
                    />

                  </>
                )}
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("English")}>English</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("Arabic")}>عربي</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* <div className="d-flex" ><img src={flag} alt=''/>
        <div><img src={drop} alt='' className="ms-1" onClick={handleClick}/>{isOn==="English" ? "English" : "Arabic"}</div></div>  */}
        {/* <Button onClick={handleClick}>{isOn==="English" ? "English" : "Arabic"}</Button> */}
        <button className='create-button me-3' onClick={() => navigate("/modifyrfp")}>{isOn === "English" ? "Modify existing RFP" : "تعديل طلب تقديم العروض الموجود"}</button>  <img src={profile} style={{ width: '1.3rem' }} alt="" className="profile_img me-4" onClick={() => navigate("/Profile")} />
      </Container>
    </Navbar>
  );
};

export default Header;