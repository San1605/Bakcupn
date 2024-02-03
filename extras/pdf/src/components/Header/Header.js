import React,{useState,useCallback,useEffect,useContext} from "react";
import { Container, Navbar, Button} from "react-bootstrap";
// import AbuIcon from "../../assets/images/airport-logo.png";
import celebelLogo from "../../assets/images/celebal-logo.svg";
import profile from '../../assets/images/profile.svg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ChatContext from "../../Context/Context";


const Header = () => {
  const navigate = useNavigate();

  const { isOn,setIsOn} =
  useContext(ChatContext);
  // console.log(isOn,"isOn")

  const handleClick = () => {
    if (isOn === "English") {
        console.log(isOn)
        setIsOn("Arabic");
      } else {
        setIsOn("English");
      }
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
      data : data
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
  }, [isOn,setIsOn]);

  return (
    <Navbar style={{backgroundColor:'#0F0C22'}}>
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
        {/* <div className="px-2" style={{color:"#fff"}}>Language :  </div> <Button onClick={handleClick}>{isOn==="English" ? "English" : "Arabic"}</Button> */}
        <button className='create-button me-3'>Modify existing RFP</button>  <img src={profile} style={{ width: '1.3rem' }} alt="" className="profile_img me-4" onClick={() => navigate("/Profile")}/>
      </Container>
    </Navbar>
  );
};

export default Header;
